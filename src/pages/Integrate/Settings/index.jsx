/* eslint-disable no-case-declarations */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
// import { useState } from "react"
// import Header from "./components/Header"
// import PackageContainer from "./components/PackageContainer"
// import SearchBar from "./components/SearchBar"
// import {packages} from './components/packages'
import { useEffect, useState } from "react";
import PageHeader from "../../../components/payroll_components/PageHeader";
import "./ff.css";
import {
  getCompanyApprovalFlowAction,
  getCompanyDepartmentAction,
  getCompanyDepartmentHeadAction,
  getCompanyDesignationRanksAction,
  getCompanyDirectorateHeadAction,
  getCompanyDirectoratesAction,
  getCompanyGradeAction,
  getCompanyPackagesAction,
  getCompanyRegionHeadAction,
  getCompanyStaffAction,
  getCompanyUnitHeadAction,
  getCompanyUnitsAction,
  setCompanyApprovalFlowAction,
} from "../../../API/admin";
import useCurrentUser from "../../../hooks/useCurrentUser";
import { Avatar, Checkbox, Tooltip } from "@nextui-org/react";
import Separator from "../../../components/payroll_components/Separator";
import { CiCircleRemove } from "react-icons/ci";

// import { users } from "./data";
import { useForm } from "react-hook-form";
import { Edit, EditIcon, Plus } from "lucide-react";
import { Popover, Select, Space } from "antd";

import toast from "react-hot-toast";
import { BsInfo } from "react-icons/bs";
import MultiUserSelect from "./components/MultiUserSelect";
import { MdOutlineDeleteSweep } from "react-icons/md";
import MultiselectAntd from "./components/MultiselectAntd";
import ImageCameraMedia from "../../../components/Media/ImageCamera";

