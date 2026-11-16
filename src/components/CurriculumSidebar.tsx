import React, { useMemo, useState } from 'react';
import {
  Check,
  ChevronDown,
  ChevronRight,
  Edit2,
  FileText,
  Folder,
  Plus,
  Search,
  Trash2,
  X,
} from 'lucide-react';
import {
  ChapterNode,
  ClassCurriculumNode,
  LessonNode,
  MathTemplate,
  QuestionCategory,
} from '../types/math';

interface CurriculumSidebarProps {
  treeData: ClassCurriculumNode[];
  selectedNodeId: string | null;
  checkedTemplateIds: string[];
  onSelectLesson: (lesson: LessonNode, chapter: ChapterNode, cls: ClassCurriculumNode) => void;
  onSelectTemplate: (
    tpl: MathTemplate,
    lesson: LessonNode,
    chapter: ChapterNode,
    cls: ClassCurriculumNode
  ) => void;
  onToggleCheckIds: (ids: string[], checked: boolean) => void;
  onAddChapter: (classId: string, name: string) => void;
  onAddLesson: (chapterId: string, name: string) => void;
  onTriggerAddTemplate: (lessonId: string, category: QuestionCategory) => void;
  onRenameNode: (nodeId: string, newName: string) => void;
  onDeleteNode: (nodeId: string) => void;
}

const CATEGORY_LABELS: Record<QuestionCategory, string> = {
  MC: 'Nhiều lựa chọn (MC)',
  TF: 'Đúng - Sai (TF)',
  SA: 'Trả lời ngắn (SA)',
  ES: 'Tự luận (ES)',
};

const CATEGORY_SHORT: Record<QuestionCategory, string> = {
  MC: 'MC',
  TF: 'TF',
  SA: 'SA',
  ES: 'ES',
};

