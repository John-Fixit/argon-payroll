import { Tabs, Collapse, Input, Button } from "antd";
import PropTypes from "prop-types";
import { useEffect, useMemo, useRef, useState } from "react";
import RateFormat from "./RateFormat";
import { Controller } from "react-hook-form";
import { FiDownload } from "react-icons/fi";
import { exportExcel } from "../../../../../../utils/exportReportAsExcel";
import StarLoader from "../../../../loaders/StarLoader";
import SearchablePaginatedCollapse from "./SearchablePaginatedCollapse";

const { TabPane } = Tabs;
const { Panel } = Collapse;

const RateGroup = ({
  watch,
  setValue,
  getValues,
  control,
  companyRankGradeLevel,
  companyRankGradeLevelLoading,
}) => {
  const ranks = companyRankGradeLevel?.ranks;
  const grade_with_stepsData = companyRankGradeLevel?.grade_with_steps;
  const grade_without_stepsData = companyRankGradeLevel?.grade_without_steps;

  const formatGrades = (data = []) => {
    const gradeMap = new Map();

    data?.forEach(({ grade, step }) => {
      if (!gradeMap.has(grade)) {
        gradeMap.set(grade, []);
      }
      gradeMap.get(grade).push(step);
    });

    const grades = Array.from(gradeMap.entries()).map(([grade, steps]) => ({
      id: `${grade}`,
      name: `Grade ${grade}`,
      steps: steps
        .sort((a, b) => a - b)
        .map((step) => ({ step_name: `Step ${step}`, step })),
    }));

    return grades;
  };

  const grades = useMemo(
    () => formatGrades(grade_with_stepsData),
    [grade_with_stepsData]
  );

  const grouped = watch("is_grouped");
  const groupedWithStep = grouped && watch("custom_step");
  const group_type = watch("group_type");
  const payment_type = watch("payment_type");
  const allowance_values = watch("allowance_values");

  // Initialize the allowances_values array with default values

  // Use a ref to track the previous value of groupedWithStep
  const prevGroupedWithStep = useRef(groupedWithStep);
  const prevGrouped = useRef(grouped);
  const prevGroupType = useRef(group_type);

  //state to keep track of rate format modal
  const [isOpenRateFormat, setIsOpenRateFormat] = useState(false);
  const [currentLevelIndex, setCurrentLevelIndex] = useState(null); // Track which level is being edited
  const [currentStepIndex, setCurrentStepIndex] = useState(null); // Track which step is being edited
  const [defaultFormula, setDefaultFormula] = useState(null);
  //======================

  // Helper: check if allowances already have values filled in
  const hasUserEnteredValues = Array.isArray(allowance_values)
    ? allowance_values
        .flat()
        .some((item) => item?.amount_to_pay?.toString().trim() !== "")
    : false;

  // Initialize the allowances_values array with default values
  useEffect(() => {
    // Check if groupedWithStep changed from false to true
    if (!hasUserEnteredValues) {
      if (grouped !== prevGrouped.current) {
        setValue("allowances_values", []);
      } else if (
        groupedWithStep !== prevGroupedWithStep.current ||
        group_type !== prevGroupType.current
      ) {
        // Reset values only if custom_step is enabled
        if (groupedWithStep) {
          const initialValues = grades?.map((grade) =>
            grade?.steps.map((step) => ({
              grade: grade?.id,
              step: step.step,
              amount_to_pay: "",
            }))
          );
          setValue("allowances_values", initialValues);
        } else if (group_type === "rank") {
          const initialValues = ranks?.map((rank) => ({
            rank: rank?.RANK,
            code: rank.CODE,
            amount_to_pay: "",
          }));
          setValue("allowances_values", initialValues);
        } else {
          const initialValues = grade_without_stepsData?.map((item) => ({
            grade: item.grade,
            step: item?.step,
            amount_to_pay: "",
          }));
          setValue("allowances_values", initialValues);
        }
      }

      // Update the ref with the current value of groupedWithStep
      prevGroupedWithStep.current = groupedWithStep;
      prevGrouped.current = grouped;
      prevGroupType.current = group_type;
    }
  }, [
    groupedWithStep,
    allowance_values,
    grouped,
    setValue,
    grades,
    grade_without_stepsData,
    group_type,
    ranks,
    hasUserEnteredValues,
  ]); // Only run when groupedWithStep changes

  // useEffect(() => {
  //   if (!watch("allowances_values")?.length) {
  //     if (grouped) {
  //       if (groupedWithStep) {
  //         const initialValues = grades.map((grade) =>
  //           grade?.steps.map((step) => ({
  //             grade: grade?.id,
  //             step: step.step,
  //             amount_to_pay: "",
  //           }))
  //         );
  //         setValue("allowances_values", initialValues);
  //       } else if (group_type === "rank") {
  //         const initialValues = ranks.map((rank) => ({
  //           rank: rank?.RANK,
  //           code: rank.CODE,
  //           amount_to_pay: "",
  //         }));
  //         setValue("allowances_values", initialValues);
  //       } else {
  //         const initialValues = grade_without_stepsData?.map((item) => ({
  //           grade: item.grade,
  //           step: item?.step,
  //           amount_to_pay: "",
  //         }));
  //         setValue("allowances_values", initialValues);
  //       }
  //     } else {
  //       setValue("allowances_values", "");
  //     }
  //   }
  // }, [
  //   setValue,
  //   grades,
  //   watch,
  //   groupedWithStep,
  //   grouped,
  //   grade_without_stepsData,
  //   group_type,
  //   ranks,
  // ]);

  const onChange = ({
    value,
    gradeIndex,
    stepIndex,
    rankIndex,
    grade,
    step,
    rank,
  }) => {
    // Get the current allowances_values array
    if (grouped) {
      const currentValues = watch("allowances_values");

      // Create a new array with the updated value at the specified level and step index
      const newValues = [...currentValues];

      if (groupedWithStep) {
        newValues[gradeIndex] = [...newValues[gradeIndex]];
        newValues[gradeIndex][stepIndex] = {
          group: grade,
          step: step,
          amount_to_pay: value,
        };
      } else if (group_type === "rank") {
        newValues[rankIndex] = {
          rank: rank?.RANK,
          code: rank.CODE,
          amount_to_pay: value,
        };
      } else {
        newValues[gradeIndex] = {
          grade: grade,
          step: step,
          amount_to_pay: value,
        };
      }
      // Update the form state with the new array
      setValue("allowances_values", newValues);
    } else {
      setValue("allowances_values", value);
    }
  };

  // const autoFillStep = (gradeIndex, stepIndex) => {
  //   const currentValues = watch("allowances_values");

  //   const value = currentValues?.[gradeIndex]?.[stepIndex];

  //   const newValues = [...currentValues];

  //   newValues[gradeIndex] = steps.map(() => value); // Fill all steps with the provided value

  //   // Update the form state with the new array
  //   setValue("allowances_values", newValues);
  // };

  const openRateFormat = (gradeIndex, stepIndex, defaultFormula) => {
    setCurrentLevelIndex(gradeIndex);
    setCurrentStepIndex(stepIndex);
    setIsOpenRateFormat(true);
    setDefaultFormula(defaultFormula);
  };

  const closeRateFormat = () => {
    setIsOpenRateFormat(false);
  };

  const handleRateFormatSubmit = (formattedRate) => {
    if (grouped) {
      onChange(formattedRate, currentLevelIndex, currentStepIndex);
    } else {
      setValue("rate_field", formattedRate);
    }
    closeRateFormat();
  };
  return (
    <main>
      {grouped ? (
        companyRankGradeLevelLoading ? (
          <div className="flex items-center justify-center">
            <StarLoader />
          </div>
        ) : (
          <>
            {groupedWithStep ? (
              <Tabs defaultActiveKey="0">
                {grades.map((level, gradeIndex) => (
                  <TabPane tab={level.name} key={gradeIndex}>
                    <ExportAsExcelButton dataToExport={grade_with_stepsData} />

                    <Collapse accordion>
                      {level.steps.map((step, stepIndex) => (
                        <Panel header={step.step_name} key={stepIndex}>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="">
                              <h5 className="uppercase text-[0.825rem] tracking-[1px]">
                                Amount to pay
                              </h5>
                              <Controller
                                name={"amount_to_pay"}
                                control={control}
                                render={({ field }) => (
                                  <>
                                    <Input
                                      aria-label="amount_to_pay"
                                      size="large"
                                      placeholder="Enter your Amount"
                                      {...field}
                                      value={
                                        watch("allowances_values")?.[
                                          gradeIndex
                                        ]?.[stepIndex]?.amount_to_pay
                                      }
                                      onChange={(e) =>
                                        onChange({
                                          value: e.target.value,
                                          gradeIndex,
                                          stepIndex,
                                          grade: level.id,
                                          ...step,
                                        })
                                      }
                                      autoFocus
                                    />
                                  </>
                                )}
                                rules={{ required: "This field is required" }}
                              />
                            </div>
                          </div>
                        </Panel>
                      ))}
                    </Collapse>
                  </TabPane>
                ))}
              </Tabs>
            ) : group_type === "rank" ? (
              <>
                <ExportAsExcelButton dataToExport={ranks} />

                <SearchablePaginatedCollapse
                  control={control}
                  ranks={ranks}
                  onChange={onChange}
                  watch={watch}
                />
              </>
            ) : (
              <>
                <ExportAsExcelButton dataToExport={grade_without_stepsData} />
                <Collapse accordion>
                  {grade_without_stepsData.map((item, stepIndex) => (
                    <Panel header={`Grade ${item?.grade}`} key={stepIndex}>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="">
                          <h5 className="uppercase text-[0.825rem] tracking-[1px]">
                            Amount to pay
                          </h5>
                          <Controller
                            name={"amount_to_pay"}
                            control={control}
                            render={({ field }) => (
                              <>
                                <Input
                                  aria-label="amount_to_pay"
                                  size="large"
                                  placeholder="Enter your Amount"
                                  {...field}
                                  value={
                                    watch("allowances_values")?.[stepIndex]
                                      ?.amount_to_pay
                                  }
                                  onChange={(e) =>
                                    onChange({
                                      value: e.target.value,
                                      gradeIndex: stepIndex,
                                      grade: item?.grade,
                                      step: item?.step,
                                    })
                                  }
                                  autoFocus
                                />
                              </>
                            )}
                            rules={{ required: "This field is required" }}
                          />
                        </div>
                      </div>
                    </Panel>
                  ))}
                </Collapse>
              </>
            )}
          </>
        )
      ) : (
        <div className="">
          <p className="capitalize font-helvetica">
            Enter {watch("payment_type")} Value
          </p>
          <div>
            {payment_type === "rate" ? (
              <Input
                size="large"
                value={watch("rate_field")}
                onChange={(e) => {
                  setValue("rate_field", e.target.value);
                  onChange(e.target.value);
                }}
                readOnly
                onClick={() =>
                  openRateFormat(null, null, getValues("rate_field"))
                }
                placeholder="Rate e.g 4 * BSC + TRNS + HOU"
              />
            ) : (
              <Input
                size="large"
                value={watch("flat_field")}
                onChange={(e) => {
                  setValue("flat_field", e.target.value);
                }}
                placeholder="Flat:4000"
              />
            )}
          </div>
        </div>
      )}

      <RateFormat
        isOpenRateFormat={isOpenRateFormat}
        getValues={getValues}
        closeRateFormat={closeRateFormat}
        onSubmit={handleRateFormatSubmit}
        defaultFormula={defaultFormula}
      />
    </main>
  );
};

const ExportAsExcelButton = ({ dataToExport }) => {
  const handleExportAsExcel = (data) => {
    const excelData = data?.map((rank) => ({ ...rank, "Amount to Pay": "" }));
    exportExcel({ excelData, fileName: "Ranks list" });
  };

  return (
    <div className="flex justify-end items-end mb-2">
      <Button color="primary" onClick={() => handleExportAsExcel(dataToExport)}>
        <FiDownload />
        Export As Excel
      </Button>
    </div>
  );
};

RateGroup.propTypes = {
  watch: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  getValues: PropTypes.func.isRequired,
  control: PropTypes.any.isRequired,
  companyRankGradeLevel: PropTypes.shape({
    ranks: PropTypes.object,
    grade_with_steps: PropTypes.object,
    grade_without_steps: PropTypes.object,
  }),
  companyRankGradeLevelLoading: PropTypes.bool,
};
ExportAsExcelButton.propTypes = {
  dataToExport: PropTypes.array,
};

export default RateGroup;
