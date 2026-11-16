import React, { useEffect, useState } from 'react';
import {
  ClassCurriculumNode,
  ChapterNode,
  ExamPaper,
  GradedSubmission,
  LessonNode,
  MathTemplate,
  QuestionCategory,
  SchoolClass,
  Student,
} from './types/math';
import {
  INITIAL_CLASSES,
  INITIAL_CURRICULUM_TREE,
  INITIAL_STUDENTS,
  buildInitialSubmissions,
  buildSampleExamsFromTree,
} from './data/initialData';
import { CurriculumSidebar } from './components/CurriculumSidebar';
import { BankManagerView } from './components/BankManagerView';
import { ExamMatrixView } from './components/ExamMatrixView';
import { AutoGradingView } from './components/AutoGradingView';
import { AnalyticsReportView } from './components/AnalyticsReportView';

type AppTab = 'bank' | 'matrix' | 'grading' | 'analytics';

const STORAGE_KEYS = {
  TREE: 'edumath2018_tree_v26',
  EXAMS: 'edumath2018_exams_v27',
  STUDENTS: 'edumath2018_students_v3',
  SUBMISSIONS: 'edumath2018_submissions_v27',
};

function loadFromStorage<T>(key: string, fallback: () => T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      return JSON.parse(raw) as T;
    }
  } catch {
    // ignore corrupted cache
  }
  return fallback();
}

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('bank');

  const [treeData, setTreeData] = useState<ClassCurriculumNode[]>(() =>
    loadFromStorage(STORAGE_KEYS.TREE, () => INITIAL_CURRICULUM_TREE)
  );

  const [classes] = useState<SchoolClass[]>(INITIAL_CLASSES);

  const [students, setStudents] = useState<Student[]>(() =>
    loadFromStorage(STORAGE_KEYS.STUDENTS, () => INITIAL_STUDENTS)
  );

  const [generatedExams, setGeneratedExams] = useState<ExamPaper[]>(() =>
    loadFromStorage(STORAGE_KEYS.EXAMS, () =>
      buildSampleExamsFromTree(INITIAL_CURRICULUM_TREE)
    )
  );

  const [submissions, setSubmissions] = useState<GradedSubmission[]>(() =>
    loadFromStorage(STORAGE_KEYS.SUBMISSIONS, () => {
      const sampleExams = buildSampleExamsFromTree(INITIAL_CURRICULUM_TREE);
      return buildInitialSubmissions(sampleExams, INITIAL_STUDENTS);
    })
  );

  // Selection state for BankManagerView — preselect Toán 12 Chương I Bài 1 Template 1
  const defaultCls = treeData.find((c) => c.id === 'l12') || treeData[0] || null;
  const defaultChap = defaultCls?.children[0] || null;
  const defaultLesson = defaultChap?.children[0] || null;
  const defaultTemplate = defaultLesson?.mathTypes.MC[0] || null;

  const [selectedClassId, setSelectedClassId] = useState<string | null>(defaultCls?.id || null);
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(defaultChap?.id || null);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(defaultLesson?.id || null);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(
    defaultTemplate?.id || null
  );
  const [addingTemplateTarget, setAddingTemplateTarget] = useState<{
    lessonId: string;
    category: QuestionCategory;
  } | null>(null);

  // Matrix selection checkboxes — preselect Toán 12 templates for immediate matrix readiness
  const [checkedTemplateIds, setCheckedTemplateIds] = useState<string[]>(() => {
    const ids: string[] = [];
    const cls12 = INITIAL_CURRICULUM_TREE.find((c) => c.id === 'l12');
    cls12?.children.forEach((ch) =>
      ch.children.forEach((l) =>
        (['MC', 'TF', 'SA', 'ES'] as QuestionCategory[]).forEach((cat) =>
          l.mathTypes[cat].forEach((t) => ids.push(t.id))
        )
      )
    );
    return ids;
  });

  // Sync changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TREE, JSON.stringify(treeData));
    } catch {
      // ignore storage quota
    }
  }, [treeData]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.EXAMS, JSON.stringify(generatedExams));
    } catch {
      // ignore
    }
  }, [generatedExams]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));
    } catch {
      // ignore
    }
  }, [students]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(submissions));
    } catch {
      // ignore
    }
  }, [submissions]);

  // Resolve current selection references fresh from treeData
  const selectedClass = treeData.find((c) => c.id === selectedClassId) || null;
  const selectedChapter =
    selectedClass?.children.find((ch) => ch.id === selectedChapterId) || null;
  const selectedLesson =
    selectedChapter?.children.find((l) => l.id === selectedLessonId) || null;
  const selectedTemplate = (() => {
    if (!selectedLesson || !selectedTemplateId) return null;
    for (const cat of ['MC', 'TF', 'SA', 'ES'] as QuestionCategory[]) {
      const found = selectedLesson.mathTypes[cat].find((t) => t.id === selectedTemplateId);
      if (found) return found;
    }
    return null;
  })();

  // Tree Handlers
  const handleToggleCheckIds = (ids: string[], checked: boolean) => {
    setCheckedTemplateIds((prev) => {
      if (checked) {
        const merged = new Set([...prev, ...ids]);
        return Array.from(merged);
      }
      return prev.filter((id) => !ids.includes(id));
    });
  };

  const handleAddChapter = (classId: string, name: string) => {
    const newChap: ChapterNode = {
      id: `chap_${Date.now().toString(36)}`,
      name,
      type: 'chapter',
      children: [],
    };
    setTreeData((prev) =>
      prev.map((cls) =>
        cls.id === classId ? { ...cls, children: [...cls.children, newChap] } : cls
      )
    );
  };

  const handleAddLesson = (chapterId: string, name: string) => {
    const newLesson: LessonNode = {
      id: `les_${Date.now().toString(36)}`,
      name,
      type: 'lesson',
      mathTypes: { MC: [], TF: [], SA: [], ES: [] },
    };
    setTreeData((prev) =>
      prev.map((cls) => ({
        ...cls,
        children: cls.children.map((ch) =>
          ch.id === chapterId ? { ...ch, children: [...ch.children, newLesson] } : ch
        ),
      }))
    );
  };

  const handleRenameNode = (nodeId: string, newName: string) => {
    setTreeData((prev) =>
      prev.map((cls) => ({
        ...cls,
        children: cls.children.map((ch) =>
          ch.id === nodeId
            ? { ...ch, name: newName }
            : {
                ...ch,
                children: ch.children.map((l) =>
                  l.id === nodeId ? { ...l, name: newName } : l
                ),
              }
        ),
      }))
    );
  };

  const handleDeleteNode = (targetId: string) => {
    setTreeData((prev) =>
      prev.map((cls) => ({
        ...cls,
        children: cls.children.map((ch) => ({
          ...ch,
          children: ch.children.map((l) => ({
            ...l,
            mathTypes: {
              MC: l.mathTypes.MC.filter((t) => t.id !== targetId),
              TF: l.mathTypes.TF.filter((t) => t.id !== targetId),
              SA: l.mathTypes.SA.filter((t) => t.id !== targetId),
              ES: l.mathTypes.ES.filter((t) => t.id !== targetId),
            },
          })),
        })),
      }))
    );
    setCheckedTemplateIds((prev) => prev.filter((id) => id !== targetId));
    if (selectedTemplateId === targetId) setSelectedTemplateId(null);
  };

  const handleTriggerAddTemplate = (lessonId: string, category: QuestionCategory) => {
    for (const cls of treeData) {
      for (const ch of cls.children) {
        const l = ch.children.find((item) => item.id === lessonId);
        if (l) {
          setSelectedClassId(cls.id);
          setSelectedChapterId(ch.id);
          setSelectedLessonId(l.id);
          setSelectedTemplateId(null);
          setAddingTemplateTarget({ lessonId, category });
          setActiveTab('bank');
          return;
        }
      }
    }
  };

  const handleUpdateTemplate = (lessonId: string, updated: MathTemplate) => {
    setTreeData((prev) =>
      prev.map((cls) => ({
        ...cls,
        children: cls.children.map((ch) => ({
          ...ch,
          children: ch.children.map((l) => {
            if (l.id !== lessonId) return l;
            return {
              ...l,
              mathTypes: {
                ...l.mathTypes,
                [updated.category]: l.mathTypes[updated.category].map((t) =>
                  t.id === updated.id ? updated : t
                ),
              },
            };
          }),
        })),
      }))
    );
  };

  const handleCreateTemplate = (lessonId: string, newTpl: MathTemplate) => {
    setTreeData((prev) =>
      prev.map((cls) => ({
        ...cls,
        children: cls.children.map((ch) => ({
          ...ch,
          children: ch.children.map((l) => {
            if (l.id !== lessonId) return l;
            return {
              ...l,
              mathTypes: {
                ...l.mathTypes,
                [newTpl.category]: [...l.mathTypes[newTpl.category], newTpl],
              },
            };
          }),
        })),
      }))
    );
    setAddingTemplateTarget(null);
    setSelectedTemplateId(newTpl.id);
  };

  const handleSaveGeneratedExams = (newPapers: ExamPaper[]) => {
    setGeneratedExams(newPapers);
  };

  const handleSaveSubmission = (sub: GradedSubmission) => {
    setSubmissions((prev) => [...prev, sub]);
  };

  const handleSaveBatchSubmissions = (batch: GradedSubmission[]) => {
    setSubmissions((prev) => [...prev, ...batch]);
  };

  const handleAddStudent = (fullName: string, code: string, classId: string): Student => {
    const cls = classes.find((c) => c.id === classId) || classes[0];
    const stu: Student = {
      id: `st_${Date.now().toString(36)}`,
      code,
      fullName,
      classId: cls.id,
      className: cls.name,
    };
    setStudents((prev) => [...prev, stu]);
    return stu;
  };

  const showSidebar = activeTab === 'bank' || activeTab === 'matrix';

  return (
    <div className="h-screen w-full flex flex-col bg-[#F8FAFC] text-[#0F172A] overflow-hidden">
      {/* Top Navigation Bar (Strict 3-Zone Contract) */}
      <header className="h-14 bg-white border-b border-slate-200 px-6 flex items-center justify-between gap-8 shrink-0 z-30">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('bank');
          }}
          className="text-base font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0"
        >
          EduMath 2018
        </a>

        {/* Zone 2: 4 Clean Single-Line Navigation Links */}
        <nav className="flex items-center gap-6 overflow-x-auto">
          {(
            [
              { id: 'bank', label: 'Ngân hàng động' },
              { id: 'matrix', label: 'Ma trận & Xuất đề' },
              { id: 'grading', label: 'Chấm điểm tự động' },
              { id: 'analytics', label: 'Thống kê & Báo cáo' },
            ] as const
          ).map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap shrink-0 ${
                  active
                    ? 'border-blue-700 text-blue-700'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="shrink-0">
          <button
            onClick={() => setActiveTab('matrix')}
            className="px-4 py-2 text-xs font-medium text-white bg-blue-700 hover:bg-blue-800 rounded-md transition-colors whitespace-nowrap shrink-0"
          >
            Sinh đề thi
          </button>
        </div>
      </header>

      {/* Main Workspace Container */}
      <div className="flex-1 flex overflow-hidden">
        {showSidebar && (
          <CurriculumSidebar
            treeData={treeData}
            selectedNodeId={selectedTemplateId || selectedLessonId}
            checkedTemplateIds={checkedTemplateIds}
            onSelectLesson={(lesson, chapter, cls) => {
              setSelectedClassId(cls.id);
              setSelectedChapterId(chapter.id);
              setSelectedLessonId(lesson.id);
              setSelectedTemplateId(null);
              setAddingTemplateTarget(null);
              setActiveTab('bank');
            }}
            onSelectTemplate={(tpl, lesson, chapter, cls) => {
              setSelectedClassId(cls.id);
              setSelectedChapterId(chapter.id);
              setSelectedLessonId(lesson.id);
              setSelectedTemplateId(tpl.id);
              setAddingTemplateTarget(null);
              setActiveTab('bank');
            }}
            onToggleCheckIds={handleToggleCheckIds}
            onAddChapter={handleAddChapter}
            onAddLesson={handleAddLesson}
            onTriggerAddTemplate={handleTriggerAddTemplate}
            onRenameNode={handleRenameNode}
            onDeleteNode={handleDeleteNode}
          />
        )}

        {activeTab === 'bank' && (
          <BankManagerView
            selectedClass={selectedClass}
            selectedChapter={selectedChapter}
            selectedLesson={selectedLesson}
            selectedTemplate={selectedTemplate}
            addingTemplateTarget={addingTemplateTarget}
            onSelectTemplate={(tpl, lesson, chapter, cls) => {
              setSelectedClassId(cls.id);
              setSelectedChapterId(chapter.id);
              setSelectedLessonId(lesson.id);
              setSelectedTemplateId(tpl.id);
              setAddingTemplateTarget(null);
            }}
            onUpdateTemplate={handleUpdateTemplate}
            onCreateTemplate={handleCreateTemplate}
            onCancelCreateTemplate={() => setAddingTemplateTarget(null)}
            onTriggerAddTemplate={handleTriggerAddTemplate}
          />
        )}

        {activeTab === 'matrix' && (
          <ExamMatrixView
            treeData={treeData}
            checkedTemplateIds={checkedTemplateIds}
            onSetCheckedIds={setCheckedTemplateIds}
            generatedExams={generatedExams}
            onSaveGeneratedExams={handleSaveGeneratedExams}
          />
        )}

        {activeTab === 'grading' && (
          <AutoGradingView
            exams={generatedExams}
            classes={classes}
            students={students}
            onSaveSubmission={handleSaveSubmission}
            onSaveBatchSubmissions={handleSaveBatchSubmissions}
            onAddStudent={handleAddStudent}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsReportView
            classes={classes}
            students={students}
            submissions={submissions}
          />
        )}
      </div>
    </div>
  );
}
