import { create } from "zustand";


export const useHook = create((set)=>{
return{
    data: [],


    updateData:(payload)=>set({data: payload })
}
})


export const useSaveData=create(set=>{
return{
information:{},

keepData:(payload)=>set(state=>({information: {...state.information, ...payload}})),
clearData:()=>set(()=>({information: {}}))
}
})


export const useRequestData=create(set=>{
return{
information:{
pending:[],
approved:[],
cancelled:[],
declined:[],
},

keepRequestData:(payload)=>set(state=>({information: {...state.information, ...payload}})),
}
})


export const useSaveAnnouncement=create(set=>{
return{
information:{},

keepAnnoucementData:(payload)=>set(state=>({information: {...state.information, ...payload}})),
clearData:()=>set(()=>({information: { }}))
}
})


export const useSaveToEditInformation=create(set=>{
return{
information:{},

keepEditData:(payload)=>set(state=>({information: {...state.information, ...payload}})),
clearData:()=>set(()=>({information: { }}))
}
})