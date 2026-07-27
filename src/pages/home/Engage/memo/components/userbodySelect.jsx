import { useCallback, useEffect, useState } from "react";
import { Select, Space } from "antd";
import Label from "../../../../../components/forms/FormElements/Label";
import propTypes from "prop-types";
import useCurrentUser from "../../../../../hooks/useCurrentUser";
import {
  useGetAllDepartment,
  useGetAllDirectorate,
  useGetAllRegion,
  useGetAllStaff,
  useGetAllUnits,
} from "../../../../../API/memo";
import { Avatar } from "@nextui-org/react";
import useMemoData from "../../../../../hooks/useMemoData";

const recipientOptions = [
  { label: "STAFF", value: "STAFF" },
  { label: "DEPARTMENT", value: "DEPARTMENT" },
  { label: "UNIT", value: "UNIT" },
  { label: "DIRECTORATE", value: "DIRECTORATE" },
  { label: "REGION", value: "REGION" },
];

const UserbodySelect = () => {
  const { userData } = useCurrentUser();
  const [isLoading, setisLoading] = useState(false);
  const [selectData, setSelectData] = useState([]);
  const { data: allStaff, refetch: refetchStaff } = useGetAllStaff(userData?.data?.COMPANY_ID);
  const { data: allDept, refetch: refetchDept } = useGetAllDepartment(userData?.data?.COMPANY_ID);
  const { data: allDirect, refetch: refetchDirect } = useGetAllDirectorate(userData?.data?.COMPANY_ID);
  const { data: allReg, refetch: refetchReg } = useGetAllRegion(userData?.data?.COMPANY_ID);
  const { data: allUnit, refetch: refetchUnit } = useGetAllUnits(userData?.data?.COMPANY_ID);

  const { updateData, data } = useMemoData();

  const onSelectrecipient = (val) => {
    
    if (data?.recipient_type === "STAFF") {
      const userIDs = val?.map((each) => each?.value) ;

      updateData({ recipients: userIDs, recipient_value_array: val, to_value: null, recipient_value: null });
    } else {
      updateData({ recipient_value: val?.value, to_value: val?.label,  recipients: [], recipient_value_array: [],   });
    }
  };

  const handleSwitch = (val) => {
    if(data?.recipient_type !== val){
       updateData({ recipient_value: null, recipients: [], recipient_value_array: [], to_value: null });
    }
     updateData({ recipient_type: val })

  };


  useEffect(() => {

    const load = ()=>{
      refetchStaff()
      refetchDept()
      refetchDirect()
      refetchReg()
      refetchUnit()
    }

    load()

  }, [refetchStaff, refetchDept, refetchDirect, refetchReg, refetchUnit ])
  

const processParticipants = useCallback(
  () => {
    setisLoading(true);
    let value;
    switch (data?.recipient_type) {
      case "STAFF":
        value = allStaff?.map((val) => {
          val.value = val?.STAFF_ID;
          val.label = val?.FIRST_NAME + " " +  val?.LAST_NAME + " " + ( val?.DESIGNATION ? ("(" + val?.DESIGNATION + ")" ) : '');
          return val;
        });
        setSelectData(value);
        setisLoading(false);
        return value;
      case "DIRECTORATE":
        value = allDirect?.map((val) => {
          val.value = val?.DIRECTORATE_ID;
          val.label = val?.DIRECTORATE_NAME;
          return val;
        });
        setSelectData(value);
        setisLoading(false);
        return value;
      case "DEPARTMENT":
        value = allDept?.map((val) => {
          val.value = val?.DEPARTMENT_ID;
          val.label = val?.DEPARTMENT_NAME;
          return val;
        });
        setSelectData(value);
        setisLoading(false);
        return value;
      case "REGION":
        value = allReg?.map((val) => {
          val.value = val?.REGION_ID;
          val.label = val?.REGION_NAME;
          // val.value = val?.STAFF_ID;
          // val.label = `${val?.FIRST_NAME} ${val?.LAST_NAME} (${val?.REGION_NAME})`;
          return val;
        });
        setSelectData(value);
        setisLoading(false);
        return value;
      case "DIRECTORATE HEAD":
        value = []?.map((val) => {
          val.value = val?.DIRECTORATE_ID;
          val.label = val?.DIRECTORATE_NAME;
          // val.label = val?.FIRST_NAME + " " + val?.LAST_NAME;
          return val;
        });
        setSelectData(value);
        setisLoading(false);
        return value;
      case "UNIT":
        value = allUnit?.map((val) => {
          val.value = val?.UNIT_ID;
          val.label = val?.UNIT_NAME;
          return val;
        });
        setSelectData(value);
        setisLoading(false);
        return value;
      case "DEPARTMENTAL HEAD":
        value = []?.map((val) => {
          val.value = val?.DEPARTMENT_ID;
          val.label = val?.DEPARTMENT_NAME;
          // val.label = val?.FIRST_NAME + " " + val?.LAST_NAME;
          return val;
        });
        setSelectData(value);
        setisLoading(false);
        return value;
      case "UNIT HEAD":
        value = []?.map((val) => {
          val.value = val?.UNIT_ID;
          val.label = val?.UNIT_NAME;
          return val;
        });
        setSelectData(value);
        setisLoading(false);
        return value;

      case "DESIGNATION":
        value = []?.map((val) => {
          val.value = val?.DESIGNATION_ID;
          val.label = val?.DESIGNATION_NAME;
          return val;
        });
        setSelectData(value);
        setisLoading(false);
        return value;
      case "GRADE":
        value = []?.map((val) => {
          val.value = val?.GRADE?.toString();
          val.label = val?.GRADE?.toString();
          return val;
        });
        setSelectData(value);
        setisLoading(false);
        return value;
      default:
        break;
    }
    setSelectData(value);
    setisLoading(false);
  },
  [data?.recipient_type, allDept, allDirect, allReg, allStaff, allUnit]
)



  useEffect(() => {
    processParticipants()
  }, [processParticipants]);




  // const processParticipants = (name) => {
  //   setisLoading(true);
  //   let value;
  //   switch (name) {
  //     case "STAFF":
  //       value = allStaff?.map((val) => {
  //         val.value = val?.STAFF_ID;
  //         val.label = val?.FIRST_NAME + " " + val?.LAST_NAME;
  //         return val;
  //       });
  //       setSelectData(value);
  //       setisLoading(false);
  //       return value;
  //     case "DIRECTORATE":
  //       value = allDirect?.map((val) => {
  //         val.value = val?.DIRECTORATE_ID;
  //         val.label = val?.DIRECTORATE_NAME;
  //         return val;
  //       });
  //       setSelectData(value);
  //       setisLoading(false);
  //       return value;
  //     case "DEPARTMENT":
  //       value = allDept?.map((val) => {
  //         val.value = val?.DEPARTMENT_ID;
  //         val.label = val?.DEPARTMENT_NAME;
  //         return val;
  //       });
  //       setSelectData(value);
  //       setisLoading(false);
  //       return value;
  //     case "REGION":
  //       value = allReg?.map((val) => {
  //         val.value = val?.REGION_ID;
  //         val.label = val?.REGION_NAME;
  //         // val.value = val?.STAFF_ID;
  //         // val.label = `${val?.FIRST_NAME} ${val?.LAST_NAME} (${val?.REGION_NAME})`;
  //         return val;
  //       });
  //       setSelectData(value);
  //       setisLoading(false);
  //       return value;
  //     case "DIRECTORATE HEAD":
  //       value = []?.map((val) => {
  //         val.value = val?.DIRECTORATE_ID;
  //         val.label = val?.DIRECTORATE_NAME;
  //         // val.label = val?.FIRST_NAME + " " + val?.LAST_NAME;
  //         return val;
  //       });
  //       setSelectData(value);
  //       setisLoading(false);
  //       return value;
  //     case "UNIT":
  //       value = allUnit?.map((val) => {
  //         val.value = val?.UNIT_ID;
  //         val.label = val?.UNIT_NAME;
  //         return val;
  //       });
  //       setSelectData(value);
  //       setisLoading(false);
  //       return value;
  //     case "DEPARTMENTAL HEAD":
  //       value = []?.map((val) => {
  //         val.value = val?.DEPARTMENT_ID;
  //         val.label = val?.DEPARTMENT_NAME;
  //         // val.label = val?.FIRST_NAME + " " + val?.LAST_NAME;
  //         return val;
  //       });
  //       setSelectData(value);
  //       setisLoading(false);
  //       return value;
  //     case "UNIT HEAD":
  //       value = []?.map((val) => {
  //         val.value = val?.UNIT_ID;
  //         val.label = val?.UNIT_NAME;
  //         return val;
  //       });
  //       setSelectData(value);
  //       setisLoading(false);
  //       return value;

  //     case "DESIGNATION":
  //       value = []?.map((val) => {
  //         val.value = val?.DESIGNATION_ID;
  //         val.label = val?.DESIGNATION_NAME;
  //         return val;
  //       });
  //       setSelectData(value);
  //       setisLoading(false);
  //       return value;
  //     case "GRADE":
  //       value = []?.map((val) => {
  //         val.value = val?.GRADE?.toString();
  //         val.label = val?.GRADE?.toString();
  //         return val;
  //       });
  //       setSelectData(value);
  //       setisLoading(false);
  //       return value;
  //     default:
  //       break;
  //   }
  //   setSelectData(value);
  //   setisLoading(false);
  // };




  return (
    <div className="flex flex-col">
      <div className="_compose_to mb-4">
        <Label>Recipient Category</Label>
        <Select
          size={"large"}
          placeholder="Search Recipient"
          onChange={handleSwitch}
          className="border-1 border-gray-300 rounded-md"
          style={{
            width: "100%",
          }}
          value={data?.recipient_type}
          variant="borderless"
          options={recipientOptions}
        />
      </div>

      {data?.recipient_type && !isLoading && (
        <div className="_compose_to mb-4">
          <Label>Select Recipient</Label>
          <Select
            labelInValue
            mode={data?.recipient_type === "STAFF" ? "multiple" : ""}
            // maxCount={selectedRecipient === 'STAFF' ? 100 : 1}
            size={"large"}
            placeholder="Search Recipient"
            onChange={onSelectrecipient}
            className="border-1 border-gray-300 rounded-md"
            style={{
              width: "100%",
            }}
            value={data?.recipient_type === "STAFF" ?data?.recipients : data?.recipient_value}
            optionFilterProp="label"
            loading={isLoading}
            variant="borderless"
            options={selectData}
            optionRender={(user) => (
              <Space className="cursor-pointer  w-full  px-2 rounded-xl ">
                {data?.recipient_type === "STAFF" ? (
                  <div className="flex gap-2 items-center  cursor-pointer px-2 py-1">
                    {user?.data?.FILE_NAME?.includes("http") ? (
                      <Avatar
                        alt={user?.data?.name}
                        className="flex-shrink-0"
                        size="sm"
                        src={user?.data?.FILE_NAME}
                      />
                    ) : (
                      <Avatar
                        alt={user?.data?.name}
                        className="flex-shrink-0"
                        size="sm"
                        name={user?.data?.label?.trim()[0]}
                      />
                    )}

                    <div className="flex flex-col">
                      <span className="text-xs font-medium">
                        {user?.data?.label}
                      </span>
                    </div>
                  </div>
                ) : data?.recipient_type === "UNIT" ||
                  data?.recipient_type === "DIRECTORATE" ||
                  data?.recipient_type === "DEPARTMENT" ||
                  data?.recipient_type === "REGION" ? (
                  <div className="flex gap-2 items-center  cursor-pointer px-2 py-1">
                    <div className="flex flex-col">
                      <span className="text-xs font-medium">
                        {user?.data?.label}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-2 items-center text-gray-600"></div>
                )}
              </Space>
            )}
          />
        </div>
      )}
    </div>
  );
};

UserbodySelect.propTypes = {
  setRecipients: propTypes.func,
};
export default UserbodySelect;
