/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button, SelectItem, Textarea } from "@nextui-org/react";
import { DatePicker } from "antd";
import Label from "../../../components/forms/FormElements/Label";
import Input from "../../../components/forms/FormElements/Input";
import toast from "react-hot-toast";
import Select from "react-tailwindcss-select";
import { useState } from "react";

const styleOptions = [
  { value: "Grade", label: "Grade" },
  { value: "Step", label: "Step" },
  { value: "Rank", label: "Rank" },
];

const staffSelectionOptions = [
  { value: "Mass Selection", label: "Mass Selection" },
  { value: "Individual", label: "Individual" },
];


const individualStaffOptions = [
  { value: "Mr Benjamin", label: "Mr Benjamin" },
  { value: "Prof TT", label: "Prof TT" },
  { value: "Areo Adeolu", label: "Areo Adeolu" },
];

const massStaffOptions = [
  { value: "ALL", label: "ALL" },
  { value: "Mr Benjamin", label: "Mr Benjamin" },
  { value: "Prof TT", label: "Prof TT" },
  { value: "Areo Adeolu", label: "Areo Adeolu" },
];

const gradeSelectionOptions = [
  { value: "Specify", label: "Specify" },
  { value: "Move to next step", label: "Move to next step" },
];

const rankOptions = [
  { value: "CFO", label: "CFO" },
  { value: "CDS", label: "CDS" },
];

