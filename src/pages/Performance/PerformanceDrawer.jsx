/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Drawer } from "antd";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import useCurrentUser from "../../hooks/useCurrentUser";
import { useGetProfile } from "../../API/profile";
import { useCreateAper } from "../../API/performance";
import { errorToast, successToast } from "../../utils/toastMsgPop";
import PeriodSection from "../../components/core/performance/PeriodSection";
import T1_EmployeePotentialSection from "../../components/core/performance/template1/components/T1_EmployeePotentialSection";
import ReportingOfficer from "../../components/core/performance/ReportingOfficer";
import T2_EmployeePotentialSection from "../../components/core/performance/template2/components/T2_EmployeePotentialSection";
import T3_PreliminaryAssessmentSection from "../../components/core/performance/template3/T3_PreliminaryAssessmentSection";
import T3_JobPerformanceSection from "../../components/core/performance/template3/T3_JobPerformanceSection";
import T3_EmployeePotentialSection from "../../components/core/performance/template3/T3_EmployeePotentialSection";
import T3_CommentByAppraiseOfficer from "../../components/core/performance/template3/T3_CommentByAppraiseOfficer";
import T3_TrainingNeedSection from "../../components/core/performance/template3/T3_TrainingNeedSection";
import T4_PreliminaryAssessmentSection from "../../components/core/performance/template4/T4_PreliminaryAssessmentSection";
import T4_JobPerformanceSection from "../../components/core/performance/template4/T4_JobPerformanceSection";
import T4_CommentByAppraiseOfficer from "../../components/core/performance/template4/T4_CommentByAppraiseOfficer";
import T4_StrengthAndWeaknessSection from "../../components/core/performance/template4/T4_StrengthAndWeaknessSection";
import T4_EmployeePotentialSection from "../../components/core/performance/template4/T4_EmployeePotentialSection";
import T4_CounterSigningComment from "../../components/core/performance/template4/T4_CounterSigningComment";
import T4_TrainingNeedSection from "../../components/core/performance/template4/T4_TrainingNeedSection";
import NoteForm from "../../components/core/performance/NoteForm";
import T1_PreliminaryAssessmentSection from "../../components/core/performance/template1/components/T1_PreliminaryAssessmentSection";
import T2_PlanForDevelopment from "../../components/core/performance/template2/components/T2_PlanForDevelopment";
import T2_PerformanceCriteriaSection from "../../components/core/performance/template2/components/T2_PerformanceCriteriaSection";
import T2_PreliminaryAssessmentSection from "../../components/core/performance/template2/components/T2_PreliminaryAssessmentSection";
import T3_StrengthAndWeaknessSection from "../../components/core/performance/template3/T3_StrengthAndWeaknessSection";
import T3_CounterSigningComment from "../../components/core/performance/template3/T3_CounterSigningComment";
import T4_PerformanceCriteriaSection from "../../components/core/performance/template4/T4_PerformanceCriteriaSection";
import T3_PerformanceCriteriaSection from "../../components/core/performance/template3/T3_PerformanceCriteriaSection";
import T1_PerformanceCriteriaSection from "../../components/core/performance/template1/components/T1_PerformanceCriteriaSection";
import NoteDetailsApproval from "../../components/core/approvals/NoteDetailsApproval";
import ApprovalHistory from "../Approval/ApprovalHistory";
import { ChatMessageCard } from "../../components/core/shared/ChatMessageCard";


