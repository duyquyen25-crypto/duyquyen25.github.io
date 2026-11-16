import {
  ClassCurriculumNode,
  ExamPaper,
  ExamQuestionInstance,
  GradedSubmission,
  QuestionGradeDetail,
  SchoolClass,
  Student,
} from '../types/math';
import { TEMPLATE_LIBRARY } from '../engine/templateLibrary';
import {
  G12_B1_MC_TEMPLATES,
  G12_B1_SA_TEMPLATES,
  G12_B1_TF_TEMPLATES,
} from '../engine/grade12Lesson1Templates';
import {
  G12_B2_MC_TEMPLATES,
  G12_B2_SA_TEMPLATES,
  G12_B2_TF_TEMPLATES,
} from '../engine/grade12Lesson2Templates';
import {
  G12_B3_MC_TEMPLATES,
  G12_B3_SA_TEMPLATES,
  G12_B3_TF_TEMPLATES,
} from '../engine/grade12Lesson3Templates';
import {
  G12_B4_MC_TEMPLATES,
  G12_B4_SA_TEMPLATES,
  G12_B4_TF_TEMPLATES,
} from '../engine/grade12Lesson4Templates';
import {
  G12_B5_MC_TEMPLATES,
  G12_B5_SA_TEMPLATES,
  G12_B5_TF_TEMPLATES,
} from '../engine/grade12Lesson5Templates';
import {
  G12_C1_END_SA_TEMPLATES,
  G12_C1_END_TF_TEMPLATES,
} from '../engine/grade12Chapter1EndTemplates';
import {
  G12_B6_MC_TEMPLATES,
  G12_B6_SA_TEMPLATES,
  G12_B6_TF_TEMPLATES,
} from '../engine/grade12Lesson6Templates';
import {
  G12_B7_MC_TEMPLATES,
  G12_B7_SA_TEMPLATES,
  G12_B7_TF_TEMPLATES,
} from '../engine/grade12Lesson7Templates';
import {
  G12_B8_MC_TEMPLATES,
  G12_B8_SA_TEMPLATES,
  G12_B8_TF_TEMPLATES,
} from '../engine/grade12Lesson8Templates';
import {
  G12_B9_MC_TEMPLATES,
  G12_B9_SA_TEMPLATES,
  G12_B9_TF_TEMPLATES,
} from '../engine/grade12Lesson9Templates';
import {
  G12_B10_MC_TEMPLATES,
  G12_B10_SA_TEMPLATES,
  G12_B10_TF_TEMPLATES,
} from '../engine/grade12Lesson10Templates';
import {
  G12_B11_MC_TEMPLATES,
  G12_B11_SA_TEMPLATES,
  G12_B11_TF_TEMPLATES,
} from '../engine/grade12Lesson11Templates';
import {
  G12_B12_MC_TEMPLATES,
  G12_B12_SA_TEMPLATES,
  G12_B12_TF_TEMPLATES,
} from '../engine/grade12Lesson12Templates';
import {
  G12_B13_MC_TEMPLATES,
  G12_B13_SA_TEMPLATES,
  G12_B13_TF_TEMPLATES,
} from '../engine/grade12Lesson13Templates';
import {
  G12_B14_MC_LIST,
  G12_B14_SA_LIST,
  G12_B14_TF_LIST,
} from '../engine/grade12Lesson14Templates';
import {
  G12_B15_MC_LIST,
  G12_B15_SA_LIST,
  G12_B15_TF_LIST,
} from '../engine/grade12Lesson15Templates';
import { G12_B16_SA_LIST } from '../engine/grade12Lesson16Templates';
import {
  G12_B17_MC_LIST,
  G12_B17_SA_LIST,
  G12_B17_TF_LIST,
} from '../engine/grade12Lesson17Templates';
import {
  G12_B18_MC_LIST,
  G12_B18_SA_LIST,
  G12_B18_TF_LIST,
} from '../engine/grade12Lesson18Templates';
import {
  G12_B19_MC_LIST,
  G12_B19_SA_LIST,
  G12_B19_TF_LIST,
} from '../engine/grade12Lesson19Templates';
import {
  G11_B1_MC_LIST,
  G11_B1_TF_LIST,
  G11_B1_SA_LIST,
} from '../engine/grade11Lesson1Templates';
import {
  G11_B2_MC_LIST,
  G11_B2_TF_LIST,
  G11_B2_SA_LIST,
} from '../engine/grade11Lesson2Templates';
import {
  G11_B3_MC_LIST,
  G11_B3_TF_LIST,
  G11_B3_SA_LIST,
} from '../engine/grade11Lesson3Templates';
import { generateValidInstance } from '../engine/templateRunner';
import { createSeededRng } from '../engine/mathUtils';

