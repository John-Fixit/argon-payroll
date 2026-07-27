import { createWithEqualityFn } from 'zustand/traditional';
import { shallow } from 'zustand/shallow';

const useNotification = createWithEqualityFn(
  (set) => ({
    data: {
      current: [],
      awaiting_approval: [],
      treated_requests: [],
    },
    updateData: (payload) => set((state) => ({ data: { ...state.data, ...payload } })),
  }),
  shallow
);

export default useNotification;