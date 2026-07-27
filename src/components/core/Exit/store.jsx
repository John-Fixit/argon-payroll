import { createWithEqualityFn } from 'zustand/traditional'
import { shallow } from 'zustand/shallow'
// import { create } from 'zustand';

const useFormStore = createWithEqualityFn(
  (set) => ({
    data: {},
    data_group: [],
    updateData: (payload) =>{
      
      set((state) => ({ data: { ...state.data, ...payload } }))
    },
    updateDataGroup: (data)=>set((state)=> ({ data_group: [...state.data_group, data] })),
    resetState:()=>set({data: {}, data_group: []})
  }),
  shallow
)

export default useFormStore