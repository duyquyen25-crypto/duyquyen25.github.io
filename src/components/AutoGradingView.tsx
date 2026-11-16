import React, { useMemo, useState } from 'react';
import {
  Check,
  CheckCircle2,
  ClipboardCheck,
  Sparkles,
  UserPlus,
  Users,
  XCircle,
} from 'lucide-react';
import {
  ExamPaper,
  GradedSubmission,
  QuestionGradeDetail,
  SchoolClass,
  Student,
} from '../types/math';
import { compareShortAnswer } from '../engine/mathUtils';
import { MathText } from './MathText';
import { QuestionDiagram } from './QuestionDiagram';

interface AutoGradingViewProps {
  exams: ExamPaper[];
  classes: SchoolClass[];
  students: Student[];
  onSaveSubmission: (submission: GradedSubmission) => void;
  onSaveBatchSubmissions: (submissions: GradedSubmission[]) => void;
  onAddStudent: (fullName: string, code: string, classId: string) => Student;
}

interface SingleAnswerState {
  mcIndex?: number;
  tfFlags?: Record<'a' | 'b' | 'c' | 'd', boolean | null>;
  saText?: string;
  esCheckedSteps?: boolean[];
}

export const AutoGradingView: React.FC<AutoGradingViewProps> = ({
  exams,
  classes,
  students,
  onSaveSubmission,
  onSaveBatchSubmissions,
  onAddStudent,
}) => {
  const [mode, setMode] = useState<'single' | 'batch'>('single');
  const [selectedExamId, setSelectedExamId] = useState<string>(exams[0]?.id || '');
  const [selectedClassId, setSelectedClassId] = useState<string>(classes[0]?.id || '');
  const classStudents = useMemo(
    () => students.filter((s) => s.classId === selectedClassId),
    [students, selectedClassId]
  );
  const [selectedStudentId, setSelectedStudentId] = useState<string>(
    classStudents[0]?.id || ''
  );

  // Quick Add Student inline
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentCode, setNewStudentCode] = useState('');

  // Single paper answers keyed by instanceId
  const [answers, setAnswers] = useState<Record<string, SingleAnswerState>>({});
  const [lastGradedResult, setLastGradedResult] = useState<GradedSubmission | null>(null);

  // Batch inputs: studentId -> instanceId -> raw string
  const [batchInputs, setBatchInputs] = useState<Record<string, Record<string, string>>>({});
  const [toastMsg, setToastMsg] = useState('');

  const selectedExam = exams.find((e) => e.id === selectedExamId) || exams[0] || null;
  const selectedClass = classes.find((c) => c.id === selectedClassId) || classes[0] || null;
  const selectedStudent =
    classStudents.find((s) => s.id === selectedStudentId) || classStudents[0] || null;

  const notify = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3500);
  };

  const handleClassChange = (clsId: string) => {
    setSelectedClassId(clsId);
    const first = students.find((s) => s.classId === clsId);
    setSelectedStudentId(first?.id || '');
    setLastGradedResult(null);
  };

  const handleAutoFillDemoAnswers = () => {
    if (!selectedExam) return;
    const next: Record<string, SingleAnswerState> = {};
    selectedExam.questions.forEach((q, idx) => {
      if (q.category === 'MC') {
        // ~75% accurate demo
        const cIdx = q.content.correctIndex ?? 0;
        next[q.instanceId] = { mcIndex: idx % 4 === 3 ? (cIdx + 1) % 4 : cIdx };
      } else if (q.category === 'TF' && q.content.tfStatements) {
        const flags: Record<'a' | 'b' | 'c' | 'd', boolean | null> = {
          a: null,
          b: null,
          c: null,
          d: null,
        };
        q.content.tfStatements.forEach((st, sIdx) => {
          flags[st.key] = sIdx === 3 && idx % 2 === 1 ? !st.isTrue : st.isTrue;
        });
        next[q.instanceId] = { tfFlags: flags };
      } else if (q.category === 'SA') {
        next[q.instanceId] = {
          saText: idx % 3 === 2 ? '0' : q.content.shortAnswer || '',
        };
      } else if (q.category === 'ES' && q.content.rubric) {
        next[q.instanceId] = {
          esCheckedSteps: q.content.rubric.map((_, rIdx) => rIdx < 2),
        };
      }
    });
    setAnswers(next);
    setLastGradedResult(null);
  };

  const handleGradeSingleSubmission = () => {
    if (!selectedExam || !selectedStudent || !selectedClass) return;

    let totalScore = 0;
    const details: QuestionGradeDetail[] = selectedExam.questions.map((q) => {
      const ans = answers[q.instanceId] || {};
      let earned = 0;
      let isCorrect = false;
      let studentDisplay = 'Bỏ trống';
      let correctDisplay = '';

      if (q.category === 'MC') {
        const cIdx = q.content.correctIndex ?? 0;
        correctDisplay = String.fromCharCode(65 + cIdx);
        if (ans.mcIndex !== undefined) {
          studentDisplay = String.fromCharCode(65 + ans.mcIndex);
          if (ans.mcIndex === cIdx) {
            earned = q.points;
            isCorrect = true;
          }
        }
      } else if (q.category === 'TF' && q.content.tfStatements) {
        const flags = ans.tfFlags || { a: null, b: null, c: null, d: null };
        let correctCount = 0;
        const chosenParts: string[] = [];
        const keyParts: string[] = [];

        q.content.tfStatements.forEach((st) => {
          keyParts.push(`${st.key}:${st.isTrue ? 'Đ' : 'S'}`);
          const stuVal = flags[st.key];
          if (stuVal === null || stuVal === undefined) {
            chosenParts.push(`${st.key}:-`);
          } else {
            chosenParts.push(`${st.key}:${stuVal ? 'Đ' : 'S'}`);
            if (stuVal === st.isTrue) correctCount++;
          }
        });

        correctDisplay = keyParts.join(', ');
        studentDisplay = chosenParts.join(', ');
        const factor =
          correctCount === 4
            ? 1
            : correctCount === 3
            ? 0.5
            : correctCount === 2
            ? 0.25
            : correctCount === 1
            ? 0.1
            : 0;
        earned = Number((q.points * factor).toFixed(2));
        isCorrect = correctCount === 4;
      } else if (q.category === 'SA') {
        const expected = q.content.shortAnswer || '';
        correctDisplay = expected;
        const raw = (ans.saText || '').trim();
        studentDisplay = raw || 'Bỏ trống';
        if (compareShortAnswer(raw, expected, q.content.numericValue)) {
          earned = q.points;
          isCorrect = true;
        }
      } else if (q.category === 'ES' && q.content.rubric) {
        correctDisplay = q.content.answerSummary;
        const steps = ans.esCheckedSteps || [];
        const rubricTotal = q.content.rubric.reduce((acc, r) => acc + r.points, 0) || 1;
        const checkedPts = q.content.rubric.reduce(
          (acc, r, idx) => acc + (steps[idx] ? r.points : 0),
          0
        );
        const ratio = Math.min(1, checkedPts / rubricTotal);
        earned = Number((q.points * ratio).toFixed(2));
        isCorrect = ratio >= 0.99;
        studentDisplay = `Đạt ${Math.round(ratio * 100)}% biểu điểm`;
      }

      totalScore += earned;
      return {
        instanceId: q.instanceId,
        templateId: q.templateId,
        templateName: q.templateName,
        chapterName: q.chapterName,
        lessonName: q.lessonName,
        category: q.category,
        level: q.level,
        maxPoints: q.points,
        earnedPoints: earned,
        isCorrect,
        studentAnswerDisplay: studentDisplay,
        correctAnswerDisplay: correctDisplay,
      };
    });

    const normalizedScore10 =
      selectedExam.totalPoints > 0
        ? Number(((totalScore / selectedExam.totalPoints) * 10).toFixed(2))
        : 0;

    const submission: GradedSubmission = {
      id: `sub_${Date.now()}_${selectedStudent.id}`,
      examId: selectedExam.id,
      examCode: selectedExam.code,
      examTitle: selectedExam.title,
      studentId: selectedStudent.id,
      studentName: selectedStudent.fullName,
      studentCode: selectedStudent.code,
      classId: selectedClass.id,
      className: selectedClass.name,
      submittedAt: new Date().toLocaleString('vi-VN'),
      totalScore: Number(totalScore.toFixed(2)),
      maxScore: selectedExam.totalPoints,
      normalizedScore10,
      details,
    };

    setLastGradedResult(submission);
    onSaveSubmission(submission);
    notify(
      `Đã chấm tự động & lưu điểm cho ${selectedStudent.fullName}: ${normalizedScore10.toFixed(2)}/10`
    );
  };

  // Batch helpers
  const handleFillBatchMock = () => {
    if (!selectedExam) return;
    const next: Record<string, Record<string, string>> = {};
    classStudents.forEach((stu, sIdx) => {
      next[stu.id] = {};
      selectedExam.questions.forEach((q, qIdx) => {
        const miss = (sIdx + qIdx) % 5 === 0;
        if (q.category === 'MC') {
          const c = q.content.correctIndex ?? 0;
          next[stu.id][q.instanceId] = String.fromCharCode(65 + (miss ? (c + 1) % 4 : c));
        } else if (q.category === 'TF' && q.content.tfStatements) {
          next[stu.id][q.instanceId] = q.content.tfStatements
            .map((st, idx) => ((miss && idx === 2 ? !st.isTrue : st.isTrue) ? 'Đ' : 'S'))
            .join('');
        } else if (q.category === 'SA') {
          next[stu.id][q.instanceId] = miss ? '0' : q.content.shortAnswer || '0';
        } else {
          next[stu.id][q.instanceId] = miss
            ? String((q.points * 0.5).toFixed(2))
            : String(q.points);
        }
      });
    });
    setBatchInputs(next);
  };

  const handleGradeBatchClass = () => {
    if (!selectedExam || !selectedClass || classStudents.length === 0) return;

    const batchSubs: GradedSubmission[] = classStudents.map((stu) => {
      const stuMap = batchInputs[stu.id] || {};
      let totalScore = 0;

      const details: QuestionGradeDetail[] = selectedExam.questions.map((q) => {
        const raw = (stuMap[q.instanceId] || '').trim();
        let earned = 0;
        let isCorrect = false;
        let correctDisplay = '';

        if (q.category === 'MC') {
          correctDisplay = String.fromCharCode(65 + (q.content.correctIndex ?? 0));
          if (raw.toUpperCase() === correctDisplay) {
            earned = q.points;
            isCorrect = true;
          }
        } else if (q.category === 'TF' && q.content.tfStatements) {
          correctDisplay = q.content.tfStatements
            .map((st) => (st.isTrue ? 'Đ' : 'S'))
            .join('');
          const normalized = raw.toUpperCase().replace(/[^ĐDS]/g, '');
          let correctParts = 0;
          q.content.tfStatements.forEach((st, idx) => {
            const ch = normalized[idx];
            const stuBool = ch === 'Đ' || ch === 'D' ? true : ch === 'S' ? false : null;
            if (stuBool !== null && stuBool === st.isTrue) correctParts++;
          });
          const factor =
            correctParts === 4
              ? 1
              : correctParts === 3
              ? 0.5
              : correctParts === 2
              ? 0.25
              : correctParts === 1
              ? 0.1
              : 0;
          earned = Number((q.points * factor).toFixed(2));
          isCorrect = correctParts === 4;
        } else if (q.category === 'SA') {
          correctDisplay = q.content.shortAnswer || '';
          if (compareShortAnswer(raw, correctDisplay, q.content.numericValue)) {
            earned = q.points;
            isCorrect = true;
          }
        } else {
          correctDisplay = `${q.points} đ`;
          const val = Number(raw.replace(',', '.'));
          if (Number.isFinite(val) && val >= 0) {
            earned = Math.min(q.points, val);
            isCorrect = earned >= q.points * 0.99;
          }
        }

        totalScore += earned;
        return {
          instanceId: q.instanceId,
          templateId: q.templateId,
          templateName: q.templateName,
          chapterName: q.chapterName,
          lessonName: q.lessonName,
          category: q.category,
          level: q.level,
          maxPoints: q.points,
          earnedPoints: earned,
          isCorrect,
          studentAnswerDisplay: raw || '-',
          correctAnswerDisplay: correctDisplay,
        };
      });

      const normalizedScore10 =
        selectedExam.totalPoints > 0
          ? Number(((totalScore / selectedExam.totalPoints) * 10).toFixed(2))
          : 0;

      return {
        id: `sub_batch_${Date.now()}_${stu.id}`,
        examId: selectedExam.id,
        examCode: selectedExam.code,
        examTitle: selectedExam.title,
        studentId: stu.id,
        studentName: stu.fullName,
        studentCode: stu.code,
        classId: selectedClass.id,
        className: selectedClass.name,
        submittedAt: new Date().toLocaleString('vi-VN'),
        totalScore: Number(totalScore.toFixed(2)),
        maxScore: selectedExam.totalPoints,
        normalizedScore10,
        details,
      };
    });

    onSaveBatchSubmissions(batchSubs);
    notify(`Đã chấm tự động và cập nhật hồ sơ cho ${batchSubs.length} học sinh lớp ${selectedClass.name}`);
  };

  const handleConfirmAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim() || !selectedClassId) return;
    const created = onAddStudent(
      newStudentName.trim(),
      newStudentCode.trim() || `HS${Math.floor(1000 + Math.random() * 9000)}`,
      selectedClassId
    );
    setSelectedStudentId(created.id);
    setNewStudentName('');
    setNewStudentCode('');
    setShowAddStudent(false);
    notify(`Đã thêm học sinh ${created.fullName}`);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#F8FAFC] relative">
      {toastMsg && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-md shadow-lg text-xs font-medium flex items-center gap-2">
          <Check size={14} className="text-emerald-400" />
          {toastMsg}
        </div>
      )}

      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-3.5 flex flex-wrap items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-lg font-semibold text-slate-900">
            Hệ thống Chấm điểm Tự động (Chuẩn GDPT 2018)
          </h1>
          <p className="text-xs text-slate-500">
            Tự động chấm MC, TF (0.1 / 0.25 / 0.5 / 1.0 theo số ý đúng), SA (chuẩn hóa phân số/thập phân) và ES theo biểu điểm
          </p>
        </div>

        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-md">
          <button
            onClick={() => setMode('single')}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              mode === 'single'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ClipboardCheck size={14} />
            Chấm từng bài / Thi thử
          </button>
          <button
            onClick={() => setMode('batch')}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              mode === 'batch'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users size={14} />
            Chấm hàng loạt theo lớp
          </button>
        </div>
      </div>

      {/* Exam & Class Selector Bar */}
      <div className="bg-white border-b border-slate-200 px-6 py-3 flex flex-wrap items-end gap-4 shrink-0">
        <div className="min-w-[260px] flex-1">
          <label className="block text-[11px] font-medium text-slate-500 mb-1">
            Chọn Đề thi (Mã đề)
          </label>
          <select
            value={selectedExam?.id || ''}
            onChange={(e) => {
              setSelectedExamId(e.target.value);
              setAnswers({});
              setLastGradedResult(null);
            }}
            className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md bg-white"
          >
            {exams.map((ex) => (
              <option key={ex.id} value={ex.id}>
                Mã {ex.code} — {ex.title} ({ex.questions.length} câu · {ex.totalPoints}đ)
              </option>
            ))}
          </select>
        </div>

        <div className="w-40">
          <label className="block text-[11px] font-medium text-slate-500 mb-1">Lớp học</label>
          <select
            value={selectedClassId}
            onChange={(e) => handleClassChange(e.target.value)}
            className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-md bg-white"
          >
            {classes.map((c) => (
              <option key={c.id} value={c.id}>
                Lớp {c.name}
              </option>
            ))}
          </select>
        </div>

        {mode === 'single' && (
          <div className="w-60">
            <label className="block text-[11px] font-medium text-slate-500 mb-1">Học sinh</label>
            <div className="flex items-center gap-1.5">
              <select
                value={selectedStudent?.id || ''}
                onChange={(e) => {
                  setSelectedStudentId(e.target.value);
                  setLastGradedResult(null);
                }}
                className="flex-1 px-3 py-1.5 text-xs border border-slate-300 rounded-md bg-white"
              >
                {classStudents.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.code} — {s.fullName}
                  </option>
                ))}
              </select>
              <button
                onClick={() => setShowAddStudent((v) => !v)}
                className="p-1.5 border border-slate-300 rounded-md hover:bg-slate-50 text-slate-600"
                title="Thêm học sinh mới"
              >
                <UserPlus size={14} />
              </button>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2 ml-auto">
          {mode === 'single' ? (
            <>
              <button
                onClick={handleAutoFillDemoAnswers}
                className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 whitespace-nowrap"
              >
                Điền mẫu bài làm
              </button>
              <button
                onClick={handleGradeSingleSubmission}
                disabled={!selectedExam || !selectedStudent}
                className="px-4 py-1.5 text-xs font-medium text-white bg-blue-700 hover:bg-blue-800 rounded-md flex items-center gap-1.5 disabled:opacity-50 whitespace-nowrap"
              >
                <Sparkles size={13} />
                Chấm điểm tự động & Lưu
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleFillBatchMock}
                className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 whitespace-nowrap"
              >
                Điền nhanh bài làm lớp
              </button>
              <button
                onClick={handleGradeBatchClass}
                disabled={!selectedExam || classStudents.length === 0}
                className="px-4 py-1.5 text-xs font-medium text-white bg-blue-700 hover:bg-blue-800 rounded-md flex items-center gap-1.5 disabled:opacity-50 whitespace-nowrap"
              >
                <Sparkles size={13} />
                Chấm & Lưu cả lớp ({classStudents.length} HS)
              </button>
            </>
          )}
        </div>
      </div>

      {/* Inline Add Student Form */}
      {showAddStudent && (
        <form
          onSubmit={handleConfirmAddStudent}
          className="bg-slate-50 border-b border-slate-200 px-6 py-2.5 flex items-center gap-3 text-xs"
        >
          <span className="font-medium text-slate-700">Thêm học sinh vào lớp {selectedClass?.name}:</span>
          <input
            required
            value={newStudentCode}
            onChange={(e) => setNewStudentCode(e.target.value)}
            placeholder="Mã HS (VD: HS1211)"
            className="w-32 px-2.5 py-1 bg-white border border-slate-300 rounded"
          />
          <input
            required
            value={newStudentName}
            onChange={(e) => setNewStudentName(e.target.value)}
            placeholder="Họ và tên học sinh..."
            className="w-60 px-2.5 py-1 bg-white border border-slate-300 rounded"
          />
          <button
            type="submit"
            className="px-3 py-1 bg-blue-700 text-white rounded font-medium hover:bg-blue-800"
          >
            Thêm
          </button>
          <button
            type="button"
            onClick={() => setShowAddStudent(false)}
            className="px-2.5 py-1 text-slate-600 hover:text-slate-900"
          >
            Hủy
          </button>
        </form>
      )}

      {/* MAIN BODY */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* SINGLE MODE */}
        {mode === 'single' && selectedExam && (
          <div className="max-w-5xl mx-auto space-y-5">
            {/* Graded Summary Banner */}
            {lastGradedResult && (
              <div className="bg-white border border-emerald-300 rounded-lg p-5 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={24} className="text-emerald-600 shrink-0" />
                  <div>
                    <div className="text-sm font-semibold text-slate-900">
                      Kết quả chấm tự động: {lastGradedResult.studentName} ({lastGradedResult.studentCode})
                    </div>
                    <div className="text-xs text-slate-600 mt-0.5">
                      Đề mã {lastGradedResult.examCode} · Đạt {lastGradedResult.totalScore}/
                      {lastGradedResult.maxScore} điểm gốc
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-500">Điểm quy đổi (Thang 10)</div>
                  <div className="text-2xl font-bold text-blue-700 font-mono tabular-nums">
                    {lastGradedResult.normalizedScore10.toFixed(2)}
                  </div>
                </div>
              </div>
            )}

            {/* Questions List */}
            {selectedExam.questions.map((q, idx) => {
              const cur = answers[q.instanceId] || {};
              const gradedDetail = lastGradedResult?.details.find(
                (d) => d.instanceId === q.instanceId
              );

              return (
                <div
                  key={q.instanceId}
                  className="bg-white border border-slate-200 rounded-lg p-5 space-y-3"
                >
                  <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-2.5">
                    <div className="text-xs text-slate-500">
                      <span className="font-semibold text-slate-900 mr-2">
                        Câu {idx + 1} ({q.points}đ)
                      </span>
                      <span>{q.category}</span>
                      <span aria-hidden="true" className="mx-1.5">·</span>
                      <span>{q.level}</span>
                      <span aria-hidden="true" className="mx-1.5">·</span>
                      <span>{q.lessonName}</span>
                    </div>

                    {gradedDetail && (
                      <div className="flex items-center gap-1.5 text-xs font-semibold tabular-nums shrink-0">
                        {gradedDetail.isCorrect ? (
                          <span className="text-emerald-700 flex items-center gap-1">
                            <CheckCircle2 size={14} /> +{gradedDetail.earnedPoints}đ
                          </span>
                        ) : gradedDetail.earnedPoints > 0 ? (
                          <span className="text-amber-700">
                            Đạt một phần: +{gradedDetail.earnedPoints}/{gradedDetail.maxPoints}đ
                          </span>
                        ) : (
                          <span className="text-red-600 flex items-center gap-1">
                            <XCircle size={14} /> 0đ (Đáp án: {gradedDetail.correctAnswerDisplay})
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="text-sm text-slate-900 leading-relaxed">
                    <MathText text={q.content.stem} />
                    <QuestionDiagram diagram={q.content.diagram} compact />
                  </div>

                  {/* MC Input */}
                  {q.category === 'MC' && q.content.options && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      {q.content.options.map((opt, oIdx) => {
                        const picked = cur.mcIndex === oIdx;
                        return (
                          <button
                            key={oIdx}
                            type="button"
                            onClick={() =>
                              setAnswers((prev) => ({
                                ...prev,
                                [q.instanceId]: { ...cur, mcIndex: oIdx },
                              }))
                            }
                            className={`text-left px-3.5 py-2 rounded-md border text-xs flex items-center gap-2 transition-colors ${
                              picked
                                ? 'bg-blue-50 border-blue-600 text-blue-900 font-medium'
                                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            <span className="font-semibold">
                              {String.fromCharCode(65 + oIdx)}.
                            </span>
                            <MathText text={opt} />
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* TF Input */}
                  {q.category === 'TF' && q.content.tfStatements && (
                    <div className="divide-y divide-slate-200 border border-slate-200 rounded-md">
                      {q.content.tfStatements.map((st) => {
                        const curFlag = cur.tfFlags?.[st.key] ?? null;
                        return (
                          <div
                            key={st.key}
                            className="px-3.5 py-2 flex items-center justify-between gap-4 text-xs"
                          >
                            <div className="flex-1 min-w-0">
                              <div>
                                <span className="font-semibold mr-1.5">{st.key})</span>
                                <MathText text={st.text} />
                              </div>
                              {st.diagram && <QuestionDiagram diagram={st.diagram} compact />}
                            </div>
                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                type="button"
                                onClick={() =>
                                  setAnswers((prev) => ({
                                    ...prev,
                                    [q.instanceId]: {
                                      ...cur,
                                      tfFlags: {
                                        a: null,
                                        b: null,
                                        c: null,
                                        d: null,
                                        ...(cur.tfFlags || {}),
                                        [st.key]: true,
                                      },
                                    },
                                  }))
                                }
                                className={`px-2.5 py-1 rounded border text-xs font-medium ${
                                  curFlag === true
                                    ? 'bg-emerald-600 text-white border-emerald-600'
                                    : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'
                                }`}
                              >
                                Đúng
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  setAnswers((prev) => ({
                                    ...prev,
                                    [q.instanceId]: {
                                      ...cur,
                                      tfFlags: {
                                        a: null,
                                        b: null,
                                        c: null,
                                        d: null,
                                        ...(cur.tfFlags || {}),
                                        [st.key]: false,
                                      },
                                    },
                                  }))
                                }
                                className={`px-2.5 py-1 rounded border text-xs font-medium ${
                                  curFlag === false
                                    ? 'bg-red-600 text-white border-red-600'
                                    : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'
                                }`}
                              >
                                Sai
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* SA Input */}
                  {q.category === 'SA' && (
                    <div className="flex items-center gap-3 pt-1">
                      <label className="text-xs font-medium text-slate-600">
                        Đáp án học sinh ghi nhận:
                      </label>
                      <input
                        type="text"
                        value={cur.saText || ''}
                        onChange={(e) =>
                          setAnswers((prev) => ({
                            ...prev,
                            [q.instanceId]: { ...cur, saText: e.target.value },
                          }))
                        }
                        placeholder="Nhập số hoặc phân số (VD: 1,5 hoặc 3/2)"
                        className="w-64 px-3 py-1.5 text-xs font-mono border border-slate-300 rounded-md focus:outline-none focus:border-blue-600"
                      />
                    </div>
                  )}

                  {/* ES Rubric Checklist */}
                  {q.category === 'ES' && q.content.rubric && (
                    <div className="border border-slate-200 rounded-md overflow-hidden">
                      <div className="px-3.5 py-2 bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-700">
                        Tích chọn các bước học sinh làm đúng theo biểu điểm
                      </div>
                      <div className="divide-y divide-slate-100">
                        {q.content.rubric.map((step, sIdx) => {
                          const checked = cur.esCheckedSteps?.[sIdx] ?? false;
                          return (
                            <label
                              key={sIdx}
                              className="px-3.5 py-2 flex items-center justify-between gap-3 text-xs cursor-pointer hover:bg-slate-50"
                            >
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={checked}
                                  onChange={(e) => {
                                    const nextArr = q.content.rubric!.map(
                                      (_, i) => cur.esCheckedSteps?.[i] ?? false
                                    );
                                    nextArr[sIdx] = e.target.checked;
                                    setAnswers((prev) => ({
                                      ...prev,
                                      [q.instanceId]: { ...cur, esCheckedSteps: nextArr },
                                    }));
                                  }}
                                  className="rounded border-slate-300 text-blue-600"
                                />
                                <span className="text-slate-700">{step.description}</span>
                              </div>
                              <span className="font-mono text-slate-500 tabular-nums">
                                +{step.points}đ
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* BATCH MODE */}
        {mode === 'batch' && selectedExam && (
          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
            <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-800">
                Bảng nhập đáp án chấm tự động cả lớp {selectedClass?.name}
              </span>
              <span className="text-slate-500">
                Quy ước nhập: MC (A/B/C/D) · TF (chuỗi 4 ký tự Đ/S, VD: ĐĐSĐ) · SA (số/phân số) · ES (điểm tự luận)
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse tabular-nums">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
                  <tr>
                    <th className="py-2.5 px-3 text-left font-medium sticky left-0 bg-slate-50 border-r border-slate-200 min-w-[170px]">
                      Học sinh
                    </th>
                    {selectedExam.questions.map((q, idx) => (
                      <th key={q.instanceId} className="py-2 px-2 text-center font-medium min-w-[92px] border-r border-slate-100">
                        <div>Câu {idx + 1} ({q.category})</div>
                        <div className="text-[10px] font-mono text-emerald-700 mt-0.5">
                          ĐA:{' '}
                          {q.category === 'MC'
                            ? String.fromCharCode(65 + (q.content.correctIndex ?? 0))
                            : q.category === 'TF'
                            ? q.content.tfStatements?.map((s) => (s.isTrue ? 'Đ' : 'S')).join('')
                            : q.category === 'SA'
                            ? q.content.shortAnswer
                            : `${q.points}đ`}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {classStudents.map((stu) => (
                    <tr key={stu.id} className="hover:bg-slate-50">
                      <td className="py-2 px-3 font-medium text-slate-800 sticky left-0 bg-white border-r border-slate-200">
                        <div>{stu.fullName}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{stu.code}</div>
                      </td>
                      {selectedExam.questions.map((q) => (
                        <td key={q.instanceId} className="p-1.5 border-r border-slate-100">
                          <input
                            type="text"
                            value={batchInputs[stu.id]?.[q.instanceId] || ''}
                            onChange={(e) =>
                              setBatchInputs((prev) => ({
                                ...prev,
                                [stu.id]: {
                                  ...(prev[stu.id] || {}),
                                  [q.instanceId]: e.target.value,
                                },
                              }))
                            }
                            placeholder={
                              q.category === 'MC'
                                ? 'A-D'
                                : q.category === 'TF'
                                ? 'ĐĐSĐ'
                                : q.category === 'SA'
                                ? 'Số'
                                : `0-${q.points}`
                            }
                            className="w-full px-2 py-1 text-center font-mono border border-slate-200 rounded focus:outline-none focus:border-blue-600"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
