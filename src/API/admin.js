// admin/modules



// import toast from "react-hot-toast";
import API from "../services/AxiosInstance";
// import { formatError } from "../utils/messagePopup";




export async function getCompanyPackagesAction(json) {
    let data = await getCompanyPackages(json)
        .then(async (response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error)
        });

    return data
}

const getCompanyPackages = async (data) => {
    const json = {
        "company_id": data?.COMPANY_ID,
    }

    return API.post("admin/modules", json);
}





export async function getCompanyApprovalFlowAction(json) {
    let data = await getCompanyApprovalFlow(json)
        .then(async (response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error)
        });

    return data
}

const getCompanyApprovalFlow = async (data) => {
    const json = {
        "company_id": data?.COMPANY_ID,
        "package_id":data?.pkId

    }

    return API.post("admin/get_package_approvals", json);
    // return API.post("admin/get_approval_route", json);
}





export async function setCompanyApprovalFlowAction(json) {
    let data = await setCompanyApprovalFlow(json)
        .then(async (response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error)
        });

    return data
}

const setCompanyApprovalFlow = async (data) => {
    // const json = {
    //     "company_id":data?.COMPANY_ID,
    //     "package_id":data?.pkId,
    //     "action":"create",
    //     "approvals":[
    //         {
    //             "APPROVAL_TITLE":"PROFILING OFFICER",
    //             "APPROVAL_LEVEL":"1",
    //             "CAN_REASSIGN":"0",
    //             "AUTOMATICALLY_ASSIGNED":"0",
    //             "OFFICERS":[
    //                     {
    //                         "QUALIFICATION":"DESIGNATION",
    //                         "PARTICIPANTS":"2345,7833"//Designation IDS
    //                     },
    //                     {
    //                         "QUALIFICATION":"UNIT",
    //                         "PARTICIPANTS":"2345,7833"//Staff IDS that UNIT ID
    //                     }
    //             ]
    //         },
    //         {
    //              "APPROVAL_TITLE":"HR APPROVER",
    //             "APPROVAL_LEVEL":"2",
    //             "CAN_REASSIGN":"0",
    //             "AUTOMATICALLY_ASSIGNED":"0",
    //             "OFFICERS":[
    //                     {
    //                         "QUALIFICATION":"DESIGNATION",
    //                         "PARTICIPANTS":"2345,7833"//Designation IDS
    //                     },
    //                     {
    //                         "QUALIFICATION":"UNIT HEAD",
    //                         "PARTICIPANTS":"2345,7833"//UNIT ID
    //                     }
    //             ]
    //         }
    //     ]
    // }

    return API.post("admin/create_approval_route", {...data});
}













export async function getCompanyStaffAction(json) {
    let data = await getCompanyStaff(json)
        .then(async (response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error)
        });

    return data
}

const getCompanyStaff = async (data) => {
    return API.get(`package/getAllStaff/${data}`);
}

export async function getCompanyRegionHeadAction(json) {
    let data = await getCompanyRegionHead(json)
        .then(async (response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error)
        });

    return data
}

const getCompanyRegionHead = async (data) => {
    return API.get(`package/getRegionalHeads/${data}`);
}




export async function getCompanyUnitHeadAction(json) {
    let data = await getCompanyUnitHead(json)
        .then(async (response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error)
        });

    return data
}

const getCompanyUnitHead = async (data) => {
    return API.get(`package/getUnitHeads/${data}`);
}



export async function getCompanyDirectorateHeadAction(json) {
    let data = await getCompanyDirectorateHead(json)
        .then(async (response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error)
        });

    return data
}

const getCompanyDirectorateHead = async (data) => {
    return API.get(`package/getDirectorateHeads/${data}`);
}


export async function getCompanyDepartmentHeadAction(json) {
    let data = await getCompanyDepartmentHead(json)
        .then(async (response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error)
        });

    return data
}

const getCompanyDepartmentHead = async (data) => {
    return API.get(`package/getDepartmentalHeads/${data}`);
}





export async function getCompanyGradeAction(json) {
    let data = await getCompanyGrade(json)
        .then(async (response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error)
        });

    return data
}

const getCompanyGrade = async (data) => {
    return API.get(`package/getGrades/${data}`);
}




export async function getCompanyDesignationRanksAction(json) {
    let data = await getCompanyDesignationRanks(json)
        .then(async (response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error)
        });

    return data
}

const getCompanyDesignationRanks = async (data) => {
    return API.get(`package/get_designations/${data}`);
}


export async function getCompanyDepartmentAction(json) {
    let data = await getCompanyDepartment(json)
        .then(async (response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error)
        });

    return data
}

const getCompanyDepartment = async (data) => {
    return API.get(`package/get_departments/${data}`);
}



export async function getCompanyUnitsAction(json) {
    let data = await getCompanyUnits(json)
        .then(async (response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error)
        });

    return data
}

const getCompanyUnits = async (data) => {
    return API.get(`package/get_units/${data}`);
}



export async function getCompanyDirectoratesAction(json) {
    let data = await getCompanyDirectorates(json)
        .then(async (response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error)
        });

    return data
}

const getCompanyDirectorates = async (data) => {
    return API.get(`package/get_directorates/${data}`);
}