export const INITIAL_CURRICULUM_TREE: ClassCurriculumNode[] = [
  {
    id: 'l10',
    name: 'Toán 10 (GDPT 2018)',
    type: 'class',
    children: [
      {
        id: 'l10_c1',
        name: 'Chương I. Mệnh đề và tập hợp',
        type: 'chapter',
        children: [
          {
            id: 'l10_c1_b1',
            name: 'Bài 1. Mệnh đề',
            type: 'lesson',
            mathTypes: {
              MC: [TEMPLATE_LIBRARY.t10_b1_proposition_mc],
              TF: [],
              SA: [],
              ES: [],
            },
          },
          {
            id: 'l10_c1_b2',
            name: 'Bài 2. Tập hợp và các phép toán trên tập hợp',
            type: 'lesson',
            mathTypes: {
              MC: [TEMPLATE_LIBRARY.t10_set_intersection],
              TF: [],
              SA: [],
              ES: [],
            },
          },
          {
            id: 'l10_c1_bt',
            name: 'Bài tập cuối chương I',
            type: 'lesson',
            mathTypes: { MC: [], TF: [], SA: [], ES: [] },
          },
        ],
      },
      {
        id: 'l10_c2',
        name: 'Chương II. Bất phương trình và hệ bất phương trình bậc nhất hai ẩn',
        type: 'chapter',
        children: [
          {
            id: 'l10_c2_b3',
            name: 'Bài 3. Bất phương trình bậc nhất hai ẩn',
            type: 'lesson',
            mathTypes: {
              MC: [TEMPLATE_LIBRARY.t10_b3_linear_ineq_2var_mc],
              TF: [],
              SA: [],
              ES: [],
            },
          },
          {
            id: 'l10_c2_b4',
            name: 'Bài 4. Hệ bất phương trình bậc nhất hai ẩn',
            type: 'lesson',
            mathTypes: {
              MC: [],
              TF: [],
              SA: [TEMPLATE_LIBRARY.t10_b4_system_ineq_2var_sa],
              ES: [],
            },
          },
          {
            id: 'l10_c2_bt',
            name: 'Bài tập cuối chương II',
            type: 'lesson',
            mathTypes: { MC: [], TF: [], SA: [], ES: [] },
          },
        ],
      },
      {
        id: 'l10_c3',
        name: 'Chương III. Hệ thức lượng trong tam giác',
        type: 'chapter',
        children: [
          {
            id: 'l10_c3_b5',
            name: 'Bài 5. Giá trị lượng giác của một góc từ 0° đến 180°',
            type: 'lesson',
            mathTypes: {
              MC: [TEMPLATE_LIBRARY.t10_b5_trig_0_180_mc],
              TF: [],
              SA: [],
              ES: [],
            },
          },
          {
            id: 'l10_c3_b6',
            name: 'Bài 6. Hệ thức lượng trong tam giác',
            type: 'lesson',
            mathTypes: {
              MC: [],
              TF: [],
              SA: [],
              ES: [TEMPLATE_LIBRARY.t10_cosine_rule_es],
            },
          },
          {
            id: 'l10_c3_bt',
            name: 'Bài tập cuối chương III',
            type: 'lesson',
            mathTypes: { MC: [], TF: [], SA: [], ES: [] },
          },
        ],
      },
      {
        id: 'l10_c4',
        name: 'Chương IV. Vectơ',
        type: 'chapter',
        children: [
          {
            id: 'l10_c4_b7',
            name: 'Bài 7. Các khái niệm mở đầu',
            type: 'lesson',
            mathTypes: {
              MC: [TEMPLATE_LIBRARY.t10_b7_vector_intro_mc],
              TF: [],
              SA: [],
              ES: [],
            },
          },
          {
            id: 'l10_c4_b8',
            name: 'Bài 8. Tổng và hiệu của hai vectơ',
            type: 'lesson',
            mathTypes: {
              MC: [],
              TF: [],
              SA: [TEMPLATE_LIBRARY.t10_b8_vector_sum_diff_sa],
              ES: [],
            },
          },
          {
            id: 'l10_c4_b9',
            name: 'Bài 9. Tích của một vectơ với một số',
            type: 'lesson',
            mathTypes: {
              MC: [TEMPLATE_LIBRARY.t10_b9_vector_scalar_mc],
              TF: [],
              SA: [],
              ES: [],
            },
          },
          {
            id: 'l10_c4_b10',
            name: 'Bài 10. Vectơ trong mặt phẳng toạ độ',
            type: 'lesson',
            mathTypes: {
              MC: [TEMPLATE_LIBRARY.t10_b10_vector_coord_mc],
              TF: [],
              SA: [],
              ES: [],
            },
          },
          {
            id: 'l10_c4_b11',
            name: 'Bài 11. Tích vô hướng của hai vectơ',
            type: 'lesson',
            mathTypes: {
              MC: [TEMPLATE_LIBRARY.t10_vector_dot_mc],
              TF: [],
              SA: [],
              ES: [],
            },
          },
          {
            id: 'l10_c4_bt',
            name: 'Bài tập cuối chương IV',
            type: 'lesson',
            mathTypes: { MC: [], TF: [], SA: [], ES: [] },
          },
        ],
      },
      {
        id: 'l10_c5',
        name: 'Chương V. Các số đặc trưng của mẫu số liệu không ghép nhóm',
        type: 'chapter',
        children: [
          {
            id: 'l10_c5_b12',
            name: 'Bài 12. Số gần đúng và sai số',
            type: 'lesson',
            mathTypes: {
              MC: [],
              TF: [],
              SA: [TEMPLATE_LIBRARY.t10_b12_approx_error_sa],
              ES: [],
            },
          },
          {
            id: 'l10_c5_b13',
            name: 'Bài 13. Các số đặc trưng đo xu thế trung tâm',
            type: 'lesson',
            mathTypes: {
              MC: [],
              TF: [],
              SA: [TEMPLATE_LIBRARY.t10_b13_central_tendency_sa],
              ES: [],
            },
          },
          {
            id: 'l10_c5_b14',
            name: 'Bài 14. Các số đặc trưng đo độ phân tán',
            type: 'lesson',
            mathTypes: {
              MC: [],
              TF: [],
              SA: [TEMPLATE_LIBRARY.t10_b14_dispersion_sa],
              ES: [],
            },
          },
          {
            id: 'l10_c5_bt',
            name: 'Bài tập cuối chương V',
            type: 'lesson',
            mathTypes: { MC: [], TF: [], SA: [], ES: [] },
          },
        ],
      },
      {
        id: 'l10_c6',
        name: 'Chương VI. Hàm số, đồ thị và ứng dụng',
        type: 'chapter',
        children: [
          {
            id: 'l10_c6_b15',
            name: 'Bài 15. Hàm số',
            type: 'lesson',
            mathTypes: {
              MC: [TEMPLATE_LIBRARY.t10_b15_function_domain_mc],
              TF: [],
              SA: [],
              ES: [],
            },
          },
          {
            id: 'l10_c6_b16',
            name: 'Bài 16. Hàm số bậc hai',
            type: 'lesson',
            mathTypes: {
              MC: [],
              TF: [],
              SA: [TEMPLATE_LIBRARY.t10_parabola_vertex_sa],
              ES: [],
            },
          },
          {
            id: 'l10_c6_b17',
            name: 'Bài 17. Dấu của tam thức bậc hai',
            type: 'lesson',
            mathTypes: {
              MC: [],
              TF: [TEMPLATE_LIBRARY.t10_quad_ineq_tf],
              SA: [],
              ES: [],
            },
          },
          {
            id: 'l10_c6_b18',
            name: 'Bài 18. Phương trình quy về phương trình bậc hai',
            type: 'lesson',
            mathTypes: {
              MC: [],
              TF: [],
              SA: [TEMPLATE_LIBRARY.t10_b18_radical_eq_sa],
              ES: [],
            },
          },
          {
            id: 'l10_c6_bt',
            name: 'Bài tập cuối chương VI',
            type: 'lesson',
            mathTypes: { MC: [], TF: [], SA: [], ES: [] },
          },
        ],
      },
      {
        id: 'l10_c7',
        name: 'Chương VII. Phương pháp toạ độ trong mặt phẳng',
        type: 'chapter',
        children: [
          {
            id: 'l10_c7_b19',
            name: 'Bài 19. Phương trình đường thẳng',
            type: 'lesson',
            mathTypes: {
              MC: [TEMPLATE_LIBRARY.t10_b19_line_eq_mc],
              TF: [],
              SA: [],
              ES: [],
            },
          },
          {
            id: 'l10_c7_b20',
            name: 'Bài 20. Vị trí tương đối giữa hai đường thẳng. Góc và khoảng cách',
            type: 'lesson',
            mathTypes: {
              MC: [TEMPLATE_LIBRARY.t10_b20_line_dist_angle_mc],
              TF: [],
              SA: [],
              ES: [],
            },
          },
          {
            id: 'l10_c7_b21',
            name: 'Bài 21. Đường tròn trong mặt phẳng toạ độ',
            type: 'lesson',
            mathTypes: {
              MC: [TEMPLATE_LIBRARY.t10_b21_circle_eq_mc],
              TF: [],
              SA: [],
              ES: [],
            },
          },
          {
            id: 'l10_c7_b22',
            name: 'Bài 22. Ba đường conic',
            type: 'lesson',
            mathTypes: {
              MC: [TEMPLATE_LIBRARY.t10_b22_conic_ellipse_mc],
              TF: [],
              SA: [],
              ES: [],
            },
          },
          {
            id: 'l10_c7_bt',
            name: 'Bài tập cuối chương VII',
            type: 'lesson',
            mathTypes: { MC: [], TF: [], SA: [], ES: [] },
          },
        ],
      },
      {
        id: 'l10_c8',
        name: 'Chương VIII. Đại số tổ hợp',
        type: 'chapter',
        children: [
          {
            id: 'l10_c8_b23',
            name: 'Bài 23. Quy tắc đếm',
            type: 'lesson',
            mathTypes: {
              MC: [],
              TF: [],
              SA: [TEMPLATE_LIBRARY.t10_b23_counting_rules_sa],
              ES: [],
            },
          },
          {
            id: 'l10_c8_b24',
            name: 'Bài 24. Hoán vị, chỉnh hợp và tổ hợp',
            type: 'lesson',
            mathTypes: {
              MC: [],
              TF: [],
              SA: [TEMPLATE_LIBRARY.t10_b24_comb_perm_sa],
              ES: [],
            },
          },
          {
            id: 'l10_c8_b25',
            name: 'Bài 25. Nhị thức Newton',
            type: 'lesson',
            mathTypes: {
              MC: [TEMPLATE_LIBRARY.t10_b25_newton_binomial_mc],
              TF: [],
              SA: [],
              ES: [],
            },
          },
          {
            id: 'l10_c8_bt',
            name: 'Bài tập cuối chương VIII',
            type: 'lesson',
            mathTypes: { MC: [], TF: [], SA: [], ES: [] },
          },
        ],
      },
      {
        id: 'l10_c9',
        name: 'Chương IX. Tính xác suất theo định nghĩa cổ điển',
        type: 'chapter',
        children: [
          {
            id: 'l10_c9_b26',
            name: 'Bài 26. Biến cố và định nghĩa cổ điển của xác suất',
            type: 'lesson',
            mathTypes: {
              MC: [TEMPLATE_LIBRARY.t10_b26_event_sample_space_mc],
              TF: [],
              SA: [],
              ES: [],
            },
          },
          {
            id: 'l10_c9_b27',
            name: 'Bài 27. Thực hành tính xác suất theo định nghĩa cổ điển',
            type: 'lesson',
            mathTypes: {
              MC: [TEMPLATE_LIBRARY.t10_probability_balls_mc],
              TF: [],
              SA: [],
              ES: [],
            },
          },
          {
            id: 'l10_c9_bt',
            name: 'Bài tập cuối chương IX',
            type: 'lesson',
            mathTypes: { MC: [], TF: [], SA: [], ES: [] },
          },
        ],
      },
    ],
  },
  {
    id: 'l11',
    name: 'Toán 11 (GDPT 2018)',
    type: 'class',
    children: [
      {
        id: 'l11_c1',
        name: 'Chương I. Hàm số lượng giác và phương trình lượng giác',
        type: 'chapter',
        children: [
          {
            id: 'l11_c1_b1',
            name: 'Bài 1. Giá trị lượng giác của góc lượng giác',
            type: 'lesson',
            mathTypes: {
              MC: [TEMPLATE_LIBRARY.t11_trig_deg_to_rad_mc, ...G11_B1_MC_LIST],
              TF: [TEMPLATE_LIBRARY.t11_trig_quadrant_tf, ...G11_B1_TF_LIST],
              SA: [TEMPLATE_LIBRARY.t11_arc_length_sa, ...G11_B1_SA_LIST],
              ES: [],
            },
          },
          {
            id: 'l11_c1_b2',
            name: 'Bài 2. Công thức lượng giác',
            type: 'lesson',
            mathTypes: {
              MC: [TEMPLATE_LIBRARY.t11_b2_trig_formulas_mc, ...G11_B2_MC_LIST],
              TF: [...G11_B2_TF_LIST],
              SA: [...G11_B2_SA_LIST],
              ES: [],
            },
          },
          {
            id: 'l11_c1_b3',
            name: 'Bài 3. Hàm số lượng giác',
            type: 'lesson',
            mathTypes: {
              MC: [TEMPLATE_LIBRARY.t11_b3_trig_func_period_mc, ...G11_B3_MC_LIST],
              TF: [...G11_B3_TF_LIST],
              SA: [...G11_B3_SA_LIST],
              ES: [],
            },
          },
          {
            id: 'l11_c1_b4',
            name: 'Bài 4. Phương trình lượng giác cơ bản',
            type: 'lesson',
            mathTypes: {
              MC: [],
              TF: [],
              SA: [TEMPLATE_LIBRARY.t11_trig_eq_roots_sa],
              ES: [],
            },
          },
          {
            id: 'l11_c1_bt',
            name: 'Bài tập cuối chương I',
            type: 'lesson',
            mathTypes: { MC: [], TF: [], SA: [], ES: [] },
          },
        ],
      },
      {
        id: 'l11_c2',
        name: 'Chương II. Dãy số. Cấp số cộng và cấp số nhân',
        type: 'chapter',
        children: [
          {
            id: 'l11_c2_b5',
            name: 'Bài 5. Dãy số',
            type: 'lesson',
            mathTypes: {
              MC: [TEMPLATE_LIBRARY.t11_b5_sequence_term_mc],
              TF: [],
              SA: [],
              ES: [],
            },
          },
          {
            id: 'l11_c2_b6',
            name: 'Bài 6. Cấp số cộng',
            type: 'lesson',
            mathTypes: {
              MC: [TEMPLATE_LIBRARY.t11_arith_seq_mc],
              TF: [],
              SA: [],
              ES: [],
            },
          },
          {
            id: 'l11_c2_b7',
            name: 'Bài 7. Cấp số nhân',
            type: 'lesson',
            mathTypes: {
              MC: [],
              TF: [],
              SA: [],
              ES: [TEMPLATE_LIBRARY.t11_geom_seq_es],
            },
          },
          {
            id: 'l11_c2_bt',
            name: 'Bài tập cuối chương II',
            type: 'lesson',
            mathTypes: { MC: [], TF: [], SA: [], ES: [] },
          },
        ],
      },
      {
        id: 'l11_c3',
        name: 'Chương III. Các số đặc trưng đo xu thế trung tâm của mẫu số liệu ghép nhóm',
        type: 'chapter',
        children: [
          {
            id: 'l11_c3_b8',
            name: 'Bài 8. Mẫu số liệu ghép nhóm',
            type: 'lesson',
            mathTypes: {
              MC: [TEMPLATE_LIBRARY.t11_b8_grouped_sample_mc],
              TF: [],
              SA: [],
              ES: [],
            },
          },
          {
            id: 'l11_c3_b9',
            name: 'Bài 9. Các số đặc trưng đo xu thế trung tâm',
            type: 'lesson',
            mathTypes: {
              MC: [],
              TF: [],
              SA: [TEMPLATE_LIBRARY.t11_b9_grouped_central_sa],
              ES: [],
            },
          },
          {
            id: 'l11_c3_bt',
            name: 'Bài tập cuối chương III',
            type: 'lesson',
            mathTypes: { MC: [], TF: [], SA: [], ES: [] },
          },
        ],
      },
      {
        id: 'l11_c4',
        name: 'Chương IV. Quan hệ song song trong không gian',
        type: 'chapter',
        children: [
          {
            id: 'l11_c4_b10',
            name: 'Bài 10. Đường thẳng và mặt phẳng trong không gian',
            type: 'lesson',
            mathTypes: {
              MC: [TEMPLATE_LIBRARY.t11_b10_line_plane_space_mc],
              TF: [],
              SA: [],
              ES: [],
            },
          },
          {
            id: 'l11_c4_b11',
            name: 'Bài 11. Hai đường thẳng song song',
            type: 'lesson',
            mathTypes: {
              MC: [TEMPLATE_LIBRARY.t11_b11_two_parallel_lines_mc],
              TF: [],
              SA: [],
              ES: [],
            },
          },
          {
            id: 'l11_c4_b12',
            name: 'Bài 12. Đường thẳng và mặt phẳng song song',
            type: 'lesson',
            mathTypes: {
              MC: [TEMPLATE_LIBRARY.t11_b12_line_parallel_plane_mc],
              TF: [],
              SA: [],
              ES: [],
            },
          },
          {
            id: 'l11_c4_b13',
            name: 'Bài 13. Hai mặt phẳng song song',
            type: 'lesson',
            mathTypes: {
              MC: [],
              TF: [],
              SA: [TEMPLATE_LIBRARY.t11_b13_two_parallel_planes_sa],
              ES: [],
            },
          },
          {
            id: 'l11_c4_b14',
            name: 'Bài 14. Phép chiếu song song',
            type: 'lesson',
            mathTypes: {
              MC: [TEMPLATE_LIBRARY.t11_b14_parallel_projection_mc],
              TF: [],
              SA: [],
              ES: [],
            },
          },
          {
            id: 'l11_c4_bt',
            name: 'Bài tập cuối chương IV',
            type: 'lesson',
            mathTypes: { MC: [], TF: [], SA: [], ES: [] },
          },
        ],
      },
      {
        id: 'l11_c5',
        name: 'Chương V. Giới hạn. Hàm số liên tục',
        type: 'chapter',
        children: [
          {
            id: 'l11_c5_b15',
            name: 'Bài 15. Giới hạn của dãy số',
            type: 'lesson',
            mathTypes: {
              MC: [TEMPLATE_LIBRARY.t11_b15_seq_limit_mc],
              TF: [],
              SA: [],
              ES: [],
            },
          },
          {
            id: 'l11_c5_b16',
            name: 'Bài 16. Giới hạn của hàm số',
            type: 'lesson',
            mathTypes: {
              MC: [TEMPLATE_LIBRARY.t11_limit_zero_over_zero_mc],
              TF: [],
              SA: [],
              ES: [],
            },
          },
          {
            id: 'l11_c5_b17',
            name: 'Bài 17. Hàm số liên tục',
            type: 'lesson',
            mathTypes: {
              MC: [],
              TF: [],
              SA: [TEMPLATE_LIBRARY.t11_b17_continuity_sa],
              ES: [],
            },
          },
          {
            id: 'l11_c5_bt',
            name: 'Bài tập cuối chương V',
            type: 'lesson',
            mathTypes: { MC: [], TF: [], SA: [], ES: [] },
          },
        ],
      },
      {
        id: 'l11_c6',
        name: 'Chương VI. Hàm số mũ và hàm số lôgarit',
        type: 'chapter',
        children: [
          {
            id: 'l11_c6_b18',
            name: 'Bài 18. Luỹ thừa với số mũ thực',
            type: 'lesson',
            mathTypes: {
              MC: [TEMPLATE_LIBRARY.t11_b18_real_exponent_mc],
              TF: [],
              SA: [],
              ES: [],
            },
          },
          {
            id: 'l11_c6_b19',
            name: 'Bài 19. Lôgarit',
            type: 'lesson',
            mathTypes: {
              MC: [TEMPLATE_LIBRARY.t11_b19_logarithm_mc],
              TF: [],
              SA: [],
              ES: [],
            },
          },
          {
            id: 'l11_c6_b20',
            name: 'Bài 20. Hàm số mũ và hàm số lôgarit',
            type: 'lesson',
            mathTypes: {
              MC: [TEMPLATE_LIBRARY.t11_b20_exp_log_func_mc],
              TF: [],
              SA: [],
              ES: [],
            },
          },
          {
            id: 'l11_c6_b21',
            name: 'Bài 21. Phương trình, bất phương trình mũ và lôgarit',
            type: 'lesson',
            mathTypes: {
              MC: [],
              TF: [],
              SA: [TEMPLATE_LIBRARY.t11_log_eq_sa],
              ES: [],
            },
          },
          {
            id: 'l11_c6_bt',
            name: 'Bài tập cuối chương VI',
            type: 'lesson',
            mathTypes: { MC: [], TF: [], SA: [], ES: [] },
          },
        ],
      },
      {
        id: 'l11_c7',
        name: 'Chương VII. Quan hệ vuông góc trong không gian',
        type: 'chapter',
        children: [
          {
            id: 'l11_c7_b22',
            name: 'Bài 22. Hai đường thẳng vuông góc',
            type: 'lesson',
            mathTypes: {
              MC: [TEMPLATE_LIBRARY.t11_b22_two_perp_lines_mc],
              TF: [],
              SA: [],
              ES: [],
            },
          },
          {
            id: 'l11_c7_b23',
            name: 'Bài 23. Đường thẳng vuông góc với mặt phẳng',
            type: 'lesson',
            mathTypes: {
              MC: [TEMPLATE_LIBRARY.t11_b23_line_perp_plane_mc],
              TF: [],
              SA: [],
              ES: [],
            },
          },
          {
            id: 'l11_c7_b24',
            name: 'Bài 24. Phép chiếu vuông góc. Góc giữa đường thẳng và mặt phẳng',
            type: 'lesson',
            mathTypes: {
              MC: [],
              TF: [],
              SA: [TEMPLATE_LIBRARY.t11_b24_angle_line_plane_sa],
              ES: [],
            },
          },
          {
            id: 'l11_c7_b25',
            name: 'Bài 25. Hai mặt phẳng vuông góc',
            type: 'lesson',
            mathTypes: {
              MC: [],
              TF: [],
              SA: [TEMPLATE_LIBRARY.t11_b25_two_perp_planes_sa],
              ES: [],
            },
          },
          {
            id: 'l11_c7_b26',
            name: 'Bài 26. Khoảng cách',
            type: 'lesson',
            mathTypes: {
              MC: [],
              TF: [],
              SA: [TEMPLATE_LIBRARY.t11_b26_distance_space_sa],
              ES: [],
            },
          },
          {
            id: 'l11_c7_b27',
            name: 'Bài 27. Thể tích',
            type: 'lesson',
            mathTypes: {
              MC: [],
              TF: [],
              SA: [TEMPLATE_LIBRARY.t11_b27_volume_space_sa],
              ES: [],
            },
          },
          {
            id: 'l11_c7_bt',
            name: 'Bài tập cuối chương VII',
            type: 'lesson',
            mathTypes: { MC: [], TF: [], SA: [], ES: [] },
          },
        ],
      },
      {
        id: 'l11_c8',
        name: 'Chương VIII. Các quy tắc tính xác suất',
        type: 'chapter',
        children: [
          {
            id: 'l11_c8_b28',
            name: 'Bài 28. Biến cố hợp, biến cố giao, biến cố độc lập',
            type: 'lesson',
            mathTypes: {
              MC: [TEMPLATE_LIBRARY.t11_b28_events_ops_mc],
              TF: [],
              SA: [],
              ES: [],
            },
          },
          {
            id: 'l11_c8_b29',
            name: 'Bài 29. Công thức cộng xác suất',
            type: 'lesson',
            mathTypes: {
              MC: [TEMPLATE_LIBRARY.t11_b29_prob_addition_mc],
              TF: [],
              SA: [],
              ES: [],
            },
          },
          {
            id: 'l11_c8_b30',
            name: 'Bài 30. Công thức nhân xác suất cho hai biến cố độc lập',
            type: 'lesson',
            mathTypes: {
              MC: [],
              TF: [TEMPLATE_LIBRARY.t11_prob_indep_tf],
              SA: [],
              ES: [],
            },
          },
          {
            id: 'l11_c8_bt',
            name: 'Bài tập cuối chương VIII',
            type: 'lesson',
            mathTypes: { MC: [], TF: [], SA: [], ES: [] },
          },
        ],
      },
      {
        id: 'l11_c9',
        name: 'Chương IX. Đạo hàm',
        type: 'chapter',
        children: [
          {
            id: 'l11_c9_b31',
            name: 'Bài 31. Định nghĩa và ý nghĩa của đạo hàm',
            type: 'lesson',
            mathTypes: {
              MC: [TEMPLATE_LIBRARY.t11_tangent_line_mc],
              TF: [],
              SA: [],
              ES: [],
            },
          },
          {
            id: 'l11_c9_b32',
            name: 'Bài 32. Các quy tắc tính đạo hàm',
            type: 'lesson',
            mathTypes: {
              MC: [TEMPLATE_LIBRARY.t11_b32_derivative_rules_mc],
              TF: [],
              SA: [],
              ES: [],
            },
          },
          {
            id: 'l11_c9_b33',
            name: 'Bài 33. Đạo hàm cấp hai',
            type: 'lesson',
            mathTypes: {
              MC: [],
              TF: [],
              SA: [TEMPLATE_LIBRARY.t11_b33_second_derivative_sa],
              ES: [],
            },
          },
          {
            id: 'l11_c9_bt',
            name: 'Bài tập cuối chương IX',
            type: 'lesson',
            mathTypes: { MC: [], TF: [], SA: [], ES: [] },
          },
        ],
      },
    ],
  },
  {
    id: 'l12',
    name: 'Toán 12 (GDPT 2018)',
    type: 'class',
    children: [
      {
        id: 'l12_c1',
        name: 'Chương I. Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số',
        type: 'chapter',
        children: [
          {
            id: 'l12_c1_b1',
            name: 'Bài 1. Tính đơn điệu và cực trị của hàm số',
            type: 'lesson',
            mathTypes: {
              MC: G12_B1_MC_TEMPLATES,
              TF: G12_B1_TF_TEMPLATES,
              SA: G12_B1_SA_TEMPLATES,
              ES: [],
            },
          },
          {
            id: 'l12_c1_b2',
            name: 'Bài 2. Giá trị lớn nhất và giá trị nhỏ nhất của hàm số',
            type: 'lesson',
            mathTypes: {
              MC: G12_B2_MC_TEMPLATES,
              TF: G12_B2_TF_TEMPLATES,
              SA: G12_B2_SA_TEMPLATES,
              ES: [],
            },
          },
          {
            id: 'l12_c1_b3',
            name: 'Bài 3. Đường tiệm cận của đồ thị hàm số',
            type: 'lesson',
            mathTypes: {
              MC: G12_B3_MC_TEMPLATES,
              TF: G12_B3_TF_TEMPLATES,
              SA: G12_B3_SA_TEMPLATES,
              ES: [],
            },
          },
          {
            id: 'l12_c1_b4',
            name: 'Bài 4. Khảo sát sự biến thiên và vẽ đồ thị của hàm số',
            type: 'lesson',
            mathTypes: {
              MC: G12_B4_MC_TEMPLATES,
              TF: G12_B4_TF_TEMPLATES,
              SA: G12_B4_SA_TEMPLATES,
              ES: [],
            },
          },
          {
            id: 'l12_c1_b5',
            name: 'Bài 5. Ứng dụng đạo hàm để giải quyết một số vấn đề liên quan đến thực tiễn',
            type: 'lesson',
            mathTypes: {
              MC: G12_B5_MC_TEMPLATES,
              TF: G12_B5_TF_TEMPLATES,
              SA: G12_B5_SA_TEMPLATES,
              ES: [],
            },
          },
          {
            id: 'l12_c1_bt',
            name: 'Bài tập cuối chương I',
            type: 'lesson',
            mathTypes: {
              MC: [],
              TF: G12_C1_END_TF_TEMPLATES,
              SA: G12_C1_END_SA_TEMPLATES,
              ES: [],
            },
          },
        ],
      },
      {
        id: 'l12_c2',
        name: 'Chương II. Vectơ và hệ trục toạ độ trong không gian',
        type: 'chapter',
        children: [
          {
            id: 'l12_c2_b6',
            name: 'Bài 6. Vectơ trong không gian',
            type: 'lesson',
            mathTypes: {
              MC: [TEMPLATE_LIBRARY.t12_b6_space_vector_mc, ...G12_B6_MC_TEMPLATES],
              TF: G12_B6_TF_TEMPLATES,
              SA: G12_B6_SA_TEMPLATES,
              ES: [],
            },
          },
          {
            id: 'l12_c2_b7',
            name: 'Bài 7. Hệ trục toạ độ trong không gian',
            type: 'lesson',
            mathTypes: {
              MC: [TEMPLATE_LIBRARY.t12_b7_coord_projection_mc, ...G12_B7_MC_TEMPLATES],
              TF: G12_B7_TF_TEMPLATES,
              SA: G12_B7_SA_TEMPLATES,
              ES: [],
            },
          },
          {
            id: 'l12_c2_b8',
            name: 'Bài 8. Biểu thức toạ độ của các phép toán vectơ',
            type: 'lesson',
            mathTypes: {
              MC: G12_B8_MC_TEMPLATES,
              TF: G12_B8_TF_TEMPLATES,
              SA: [TEMPLATE_LIBRARY.t12_b8_vector_ops_sa, ...G12_B8_SA_TEMPLATES],
              ES: [],
            },
          },
          {
            id: 'l12_c2_bt',
            name: 'Bài tập cuối chương II',
            type: 'lesson',
            mathTypes: {
              MC: [],
              TF: [],
              SA: [],
              ES: [],
            },
          },
        ],
      },
      {
        id: 'l12_c3',
        name: 'Chương III. Các số đặc trưng đo mức độ phân tán của mẫu số liệu ghép nhóm',
        type: 'chapter',
        children: [
          {
            id: 'l12_c3_b9',
            name: 'Bài 9. Khoảng biến thiên và khoảng tứ phân vị',
            type: 'lesson',
            mathTypes: {
              MC: G12_B9_MC_TEMPLATES,
              TF: G12_B9_TF_TEMPLATES,
              SA: [TEMPLATE_LIBRARY.t12_b9_range_iqr_sa, ...G12_B9_SA_TEMPLATES],
              ES: [],
            },
          },
          {
            id: 'l12_c3_b10',
            name: 'Bài 10. Phương sai và độ lệch chuẩn',
            type: 'lesson',
            mathTypes: {
              MC: G12_B10_MC_TEMPLATES,
              TF: G12_B10_TF_TEMPLATES,
              SA: [TEMPLATE_LIBRARY.t12_grouped_stats_sa, ...G12_B10_SA_TEMPLATES],
              ES: [],
            },
          },
          {
            id: 'l12_c3_bt',
            name: 'Bài tập cuối chương III',
            type: 'lesson',
            mathTypes: {
              MC: [],
              TF: [],
              SA: [],
              ES: [],
            },
          },
        ],
      },
      {
        id: 'l12_c4',
        name: 'Chương IV. Nguyên hàm và tích phân',
        type: 'chapter',
        children: [
          {
            id: 'l12_c4_b11',
            name: 'Bài 11. Nguyên hàm',
            type: 'lesson',
            mathTypes: {
              MC: [TEMPLATE_LIBRARY.t12_b11_antiderivative_mc, ...G12_B11_MC_TEMPLATES],
              TF: G12_B11_TF_TEMPLATES,
              SA: G12_B11_SA_TEMPLATES,
              ES: [],
            },
          },
          {
            id: 'l12_c4_b12',
            name: 'Bài 12. Tích phân',
            type: 'lesson',
            mathTypes: {
              MC: [TEMPLATE_LIBRARY.t12_integral_poly_mc, ...G12_B12_MC_TEMPLATES],
              TF: [TEMPLATE_LIBRARY.t12_integral_tf, ...G12_B12_TF_TEMPLATES],
              SA: G12_B12_SA_TEMPLATES,
              ES: [],
            },
          },
          {
            id: 'l12_c4_b13',
            name: 'Bài 13. Ứng dụng hình học của tích phân',
            type: 'lesson',
            mathTypes: {
              MC: G12_B13_MC_TEMPLATES,
              TF: G12_B13_TF_TEMPLATES,
              SA: [TEMPLATE_LIBRARY.t12_integral_area_sa, ...G12_B13_SA_TEMPLATES],
              ES: [],
            },
          },
          {
            id: 'l12_c4_bt',
            name: 'Bài tập cuối chương IV',
            type: 'lesson',
            mathTypes: {
              MC: [],
              TF: [],
              SA: [],
              ES: [],
            },
          },
        ],
      },
      {
        id: 'l12_c5',
        name: 'Chương V. Phương pháp toạ độ trong không gian',
        type: 'chapter',
        children: [
          {
            id: 'l12_c5_b14',
            name: 'Bài 14. Phương trình mặt phẳng',
            type: 'lesson',
            mathTypes: {
              MC: [TEMPLATE_LIBRARY.t12_oxyz_dist_point_plane_mc, ...G12_B14_MC_LIST],
              TF: G12_B14_TF_LIST,
              SA: G12_B14_SA_LIST,
              ES: [TEMPLATE_LIBRARY.t12_oxyz_plane_3pts_es],
            },
          },
          {
            id: 'l12_c5_b15',
            name: 'Bài 15. Phương trình đường thẳng trong không gian',
            type: 'lesson',
            mathTypes: {
              MC: [TEMPLATE_LIBRARY.t12_b15_line_eq_mc, ...G12_B15_MC_LIST],
              TF: G12_B15_TF_LIST,
              SA: G12_B15_SA_LIST,
              ES: [],
            },
          },
          {
            id: 'l12_c5_b16',
            name: 'Bài 16. Công thức tính góc trong không gian',
            type: 'lesson',
            mathTypes: {
              MC: [],
              TF: [],
              SA: [TEMPLATE_LIBRARY.t12_b16_angle_space_sa, ...G12_B16_SA_LIST],
              ES: [],
            },
          },
          {
            id: 'l12_c5_b17',
            name: 'Bài 17. Phương trình mặt cầu',
            type: 'lesson',
            mathTypes: {
              MC: [TEMPLATE_LIBRARY.t12_b17_sphere_eq_mc, ...G12_B17_MC_LIST],
              TF: G12_B17_TF_LIST,
              SA: G12_B17_SA_LIST,
              ES: [],
            },
          },
          {
            id: 'l12_c5_bt',
            name: 'Bài tập cuối chương V',
            type: 'lesson',
            mathTypes: {
              MC: [],
              TF: [],
              SA: [],
              ES: [],
            },
          },
        ],
      },
      {
        id: 'l12_c6',
        name: 'Chương VI. Xác suất có điều kiện',
        type: 'chapter',
        children: [
          {
            id: 'l12_c6_b18',
            name: 'Bài 18. Xác suất có điều kiện',
            type: 'lesson',
            mathTypes: {
              MC: [TEMPLATE_LIBRARY.t12_b18_cond_prob_mc, ...G12_B18_MC_LIST],
              TF: G12_B18_TF_LIST,
              SA: G12_B18_SA_LIST,
              ES: [],
            },
          },
          {
            id: 'l12_c6_b19',
            name: 'Bài 19. Công thức xác suất toàn phần và công thức Bayes',
            type: 'lesson',
            mathTypes: {
              MC: G12_B19_MC_LIST,
              TF: G12_B19_TF_LIST,
              SA: [TEMPLATE_LIBRARY.t12_cond_prob_bayes_sa, ...G12_B19_SA_LIST],
              ES: [],
            },
          },
          {
            id: 'l12_c6_bt',
            name: 'Bài tập cuối chương VI',
            type: 'lesson',
            mathTypes: {
              MC: [],
              TF: [],
              SA: [],
              ES: [],
            },
          },
        ],
      },
    ],
  },
];

