import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  ListChecks,
  Minus,
  PanelRightClose,
  PanelRightOpen,
  Plus,
  Trash2,
  X,
} from 'lucide-react';
import {
  ChapterNode,
  ClassCurriculumNode,
  CognitiveLevel,
  LessonNode,
  MathTemplate,
  QuestionCategory,
} from '../types/math';

interface SelectedTemplatesPanelProps {
  treeData: ClassCurriculumNode[];
  checkedTemplateIds: string[];
  countsByTemplate: Record<string, number>;
  selectedTemplateId: string | null;
  onUpdateTemplateCount: (templateId: string, count: number) => void;
  onUncheckTemplate: (templateId: string) => void;
  onClearAllChecked: () => void;
  onSelectTemplate: (
    tpl: MathTemplate,
    lesson: LessonNode,
    chapter: ChapterNode,
    cls: ClassCurriculumNode
  ) => void;
  onGoToMatrix: () => void;
}

interface SelectedTemplateEntry {
  template: MathTemplate;
  lesson: LessonNode;
  chapter: ChapterNode;
  cls: ClassCurriculumNode;
}

const CATEGORY_ORDER: QuestionCategory[] = ['MC', 'TF', 'SA', 'ES'];

const CATEGORY_STYLES: Record<
  QuestionCategory,
  { badge: string; statBox: string; statLabel: string; statValue: string }
> = {
  MC: {
    badge: 'bg-blue-50 text-blue-700 border-blue-200',
    statBox: 'bg-blue-50/70 border-blue-200/80',
    statLabel: 'text-blue-700',
    statValue: 'text-blue-950',
  },
  TF: {
    badge: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    statBox: 'bg-indigo-50/70 border-indigo-200/80',
    statLabel: 'text-indigo-700',
    statValue: 'text-indigo-950',
  },
  SA: {
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    statBox: 'bg-emerald-50/70 border-emerald-200/80',
    statLabel: 'text-emerald-700',
    statValue: 'text-emerald-950',
  },
  ES: {
    badge: 'bg-amber-50 text-amber-700 border-amber-200',
    statBox: 'bg-amber-50/70 border-amber-200/80',
    statLabel: 'text-amber-700',
    statValue: 'text-amber-950',
  },
};

const LEVEL_META: Array<{
  key: CognitiveLevel;
  label: string;
  tagClass: string;
  boxClass: string;
  labelClass: string;
  valueClass: string;
}> = [
  {
    key: 'Biết',
    label: 'Nhận biết',
    tagClass: 'bg-slate-100 text-slate-700 border-slate-200',
    boxClass: 'bg-white border-slate-200',
    labelClass: 'text-slate-600',
    valueClass: 'text-slate-900',
  },
  {
    key: 'Hiểu',
    label: 'Thông hiểu',
    tagClass: 'bg-sky-50 text-sky-700 border-sky-200',
    boxClass: 'bg-sky-50/50 border-sky-200/80',
    labelClass: 'text-sky-700',
    valueClass: 'text-sky-950',
  },
  {
    key: 'Vận dụng',
    label: 'Vận dụng',
    tagClass: 'bg-rose-50 text-rose-700 border-rose-200',
    boxClass: 'bg-rose-50/50 border-rose-200/80',
    labelClass: 'text-rose-700',
    valueClass: 'text-rose-950',
  },
];

const LEVEL_LABEL_MAP: Record<CognitiveLevel, string> = {
  Biết: 'Nhận biết',
  Hiểu: 'Thông hiểu',
  'Vận dụng': 'Vận dụng',
};

const LEVEL_TAG_MAP: Record<CognitiveLevel, string> = {
  Biết: 'bg-slate-100 text-slate-700 border-slate-200',
  Hiểu: 'bg-sky-50 text-sky-700 border-sky-200',
  'Vận dụng': 'bg-rose-50 text-rose-700 border-rose-200',
};