const PromotionForm = ({ newPromotion, setNewPromotion }) => {
  const [promotionForm, setPromotionForm] = useState({
    promotionStyle: "",
    staff_selection_type: "",
    selectedStaff: null,
    current_grade: "",
    current_step: "",
    current_rank: "",
    grade_selection: "",
    step_selection: "",
    new_grade: "",
    new_step: "",
    new_rank: "",
    effective_date: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      newPromotion.first_name == "" ||
      newPromotion.last_name == "" ||
      newPromotion.promoted_from == "" ||
      newPromotion.promoted_to == "" ||
      newPromotion.promotion_date == "" ||
      newPromotion.promotion_reason == ""
    ) {
      toast("Every input in this field must be filled");
      // console.log("Every input in this field must be filled");
    } else {
      // console.log(newPromotion);
    }
  };








const onmultiChange = (value)=>{
  // console.log(value)


  const findAll =  value?.find(vl => vl.value === "ALL")
  
  if(findAll){
    setPromotionForm((prev) => {
      return { ...prev, selectedStaff: [{ value: "ALL", label: "ALL" }] };
    });
    return
  }
  
    setPromotionForm((prev) => {
      return { ...prev, selectedStaff: value };
    });

}



  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow">
      <div className="my-4 grid grid-cols-1 md:grid-cols-3 items-center gap-1 border-b pb-4">
        <Label htmlFor="duration">Promotion Style</Label>
        <div className="w-full md:col-span-2">
          <Select
            value={promotionForm.promotionStyle}
            options={styleOptions}
            // isSearchable={true}
            onChange={(value) => {
              setPromotionForm((prev) => {
                return { ...prev, promotionStyle: value };
              });
            }}
          />
        </div>
      </div>
      <div className="my-4 grid grid-cols-1 md:grid-cols-3 items-center gap-1 border-b pb-4">
        <Label htmlFor="duration">Staff Selection Type</Label>
        <div className="w-full md:col-span-2">
          <Select
            value={promotionForm.staff_selection_type}
            options={staffSelectionOptions}
            // isSearchable={true}
            onChange={(value) => {
              setPromotionForm((prev) => {
                return { ...prev, staff_selection_type: value };
              });
            }}
          />
        </div>
      </div>

      {/* staff */}

      <div className="my-4 grid grid-cols-1 md:grid-cols-3 items-center gap-1 border-b pb-4">
        <Label htmlFor="duration">Select Staff</Label>
        <div className="w-full md:col-span-2">
          <Select
            value={promotionForm.selectedStaff}
            options={promotionForm?.staff_selection_type.value === 'Individual' ? individualStaffOptions :  massStaffOptions}
            isMultiple={promotionForm?.staff_selection_type.value !== 'Individual'}
            isSearchable={true}
            onChange={onmultiChange}
          />
        </div>
      </div>
      {/* <div className="my-4 grid grid-cols-1 md:grid-cols-3 items-center gap-1 border-b pb-4">
        <Label htmlFor="duration">Select Staff</Label>
        <div className="w-full md:col-span-2">
          <Select
            value={promotionForm.selectedStaff}
            options={massStaffOptions}
            isMultiple
            isSearchable={true}
            onChange={(value) => {
              setPromotionForm((prev) => {
                return { ...prev, selectedStaff: value };
              });
            }}
          />
        </div>
      </div> */}
      {/* staff */}


  
    {
      promotionForm?.staff_selection_type.value === 'Individual' && 
      <div className="my-4 grid grid-cols-1 md:grid-cols-3 items-center gap-1 border-b pb-4">
        <Label htmlFor="duration">Current {promotionForm?.promotionStyle.value}</Label>
        <div className="w-full md:col-span-2">
          <Input
            type="text"
            disabled
            value="current value"
            className="w-full md:col-span-2"
            onChange={(e) => {
              setNewPromotion((prev) => {
                return { ...prev, promoted_from: e.target.value };
              });
            }}
          />
        </div>
      </div>
    }



    {
      (promotionForm?.promotionStyle.value  === 'Grade' ||  promotionForm?.promotionStyle.value  === "Step")  && 
        <div className="my-4 grid grid-cols-1 md:grid-cols-3 items-center gap-1 border-b pb-4">
          <Label htmlFor="duration">{promotionForm?.promotionStyle.value} Selection</Label>
          <div className="w-full md:col-span-2">
            <Select
              value={promotionForm.grade_selection}
              options={gradeSelectionOptions}
              // isSearchable={true}
              onChange={(value) => {
                setPromotionForm((prev) => {
                  return { ...prev, grade_selection: value };
                });
              }}
            />
          </div>
        </div>
    }
    {
      (promotionForm?.grade_selection.value  === 'Specify')  && 
      <div className="my-4 grid grid-cols-1 md:grid-cols-3 items-center gap-1 border-b pb-4">
          <Label htmlFor="duration">New {promotionForm?.promotionStyle.value}</Label>
          <div className="w-full md:col-span-2">
            <Input
            type="text"
            value={promotionForm.new_grade }
            className="w-full md:col-span-2"
            onChange={(e) => {
              setPromotionForm((prev) => {
                return { ...prev, new_grade: e.target.value };
              });
            }}
          />
          </div>
        </div>
    }




    {/* rank rankOptions */}

    {
      promotionForm?.promotionStyle.value  === 'Rank' &&
      <div className="my-4 grid grid-cols-1 md:grid-cols-3 items-center gap-1 border-b pb-4">
        <Label htmlFor="duration">Select New Rank</Label>
        <div className="w-full md:col-span-2">
          <Select
            value={promotionForm.new_rank}
            options={rankOptions}
            // isSearchable={true}
            onChange={(value) => {
              setPromotionForm((prev) => {
                return { ...prev, new_rank: value };
              });
            }}
          />
        </div>
      </div>
    }




     

      
      <div className="my-4 grid grid-cols-1 md:grid-cols-3 items-center gap-1 border-b pb-4">
        <Label htmlFor="duration">Effective Date</Label>
        <div className="w-full md:col-span-2">
          <DatePicker
            onChange={(e) => {
              setNewPromotion((prev) => {
                return { ...prev, promotion_date: e.$d };
              });
              setPromotionForm((prev) => {
                return { ...prev, effective_date:  e.$d  };
              });
            }}
            className=" w-full border outline-none focus:border-transparent my-1 h-10 rounded-md focus:outline-none"
          />
        </div>
      </div>

      <div className="flex justify-end mt-4 gap-4">
        <Button
          type="button"
          size="sm"
          color="default"
          className="text-white rounded font-helvetica "
        >
          Draft
        </Button>
        <Button
          type="submit"
          size="sm"
          // color="primary"
          className="text-white rounded font-helvetica bg-btnColor"
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default PromotionForm;
