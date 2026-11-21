import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  Check,
  CheckCircle2,
  Code,
  Eye,
  FlaskConical,
  Play,
  Plus,
  RefreshCw,
  Save,
  ShieldCheck,
  Sliders,
  X,
} from 'lucide-react';
import {
  BoundaryTestCase,
  ChapterNode,
  ClassCurriculumNode,
  CognitiveLevel,
  GeneratedQuestionContent,
  LessonNode,
  MathTemplate,
  QuestionCategory,
  StressTestReport,
} from '../types/math';
import {
  BoundaryExpectation,
  CustomBoundaryTestResult,
  EdgeSweepCaseResult,
  generateValidInstance,
  runCustomBoundaryTest,
  runEdgeSweepTest,
  runTemplateStressTest,
} from '../engine/templateRunner';
import { MathText } from './MathText';
import { QuestionDiagram } from './QuestionDiagram';

interface BankManagerViewProps {
  selectedClass: ClassCurriculumNode | null;
  selectedChapter: ChapterNode | null;
  selectedLesson: LessonNode | null;
  selectedTemplate: MathTemplate | null;
  addingTemplateTarget: { lessonId: string; category: QuestionCategory } | null;
  onSelectTemplate: (
    tpl: MathTemplate,
    lesson: LessonNode,
    chapter: ChapterNode,
    cls: ClassCurriculumNode
  ) => void;
  onUpdateTemplate: (lessonId: string, updated: MathTemplate) => void;
  onCreateTemplate: (lessonId: string, newTpl: MathTemplate) => void;
  onCancelCreateTemplate: () => void;
  onTriggerAddTemplate: (lessonId: string, category: QuestionCategory) => void;
}

const CATEGORY_NAME: Record<QuestionCategory, string> = {
  MC: 'Nhiều lựa chọn (MC)',
  TF: 'Đúng - Sai (TF)',
  SA: 'Trả lời ngắn (SA)',
  ES: 'Tự luận (ES)',
};

function buildStarterTemplate(
  category: QuestionCategory,
  name: string,
  level: CognitiveLevel,
  topicTag: string
): MathTemplate {
  const id = `custom_${Date.now().toString(36)}`;
  const baseValidate = `if (params.a === 0) return { valid: false, reason: 'Hệ số a = 0 làm suy biến bài toán' };\nreturn { valid: true };`;

  let generateCode = '';
  if (category === 'MC') {
    generateCode = `const { a, b } = params;
const root = u.simplifyFrac(-b, a);
const fake1 = u.simplifyFrac(b, a);
const fake2 = u.simplifyFrac(-b + 1, a);
const fake3 = u.simplifyFrac(a, b === 0 ? 1 : b);
const { options, correctIndex } = u.buildUniqueMcOptions(
  '$x = ' + root.latex + '$',
  ['$x = ' + fake1.latex + '$', '$x = ' + fake2.latex + '$', '$x = ' + fake3.latex + '$'],
  rng,
  (k) => '$x = ' + (root.num + k) + '$'
);
return {
  stem: 'Nghiệm của phương trình bậc nhất $' + u.formatLinear(a, b) + ' = 0$ là:',
  options,
  correctIndex,
  answerSummary: 'x = ' + root.text,
  solutionSteps: [
    'Chuyển vế ta được $' + a + 'x = ' + (-b) + '$.',
    'Vì $a = ' + a + ' \\\\neq 0$ nên $x = ' + root.latex + '$.',
  ],
};`;
  } else if (category === 'TF') {
    generateCode = `const { a, b } = params;
const root = u.simplifyFrac(-b, a);
const tfStatements = [
  { key: 'a', text: 'Hệ số góc của hàm số $y = ' + u.formatLinear(a, b) + '$ là $' + a + '$.', isTrue: true },
  { key: 'b', text: 'Hàm số đồng biến trên $\\\\mathbb{R}$.', isTrue: a > 0 },
  { key: 'c', text: 'Đồ thị cắt trục hoành tại $x = ' + root.latex + '$.', isTrue: true },
  { key: 'd', text: 'Đồ thị luôn đi qua gốc tọa độ $O(0; 0)$.', isTrue: b === 0 },
];
return {
  stem: 'Cho hàm số bậc nhất $y = ' + u.formatLinear(a, b) + '$. Xét tính đúng sai:',
  tfStatements,
  answerSummary: tfStatements.map(s => s.key + ':' + (s.isTrue ? 'Đ' : 'S')).join(', '),
  solutionSteps: [
    'Hệ số góc bằng $' + a + '$, tính đồng biến phụ thuộc dấu của $a$.',
    'Giao điểm với $Ox$ là $x = ' + root.latex + '$, với $Oy$ là $y = ' + b + '$.',
  ],
};`;
  } else if (category === 'SA') {
    generateCode = `const { a, b } = params;
const val = a * 2 + b;
return {
  stem: 'Cho hàm số $f(x) = ' + u.formatLinear(a, b) + '$. Tính giá trị $f(2)$.',
  shortAnswer: '' + val,
  numericValue: val,
  answerSummary: '' + val,
  solutionSteps: [
    'Thay $x = 2$ vào công thức: $f(2) = ' + a + ' \\\\cdot 2 + (' + b + ') = ' + val + '$.',
  ],
};`;
  } else {
    generateCode = `const { a, b } = params;
const root = u.simplifyFrac(-b, a);
return {
  stem: 'Giải phương trình $' + u.formatLinear(a, b) + ' = 0$ và xét dấu biểu thức.',
  answerSummary: 'x = ' + root.text,
  rubric: [
    { description: 'Tìm đúng nghiệm x = ' + root.text, points: 0.5 },
    { description: 'Lập đúng bảng xét dấu theo dấu của a = ' + a, points: 0.5 },
  ],
  solutionSteps: [
    'Nghiệm của phương trình là $x = ' + root.latex + '$.',
    'Áp dụng quy tắc xét dấu nhị thức bậc nhất với $a = ' + a + '$.',
  ],
};`;
  }

  return {
    id,
    name,
    category,
    level,
    topicTag,
    description: 'Dạng toán động tùy chỉnh do giáo viên biên soạn.',
    conditionSummary: 'Hệ số a ≠ 0',
    paramSpecs: [
      { name: 'a', label: 'Hệ số a', min: -5, max: 5, allowZero: false },
      { name: 'b', label: 'Hằng số b', min: -8, max: 8 },
    ],
    validateCode: baseValidate,
    generateCode,
    boundaryCases: [
      { label: 'Biên suy biến a = 0', params: { a: 0, b: 3 }, expectedValid: false },
      { label: 'Biên b = 0', params: { a: 2, b: 0 }, expectedValid: true },
    ],
  };
}

