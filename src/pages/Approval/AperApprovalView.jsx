/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Drawer } from "antd";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import useCurrentUser from "../../hooks/useCurrentUser";
import { useGetProfile } from "../../API/profile";
import { useCreateAper, useGetActivePerformance } from "../../API/performance";
// import { errorToast, successToast } from "../../utils/toastMsgPop";
import PeriodSection from "../../components/core/performance/PeriodSection";
import T1_EmployeePotentialSection from "../../components/core/performance/template1/components/T1_EmployeePotentialSection";
import T1_PreliminaryAssessmentSection from "../../components/core/performance/template1/components/T1_PreliminaryAssessmentSection";
import T1_PerformanceCriteriaSection from "../../components/core/performance/template1/components/T1_PerformanceCriteriaSection";
// import ReportingOfficer from "../../components/core/performance/ReportingOfficer";
import T2_PreliminaryAssessmentSection from "../../components/core/performance/template2/components/T2_PreliminaryAssessmentSection";
import T2_PerformanceCriteriaSection from "../../components/core/performance/template2/components/T2_PerformanceCriteriaSection";
import T2_PlanForDevelopment from "../../components/core/performance/template2/components/T2_PlanForDevelopment";
import T2_EmployeePotentialSection from "../../components/core/performance/template2/components/T2_EmployeePotentialSection";
import T3_PreliminaryAssessmentSection from "../../components/core/performance/template3/T3_PreliminaryAssessmentSection";
import T3_PerformanceCriteriaSection from "../../components/core/performance/template3/T3_PerformanceCriteriaSection";
import T3_JobPerformanceSection from "../../components/core/performance/template3/T3_JobPerformanceSection";
import T3_StrengthAndWeaknessSection from "../../components/core/performance/template3/T3_StrengthAndWeaknessSection";
import T3_EmployeePotentialSection from "../../components/core/performance/template3/T3_EmployeePotentialSection";
import T3_CommentByAppraiseOfficer from "../../components/core/performance/template3/T3_CommentByAppraiseOfficer";
import T3_CounterSigningComment from "../../components/core/performance/template3/T3_CounterSigningComment";
// import T3_ReviewCommitee from "../../components/core/performance/template3/T3_ReviewCommitee";
import T3_TrainingNeedSection from "../../components/core/performance/template3/T3_TrainingNeedSection";
// import ReportOfficerComment from "../../components/core/performance/ReportOfficerComment";
import T4_PreliminaryAssessmentSection from "../../components/core/performance/template4/T4_PreliminaryAssessmentSection";
import T4_JobPerformanceSection from "../../components/core/performance/template4/T4_JobPerformanceSection";
import T4_CommentByAppraiseOfficer from "../../components/core/performance/template4/T4_CommentByAppraiseOfficer";
import T4_PerformanceCriteriaSection from "../../components/core/performance/template4/T4_PerformanceCriteriaSection";
import T4_StrengthAndWeaknessSection from "../../components/core/performance/template4/T4_StrengthAndWeaknessSection";
import T4_EmployeePotentialSection from "../../components/core/performance/template4/T4_EmployeePotentialSection";
import T4_CounterSigningComment from "../../components/core/performance/template4/T4_CounterSigningComment";
// import T4_ReviewCommitee from "../../components/core/performance/template4/T4_ReviewCommitee";
import T4_TrainingNeedSection from "../../components/core/performance/template4/T4_TrainingNeedSection";

import ExpandedDrawerWithButton from "../../components/modals/ExpandedDrawerWithButton";
import AddNoteRejection from "../../components/core/approvals/AddNoteRejection";
import { Chip, Spinner, useDisclosure } from "@nextui-org/react";
import { useApprovedApprovalRequest } from "../../API/api_urls/my_approvals";
import toast from "react-hot-toast";
import NoteDetailsApproval from "../../components/core/approvals/NoteDetailsApproval";
import { errorToast } from "../../utils/toastMsgPop";
import NoteForm from "../../components/core/performance/NoteForm";
import ApprovalHistory from "./ApprovalHistory";