const AdminSettings = () => {
  // const [searchValue, setSearchValue] = useState('')
  // const [filteredData, setFilteredData] = useState([])

  const [comapanyPackage, setComapanyPackage] = useState([]);
  const [comapanyPackageID, setComapanyPackageID] = useState("");
  const [currentPackage, setCurrentPackage] = useState(null);
  const [qualifications, setQualification] = useState([]);
  const [reassign, setReassign] = useState(false);
  const [automatic, setAutomatic] = useState(false);
  const [qualificationInp, setQualificationInp] = useState("");
  const [participantInp, setParticipantInp] = useState([]);
  const [participantLoading, setParticipantLoading] = useState(false);
  const [isDefaultLoading, setIsDefaultLoading] = useState(false);
  const [participantLoaded, setParticipantLoaded] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [hasInitialData, setHasInitialData] = useState(false);
  const [indexToEdit, setIndexToEdit] = useState(null);
  const [resave, setResave] = useState(false);
  const [participantInpForUi, setParticipantInpForUi] = useState([]);
  const [open, setOpen] = useState(false);
  const [showWebcam, setShowWebcam] = useState(false);

  // const [participantArray, setParticipantArray] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const [allApprovals, setAllApprovals] = useState([]);
  const [allApprovalsUi, setAllApprovalsUi] = useState([]);
  const [editingOfficerIndex, setEditingOfficerIndex] = useState(null);

  const [approvals, setApprovals] = useState({
    APPROVAL_TITLE: "",
    APPROVAL_LEVEL: "",
    CAN_REASSIGN: "",
    AUTOMATICALLY_ASSIGNED: "",
    OFFICERS: [],
  });

  const [approvalsForUi, setApprovalsForUi] = useState({
    APPROVAL_TITLE: "",
    APPROVAL_LEVEL: "",
    CAN_REASSIGN: "",
    AUTOMATICALLY_ASSIGNED: "",
    OFFICERS: [],
  });

  const { userData } = useCurrentUser();

  const [currentSetup, setCurrentSetup] = useState("");

  // console.log(approvalsForUi, allApprovalsUi, approvals, allApprovals)

  useEffect(() => {
    const getPackages = async () => {
      try {
        setIsDefaultLoading(true);
        const res = await getCompanyPackagesAction(userData?.data);
        if (res) {
          const arr = Object.values(res?.data);
          if (arr?.length > 0) {
            packageFlow(arr[0]);
          }
          setComapanyPackage(arr);
          // setCurrentSetup(arr[0]?.PACKAGE_NAME);
          // setComapanyPackageID(arr[0]?.PACKAGE_ID);

          const userValue = res?.qualifications?.map((val, i) => {
            return {
              value: val,
              key: i,
            };
          });

          setQualification(userValue);
          setIsDefaultLoading(false);
        }
      } catch (error) {
        setIsDefaultLoading(false);
        console.log(error);
      }
    };

    getPackages();
  }, [userData?.data]);

  const packageFlow = async (pk) => {
    setCurrentPackage(pk);
    setCurrentSetup(pk?.PACKAGE_NAME);
    setComapanyPackageID(pk?.PACKAGE_ID);

    reset();
    setEditingOfficerIndex(null);
    setReassign(false);
    setAutomatic(false);
    setParticipantInp([]);
    setParticipantInpForUi([]);
    setQualificationInp("");
    setApprovals({
      APPROVAL_TITLE: "",
      APPROVAL_LEVEL: "",
      CAN_REASSIGN: "",
      AUTOMATICALLY_ASSIGNED: "",
      OFFICERS: [],
    });
    setApprovalsForUi({
      APPROVAL_TITLE: "",
      APPROVAL_LEVEL: "",
      CAN_REASSIGN: "",
      AUTOMATICALLY_ASSIGNED: "",
      OFFICERS: [],
    });

    setIsEditing(false);
    setAllApprovals([]);
    setAllApprovalsUi([]);
    setHasInitialData(false);
    setIndexToEdit(null);
    setResave(false);

    try {
      const json = {
        COMPANY_ID: userData?.data?.COMPANY_ID,
        pkId: pk?.PACKAGE_ID,
      };
      const res = await getCompanyApprovalFlowAction(json);
      if (res) {
        // console.log(res);

        if (res?.data?.length > 0) {
          setHasInitialData(true);
        } else {
          setHasInitialData(false);
        }

        // console.log(res?.data);

        setAllApprovals(
          res?.data?.map((each) => {
            each?.OFFICERS?.map((elm) => {
              elm.OFFICERS_DETAIL = elm?.PARTICIPANTS;
              elm.PARTICIPANTS = elm?.QUALIFICATION_RANK;
              // elm.QUALIFICATION = elm?.QUALIFICATION

              return elm;

              // return {
              //   OFFICERS_DETAIL : elm?.PARTICIPANTS,
              //   PARTICIPANTS : elm?.QUALIFICATION_RANK,
              //   QUALIFICATION : elm?.QUALIFICATION,
              // }
            });

            return each;
          })
        );

        setAllApprovalsUi(
          res?.data?.map((each) => {
            each?.OFFICERS?.map((elm) => {
              elm.PARTICIPANTS = processParticipants(elm?.QUALIFICATION, elm?.OFFICERS_DETAIL || elm?.PARTICIPANTS);
              return elm;
            });
            return each;
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };



  const processParticipants = (name, data)=>{
    switch (name) {
      case 'STAFF':
          let staff =  data?.map((val) => {
            val.value = val?.STAFF_ID;
            val.label = val?.FIRST_NAME + " " + val?.LAST_NAME;
          return val;
        });
        return staff;
      case 'DIRECTORATE':
          let directorate =  data?.map((val) => {
            val.value = val?.DIRECTORATE_ID;
            val.label = val?.DIRECTORATE_NAME;
            return val;
        });
        return directorate;
      case 'DIRECTORATE HEAD':
          let directorateHead =  data?.map((val) => {
            val.value = val?.DIRECTORATE_ID;
            val.label = val?.DIRECTORATE_NAME;
            // val.label = val?.FIRST_NAME + " " + val?.LAST_NAME;
            return val;
        });
        return directorateHead;
      case 'DEPARTMENT':
          let department =  data?.map((val) => {
            val.value = val?.DEPARTMENT_ID;
            val.label = val?.DEPARTMENT_NAME;
            return val;
        });
        return department;
      case 'DEPARTMENTAL HEAD':
          let departmentHead =  data?.map((val) => {
            val.value = val?.DEPARTMENT_ID;
            val.label = val?.DEPARTMENT_NAME;
            // val.label = val?.FIRST_NAME + " " + val?.LAST_NAME;
            return val;
        });
        return departmentHead;
      case 'DESIGNATION':
          let designation =  data?.map((val) => {
            val.value = val?.DESIGNATION_ID;
            val.label = val?.DESIGNATION_NAME;
            return val;
        });
        return designation;
      case 'UNIT':
          let unit =  data?.map((val) => {
            val.value = val?.UNIT_ID;
            val.label = val?.UNIT_NAME;
            return val;
        });
        return unit;
      case 'UNIT HEAD':
          let unitHead =  data?.map((val) => {
            val.value = val?.UNIT_ID;
            val.label = val?.UNIT_NAME;
            // val.value = val?.STAFF_ID;
            // val.label = val?.FIRST_NAME + " " + val?.LAST_NAME;
            return val;
        });
        return unitHead;
      case 'GRADE':
          let grade =  data?.map((val) => {
            val.value = val?.GRADE?.toString();
            val.label = val?.GRADE?.toString();
            return val;
        });
        return grade;
      case 'REGIONAL HEAD':
          let regionalHead =  data?.map((val) => {
            val.value = val?.REGION_ID;
            val.label = val?.REGION_NAME;
            // val.value = val?.STAFF_ID;
            // val.label = `${val?.FIRST_NAME} ${val?.LAST_NAME} (${val?.REGION_NAME})`;
            return val;
        });
        return regionalHead;
    
      default:
        break;
    }
  }







  const onSelectQualification = async (newValue) => {
    setParticipantLoaded([]);
    setParticipantInp([]);
    setParticipantInpForUi([]);
    setQualificationInp(newValue);
    setParticipantLoading(true);

    try {
      let res;

      if (newValue === "STAFF") {
        res = await getCompanyStaffAction(userData?.data?.COMPANY_ID);
        if (res) {
          const userValue = processParticipants('STAFF', res?.data)
          setParticipantLoaded([{ value: "ALL", label: "ALL" }, ...userValue]);
          setParticipantLoading(false);
        }
      } else if (newValue === "DIRECTORATE") {
        res = await getCompanyDirectoratesAction(userData?.data?.COMPANY_ID);
        if (res) {
          const userValue = processParticipants('DIRECTORATe', res?.data)
          setParticipantLoaded(userValue);
          setParticipantLoading(false);
        }
      } else if (newValue === "DIRECTORATE HEAD") {
        res = await getCompanyDirectorateHeadAction(userData?.data?.COMPANY_ID);
        if (res) {
          const userValue = processParticipants('DIRECTORATE HEAD', res?.data)
          setParticipantLoaded(userValue);
          setParticipantLoading(false);
        }
      } else if (newValue === "DEPARTMENT") {
        res = await getCompanyDepartmentAction(userData?.data?.COMPANY_ID);
        if (res) {
          const userValue = processParticipants('DEPARTMENT', res?.data)
          setParticipantLoaded(userValue);
          setParticipantLoading(false);
        }
      } else if (newValue === "DEPARTMENTAL HEAD") {
        res = await getCompanyDepartmentHeadAction(userData?.data?.COMPANY_ID);
        if (res) {
          const userValue = processParticipants('DEPARTMENTAL HEAD', res?.data)
          setParticipantLoaded(userValue);
          setParticipantLoading(false);
        }
      } else if (newValue === "DESIGNATION") {
        res = await getCompanyDesignationRanksAction(
          userData?.data?.COMPANY_ID
        );
        if (res) {
          const userValue = processParticipants('DESIGNATION', res?.data)
          setParticipantLoaded(userValue);
          setParticipantLoading(false);
        }
      } else if (newValue === "UNIT") {
        res = await getCompanyUnitsAction(userData?.data?.COMPANY_ID);
        if (res) {
          const userValue = processParticipants('UNIT', res?.data)
          setParticipantLoaded(userValue);
          setParticipantLoading(false);
        }
      } else if (newValue === "UNIT HEAD") {
        res = await getCompanyUnitHeadAction(userData?.data?.COMPANY_ID);
        if (res) {
          const userValue = processParticipants('UNIT HEAD', res?.data)
          setParticipantLoaded(userValue);
          setParticipantLoading(false);
        }
      } else if (newValue === "GRADE") {
        res = await getCompanyGradeAction(userData?.data?.COMPANY_ID);
        if (res) {
         const result = res?.data
           ?.filter((d) => d?.GRADE !== null)
          const userValue = processParticipants('GRADe', result)
          setParticipantLoaded(userValue);
          setParticipantLoading(false);
        }
      } else if (newValue === "REGIONAL HEAD") {
        res = await getCompanyRegionHeadAction(userData?.data?.COMPANY_ID);
        if (res) {
          const userValue =  processParticipants('REGIONAL HEAD', res?.data)
          setParticipantLoaded(userValue);
          setParticipantLoading(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };


  function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
        return text;
    } else {
        return text.substring(0, maxLength) + '...';
    }
}


  const onPickParticipant = (newValue) => {
    // console.log(newValue)
    // setParticipantInpForUi(newValue);

    // if(qualificationInp === "STAFF"){

    //   const filterAll = newValue?.find(stf => stf === "ALL")
    //   if(filterAll){
    //     setParticipantInp(["ALL"]);
    //   }else{
    //     setParticipantInp(newValue);
    //   }
    // }else {
    //   setParticipantInp(newValue);
    // }










    // getEachuserID
    const userIDs = newValue?.map((each) => each?.value);

    const latest = newValue?.map(each =>{
      // each.label =  each?.label.length > 25 ? truncateText(each?.label, 20) : each?.label
      // each.label =  each?.label.length > 25 ? each?.label?.substring(0, 20) : each?.label

      return each;
    })

    // console.log(latest)

    // setParticipantInp(userIDs);
    // setParticipantInpForUi(newValue)
    // // console.log(newValue, userIDs)

    if (qualificationInp === "STAFF") {
      const filterAll = userIDs?.find((stf) => stf === "ALL");
      if (filterAll) {
        // console.log('000')
        setParticipantInp(["ALL"]);
        setParticipantInpForUi([{ value: "ALL", label: "ALL" }]);
      } else {
        // console.log('222')
        setParticipantInp(userIDs);
        setParticipantInpForUi(latest);
        // setParticipantInpForUi(newValue);
      }
    } else {
      setParticipantInp(userIDs);
      setParticipantInpForUi(latest);
      // setParticipantInpForUi(newValue);
    }
  };

  const submit = async (e) => {
    e.preventDefault();

    const json = {
      company_id: userData?.data?.COMPANY_ID,
      package_id: comapanyPackageID,
      action: hasInitialData ? "edit" : "create",
      approvals: allApprovals,
    };

    // console.log(json);
    try {
      const res = await setCompanyApprovalFlowAction(json);
      if (res) {
        // console.log(res);
        !hasInitialData && setAllApprovals([]);
        toast.success("updated successfully");
        packageFlow(currentPackage);
        setResave(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateChangeForUi = (data) => {
    const appr_data = {
      APPROVAL_TITLE: data?.title,
      APPROVAL_LEVEL: data?.level,
      CAN_REASSIGN: reassign ? "1" : "0",
      AUTOMATICALLY_ASSIGNED: automatic ? "1" : "0",
      OFFICERS:
        qualificationInp && participantInp.length > 0
          ? [
              ...approvalsForUi.OFFICERS,
              {
                QUALIFICATION: qualificationInp,
                PARTICIPANTS: participantInpForUi,
              },
            ]
          : [...approvalsForUi.OFFICERS],
    };

    isEditing
      ? setAllApprovalsUi([
          ...allApprovalsUi.map((allAp, i) =>
            i === indexToEdit ? appr_data : allAp
          ),
        ])
      : setAllApprovalsUi([...allApprovalsUi, appr_data]);

    setApprovalsForUi({
      APPROVAL_TITLE: "",
      APPROVAL_LEVEL: "",
      CAN_REASSIGN: "",
      AUTOMATICALLY_ASSIGNED: "",
      OFFICERS: [],
    });
  };

  const saveChange = (data) => {
    if (approvals.OFFICERS.length === 0) {
      return toast.error(`please add officer`, {
        duration: 4000,
      });
    }

    const appr_data = {
      APPROVAL_TITLE: data?.title,
      APPROVAL_LEVEL: data?.level,
      CAN_REASSIGN: reassign ? "1" : "0",
      AUTOMATICALLY_ASSIGNED: automatic ? "1" : "0",
      OFFICERS:
        qualificationInp && participantInp.length > 0
          ? [
              ...approvals.OFFICERS,
              {
                QUALIFICATION: qualificationInp,
                PARTICIPANTS: participantInp?.join(","),
              },
            ]
          : [...approvals.OFFICERS],
    };

    isEditing
      ? setAllApprovals([
          ...allApprovals.map((allAp, i) =>
            i === indexToEdit ? appr_data : allAp
          ),
        ])
      : setAllApprovals([...allApprovals, appr_data]);

    updateChangeForUi(data);

    hasInitialData && setResave(true);

    // console.log(data, reassign, automatic);
    reset();
    setReassign(false);
    setAutomatic(false);
    setParticipantInp([]);
    setQualificationInp("");
    setApprovals({
      APPROVAL_TITLE: "",
      APPROVAL_LEVEL: "",
      CAN_REASSIGN: "",
      AUTOMATICALLY_ASSIGNED: "",
      OFFICERS: [],
    });
    setIsEditing(false);
    setIndexToEdit(null);
    setIsAdding(false);
    setEditingOfficerIndex(null);
  };

  const addChange = (data) => {
    if (!qualificationInp || participantInp.length === 0) {
      return toast.error("qualification and participant are required", {
        duration: 3000,
      });
    }

    const theApproved = approvals?.OFFICERS?.find(
      (appv) => appv.QUALIFICATION === qualificationInp
    );

    // console.log(editingOfficerIndex); 
    if (editingOfficerIndex === null && theApproved) {
      return toast.error(`the selected qualification already exist`, {
        duration: 3000,
      });
    }

    // participantInp, qualificationInp;

    setApprovals({
      APPROVAL_TITLE: data?.title,
      APPROVAL_LEVEL: data?.level,
      CAN_REASSIGN: reassign ? "1" : "0",
      AUTOMATICALLY_ASSIGNED: automatic ? "1" : "0",
      OFFICERS:
        editingOfficerIndex !== null
          ? [
              ...approvals.OFFICERS.map((el, i) =>
                i === editingOfficerIndex
                  ? {
                      QUALIFICATION: qualificationInp,
                      PARTICIPANTS: participantInp?.join(","),
                    }
                  : el
              ),
            ]
          : [
              ...approvals.OFFICERS,
              {
                QUALIFICATION: qualificationInp,
                PARTICIPANTS: participantInp?.join(","),
              },
            ],
    });

    setApprovalsForUi({
      ...approvalsForUi,
      OFFICERS:
        editingOfficerIndex !== null
          ? [
              ...approvalsForUi.OFFICERS.map((el, i) =>
                i === editingOfficerIndex
                  ? {
                      QUALIFICATION: qualificationInp,
                      PARTICIPANTS: participantInpForUi,
                    }
                  : el
              ),
            ]
          : [
              ...approvalsForUi.OFFICERS,
              {
                QUALIFICATION: qualificationInp,
                PARTICIPANTS: participantInpForUi,
              },
            ],
    });

    setParticipantInp([]);
    setParticipantInpForUi([]);
    setQualificationInp("");
    setEditingOfficerIndex(null);

    // console.log(data, reassign, automatic, participantInp?.join(','));
  };

  const startEditingOfficers = (QUALIFICATION, index) => {
    onSelectQualification(QUALIFICATION);
    const findOfficer = approvalsForUi.OFFICERS.find(
      (elm) => elm.QUALIFICATION === QUALIFICATION
    );

    if (findOfficer) {
      setParticipantInpForUi(findOfficer.PARTICIPANTS);
      setEditingOfficerIndex(index);
    }
  };

  const updateOfficerData = () => {};

  const removeAddedOfficer = (QUALIFICATION) => {
    setApprovals({
      ...approvals,
      OFFICERS: [
        ...approvals.OFFICERS.filter(
          (ofc) => ofc.QUALIFICATION !== QUALIFICATION
        ),
      ],
    });

    setApprovalsForUi({
      ...approvalsForUi,
      OFFICERS: [
        ...approvalsForUi.OFFICERS.filter(
          (ofc) => ofc.QUALIFICATION !== QUALIFICATION
        ),
      ],
    });

    if (editingOfficerIndex !== null) {
      setParticipantInp([]);
      setParticipantInpForUi([]);
      setQualificationInp("");
      setEditingOfficerIndex(null);
    }
  };

  const removeSavedApprovalObj = (index) => {
    const snap = [...allApprovals.filter((_, i) => i !== index)];
    setAllApprovals([...allApprovals.filter((_, i) => i !== index)]);
    snap?.length === 0 ? setResave(false) : setResave(true);
  };

  const startEditing = (index) => {
    const dataToEdit = allApprovals.find((_, i) => i === index);
    const dataToEditForUi = allApprovalsUi.find((_, i) => i === index);

    // console.log(dataToEdit)

    setApprovals({ ...dataToEdit });
    setApprovalsForUi({ ...dataToEditForUi });
    setIsEditing(true);
    setIndexToEdit(index);
    setValue("title", dataToEdit?.APPROVAL_TITLE);
    setValue("level", dataToEdit?.APPROVAL_LEVEL);
    setReassign(dataToEdit?.CAN_REASSIGN === "0" ? false : true);
    setAutomatic(dataToEdit?.AUTOMATICALLY_ASSIGNED === "0" ? false : true);
    setResave(false);
  };



  const AvailableQualificartion = () => {
    return (
      <Select
        loading={isDefaultLoading}
        style={{ width: "100%" }}
        placeholder="select qualification"
        value={qualificationInp}
        onChange={onSelectQualification}
        options={qualifications}
        // status="error"

        optionRender={(qua) => (
          <Space>
            <div className="flex flex-col text-gray-600">
              <span className="text-small">{qua.value}</span>
            </div>
          </Space>
        )}
      />
    );
  };

  const startAdd = (e) => {
    e.preventDefault();
    setIsAdding(true);
  };

  const removeParticipant = (pIndex, OfficerIndex, qualification, length) => {
    const findApprov = approvals?.OFFICERS?.find((_, i) => i === OfficerIndex);
    const findApprovUi = approvalsForUi?.OFFICERS?.find(
      (_, i) => i === OfficerIndex
    );

    if (findApprov) {
      // console.log(findApprov)
      // console.log('find')
      // if (approvals.OFFICERS[OfficerIndex].PARTICIPANTS.length === 1) {
      if (length === 1) {
        console.log('here')
        removeAddedOfficer(qualification);
        return;
      }

      // const appr =  {...approvals, OFFICERS: [...approvals?.OFFICERS?.map((each, i)=> i === OfficerIndex ? {...findApprov, PARTICIPANTS:[...findApprov?.PARTICIPANTS?.split(',')?.filter((_, i)=> i !== pIndex)].join(',')   } : each)]}

      // const appUI = {
      //   ...approvalsForUi, OFFICERS: [...approvalsForUi?.OFFICERS?.map((each, i)=> i === OfficerIndex ? {...findApprovUi, PARTICIPANTS:findApprovUi?.PARTICIPANTS?.filter((_, i)=> i !== pIndex)   } : each)]
      // }

      // console.log(appr, appUI)

      setApprovals({
        ...approvals,
        OFFICERS: [
          ...approvals?.OFFICERS?.map((each, i) =>
            i === OfficerIndex
              ? {
                  ...findApprov,
                  PARTICIPANTS: [
                    ...findApprov?.PARTICIPANTS?.split(",")?.filter(
                      (_, i) => i !== pIndex
                    ),
                  ].join(","),
                }
              : each
          ),
        ],
      });

      setApprovalsForUi({
        ...approvalsForUi,
        OFFICERS: [
          ...approvalsForUi?.OFFICERS?.map((each, i) =>
            i === OfficerIndex
              ? {
                  ...findApprovUi,
                  PARTICIPANTS: findApprovUi?.PARTICIPANTS?.filter(
                    (_, i) => i !== pIndex
                  ),
                }
              : each
          ),
        ],
      });

      setParticipantInp([]);
      setParticipantInpForUi([]);
      setQualificationInp("");
      setEditingOfficerIndex(null);
    }
  };





  const handleSubmitFile = (theFile)=>{
    // console.log(theFile)
  }


  const closeCapture = ()=>{
    setShowWebcam(false)
  }




  return (
    <div className="flex flex-col h-full relative">

      <ImageCameraMedia showWebcam={showWebcam}  onSubmit={handleSubmitFile} onClose={closeCapture}/>
      <div className="w-[80%] mx-auto mt-5">
        <PageHeader
          header_text={"Packages"}
          breadCrumb_data={[{ name: "Home" }, { name: "Packages" }]}
          buttonProp={null}
        />
      </div>

      {/* <div className="w-[5rem] bg-red-300 h-auto text-wrap break-words"> lsakdjvnasjnfjkasndfjkasdnfjnsadjf</div> */}

      <div className="mt-10 border-t-2"></div>

      <div className="w-[80%] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_200px] min-h-full gap-7 md:gap-20 lg:gap-28">
          <form
            // onSubmit={handleSubmit(saveChange)}
            className="min-h-full py-10  flex flex-col gap-4 w-full overflow-hidden"
          >
            <h4 className="header_h3 text-2xl">
              {currentSetup?.toUpperCase()}
            </h4>
            <div className="bg-white border rounded  shadow-messagecard flex justify-center flex-col gap-4">
              <div className="flex justify-between items-center border-b py-3 px-5">
                <h3 className="header_h3 text-medium" onClick={()=>setShowWebcam(false)}>
                  {hasInitialData ? "EDIT" : "SET"}{" "}
                  {currentSetup?.toUpperCase()}
                </h3>
              </div>

              {(allApprovals?.length > 0 || hasInitialData) && (
                <div className="flex flex-col w-full py-1 border-b-2 gap-1">
                  <div className="flex justify-between py-2 gap-1 items-center">
                    <h5 className="header_h3 text-xs px-5">
                      AVAILABLE APPROVALS
                    </h5>
                    <div className="flex justify-end  px-5">
                      {hasInitialData && (
                        <button
                          onClick={startAdd}
                          className="border-2 rounded-lg border-btnColor px-1 py-1 header_h3 outline-none hover:border-btnColor/50 text-btnColor flex items-center gap-1  "
                        >
                          <Plus size={15} strokeWidth={4} />{" "}
                          <span className=" font-bold px-1">Add Approval</span>
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="flex mx-4  gap-4  w-full overflow-x-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-slate-600  px-1  my-1 pr-8">
                    {allApprovals.length === 0 ? (
                      <div className="flex items-center justify-center">
                        <span
                          className=" text-gray-300 text-medium
                              "
                        >
                          No approval yet...
                        </span>
                      </div>
                    ) : (
                      allApprovals?.map((appr, i) => (
                        <div key={i} className="flex flex-col py-2 relative">
                          <div
                            className={`bg-white px rounded-md shadow flex gap-2 px-3 py-[0.45rem] border-1 border-btnColor  items-center justify-center ${
                              indexToEdit === i
                                ? "border-dashed border-2"
                                : " border-solid"
                            }`}
                          >
                            {/* border-amber-500 */}
                            <Avatar
                              alt={appr?.APPROVAL_TITLE}
                              className="flex-shrink-0 w-6 h-6"
                              // size="sm"
                              icon={<BsInfo />}
                            />

                            <div className="flex flex-col  gap-y-[0.1rem] w-[8rem] py-1">
                              <span className=" truncate w-[8rem]  font-medium text-slate-400">
                                {appr?.APPROVAL_TITLE?.toUpperCase()}
                              </span>
                              <div className="flex gap-2 items-center">
                                <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                                <span className=" truncate w-[8rem] text-[0.75rem] ">
                                  {appr?.APPROVAL_LEVEL}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2 absolute px-2 py-1 shadow-md border rounded-lg  -right-2 -top-[0.35rem] bg-white">
                            <EditIcon
                              size={17}
                              strokeWidth={1.8}
                              className="bg-white  border-gray-200 text-bgDarkColor rounded-full  cursor-pointer hover:text-green-400"
                              onClick={() => startEditing(i)}
                            />
                            <CiCircleRemove
                              size={17}
                              strokeWidth={0.8}
                              className="text-white  border-gray-200 bg-bgDarkColor rounded-full  cursor-pointer hover:bg-red-400"
                              onClick={() => removeSavedApprovalObj(i)}
                            />
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {(isEditing || !hasInitialData || isAdding) && (
                <div className="bg-white flex justify-center flex-col gap-4">
                  <div className="flex gap-10 gap-y-5 items-center border-b py-3 px-5">
                    <h5 className="header_h3 text-xs">APPROVAL TITLE</h5>

                    <input
                      type="text"
                      placeholder="approval title"
                      className={`border rounded-md  flex-1  focus:border-transparent 
                          px-2 py-2 ${
                            errors?.title
                              ? "focus:outline-none focus:ring-1  focus:ring-red-500 border-red-500"
                              : "border-slate-200 focus:outline-none focus:ring-2"
                          }`}
                      {...register("title", {
                        required: {
                          value: true,
                          message: "Title is required",
                        },
                      })}
                    />
                  </div>
                  <div className="flex gap-10 gap-y-5 items-center border-b py-3 px-5">
                    <h5 className="header_h3 text-xs">APPROVAL LEVEL</h5>

                    <input
                      type="number"
                      placeholder="approval level"
                      className={`border rounded-md  flex-1  focus:border-transparent 
                          px-2 py-2 ${
                            errors?.level
                              ? "focus:outline-none focus:ring-1  focus:ring-red-500 border-red-500"
                              : "border-slate-200 focus:outline-none focus:ring-2"
                          }`}
                      {...register("level", {
                        required: {
                          value: true,
                          message: "Level is required",
                        },
                      })}
                    />
                  </div>

                  <div className="flex gap-10 gap-y-5 items-center border-b py-3 px-5">
                    <Checkbox
                      className="gap-3"
                      aria-label="reassign"
                      isSelected={reassign}
                      onValueChange={setReassign}
                    >
                      <h6 className="header_h3 text-xs text-gray-600">
                        CAN REASSIGN
                      </h6>
                      <h6 className=" text-xs text-gray-400">
                        If an approval can be reassign to other participant
                      </h6>
                    </Checkbox>
                  </div>

                  <div className="flex gap-10 gap-y-5 items-center border-b py-3 px-5">
                    <Checkbox
                      className="gap-3"
                      aria-label="auto"
                      isSelected={automatic}
                      onValueChange={setAutomatic}
                      // {...register('automatic', {

                      // })}
                    >
                      <h6 className="header_h3 text-xs text-gray-600">
                        AUTOMATICALLY ASSIGNED
                      </h6>
                      <h6 className=" text-xs text-gray-400">
                        If an approval can be automatically chosen
                      </h6>
                    </Checkbox>
                  </div>

                  <div className="flex -pt-2  px-5">
                    <Separator separator_text={"Officers"} />
                  </div>

                  <div className="flex gap-10 gap-y-5 items-center border-b py-3 px-5">
                    <Checkbox
                      className="gap-3"
                      aria-label="reassign"
                      // isSelected={reassign}
                      // onValueChange={setReassign}
                    >
                      <h6 className="header_h3 text-xs text-gray-600">
                         REQUIRE HANDLING OVER
                      </h6>
                      <h6 className=" text-xs text-gray-400">
                      If the approval  required Handling over
                      </h6>
                    </Checkbox>
                  </div>
                  <div className="flex gap-10 gap-y-5 items-center border-b py-3 px-5">
                    <Checkbox
                      className="gap-3"
                      aria-label="reassign"
                      // isSelected={reassign}
                      // onValueChange={setReassign}
                    >
                      <h6 className="header_h3 text-xs text-gray-600">
                        REQUIRE INTERNAL APPROVAL
                      </h6>
                      <h6 className=" text-xs text-gray-400">
                        If the approval  required Internal approval
                      </h6>
                    </Checkbox>
                  </div>


                  <div className="flex gap-10 gap-y-5 items-center  py-3 px-5">
                    <h5 className="header_h3 text-xs">QUALIFICATION</h5>
                    <AvailableQualificartion />
                  </div>
                  <div className="flex gap-10 gap-y-5 items-center px-5">
                    <h5 className="header_h3 text-xs">PARTICIPANTS</h5>
                    <div className="flex flex-col w-full gap-1">
                      {/* <AvailableUser /> */}
                      {/* <MultiUserSelect
                        participantLoading={participantLoading}
                        participantInp={participantInp}
                        participantLoaded={participantLoaded}
                        qualificationInp={qualificationInp}
                        onPickParticipant={onPickParticipant}
                        participantInpForUi={participantInpForUi}
                      /> */}
                      <MultiselectAntd
                        participantLoading={participantLoading}
                        participantInp={participantInp}
                        participantLoaded={participantLoaded}
                        qualificationInp={qualificationInp}
                        onPickParticipant={onPickParticipant}
                        participantInpForUi={participantInpForUi}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col border-b">
                    <div className="flex justify-end  py-1 pb-2 px-5">
                      <button
                        // type="submit"
                        disabled={
                          !qualificationInp || participantInp?.length === 0
                        }
                        onClick={handleSubmit(addChange)}
                        className="border-2 rounded-xl border-btnColor px-1 py-1 header_h3 outline-none hover:border-btnColor/50 text-btnColor flex items-center gap-1  "
                      >
                        {editingOfficerIndex === null && (
                          <>
                            <Plus size={15} strokeWidth={4} />{" "}
                          </>
                        )}
                        <span className=" font-bold">
                          {editingOfficerIndex !== null ? "UPDATE" : "ADD"}
                        </span>
                      </button>
                    </div>

                    <div className="flex flex-col w-full py-1">
                      {
                        
                        <div className="flex mx-4  gap-3  w-full overflow-x-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-slate-600  my-2 px-4">
                          {approvalsForUi?.OFFICERS?.map((officer, ind) => (
                            <div
                              key={officer?.QUALIFICATION}
                              className="flex flex-col py-2 relative  mx-2"
                            >
                              <div
                                className={`bg-white   rounded-md shadow flex gap-2 px-3 py-4 border  items-center justify-center  ${
                                  editingOfficerIndex === ind &&
                                  "border-dotted border-2 border-btnColor"
                                }`}
                              >
                                <div className={`w-fit  ${officer?.QUALIFICATION?.length > 12 ? 'min-w-40': 'min-w-24'}`}>{officer?.QUALIFICATION}</div>

                                {/* popup */}

                                <Tooltip
                                  content={
                                    <div className="flex flex-col gap-2  py-2">
                                      {officer?.PARTICIPANTS?.map((usr, i) => (
                                        <div
                                          key={i}
                                          className="flex gap-2 items-center text-gray-600 group  hover:bg-gray-100 p-1 px-3 rounded-md"
                                        >
                                          {(officer?.QUALIFICATION ===
                                            "STAFF" ||
                                            officer?.QUALIFICATION ===
                                              "DIRECTORATE HEAD" ||
                                            officer?.QUALIFICATION ===
                                              "DEPARTMENTAL HEAD" ||
                                            officer?.QUALIFICATION ===
                                              "UNIT HEAD" ||
                                            officer?.QUALIFICATION ===
                                              "REGIONAL HEAD") && (
                                            <div>
                                              {usr?.FILE_NAME?.includes(
                                                "http"
                                              ) ? (
                                                <Avatar
                                                  alt={usr?.name}
                                                  className="flex-shrink-0"
                                                  size="sm"
                                                  src={usr?.FILE_NAME}
                                                />
                                              ) : (
                                                <Avatar
                                                  alt={usr?.name}
                                                  className="flex-shrink-0"
                                                  size="sm"
                                                  name={usr?.label?.trim()[0]}
                                                />
                                              )}
                                            </div>
                                          )}

                                          <div className="flex justify-between gap-4 items-center flex-1">
                                            <span className="text-small flex-1">
                                              {usr.label}
                                            </span>
                                            <MdOutlineDeleteSweep
                                              onClick={() =>
                                                removeParticipant(
                                                  i,
                                                  ind,
                                                  officer?.QUALIFICATION,
                                                  officer?.PARTICIPANTS?.length
                                                )
                                              }
                                              size={20}
                                              className=" text-red-300 group-hover:text-red-500 cursor-pointer"
                                            />
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  }
                                  placement="right"
                                  showArrow
                                >
                                  <Avatar
                                    alt={officer?.QUALIFICATION}
                                    className="flex-shrink-0 w-6 h-6 cursor-pointer"
                                    // size="sm"
                                    name={officer?.PARTICIPANTS?.length.toString()}
                                    // name={officer?.PARTICIPANTS?.split(",")?.length.toString()}
                                  />
                                </Tooltip>
                              </div>

                              <div className="flex gap-2 absolute px-2 py-1 shadow-md border rounded-lg  -right-2 -top-[0.35rem] bg-white">
                                <Edit
                                  size={18}
                                  strokeWidth={2.1}
                                  className=" text-white bg-purple-400 border-gray-200  rounded-full   cursor-pointer hover:bg-purple-500 px-1  hover:text-white"
                                  onClick={() =>
                                    startEditingOfficers(
                                      officer?.QUALIFICATION,
                                      ind
                                    )
                                  }
                                />
                                <CiCircleRemove
                                  size={17}
                                  strokeWidth={0.8}
                                  className="text-white  border-gray-200 bg-bgDarkColor rounded-full cursor-pointer hover:bg-red-400"
                                  onClick={() =>
                                    removeAddedOfficer(officer?.QUALIFICATION)
                                  }
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      }
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center border-b py-5 px-5 gap-3 flex-wrap md:hidden">
                {approvals?.OFFICERS?.length > 0 && (
                  <div>
                    <button
                      onClick={handleSubmit(saveChange)}
                      className="bg-btnColor px-4 py-2 header_h3 outline-none  text-white rounded hover:bg-btnColor/70"
                    >
                      SAVE CHANGE
                    </button>
                  </div>
                )}
             
                {((!hasInitialData &&
                  allApprovals?.length > 0 &&
                  !approvals.APPROVAL_TITLE) ||
                  resave) && (
                  <button
                    onClick={submit}
                    className="bg-btnColor px-4 py-2 header_h3 outline-none  text-white rounded hover:bg-btnColor/70"
                  >
                    SUBMIT
                  </button>
                )}
              </div>
            </div>
          </form>

          <div className="border-0   md:border-l-2  h-screen relative px-5 font-Exo text-gray-500">
            <div className="flex flex-col py-5 md:py-28 text-sm gap-3">
              {comapanyPackage?.map((pk) => (
                <div
                  key={pk?.PACKAGE_ID}
                  className={`${
                    currentSetup === pk?.PACKAGE_NAME && "font-bold"
                  } relative cursor-pointer`}
                  onClick={() => packageFlow(pk)}
                >
                  {pk?.PACKAGE_NAME}
                  {/* {currentSetup === pk?.PACKAGE_NAME && ( */}
                  <span
                    className={`w-3 h-3 rounded-full  ${
                      currentSetup === pk?.PACKAGE_NAME
                        ? "bg-blue-500/80"
                        : "bg-gray-300"
                    }  border-2 border-white absolute -left-[1.7rem] top-1 duration-200 transition-all`}
                  ></span>
                  {/* )} */}
                </div>
              ))}

              <div className="md:flex justify-between items-center  py-2  gap-3 flex-wrap  hidden ">
                {approvals?.OFFICERS?.length > 0 && (
                  <div>
                    <button
                      onClick={handleSubmit(saveChange)}
                      className="bg-btnColor px-4 py-2 header_h3 outline-none  text-white rounded hover:bg-btnColor/70"
                    >
                      SAVE CHANGE
                    </button>
                  </div>
                )}
             
                {((!hasInitialData &&
                  allApprovals?.length > 0 &&
                  !approvals.APPROVAL_TITLE) ||
                  resave) && (
                  <button
                    onClick={submit}
                    className="bg-btnColor px-4 py-2 header_h3 outline-none  text-white rounded hover:bg-btnColor/70"
                  >
                    SUBMIT
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <Header/>
        <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} setFilteredData={setFilteredData} packages={packages} />

        <PackageContainer packages={packages} filteredData={filteredData} searchValue={searchValue}  /> */}
    </div>
  );
};

export default AdminSettings;
