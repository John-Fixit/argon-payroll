/* eslint-disable no-unused-vars */
import { create } from "zustand";
import { shallow } from "zustand/shallow";

const initial = {
  values: {},
  allowance: [
    {
      allowance_id: "",
      select_type: "",
      amount: "",
    },
  ],
};

const useVariationStore = create(
  (set) => ({
    data: initial,
    updateData: (payload) => set((state) => ({ data: { ...payload } })),
    updateAllowanceData: (payload) =>
      set((state) => ({ data: { allowance: [...payload] } })),
    clearData: () => set((state) => ({ data: { ...initial } })),
  }),
  shallow
);

export default useVariationStore;