export default function PerformanceApprovalDrawer({
  isOpen,
  setIsOpen,
  selectedTab,
  setSelectedTab,
  incomingData,
  handleClose,
  viewMode = false
}) {

  const [isDraft, setIsDraft] = useState(false);

  const { userData } = useCurrentUser();

  const { data: profile } = useGetProfile({
    key: "profile",
  });

  const { data: period } = useGetActivePerformance(
    userData?.data?.COMPANY_ID
  );

  const { mutate: mutateCreateAper, isPending } = useCreateAper();

  const {isOpen: isRejectModalOpen, onOpen: onRejectModalOpen, onClose: onRejectModalClose} = useDisclosure()

  const { mutateAsync: approveRequestAction, isPending:isApprovePending } = useApprovedApprovalRequest();

  const {
    isOpen: Loading,
    onOpen: startLoading,
    onClose: stopLoading,
  } = useDisclosure();

  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    reset,
    trigger,
    watch,
    control,
    formState,  
  } = useForm({
    defaultValues: {
      start_date: period?.start_date,
      end_date: period?.end_date,
      note: ''
    },
    
  });


// ----------------autoFill---------------

 const autoFillPreliminary = useCallback(()=>{
    const {section_one, section_two, section_three, section_four } = incomingData.data
    const sections = [section_one, section_two, section_three, section_four]
    setValue("section_two", sections )
 }, [incomingData, setValue])

 const autoFillJobPerformance = useCallback(()=>{
    const {job_performance_one, job_performance_two, job_performance_three, job_performance_four, job_performance_five, job_performance_six, job_performance_seven, job_performance_eight, job_performance_nine, job_performance_ten  } = incomingData.data
    const jPerformance = [job_performance_one, job_performance_two, job_performance_three, job_performance_four, job_performance_five, job_performance_six, job_performance_seven, job_performance_eight, job_performance_nine, job_performance_ten ]
    setValue("job_performance", jPerformance )
 }, [incomingData, setValue])

 const autoFillJobPerformanceScore = useCallback(()=>{
    const {job_performance_one_score, job_performance_two_score, job_performance_three_score, job_performance_four_score, job_performance_five_score, job_performance_six_score, job_performance_seven_score, job_performance_eight_score, job_performance_nine_score, job_performance_ten_score  } = incomingData.data

    const jPerformanceScore = [job_performance_one_score, job_performance_two_score, job_performance_three_score, job_performance_four_score, job_performance_five_score, job_performance_six_score, job_performance_seven_score, job_performance_eight_score, job_performance_nine_score, job_performance_ten_score ]
    setValue("job_performance_appraisal_ranks", jPerformanceScore )
 }, [incomingData, setValue])
 
 const autoFillPerformanceCriteria = useCallback(()=>{
  const {reporting_officer_rating_one, reporting_rating_one,
     reporting_officer_rating_two, reporting_rating_two, reporting_officer_rating_three, reporting_rating_three, reporting_officer_rating_four,reporting_rating_four, reporting_officer_rating_five, reporting_rating_five, reporting_officer_rating_six, reporting_rating_six,  reporting_officer_rating_seven, reporting_rating_seven, reporting_officer_rating_eight, reporting_rating_eight, reporting_officer_rating_nine,  reporting_rating_nine, reporting_officer_rating_ten, reporting_rating_ten, reporting_officer_rating_eleven, reporting_rating_eleven, reporting_officer_rating_twelve, reporting_rating_twelve, reporting_officer_rating_thirteen, reporting_rating_thirteen, reporting_officer_rating_fourteen, reporting_rating_fourteen,  reporting_officer_rating_fifteen, reporting_rating_fifteen  } = incomingData.data

    const reportRating = [reporting_officer_rating_one || reporting_rating_one, reporting_officer_rating_two || reporting_rating_two, reporting_officer_rating_three ||  reporting_rating_three, reporting_officer_rating_four || reporting_rating_four, reporting_officer_rating_five || reporting_rating_five, reporting_officer_rating_six || reporting_rating_six, reporting_officer_rating_seven || reporting_rating_seven, reporting_officer_rating_eight || reporting_rating_eight, reporting_officer_rating_nine || reporting_rating_nine, reporting_officer_rating_ten || reporting_rating_ten, reporting_officer_rating_eleven || reporting_rating_eleven, reporting_officer_rating_twelve || reporting_rating_twelve, reporting_officer_rating_thirteen || reporting_rating_thirteen, reporting_officer_rating_fourteen || reporting_rating_fourteen, reporting_officer_rating_fifteen || reporting_rating_fifteen]
    setValue("report_rating_ranks", reportRating )
 }, [incomingData, setValue])


 const autoFillStrengthWeakness = useCallback(()=>{
  const {staff_weakness, staff_weakness_correction, staff_strength, staff_strength_enhancement, average_score, start_date , end_date, employee_strength } = incomingData.data
    setValue("staff_weakness", staff_weakness )
    setValue("staff_weakness_correction", staff_weakness_correction )
    setValue("employee_strength", staff_strength || employee_strength )
    setValue("staff_strength", staff_strength )
    setValue("staff_strength_enhancement", staff_strength_enhancement )
    setValue("average_score", average_score )
    setValue("start_date", start_date )
    setValue("end_date", end_date )
 }, [incomingData, setValue])

 const autoFillStaffPotentials = useCallback(()=>{
  const {staff_growth_potential, unsatisafactory_comment, overall_evaluation, overall_evaluation_comment, steps_to_overcome_weakness, rating_comment  } = incomingData.data
    setValue("staff_growth_potential", staff_growth_potential )
    setValue("unsatisafactory_comment", unsatisafactory_comment )
    setValue("overall_evaluation", overall_evaluation )
    setValue("overall_evaluation_comment", overall_evaluation_comment )
    setValue("steps_to_overcome_weakness", steps_to_overcome_weakness )
    setValue("rating_comment", rating_comment )
 }, [incomingData, setValue])

 const autoFillComments = useCallback(()=>{
  const {appraisee_comment, counter_officer_comment} = incomingData.data
    setValue("appraisee_comment", appraisee_comment )
    setValue("countersigning_comment", counter_officer_comment )

 }, [incomingData, setValue])

 const autoFillTraining = useCallback(()=>{
  const {appraisee_training, training_recommendation, training_recommendation_purpose, reporting_officer_comment} = incomingData.data
    setValue("training_response", appraisee_training )
    setValue("training_recommendation", training_recommendation )
    setValue("training_recommendation_purpose", training_recommendation_purpose )
    setValue("reporting_officer_comment", reporting_officer_comment )

 }, [incomingData, setValue])

 const autoFillAcademic = useCallback(()=>{
  const {academic_one, academic_one_year, academic_two, academic_two_year, academic_three, academic_three_year, academic_four, academic_four_year, academic_five, academic_five_year, academic_six, academic_six_year
} = incomingData.data
    setValue("academic_one", academic_one )
    setValue("academic_one_year", academic_one_year )
    setValue("academic_two", academic_two )
    setValue("academic_two_year", academic_two_year )
    setValue("academic_three", academic_three )
    setValue("academic_three_year", academic_three_year )
    setValue("academic_four", academic_four )
    setValue("academic_four_year", academic_four_year )
    setValue("academic_five", academic_five )
    setValue("academic_five_year", academic_five_year )
    setValue("academic_six", academic_six )
    setValue("academic_six_year", academic_six_year )

 }, [incomingData, setValue])


 const autoFillPreliminaryForT12 = useCallback(()=>{
  const {help_appraisee, strength_help, employee_awareness, employee_reaction, employee_performance, appa_r_officer, training_objective, promotability, next_action} = incomingData.data
    setValue("help_appraisee", help_appraisee )
    setValue("strength_help", strength_help )
    setValue("employee_awareness", employee_awareness )
    setValue("employee_reaction", employee_reaction )
    setValue("employee_performance", employee_performance )
    setValue("appa_r_officer", appa_r_officer )
    setValue("training_objective", training_objective )
    setValue("promotability", promotability)
    setValue("next_action", next_action)

 }, [incomingData, setValue])













  const autoFill = useCallback(
    () => {
      if(incomingData?.data){
        autoFillPreliminary()
        autoFillJobPerformance()
        autoFillJobPerformanceScore()
        autoFillPerformanceCriteria()
        autoFillStrengthWeakness()
        autoFillStaffPotentials()
        autoFillComments()
        autoFillTraining()
        autoFillAcademic()
        autoFillPreliminaryForT12()
      }
    },
    [incomingData, autoFillPreliminary, autoFillJobPerformance, autoFillJobPerformanceScore, autoFillPerformanceCriteria, autoFillStrengthWeakness, autoFillStaffPotentials, autoFillComments, autoFillTraining, autoFillAcademic, autoFillPreliminaryForT12],
  )
