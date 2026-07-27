export const app_routes = {
  post: "/engage/posts",
  payrollDashboard: "/payroll/home",
  payroll: {
    staffInformation: {
      index: "/payroll/staff-information",
      details: "/payroll/staff-information/details",
      suspend_staff: "/payroll/staff-information/suspend",
      groups: "/payroll/staff-information/groups",
      suspend_list: "/payroll/staff-information/suspend_list",
    },
    setting: {
      index: "/payroll/settings",
      banks: "/payroll/settings/banks",
      pfas: "/payroll/settings/pfas",
      attributes: "/payroll/settings/attributes",
      staff_rank: "/payroll/settings/staff_rank",
      //sub setting links
      pfa_change: "/payroll/settings/pfa_change",
      bank_change: "/payroll/settings/bank_change",
    },
    payroll: {
      index: "/payroll/payroll",
      contribution: "/payroll/payroll/contribution",
      loans: "/payroll/payroll/loans",
      arrears: "/payroll/payroll/arrears",
      other_arrears: "/payroll/payroll/other_arrears",
      promotions: "/payroll/payroll/promotions",
      pay_run: "/payroll/payroll/pay_run",
      calculation: "/payroll/payroll/calculation",
    },
    productivity: {
      index: "/payroll/productivity",
    },
    report: {
      index: "/payroll/reports",
      staff: "/payroll/reports/staff",
      exited_staff: "/payroll/reports/exited_staff",
      payroll: "/payroll/reports/payroll",
      external: "/payroll/reports/external",
    },
    workflow: "/payroll/workflow",
  },
  training: {
    index: "/training",
    pending_training: "/training/pending_training",
    training_fee: "/training/training_fees",
    approve_training: "/training/approved_training",
    training_status: "/training/training_status",
  },





  hrOperation: {
  //   index: "/hrOperation",
  //   staff_information: {
  //     index: "/hrOperation/staff_information",
  //     awaiting_approval: "/hrOperation/staff_information/awaiting_approval",
  //     onBoarding: "/hrOperation/staff_information/approved",
  //     reports: "/hrOperation/staff_information/reports",
  //     staff_details: "/hrOperation/staff_information/staff_details",
  //     staff_exit: "/hrOperation/staff_information/staff_exit",
  //   },
  //   leave_management: "/hrOperation/leave_management",
  performance: {
    index: "/hr/performance",
    setup: "/hr/performance/setup",
    review: "/hr/performance/review",
    take_action: "/hr/performance/take_action",
    team_mapping: "/hr/performance/team_mapping",
  }
  //   performance: "/hrOperation/performance",
  //   training: "/hrOperation/training",
  //   settings: "/hrOperation/settings",
  //   industrial_relations: "/hrOperation/industrial_relations",
  //   promotions: "/hrOperation/promotions",
  //   variations: "/hrOperation/variations",
  //   hr_form: "/hrOperation/hr_form",
  //   report: "/hrOperation/report",
  //   deployment: "/hrOperation/deployment",
  },
  audit: {
    index: "/audit",
    onboard_awaiting_audit: "/audit/onboard_awaiting_audit",
    onboard_approved: "/audit/onboard_approved",
    audit_pending: "/audit/audit_pending",
    audit_rejected: "/audit/audit_rejected",
    audit_approved: "/audit/audit_approved",
  },
  memos: {
    index: "/engage/memos"
  }





};