export const INITIAL_CLASSES: SchoolClass[] = [
  { id: 'cls_12a1', name: '12A1', grade: '12', teacherName: 'Thầy Nguyễn Minh Tuấn' },
  { id: 'cls_11a2', name: '11A2', grade: '11', teacherName: 'Cô Trần Thị Thu Hà' },
  { id: 'cls_10a1', name: '10A1', grade: '10', teacherName: 'Thầy Lê Hoàng Nam' },
];

export const INITIAL_STUDENTS: Student[] = [
  { id: 'st_12_01', code: 'HS1201', fullName: 'Nguyễn Ngọc Bảo An', classId: 'cls_12a1', className: '12A1' },
  { id: 'st_12_02', code: 'HS1202', fullName: 'Trần Hoàng Minh Khôi', classId: 'cls_12a1', className: '12A1' },
  { id: 'st_12_03', code: 'HS1203', fullName: 'Lê Thảo Nguyên', classId: 'cls_12a1', className: '12A1' },
  { id: 'st_12_04', code: 'HS1204', fullName: 'Phạm Quốc Bảo', classId: 'cls_12a1', className: '12A1' },
  { id: 'st_12_05', code: 'HS1205', fullName: 'Võ Thị Khánh Linh', classId: 'cls_12a1', className: '12A1' },
  { id: 'st_12_06', code: 'HS1206', fullName: 'Đặng Gia Huy', classId: 'cls_12a1', className: '12A1' },
  { id: 'st_12_07', code: 'HS1207', fullName: 'Bùi Phương Anh', classId: 'cls_12a1', className: '12A1' },
  { id: 'st_12_08', code: 'HS1208', fullName: 'Hoàng Đức Anh', classId: 'cls_12a1', className: '12A1' },
  { id: 'st_12_09', code: 'HS1209', fullName: 'Ngô Minh Thư', classId: 'cls_12a1', className: '12A1' },
  { id: 'st_12_10', code: 'HS1210', fullName: 'Đỗ Tiến Đạt', classId: 'cls_12a1', className: '12A1' },

  { id: 'st_11_01', code: 'HS1101', fullName: 'Trịnh Bảo Trâm', classId: 'cls_11a2', className: '11A2' },
  { id: 'st_11_02', code: 'HS1102', fullName: 'Phan Thanh Tùng', classId: 'cls_11a2', className: '11A2' },
  { id: 'st_11_03', code: 'HS1103', fullName: 'Vũ Hà My', classId: 'cls_11a2', className: '11A2' },
  { id: 'st_11_04', code: 'HS1104', fullName: 'Nguyễn Quang Vinh', classId: 'cls_11a2', className: '11A2' },
  { id: 'st_11_05', code: 'HS1105', fullName: 'Lý Gia Bảo', classId: 'cls_11a2', className: '11A2' },
  { id: 'st_11_06', code: 'HS1106', fullName: 'Đinh Ngọc Mai', classId: 'cls_11a2', className: '11A2' },

  { id: 'st_10_01', code: 'HS1001', fullName: 'Cao Hải Đăng', classId: 'cls_10a1', className: '10A1' },
  { id: 'st_10_02', code: 'HS1002', fullName: 'Tạ Phương Linh', classId: 'cls_10a1', className: '10A1' },
  { id: 'st_10_03', code: 'HS1003', fullName: 'Dương Minh Quân', classId: 'cls_10a1', className: '10A1' },
  { id: 'st_10_04', code: 'HS1004', fullName: 'Chu Quỳnh Chi', classId: 'cls_10a1', className: '10A1' },
  { id: 'st_10_05', code: 'HS1005', fullName: 'Mai Anh Khoa', classId: 'cls_10a1', className: '10A1' },
  { id: 'st_10_06', code: 'HS1006', fullName: 'Hồ Thiên Ân', classId: 'cls_10a1', className: '10A1' },
];