// ----------------autoFill---------------
  



  useEffect(() => {
    reset({
      start_date: period?.start_date,
      end_date: period?.end_date,
    });
    autoFill()
  }, [period, reset, autoFill]);


  // useEffect(() => {
  //   const validateAllFields = async () => {
      
  //     await trigger();
  //   };
  //   validateAllFields();
  // }, [trigger]);


  const getCurrentRequiredField = ()=>{
   const  T_1_requiredFields = {
      employee_strength: "Employee strength remark is required",
      employee_awareness: "Employee awareness remark is required",
      employee_reaction: "Employee reaction remark is required",
      help_appraisee: "Help suggestion for appraisee is required",
      
      report_rating_ranks: "Ratings is required",
      
      overall_evaluation: "Overall evaluation is required",
      rating_comment: "Rating comment is required",
      promotability: "Promotability column is required",
      reporting_officer_comment: "Reporting Officer Comment is required",
    };
    
    const  T_2_requiredFields = {
      employee_performance: "Employee performance remark is required",
      employee_strength: "Employee strength remark is required",
      employee_awareness: "Employee awareness remark is required",
      employee_reaction: "Employee reaction remark is required",

      report_rating_ranks: "Ratings is required",

      strength_help: "Strength help suggestion for appraisee is required",
      steps_to_overcome_weakness: "Steps to overcome weakness remark is required",
      training_recommendation: "Training recommendation remark is required",
      training_objective: "Training objective is required",

      overall_evaluation: "Overall evaluation is required",
      rating_comment: "Rating comment is required",
      promotability: "Promotability column is required",
      reporting_officer_comment: "Reporting Officer Comment is required",
    };

    const  T_3_requiredFields = {
      job_performance_appraisal_ranks: "Job Performance is required",

      report_rating_ranks: "Ratings is required",

      staff_weakness: "Staff weakness remark is required",
      staff_weakness_correction: "Staff weakness correction is required",
      staff_strength: "Staff strength remark is required",
      staff_strength_enhancement: "Ratings is required",

      staff_growth_potential: "Staff growth potential remark is required",
      unsatisafactory_comment: "Unsatisafactory comment remark is required",
      overall_evaluation: "Overall evaluation is required",
      overall_evaluation_comment: "Overall evaluation comment is required",
      steps_to_overcome_weakness: "Steps to overcome weakness is required",

      training_recommendation: "Training recommendation remark is required",
      training_recommendation_purpose: "Training recommendation  purpose is required",
      reporting_officer_comment: "Reporting Officer Comment is required",
    };

    const  T_4_requiredFields = {
      job_performance_appraisal_ranks: "Job Performance is required",

      report_rating_ranks: "Ratings is required",

      staff_weakness: "Staff weakness remark is required",
      staff_weakness_correction: "Staff weakness correction is required",
      staff_strength: "Staff strength remark is required",
      staff_strength_enhancement: "Ratings is required",

      staff_growth_potential: "Staff growth potential remark is required",
      unsatisafactory_comment: "Unsatisafactory comment remark is required",
      overall_evaluation: "Overall evaluation is required",
      overall_evaluation_comment: "Overall evaluation comment is required",
      steps_to_overcome_weakness: "Steps to overcome weakness is required",

      training_recommendation: "Training recommendation remark is required",
      training_recommendation_purpose: "Training recommendation  purpose is required",
      reporting_officer_comment: "Reporting Officer Comment is required",
    };

     switch (incomingData?.data?.template) {
      case 1:
        return  T_1_requiredFields;  
      case 2:
        return T_2_requiredFields;
      case 3:
        return T_3_requiredFields;
      case 4:
        return T_4_requiredFields;     
      default:
        break;
     }

  }



  const validateForm = (values) => {
    const newErrors = {};
    const requiredFields = getCurrentRequiredField()

    Object.keys(requiredFields).forEach((field) => {
      if (Array.isArray(values?.[field])) {
        // For array fields like job_description and section_two
        if (!(values?.[field].some(e => e !== null))) {
          newErrors[field] = requiredFields[field];
        }
      } else {
        // For string fields like report_officer and counter_officer
        if (!values?.[field]) {
          newErrors[field] = requiredFields[field];
        }
      }
    });
    return newErrors;
  };




  const onSubmit = async (data) => {
    const values = getValues();

    const payload = {
      // -------------------payload----------------
      company_id: userData?.data?.COMPANY_ID,
      staff_id: userData?.data?.STAFF_ID,
      reporting_officer_rating:values?.report_rating_ranks,
      job_performance_score:values?.job_performance_appraisal_ranks,
      employee_strength: values?.employee_strength || values?.staff_strength,
      staff_strength: values?.staff_strength || values?.employee_strength,
      employee_performance:values?.employee_performance,
      "rating_comment":values?.rating_comment,
      "training_objective":values?.training_objective,
      "help_appraisee":  values?.help_appraisee,
      "strength_help": values?.strength_help ,
      "employee_awareness":values?.employee_awareness ,
      "employee_reaction": values?.employee_reaction  ,
      "steps_to_overcome_weakness": values?.steps_to_overcome_weakness,
      "training_recommendation": values?.training_recommendation,
      "overall_evaluation":values?.overall_evaluation,
      "promotability":values?.promotability,
      "employee_weakness": values?.staff_weakness,
      reporting_officer_comment: values?.reporting_officer_comment,
      counter_officer_comment: values?.countersigning_comment,
      "next_request": incomingData?.data?.next_request,
      appraisee_comment: values?.appraisee_comment,
      "weakness_correction": values?.staff_weakness_correction,
      "staff_strength_enhancement": values?.staff_strength_enhancement,
      "staff_growth_potential": values?.staff_growth_potential,
      "unsatisafactory_comment":values?.unsatisafactory_comment,
      "overall_evaluation_comment":values?.overall_evaluation_comment,
      "training_recommendation_purpose": values?.training_recommendation_purpose,
      appraisee_training: values?.training_response,
      "request_id": incomingData?.requestID,
      note: values?.note
      
      // -------------------payload----------------
    };
    if(incomingData?.data?.next_request === "send back to officer"){
      payload["agree_with_grade"] = values?.agree_with_grade || 0
      payload["note"] = values?.note
    }
    // console.log(formState.errors);
    // console.log(payload);
    // console.log(values)


    try {

      if(incomingData?.data?.current === "counter officer"){
        if(!values?.countersigning_comment){
          toast.error(`counter signing officer comment is required`, {duration: 5000})
           await trigger(["countersigning_comment"]);
          return
        }
      }

      if(incomingData?.data?.current === "staff"){
        if(!values?.appraisee_comment){
          toast.error(`appraisee comment is required`, {duration: 5000})
           await trigger(["appraisee_comment"]);
          return
        }
      }

      if(incomingData?.data?.current === "reporting officer"){
        const formErrors = validateForm(values);
        if (Object.keys(formErrors).length > 0) {
          const combinedMessage = Object.values(formErrors).join("\n");
          errorToast(combinedMessage, 7000 * Object.values.length);
          // console.log([...Object.keys(formErrors)])
          await trigger([...Object.keys(formErrors)]);
          return;
        }
      }

      if(isApprovePending) return

      startLoading()
      const res = await approveRequestAction(payload)
      if(res){
        toast.success("You successfully approve request", {duration: 7000})
        stopLoading()
        onRejectModalClose()
        setIsOpen(false)
        handleClose('refresh')
      }
    } catch (error) {
      toast.error(`${error?.response?.data?.message}.`, {duration: 10000})
      stopLoading()
    }









    // mutateCreateAper(payload, {
    //   onError: (error) => {
    //     const errMsg = error?.response?.data?.message || error?.message;

    //     errorToast(errMsg);
    //   },
    //   onSuccess: (res) => {
    //     console.log(res);
    //     const resMsg = res?.data?.message

    //     successToast(resMsg)
    //     reset();
    //     setIsOpen(false);
    //   },
    // });
  };

  const approveRequest = async ()=>{
    if(isApprovePending) return
    const json =    {
      "company_id": userData?.data?.COMPANY_ID,
      "staff_id": userData?.data?.STAFF_ID,
    }
  
    try {
      startLoading()
      const res = await approveRequestAction(json)
      if(res){
        toast.success("You successfully approve request", {duration: 7000})
        stopLoading()
        onRejectModalClose()
      }
    } catch (error) {
      toast.error(`${error?.response?.data?.message}.`, {duration: 10000})
      stopLoading()
    }
  }





  const onAgree = ()=>{
    setValue("agree_with_grade", 1)
    onSubmit()
  }
  const onDisAgree = ()=>{
    onRejectModalOpen()
  }
  const onDisAgreeAper = (rejectnote)=>{
    // startLoading()
  if(rejectnote && rejectnote !== "<p><br></p>" ){
    setValue("note", rejectnote)
  }
  setValue("agree_with_grade", 0)
  onSubmit()
  }



  const tabConfigurations = useMemo(
    () => ({
      1: [
        { title: "Period", component: PeriodSection },
        {
          title: "Preliminary Assessment",
          component: T1_PreliminaryAssessmentSection,
        },
        {
          title: "Rating",
          component: T1_PerformanceCriteriaSection,
        },
        { title: "Add Note", component: NoteForm,  },
        { title: "Employee Potential and Comments", component: T1_EmployeePotentialSection },
        { title: "Notes", component: NoteDetailsApproval,  },
        { title: "Approval History", component: ApprovalHistory,  },
      ],
      2: [
        { title: "Period", component: PeriodSection },
        {
          title: "Preliminary Assessment",
          component: T2_PreliminaryAssessmentSection,
        },
        {
          title: "Rating",
          component: T2_PerformanceCriteriaSection,
        },
        { title: "Development Plan", component: T2_PlanForDevelopment },
        { title: "Add Note", component: NoteForm,  },
        { title: "Employee Potential and Comment", component: T2_EmployeePotentialSection },
        { title: "Notes", component: NoteDetailsApproval,  },
        { title: "Approval History", component: ApprovalHistory,  },
      ],
      3: [
        { title: "Period", component: PeriodSection },
        {
          title: "Preliminary self assessment",
          component: T3_PreliminaryAssessmentSection,
        },
        { title: "Job Performance", component: T3_JobPerformanceSection },
        {
          title: "Rating",
          component: T3_PerformanceCriteriaSection,
        },
        { title: "Strength and Weakness", component: T3_StrengthAndWeaknessSection },
        { title: "Employee Potential", component: T3_EmployeePotentialSection },
        { title: "Comment", component: T3_CommentByAppraiseOfficer },
        { title: "Counter Comment", component: T3_CounterSigningComment },
        // { title: "Review Committee", component: T3_ReviewCommitee },
        { title: "Add Note", component: NoteForm,  },
        { title: "Training Needs", component: T3_TrainingNeedSection },
        { title: "Notes", component: NoteDetailsApproval,  },
        { title: "Approval History", component: ApprovalHistory,  },

      ]?.filter(Boolean),
      4: [
        { title: "Period", component: PeriodSection },
        {
          title: "Preliminary self assessment",
          component: T4_PreliminaryAssessmentSection,
        },
        { title: "Job Performance", component: T4_JobPerformanceSection },
        {
          title: "Rating",
          component: T4_PerformanceCriteriaSection,
        },
        { title: "Strength and Weakness", component: T4_StrengthAndWeaknessSection },
        { title: "Employee Potential", component: T4_EmployeePotentialSection },
        { title: "Comment", component: T4_CommentByAppraiseOfficer },
        { title: "Counter Comment", component: T4_CounterSigningComment },
        // { title: "Review Committee", component: T4_ReviewCommitee },
        { title: "Add Note", component: NoteForm,  },
        { title: "Training Needs", component: T4_TrainingNeedSection },
        { title: "Notes", component: NoteDetailsApproval,  },
        { title: "Approval History", component: ApprovalHistory,  },
      ],
    }),
    []
  );

  const generateTabs = useCallback(
    (templateKey, sharedProps) => {
      return tabConfigurations[templateKey]?.map((tab, index) => ({
        title: tab.title,
        content: React.createElement(tab.component, {
          ...sharedProps,
          onPrev: () => setSelectedTab(index - 1),
          onNext: () => setSelectedTab(index + 1),
          restartStep: index === 0 ? () => setSelectedTab(0) : undefined,
        }),
      }));
    },
    [tabConfigurations]
  );

  const displayTab = useMemo(() => {
    return generateTabs(incomingData?.data?.template || 1, {
      appraisee: false,
      isApprovalPage: true,
      register,
      setValue,
      control,
      getValues,
      formState,
      watch,
      setIsOpen,
      isPending,
      isDraft,
      current_level: incomingData?.data?.current,
      details:incomingData
    });
  }, [generateTabs, incomingData, register, setValue, getValues, formState, watch, setIsOpen, isPending, isDraft, control]);




  const position = useMemo(() => {
    if(incomingData?.data?.current === "staff"  && incomingData?.data?.template  > 2 ){
        return 7
    }else if(incomingData?.data?.current === "counter officer" && incomingData?.data?.template  > 2){
      return 8
    }else{
     return  displayTab.length
    }
    

  }, [incomingData, displayTab]);







  return (
    <>
      <Drawer
        width={1000}
        onClose={() => {
          setIsOpen(false)
          stopLoading()

        }
          
          }
        open={isOpen}
        className="bg-[#F5F7FA] z-[10]"
        classNames={{
          body: "bg-[#F7F7F7]",
          header: "font-helvetica bg-[#F7F7F7]",
        }}
      >
        <div className="h-full mx-3">
          <div className="bg-[#f5f7fa] min-h-screen px-5 py-5">
            <h4 className="header_h3 text-2xl mb-3">Appraisal View</h4>
            <div className="grid grid-cols-1 h-ful md:grid-cols-4 gap-x-7 gap-y-5">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="my- w-full p-5 overflow-y-auto col-span-3 shadow-xl bg-white rounded-[0.25rem] mb-[1rem] form_drawer_body_container order-2 md:order-1 h-full "
              >

                <div>
                  { getValues('next_action') &&
                    <div>
                      <Chip
                                  color="warning"
                                  className="m-1 px-2 py-2 transition-all duration-300"
                                  size="md"
                                  variant="flat"
                                >
                                  {getValues('next_action')}
                                </Chip> 
                    </div>
                  }
                {displayTab?.[selectedTab]?.content}
                </div>


                { ( !viewMode &&  incomingData?.data?.current === "reporting officer" || incomingData?.data?.current === "counter officer")  &&
                // && position -1 == selectedTab 
                  <div className="flex gap-10 justify-end mt-12">
                          <button
                            className="bg-btnColor px-4 py-2 header_h3 outline-none  text-white rounded hover:bg-btnColor/70"
                            type="button"
                            onClick={onSubmit}
                            disabled={Loading}
                          >
                            { Loading
                              && (
                                <Spinner
                                  size="sm"
                                  classNames={{ circle1: "border-white/80" }}
                                />
                              )
                            } 
                            {incomingData?.data?.next_request}
                          </button>

                  </div>
                }
                {  !viewMode && incomingData?.data?.current === "staff"  &&
                  // && position -1 == selectedTab 
                  <div className="flex gap-10 gap-x-20 justify-end px-7 mt-14 ">
                          <button
                          onClick={onDisAgree}
                            className="bg-red-400 px-4 py-2 header_h3 outline-none  text-white rounded hover:bg-red-500"
                            //  type="submit"
                            type="button"
                            disabled={Loading}
                          >
                            Disagree
                          </button>
                          <button
                          onClick={onAgree}
                            className="bg-btnColor px-4 py-2 header_h3 outline-none  text-white rounded hover:bg-btnColor/80"
                              // type="submit"
                            type="button"
                            disabled={Loading}
                          >
                            { Loading
                              && (
                                <Spinner
                                  size="sm"
                                  classNames={{ circle1: "border-white/80" }}
                                />
                              )
                            } 
                            Agree
                          </button>

                  </div>
                }
              </form>

              <div className="flex flex-col border-l-1 border-gray-400 py-10 text-sm gap-3 px-4 ms-8 md:ms-2 my-5 md:my-0 md:h-full order-1 md:order-2">
                {displayTab?.map((tab, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedTab(index)}
                    className={`${
                      selectedTab === index ? "font-[500]" : "font-[400]"
                    } relative cursor-pointer font-[13px] leading-[19.5px] text-[rgba(39, 44, 51, 0.7)]`}
                  >
                    {tab?.title}
                    <span
                      className={`w-[0.7rem] h-[0.7rem] rounded-full  ${
                        selectedTab === index ? "bg-[#00bcc2]" : "bg-gray-300"
                      }  border-1 border-white absolute -left-[22px] top-1 duration-200 transition-all`}
                    ></span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Drawer>

      <ExpandedDrawerWithButton maxWidth={600} isOpen={isRejectModalOpen} onClose={onRejectModalClose}>
                    <div className="mt-10 mx-5">
                        <AddNoteRejection handleConfirm={onDisAgreeAper} loading={Loading} handleCancel={onRejectModalClose} />
                    </div>
        </ExpandedDrawerWithButton>
    </>
  );
}
