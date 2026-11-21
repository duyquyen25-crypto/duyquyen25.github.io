export type QuestionCategory = 'MC' | 'TF' | 'SA' | 'ES';
export type CognitiveLevel = 'Biết' | 'Hiểu' | 'Vận dụng';

export interface ParamSpec {
  name: string;
  label: string;
  min: number;
  max: number;
  step?: number;
  allowZero?: boolean;
}

export interface TFStatement {
  key: 'a' | 'b' | 'c' | 'd';
  text: string;
  isTrue: boolean;
  diagram?: QuestionDiagramSpec;
}

export interface RubricStep {
  description: string;
  points: number;
}

export interface VariationTableYNodeSingle {
  kind: 'single';
  pos: 'top' | 'mid' | 'bot';
  value: string;
}

export interface VariationTableYNodeAsymptote {
  kind: 'asymptote';
  leftPos: 'top' | 'bot';
  leftVal: string;
  rightPos: 'top' | 'bot';
  rightVal: string;
}

export type VariationTableYNode = VariationTableYNodeSingle | VariationTableYNodeAsymptote;

export type DerivTableToken =
  | { type: 'sign'; value: '+' | '-' | 'hatched' }
  | { type: 'node'; kind: '0' | 'd' | 'z' };

export interface VariationTableDiagram {
  kind: 'variation_table';
  derivLabel: string;
  funcLabel?: string;
  xNodes: string[];
  derivTokens: DerivTableToken[];
  yNodes?: VariationTableYNode[];
}

export interface FunctionPlotDiagram {
  kind: 'function_plot';
  curveType: 'cubic' | 'rational_2_1' | 'polyline';
  /** cubic: [a, b, c, d]; rational_2_1: [a, b, c, d, e]; polyline: unused (uses points) */
  coeffs: number[];
  /** Polyline vertices [[x1, y1], [x2, y2], ...] */
  points?: Array<[number, number]>;
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  xTicks: number[];
  yTicks: number[];
  curveLabel?: string;
  strokeColor?: string;
  verticalAsymptote?: number;
  obliqueAsymptote?: { m: number; q: number };
  highlightPoints?: Array<{ x: number; y: number; label?: string }>;
}

export interface GeometryFigureDiagram {
  kind: 'geometry_figure';
  figureType:
    | 'semicircle_rect'
    | 'box_cut'
    | 'river_bridge'
    | 'square_box_cut'
    | 'hexagon_pyramid_cut'
    | 'lantern_frame'
    | 'shore_island_path'
    | 'power_island_path'
    | 'rect_pool_path'
    | 'two_poles_wire'
    | 'trapezoid_square'
    | 'semicircle_boat_path'
    | 'ladder_wall_prop'
    | 'parabola_pond_bridge'
    | 'box_3d'
    | 'reg_tetra_3d'
    | 'pyramid_perp_base_3d'
    | 'lamp_3cables_3d'
    | 'crane_car_frame_3d'
    | 'chandelier_4chains_3d'
    | 'three_perp_forces_3d'
    | 'cuboid_axes_vertex_3d'
    | 'cube_axes_center_3d'
    | 'airport_plane_3d'
    | 'atc_radar_tower_3d'
    | 'grid_points_cone_3d'
    | 'cuboid_OABC_3d'
    | 'two_drones_3d'
    | 'kingfisher_fish_3d'
    | 'plane_flight_path_3d'
    | 'l13_signed_area_plot'
    | 'l13_two_parabolas_area'
    | 'l13_parabola_line_area'
    | 'l13_curved_triangle'
    | 'l13_two_curves_H'
    | 'l13_frustum_tank'
    | 'l13_circle_two_parabolas'
    | 'l13_parabolic_gate_2cords'
    | 'l13_square_4parabolas_cut'
    | 'l13_square_4petals'
    | 'l13_double_parabola_arch'
    | 'l13_rect_inscribed_parabola'
    | 'l13_rect_two_side_parabolas'
    | 'l13_ellipse_two_parabolas'
    | 'l13_vase_profile'
    | 'l14_stadium_frustum_3d'
    | 'l14_trapezoid_yard_2d'
    | 'l14_camera_cone_3d'
    | 'l14_museum_box_pane_3d'
    | 'l15_signal_line_3d'
    | 'l15_cube_two_ants_3d'
    | 'l17_earth_tangent_orbit_3d'
    | 'l11_b1_unit_circle_point'
    | 'l11_b1_unit_circle_axes'
    | 'l11_b1_unit_circle_quad_sym'
    | 'l11_b10_tetra_3d'
    | 'l11_b10_para_pyramid_3d'
    | 'l11_b10_quad_pyramid_3d'
    | 'l11_b13_prism_3d'
    | 'l11_b15_nested_squares'
    | 'l11_b15_nested_triangles'
    | 'l11_b15_nested_circles'
    | 'l11_b20_exp_log_plot';
  params: Record<string, number>;
  labels?: Record<string, string>;
}