export function buildSampleExamsFromTree(tree: ClassCurriculumNode[]): ExamPaper[] {
  const specs: Array<{
    id: string;
    code: string;
    title: string;
    gradeLabel: string;
    classIdPrefix: string;
    seedBase: number;
  }> = [
    {
      id: 'exam_12_gk2',
      code: '121',
      title: 'Kiểm tra Giữa học kỳ II — Toán 12 (GDPT 2018)',
      gradeLabel: 'Lớp 12',
      classIdPrefix: 'l12',
      seedBase: 1201,
    },
    {
      id: 'exam_11_hk1',
      code: '111',
      title: 'Kiểm tra Định kỳ — Toán 11 (GDPT 2018)',
      gradeLabel: 'Lớp 11',
      classIdPrefix: 'l11',
      seedBase: 1101,
    },
    {
      id: 'exam_10_hk1',
      code: '101',
      title: 'Kiểm tra Chuyên đề — Toán 10 (GDPT 2018)',
      gradeLabel: 'Lớp 10',
      classIdPrefix: 'l10',
      seedBase: 1001,
    },
  ];

  return specs.map((spec) => {
    const cls = tree.find((c) => c.id === spec.classIdPrefix);
    const questions: ExamQuestionInstance[] = [];
    let order = 1;
    let totalPoints = 0;

    if (cls) {
      for (const chap of cls.children) {
        for (const lesson of chap.children) {
          (['MC', 'TF', 'SA', 'ES'] as const).forEach((cat) => {
            const tpls =
              lesson.id === 'l11_c1_b1' ||
              lesson.id === 'l11_c1_b2' ||
              lesson.id === 'l11_c1_b3' ||
              lesson.id === 'l12_c1_b1' ||
              lesson.id === 'l12_c1_b2' ||
              lesson.id === 'l12_c1_b3' ||
              lesson.id === 'l12_c1_b4' ||
              lesson.id === 'l12_c1_b5' ||
              lesson.id === 'l12_c1_bt' ||
              lesson.id === 'l12_c2_b6' ||
              lesson.id === 'l12_c2_b7' ||
              lesson.id === 'l12_c2_b8' ||
              lesson.id === 'l12_c3_b9' ||
              lesson.id === 'l12_c3_b10' ||
              lesson.id === 'l12_c4_b11' ||
              lesson.id === 'l12_c4_b12' ||
              lesson.id === 'l12_c4_b13' ||
              lesson.id === 'l12_c5_b14' ||
              lesson.id === 'l12_c5_b15' ||
              lesson.id === 'l12_c5_b16' ||
              lesson.id === 'l12_c5_b17' ||
              lesson.id === 'l12_c6_b18' ||
              lesson.id === 'l12_c6_b19'
                ? lesson.mathTypes[cat].slice(0, cat === 'MC' ? 2 : 1)
                : lesson.mathTypes[cat];
            for (const tpl of tpls) {
              const { content } = generateValidInstance(tpl, spec.seedBase + order * 97);
              const pts = cat === 'MC' ? 0.25 : cat === 'TF' ? 1.0 : cat === 'SA' ? 0.5 : 1.5;
              totalPoints += pts;
              questions.push({
                instanceId: `${spec.id}_q${order}`,
                order,
                templateId: tpl.id,
                templateName: tpl.name,
                lessonId: lesson.id,
                lessonName: lesson.name,
                chapterName: chap.name,
                className: cls.name,
                category: cat,
                level: tpl.level,
                points: pts,
                content,
              });
              order++;
            }
          });
        }
      }
    }

    return {
      id: spec.id,
      code: spec.code,
      title: spec.title,
      schoolName: 'Trường THPT Chuyên Khoa Học Tự Nhiên',
      subject: 'Toán học',
      gradeLabel: spec.gradeLabel,
      durationMinutes: 60,
      createdAt: '2026-11-10',
      questions,
      totalPoints: Number(totalPoints.toFixed(2)),
    };
  });
}