const CountStepperInput: React.FC<{
  value: number;
  label: string;
  onChange: (next: number) => void;
}> = ({ value, label, onChange }) => {
  const [draft, setDraft] = useState<string>(String(value));
  const [isFocused, setIsFocused] = useState(false);

  const displayed = isFocused ? draft : String(value);

  const commit = (raw: string) => {
    const parsed = Math.floor(Number(raw));
    if (!Number.isNaN(parsed) && parsed >= 1) {
      const clamped = Math.max(1, Math.min(10, parsed));
      onChange(clamped);
      setDraft(String(clamped));
    } else {
      setDraft(String(value));
    }
  };

  return (
    <div className="flex items-center border border-slate-300 rounded bg-white overflow-hidden">
      <button
        type="button"
        onClick={() => {
          const next = Math.max(1, value - 1);
          onChange(next);
          setDraft(String(next));
        }}
        disabled={value <= 1}
        aria-label="Giảm số câu"
        className="px-1 py-0.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800 disabled:opacity-35 disabled:hover:bg-transparent transition-colors"
      >
        <Minus size={11} />
      </button>
      <input
        type="number"
        min={1}
        max={10}
        value={displayed}
        onFocus={(e) => {
          setIsFocused(true);
          setDraft(String(value));
          e.currentTarget.select();
        }}
        onChange={(e) => {
          const raw = e.target.value;
          setDraft(raw);
          if (raw.trim() !== '') {
            const parsed = Math.floor(Number(raw));
            if (!Number.isNaN(parsed) && parsed >= 1) {
              onChange(Math.max(1, Math.min(10, parsed)));
            }
          }
        }}
        onBlur={(e) => {
          setIsFocused(false);
          commit(e.target.value);
        }}
        aria-label={label}
        className="w-8 py-0.5 text-center text-xs font-mono font-semibold tabular-nums text-slate-900 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
      <button
        type="button"
        onClick={() => {
          const next = Math.min(10, value + 1);
          onChange(next);
          setDraft(String(next));
        }}
        disabled={value >= 10}
        aria-label="Tăng số câu"
        className="px-1 py-0.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800 disabled:opacity-35 disabled:hover:bg-transparent transition-colors"
      >
        <Plus size={11} />
      </button>
    </div>
  );
};