export const BankManagerView: React.FC<BankManagerViewProps> = ({
  selectedClass,
  selectedChapter,
  selectedLesson,
  selectedTemplate,
  addingTemplateTarget,
  onSelectTemplate,
  onUpdateTemplate,
  onCreateTemplate,
  onCancelCreateTemplate,
  onTriggerAddTemplate,
}) => {
  const [subTab, setSubTab] = useState<'preview' | 'stress' | 'boundary' | 'editor'>('preview');
  const [seed, setSeed] = useState<number>(2026);
  const [showSolution, setShowSolution] = useState<boolean>(true);
  const [showMultiVariants, setShowMultiVariants] = useState<boolean>(false);

  // Editable draft state for selectedTemplate
  const [draftCondition, setDraftCondition] = useState('');
  const [draftValidateCode, setDraftValidateCode] = useState('');
  const [draftGenerateCode, setDraftGenerateCode] = useState('');
  const [draftParamSpecs, setDraftParamSpecs] = useState<MathTemplate['paramSpecs']>([]);
  const [draftBoundaryCases, setDraftBoundaryCases] = useState<BoundaryTestCase[]>([]);
  const [saveFeedback, setSaveFeedback] = useState<string>('');
  const [editError, setEditError] = useState<string>('');

  // Stress test state
  const [stressReport, setStressReport] = useState<StressTestReport | null>(null);

  // Interactive Boundary Test state
  const [boundaryInputs, setBoundaryInputs] = useState<Record<string, string>>({});
  const [boundaryExpectation, setBoundaryExpectation] = useState<BoundaryExpectation>('auto');
  const [boundaryResult, setBoundaryResult] = useState<CustomBoundaryTestResult | null>(null);
  const [edgeSweepResults, setEdgeSweepResults] = useState<EdgeSweepCaseResult[] | null>(null);
  const [boundaryCaseLabel, setBoundaryCaseLabel] = useState<string>('');
  const [boundarySavedNotice, setBoundarySavedNotice] = useState<string>('');

  // New template creation form state
  const [newTplName, setNewTplName] = useState('');
  const [newTplLevel, setNewTplLevel] = useState<CognitiveLevel>('Biết');
  const [newTplTopic, setNewTplTopic] = useState('');

  const buildDefaultBoundaryInputs = (specs: MathTemplate['paramSpecs']): Record<string, string> => {
    const map: Record<string, string> = {};
    for (const spec of specs) {
      map[spec.name] = '0';
    }
    return map;
  };

  useEffect(() => {
    if (selectedTemplate) {
      setDraftCondition(selectedTemplate.conditionSummary);
      setDraftValidateCode(selectedTemplate.validateCode.trim());
      setDraftGenerateCode(selectedTemplate.generateCode.trim());
      setDraftParamSpecs(selectedTemplate.paramSpecs.map((p) => ({ ...p })));
      setDraftBoundaryCases(selectedTemplate.boundaryCases.map((b) => ({ ...b, params: { ...b.params } })));
      setStressReport(runTemplateStressTest(selectedTemplate, 100));
      const initialInputs = buildDefaultBoundaryInputs(selectedTemplate.paramSpecs);
      setBoundaryInputs(initialInputs);
      setBoundaryExpectation('auto');
      setBoundaryCaseLabel('');
      setBoundarySavedNotice('');
      const parsed: Record<string, number> = {};
      for (const s of selectedTemplate.paramSpecs) parsed[s.name] = 0;
      setBoundaryResult(runCustomBoundaryTest(selectedTemplate, parsed, 'auto'));
      setEdgeSweepResults(null);
      setSaveFeedback('');
      setEditError('');
    }
  }, [selectedTemplate?.id]);

  const hasUnsavedEdits = useMemo(() => {
    if (!selectedTemplate) return false;
    return (
      draftCondition !== selectedTemplate.conditionSummary ||
      draftValidateCode !== selectedTemplate.validateCode.trim() ||
      draftGenerateCode !== selectedTemplate.generateCode.trim() ||
      JSON.stringify(draftParamSpecs) !== JSON.stringify(selectedTemplate.paramSpecs) ||
      JSON.stringify(draftBoundaryCases) !== JSON.stringify(selectedTemplate.boundaryCases)
    );
  }, [
    selectedTemplate,
    draftCondition,
    draftValidateCode,
    draftGenerateCode,
    draftParamSpecs,
    draftBoundaryCases,
  ]);

  const draftTemplate = useMemo<MathTemplate | null>(() => {
    if (!selectedTemplate) return null;
    return {
      ...selectedTemplate,
      conditionSummary: draftCondition,
      paramSpecs: draftParamSpecs,
      validateCode: draftValidateCode,
      generateCode: draftGenerateCode,
      boundaryCases: draftBoundaryCases,
    };
  }, [
    selectedTemplate,
    draftCondition,
    draftParamSpecs,
    draftValidateCode,
    draftGenerateCode,
    draftBoundaryCases,
  ]);

  const parseBoundaryInputs = (inputs: Record<string, string>): Record<string, number> => {
    const parsed: Record<string, number> = {};
    for (const spec of draftParamSpecs) {
      const raw = (inputs[spec.name] ?? '').trim();
      parsed[spec.name] = raw === '' ? Number.NaN : Number(raw);
    }
    return parsed;
  };

  const handleRunCustomBoundaryTest = (
    overrideInputs?: Record<string, string>,
    overrideExpectation?: BoundaryExpectation
  ) => {
    if (!draftTemplate) return;
    const inputsToUse = overrideInputs ?? boundaryInputs;
    const expToUse = overrideExpectation ?? boundaryExpectation;
    const parsed = parseBoundaryInputs(inputsToUse);
    setBoundaryResult(runCustomBoundaryTest(draftTemplate, parsed, expToUse));
    setBoundarySavedNotice('');
  };

  const handleApplyBoundaryPreset = (
    mode: 'zero' | 'negative' | 'largePos' | 'largeNeg' | 'mid'
  ) => {
    const next: Record<string, string> = {};
    draftParamSpecs.forEach((spec, idx) => {
      if (mode === 'zero') {
        next[spec.name] = '0';
      } else if (mode === 'negative') {
        next[spec.name] = String(-(idx + 1) * 5);
      } else if (mode === 'largePos') {
        next[spec.name] = String(100000 + idx * 1000);
      } else if (mode === 'largeNeg') {
        next[spec.name] = String(-(100000 + idx * 1000));
      } else {
        let mid = Math.round((spec.min + spec.max) / 2);
        if (spec.allowZero === false && mid === 0) mid = spec.max > 0 ? 1 : -1;
        next[spec.name] = String(mid);
      }
    });
    setBoundaryInputs(next);
    handleRunCustomBoundaryTest(next);
  };

  const handleRunEdgeSweep = () => {
    if (!draftTemplate) return;
    setEdgeSweepResults(runEdgeSweepTest(draftTemplate));
  };

  const handleAddCurrentBoundaryCase = () => {
    if (!boundaryResult || boundaryResult.status === 'error' || boundaryResult.status === 'mismatch') {
      return;
    }
    const label =
      boundaryCaseLabel.trim() ||
      `Biên tùy chỉnh (${Object.entries(boundaryResult.params)
        .map(([k, v]) => `${k}=${v}`)
        .join(', ')})`;
    const newCase: BoundaryTestCase = {
      label,
      params: { ...boundaryResult.params },
      expectedValid: boundaryResult.valid,
    };
    setDraftBoundaryCases((prev) => [...prev, newCase]);
    setBoundaryCaseLabel('');
    setBoundarySavedNotice('Đã thêm vào danh sách trường hợp biên (nhớ bấm Lưu để ghi vào ngân hàng).');
  };

  const previewResult = useMemo<{
    content: GeneratedQuestionContent | null;
    attempts: number;
    error: string | null;
  }>(() => {
    if (!selectedTemplate) return { content: null, attempts: 0, error: null };
    try {
      const res = generateValidInstance(selectedTemplate, seed);
      return { content: res.content, attempts: res.attempts, error: null };
    } catch (err) {
      return {
        content: null,
        attempts: 0,
        error: err instanceof Error ? err.message : String(err),
      };
    }
  }, [selectedTemplate, seed]);

  const multiVariants = useMemo(() => {
    if (!selectedTemplate || !showMultiVariants) return [];
    const list: Array<{ index: number; content: GeneratedQuestionContent }> = [];
    for (let i = 1; i <= 4; i++) {
      try {
        const res = generateValidInstance(selectedTemplate, seed + i * 1013);
        list.push({ index: i, content: res.content });
      } catch {
        // ignore individual variant failure
      }
    }
    return list;
  }, [selectedTemplate, seed, showMultiVariants]);

  const handleSaveTemplateEdits = () => {
    if (!selectedTemplate || !selectedLesson) return;
    const candidate: MathTemplate = {
      ...selectedTemplate,
      conditionSummary: draftCondition,
      paramSpecs: draftParamSpecs,
      validateCode: draftValidateCode,
      generateCode: draftGenerateCode,
      boundaryCases: draftBoundaryCases,
    };

    try {
      // Verify it compiles and produces valid output before saving
      generateValidInstance(candidate, seed);
      const report = runTemplateStressTest(candidate, 100);
      setStressReport(report);
      onUpdateTemplate(selectedLesson.id, candidate);
      setEditError('');
      setSaveFeedback(
        report.passedAll
          ? 'Đã lưu & kiểm thử 100 mẫu + giá trị biên đạt 100%'
          : `Đã lưu, nhưng phát hiện ${report.invariantFailures.length} lỗi biên/logic cần kiểm tra`
      );
      setTimeout(() => setSaveFeedback(''), 4000);
    } catch (err) {
      setEditError(err instanceof Error ? err.message : String(err));
    }
  };

  const handleConfirmCreateNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addingTemplateTarget || !newTplName.trim()) return;
    const tpl = buildStarterTemplate(
      addingTemplateTarget.category,
      newTplName.trim(),
      newTplLevel,
      newTplTopic.trim() || selectedChapter?.name || 'Chủ đề Toán THPT'
    );
    onCreateTemplate(addingTemplateTarget.lessonId, tpl);
    setNewTplName('');
    setNewTplTopic('');
    setSubTab('editor');
  };

  // 1. Creation Mode
  if (addingTemplateTarget) {
    return (
      <div className="flex-1 min-w-0 overflow-y-auto p-6 bg-[#F8FAFC]">
        <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-lg p-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Thêm dạng toán động mới
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {selectedLesson?.name} · {CATEGORY_NAME[addingTemplateTarget.category]}
              </p>
            </div>
            <button
              onClick={onCancelCreateTemplate}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-100"
            >
              <X size={16} />
            </button>
          </div>

          <form onSubmit={handleConfirmCreateNew} className="mt-5 space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Tên dạng toán tổng quát
              </label>
              <input
                autoFocus
                required
                value={newTplName}
                onChange={(e) => setNewTplName(e.target.value)}
                placeholder="Ví dụ: Tìm nghiệm phương trình bậc nhất ax + b = 0"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:border-blue-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Mức độ nhận thức (GDPT 2018)
                </label>
                <select
                  value={newTplLevel}
                  onChange={(e) => setNewTplLevel(e.target.value as CognitiveLevel)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md bg-white focus:outline-none focus:border-blue-600"
                >
                  <option value="Biết">Biết</option>
                  <option value="Hiểu">Hiểu</option>
                  <option value="Vận dụng">Vận dụng</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Chủ đề gắn nhãn báo cáo
                </label>
                <input
                  value={newTplTopic}
                  onChange={(e) => setNewTplTopic(e.target.value)}
                  placeholder="Ví dụ: Phương trình & Hàm số"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onCancelCreateTemplate}
                className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-medium text-white bg-blue-700 rounded-md hover:bg-blue-800 flex items-center gap-1.5"
              >
                <Check size={14} />
                Tạo & mở trình sinh số
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // 2. Template Inspector & Generator Studio
  if (selectedTemplate && selectedLesson && selectedChapter && selectedClass) {
    return (
      <div className="flex-1 min-w-0 flex flex-col h-full overflow-hidden bg-[#F8FAFC]">
        {/* Header Bar */}
        <div className="bg-white border-b border-slate-200 px-6 py-4 flex flex-wrap items-center justify-between gap-4 shrink-0">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span>{selectedClass.name}</span>
              <span aria-hidden="true">/</span>
              <span className="truncate max-w-xs">{selectedChapter.name}</span>
              <span aria-hidden="true">/</span>
              <span className="truncate max-w-xs">{selectedLesson.name}</span>
            </div>
            <h1 className="text-lg font-semibold text-slate-900 truncate">
              {selectedTemplate.name}
            </h1>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
              <span>{CATEGORY_NAME[selectedTemplate.category]}</span>
              <span aria-hidden="true">·</span>
              <span>Mức độ: {selectedTemplate.level}</span>
              <span aria-hidden="true">·</span>
              <span>Điều kiện: {selectedTemplate.conditionSummary}</span>
            </div>
          </div>

          {/* Segmented Tabs */}
          <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-md shrink-0">
            <button
              onClick={() => setSubTab('preview')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                subTab === 'preview'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Eye size={14} />
              Sinh đề & Xem trước
            </button>
            <button
              onClick={() => {
                setSubTab('stress');
                setStressReport(runTemplateStressTest(selectedTemplate, 100));
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                subTab === 'stress'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShieldCheck size={14} />
              Kiểm thử 100 mẫu
            </button>
            <button
              onClick={() => {
                setSubTab('boundary');
                handleRunCustomBoundaryTest();
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                subTab === 'boundary'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FlaskConical size={14} />
              Boundary Test
            </button>
            <button
              onClick={() => setSubTab('editor')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                subTab === 'editor'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Code size={14} />
              Tham số & Mã sinh
            </button>
          </div>
        </div>

        {/* Subtab Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* PREVIEW TAB */}
          {subTab === 'preview' && (
            <div className="max-w-5xl mx-auto space-y-5">
              {/* Control Bar */}
              <div className="bg-white border border-slate-200 rounded-lg px-4 py-3 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-4 text-xs text-slate-600">
                  <span className="font-mono tabular-nums">
                    Seed: #{seed}
                  </span>
                  {previewResult.content && (
                    <span className="font-mono text-slate-500">
                      Tham số:{' '}
                      {Object.entries(previewResult.content.params)
                        .map(([k, v]) => `${k}=${v}`)
                        .join(', ')}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowSolution((v) => !v)}
                    className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 whitespace-nowrap"
                  >
                    {showSolution ? 'Ẩn lời giải' : 'Hiện lời giải'}
                  </button>
                  <button
                    onClick={() => setShowMultiVariants((v) => !v)}
                    className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 whitespace-nowrap"
                  >
                    {showMultiVariants ? 'Ẩn 4 biến thể' : 'So sánh 4 biến thể'}
                  </button>
                  <button
                    onClick={() => setSeed((s) => s + 137)}
                    className="px-3.5 py-1.5 text-xs font-medium text-white bg-blue-700 rounded-md hover:bg-blue-800 flex items-center gap-1.5 whitespace-nowrap"
                  >
                    <RefreshCw size={13} />
                    Sinh số mới
                  </button>
                </div>
              </div>

              {previewResult.error ? (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700 flex items-start gap-2.5">
                  <AlertTriangle size={18} className="shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold">Lỗi sinh bài toán</div>
                    <p className="mt-1">{previewResult.error}</p>
                  </div>
                </div>
              ) : (
                previewResult.content && (
                  <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-5">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <span className="text-xs font-medium text-emerald-700 flex items-center gap-1.5">
                        <CheckCircle2 size={14} />
                        Đã kiểm tra điều kiện ràng buộc (hợp lệ sau {previewResult.attempts} lần lấy mẫu)
                      </span>
                      <span className="text-xs text-slate-400 tabular-nums">
                        {selectedTemplate.category} · {selectedTemplate.level}
                      </span>
                    </div>

                    {/* Question Stem */}
                    <div className="text-[15px] leading-relaxed text-slate-900">
                      <span className="font-semibold mr-1.5">Câu hỏi mẫu:</span>
                      <MathText text={previewResult.content.stem} />
                      <QuestionDiagram diagram={previewResult.content.diagram} />
                    </div>

                    {/* Options MC */}
                    {selectedTemplate.category === 'MC' && previewResult.content.options && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                        {previewResult.content.options.map((opt, idx) => {
                          const isAns = idx === previewResult.content?.correctIndex;
                          return (
                            <div
                              key={idx}
                              className={`px-4 py-2.5 rounded-md border text-sm flex items-center gap-2 ${
                                showSolution && isAns
                                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-medium'
                                  : 'bg-slate-50 border-slate-200 text-slate-800'
                              }`}
                            >
                              <span className="font-semibold">
                                {String.fromCharCode(65 + idx)}.
                              </span>
                              <MathText text={opt} />
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Statements TF */}
                    {selectedTemplate.category === 'TF' && previewResult.content.tfStatements && (
                      <div className="divide-y divide-slate-200 border border-slate-200 rounded-md">
                        {previewResult.content.tfStatements.map((st) => (
                          <div
                            key={st.key}
                            className="px-4 py-2.5 flex items-center justify-between gap-4 text-sm"
                          >
                            <div className="flex-1 min-w-0">
                              <div>
                                <span className="font-semibold mr-2">{st.key})</span>
                                <MathText text={st.text} />
                              </div>
                              {st.diagram && <QuestionDiagram diagram={st.diagram} compact />}
                            </div>
                            {showSolution && (
                              <span
                                className={`text-xs font-semibold shrink-0 ${
                                  st.isTrue ? 'text-emerald-700' : 'text-red-600'
                                }`}
                              >
                                {st.isTrue ? 'Đúng' : 'Sai'}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Short Answer */}
                    {selectedTemplate.category === 'SA' && showSolution && (
                      <div className="px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-md text-sm text-emerald-900">
                        <span className="font-semibold">Đáp án chuẩn hóa: </span>
                        <span className="font-mono font-semibold">
                          {previewResult.content.shortAnswer}
                        </span>
                      </div>
                    )}

                    {/* Essay Rubric */}
                    {selectedTemplate.category === 'ES' &&
                      showSolution &&
                      previewResult.content.rubric && (
                        <div className="border border-slate-200 rounded-md overflow-hidden">
                          <div className="px-4 py-2 bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-700">
                            Biểu điểm chấm tự luận
                          </div>
                          <div className="divide-y divide-slate-100">
                            {previewResult.content.rubric.map((r, idx) => (
                              <div
                                key={idx}
                                className="px-4 py-2 flex items-center justify-between text-xs text-slate-700"
                              >
                                <span>{r.description}</span>
                                <span className="font-mono font-semibold tabular-nums">
                                  +{r.points} đ
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    {/* Step-by-step Solution */}
                    {showSolution && (
                      <div className="pt-4 border-t border-slate-200 space-y-2">
                        <div className="text-xs font-semibold text-slate-700">
                          Hướng dẫn giải chi tiết (tự động cập nhật theo bộ tham số)
                        </div>
                        <ol className="list-decimal list-inside space-y-1.5 text-sm text-slate-700">
                          {previewResult.content.solutionSteps.map((step, i) => (
                            <li key={i} className="leading-relaxed">
                              <MathText text={step} />
                            </li>
                          ))}
                        </ol>
                      </div>
                    )}
                  </div>
                )
              )}

              {/* 4-Variant Comparison Grid */}
              {showMultiVariants && multiVariants.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-slate-900">
                    4 biến thể số cụ thể sinh cùng lúc từ bài toán tổng quát
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {multiVariants.map((v) => (
                      <div
                        key={v.index}
                        className="bg-white border border-slate-200 rounded-lg p-4 space-y-2"
                      >
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <span className="font-semibold text-slate-800">
                            Biến thể #{v.index}
                          </span>
                          <span className="font-mono">
                            {Object.entries(v.content.params)
                              .map(([k, val]) => `${k}=${val}`)
                              .join(', ')}
                          </span>
                        </div>
                        <div className="text-xs leading-relaxed text-slate-800">
                          <MathText text={v.content.stem} />
                          <QuestionDiagram diagram={v.content.diagram} compact />
                        </div>
                        <div className="pt-1 text-xs text-emerald-700 font-medium">
                          Đáp án: <MathText text={v.content.answerSummary} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STRESS TEST TAB */}
          {subTab === 'stress' && stressReport && (
            <div className="max-w-5xl mx-auto space-y-5">
              <div className="bg-white border border-slate-200 rounded-lg p-5 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  {stressReport.passedAll ? (
                    <CheckCircle2 size={22} className="text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle size={22} className="text-red-600 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <h2 className="text-base font-semibold text-slate-900">
                      {stressReport.passedAll
                        ? 'Đạt 100% kiểm thử điều kiện biên & bất biến toán học'
                        : `Phát hiện ${stressReport.invariantFailures.length} vấn đề cần xử lý`}
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Đã thử {stressReport.totalRandomTrials} bộ tham số ngẫu nhiên ({stressReport.validRandomGenerated} hợp lệ,{' '}
                      {stressReport.rejectedInvalidRandom} bộ vi phạm miền xác định được chặn an toàn) và{' '}
                      {stressReport.boundaryResults.length} trường hợp biên đặc biệt.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setStressReport(runTemplateStressTest(selectedTemplate, 100))}
                  className="px-3.5 py-2 text-xs font-medium text-white bg-blue-700 rounded-md hover:bg-blue-800 flex items-center gap-1.5"
                >
                  <Play size={13} />
                  Chạy lại 100 mẫu + Biên
                </button>
              </div>

              {/* Boundary Cases Table */}
              <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-200 bg-slate-50">
                  <h3 className="text-xs font-semibold text-slate-800">
                    Kiểm tra các giá trị biên & trường hợp suy biến
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="border-b border-slate-200 text-slate-500">
                      <tr>
                        <th className="py-2.5 px-4 font-medium">Trường hợp kiểm thử</th>
                        <th className="py-2.5 px-4 font-medium">Tham số đầu vào</th>
                        <th className="py-2.5 px-4 font-medium">Bộ lọc điều kiện</th>
                        <th className="py-2.5 px-4 font-medium">Kết quả kiểm tra bất biến</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {stressReport.boundaryResults.map((br) => (
                        <tr key={br.id} className="hover:bg-slate-50">
                          <td className="py-2.5 px-4 font-medium text-slate-800">{br.label}</td>
                          <td className="py-2.5 px-4 font-mono text-slate-600">
                            {Object.entries(br.params)
                              .map(([k, v]) => `${k}=${v}`)
                              .join(', ')}
                          </td>
                          <td className="py-2.5 px-4">
                            {br.valid ? (
                              <span className="text-emerald-700 font-medium">Chấp nhận (hợp lệ)</span>
                            ) : (
                              <span className="text-amber-700">
                                Đã chặn: {br.reason || 'Vi phạm điều kiện'}
                              </span>
                            )}
                          </td>
                          <td className="py-2.5 px-4">
                            {br.passedInvariant ? (
                              <span className="text-emerald-700 font-medium flex items-center gap-1">
                                <Check size={13} /> An toàn
                              </span>
                            ) : (
                              <span className="text-red-600 font-medium">
                                {br.invariantErrors.join('; ')}
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Any random invariant failures */}
              {stressReport.invariantFailures.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 space-y-2">
                  <div className="text-xs font-semibold text-red-800">
                    Chi tiết lỗi phát hiện trong 100 mẫu ngẫu nhiên:
                  </div>
                  {stressReport.invariantFailures.map((f) => (
                    <div key={f.id} className="text-xs text-red-700 font-mono">
                      • {f.label} ({JSON.stringify(f.params)}): {f.invariantErrors.join('; ')}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* INTERACTIVE BOUNDARY TEST TAB */}
          {subTab === 'boundary' && draftTemplate && (
            <div className="max-w-5xl mx-auto space-y-5">
              {/* Unsaved draft banner if teacher edited formulas before saving */}
              {hasUnsavedEdits && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs text-amber-900">
                    <AlertTriangle size={15} className="text-amber-700 shrink-0" />
                    <span>
                      Đang kiểm thử trên bản nháp chưa lưu — xác minh độ ổn định công thức với các giá trị biên trước khi lưu.
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {saveFeedback && (
                      <span className="text-xs font-medium text-emerald-700">{saveFeedback}</span>
                    )}
                    <button
                      onClick={handleSaveTemplateEdits}
                      className="px-3.5 py-1.5 text-xs font-medium text-white bg-blue-700 rounded-md hover:bg-blue-800 flex items-center gap-1.5 whitespace-nowrap shrink-0"
                    >
                      <Save size={13} />
                      Lưu bản nháp này
                    </button>
                  </div>
                </div>
              )}

              {/* Edge-Case Parameter Input Deck */}
              <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-4">
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-200 pb-3.5">
                  <div>
                    <h2 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                      <FlaskConical size={16} className="text-blue-700 shrink-0" />
                      Kiểm thử giá trị biên tùy chỉnh (Boundary Test)
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Nhập trực tiếp giá trị biên như 0, số âm hoặc số rất lớn (vượt ngoài miền ngẫu nhiên) để kiểm tra điều kiện chặn và độ bền công thức trước khi lưu.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={handleRunEdgeSweep}
                      className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 flex items-center gap-1.5 whitespace-nowrap shrink-0"
                    >
                      <Play size={13} />
                      Quét nhanh bộ biên chuẩn
                    </button>
                    <button
                      onClick={() => handleRunCustomBoundaryTest()}
                      className="px-3.5 py-1.5 text-xs font-medium text-white bg-blue-700 rounded-md hover:bg-blue-800 flex items-center gap-1.5 whitespace-nowrap shrink-0"
                    >
                      <FlaskConical size={13} />
                      Chạy Boundary Test
                    </button>
                  </div>
                </div>

                {/* Preset Fill Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-xs font-medium text-slate-600 mr-1">
                      Điền nhanh tổ hợp biên:
                    </span>
                    <button
                      type="button"
                      onClick={() => handleApplyBoundaryPreset('zero')}
                      className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded transition-colors whitespace-nowrap"
                    >
                      Tất cả = 0
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApplyBoundaryPreset('negative')}
                      className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded transition-colors whitespace-nowrap"
                    >
                      Số âm (-5, -10...)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApplyBoundaryPreset('largePos')}
                      className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded transition-colors whitespace-nowrap"
                    >
                      Cực lớn dương (10⁵)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApplyBoundaryPreset('largeNeg')}
                      className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded transition-colors whitespace-nowrap"
                    >
                      Cực lớn âm (-10⁵)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApplyBoundaryPreset('mid')}
                      className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded transition-colors whitespace-nowrap"
                    >
                      Giữa miền mặc định
                    </button>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <label htmlFor="boundary-expectation" className="text-slate-600 font-medium">
                      Kỳ vọng:
                    </label>
                    <select
                      id="boundary-expectation"
                      value={boundaryExpectation}
                      onChange={(e) => {
                        const nextExp = e.target.value as BoundaryExpectation;
                        setBoundaryExpectation(nextExp);
                        handleRunCustomBoundaryTest(undefined, nextExp);
                      }}
                      className="px-2.5 py-1 text-xs border border-slate-300 rounded-md bg-white text-slate-800 focus:outline-none focus:border-blue-600"
                    >
                      <option value="auto">Tự động đánh giá</option>
                      <option value="valid">Phải hợp lệ (sinh đề đúng)</option>
                      <option value="invalid">Phải bị chặn (suy biến)</option>
                    </select>
                  </div>
                </div>

                {/* Variable Inputs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {draftParamSpecs.map((spec) => {
                    const val = boundaryInputs[spec.name] ?? '0';
                    const setParamVal = (newVal: string) => {
                      const next = { ...boundaryInputs, [spec.name]: newVal };
                      setBoundaryInputs(next);
                    };
                    return (
                      <div
                        key={spec.name}
                        className="p-3.5 bg-slate-50 border border-slate-200 rounded-md space-y-2"
                      >
                        <div className="flex items-center justify-between gap-2 text-xs">
                          <label
                            htmlFor={`boundary-param-${spec.name}`}
                            className="font-semibold text-slate-800 truncate"
                          >
                            {spec.label} (<span className="font-mono">{spec.name}</span>)
                          </label>
                          <span className="font-mono tabular-nums text-slate-500 shrink-0">
                            [{spec.min}; {spec.max}]
                          </span>
                        </div>

                        <input
                          id={`boundary-param-${spec.name}`}
                          type="number"
                          step="any"
                          value={val}
                          onChange={(e) => setParamVal(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleRunCustomBoundaryTest();
                            }
                          }}
                          className="w-full px-3 py-1.5 text-sm font-mono tabular-nums bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:border-blue-600"
                          placeholder="Nhập số biên..."
                        />

                        <div className="flex items-center gap-1 flex-wrap">
                          {[
                            { lbl: '0', v: '0' },
                            { lbl: '-1', v: '-1' },
                            { lbl: 'Min', v: String(spec.min) },
                            { lbl: 'Max', v: String(spec.max) },
                            { lbl: '10⁶', v: '1000000' },
                            { lbl: '-10⁶', v: '-1000000' },
                          ].map((q) => (
                            <button
                              key={q.lbl}
                              type="button"
                              onClick={() => {
                                const next = { ...boundaryInputs, [spec.name]: q.v };
                                setBoundaryInputs(next);
                                handleRunCustomBoundaryTest(next);
                              }}
                              className="px-2 py-0.5 text-[11px] font-mono tabular-nums text-slate-600 bg-white border border-slate-200 rounded hover:border-blue-400 hover:text-blue-700 transition-colors"
                            >
                              {q.lbl}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Single Custom Boundary Test Result */}
              {boundaryResult && (
                <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                  <div
                    className={`px-5 py-3.5 border-b flex flex-wrap items-center justify-between gap-3 ${
                      boundaryResult.status === 'passed'
                        ? 'bg-emerald-50 border-emerald-200'
                        : boundaryResult.status === 'blocked'
                        ? 'bg-amber-50 border-amber-200'
                        : 'bg-red-50 border-red-200'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      {boundaryResult.status === 'passed' ? (
                        <CheckCircle2 size={18} className="text-emerald-700 shrink-0 mt-0.5" />
                      ) : boundaryResult.status === 'blocked' ? (
                        <ShieldCheck size={18} className="text-amber-700 shrink-0 mt-0.5" />
                      ) : (
                        <AlertTriangle size={18} className="text-red-700 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <div
                          className={`text-sm font-semibold ${
                            boundaryResult.status === 'passed'
                              ? 'text-emerald-950'
                              : boundaryResult.status === 'blocked'
                              ? 'text-amber-950'
                              : 'text-red-950'
                          }`}
                        >
                          {boundaryResult.status === 'passed'
                            ? 'Hợp lệ & Đạt 100% bất biến toán học'
                            : boundaryResult.status === 'blocked'
                            ? 'An toàn — Đã chặn giá trị biên suy biến'
                            : boundaryResult.status === 'mismatch'
                            ? 'Không khớp kỳ vọng kiểm thử'
                            : 'Phát hiện lỗi công thức / vi phạm bất biến'}
                        </div>
                        <div className="text-xs text-slate-600 mt-0.5 font-mono tabular-nums">
                          Đầu vào:{' '}
                          {Object.entries(boundaryResult.params)
                            .map(([k, v]) => `${k}=${Number.isNaN(v) ? 'NaN' : v}`)
                            .join(', ')}{' '}
                          · {boundaryResult.executedAt}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {(boundaryResult.status === 'error' || boundaryResult.status === 'mismatch') && (
                        <button
                          onClick={() => setSubTab('editor')}
                          className="px-3 py-1.5 text-xs font-medium text-red-800 bg-white border border-red-300 rounded-md hover:bg-red-50 whitespace-nowrap"
                        >
                          Mở mã sinh để sửa
                        </button>
                      )}
                      {hasUnsavedEdits &&
                        (boundaryResult.status === 'passed' || boundaryResult.status === 'blocked') && (
                          <button
                            onClick={handleSaveTemplateEdits}
                            className="px-3.5 py-1.5 text-xs font-medium text-white bg-blue-700 rounded-md hover:bg-blue-800 flex items-center gap-1.5 whitespace-nowrap"
                          >
                            <Save size={13} />
                            Lưu công thức
                          </button>
                        )}
                    </div>
                  </div>

                  <div className="p-5 space-y-4">
                    {boundaryResult.status === 'blocked' && (
                      <div className="text-sm text-slate-700">
                        <span className="font-semibold text-slate-900">Lý do chặn từ hàm validate: </span>
                        {boundaryResult.reason}
                      </div>
                    )}

                    {boundaryResult.errors.length > 0 && (
                      <div className="p-3.5 bg-red-50 border border-red-200 rounded-md space-y-1.5">
                        <div className="text-xs font-semibold text-red-900">
                          Chi tiết lỗi cần khắc phục:
                        </div>
                        <ul className="list-disc list-inside text-xs text-red-800 space-y-1">
                          {boundaryResult.errors.map((err, idx) => (
                            <li key={idx}>{err}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {boundaryResult.content && (
                      <div className="space-y-4">
                        <div className="text-[15px] leading-relaxed text-slate-900">
                          <span className="font-semibold mr-1.5">Đề bài sinh ra:</span>
                          <MathText text={boundaryResult.content.stem} />
                          <QuestionDiagram diagram={boundaryResult.content.diagram} />
                        </div>

                        {draftTemplate.category === 'MC' && boundaryResult.content.options && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {boundaryResult.content.options.map((opt, idx) => {
                              const isAns = idx === boundaryResult.content?.correctIndex;
                              return (
                                <div
                                  key={idx}
                                  className={`px-4 py-2.5 rounded-md border text-sm flex items-center gap-2 ${
                                    isAns
                                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-medium'
                                      : 'bg-slate-50 border-slate-200 text-slate-800'
                                  }`}
                                >
                                  <span className="font-semibold">
                                    {String.fromCharCode(65 + idx)}.
                                  </span>
                                  <MathText text={opt} />
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {draftTemplate.category === 'TF' && boundaryResult.content.tfStatements && (
                          <div className="divide-y divide-slate-200 border border-slate-200 rounded-md">
                            {boundaryResult.content.tfStatements.map((st) => (
                              <div
                                key={st.key}
                                className="px-4 py-2.5 flex items-center justify-between gap-4 text-sm"
                              >
                                <div className="flex-1 min-w-0">
                                  <div>
                                    <span className="font-semibold mr-2">{st.key})</span>
                                    <MathText text={st.text} />
                                  </div>
                                  {st.diagram && <QuestionDiagram diagram={st.diagram} compact />}
                                </div>
                                <span
                                  className={`text-xs font-semibold shrink-0 ${
                                    st.isTrue ? 'text-emerald-700' : 'text-red-600'
                                  }`}
                                >
                                  {st.isTrue ? 'Đúng' : 'Sai'}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}

                        {draftTemplate.category === 'SA' && (
                          <div className="px-4 py-2.5 bg-emerald-50 border border-emerald-200 rounded-md text-sm text-emerald-900">
                            <span className="font-semibold">Đáp án chuẩn hóa: </span>
                            <span className="font-mono font-semibold">
                              {boundaryResult.content.shortAnswer}
                            </span>
                          </div>
                        )}

                        {draftTemplate.category === 'ES' && boundaryResult.content.rubric && (
                          <div className="border border-slate-200 rounded-md overflow-hidden">
                            <div className="px-4 py-2 bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-700">
                              Biểu điểm tự luận
                            </div>
                            <div className="divide-y divide-slate-100">
                              {boundaryResult.content.rubric.map((r, idx) => (
                                <div
                                  key={idx}
                                  className="px-4 py-2 flex items-center justify-between text-xs text-slate-700"
                                >
                                  <span>{r.description}</span>
                                  <span className="font-mono font-semibold tabular-nums">
                                    +{r.points} đ
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="pt-3 border-t border-slate-200 space-y-1.5">
                          <div className="text-xs font-semibold text-slate-700">
                            Lời giải chi tiết với giá trị biên đang thử
                          </div>
                          <ol className="list-decimal list-inside space-y-1 text-sm text-slate-700">
                            {boundaryResult.content.solutionSteps.map((step, i) => (
                              <li key={i} className="leading-relaxed">
                                <MathText text={step} />
                              </li>
                            ))}
                          </ol>
                        </div>
                      </div>
                    )}

                    {/* Save this edge case into template boundaryCases */}
                    {(boundaryResult.status === 'passed' || boundaryResult.status === 'blocked') && (
                      <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
                        <input
                          value={boundaryCaseLabel}
                          onChange={(e) => setBoundaryCaseLabel(e.target.value)}
                          placeholder="Nhãn trường hợp biên (vd: Biên a cực lớn = 10^6)"
                          className="flex-1 min-w-[220px] px-3 py-1.5 text-xs border border-slate-300 rounded-md focus:outline-none focus:border-blue-600"
                        />
                        <button
                          type="button"
                          onClick={handleAddCurrentBoundaryCase}
                          className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 flex items-center gap-1.5 whitespace-nowrap"
                        >
                          <Plus size={13} />
                          Thêm vào bộ test biên ({draftBoundaryCases.length})
                        </button>
                      </div>
                    )}
                    {boundarySavedNotice && (
                      <div className="text-xs text-emerald-700 font-medium">
                        {boundarySavedNotice}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Edge Sweep Batch Results */}
              {edgeSweepResults && edgeSweepResults.length > 0 && (
                <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                  <div className="px-4 py-3 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
                    <h3 className="text-xs font-semibold text-slate-800">
                      Kết quả quét tự động bộ giá trị biên (0, âm, cực lớn, min/max)
                    </h3>
                    <span className="text-xs text-slate-500">
                      Nhấp vào một dòng để nạp tham số và xem đề chi tiết
                    </span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="border-b border-slate-200 text-slate-500">
                        <tr>
                          <th className="py-2.5 px-4 font-medium">Tình huống biên</th>
                          <th className="py-2.5 px-4 font-medium">Tham số</th>
                          <th className="py-2.5 px-4 font-medium">Trạng thái</th>
                          <th className="py-2.5 px-4 font-medium">Chi tiết kiểm tra</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {edgeSweepResults.map((row, idx) => (
                          <tr
                            key={idx}
                            onClick={() => {
                              const nextInputs: Record<string, string> = {};
                              Object.entries(row.result.params).forEach(([k, v]) => {
                                nextInputs[k] = String(v);
                              });
                              setBoundaryInputs(nextInputs);
                              setBoundaryResult(row.result);
                            }}
                            className="hover:bg-slate-50 cursor-pointer transition-colors"
                          >
                            <td className="py-2.5 px-4 font-medium text-slate-800">{row.label}</td>
                            <td className="py-2.5 px-4 font-mono tabular-nums text-slate-600">
                              {Object.entries(row.result.params)
                                .map(([k, v]) => `${k}=${v}`)
                                .join(', ')}
                            </td>
                            <td className="py-2.5 px-4 whitespace-nowrap">
                              {row.result.status === 'passed' ? (
                                <span className="text-emerald-700 font-medium inline-flex items-center gap-1">
                                  <Check size={13} /> Sinh đề an toàn
                                </span>
                              ) : row.result.status === 'blocked' ? (
                                <span className="text-amber-700 font-medium inline-flex items-center gap-1">
                                  <ShieldCheck size={13} /> Đã chặn suy biến
                                </span>
                              ) : (
                                <span className="text-red-600 font-medium inline-flex items-center gap-1">
                                  <AlertTriangle size={13} /> Lỗi công thức
                                </span>
                              )}
                            </td>
                            <td className="py-2.5 px-4 text-slate-600">
                              {row.result.status === 'passed'
                                ? `Đáp án: ${row.result.content?.answerSummary || ''}`
                                : row.result.status === 'blocked'
                                ? row.result.reason
                                : row.result.errors.join('; ')}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* EDITOR TAB */}
          {subTab === 'editor' && (
            <div className="max-w-5xl mx-auto space-y-5">
              <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2">
                    <Sliders size={16} className="text-blue-700" />
                    <h2 className="text-sm font-semibold text-slate-900">
                      Cấu hình miền tham số & Điều kiện ràng buộc
                    </h2>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {saveFeedback && (
                      <span className="text-xs text-emerald-700 font-medium">{saveFeedback}</span>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setSubTab('boundary');
                        handleRunCustomBoundaryTest();
                      }}
                      className="px-3.5 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 flex items-center gap-1.5 whitespace-nowrap"
                    >
                      <FlaskConical size={13} />
                      Boundary Test bản nháp
                    </button>
                    <button
                      onClick={handleSaveTemplateEdits}
                      className="px-4 py-1.5 text-xs font-medium text-white bg-blue-700 rounded-md hover:bg-blue-800 flex items-center gap-1.5 whitespace-nowrap"
                    >
                      <Save size={13} />
                      Lưu & Kiểm thử lại
                    </button>
                  </div>
                </div>

                {editError && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-md text-xs text-red-700">
                    {editError}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Mô tả điều kiện ràng buộc toán học
                  </label>
                  <input
                    value={draftCondition}
                    onChange={(e) => setDraftCondition(e.target.value)}
                    className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-md focus:outline-none focus:border-blue-600"
                  />
                </div>

                {/* Parameter Bounds */}
                <div>
                  <div className="text-xs font-medium text-slate-700 mb-2">
                    Miền giá trị tham số sinh ngẫu nhiên
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {draftParamSpecs.map((spec, idx) => (
                      <div
                        key={spec.name}
                        className="p-3 bg-slate-50 border border-slate-200 rounded-md flex items-center justify-between gap-3 text-xs"
                      >
                        <div>
                          <div className="font-semibold text-slate-800">
                            {spec.label} (<span className="font-mono">{spec.name}</span>)
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <label className="text-slate-500">Min</label>
                          <input
                            type="number"
                            value={spec.min}
                            onChange={(e) => {
                              const next = [...draftParamSpecs];
                              next[idx].min = Number(e.target.value);
                              setDraftParamSpecs(next);
                            }}
                            className="w-16 px-2 py-1 bg-white border border-slate-300 rounded font-mono tabular-nums"
                          />
                          <label className="text-slate-500">Max</label>
                          <input
                            type="number"
                            value={spec.max}
                            onChange={(e) => {
                              const next = [...draftParamSpecs];
                              next[idx].max = Number(e.target.value);
                              setDraftParamSpecs(next);
                            }}
                            className="w-16 px-2 py-1 bg-white border border-slate-300 rounded font-mono tabular-nums"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Validator & Generator Code */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                      Hàm kiểm tra điều kiện (validate)
                    </label>
                    <textarea
                      value={draftValidateCode}
                      onChange={(e) => setDraftValidateCode(e.target.value)}
                      rows={10}
                      spellCheck={false}
                      className="w-full p-3 font-mono text-xs bg-slate-900 text-slate-100 rounded-md border border-slate-700 focus:outline-none focus:border-blue-500 leading-relaxed"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                      Hàm sinh bài toán & lời giải (generate)
                    </label>
                    <textarea
                      value={draftGenerateCode}
                      onChange={(e) => setDraftGenerateCode(e.target.value)}
                      rows={10}
                      spellCheck={false}
                      className="w-full p-3 font-mono text-xs bg-slate-900 text-slate-100 rounded-md border border-slate-700 focus:outline-none focus:border-blue-500 leading-relaxed"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // 3. Lesson Overview (when Lesson is clicked without a specific Template)
  if (selectedLesson && selectedChapter && selectedClass) {
    const allTemplates = (['MC', 'TF', 'SA', 'ES'] as QuestionCategory[]).flatMap((cat) =>
      selectedLesson.mathTypes[cat].map((tpl) => ({ cat, tpl }))
    );

    return (
      <div className="flex-1 min-w-0 overflow-y-auto p-6 bg-[#F8FAFC]">
        <div className="max-w-5xl mx-auto space-y-5">
          <div className="bg-white border border-slate-200 rounded-lg p-5 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-xs text-slate-500 mb-1">
                {selectedClass.name} / {selectedChapter.name}
              </div>
              <h1 className="text-xl font-semibold text-slate-900">{selectedLesson.name}</h1>
              <p className="text-xs text-slate-500 mt-1">
                Quản lý các dạng toán động trong bài học · Tổng cộng {allTemplates.length} dạng toán
              </p>
            </div>
            <div className="flex items-center gap-2">
              {(['MC', 'TF', 'SA', 'ES'] as QuestionCategory[]).map((cat) => (
                <button
                  key={cat}
                  onClick={() => onTriggerAddTemplate(selectedLesson.id, cat)}
                  className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 flex items-center gap-1 whitespace-nowrap"
                >
                  <Plus size={13} />
                  Thêm {cat}
                </button>
              ))}
            </div>
          </div>

          {allTemplates.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-lg p-10 text-center">
              <p className="text-sm font-medium text-slate-700">
                Bài học này chưa có dạng toán động nào
              </p>
              <p className="text-xs text-slate-500 mt-1 mb-4">
                Chọn một cấu trúc câu hỏi (MC, TF, SA, ES) ở trên để tạo bài toán tổng quát mới.
              </p>
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-200 text-xs text-slate-600">
                  <tr>
                    <th className="py-3 px-4 font-medium">Dạng toán động</th>
                    <th className="py-3 px-4 font-medium w-28">Cấu trúc</th>
                    <th className="py-3 px-4 font-medium w-28">Mức độ</th>
                    <th className="py-3 px-4 font-medium">Điều kiện biên đảm bảo</th>
                    <th className="py-3 px-4 font-medium text-right w-32">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {allTemplates.map(({ cat, tpl }) => (
                    <tr
                      key={tpl.id}
                      onClick={() =>
                        onSelectTemplate(tpl, selectedLesson, selectedChapter, selectedClass)
                      }
                      className="hover:bg-slate-50 cursor-pointer transition-colors"
                    >
                      <td className="py-3 px-4 font-medium text-slate-900">{tpl.name}</td>
                      <td className="py-3 px-4 font-mono text-xs text-slate-600">{cat}</td>
                      <td className="py-3 px-4 text-xs text-slate-700">{tpl.level}</td>
                      <td className="py-3 px-4 text-xs text-slate-500">{tpl.conditionSummary}</td>
                      <td className="py-3 px-4 text-right">
                        <span className="text-xs font-medium text-blue-700 hover:underline">
                          Mở trình sinh
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  }

  // 4. Empty initial welcome
  return (
    <div className="flex-1 min-w-0 flex items-center justify-center p-8 bg-[#F8FAFC]">
      <div className="max-w-md text-center space-y-2">
        <h2 className="text-lg font-semibold text-slate-900">
          Ngân hàng Câu hỏi Động Toán THPT 2018
        </h2>
        <p className="text-sm text-slate-500">
          Chọn một bài học hoặc dạng toán ở cây chương trình bên trái để sinh đề ngẫu nhiên, kiểm thử giá trị biên hoặc tùy chỉnh mã sinh.
        </p>
      </div>
    </div>
  );
};
