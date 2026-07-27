/* eslint-disable no-unused-vars */
import { create } from 'zustand'






const useAttendanceData = create(

    (set) => ({
      tableData: [],
      punchActivityData: [],
      setTableData: (data = []) => set({ tableData: [...data] }),
      setPunchActivityData: (data = []) => set({ punchActivityData: [...data] }),
    }),
)

export default useAttendanceData