export default function PerformanceDrawer({
  isOpen,
  setIsOpen,
  selectedTab,
  setSelectedTab,
  setAperData,
  aperData,
  period,
}) {
  const [isDraft, setIsDraft] = useState(false);

  const { userData } = useCurrentUser();

  const { data: profile } = useGetProfile({
    key: "profile",
  });

  const { mutate: mutateCreateAper, isPending } = useCreateAper(
    aperData?.is_draft
  );
  const CURRENT_STAFF_GRADE = Number(profile?.BIODATA?.GRADE);

  const templateNo = useMemo(() => {
    if (aperData?.data?.template) {
      return aperData?.data?.template;
    } else if (CURRENT_STAFF_GRADE <= 6) {
      return 1;
    }
    if (CURRENT_STAFF_GRADE > 6 && CURRENT_STAFF_GRADE <= 10) {
      return 2;
    }
    if (CURRENT_STAFF_GRADE > 11 && CURRENT_STAFF_GRADE <= 14) {
      return 3;
    }
    if (CURRENT_STAFF_GRADE > 14) {
      return 4;
    }
  }, [CURRENT_STAFF_GRADE, aperData]);

  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    reset,
    trigger,
    control,
    watch,
    formState,
  } = useForm({
    defaultValues: {
      start_date: period?.start_date,
      end_date: period?.end_date,
      report_officer: "",
      counter_officer: "",
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  // ----------------autoFill---------------
  const autoFillPreliminary = useCallback(() => {
    const { section_one, section_two, section_three, section_four } =
      aperData.data;
    const sections = [
      section_one || "",
      section_two || "",
      section_three || "",
      section_four || "",
    ];
    setValue("section_two", sections);
  }, [aperData, setValue]);

  const autoFillJobPerformance = useCallback(() => {
    const {
      job_performance_one,
      job_performance_two,
      job_performance_three,
      job_performance_four,
      job_performance_five,
      job_performance_six,
      job_performance_seven,
      job_performance_eight,
      job_performance_nine,
      job_performance_ten,
    } = aperData.data;

    const jobPerformances = [
      job_performance_one || "",
      job_performance_two || "",
      job_performance_three || "",
      job_performance_four || "",
      job_performance_five || "",
      job_performance_six || "",
      job_performance_seven || "",
      job_performance_eight || "",
      job_performance_nine || "",
      job_performance_ten || "",
    ];
    setValue("job_performance", jobPerformances);
  }, [aperData, setValue]);

  const autoFillJobPerformanceScore = useCallback(() => {
    const {
      job_performance_one_score,
      job_performance_two_score,
      job_performance_three_score,
      job_performance_four_score,
      job_performance_five_score,
      job_performance_six_score,
      job_performance_seven_score,
      job_performance_eight_score,
      job_performance_nine_score,
      job_performance_ten_score,
    } = aperData.data;

    const jPerformanceScore = [
      job_performance_one_score,
      job_performance_two_score,
      job_performance_three_score,
      job_performance_four_score,
      job_performance_five_score,
      job_performance_six_score,
      job_performance_seven_score,
      job_performance_eight_score,
      job_performance_nine_score,
      job_performance_ten_score,
    ];
    setValue("job_performance_appraisal_ranks", jPerformanceScore);
  }, [aperData, setValue]);

  const autoFillPerformanceCriteria = useCallback(() => {
    const {
      reporting_officer_rating_one,
      reporting_rating_one,
      reporting_officer_rating_two,
      reporting_rating_two,
      reporting_officer_rating_three,
      reporting_rating_three,
      reporting_officer_rating_four,
      reporting_rating_four,
      reporting_officer_rating_five,
      reporting_rating_five,
      reporting_officer_rating_six,
      reporting_rating_six,
      reporting_officer_rating_seven,
      reporting_rating_seven,
      reporting_officer_rating_eight,
      reporting_rating_eight,
      reporting_officer_rating_nine,
      reporting_rating_nine,
      reporting_officer_rating_ten,
      reporting_rating_ten,
      reporting_officer_rating_eleven,
      reporting_rating_eleven,
      reporting_officer_rating_twelve,
      reporting_rating_twelve,
      reporting_officer_rating_thirteen,
      reporting_rating_thirteen,
      reporting_officer_rating_fourteen,
      reporting_rating_fourteen,
      reporting_officer_rating_fifteen,
      reporting_rating_fifteen,
    } = aperData.data;

    const reportRating = [
      reporting_officer_rating_one || reporting_rating_one,
      reporting_officer_rating_two || reporting_rating_two,
      reporting_officer_rating_three || reporting_rating_three,
      reporting_officer_rating_four || reporting_rating_four,
      reporting_officer_rating_five || reporting_rating_five,
      reporting_officer_rating_six || reporting_rating_six,
      reporting_officer_rating_seven || reporting_rating_seven,
      reporting_officer_rating_eight || reporting_rating_eight,
      reporting_officer_rating_nine || reporting_rating_nine,
      reporting_officer_rating_ten || reporting_rating_ten,
      reporting_officer_rating_eleven || reporting_rating_eleven,
      reporting_officer_rating_twelve || reporting_rating_twelve,
      reporting_officer_rating_thirteen || reporting_rating_thirteen,
      reporting_officer_rating_fourteen || reporting_rating_fourteen,
      reporting_officer_rating_fifteen || reporting_rating_fifteen,
    ];
    setValue("report_rating_ranks", reportRating);
  }, [aperData, setValue]);

  const autoFillStrengthWeakness = useCallback(() => {
    const {
      staff_weakness,
      staff_weakness_correction,
      staff_strength,
      staff_strength_enhancement,
      average_score,
      start_date,
      end_date,
      employee_strength,
    } = aperData.data;
    setValue("staff_weakness", staff_weakness);
    setValue("staff_weakness_correction", staff_weakness_correction);
    setValue("employee_strength", staff_strength || employee_strength);
    setValue("staff_strength", staff_strength);
    setValue("staff_strength_enhancement", staff_strength_enhancement);
    setValue("average_score", average_score);
    setValue("start_date", start_date);
    setValue("end_date", end_date);
  }, [aperData, setValue]);

  const autoFillStaffPotentials = useCallback(() => {
    const {
      staff_growth_potential,
      unsatisafactory_comment,
      overall_evaluation,
      overall_evaluation_comment,
      steps_to_overcome_weakness,
      rating_comment,
    } = aperData.data;
    setValue("staff_growth_potential", staff_growth_potential);
    setValue("unsatisafactory_comment", unsatisafactory_comment);
    setValue("overall_evaluation", overall_evaluation);
    setValue("overall_evaluation_comment", overall_evaluation_comment);
    setValue("steps_to_overcome_weakness", steps_to_overcome_weakness);
    setValue("rating_comment", rating_comment);
  }, [aperData, setValue]);

  const autoFillComments = useCallback(() => {
    const { appraisee_comment, counter_officer_comment } = aperData.data;
    setValue("appraisee_comment", appraisee_comment);
    setValue("countersigning_comment", counter_officer_comment);
  }, [aperData, setValue]);

  const autoFillTraining = useCallback(() => {
    const {
      appraisee_training,
      training_recommendation,
      training_recommendation_purpose,
      reporting_officer_comment,
    } = aperData.data;
    setValue("training_response", appraisee_training);
    setValue("training_recommendation", training_recommendation);
    setValue(
      "training_recommendation_purpose",
      training_recommendation_purpose
    );
    setValue("reporting_officer_comment", reporting_officer_comment);
  }, [aperData, setValue]);

  const autoFillAcademic = useCallback(() => {
    const {
      academic_one,
      academic_one_year,
      academic_two,
      academic_two_year,
      academic_three,
      academic_three_year,
      academic_four,
      academic_four_year,
      academic_five,
      academic_five_year,
      academic_six,
      academic_six_year,
    } = aperData.data;
    setValue("academic_one", academic_one);
    setValue("academic_one_year", academic_one_year);
    setValue("academic_two", academic_two);
    setValue("academic_two_year", academic_two_year);
    setValue("academic_three", academic_three);
    setValue("academic_three_year", academic_three_year);
    setValue("academic_four", academic_four);
    setValue("academic_four_year", academic_four_year);
    setValue("academic_five", academic_five);
    setValue("academic_five_year", academic_five_year);
    setValue("academic_six", academic_six);
    setValue("academic_six_year", academic_six_year);
  }, [aperData, setValue]);

  const autoFillPreliminaryForT12 = useCallback(() => {
    const {
      help_appraisee,
      strength_help,
      employee_awareness,
      employee_reaction,
      employee_performance,
      appa_r_officer,
      training_objective,
      promotability,
    } = aperData.data;
    setValue("help_appraisee", help_appraisee);
    setValue("strength_help", strength_help);
    setValue("employee_awareness", employee_awareness);
    setValue("employee_reaction", employee_reaction);
    setValue("employee_performance", employee_performance);
    // setValue("appa_r_officer", appa_r_officer )
    setValue("training_objective", training_objective);
    setValue("promotability", promotability);
  }, [aperData, setValue]);

  const autoFill = useCallback(() => {
    if (aperData?.data) {
      autoFillPreliminary();
      autoFillJobPerformance();
      autoFillJobPerformanceScore();
      autoFillPerformanceCriteria();
      autoFillStrengthWeakness();
      autoFillStaffPotentials();
      autoFillComments();
      autoFillTraining();
      autoFillAcademic();
      autoFillPreliminaryForT12();
    }
  }, [
    aperData?.data,
    autoFillPreliminary,
    autoFillJobPerformance,
    autoFillJobPerformanceScore,
    autoFillPerformanceCriteria,
    autoFillStrengthWeakness,
    autoFillStaffPotentials,
    autoFillComments,
    autoFillTraining,
    autoFillAcademic,
    autoFillPreliminaryForT12,
  ]);
  // ----------------autoFill---------------

  useEffect(() => {
    reset({
      start_date: period?.start_date,
      end_date: period?.end_date,
      report_officer: "",
      counter_officer: "",
      note: aperData?.notes?.[0]?.NOTE_CONTENT || "",
      training_response: aperData?.data?.training_response || "",
      appraisee_comment: aperData?.data?.appraisee_comment || "",
      section_two: [],
      job_performance: [],
    });
    autoFill();
  }, [period, reset, autoFill, aperData?.data, aperData?.notes]);

  useEffect(() => {
    const validateAllFields = async () => {
      await trigger();
    };
    validateAllFields();
  }, [trigger]);

  const requiredFields = {
    report_officer: "Reporting Officer is required",
    counter_officer: "Counter Officer is required",
    ...(templateNo > 2 && { job_performance: "Job Performance is required" }),
    ...(templateNo > 2 && { section_two: "Self assessment is required" }),
  };

  const validateForm = (values) => {
    const newErrors = {};

    Object.keys(requiredFields).forEach((field) => {
      if (Array.isArray(values?.[field])) {
        // For array fields like job_description and section_two
        if (values?.[field].length === 0) {
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

  const onSubmit = async ({ is_draft }) => {
    const values = getValues();

    const formErrors = validateForm(values);

    const payload = {
      company_id: userData?.data?.COMPANY_ID,
      staff_id: userData?.data?.STAFF_ID,
      start_date: values?.start_date,
      end_date: values?.end_date,
      report_officer: values?.report_officer,
      counter_officer: values?.counter_officer,
      training_response: values?.training_response,
      appraisee_comment: values?.appraisee_comment,
      is_draft: is_draft || 0,
      template: templateNo,
      section_two: values?.section_two,
      job_performance: values?.job_performance,
      note: values?.note,
      aper_id: aperData?.data?.id,
      request_id: aperData?.data?.request_id,
    };

    if (Object.keys(formErrors).length > 0) {
      const combinedMessage = Object.values(formErrors).join("\n");
      errorToast(combinedMessage);
      return;
    }

    // console.log(payload);

    mutateCreateAper(payload, {
      onError: (error) => {
        const errMsg = error?.response?.data?.message || error?.message;

        errorToast(errMsg);
      },
      onSuccess: (res) => {
        const resMsg = res?.data?.message;

        successToast(resMsg);
        reset();
        setIsOpen(false);
        setIsDraft(false);
      },
    });
  };

  const saveAsDraft = useCallback(() => {
    setIsDraft(true);
    onSubmit({ is_draft: 1 });
  }, []);

  const tabConfigurations = useMemo(
    () => ({
      1: [
        { title: "Period", component: PeriodSection },
        aperData &&
          !aperData?.is_draft && {
            title: "Preliminary self assessment",
            component: T1_PreliminaryAssessmentSection,
          },
        aperData &&
          !aperData?.is_draft && {
            title: "Performance Criteria",
            component: T1_PerformanceCriteriaSection,
          },
        // { title: "Employee Potential", component: T1_EmployeePotentialSection },
        (aperData?.is_draft || !aperData) && {
          title: "Reporting Officer",
          component: ReportingOfficer,
        },
        (aperData?.is_draft || !aperData) && {
          title: "Note",
          component: NoteForm,
        },
        aperData &&
          !aperData?.is_draft && {
            title: "Note History",
            component: NoteDetailsApproval,
          },
        aperData &&
          !aperData?.is_draft && {
            title: "Approval History",
            component: ApprovalHistory,
          },
      ].filter(Boolean),
      2: [
        { title: "Period", component: PeriodSection },
        aperData &&
          !aperData?.is_draft && {
            // to be filled by reporting officer
            title: "Preliminary Assessment",
            component: T2_PreliminaryAssessmentSection,
          },
        aperData &&
          !aperData?.is_draft && {
            title: "Performance Criteria",
            component: T2_PerformanceCriteriaSection,
          },
        aperData &&
          !aperData?.is_draft && {
            title: "Development Plan",
            component: T2_PlanForDevelopment,
          },
        // { title: "Employee Potential", component: T2_EmployeePotentialSection },
        (aperData?.is_draft || !aperData) && {
          title: "Reporting Officer",
          component: ReportingOfficer,
        },
        (aperData?.is_draft || !aperData) && {
          title: "Note",
          component: NoteForm,
        },
        aperData &&
          !aperData?.is_draft && {
            title: "Note History",
            component: NoteDetailsApproval,
          },
        aperData &&
          !aperData?.is_draft && {
            title: "Approval History",
            component: ApprovalHistory,
          },
      ].filter(Boolean),
      3: [
        { title: "Period", component: PeriodSection },
        {
          title: "Preliminary self assessment",
          component: T3_PreliminaryAssessmentSection,
        },
        { title: "Job Performance", component: T3_JobPerformanceSection },
        aperData &&
          !aperData?.is_draft && {
            title: "Performance Criteria",
            component: T3_PerformanceCriteriaSection,
          },
        aperData &&
          !aperData?.is_draft && {
            title: "Strength and Weakness",
            component: T3_StrengthAndWeaknessSection,
          },
        // aperData &&
        //   !aperData?.is_draft && {
        //     title: "Employee Potential",
        //     component: T3_EmployeePotentialSection,
        //   },
        { title: "Comment", component: T3_CommentByAppraiseOfficer },
        aperData &&
          !aperData?.is_draft && {
            title: "Counter Comment",
            component: T3_CounterSigningComment,
          },
        { title: "Training Needs", component: T3_TrainingNeedSection },
        (aperData?.is_draft || !aperData) && {
          title: "Reporting Officer",
          component: ReportingOfficer,
        },
        (aperData?.is_draft || !aperData) && {
          title: "Note",
          component: NoteForm,
        },
        aperData &&
          !aperData?.is_draft && {
            title: "Note History",
            component: NoteDetailsApproval,
          },
        aperData &&
          !aperData?.is_draft && {
            title: "Approval History",
            component: ApprovalHistory,
          },
      ]?.filter(Boolean),
      4: [
        { title: "Period", component: PeriodSection },
        {
          title: "Preliminary self assessment",
          component: T4_PreliminaryAssessmentSection,
        },
        { title: "Job Performance", component: T4_JobPerformanceSection },
        aperData &&
          !aperData?.is_draft && {
            title: "Performance Criteria",
            component: T4_PerformanceCriteriaSection,
          },
        aperData &&
          !aperData?.is_draft && {
            title: "Strength and Weakness",
            component: T4_StrengthAndWeaknessSection,
          },
        // aperData &&
        //   !aperData?.is_draft && {
        //     title: "Employee Potential",
        //     component: T4_EmployeePotentialSection,
        //   },
        { title: "Comment", component: T4_CommentByAppraiseOfficer },
        aperData &&
          !aperData?.is_draft && {
            title: "Counter Comment",
            component: T4_CounterSigningComment,
          },
        { title: "Training Needs", component: T4_TrainingNeedSection },
        (aperData?.is_draft || !aperData) && {
          title: "Reporting Officer",
          component: ReportingOfficer,
        },
        (aperData?.is_draft || !aperData) && {
          title: "Note",
          component: NoteForm,
        },
        aperData &&
          !aperData?.is_draft && {
            title: "Note History",
            component: NoteDetailsApproval,
          },
        aperData &&
          !aperData?.is_draft && {
            title: "Approval History",
            component: ApprovalHistory,
          },
      ]?.filter(Boolean),
    }),
    [aperData]
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
    [setSelectedTab, tabConfigurations]
  );

  const displayTab = useMemo(() => {
    return generateTabs(templateNo, {
      appraisee: aperData && !aperData?.is_draft ? false : true,
      isApprovalPage: aperData && !aperData?.is_draft ? true : false,
      register,
      setValue,
      getValues,
      formState,
      watch,
      control,
      setIsOpen,
      saveAsDraft,
      isPending,
      isDraft,
      details: aperData,
    });
  }, [
    aperData,
    generateTabs,
    templateNo,
    register,
    setValue,
    getValues,
    formState,
    watch,
    control,
    setIsOpen,
    saveAsDraft,
    isPending,
    isDraft,
  ]);

  return (
    <>
      <Drawer
        width={1000}
        onClose={() => {
          setAperData(null);
          setIsOpen(false);
        }}
        open={isOpen}
        className="bg-[#F5F7FA] z-[10]"
        classNames={{
          body: "bg-[#F7F7F7]",
          header: "font-helvetica bg-[#F7F7F7]",
        }}
        
      >
        <div className="flex mx-3 px-5" onClick={()=>{
          setAperData(null);
          setIsOpen(false);
        }}>
          <ChatMessageCard/>
        </div>
        <div className="h-full mx-3">
          <div className="bg-[#f5f7fa] min-h-screen px-5 py-5">
            <h4 className="header_h3 text-2xl mb-3">New Appraisal</h4>
            <div className="grid grid-cols-1 h-ful md:grid-cols-4 gap-x-7 gap-y-5">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="my- w-full p-5 overflow-y-auto col-span-3 shadow-xl bg-white rounded-[0.25rem] mb-[1rem] form_drawer_body_container order-2 md:order-1 "
              >
                {displayTab?.[selectedTab]?.content}
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
    </>
  );
}
