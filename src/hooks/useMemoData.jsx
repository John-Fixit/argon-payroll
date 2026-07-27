import { createWithEqualityFn } from 'zustand/traditional';
import { shallow } from 'zustand/shallow';

const useMemoData = createWithEqualityFn(
  (set) => ({
    data: {
      memo_subject: "",
      content: "",
      staff_id: null,
      from: "",
      recipient_type: "",
      recipient_value: "",
      recipients: [],
      approvals: [],
      is_draft: 0,
      package_id: 19,
      company_id: null,
      memo_number: null,
      memo_id: null,
      signers: [],
      recipient_value_array: [],
      to_value: null,
      from_value: null,
    },
    updateData: (payload) => set((state) => ({ data: { ...state.data, ...payload } })),
    updateDefault: () => set((state) => ({ data: { ...state.data, 
      memo_subject: "",
      content: "",
      staff_id: null,
      from: "",
      recipient_type: "",
      recipient_value: "",
      recipients: [],
      approvals: [],
      is_draft: 0,
      package_id: 19,
      company_id: null,
      memo_number: null,
      memo_id: null,
      signers: [],
      recipient_value_array: [],
      to_value: null,
      from_value: null,
     } })),
  }),
  shallow
);

export default useMemoData;