export interface FrequencyTableDiagram {
  kind: 'frequency_table';
  row1Label: string;
  row2Label: string;
  intervals: string[];
  frequencies: Array<number | string>;
  extraRows?: Array<{ label: string; values: Array<number | string> }>;
}

export interface ProbTreeDiagram {
  kind: 'prob_tree';
  event1: string;
  event2: string;
  p1?: string;
  p1Comp?: string;
  p2Given1?: string;
  p2CompGiven1?: string;
  p2Given1Comp?: string;
  p2CompGiven1Comp?: string;
}

export type QuestionDiagramSpec =
  | VariationTableDiagram
  | FunctionPlotDiagram
  | GeometryFigureDiagram
  | FrequencyTableDiagram
  | ProbTreeDiagram;

export interface GeneratedQuestionContent {
  stem: string;
  /** Optional visual diagram (Bảng biến thiên / Bảng xét dấu / Đồ thị hàm số) */
  diagram?: QuestionDiagramSpec;
  /** For MC: 4 distinct option strings (can include $...$ LaTeX) */
  options?: string[];
  /** Index 0..3 of the correct option for MC */
  correctIndex?: number;
  /** For TF: 4 statements a, b, c, d */
  tfStatements?: TFStatement[];
  /** For SA: normalized answer string and numeric value if applicable */
  shortAnswer?: string;
  numericValue?: number;
  /** For ES: step-by-step rubric */
  rubric?: RubricStep[];
  /** Human-readable canonical answer summary */
  answerSummary: string;
  /** Step-by-step solution explanation with LaTeX */
  solutionSteps: string[];
  /** Concrete parameter values used */
  params: Record<string, number>;
}

export interface BoundaryTestCase {
  label: string;
  params: Record<string, number>;
  expectedValid: boolean;
}

export interface MathTemplate {
  id: string;
  name: string;
  category: QuestionCategory;
  level: CognitiveLevel;
  topicTag: string;
  description: string;
  conditionSummary: string;
  paramSpecs: ParamSpec[];
  /** JS function body receiving (params) => { valid: boolean, reason?: string } */
  validateCode: string;
  /** JS function body receiving (params, u) => GeneratedQuestionContent */
  generateCode: string;
  boundaryCases: BoundaryTestCase[];
}

export interface LessonNode {
  id: string;
  name: string;
  type: 'lesson';
  mathTypes: Record<QuestionCategory, MathTemplate[]>;
}

export interface ChapterNode {
  id: string;
  name: string;
  type: 'chapter';
  children: LessonNode[];
}

export interface ClassCurriculumNode {
  id: string;
  name: string;
  type: 'class';
  children: ChapterNode[];
}

export interface StressTestItemResult {
  id: string;
  label: string;
  kind: 'boundary' | 'random';
  params: Record<string, number>;
  valid: boolean;
  reason?: string;
  passedInvariant: boolean;
  invariantErrors: string[];
  sampleStem?: string;
  sampleAnswer?: string;
}

export interface StressTestReport {
  templateId: string;
  totalRandomTrials: number;
  validRandomGenerated: number;
  rejectedInvalidRandom: number;
  boundaryResults: StressTestItemResult[];
  invariantFailures: StressTestItemResult[];
  passedAll: boolean;
  executedAt: string;
}

export interface ExamQuestionInstance {
  instanceId: string;
  order: number;
  templateId: string;
  templateName: string;
  lessonId: string;
  lessonName: string;
  chapterName: string;
  className: string;
  category: QuestionCategory;
  level: CognitiveLevel;
  points: number;
  content: GeneratedQuestionContent;
}

export interface ExamPaper {
  id: string;
  code: string; // e.g., "101", "102"
  title: string;
  departmentName?: string;
  schoolLevel?: string;
  schoolName: string;
  groupName?: string;
  schoolYear?: string;
  subject: string;
  subjectLabel?: string;
  gradeLabel: string;
  durationMinutes: number;
  createdAt: string;
  questions: ExamQuestionInstance[];
  totalPoints: number;
}

export interface ExamMatrixCellConfig {
  templateId: string;
  count: number;
}

export interface Student {
  id: string;
  code: string;
  fullName: string;
  classId: string;
  className: string;
}

export interface SchoolClass {
  id: string;
  name: string;
  grade: '10' | '11' | '12';
  teacherName: string;
}

export interface QuestionGradeDetail {
  instanceId: string;
  templateId: string;
  templateName: string;
  chapterName: string;
  lessonName: string;
  category: QuestionCategory;
  level: CognitiveLevel;
  maxPoints: number;
  earnedPoints: number;
  isCorrect: boolean;
  studentAnswerDisplay: string;
  correctAnswerDisplay: string;
}

export interface GradedSubmission {
  id: string;
  examId: string;
  examCode: string;
  examTitle: string;
  studentId: string;
  studentName: string;
  studentCode: string;
  classId: string;
  className: string;
  submittedAt: string;
  totalScore: number;
  maxScore: number;
  normalizedScore10: number;
  details: QuestionGradeDetail[];
}
