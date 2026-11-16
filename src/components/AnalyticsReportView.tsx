import React, { useMemo, useRef, useState } from 'react';
import {
  BarChart3,
  Check,
  Download,
  FileSpreadsheet,
  FileText,
  Search,
  UserCheck,
} from 'lucide-react';
import {
  CognitiveLevel,
  GradedSubmission,
  QuestionCategory,
  SchoolClass,
  Student,
} from '../types/math';
import {
  ClassReportExportPayload,
  exportClassReportToDocx,
  exportElementToPdf,
  exportRowsToCsv,
} from '../utils/exporters';

interface AnalyticsReportViewProps {
  classes: SchoolClass[];
  students: Student[];
  submissions: GradedSubmission[];
}

function classifyScore(score: number): { label: string; colorClass: string } {
  if (score >= 8.0) return { label: 'Giỏi', colorClass: 'text-emerald-700' };
  if (score >= 6.5) return { label: 'Khá', colorClass: 'text-blue-700' };
  if (score >= 5.0) return { label: 'Đạt', colorClass: 'text-amber-700' };
  return { label: 'Chưa đạt', colorClass: 'text-red-600' };
}

export const AnalyticsReportView: React.FC<AnalyticsReportViewProps> = ({
  classes,
  students,
  submissions,
}) => {
  const [selectedClassId, setSelectedClassId] = useState<string>(classes[0]?.id || '');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState('');
  const [isExporting, setIsExporting] = useState(false);

  const reportAreaRef = useRef<HTMLDivElement>(null);

  const selectedClass = classes.find((c) => c.id === selectedClassId) || classes[0];
  const classStudents = useMemo(
    () => students.filter((s) => s.classId === selectedClassId),
    [students, selectedClassId]
  );
  const classSubmissions = useMemo(
    () => submissions.filter((sub) => sub.classId === selectedClassId),
    [submissions, selectedClassId]
  );

  const notify = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3500);
  };

  // Compute per-student aggregated stats
  const studentAnalytics = useMemo(() => {
    return classStudents.map((stu) => {
      const stuSubs = classSubmissions.filter((s) => s.studentId === stu.id);
      const latest = stuSubs[stuSubs.length - 1] || null;
      const avgScore =
        stuSubs.length > 0
          ? stuSubs.reduce((acc, s) => acc + s.normalizedScore10, 0) / stuSubs.length
          : 0;

      // Aggregate by lesson/topic
      const topicMap = new Map<string, { earned: number; max: number }>();
      const levelMap = new Map<CognitiveLevel, { earned: number; max: number }>();
      const catMap = new Map<QuestionCategory, { earned: number; max: number }>();

      stuSubs.forEach((sub) => {
        sub.details.forEach((d) => {
          const t = topicMap.get(d.lessonName) || { earned: 0, max: 0 };
          t.earned += d.earnedPoints;
          t.max += d.maxPoints;
          topicMap.set(d.lessonName, t);

          const lv = levelMap.get(d.level) || { earned: 0, max: 0 };
          lv.earned += d.earnedPoints;
          lv.max += d.maxPoints;
          levelMap.set(d.level, lv);

          const ct = catMap.get(d.category) || { earned: 0, max: 0 };
          ct.earned += d.earnedPoints;
          ct.max += d.maxPoints;
          catMap.set(d.category, ct);
        });
      });

      const topicBreakdown = Array.from(topicMap.entries())
        .map(([topic, val]) => ({
          topic,
          percent: val.max > 0 ? (val.earned / val.max) * 100 : 0,
        }))
        .sort((a, b) => a.percent - b.percent);

      const weakestTopic =
        topicBreakdown.length > 0 && topicBreakdown[0].percent < 75
          ? `${topicBreakdown[0].topic} (${topicBreakdown[0].percent.toFixed(0)}%)`
          : 'Ổn định các chủ đề';

      return {
        student: stu,
        submissions: stuSubs,
        latestScore: latest ? latest.normalizedScore10 : 0,
        avgScore,
        topicBreakdown,
        levelBreakdown: (['Biết', 'Hiểu', 'Vận dụng'] as CognitiveLevel[]).map((lv) => {
          const v = levelMap.get(lv);
          return {
            level: lv,
            percent: v && v.max > 0 ? (v.earned / v.max) * 100 : 0,
          };
        }),
        categoryBreakdown: (['MC', 'TF', 'SA', 'ES'] as QuestionCategory[]).map((ct) => {
          const v = catMap.get(ct);
          return {
            category: ct,
            percent: v && v.max > 0 ? (v.earned / v.max) * 100 : 0,
            hasData: !!v && v.max > 0,
          };
        }),
        weakestTopic,
        classification:
          stuSubs.length > 0 ? classifyScore(avgScore) : { label: 'Chưa có bài', colorClass: 'text-slate-400' },
      };
    });
  }, [classStudents, classSubmissions]);

  const filteredStudentAnalytics = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return studentAnalytics;
    return studentAnalytics.filter(
      (item) =>
        item.student.fullName.toLowerCase().includes(q) ||
        item.student.code.toLowerCase().includes(q)
    );
  }, [studentAnalytics, searchTerm]);

  // Compute class-level metrics
  const classSummary = useMemo(() => {
    const withData = studentAnalytics.filter((s) => s.submissions.length > 0);
    const n = withData.length;
    const avgScore =
      n > 0 ? withData.reduce((acc, s) => acc + s.avgScore, 0) / n : 0;
    const passCount = withData.filter((s) => s.avgScore >= 5.0).length;
    const goodCount = withData.filter((s) => s.avgScore >= 8.0).length;

    const buckets = [
      { label: '< 4.0', count: 0 },
      { label: '4.0 – 5.0', count: 0 },
      { label: '5.0 – 6.5', count: 0 },
      { label: '6.5 – 8.0', count: 0 },
      { label: '8.0 – 9.0', count: 0 },
      { label: '9.0 – 10', count: 0 },
    ];
    withData.forEach((s) => {
      const sc = s.avgScore;
      if (sc < 4) buckets[0].count++;
      else if (sc < 5) buckets[1].count++;
      else if (sc < 6.5) buckets[2].count++;
      else if (sc < 8) buckets[3].count++;
      else if (sc < 9) buckets[4].count++;
      else buckets[5].count++;
    });

    const topicMap = new Map<string, { earned: number; max: number; attempts: number }>();
    const levelMap = new Map<CognitiveLevel, { earned: number; max: number }>();

    classSubmissions.forEach((sub) => {
      sub.details.forEach((d) => {
        const cur = topicMap.get(d.lessonName) || { earned: 0, max: 0, attempts: 0 };
        cur.earned += d.earnedPoints;
        cur.max += d.maxPoints;
        cur.attempts += 1;
        topicMap.set(d.lessonName, cur);

        const lv = levelMap.get(d.level) || { earned: 0, max: 0 };
        lv.earned += d.earnedPoints;
        lv.max += d.maxPoints;
        levelMap.set(d.level, lv);
      });
    });

    const topicStats = Array.from(topicMap.entries())
      .map(([topic, val]) => {
        const pct = val.max > 0 ? (val.earned / val.max) * 100 : 0;
        const statusLabel =
          pct >= 80
            ? 'Nắm vững tốt'
            : pct >= 65
            ? 'Đạt yêu cầu'
            : 'Cần ôn tập tăng cường';
        return { topic, attempts: val.attempts, avgPercent: pct, statusLabel };
      })
      .sort((a, b) => a.avgPercent - b.avgPercent);

    const levelStats = (['Biết', 'Hiểu', 'Vận dụng'] as CognitiveLevel[]).map((lv) => {
      const v = levelMap.get(lv);
      return {
        level: lv,
        avgPercent: v && v.max > 0 ? (v.earned / v.max) * 100 : 0,
      };
    });

    return {
      studentCount: n,
      avgScore,
      passRate: n > 0 ? (passCount / n) * 100 : 0,
      goodRate: n > 0 ? (goodCount / n) * 100 : 0,
      buckets,
      topicStats,
      levelStats,
    };
  }, [studentAnalytics, classSubmissions]);

  const activeStudentDetail =
    studentAnalytics.find((s) => s.student.id === selectedStudentId) ||
    studentAnalytics[0] ||
    null;

  const handleExportReportDocx = async () => {
    if (!selectedClass) return;
    setIsExporting(true);
    try {
      const payload: ClassReportExportPayload = {
        className: selectedClass.name,
        teacherName: selectedClass.teacherName,
        studentCount: classSummary.studentCount,
        avgScore: classSummary.avgScore,
        passRate: classSummary.passRate,
        goodRate: classSummary.goodRate,
        topicStats: classSummary.topicStats,
        levelStats: classSummary.levelStats,
        studentRows: studentAnalytics.map((s) => ({
          code: s.student.code,
          name: s.student.fullName,
          latestScore: s.latestScore,
          avgScore: s.avgScore,
          weakestTopic: s.weakestTopic,
          classification: s.classification.label,
        })),
      };
      await exportClassReportToDocx(payload);
      notify(`Đã xuất Báo cáo năng lực lớp ${selectedClass.name} (.docx)`);
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportReportPdf = async () => {
    if (!selectedClass || !reportAreaRef.current) return;
    setIsExporting(true);
    try {
      await exportElementToPdf(
        reportAreaRef.current,
        `Bao_Cao_Nang_Luc_Lop_${selectedClass.name}.pdf`
      );
      notify(`Đã xuất Báo cáo năng lực lớp ${selectedClass.name} (.pdf)`);
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportReportCsv = () => {
    if (!selectedClass) return;
    const headers = [
      'Mã HS',
      'Họ và tên',
      'Lớp',
      'Số bài đã chấm',
      'Điểm gần nhất',
      'Điểm trung bình',
      'Xếp loại',
      'Chủ đề cần củng cố',
    ];
    const rows = studentAnalytics.map((s) => [
      s.student.code,
      s.student.fullName,
      s.student.className,
      s.submissions.length,
      s.latestScore.toFixed(2),
      s.avgScore.toFixed(2),
      s.classification.label,
      s.weakestTopic,
    ]);
    exportRowsToCsv(headers, rows, `Bang_Diem_Nang_Luc_${selectedClass.name}.csv`);
    notify(`Đã xuất Bảng điểm & Năng lực lớp ${selectedClass.name} (.csv)`);
  };

  const maxBucketCount = Math.max(1, ...classSummary.buckets.map((b) => b.count));

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
        <div>
          <h1 className="text-lg font-semibold text-slate-900">
            Thống kê Kết quả Học tập & Báo cáo Năng lực Lớp học
          </h1>
          <p className="text-xs text-slate-500">
            Theo dõi phổ điểm, mức độ đạt từng chủ đề GDPT 2018 của cả lớp và hồ sơ năng lực từng học sinh
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={selectedClassId}
            onChange={(e) => {
              setSelectedClassId(e.target.value);
              setSelectedStudentId(null);
            }}
            className="px-3 py-1.5 text-xs font-medium border border-slate-300 rounded-md bg-white"
          >
            {classes.map((c) => (
              <option key={c.id} value={c.id}>
                Lớp {c.name} — {c.teacherName}
              </option>
            ))}
          </select>

          <button
            onClick={handleExportReportPdf}
            disabled={isExporting}
            className="px-3 py-1.5 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded-md flex items-center gap-1.5 disabled:opacity-50 whitespace-nowrap"
          >
            <Download size={13} />
            Báo cáo PDF
          </button>
          <button
            onClick={handleExportReportDocx}
            disabled={isExporting}
            className="px-3 py-1.5 text-xs font-medium text-white bg-blue-700 hover:bg-blue-800 rounded-md flex items-center gap-1.5 disabled:opacity-50 whitespace-nowrap"
          >
            <FileText size={13} />
            Báo cáo Word (.docx)
          </button>
          <button
            onClick={handleExportReportCsv}
            className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-md flex items-center gap-1.5 whitespace-nowrap"
          >
            <FileSpreadsheet size={13} className="text-emerald-600" />
            Xuất Excel (.csv)
          </button>
        </div>
      </div>

      {/* Main Scrollable Report Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div ref={reportAreaRef} className="max-w-7xl mx-auto space-y-6 bg-[#F8FAFC]">
          {/* KPI Summary Strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200 rounded-lg p-4">
              <div className="text-xs text-slate-500">Sĩ số có kết quả chấm</div>
              <div className="text-2xl font-bold text-slate-900 mt-1 font-mono tabular-nums">
                {classSummary.studentCount}/{classStudents.length} HS
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Lớp {selectedClass?.name}
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-4">
              <div className="text-xs text-slate-500">Điểm trung bình lớp</div>
              <div className="text-2xl font-bold text-blue-700 mt-1 font-mono tabular-nums">
                {classSummary.avgScore.toFixed(2)}
              </div>
              <div className="text-xs text-slate-500 mt-1">Thang điểm 10,00</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-4">
              <div className="text-xs text-slate-500">Tỉ lệ đạt yêu cầu (≥ 5.0)</div>
              <div className="text-2xl font-bold text-emerald-700 mt-1 font-mono tabular-nums">
                {classSummary.passRate.toFixed(1)}%
              </div>
              <div className="text-xs text-slate-500 mt-1">Chuẩn đánh giá chung</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-4">
              <div className="text-xs text-slate-500">Tỉ lệ Khá / Giỏi (≥ 8.0)</div>
              <div className="text-2xl font-bold text-slate-900 mt-1 font-mono tabular-nums">
                {classSummary.goodRate.toFixed(1)}%
              </div>
              <div className="text-xs text-slate-500 mt-1">Nhóm năng lực nổi bật</div>
            </div>
          </div>

          {/* Charts Row: Score Histogram + Topic Competency Matrix */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Score Histogram */}
            <div className="lg:col-span-5 bg-white border border-slate-200 rounded-lg p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                    <BarChart3 size={16} className="text-blue-700" />
                    Phổ điểm lớp {selectedClass?.name}
                  </h2>
                  <span className="text-xs text-slate-500 tabular-nums">
                    {classSummary.studentCount} học sinh
                  </span>
                </div>

                <div className="h-48 flex items-end justify-between gap-3 pt-6 pb-2 border-b border-slate-200">
                  {classSummary.buckets.map((b) => {
                    const heightPct = Math.round((b.count / maxBucketCount) * 100);
                    return (
                      <div key={b.label} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                        <span className="text-xs font-mono font-semibold text-slate-700 tabular-nums">
                          {b.count}
                        </span>
                        <div className="w-full max-w-[40px] bg-slate-100 rounded-t h-32 flex items-end overflow-hidden">
                          <div
                            className="w-full bg-blue-700 rounded-t transition-all"
                            style={{ height: `${b.count === 0 ? 0 : Math.max(8, heightPct)}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-between gap-3 pt-2">
                  {classSummary.buckets.map((b) => (
                    <div
                      key={b.label}
                      className="flex-1 text-center text-[11px] font-mono text-slate-600"
                    >
                      {b.label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Cognitive Level Summary */}
              <div className="mt-5 pt-4 border-t border-slate-100 space-y-2.5">
                <div className="text-xs font-semibold text-slate-800">
                  Mức độ đạt theo cấp độ nhận thức (GDPT 2018)
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {classSummary.levelStats.map((lv) => (
                    <div key={lv.level} className="p-2.5 bg-slate-50 border border-slate-200 rounded-md">
                      <div className="text-[11px] text-slate-500">{lv.level}</div>
                      <div className="text-base font-bold font-mono text-slate-900 tabular-nums mt-0.5">
                        {lv.avgPercent.toFixed(1)}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Topic Competency Table */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-lg overflow-hidden flex flex-col">
              <div className="px-5 py-3.5 border-b border-slate-200 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-900">
                  Báo cáo Năng lực theo Chủ đề Kiến thức
                </h2>
                <span className="text-xs text-slate-500">Sắp xếp theo tỉ lệ đạt tăng dần</span>
              </div>
              <div className="flex-1 overflow-x-auto">
                <table className="w-full text-left text-xs tabular-nums">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
                    <tr>
                      <th className="py-2.5 px-4 font-medium">Chủ đề / Bài học</th>
                      <th className="py-2.5 px-4 font-medium w-24 text-right">Lượt chấm</th>
                      <th className="py-2.5 px-4 font-medium w-44">Tỉ lệ đạt trung bình</th>
                      <th className="py-2.5 px-4 font-medium w-36">Đánh giá lớp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {classSummary.topicStats.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="p-6 text-center text-slate-500">
                          Chưa có dữ liệu chấm bài cho lớp này.
                        </td>
                      </tr>
                    ) : (
                      classSummary.topicStats.map((t) => {
                        const barColor =
                          t.avgPercent >= 80
                            ? 'bg-emerald-600'
                            : t.avgPercent >= 65
                            ? 'bg-blue-600'
                            : 'bg-amber-600';
                        const txtColor =
                          t.avgPercent >= 80
                            ? 'text-emerald-700'
                            : t.avgPercent >= 65
                            ? 'text-blue-700'
                            : 'text-amber-700';
                        return (
                          <tr key={t.topic} className="hover:bg-slate-50">
                            <td className="py-2.5 px-4 font-medium text-slate-800">{t.topic}</td>
                            <td className="py-2.5 px-4 text-right font-mono text-slate-600">
                              {t.attempts}
                            </td>
                            <td className="py-2.5 px-4">
                              <div className="flex items-center gap-2">
                                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full ${barColor}`}
                                    style={{ width: `${Math.min(100, t.avgPercent)}%` }}
                                  />
                                </div>
                                <span className="font-mono font-semibold text-slate-800 w-11 text-right">
                                  {t.avgPercent.toFixed(0)}%
                                </span>
                              </div>
                            </td>
                            <td className={`py-2.5 px-4 font-medium ${txtColor}`}>
                              {t.statusLabel}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Bottom Split: Student Table + Individual Student Competency Detail */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Student List */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-lg overflow-hidden">
              <div className="px-5 py-3.5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-sm font-semibold text-slate-900">
                  Kết quả học tập từng học sinh lớp {selectedClass?.name}
                </h2>
                <div className="relative w-56">
                  <Search
                    size={13}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Tìm tên hoặc mã HS..."
                    className="w-full pl-8 pr-3 py-1 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs tabular-nums">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
                    <tr>
                      <th className="py-2.5 px-4 font-medium">Mã HS</th>
                      <th className="py-2.5 px-4 font-medium">Họ và tên</th>
                      <th className="py-2.5 px-4 font-medium text-right">Điểm TB</th>
                      <th className="py-2.5 px-4 font-medium">Xếp loại</th>
                      <th className="py-2.5 px-4 font-medium">Chủ đề cần củng cố</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredStudentAnalytics.map((item) => {
                      const isActive = activeStudentDetail?.student.id === item.student.id;
                      return (
                        <tr
                          key={item.student.id}
                          onClick={() => setSelectedStudentId(item.student.id)}
                          className={`cursor-pointer transition-colors ${
                            isActive ? 'bg-blue-50' : 'hover:bg-slate-50'
                          }`}
                        >
                          <td className="py-2.5 px-4 font-mono text-slate-500">
                            {item.student.code}
                          </td>
                          <td className="py-2.5 px-4 font-medium text-slate-900">
                            {item.student.fullName}
                          </td>
                          <td className="py-2.5 px-4 text-right font-mono font-semibold text-slate-900">
                            {item.submissions.length > 0 ? item.avgScore.toFixed(2) : '-'}
                          </td>
                          <td className={`py-2.5 px-4 font-medium ${item.classification.colorClass}`}>
                            {item.classification.label}
                          </td>
                          <td className="py-2.5 px-4 text-slate-600 truncate max-w-[200px]">
                            {item.weakestTopic}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Individual Student Competency Profile */}
            <div className="lg:col-span-5 bg-white border border-slate-200 rounded-lg p-5 space-y-4">
              {activeStudentDetail ? (
                <>
                  <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-md bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                        <UserCheck size={18} />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-slate-900">
                          {activeStudentDetail.student.fullName}
                        </h3>
                        <div className="text-xs text-slate-500">
                          {activeStudentDetail.student.code} · Lớp{' '}
                          {activeStudentDetail.student.className} ·{' '}
                          {activeStudentDetail.submissions.length} bài kiểm tra
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[11px] text-slate-500">Điểm TB</div>
                      <div className="text-lg font-bold font-mono text-blue-700 tabular-nums">
                        {activeStudentDetail.submissions.length > 0
                          ? activeStudentDetail.avgScore.toFixed(2)
                          : '-'}
                      </div>
                    </div>
                  </div>

                  {/* Level & Format Breakdown */}
                  <div className="grid grid-cols-3 gap-2">
                    {activeStudentDetail.levelBreakdown.map((lv) => (
                      <div
                        key={lv.level}
                        className="p-2.5 bg-slate-50 border border-slate-200 rounded-md"
                      >
                        <div className="text-[11px] text-slate-500">{lv.level}</div>
                        <div className="text-sm font-bold font-mono text-slate-900 tabular-nums">
                          {lv.percent.toFixed(0)}%
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Topic Mastery List */}
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-slate-800">
                      Mức độ hoàn thành theo chủ đề
                    </div>
                    {activeStudentDetail.topicBreakdown.length === 0 ? (
                      <p className="text-xs text-slate-500">Chưa có dữ liệu bài làm.</p>
                    ) : (
                      <div className="space-y-2">
                        {activeStudentDetail.topicBreakdown.map((tb) => (
                          <div key={tb.topic} className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="text-slate-700 truncate pr-2">{tb.topic}</span>
                              <span className="font-mono font-semibold text-slate-900 tabular-nums">
                                {tb.percent.toFixed(0)}%
                              </span>
                            </div>
                            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className={`h-full ${
                                  tb.percent >= 75
                                    ? 'bg-emerald-600'
                                    : tb.percent >= 50
                                    ? 'bg-blue-600'
                                    : 'bg-red-600'
                                }`}
                                style={{ width: `${Math.min(100, tb.percent)}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Exam History */}
                  {activeStudentDetail.submissions.length > 0 && (
                    <div className="pt-3 border-t border-slate-100 space-y-2">
                      <div className="text-xs font-semibold text-slate-800">
                        Lịch sử bài kiểm tra gần đây
                      </div>
                      <div className="space-y-1.5">
                        {activeStudentDetail.submissions.map((sub) => (
                          <div
                            key={sub.id}
                            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-md flex items-center justify-between text-xs"
                          >
                            <div className="min-w-0 pr-2">
                              <div className="font-medium text-slate-800 truncate">
                                Mã {sub.examCode} — {sub.examTitle}
                              </div>
                              <div className="text-[11px] text-slate-500">{sub.submittedAt}</div>
                            </div>
                            <div className="font-mono font-bold text-blue-700 tabular-nums shrink-0">
                              {sub.normalizedScore10.toFixed(2)} đ
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-xs text-slate-500">Chọn một học sinh để xem hồ sơ chi tiết.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