export const CurriculumSidebar: React.FC<CurriculumSidebarProps> = ({
  treeData,
  selectedNodeId,
  checkedTemplateIds,
  onSelectLesson,
  onSelectTemplate,
  onToggleCheckIds,
  onAddChapter,
  onAddLesson,
  onTriggerAddTemplate,
  onRenameNode,
  onDeleteNode,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [gradeFilter, setGradeFilter] = useState<'all' | 'l10' | 'l11' | 'l12'>('all');
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
    l12: true,
    l12_c1: true,
    l12_c1_b1: true,
    l11: true,
    l11_c1: true,
    l10: false,
  });

  const [addingTarget, setAddingTarget] = useState<{
    parentId: string;
    kind: 'chapter' | 'lesson';
  } | null>(null);
  const [newName, setNewName] = useState('');

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [addTemplateMenuLessonId, setAddTemplateMenuLessonId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getAllTemplatesInLesson = (lesson: LessonNode): string[] => {
    return (['MC', 'TF', 'SA', 'ES'] as QuestionCategory[]).flatMap((cat) =>
      lesson.mathTypes[cat].map((t) => t.id)
    );
  };

  const getAllTemplatesInChapter = (chapter: ChapterNode): string[] => {
    return chapter.children.flatMap(getAllTemplatesInLesson);
  };

  const getAllTemplatesInClass = (cls: ClassCurriculumNode): string[] => {
    return cls.children.flatMap(getAllTemplatesInChapter);
  };

  const isGroupChecked = (ids: string[]) => {
    if (ids.length === 0) return false;
    return ids.every((id) => checkedTemplateIds.includes(id));
  };

  const filteredTree = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return treeData
      .filter((cls) => gradeFilter === 'all' || cls.id === gradeFilter)
      .map((cls) => {
        if (!q) return cls;
        const matchedChapters = cls.children
          .map((chap) => {
            const chapMatches = chap.name.toLowerCase().includes(q);
            const matchedLessons = chap.children
              .map((lesson) => {
                const lessonMatches = lesson.name.toLowerCase().includes(q);
                const nextMathTypes: Record<QuestionCategory, MathTemplate[]> = {
                  MC: [],
                  TF: [],
                  SA: [],
                  ES: [],
                };
                let anyTplMatches = false;
                (['MC', 'TF', 'SA', 'ES'] as QuestionCategory[]).forEach((cat) => {
                  nextMathTypes[cat] = lesson.mathTypes[cat].filter(
                    (t) =>
                      chapMatches ||
                      lessonMatches ||
                      t.name.toLowerCase().includes(q) ||
                      t.topicTag.toLowerCase().includes(q)
                  );
                  if (nextMathTypes[cat].length > 0) anyTplMatches = true;
                });
                if (chapMatches || lessonMatches || anyTplMatches) {
                  return { ...lesson, mathTypes: nextMathTypes };
                }
                return null;
              })
              .filter(Boolean) as LessonNode[];

            if (chapMatches || matchedLessons.length > 0) {
              return { ...chap, children: matchedLessons };
            }
            return null;
          })
          .filter(Boolean) as ChapterNode[];

        return { ...cls, children: matchedChapters };
      });
  }, [treeData, searchQuery, gradeFilter]);

  const handleConfirmAdd = () => {
    if (!addingTarget || !newName.trim()) return;
    if (addingTarget.kind === 'chapter') {
      onAddChapter(addingTarget.parentId, newName.trim());
    } else {
      onAddLesson(addingTarget.parentId, newName.trim());
    }
    setExpandedIds((prev) => ({ ...prev, [addingTarget.parentId]: true }));
    setAddingTarget(null);
    setNewName('');
  };

  const handleConfirmRename = () => {
    if (editingId && editValue.trim()) {
      onRenameNode(editingId, editValue.trim());
    }
    setEditingId(null);
  };

  return (
    <aside className="w-80 bg-white border-r border-slate-200 flex flex-col h-full shrink-0">
      {/* Search & Grade Filter */}
      <div className="p-3 border-b border-slate-200 space-y-2.5">
        <div className="relative">
          <Search
            size={14}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm chủ đề, bài học, dạng toán..."
            className="w-full pl-8 pr-7 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              aria-label="Xóa từ khóa tìm kiếm"
            >
              <X size={13} />
            </button>
          )}
        </div>

        <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100 rounded-md">
          {(
            [
              { id: 'all', label: 'Tất cả' },
              { id: 'l10', label: 'Lớp 10' },
              { id: 'l11', label: 'Lớp 11' },
              { id: 'l12', label: 'Lớp 12' },
            ] as const
          ).map((g) => (
            <button
              key={g.id}
              onClick={() => setGradeFilter(g.id)}
              className={`py-1 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                gradeFilter === g.id
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>

      {/* Curriculum Tree */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        <div className="flex items-center justify-between px-2 py-1 text-[11px] font-medium text-slate-500">
          <span>Chủ đề Chương trình 2018</span>
          <span className="tabular-nums">Đã chọn: {checkedTemplateIds.length} dạng</span>
        </div>

        {filteredTree.map((cls) => {
          const clsOpen = !!expandedIds[cls.id] || !!searchQuery;
          const clsTplIds = getAllTemplatesInClass(cls);
          const clsChecked = isGroupChecked(clsTplIds);

          return (
            <div key={cls.id} className="select-none">
              {/* Class Row */}
              <div className="group flex items-center gap-1.5 px-2 py-1.5 rounded-md hover:bg-slate-100 text-slate-900 font-semibold text-sm">
                <button
                  onClick={() => toggleExpand(cls.id)}
                  className="p-0.5 text-slate-400 hover:text-slate-700"
                  aria-label="Mở rộng khối lớp"
                >
                  {clsOpen ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
                </button>
                <input
                  type="checkbox"
                  checked={clsChecked}
                  onChange={(e) => onToggleCheckIds(clsTplIds, e.target.checked)}
                  className="w-3.5 h-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-600 cursor-pointer"
                  title="Chọn toàn bộ khối lớp cho Ma trận đề"
                />
                <Folder size={15} className="text-blue-600 shrink-0" />
                <span
                  onClick={() => toggleExpand(cls.id)}
                  className="truncate flex-1 cursor-pointer"
                >
                  {cls.name}
                </span>
                <button
                  onClick={() => {
                    setAddingTarget({ parentId: cls.id, kind: 'chapter' });
                    setNewName('');
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1 text-slate-500 hover:text-blue-700 rounded hover:bg-white transition-opacity"
                  title="Thêm Chương / Chủ đề mới"
                >
                  <Plus size={14} />
                </button>
              </div>

              {/* Inline Add Chapter */}
              {addingTarget?.parentId === cls.id && addingTarget.kind === 'chapter' && (
                <div className="ml-6 mr-2 my-1 p-1.5 bg-slate-50 border border-slate-200 rounded-md flex items-center gap-1">
                  <input
                    autoFocus
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleConfirmAdd();
                      if (e.key === 'Escape') setAddingTarget(null);
                    }}
                    placeholder="Tên chương mới..."
                    className="flex-1 text-xs px-2 py-1 bg-white border border-slate-300 rounded focus:outline-none focus:border-blue-600"
                  />
                  <button
                    onClick={handleConfirmAdd}
                    className="p-1 text-emerald-600 hover:bg-emerald-50 rounded"
                  >
                    <Check size={14} />
                  </button>
                  <button
                    onClick={() => setAddingTarget(null)}
                    className="p-1 text-slate-500 hover:bg-slate-200 rounded"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}

              {/* Chapters */}
              {clsOpen && (
                <div className="ml-3 pl-2 border-l border-slate-200 space-y-0.5 mt-0.5">
                  {cls.children.map((chap) => {
                    const chapOpen = !!expandedIds[chap.id] || !!searchQuery;
                    const chapTplIds = getAllTemplatesInChapter(chap);
                    const chapChecked = isGroupChecked(chapTplIds);
                    const isEditingChap = editingId === chap.id;

                    return (
                      <div key={chap.id}>
                        {isEditingChap ? (
                          <div className="flex items-center gap-1 p-1 bg-slate-50 border border-slate-300 rounded">
                            <input
                              autoFocus
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') handleConfirmRename();
                                if (e.key === 'Escape') setEditingId(null);
                              }}
                              className="flex-1 text-xs px-2 py-1 bg-white border border-slate-300 rounded"
                            />
                            <button onClick={handleConfirmRename} className="p-1 text-emerald-600">
                              <Check size={13} />
                            </button>
                            <button onClick={() => setEditingId(null)} className="p-1 text-slate-400">
                              <X size={13} />
                            </button>
                          </div>
                        ) : (
                          <div className="group flex items-center gap-1.5 px-1.5 py-1.5 rounded-md hover:bg-slate-100 text-slate-800 text-[13px] font-medium">
                            <button
                              onClick={() => toggleExpand(chap.id)}
                              className="p-0.5 text-slate-400 hover:text-slate-700"
                            >
                              {chapOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                            </button>
                            <input
                              type="checkbox"
                              checked={chapChecked}
                              onChange={(e) => onToggleCheckIds(chapTplIds, e.target.checked)}
                              className="w-3.5 h-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-600 cursor-pointer"
                            />
                            <span
                              onClick={() => toggleExpand(chap.id)}
                              className="truncate flex-1 cursor-pointer"
                              title={chap.name}
                            >
                              {chap.name}
                            </span>
                            <div className="opacity-0 group-hover:opacity-100 flex items-center gap-0.5 transition-opacity">
                              <button
                                onClick={() => {
                                  setAddingTarget({ parentId: chap.id, kind: 'lesson' });
                                  setNewName('');
                                }}
                                className="p-1 text-slate-500 hover:text-blue-700 rounded hover:bg-white"
                                title="Thêm Bài học"
                              >
                                <Plus size={13} />
                              </button>
                              <button
                                onClick={() => {
                                  setEditingId(chap.id);
                                  setEditValue(chap.name);
                                }}
                                className="p-1 text-slate-500 hover:text-amber-600 rounded hover:bg-white"
                                title="Đổi tên"
                              >
                                <Edit2 size={12} />
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Inline Add Lesson */}
                        {addingTarget?.parentId === chap.id && addingTarget.kind === 'lesson' && (
                          <div className="ml-5 mr-1 my-1 p-1.5 bg-slate-50 border border-slate-200 rounded-md flex items-center gap-1">
                            <input
                              autoFocus
                              value={newName}
                              onChange={(e) => setNewName(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') handleConfirmAdd();
                                if (e.key === 'Escape') setAddingTarget(null);
                              }}
                              placeholder="Tên bài học mới..."
                              className="flex-1 text-xs px-2 py-1 bg-white border border-slate-300 rounded focus:outline-none focus:border-blue-600"
                            />
                            <button onClick={handleConfirmAdd} className="p-1 text-emerald-600">
                              <Check size={13} />
                            </button>
                            <button onClick={() => setAddingTarget(null)} className="p-1 text-slate-500">
                              <X size={13} />
                            </button>
                          </div>
                        )}

                        {/* Lessons */}
                        {chapOpen && (
                          <div className="ml-3 pl-2 border-l border-slate-200 space-y-0.5 mt-0.5">
                            {chap.children.map((lesson) => {
                              const lessonOpen = !!expandedIds[lesson.id] || !!searchQuery;
                              const lessonTplIds = getAllTemplatesInLesson(lesson);
                              const lessonChecked = isGroupChecked(lessonTplIds);
                              const isLessonSelected = selectedNodeId === lesson.id;

                              return (
                                <div key={lesson.id}>
                                  {editingId === lesson.id ? (
                                    <div className="flex items-center gap-1 p-1 bg-slate-50 border border-slate-300 rounded">
                                      <input
                                        autoFocus
                                        value={editValue}
                                        onChange={(e) => setEditValue(e.target.value)}
                                        onKeyDown={(e) => {
                                          if (e.key === 'Enter') handleConfirmRename();
                                          if (e.key === 'Escape') setEditingId(null);
                                        }}
                                        className="flex-1 text-xs px-2 py-1 bg-white border border-slate-300 rounded"
                                      />
                                      <button onClick={handleConfirmRename} className="p-1 text-emerald-600">
                                        <Check size={13} />
                                      </button>
                                      <button onClick={() => setEditingId(null)} className="p-1 text-slate-400">
                                        <X size={13} />
                                      </button>
                                    </div>
                                  ) : (
                                    <div
                                      className={`group relative flex items-center gap-1.5 px-1.5 py-1.5 rounded-md text-xs cursor-pointer transition-colors ${
                                        isLessonSelected
                                          ? 'bg-blue-50 text-blue-800 font-medium'
                                          : 'text-slate-700 hover:bg-slate-100'
                                      }`}
                                      onClick={() => {
                                        onSelectLesson(lesson, chap, cls);
                                        setExpandedIds((prev) => ({ ...prev, [lesson.id]: true }));
                                      }}
                                      onMouseLeave={() => {
                                        if (addTemplateMenuLessonId === lesson.id) {
                                          setAddTemplateMenuLessonId(null);
                                        }
                                      }}
                                    >
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          toggleExpand(lesson.id);
                                        }}
                                        className="p-0.5 text-slate-400 hover:text-slate-700"
                                      >
                                        {lessonOpen ? (
                                          <ChevronDown size={13} />
                                        ) : (
                                          <ChevronRight size={13} />
                                        )}
                                      </button>
                                      <input
                                        type="checkbox"
                                        checked={lessonChecked}
                                        onClick={(e) => e.stopPropagation()}
                                        onChange={(e) =>
                                          onToggleCheckIds(lessonTplIds, e.target.checked)
                                        }
                                        className="w-3.5 h-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-600 cursor-pointer"
                                      />
                                      <FileText size={13} className="text-emerald-600 shrink-0" />
                                      <span className="truncate flex-1" title={lesson.name}>
                                        {lesson.name}
                                      </span>

                                      <div className="opacity-0 group-hover:opacity-100 flex items-center gap-0.5 transition-opacity">
                                        <div className="relative">
                                          <button
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              setAddTemplateMenuLessonId(
                                                addTemplateMenuLessonId === lesson.id ? null : lesson.id
                                              );
                                            }}
                                            className="p-1 text-slate-500 hover:text-blue-700 rounded hover:bg-white"
                                            title="Thêm dạng toán động mới"
                                          >
                                            <Plus size={13} />
                                          </button>
                                          {addTemplateMenuLessonId === lesson.id && (
                                            <div
                                              onClick={(e) => e.stopPropagation()}
                                              className="absolute right-0 top-full mt-1 w-48 bg-white border border-slate-200 rounded-md shadow-md z-40 py-1"
                                            >
                                              <div className="px-3 py-1 text-[11px] font-semibold text-slate-500 border-b border-slate-100">
                                                Chọn cấu trúc câu hỏi
                                              </div>
                                              {(['MC', 'TF', 'SA', 'ES'] as QuestionCategory[]).map(
                                                (cat) => (
                                                  <button
                                                    key={cat}
                                                    onClick={() => {
                                                      setAddTemplateMenuLessonId(null);
                                                      onTriggerAddTemplate(lesson.id, cat);
                                                    }}
                                                    className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 hover:text-blue-700"
                                                  >
                                                    {CATEGORY_LABELS[cat]}
                                                  </button>
                                                )
                                              )}
                                            </div>
                                          )}
                                        </div>
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setEditingId(lesson.id);
                                            setEditValue(lesson.name);
                                          }}
                                          className="p-1 text-slate-500 hover:text-amber-600 rounded hover:bg-white"
                                          title="Đổi tên bài học"
                                        >
                                          <Edit2 size={12} />
                                        </button>
                                      </div>
                                    </div>
                                  )}

                                  {/* Templates inside lesson */}
                                  {lessonOpen && (
                                    <div className="ml-5 space-y-0.5 mt-0.5">
                                      {(['MC', 'TF', 'SA', 'ES'] as QuestionCategory[]).flatMap(
                                        (cat) =>
                                          lesson.mathTypes[cat].map((tpl) => {
                                            const isSelected = selectedNodeId === tpl.id;
                                            const isChecked = checkedTemplateIds.includes(tpl.id);
                                            return (
                                              <div
                                                key={tpl.id}
                                                onClick={() =>
                                                  onSelectTemplate(tpl, lesson, chap, cls)
                                                }
                                                className={`group flex items-center gap-1.5 px-2 py-1.5 rounded-md text-xs cursor-pointer transition-colors ${
                                                  isSelected
                                                    ? 'bg-blue-50 text-blue-800 font-medium'
                                                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                                }`}
                                              >
                                                <input
                                                  type="checkbox"
                                                  checked={isChecked}
                                                  onClick={(e) => e.stopPropagation()}
                                                  onChange={(e) =>
                                                    onToggleCheckIds([tpl.id], e.target.checked)
                                                  }
                                                  className="w-3.5 h-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-600 cursor-pointer shrink-0"
                                                />
                                                <span className="font-mono text-[10px] text-slate-500 shrink-0 w-5">
                                                  {CATEGORY_SHORT[cat]}
                                                </span>
                                                <span className="truncate flex-1" title={tpl.name}>
                                                  {tpl.name}
                                                </span>
                                                <span className="text-[11px] text-slate-400 shrink-0">
                                                  {tpl.level}
                                                </span>
                                                {confirmDeleteId === tpl.id ? (
                                                  <div
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="flex items-center gap-1"
                                                  >
                                                    <button
                                                      onClick={() => {
                                                        onDeleteNode(tpl.id);
                                                        setConfirmDeleteId(null);
                                                      }}
                                                      className="text-[11px] text-red-600 font-semibold hover:underline"
                                                    >
                                                      Xóa
                                                    </button>
                                                    <button
                                                      onClick={() => setConfirmDeleteId(null)}
                                                      className="text-[11px] text-slate-500"
                                                    >
                                                      Hủy
                                                    </button>
                                                  </div>
                                                ) : (
                                                  <button
                                                    onClick={(e) => {
                                                      e.stopPropagation();
                                                      setConfirmDeleteId(tpl.id);
                                                    }}
                                                    className="opacity-0 group-hover:opacity-100 p-0.5 text-slate-400 hover:text-red-600 transition-opacity"
                                                    title="Xóa dạng toán"
                                                  >
                                                    <Trash2 size={12} />
                                                  </button>
                                                )}
                                              </div>
                                            );
                                          })
                                      )}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
};
