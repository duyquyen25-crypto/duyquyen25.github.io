import React, { useMemo, useRef, useState } from 'react';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Download,
  Eye,
  FileCode2,
  FileSpreadsheet,
  FileText,
  FolderCheck,
  FolderOpen,
  Layers,
  Printer,
  Sparkles,
  X,
} from 'lucide-react';
import {
  ClassCurriculumNode,
  CognitiveLevel,
  ExamPaper,
  ExamQuestionInstance,
  MathTemplate,
  QuestionCategory,
} from '../types/math';
import { generateValidInstance } from '../engine/templateRunner';
import { MathText } from './MathText';
import { QuestionDiagram } from './QuestionDiagram';
import {
  buildUniqueExamFilename,
  exportAllExamsToDocx,
  exportAllExamsToTex,
  exportElementToPdf,
  exportExamToDocx,
  exportExamToTex,
  exportRowsToCsv,
  generateTexSource,
  pickSaveDirectory,
  resolveExamHeaderFields,
  sanitizeExamFileBase,
  SaveDirectoryHandle,
  splitSchoolUnderline,
  TexExportFormat,
} from '../utils/exporters';

interface ExamMatrixViewProps {
  treeData: ClassCurriculumNode[];
  checkedTemplateIds: string[];
  onSetCheckedIds: (ids: string[]) => void;
  countsByTemplate: Record<string, number>;
  onUpdateTemplateCount: (templateId: string, count: number) => void;
  generatedExams: ExamPaper[];
  onSaveGeneratedExams: (newPapers: ExamPaper[]) => void;
}

interface SelectedTemplateMeta {
  template: MathTemplate;
  lessonId: string;
  lessonName: string;
  chapterName: string;
  classId: string;
  className: string;
}

const DEFAULT_POINTS: Record<QuestionCategory, number> = {
  MC: 0.25,
  TF: 1.0,
  SA: 0.5,
  ES: 1.5,
};

const ExamOfficialHeader: React.FC<{
  departmentName: string;
  schoolLevel: string;
  schoolName: string;
  groupName: string;
  title: string;
  schoolYear: string;
  subjectLabel: string;
  durationMinutes: number;
  code: string;
  compact?: boolean;
}> = ({
  departmentName,
  schoolLevel,
  schoolName,
  groupName,
  title,
  schoolYear,
  subjectLabel,
  durationMinutes,
  code,
  compact = false,
}) => {
  const [pre, mid, suf] = splitSchoolUnderline(schoolName);
  return (
    <div
      data-pdf-block=""
      className={`font-serif text-slate-950 border-b border-slate-900 ${
        compact ? 'pb-2 text-[12px] leading-snug' : 'pb-3 text-[13.5px] leading-snug'
      }`}
    >
      <div className="grid grid-cols-12 gap-3 items-start">
        <div className="col-span-6 text-center">
          <div>{departmentName || 'SỞ GD & ĐT LÂM ĐỒNG'}</div>
          <div className="font-bold">{schoolLevel || 'TRƯỜNG THPT'}</div>
          <div className="font-bold">
            {pre}
            <span className="underline underline-offset-2">{mid}</span>
            {suf}
          </div>
          <div className="font-bold">{groupName || 'TỔ TỰ NHIÊN'}</div>
          <div className="mt-1">
            (<span className="italic">Đề thi có ... trang</span>)
          </div>
        </div>
        <div className="col-span-6 text-center">
          <div className="font-bold">{title || 'ĐỀ KIỂM TRA GIỮA HỌC KÌ 1'}</div>
          <div className="font-bold">{schoolYear || 'NĂM HỌC: 2026 - 2027'}</div>
          <div className="font-bold">Môn thi: {subjectLabel || 'TOÁN 11'}</div>
          <div className="italic">
            Thời <span className="underline underline-offset-2">gian làm bài: {durationMinutes || 90}</span> phút
          </div>
          <div className="inline-block mt-1.5 px-2.5 py-0.5 border border-slate-950 font-bold">
            Mã đề: {code}
          </div>
        </div>
      </div>
      <div className={compact ? 'mt-2 text-[11.5px]' : 'mt-3 text-[13px]'}>
        <span>Họ và tên thí sinh: ...........................................</span>
        <span className="ml-4">Số báo danh: ..........................</span>
      </div>
    </div>
  );
};