export function buildInitialSubmissions(
  exams: ExamPaper[],
  students: Student[]
): GradedSubmission[] {
  const rng = createSeededRng(20261113);
  const submissions: GradedSubmission[] = [];

  const gradeMap: Record<string, string> = {
    cls_12a1: 'exam_12_gk2',
    cls_11a2: 'exam_11_hk1',
    cls_10a1: 'exam_10_hk1',
  };

  // Assign varying student mastery baselines so analytics charts reflect realistic spread
  const studentProfiles = [0.92, 0.85, 0.78, 0.64, 0.52, 0.88, 0.71, 0.45, 0.82, 0.6];

  students.forEach((student, sIdx) => {
    const exam = exams.find((e) => e.id === gradeMap[student.classId]);
    if (!exam) return;
    const mastery = studentProfiles[sIdx % studentProfiles.length];

    let totalScore = 0;
    const details: QuestionGradeDetail[] = exam.questions.map((q) => {
      const levelPenalty = q.level === 'Biết' ? 0.1 : q.level === 'Hiểu' ? 0 : -0.15;
      const prob = Math.min(0.96, Math.max(0.2, mastery + levelPenalty));
      let earned = 0;
      let studentAns = '';
      let isCorrect = false;

      if (q.category === 'MC') {
        const hit = rng() < prob;
        isCorrect = hit;
        earned = hit ? q.points : 0;
        const chosenIdx = hit
          ? q.content.correctIndex ?? 0
          : ((q.content.correctIndex ?? 0) + 1 + Math.floor(rng() * 3)) % 4;
        studentAns = String.fromCharCode(65 + chosenIdx);
      } else if (q.category === 'TF') {
        let correctParts = 0;
        const chosenFlags = (q.content.tfStatements || []).map((st) => {
          const hit = rng() < prob;
          if (hit) correctParts++;
          return `${st.key}:${(hit ? st.isTrue : !st.isTrue) ? 'Đ' : 'S'}`;
        });
        const factor =
          correctParts === 4 ? 1 : correctParts === 3 ? 0.5 : correctParts === 2 ? 0.25 : correctParts === 1 ? 0.1 : 0;
        earned = Number((q.points * factor).toFixed(2));
        isCorrect = correctParts === 4;
        studentAns = chosenFlags.join(', ');
      } else if (q.category === 'SA') {
        const hit = rng() < prob - 0.05;
        isCorrect = hit;
        earned = hit ? q.points : 0;
        studentAns = hit ? q.content.shortAnswer || '0' : 'Không khớp';
      } else {
        const ratio = rng() < prob ? (rng() < 0.65 ? 1 : 0.7) : 0.3;
        earned = Number((q.points * ratio).toFixed(2));
        isCorrect = ratio >= 0.99;
        studentAns = `Đạt ${Math.round(ratio * 100)}% biểu điểm`;
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
        studentAnswerDisplay: studentAns,
        correctAnswerDisplay:
          q.category === 'MC'
            ? String.fromCharCode(65 + (q.content.correctIndex ?? 0))
            : q.content.answerSummary,
      };
    });

    const normalizedScore10 =
      exam.totalPoints > 0 ? Number(((totalScore / exam.totalPoints) * 10).toFixed(2)) : 0;

    submissions.push({
      id: `sub_init_${student.id}`,
      examId: exam.id,
      examCode: exam.code,
      examTitle: exam.title,
      studentId: student.id,
      studentName: student.fullName,
      studentCode: student.code,
      classId: student.classId,
      className: student.className,
      submittedAt: '2026-11-11 14:30',
      totalScore: Number(totalScore.toFixed(2)),
      maxScore: exam.totalPoints,
      normalizedScore10,
      details,
    });
  });

  return submissions;
}
