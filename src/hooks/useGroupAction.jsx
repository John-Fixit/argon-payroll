/* eslint-disable no-unused-vars */
import { create } from 'zustand'


const useGroupAction = create((set) => ({
      type: null,
      openModal: (data = 'create') => set({ type: data }),
      clearModal: () => set({ type: null }),
    }),
  )

export default useGroupAction