export const ExamMatrixView: React.FC<ExamMatrixViewProps> = ({
  treeData,
  checkedTemplateIds,
  onSetCheckedIds,
  countsByTemplate,
  onUpdateTemplateCount,
  generatedExams,
  onSaveGeneratedExams,
}) => {
  const [departmentName, setDepartmentName] = useState('SỞ GD & ĐT LÂM ĐỒNG');
  const [schoolLevel, setSchoolLevel] = useState('TRƯỜNG THPT');
  const [schoolName, setSchoolName] = useState('HUỲNH THÚC KHÁNG - SƠN MỸ');
  const [groupName, setGroupName] = useState('TỔ TỰ NHIÊN');
  const [examTitle, setExamTitle] = useState('ĐỀ KIỂM TRA  GIỮA HỌC KÌ 1');
  const [schoolYear, setSchoolYear] = useState('NĂM HỌC: 2026 - 2027');
  const [subjectLabel, setSubjectLabel] = useState('TOÁN 11');
  const [durationMinutes, setDurationMinutes] = useState(90);
  const [startCodeInput, setStartCodeInput] = useState('101');
  const startCode = Math.max(100, Math.min(999, Math.floor(Number(startCodeInput) || 101)));
  const [variantCountInput, setVariantCountInput] = useState('12');
  const variantCount = Math.max(1, Math.min(100, Math.floor(Number(variantCountInput) || 1)));
  const [includeSolutions, setIncludeSolutions] = useState(true);
  const [texFormat, setTexFormat] = useState<TexExportFormat>('amsmath');
  const [showTexPreview, setShowTexPreview] = useState(false);
  const [texCopied, setTexCopied] = useState(false);
  const [activeExamId, setActiveExamId] = useState<string | null>(
    generatedExams[0]?.id || null
  );
  const [viewMode, setViewMode] = useState<'matrix' | 'exam'>('matrix');
  const [toastMsg, setToastMsg] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState('');
  const [saveDirHandle, setSaveDirHandle] = useState<SaveDirectoryHandle | null>(null);

  const printableRef = useRef<HTMLDivElement>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 4200);
  };

  // Flatten checked templates with full hierarchy metadata
  const selectedMetas = useMemo(() => {
    const list: SelectedTemplateMeta[] = [];
    treeData.forEach((cls) => {
      cls.children.forEach((chap) => {
        chap.children.forEach((lesson) => {
          (['MC', 'TF', 'SA', 'ES'] as QuestionCategory[]).forEach((cat) => {
            lesson.mathTypes[cat].forEach((tpl) => {
              if (checkedTemplateIds.includes(tpl.id)) {
                list.push({
                  template: tpl,
                  lessonId: lesson.id,
                  lessonName: lesson.name,
                  chapterName: chap.name,
                  classId: cls.id,
                  className: cls.name,
                });
              }
            });
          });
        });
      });
    });
    return list;
  }, [treeData, checkedTemplateIds]);

  const getCount = (tplId: string) => Math.max(1, countsByTemplate[tplId] ?? 1);

  const updateCount = (tplId: string, val: number) => {
    onUpdateTemplateCount(tplId, val);
  };

  // Build Matrix Aggregation by Chapter -> Lesson
  const matrixData = useMemo(() => {
    type LevelCounts = { B: number; H: number; VD: number };
    const emptyL = (): LevelCounts => ({ B: 0, H: 0, VD: 0 });
    const levelKey = (l: CognitiveLevel): keyof LevelCounts =>
      l === 'Biết' ? 'B' : l === 'Hiểu' ? 'H' : 'VD';

    const chapterMap = new Map<
      string,
      {
        chapterName: string;
        lessons: Array<{
          lessonName: string;
          mc: LevelCounts;
          tf: LevelCounts;
          sa: LevelCounts;
          es: LevelCounts;
          totalQ: number;
          totalScore: number;
        }>;
      }
    >();

    const totals = {
      mc: emptyL(),
      tf: emptyL(),
      sa: emptyL(),
      es: emptyL(),
      all: emptyL(),
      totalQ: 0,
      totalScore: 0,
    };

    const lessonLookup = new Map<
      string,
      {
        chapterName: string;
        lessonName: string;
        mc: LevelCounts;
        tf: LevelCounts;
        sa: LevelCounts;
        es: LevelCounts;
        totalQ: number;
        totalScore: number;
      }
    >();

    selectedMetas.forEach((m) => {
      const qty = getCount(m.template.id);
      const lk = `${m.chapterName}::${m.lessonName}`;
      if (!lessonLookup.has(lk)) {
        lessonLookup.set(lk, {
          chapterName: m.chapterName,
          lessonName: m.lessonName,
          mc: emptyL(),
          tf: emptyL(),
          sa: emptyL(),
          es: emptyL(),
          totalQ: 0,
          totalScore: 0,
        });
      }
      const row = lessonLookup.get(lk)!;
      const catKey = m.template.category.toLowerCase() as 'mc' | 'tf' | 'sa' | 'es';
      const lKey = levelKey(m.template.level);
      const pts = DEFAULT_POINTS[m.template.category] * qty;

      row[catKey][lKey] += qty;
      row.totalQ += qty;
      row.totalScore += pts;

      totals[catKey][lKey] += qty;
      totals.all[lKey] += qty;
      totals.totalQ += qty;
      totals.totalScore += pts;
    });

    lessonLookup.forEach((row) => {
      if (!chapterMap.has(row.chapterName)) {
        chapterMap.set(row.chapterName, { chapterName: row.chapterName, lessons: [] });
      }
      chapterMap.get(row.chapterName)!.lessons.push(row);
    });

    return {
      chapters: Array.from(chapterMap.values()),
      totals,
    };
  }, [selectedMetas, countsByTemplate]);

  const handleQuickSelectGrade = (gradeId: 'l10' | 'l11' | 'l12') => {
    const cls = treeData.find((c) => c.id === gradeId);
    if (!cls) return;
    const ids: string[] = [];
    cls.children.forEach((chap) =>
      chap.children.forEach((lesson) =>
        (['MC', 'TF', 'SA', 'ES'] as QuestionCategory[]).forEach((cat) =>
          lesson.mathTypes[cat].forEach((tpl) => ids.push(tpl.id))
        )
      )
    );
    const gradeSubject = gradeId === 'l10' ? 'TOÁN 10' : gradeId === 'l11' ? 'TOÁN 11' : 'TOÁN 12';
    setSubjectLabel(gradeSubject);
    onSetCheckedIds(ids);
    showToast(`Đã chọn tất cả ${ids.length} dạng toán thuộc ${cls.name} (${gradeSubject})`);
  };

  const handleGenerateExams = () => {
    if (selectedMetas.length === 0) {
      showToast('Vui lòng chọn ít nhất 1 dạng toán ở cây chương trình bên trái.');
      return;
    }

    const baseSeed = Date.now() % 100000;
    const newPapers: ExamPaper[] = [];
    const gradeSet = new Set(selectedMetas.map((m) => m.className));
    const gradeLabel = gradeSet.size === 1 ? Array.from(gradeSet)[0] : 'Tổng hợp THPT';

    for (let v = 0; v < variantCount; v++) {
      const code = String(startCode + v);
      const questions: ExamQuestionInstance[] = [];
      let order = 1;
      let totalPoints = 0;

      // Sort by category order MC -> TF -> SA -> ES
      const catOrder: Record<QuestionCategory, number> = { MC: 1, TF: 2, SA: 3, ES: 4 };
      const sortedMetas = [...selectedMetas].sort(
        (a, b) => catOrder[a.template.category] - catOrder[b.template.category]
      );

      sortedMetas.forEach((m) => {
        const qty = getCount(m.template.id);
        for (let qIdx = 0; qIdx < qty; qIdx++) {
          const seed = baseSeed + v * 7919 + order * 313 + qIdx * 47;
          const { content } = generateValidInstance(m.template, seed);
          const pts = DEFAULT_POINTS[m.template.category];
          totalPoints += pts;
          questions.push({
            instanceId: `ex_${code}_q${order}_${seed}`,
            order,
            templateId: m.template.id,
            templateName: m.template.name,
            lessonId: m.lessonId,
            lessonName: m.lessonName,
            chapterName: m.chapterName,
            className: m.className,
            category: m.template.category,
            level: m.template.level,
            points: pts,
            content,
          });
          order++;
        }
      });

      newPapers.push({
        id: `exam_${Date.now()}_${code}`,
        code,
        title: examTitle,
        departmentName,
        schoolLevel,
        schoolName,
        groupName,
        schoolYear,
        subject: 'Toán học',
        subjectLabel,
        gradeLabel,
        durationMinutes,
        createdAt: new Date().toISOString().slice(0, 10),
        questions,
        totalPoints: Number(totalPoints.toFixed(2)),
      });
    }

    onSaveGeneratedExams(newPapers);
    setActiveExamId(newPapers[0].id);
    setViewMode('exam');
    showToast(`Đã sinh thành công ${newPapers.length} mã đề (${newPapers[0].code} – ${newPapers[newPapers.length - 1].code}) với số liệu khác nhau.`);
  };

  const activeExam =
    generatedExams.find((e) => e.id === activeExamId) || generatedExams[0] || null;

  const previewTexSource = useMemo(() => {
    if (!showTexPreview || !activeExam) return '';
    return generateTexSource([activeExam], includeSolutions, texFormat);
  }, [showTexPreview, activeExam, includeSolutions, texFormat]);

  const handleCopyTexSource = async () => {
    if (!previewTexSource) return;
    try {
      await navigator.clipboard.writeText(previewTexSource);
      setTexCopied(true);
      showToast('Đã sao chép toàn bộ mã nguồn LaTeX (.tex)');
      setTimeout(() => setTexCopied(false), 2000);
    } catch {
      showToast('Không thể sao chép tự động, vui lòng bôi đen vùng mã để sao chép.');
    }
  };

  const handleExportMatrixCsv = () => {
    const headers = [
      'TT',
      'Chương / Chủ đề',
      'Bài học',
      'MC Biết',
      'MC Hiểu',
      'MC VD',
      'TF Biết',
      'TF Hiểu',
      'TF VD',
      'SA Biết',
      'SA Hiểu',
      'SA VD',
      'ES Biết',
      'ES Hiểu',
      'ES VD',
      'Tổng câu',
      'Điểm',
      'Tỉ lệ %',
    ];
    const rows: Array<Array<string | number>> = [];
    let idx = 1;
    matrixData.chapters.forEach((ch) => {
      ch.lessons.forEach((l) => {
        const pct =
          matrixData.totals.totalScore > 0
            ? ((l.totalScore / matrixData.totals.totalScore) * 100).toFixed(1)
            : '0.0';
        rows.push([
          idx++,
          ch.chapterName,
          l.lessonName,
          l.mc.B,
          l.mc.H,
          l.mc.VD,
          l.tf.B,
          l.tf.H,
          l.tf.VD,
          l.sa.B,
          l.sa.H,
          l.sa.VD,
          l.es.B,
          l.es.H,
          l.es.VD,
          l.totalQ,
          l.totalScore.toFixed(2),
          `${pct}%`,
        ]);
      });
    });
    exportRowsToCsv(headers, rows, 'Ma_Tran_De_Thi_Toan_2018.csv');
    showToast('Đã xuất Ma trận đề thi (.csv)');
  };

  const formatDestinationLabel = (mode: 'directory' | 'download') =>
    mode === 'directory' && saveDirHandle
      ? `thư mục "${saveDirHandle.name}"`
      : 'thư mục tải xuống mặc định';

  const handleChooseSaveDirectory = async () => {
    const res = await pickSaveDirectory();
    if (res.status === 'selected' && res.handle) {
      setSaveDirHandle(res.handle);
      showToast(`Đã chọn thư mục lưu trữ: ${res.handle.name}`);
    } else if (res.status !== 'cancelled' && res.message) {
      showToast(res.message);
    }
  };

  const handleClearSaveDirectory = () => {
    setSaveDirHandle(null);
    showToast('Đã chuyển về thư mục tải xuống mặc định của trình duyệt.');
  };

  const waitForNextPaint = () =>
    new Promise<void>((resolve) => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTimeout(resolve, 120);
        });
      });
    });

  const handleExportPdf = async () => {
    if (!activeExam || !printableRef.current) return;
    setIsExporting(true);
    const filename = `${sanitizeExamFileBase(activeExam.code)}.pdf`;
    setExportProgress(`Đang xuất ${filename}...`);
    try {
      const mode = await exportElementToPdf(printableRef.current, filename, saveDirHandle);
      showToast(`Đã lưu file ${filename} vào ${formatDestinationLabel(mode)}`);
    } catch (err) {
      showToast(`Lỗi xuất PDF: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setIsExporting(false);
      setExportProgress('');
    }
  };

  const handleExportAllPdf = async () => {
    if (generatedExams.length === 0) return;
    const originalId = activeExam?.id || generatedExams[0].id;
    const usedNames = new Set<string>();
    const exportedFiles: string[] = [];
    let lastMode: 'directory' | 'download' = saveDirHandle ? 'directory' : 'download';

    setIsExporting(true);
    try {
      for (let i = 0; i < generatedExams.length; i++) {
        const exam = generatedExams[i];
        const filename = buildUniqueExamFilename(exam.code, 'pdf', usedNames);
        setExportProgress(`Đang xuất PDF (${i + 1}/${generatedExams.length}): ${filename}`);
        setActiveExamId(exam.id);
        await waitForNextPaint();
        if (!printableRef.current) continue;
        lastMode = await exportElementToPdf(printableRef.current, filename, saveDirHandle);
        exportedFiles.push(filename);
        if (lastMode === 'download' && i < generatedExams.length - 1) {
          await new Promise((resolve) => setTimeout(resolve, 180));
        }
      }
      const sampleRange =
        exportedFiles.length > 1
          ? `${exportedFiles[0]} → ${exportedFiles[exportedFiles.length - 1]}`
          : exportedFiles[0] || '';
      showToast(
        `Đã lưu riêng ${exportedFiles.length} file PDF (${sampleRange}) vào ${formatDestinationLabel(lastMode)}`
      );
    } catch (err) {
      showToast(`Lỗi xuất PDF hàng loạt: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setActiveExamId(originalId);
      setIsExporting(false);
      setExportProgress('');
    }
  };

  const handleExportDocx = async () => {
    if (!activeExam) return;
    setIsExporting(true);
    const filename = `${sanitizeExamFileBase(activeExam.code)}.docx`;
    setExportProgress(`Đang xuất ${filename}...`);
    try {
      const res = await exportExamToDocx(activeExam, includeSolutions, saveDirHandle);
      showToast(`Đã lưu file Word ${res.filename} vào ${formatDestinationLabel(res.mode)}`);
    } catch (err) {
      showToast(`Lỗi xuất Word: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setIsExporting(false);
      setExportProgress('');
    }
  };

  const handleExportAllDocx = async () => {
    if (generatedExams.length === 0) return;
    setIsExporting(true);
    try {
      const res = await exportAllExamsToDocx(
        generatedExams,
        includeSolutions,
        saveDirHandle,
        (cur, total, fname) => setExportProgress(`Đang xuất Word (${cur}/${total}): ${fname}`)
      );
      const sampleRange =
        res.filenames.length > 1
          ? `${res.filenames[0]} → ${res.filenames[res.filenames.length - 1]}`
          : res.filenames[0] || '';
      showToast(
        `Đã lưu riêng ${res.count} file Word (${sampleRange}) vào ${formatDestinationLabel(res.mode)}`
      );
    } catch (err) {
      showToast(`Lỗi xuất Word hàng loạt: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setIsExporting(false);
      setExportProgress('');
    }
  };

  const handleExportTex = async () => {
    if (!activeExam) return;
    setIsExporting(true);
    try {
      const res = await exportExamToTex(activeExam, includeSolutions, texFormat, saveDirHandle);
      const label = texFormat === 'ex_test' ? 'ex_test' : 'amsmath';
      showToast(`Đã lưu file ${res.filename} (${label}) vào ${formatDestinationLabel(res.mode)}`);
    } catch (err) {
      showToast(`Lỗi xuất .tex: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportAllTex = async () => {
    if (generatedExams.length === 0) return;
    setIsExporting(true);
    try {
      const res = await exportAllExamsToTex(
        generatedExams,
        includeSolutions,
        texFormat,
        saveDirHandle,
        (cur, total, fname) => setExportProgress(`Đang xuất .tex (${cur}/${total}): ${fname}`)
      );
      const sampleRange =
        res.filenames.length > 1
          ? `${res.filenames[0]} → ${res.filenames[res.filenames.length - 1]}`
          : res.filenames[0] || '';
      const label = texFormat === 'ex_test' ? 'ex_test' : 'amsmath';
      showToast(
        `Đã lưu riêng ${res.count} file .tex (${label}: ${sampleRange}) vào ${formatDestinationLabel(res.mode)}`
      );
    } catch (err) {
      showToast(`Lỗi xuất .tex hàng loạt: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setIsExporting(false);
      setExportProgress('');
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#F8FAFC] relative">
      {toastMsg && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-md shadow-lg text-xs font-medium flex items-center gap-2">
          <Check size={14} className="text-emerald-400" />
          {toastMsg}
        </div>
      )}

      {/* Top Toolbar */}
      <div className="bg-white border-b border-slate-200 px-6 py-3.5 flex flex-wrap items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-lg font-semibold text-slate-900">
              Ma trận & Sinh bộ đề thi động
            </h1>
            <p className="text-xs text-slate-500">
              Cấu trúc 4 phần theo định hướng GDPT 2018 · Xuất PDF, Word (.docx) và LaTeX (.tex)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-md">
            <button
              onClick={() => setViewMode('matrix')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                viewMode === 'matrix'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Ma trận & Cấu hình
            </button>
            <button
              onClick={() => setViewMode('exam')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                viewMode === 'exam'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Xem đề & Xuất file ({generatedExams.length})
            </button>
          </div>
        </div>
      </div>

      {/* VIEW MODE 1: MATRIX & CONFIG */}
      {viewMode === 'matrix' && (
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Quick select & Exam Configuration */}
          <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Layers size={16} className="text-blue-700" />
                <span className="text-sm font-semibold text-slate-900">
                  Thiết lập thông tin đề thi & Chọn nhanh theo khối
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleQuickSelectGrade('l10')}
                  className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded transition-colors whitespace-nowrap"
                >
                  Chọn mẫu Toán 10
                </button>
                <button
                  onClick={() => handleQuickSelectGrade('l11')}
                  className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded transition-colors whitespace-nowrap"
                >
                  Chọn mẫu Toán 11
                </button>
                <button
                  onClick={() => handleQuickSelectGrade('l12')}
                  className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded transition-colors whitespace-nowrap"
                >
                  Chọn mẫu Toán 12
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
              <div className="md:col-span-3">
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Sở GD & ĐT
                </label>
                <input
                  value={departmentName}
                  onChange={(e) => setDepartmentName(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md focus:outline-none focus:border-blue-600"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Cấp đơn vị
                </label>
                <input
                  value={schoolLevel}
                  onChange={(e) => setSchoolLevel(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md focus:outline-none focus:border-blue-600"
                />
              </div>
              <div className="md:col-span-4">
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Tên trường
                </label>
                <input
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md focus:outline-none focus:border-blue-600"
                />
              </div>
              <div className="md:col-span-3">
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Tổ chuyên môn
                </label>
                <input
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="md:col-span-4">
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Tên bài kiểm tra / Tiêu đề
                </label>
                <input
                  value={examTitle}
                  onChange={(e) => setExamTitle(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md focus:outline-none focus:border-blue-600"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Năm học
                </label>
                <input
                  value={schoolYear}
                  onChange={(e) => setSchoolYear(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md focus:outline-none focus:border-blue-600"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Môn thi
                </label>
                <input
                  value={subjectLabel}
                  onChange={(e) => setSubjectLabel(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md focus:outline-none focus:border-blue-600"
                />
              </div>
              <div className="md:col-span-1">
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Phút
                </label>
                <input
                  type="number"
                  min={15}
                  max={180}
                  value={durationMinutes}
                  onChange={(e) => setDurationMinutes(Number(e.target.value))}
                  className="w-full px-2 py-1.5 text-xs border border-slate-300 rounded-md font-mono tabular-nums"
                />
              </div>
              <div className="md:col-span-1">
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Mã đầu
                </label>
                <input
                  type="number"
                  min={100}
                  max={999}
                  value={startCodeInput}
                  onChange={(e) => setStartCodeInput(e.target.value)}
                  onBlur={() => setStartCodeInput(String(startCode))}
                  className="w-full px-2 py-1.5 text-xs border border-slate-300 rounded-md font-mono tabular-nums"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Số đề (1–100)
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={variantCountInput}
                    onChange={(e) => setVariantCountInput(e.target.value)}
                    onBlur={() => setVariantCountInput(String(variantCount))}
                    className="w-16 px-2 py-1.5 text-xs border border-slate-300 rounded-md font-mono tabular-nums focus:outline-none focus:border-blue-600"
                  />
                  <button
                    onClick={handleGenerateExams}
                    disabled={matrixData.chapters.length === 0}
                    className="flex-1 px-2.5 py-1.5 text-xs font-medium text-white bg-blue-700 rounded-md hover:bg-blue-800 disabled:opacity-50 flex items-center justify-center gap-1 whitespace-nowrap"
                  >
                    <Sparkles size={13} />
                    Tạo {variantCount} đề
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-slate-50/70 border border-slate-200 rounded-md p-4">
              <div className="text-[11px] font-medium text-slate-500 mb-2">
                Xem trước phần đầu đề thi chuẩn thống nhất
              </div>
              <div className="bg-white border border-slate-200 rounded px-5 py-3 max-w-2xl mx-auto">
                <ExamOfficialHeader
                  departmentName={departmentName}
                  schoolLevel={schoolLevel}
                  schoolName={schoolName}
                  groupName={groupName}
                  title={examTitle}
                  schoolYear={schoolYear}
                  subjectLabel={subjectLabel}
                  durationMinutes={durationMinutes}
                  code={String(startCode)}
                  compact
                />
              </div>
            </div>
          </div>

          {/* Quantity Configurator per Selected Template */}
          {selectedMetas.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
              <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <h2 className="text-xs font-semibold text-slate-800">
                  Số lượng câu hỏi sinh cho từng dạng toán đã chọn ({selectedMetas.length} dạng)
                </h2>
                <span className="text-xs text-slate-500 tabular-nums">
                  Tổng số câu: {matrixData.totals.totalQ} · Tổng điểm: {matrixData.totals.totalScore.toFixed(2)} đ
                </span>
              </div>
              <div className="divide-y divide-slate-100 max-h-60 overflow-y-auto">
                {selectedMetas.map((m) => (
                  <div
                    key={m.template.id}
                    className="px-4 py-2.5 flex items-center justify-between gap-4 text-xs hover:bg-slate-50"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-slate-800 truncate">{m.template.name}</div>
                      <div className="text-slate-500 truncate">
                        {m.className} · {m.lessonName} · {m.template.category} ({DEFAULT_POINTS[m.template.category]}đ/câu) · {m.template.level}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-slate-500">Số câu sinh:</span>
                      <input
                        type="number"
                        min={1}
                        max={10}
                        value={getCount(m.template.id)}
                        onChange={(e) => updateCount(m.template.id, Number(e.target.value))}
                        className="w-14 px-2 py-1 border border-slate-300 rounded text-center font-mono tabular-nums"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* GDPT 2018 Official Matrix Table */}
          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-sm font-semibold text-slate-900">
                Bảng Ma trận Đề kiểm tra (Chuẩn GDPT 2018)
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleExportMatrixCsv}
                  disabled={matrixData.chapters.length === 0}
                  className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 disabled:opacity-50 flex items-center gap-1.5 whitespace-nowrap"
                >
                  <FileSpreadsheet size={14} className="text-emerald-600" />
                  Xuất ma trận (.csv)
                </button>
                <button
                  onClick={handleGenerateExams}
                  disabled={matrixData.chapters.length === 0}
                  className="px-4 py-1.5 text-xs font-medium text-white bg-blue-700 rounded-md hover:bg-blue-800 disabled:opacity-50 flex items-center gap-1.5 whitespace-nowrap"
                >
                  <Sparkles size={14} />
                  Sinh {variantCount} mã đề động
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[980px] border-collapse text-center text-xs tabular-nums">
                <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-300">
                  <tr>
                    <th className="border border-slate-200 p-2 w-10" rowSpan={3}>TT</th>
                    <th className="border border-slate-200 p-2 text-left w-48" rowSpan={3}>
                      Chủ đề / Chương
                    </th>
                    <th className="border border-slate-200 p-2 text-left w-52" rowSpan={3}>
                      Nội dung / Đơn vị kiến thức
                    </th>
                    <th className="border border-slate-200 p-1.5" colSpan={12}>
                      Mức độ đánh giá
                    </th>
                    <th className="border border-slate-200 p-1.5" colSpan={3} rowSpan={2}>
                      Tổng số câu
                    </th>
                    <th className="border border-slate-200 p-2 w-16" rowSpan={3}>
                      Tỉ lệ<br />% điểm
                    </th>
                  </tr>
                  <tr>
                    <th className="border border-slate-200 p-1" colSpan={3}>Nhiều lựa chọn</th>
                    <th className="border border-slate-200 p-1" colSpan={3}>Đúng - Sai</th>
                    <th className="border border-slate-200 p-1" colSpan={3}>Trả lời ngắn</th>
                    <th className="border border-slate-200 p-1" colSpan={3}>Tự luận</th>
                  </tr>
                  <tr className="text-[11px] font-medium text-slate-600">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <React.Fragment key={i}>
                        <th className="border border-slate-200 p-1 w-9">Biết</th>
                        <th className="border border-slate-200 p-1 w-9">Hiểu</th>
                        <th className="border border-slate-200 p-1 w-9">VD</th>
                      </React.Fragment>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {matrixData.chapters.length === 0 ? (
                    <tr>
                      <td colSpan={19} className="p-8 text-slate-500 text-xs">
                        Tích chọn các bài học hoặc dạng toán ở cây chương trình bên trái (hoặc bấm nút Chọn mẫu nhanh ở trên) để xây dựng ma trận.
                      </td>
                    </tr>
                  ) : (
                    matrixData.chapters.map((ch, cIdx) => (
                      <React.Fragment key={ch.chapterName}>
                        {ch.lessons.map((l, lIdx) => {
                          const pct =
                            matrixData.totals.totalScore > 0
                              ? ((l.totalScore / matrixData.totals.totalScore) * 100).toFixed(1)
                              : '0.0';
                          const rowB = l.mc.B + l.tf.B + l.sa.B + l.es.B;
                          const rowH = l.mc.H + l.tf.H + l.sa.H + l.es.H;
                          const rowVD = l.mc.VD + l.tf.VD + l.sa.VD + l.es.VD;
                          return (
                            <tr key={l.lessonName} className="hover:bg-slate-50">
                              {lIdx === 0 && (
                                <>
                                  <td
                                    className="border border-slate-200 p-2 font-medium"
                                    rowSpan={ch.lessons.length}
                                  >
                                    {cIdx + 1}
                                  </td>
                                  <td
                                    className="border border-slate-200 p-2 text-left font-semibold text-slate-800"
                                    rowSpan={ch.lessons.length}
                                  >
                                    {ch.chapterName}
                                  </td>
                                </>
                              )}
                              <td className="border border-slate-200 p-2 text-left text-slate-700">
                                {l.lessonName}
                              </td>
                              <td className="border border-slate-200 p-1 text-blue-700 font-medium">{l.mc.B || ''}</td>
                              <td className="border border-slate-200 p-1 text-blue-700 font-medium">{l.mc.H || ''}</td>
                              <td className="border border-slate-200 p-1 text-blue-700 font-medium">{l.mc.VD || ''}</td>

                              <td className="border border-slate-200 p-1 text-emerald-700 font-medium">{l.tf.B || ''}</td>
                              <td className="border border-slate-200 p-1 text-emerald-700 font-medium">{l.tf.H || ''}</td>
                              <td className="border border-slate-200 p-1 text-emerald-700 font-medium">{l.tf.VD || ''}</td>

                              <td className="border border-slate-200 p-1 text-amber-700 font-medium">{l.sa.B || ''}</td>
                              <td className="border border-slate-200 p-1 text-amber-700 font-medium">{l.sa.H || ''}</td>
                              <td className="border border-slate-200 p-1 text-amber-700 font-medium">{l.sa.VD || ''}</td>

                              <td className="border border-slate-200 p-1 text-slate-800 font-medium">{l.es.B || ''}</td>
                              <td className="border border-slate-200 p-1 text-slate-800 font-medium">{l.es.H || ''}</td>
                              <td className="border border-slate-200 p-1 text-slate-800 font-medium">{l.es.VD || ''}</td>

                              <td className="border border-slate-200 p-1 bg-slate-50 font-semibold">{rowB || ''}</td>
                              <td className="border border-slate-200 p-1 bg-slate-50 font-semibold">{rowH || ''}</td>
                              <td className="border border-slate-200 p-1 bg-slate-50 font-semibold">{rowVD || ''}</td>
                              <td className="border border-slate-200 p-1 bg-slate-50 font-semibold">
                                {pct}%
                              </td>
                            </tr>
                          );
                        })}
                      </React.Fragment>
                    ))
                  )}
                </tbody>
                {matrixData.chapters.length > 0 && (
                  <tfoot className="bg-slate-100 font-semibold text-slate-900 border-t-2 border-slate-300">
                    <tr>
                      <td colSpan={3} className="border border-slate-200 p-2 text-right">
                        Tổng cộng
                      </td>
                      <td className="border border-slate-200 p-1">{matrixData.totals.mc.B || ''}</td>
                      <td className="border border-slate-200 p-1">{matrixData.totals.mc.H || ''}</td>
                      <td className="border border-slate-200 p-1">{matrixData.totals.mc.VD || ''}</td>

                      <td className="border border-slate-200 p-1">{matrixData.totals.tf.B || ''}</td>
                      <td className="border border-slate-200 p-1">{matrixData.totals.tf.H || ''}</td>
                      <td className="border border-slate-200 p-1">{matrixData.totals.tf.VD || ''}</td>

                      <td className="border border-slate-200 p-1">{matrixData.totals.sa.B || ''}</td>
                      <td className="border border-slate-200 p-1">{matrixData.totals.sa.H || ''}</td>
                      <td className="border border-slate-200 p-1">{matrixData.totals.sa.VD || ''}</td>

                      <td className="border border-slate-200 p-1">{matrixData.totals.es.B || ''}</td>
                      <td className="border border-slate-200 p-1">{matrixData.totals.es.H || ''}</td>
                      <td className="border border-slate-200 p-1">{matrixData.totals.es.VD || ''}</td>

                      <td className="border border-slate-200 p-1 text-blue-700">
                        {matrixData.totals.all.B}
                      </td>
                      <td className="border border-slate-200 p-1 text-blue-700">
                        {matrixData.totals.all.H}
                      </td>
                      <td className="border border-slate-200 p-1 text-blue-700">
                        {matrixData.totals.all.VD}
                      </td>
                      <td className="border border-slate-200 p-1">
                        {matrixData.totals.totalScore.toFixed(2)} đ
                      </td>
                    </tr>
                  </tfoot>
                )}
              </table>
            </div>
          </div>
        </div>
      )}

      {/* VIEW MODE 2: EXAM PAPER PREVIEW & EXPORT */}
      {viewMode === 'exam' && (
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Sub-bar with Exam Code selector, Save Directory Picker & Export Actions */}
          <div className="bg-slate-50 border-b border-slate-200 px-6 py-2.5 space-y-2 shrink-0">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-xs font-medium text-slate-500 whitespace-nowrap">
                  Bộ {generatedExams.length} mã đề:
                </span>
                {generatedExams.length > 0 && (
                  <>
                    <button
                      onClick={() => {
                        const curIdx = generatedExams.findIndex((e) => e.id === activeExam?.id);
                        const prevIdx = curIdx > 0 ? curIdx - 1 : generatedExams.length - 1;
                        setActiveExamId(generatedExams[prevIdx].id);
                      }}
                      disabled={isExporting}
                      className="p-1 text-slate-600 bg-white border border-slate-300 rounded hover:bg-slate-100 disabled:opacity-50"
                      title="Mã đề trước"
                    >
                      <ChevronLeft size={14} />
                    </button>
                    <select
                      value={activeExam?.id || ''}
                      onChange={(e) => setActiveExamId(e.target.value)}
                      disabled={isExporting}
                      className="px-2.5 py-1 text-xs font-semibold text-slate-900 bg-white border border-slate-300 rounded font-mono tabular-nums disabled:opacity-50"
                    >
                      {generatedExams.map((ex, i) => (
                        <option key={ex.id} value={ex.id}>
                          #{i + 1} — Mã đề {ex.code} ({ex.questions.length} câu)
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => {
                        const curIdx = generatedExams.findIndex((e) => e.id === activeExam?.id);
                        const nextIdx = curIdx >= 0 && curIdx < generatedExams.length - 1 ? curIdx + 1 : 0;
                        setActiveExamId(generatedExams[nextIdx].id);
                      }}
                      disabled={isExporting}
                      className="p-1 text-slate-600 bg-white border border-slate-300 rounded hover:bg-slate-100 disabled:opacity-50"
                      title="Mã đề tiếp theo"
                    >
                      <ChevronRight size={14} />
                    </button>
                  </>
                )}
                <div className="hidden xl:flex items-center gap-1 overflow-x-auto max-w-md py-0.5">
                  {generatedExams.slice(0, 12).map((ex) => (
                    <button
                      key={ex.id}
                      onClick={() => setActiveExamId(ex.id)}
                      disabled={isExporting}
                      className={`px-2 py-1 text-xs font-mono font-medium rounded border transition-colors whitespace-nowrap tabular-nums disabled:opacity-50 ${
                        activeExam?.id === ex.id
                          ? 'bg-blue-700 text-white border-blue-700'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      {ex.code}
                    </button>
                  ))}
                  {generatedExams.length > 12 && (
                    <span className="text-[11px] text-slate-500 whitespace-nowrap pl-1">
                      +{generatedExams.length - 12} mã khác
                    </span>
                  )}
                </div>
              </div>

              {activeExam && (
                <div className="flex items-center gap-2 flex-wrap">
                  <label className="flex items-center gap-1.5 text-xs text-slate-700 mr-1 cursor-pointer whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={includeSolutions}
                      onChange={(e) => setIncludeSolutions(e.target.checked)}
                      className="rounded border-slate-300 text-blue-600"
                    />
                    Kèm đáp án
                  </label>

                  <button
                    onClick={handleExportPdf}
                    disabled={isExporting}
                    className="px-2.5 py-1.5 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded-md flex items-center gap-1.5 disabled:opacity-50 whitespace-nowrap"
                    title={`Xuất riêng mã đề hiện tại thành file ${sanitizeExamFileBase(activeExam.code)}.pdf`}
                  >
                    <Download size={13} />
                    PDF ({sanitizeExamFileBase(activeExam.code)})
                  </button>
                  {generatedExams.length > 1 && (
                    <button
                      onClick={handleExportAllPdf}
                      disabled={isExporting}
                      className="px-2.5 py-1.5 text-xs font-medium text-red-700 bg-red-50 border border-red-200 hover:bg-red-100 rounded-md flex items-center gap-1.5 disabled:opacity-50 whitespace-nowrap"
                      title={`Xuất riêng từng mã đề thành ${generatedExams.length} file PDF độc lập theo số mã đề`}
                    >
                      <Download size={13} />
                      {generatedExams.length} đề PDF
                    </button>
                  )}
                  <button
                    onClick={handleExportDocx}
                    disabled={isExporting}
                    className="px-2.5 py-1.5 text-xs font-medium text-white bg-blue-700 hover:bg-blue-800 rounded-md flex items-center gap-1.5 disabled:opacity-50 whitespace-nowrap"
                    title={`Xuất riêng mã đề hiện tại thành file ${sanitizeExamFileBase(activeExam.code)}.docx với công thức LaTeX $...$`}
                  >
                    <FileText size={13} />
                    Word ($...$)
                  </button>
                  {generatedExams.length > 1 && (
                    <button
                      onClick={handleExportAllDocx}
                      disabled={isExporting}
                      className="px-2.5 py-1.5 text-xs font-medium text-blue-800 bg-blue-50 border border-blue-200 hover:bg-blue-100 rounded-md flex items-center gap-1.5 disabled:opacity-50 whitespace-nowrap"
                      title={`Xuất riêng từng mã đề thành ${generatedExams.length} file Word (.docx) độc lập đặt tên theo số mã đề`}
                    >
                      <FileText size={13} />
                      Xuất {generatedExams.length} đề Word
                    </button>
                  )}
                  <div className="inline-flex items-center rounded-md border border-slate-300 bg-white overflow-hidden">
                    <select
                      aria-label="Định dạng LaTeX"
                      value={texFormat}
                      onChange={(e) => setTexFormat(e.target.value as TexExportFormat)}
                      className="px-2 py-1.5 text-xs font-medium text-slate-700 bg-slate-50 border-r border-slate-300 focus:outline-none cursor-pointer"
                      title="Chọn chuẩn xuất mã nguồn LaTeX"
                    >
                      <option value="amsmath">LaTeX chuẩn (amsmath)</option>
                      <option value="ex_test">Chuẩn ex_test (Việt Nam)</option>
                    </select>
                    <button
                      type="button"
                      onClick={() => setShowTexPreview(true)}
                      className="px-2.5 py-1.5 text-xs font-medium text-blue-700 bg-blue-50/70 hover:bg-blue-100 border-r border-slate-300 flex items-center gap-1.5 whitespace-nowrap"
                      title="Xem trước mã nguồn LaTeX (.tex) của mã đề hiện tại"
                    >
                      <Eye size={13} />
                      Xem trước .tex
                    </button>
                    <button
                      onClick={handleExportTex}
                      disabled={isExporting}
                      className="px-2.5 py-1.5 text-xs font-medium text-slate-800 hover:bg-slate-100 flex items-center gap-1.5 disabled:opacity-50 whitespace-nowrap"
                      title={`Xuất riêng mã đề hiện tại thành file ${sanitizeExamFileBase(activeExam.code)}.tex`}
                    >
                      <FileCode2 size={13} />
                      .tex
                    </button>
                    {generatedExams.length > 1 && (
                      <button
                        onClick={handleExportAllTex}
                        disabled={isExporting}
                        className="px-2.5 py-1.5 text-xs font-medium text-slate-800 border-l border-slate-300 hover:bg-slate-100 flex items-center gap-1.5 disabled:opacity-50 whitespace-nowrap"
                        title={`Xuất riêng từng mã đề thành ${generatedExams.length} file .tex độc lập đặt tên theo số mã đề`}
                      >
                        <FileCode2 size={13} />
                        {generatedExams.length} đề .tex
                      </button>
                    )}
                  </div>
                  <button
                    onClick={() => window.print()}
                    disabled={isExporting}
                    className="px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-md flex items-center gap-1.5 disabled:opacity-50 whitespace-nowrap"
                  >
                    <Printer size={13} />
                    In A4
                  </button>
                </div>
              )}
            </div>

            {/* Save Directory Picker & Per-Code File Naming Bar */}
            {activeExam && (
              <div className="pt-2 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2 min-w-0 flex-wrap">
                  <span className="font-medium text-slate-600 flex items-center gap-1.5 whitespace-nowrap">
                    {saveDirHandle ? (
                      <FolderCheck size={14} className="text-emerald-600 shrink-0" />
                    ) : (
                      <FolderOpen size={14} className="text-slate-500 shrink-0" />
                    )}
                    Thư mục lưu trữ:
                  </span>
                  <div
                    className={`px-2.5 py-1 rounded border font-mono text-[11.5px] max-w-xs sm:max-w-md truncate ${
                      saveDirHandle
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-800 font-semibold'
                        : 'bg-white border-slate-200 text-slate-600'
                    }`}
                    title={
                      saveDirHandle
                        ? `Đang lưu trực tiếp vào thư mục: ${saveDirHandle.name}`
                        : 'Chưa chọn thư mục — trình duyệt sẽ lưu về thư mục tải xuống mặc định'
                    }
                  >
                    {saveDirHandle ? saveDirHandle.name : 'Thư mục tải xuống mặc định (Downloads)'}
                  </div>
                  <button
                    type="button"
                    onClick={handleChooseSaveDirectory}
                    disabled={isExporting}
                    className="px-2.5 py-1 text-xs font-medium text-blue-700 bg-white border border-blue-200 hover:bg-blue-50 rounded flex items-center gap-1.5 disabled:opacity-50 whitespace-nowrap"
                  >
                    <FolderOpen size={13} />
                    {saveDirHandle ? 'Đổi thư mục' : 'Chọn thư mục lưu'}
                  </button>
                  {saveDirHandle && (
                    <button
                      type="button"
                      onClick={handleClearSaveDirectory}
                      disabled={isExporting}
                      className="px-2 py-1 text-xs text-slate-500 hover:text-slate-800 hover:bg-slate-200/70 rounded flex items-center gap-1 whitespace-nowrap"
                      title="Quay lại lưu ở thư mục tải xuống mặc định"
                    >
                      <X size={12} />
                      Mặc định
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2 text-[11.5px] text-slate-500">
                  {exportProgress ? (
                    <span className="font-medium text-blue-700 font-mono tabular-nums">
                      {exportProgress}
                    </span>
                  ) : (
                    <span className="whitespace-nowrap">
                      Xuất riêng từng mã đề:{' '}
                      <span className="font-mono font-medium text-slate-700">
                        {sanitizeExamFileBase(activeExam.code)}.pdf
                      </span>
                      ,{' '}
                      <span className="font-mono font-medium text-slate-700">
                        {sanitizeExamFileBase(activeExam.code)}.docx
                      </span>
                      ,{' '}
                      <span className="font-mono font-medium text-slate-700">
                        {sanitizeExamFileBase(activeExam.code)}.tex
                      </span>
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* A4 Paper Preview */}
          <div className="flex-1 overflow-y-auto p-6 bg-slate-200/70">
            {!activeExam ? (
              <div className="max-w-lg mx-auto bg-white border border-slate-200 rounded-lg p-8 text-center mt-10">
                <p className="text-sm font-medium text-slate-700">Chưa có đề thi nào được sinh</p>
                <button
                  onClick={() => setViewMode('matrix')}
                  className="mt-3 px-4 py-2 text-xs font-medium text-white bg-blue-700 rounded-md"
                >
                  Quay lại Ma trận để sinh đề
                </button>
              </div>
            ) : (
              <div
                id="printable-exam-area"
                ref={printableRef}
                className="a4-paper max-w-[820px] mx-auto bg-white border border-slate-300 shadow-sm p-10 space-y-6 text-[14px] leading-relaxed"
                style={{ backgroundColor: '#ffffff', color: '#0f172a' }}
              >
                {/* Exam Header */}
                {(() => {
                  const hdr = resolveExamHeaderFields(activeExam);
                  return (
                    <ExamOfficialHeader
                      departmentName={hdr.departmentName}
                      schoolLevel={hdr.schoolLevel}
                      schoolName={hdr.schoolName}
                      groupName={hdr.groupName}
                      title={hdr.title}
                      schoolYear={hdr.schoolYear}
                      subjectLabel={hdr.subjectLabel}
                      durationMinutes={hdr.durationMinutes}
                      code={hdr.code}
                    />
                  );
                })()}

                {/* Sections */}
                {(['MC', 'TF', 'SA', 'ES'] as QuestionCategory[]).map((cat) => {
                  const items = activeExam.questions.filter((q) => q.category === cat);
                  if (items.length === 0) return null;
                  const sectionTitles: Record<QuestionCategory, string> = {
                    MC: 'PHẦN I. Câu trắc nghiệm nhiều phương án lựa chọn.',
                    TF: 'PHẦN II. Câu trắc nghiệm đúng sai.',
                    SA: 'PHẦN III. Câu trắc nghiệm trả lời ngắn.',
                    ES: 'PHẦN IV. Phần tự luận.',
                  };
                  return (
                    <div key={cat} className="space-y-3.5">
                      <h3 data-pdf-block="" data-pdf-heading="" className="font-bold text-sm border-b border-slate-300 pb-1">
                        {sectionTitles[cat]}
                      </h3>
                      {items.map((q, idx) => (
                        <div key={q.instanceId} data-pdf-block="" className="space-y-2">
                          <div>
                            <span className="font-bold mr-1.5">
                              Câu {idx + 1} ({q.points}đ):
                            </span>
                            <MathText text={q.content.stem} />
                            <QuestionDiagram diagram={q.content.diagram} />
                          </div>

                          {q.category === 'MC' && q.content.options && (
                            <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 pl-4">
                              {q.content.options.map((opt, oIdx) => (
                                <div key={oIdx}>
                                  <span className="font-bold mr-1.5">
                                    {String.fromCharCode(65 + oIdx)}.
                                  </span>
                                  <MathText text={opt} />
                                </div>
                              ))}
                            </div>
                          )}

                          {q.category === 'TF' && q.content.tfStatements && (
                            <div className="pl-4 space-y-1.5">
                              {q.content.tfStatements.map((st) => (
                                <div key={st.key}>
                                  <span className="font-bold mr-1.5">{st.key})</span>
                                  <MathText text={st.text} />
                                  {st.diagram && <QuestionDiagram diagram={st.diagram} compact />}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  );
                })}

                {/* Solutions & Answer Key */}
                {includeSolutions && (
                  <div className="pt-6 border-t-2 border-slate-800 space-y-4">
                    <h3 data-pdf-block="" data-pdf-heading="" className="font-bold text-sm uppercase text-center">
                      ĐÁP ÁN & HƯỚNG DẪN CHẤM — MÃ ĐỀ {activeExam.code}
                    </h3>
                    <div className="space-y-3 text-xs">
                      {activeExam.questions.map((q, idx) => {
                        const ans =
                          q.category === 'MC'
                            ? String.fromCharCode(65 + (q.content.correctIndex ?? 0))
                            : q.content.answerSummary;
                        return (
                          <div key={q.instanceId} data-pdf-block="" className="border-b border-slate-200 pb-2">
                            <div className="font-bold">
                              Câu {idx + 1} ({q.category} · {q.points}đ): Đáp án{' '}
                              <MathText text={ans} />
                            </div>
                            <div className="text-slate-700 mt-1 space-y-0.5 pl-3">
                              {q.content.solutionSteps.map((step, sIdx) => (
                                <div key={sIdx}>
                                  • <MathText text={step} />
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {showTexPreview && activeExam && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-4"
          onClick={() => setShowTexPreview(false)}
        >
          <div
            className="bg-white border border-slate-200 rounded-lg shadow-xl w-full max-w-5xl max-h-[88vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-5 py-3.5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 bg-slate-50 shrink-0">
              <div>
                <h2 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                  <FileCode2 size={16} className="text-blue-700" />
                  Xem trước mã nguồn LaTeX (.tex) — Mã đề {activeExam.code}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5 tabular-nums">
                  {previewTexSource.split('\n').length} dòng ·{' '}
                  {texFormat === 'ex_test' ? 'Chuẩn ex_test (Việt Nam)' : 'LaTeX chuẩn (amsmath)'} ·{' '}
                  {includeSolutions ? 'Có lời giải / đáp án' : 'Chỉ đề thi'} ·{' '}
                  Lưu tại: {saveDirHandle ? saveDirHandle.name : 'Tải xuống mặc định'}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <select
                  aria-label="Định dạng LaTeX xem trước"
                  value={texFormat}
                  onChange={(e) => setTexFormat(e.target.value as TexExportFormat)}
                  className="px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-md focus:outline-none cursor-pointer"
                >
                  <option value="amsmath">LaTeX chuẩn (amsmath)</option>
                  <option value="ex_test">Chuẩn ex_test (Việt Nam)</option>
                </select>
                <label className="flex items-center gap-1.5 text-xs text-slate-700 px-2 py-1 bg-white border border-slate-300 rounded-md cursor-pointer whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={includeSolutions}
                    onChange={(e) => setIncludeSolutions(e.target.checked)}
                    className="rounded border-slate-300 text-blue-600"
                  />
                  Kèm đáp án
                </label>
                <button
                  type="button"
                  onClick={handleCopyTexSource}
                  className="px-3 py-1.5 text-xs font-medium text-slate-800 bg-white border border-slate-300 hover:bg-slate-100 rounded-md flex items-center gap-1.5 whitespace-nowrap"
                >
                  {texCopied ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                  {texCopied ? 'Đã sao chép' : 'Sao chép mã .tex'}
                </button>
                <button
                  type="button"
                  onClick={handleExportTex}
                  disabled={isExporting}
                  className="px-3 py-1.5 text-xs font-medium text-white bg-blue-700 hover:bg-blue-800 rounded-md flex items-center gap-1.5 disabled:opacity-50 whitespace-nowrap"
                >
                  <Download size={13} />
                  Tải {sanitizeExamFileBase(activeExam.code)}.tex
                </button>
                <button
                  type="button"
                  onClick={() => setShowTexPreview(false)}
                  className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-md"
                  aria-label="Đóng xem trước"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-auto bg-slate-950 text-slate-100 p-4 font-mono text-xs leading-relaxed">
              <pre className="whitespace-pre-wrap break-words select-all">{previewTexSource}</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
