
import { GlucoseRecord } from './types';

export const rawData: GlucoseRecord[] = [
  // 第一针周期 2025/10/6 - 2025/10/13
  { date: '2025/10/06', time: '19:00', value: 18, label: '第一针', isInjection: true, injectionDose: 20, injectionIndex: 1 },
  { date: '2025/10/06', time: '21:00', value: 17.4, label: '针2', isInjection: false },
  { date: '2025/10/06', time: '23:00', value: 19.3, label: '针4', isInjection: false },
  { date: '2025/10/07', time: '01:00', value: 15.6, label: '针6', isInjection: false },
  { date: '2025/10/07', time: '03:00', value: 16.5, label: '针8', isInjection: false },
  { date: '2025/10/07', time: '07:00', value: 17.2, label: '针12', isInjection: false },
  { date: '2025/10/07', time: '11:00', value: 17.5, label: '针16', isInjection: false },
  { date: '2025/10/07', time: '15:00', value: 18.7, label: '补10', isInjection: false }, // 这是一个补针，不算新周期
  { date: '2025/10/07', time: '19:00', value: 13.9, label: '针24', isInjection: false },
  { date: '2025/10/08', time: '03:00', value: 5.0, label: '针32', isInjection: false },
  { date: '2025/10/08', time: '15:00', value: 5.1, label: '针44', isInjection: false },
  { date: '2025/10/08', time: '19:00', value: 3.5, label: '针48', isInjection: false },
  { date: '2025/10/09', time: '03:00', value: 4.8, label: '针56', isInjection: false },
  { date: '2025/10/09', time: '07:00', value: 2.5, label: '针60', isInjection: false },
  { date: '2025/10/10', time: '12:00', value: 2.9, label: '针89', isInjection: false },
  { date: '2025/10/11', time: '15:00', value: 3.1, label: '针116', isInjection: false },
  { date: '2025/10/12', time: '23:00', value: 10.9, label: '针148', isInjection: false },
  { date: '2025/10/13', time: '14:00', value: 12.9, label: '针163', isInjection: false },

  // 第二针周期 2025/10/13 - 2025/10/21
  { date: '2025/10/13', time: '19:00', value: 16.6, label: '第二针', isInjection: true, injectionDose: 28, injectionIndex: 2 },
  { date: '2025/10/14', time: '07:00', value: 2.3, label: '针12', isInjection: false },
  { date: '2025/10/14', time: '15:00', value: 3.2, label: '针20', isInjection: false },
  { date: '2025/10/15', time: '04:00', value: 2.0, label: '针33', isInjection: false },
  { date: '2025/10/15', time: '19:00', value: 2.7, label: '针48', isInjection: false },
  { date: '2025/10/16', time: '18:30', value: 3.0, label: '针71.5', isInjection: false },
  { date: '2025/10/17', time: '12:00', value: 2.5, label: '针89', isInjection: false },
  { date: '2025/10/18', time: '16:00', value: 4.4, label: '针117', isInjection: false },
  { date: '2025/10/20', time: '00:00', value: 6.6, label: '针149', isInjection: false },
  { date: '2025/10/20', time: '22:00', value: 7.5, label: '针171', isInjection: false },

  // 第三针周期 2025/10/21 - 2025/10/29
  { date: '2025/10/21', time: '19:00', value: 12, label: '第三针', isInjection: true, injectionDose: 26, injectionIndex: 3 },
  { date: '2025/10/22', time: '07:00', value: 2.3, label: '针12', isInjection: false },
  { date: '2025/10/22', time: '19:00', value: 2.0, label: '针24', isInjection: false },
  { date: '2025/10/23', time: '00:00', value: 3.0, label: '针29', isInjection: false },
  { date: '2025/10/24', time: '07:00', value: 3.1, label: '针60', isInjection: false },
  { date: '2025/10/26', time: '19:00', value: 2.9, label: '针120', isInjection: false },
  { date: '2025/10/28', time: '07:00', value: 2.8, label: '针156', isInjection: false },

  // 第四针周期 2025/10/29 - 2025/11/05
  { date: '2025/10/29', time: '19:00', value: 12.8, label: '第四针', isInjection: true, injectionDose: 26, injectionIndex: 4 },
  { date: '2025/10/30', time: '07:00', value: 3.6, label: '针12', isInjection: false },
  { date: '2025/10/31', time: '20:00', value: 2.3, label: '针49', isInjection: false },
  { date: '2025/11/02', time: '12:00', value: 4.2, label: '针89', isInjection: false },
  { date: '2025/11/04', time: '01:00', value: 4.3, label: '针126', isInjection: false },

  // 第五针周期 2025/11/05 - 2025/11/13
  { date: '2025/11/05', time: '20:00', value: 11.2, label: '第五针', isInjection: true, injectionDose: 26, injectionIndex: 5 },
  { date: '2025/11/06', time: '18:00', value: 3.0, label: '针22', isInjection: false },
  { date: '2025/11/07', time: '19:00', value: 2.4, label: '针47', isInjection: false },
  { date: '2025/11/10', time: '20:00', value: 7.0, label: '针120', isInjection: false },
  { date: '2025/11/12', time: '19:00', value: 7.3, label: '针167', isInjection: false },

  // 第六针周期 2025/11/13 - 2025/11/21
  { date: '2025/11/13', time: '19:00', value: 16.3, label: '第六针', isInjection: true, injectionDose: 24.5, injectionIndex: 6 },
  { date: '2025/11/14', time: '20:30', value: 4.0, label: '针25.5', isInjection: false },
  { date: '2025/11/16', time: '19:00', value: 3.5, label: '针72', isInjection: false },
  { date: '2025/11/18', time: '20:00', value: 8.3, label: '针121', isInjection: false },
  { date: '2025/11/20', time: '19:00', value: 8.8, label: '针168', isInjection: false },

  // 第七针周期 2025/11/21 - 2025/11/29
  { date: '2025/11/21', time: '19:00', value: 15.0, label: '第七针', isInjection: true, injectionDose: 24.5, injectionIndex: 7 },
  { date: '2025/11/22', time: '19:00', value: 2.5, label: '针24', isInjection: false },
  { date: '2025/11/24', time: '21:00', value: 4.5, label: '针74', isInjection: false },
  { date: '2025/11/26', time: '20:00', value: 5.7, label: '针121', isInjection: false },
  { date: '2025/11/28', time: '19:00', value: 8.1, label: '针168', isInjection: false },

  // 第八针周期 2025/11/29 - 2025/12/07
  { date: '2025/11/29', time: '19:00', value: 14.1, label: '第八针', isInjection: true, injectionDose: 24.5, injectionIndex: 8 },
  { date: '2025/11/30', time: '17:15', value: 3.4, label: '针22', isInjection: false },
  { date: '2025/12/02', time: '19:00', value: 3.6, label: '针72', isInjection: false },
  { date: '2025/12/05', time: '22:00', value: 7.5, label: '针147', isInjection: false },
  { date: '2025/12/06', time: '19:00', value: 7.4, label: '针168', isInjection: false },

  // 第九针周期 2025/12/07 - 2025/12/15
  { date: '2025/12/07', time: '19:00', value: 10.9, label: '第九针', isInjection: true, injectionDose: 24.5, injectionIndex: 9 },
  { date: '2025/12/10', time: '20:00', value: 4.4, label: '针73', isInjection: false },
  { date: '2025/12/14', time: '19:00', value: 7.4, label: '针168', isInjection: false },

  // 第十针周期 2025/12/15 - 2025/12/22
  { date: '2025/12/15', time: '19:00', value: 18.8, label: '第十针', isInjection: true, injectionDose: 24.5, injectionIndex: 10 },
  { date: '2025/12/19', time: '22:00', value: 9.0, label: '针99', isInjection: false },
  { date: '2025/12/20', time: '10:00', value: 2.6, label: '针111', isInjection: false },
  { date: '2025/12/21', time: '18:00', value: 10.0, label: '针143', isInjection: false },

  // 第十一针周期 2025/12/22 - 2025/12/29
  { date: '2025/12/22', time: '19:00', value: 7.5, label: '第十一针', isInjection: true, injectionDose: 24.5, injectionIndex: 11 },
  { date: '2025/12/23', time: '20:00', value: 7.9, label: '针49', isInjection: false },
  { date: '2025/12/28', time: '15:30', value: 4.7, label: '针140.5', isInjection: false },

  // 第十二针周期 2025/12/29 - 2026/01/05
  { date: '2025/12/29', time: '19:00', value: 10.2, label: '第十二针', isInjection: true, injectionDose: 24.5, injectionIndex: 12 },
  { date: '2026/01/04', time: '12:30', value: 6.3, label: '针113.5', isInjection: false },

  // 第十三针周期 2026/01/05 - 2026/01/12
  { date: '2026/01/05', time: '19:00', value: 14.9, label: '第十三针', isInjection: true, injectionDose: 24.5, injectionIndex: 13 },
  { date: '2026/01/06', time: '19:00', value: 3.8, label: '针24', isInjection: false },
  { date: '2026/01/08', time: '21:00', value: 4.9, label: '针74', isInjection: false },
  { date: '2026/01/11', time: '19:00', value: 4.3, label: '针144', isInjection: false },

  // 第十四针周期 2026/01/12 - 2026/01/19
  { date: '2026/01/12', time: '19:00', value: 11.2, label: '第十四针', isInjection: true, injectionDose: 24.5, injectionIndex: 14 },
  { date: '2026/01/13', time: '19:00', value: 2.4, label: '针24', isInjection: false },
  { date: '2026/01/15', time: '14:00', value: 5.0, label: '针67', isInjection: false },
  { date: '2026/01/17', time: '22:30', value: 6.3, label: '针123.5', isInjection: false },
  { date: '2026/01/18', time: '19:00', value: 6.6, label: '针144', isInjection: false },

  // 第十五针周期 2026/01/19 - 2026/01/26
  { date: '2026/01/19', time: '19:00', value: 9.3, label: '第十五针', isInjection: true, injectionDose: 24.5, injectionIndex: 15 },
  { date: '2026/01/20', time: '20:00', value: 3.3, label: '针25', isInjection: false },
  { date: '2026/01/22', time: '19:00', value: 4.5, label: '针72', isInjection: false },
  { date: '2026/01/25', time: '20:00', value: 6.6, label: '针145', isInjection: false },

  // 第十六针周期 2026/01/26 - 2026/02/02
  { date: '2026/01/26', time: '19:00', value: 7.5, label: '第十六针', isInjection: true, injectionDose: 24.5, injectionIndex: 16 },
  { date: '2026/01/27', time: '19:00', value: 3.0, label: '针24', isInjection: false },
  { date: '2026/01/28', time: '21:30', value: 9.4, label: '针50.5', isInjection: false },
  { date: '2026/01/29', time: '22:30', value: 6.7, label: '针75.5', isInjection: false },
  { date: '2026/02/01', time: '19:00', value: 6.2, label: '针144', isInjection: false },

  // 第十七针 2026/02/02
  { date: '2026/02/02', time: '19:00', value: 10.9, label: '第十七针', isInjection: true, injectionDose: 24.5, injectionIndex: 17 },
  { date: '2026/02/03', time: '07:30', value: 3.9, label: '针12.5', isInjection: false }
];