export const SelectedTemplatesPanel: React.FC<SelectedTemplatesPanelProps> = ({
  treeData,
  checkedTemplateIds,
  countsByTemplate,
  selectedTemplateId,
  onUpdateTemplateCount,
  onUncheckTemplate,
  onClearAllChecked,
  onSelectTemplate,
  onGoToMatrix,
}) => {
  const [collapsed, setCollapsed] = useState(false);

  const checkedSet = useMemo(() => new Set(checkedTemplateIds), [checkedTemplateIds]);

  const selectedEntries = useMemo<SelectedTemplateEntry[]>(() => {
    if (checkedSet.size === 0) return [];
    const list: SelectedTemplateEntry[] = [];
    for (const cls of treeData) {
      for (const chapter of cls.children) {
        for (const lesson of chapter.children) {
          for (const cat of CATEGORY_ORDER) {
            for (const template of lesson.mathTypes[cat]) {
              if (checkedSet.has(template.id)) {
                list.push({ template, lesson, chapter, cls });
              }
            }
          }
        }
      }
    }
    return list;
  }, [treeData, checkedSet]);

  const getCount = (tplId: string) => Math.max(1, countsByTemplate[tplId] ?? 1);

  const stats = useMemo(() => {
    const byCategory: Record<QuestionCategory, number> = {
      MC: 0,
      TF: 0,
      SA: 0,
      ES: 0,
    };
    const byLevel: Record<CognitiveLevel, number> = {
      Biết: 0,
      Hiểu: 0,
      'Vận dụng': 0,
    };
    let totalQuestions = 0;

    for (const entry of selectedEntries) {
      const qty = Math.max(1, countsByTemplate[entry.template.id] ?? 1);
      byCategory[entry.template.category] += qty;
      byLevel[entry.template.level] += qty;
      totalQuestions += qty;
    }

    return {
      totalTemplates: selectedEntries.length,
      totalQuestions,
      byCategory,
      byLevel,
    };
  }, [selectedEntries, countsByTemplate]);

  if (collapsed) {
    return (
      <aside className="w-11 bg-white border-l border-slate-200 flex flex-col items-center py-3 gap-3 shrink-0">
        <button
          onClick={() => setCollapsed(false)}
          title="Mở bảng theo dõi dạng toán đã chọn"
          aria-label="Mở bảng theo dõi dạng toán đã chọn"
          className="p-1.5 text-slate-500 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors"
        >
          <PanelRightOpen size={16} />
        </button>
        <div className="flex flex-col items-center gap-1.5 text-[11px] font-semibold tabular-nums text-blue-700">
          <span>{stats.totalTemplates}</span>
          <span className="text-[10px] font-normal text-slate-400">dạng</span>
        </div>
        <div className="w-6 border-t border-slate-200" />
        <div className="flex flex-col items-center gap-0.5 text-[11px] font-semibold tabular-nums text-slate-800">
          <span>{stats.totalQuestions}</span>
          <span className="text-[10px] font-normal text-slate-400">câu</span>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-80 xl:w-[360px] bg-white border-l border-slate-200 flex flex-col h-full shrink-0">
      {/* Header */}
      <div className="px-3.5 py-3 border-b border-slate-200 flex items-center justify-between gap-2 shrink-0 bg-white">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <ListChecks size={15} className="text-blue-700 shrink-0" />
            <h2 className="text-xs font-semibold text-slate-900">
              Dạng toán đã tích chọn
            </h2>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5 tabular-nums">
            {stats.totalTemplates} dạng toán · {stats.totalQuestions} câu hỏi
          </p>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          {stats.totalTemplates > 0 && (
            <button
              onClick={onClearAllChecked}
              title="Bỏ chọn tất cả dạng toán"
              className="px-2 py-1 text-[11px] font-medium text-slate-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors flex items-center gap-1 whitespace-nowrap"
            >
              <Trash2 size={12} />
              Bỏ hết
            </button>
          )}
          <button
            onClick={() => setCollapsed(true)}
            title="Thu gọn bảng theo dõi"
            aria-label="Thu gọn bảng theo dõi"
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded transition-colors"
          >
            <PanelRightClose size={15} />
          </button>
        </div>
      </div>

      {/* Selected Templates List (Full Name + Question Count Input) */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
        {selectedEntries.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center px-5 py-8 text-center">
            <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-400 flex items-center justify-center mb-2.5">
              <ListChecks size={20} />
            </div>
            <p className="text-xs font-medium text-slate-700">
              Chưa có dạng toán nào được tích chọn
            </p>
            <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
              Tích chọn các dạng toán ở cây chương trình bên trái để xem tên đầy đủ, nhập số câu và theo dõi thống kê ngay tại đây.
            </p>
          </div>
        ) : (
          selectedEntries.map((entry, idx) => {
            const { template, lesson, chapter, cls } = entry;
            const qty = getCount(template.id);
            const isActive = selectedTemplateId === template.id;
            const catStyle = CATEGORY_STYLES[template.category];

            return (
              <div
                key={template.id}
                className={`px-3.5 py-2.5 transition-colors ${
                  isActive ? 'bg-blue-50/70' : 'hover:bg-slate-50/80'
                }`}
              >
                {/* Top row: Index + Full Name + Remove */}
                <div className="flex items-start gap-2">
                  <span className="text-[11px] font-mono font-semibold text-slate-400 tabular-nums pt-0.5 shrink-0">
                    {idx + 1}.
                  </span>
                  <button
                    type="button"
                    onClick={() => onSelectTemplate(template, lesson, chapter, cls)}
                    className={`flex-1 min-w-0 text-left text-xs leading-snug whitespace-normal break-words transition-colors ${
                      isActive
                        ? 'font-semibold text-blue-800'
                        : 'font-medium text-slate-900 hover:text-blue-700'
                    }`}
                  >
                    {template.name}
                  </button>
                  <button
                    type="button"
                    onClick={() => onUncheckTemplate(template.id)}
                    title="Bỏ chọn dạng toán này"
                    aria-label={`Bỏ chọn ${template.name}`}
                    className="p-0.5 text-slate-300 hover:text-red-600 hover:bg-red-50 rounded transition-colors shrink-0 mt-0.5"
                  >
                    <X size={13} />
                  </button>
                </div>

                {/* Bottom row: Metadata tags + Question Count Control */}
                <div className="mt-2 pl-5 flex items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-1 min-w-0">
                    <span
                      className={`px-1.5 py-0.5 text-[10px] font-mono font-semibold border rounded ${catStyle.badge}`}
                    >
                      {template.category}
                    </span>
                    <span
                      className={`px-1.5 py-0.5 text-[10px] font-medium border rounded ${LEVEL_TAG_MAP[template.level]}`}
                    >
                      {LEVEL_LABEL_MAP[template.level]}
                    </span>
                    <span
                      className="text-[10px] text-slate-400 truncate max-w-[125px]"
                      title={`${cls.name} · ${lesson.name}`}
                    >
                      {lesson.name}
                    </span>
                  </div>

                  {/* Numeric Count Control */}
                  <div className="flex items-center gap-1 shrink-0">
                    <span className="text-[10px] text-slate-500">Số câu:</span>
                    <CountStepperInput
                      value={qty}
                      label={`Số câu cho ${template.name}`}
                      onChange={(next) => onUpdateTemplateCount(template.id, next)}
                    />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Compact Statistics Footer */}
      <div className="px-3.5 py-3 border-t border-slate-200 bg-slate-50 shrink-0 space-y-2.5">
        {/* Category Stats: MC / TF / SA / ES */}
        <div>
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600 mb-1.5">
            <span>Thống kê theo dạng câu hỏi</span>
            <span className="font-mono tabular-nums text-slate-800">
              Tổng: {stats.totalQuestions} câu
            </span>
          </div>
          <div className="grid grid-cols-4 gap-1.5">
            {CATEGORY_ORDER.map((cat) => {
              const style = CATEGORY_STYLES[cat];
              const count = stats.byCategory[cat];
              return (
                <div
                  key={cat}
                  className={`px-2 py-1.5 rounded border text-center ${style.statBox}`}
                >
                  <div className={`text-[10px] font-mono font-semibold ${style.statLabel}`}>
                    {cat}
                  </div>
                  <div
                    className={`text-sm font-bold tabular-nums leading-tight mt-0.5 ${style.statValue}`}
                  >
                    {count}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Cognitive Level Stats: Nhận biết / Thông hiểu / Vận dụng */}
        <div>
          <div className="text-[11px] font-semibold text-slate-600 mb-1.5">
            Thống kê theo mức độ nhận thức
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {LEVEL_META.map((lvl) => {
              const count = stats.byLevel[lvl.key];
              const pct =
                stats.totalQuestions > 0
                  ? Math.round((count / stats.totalQuestions) * 100)
                  : 0;
              return (
                <div
                  key={lvl.key}
                  className={`px-2 py-1.5 rounded border text-center ${lvl.boxClass}`}
                >
                  <div className={`text-[10px] font-medium truncate ${lvl.labelClass}`}>
                    {lvl.label}
                  </div>
                  <div className="mt-0.5 flex items-baseline justify-center gap-1 tabular-nums">
                    <span className={`text-sm font-bold leading-tight ${lvl.valueClass}`}>
                      {count}
                    </span>
                    <span className="text-[10px] text-slate-400">({pct}%)</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Direct action to Matrix & Export when items are selected */}
        {stats.totalTemplates > 0 && (
          <button
            type="button"
            onClick={onGoToMatrix}
            className="w-full py-1.5 px-3 text-xs font-medium text-white bg-blue-700 hover:bg-blue-800 rounded-md transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Chuyển sang Ma trận & Xuất đề</span>
            <ArrowRight size={13} />
          </button>
        )}
      </div>
    </aside>
  );
};
