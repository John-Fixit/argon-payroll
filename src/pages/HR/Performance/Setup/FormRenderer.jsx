import { useForm, Controller } from "react-hook-form";
import { Input, Select, Checkbox, Rate, Radio } from "antd";
import { Button } from "@nextui-org/react";
import PropTypes from "prop-types";
import { useState, useRef, useEffect, useMemo } from "react";
import { RiFileList3Line } from "react-icons/ri";
import clsx from "clsx";

const { TextArea } = Input;

const FormRenderer = ({
  sections,
  onSubmit,
  submitButtonText,
  mode = "fill",
  viewer = "appraiser",
  isSubmitting,
  responseData = [],
  canSaveAsDraft,
  saveAsDraftFunction,
  isDraftLoading,
  disableSubmit,
}) => {
  // For appraiser, show all sections. For others, filter by respondent
  const formattedSections = useMemo(() => {
    return sections;
    // if (!viewer) return sections;
    // if (viewer === "appraiser") return sections;
    // return sections?.filter((section) => section?.respondent === viewer);
  }, [sections]);

  const transformResponseToFormData = useMemo(() => {
    return (
      Array.isArray(responseData) &&
      responseData?.reduce((acc, item) => {
        acc[item.ELEMENT_KEY] = item.ANSWER;
        return acc;
      }, {})
    );
  }, [responseData]);

  const { handleSubmit, control, setValue, getValues, reset } = useForm({
    defaultValues: {
      ...transformResponseToFormData,
    },
  });

  // useEffect(() => {
  //   reset({
  //     ...transformResponseToFormData,
  //   });
  // }, [reset, transformResponseToFormData]);

  // useEffect(() => {
  //   if (!transformResponseToFormData) return;

  //   reset((prevValues) => {
  //     const hasChanges = Object.keys(transformResponseToFormData).some(
  //       (key) => prevValues[key] !== transformResponseToFormData[key],
  //     );
  //     return hasChanges ? transformResponseToFormData : prevValues;
  //   });
  // }, [reset, transformResponseToFormData]);

  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef([]);

  // Scroll to section when clicked
  const scrollToSection = (index) => {
    setActiveSection(index);
    sectionRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (let i = formattedSections.length - 1; i >= 0; i--) {
        const section = sectionRefs.current[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(i);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [formattedSections?.length]);

  const handleRateChange = (value, elementKey) => {
    setValue(elementKey, { rate: value, comment: "" });
  };

  // Helper function to determine if an element should be disabled

  const isElementDisabled = (element, section) => {
    // If in view mode, everything is disabled
    if (mode === "view") return true;

    // if (viewer === "appraiser") {
    //   const isAppraiserSection = section?.respondent === "appraiser";

    //   if (isAppraiserSection) return false;

    //   // NEW: If element is gradable and appraiser can grade it, disable the main element
    //   // (only grading will be enabled, handled separately in renderGrading)
    //   if (element?.gradable && element?.grade_by === "appraiser") {
    //     return true; // Disable the main element
    //   }

    //   return true;
    // }

    // // For other viewers (appraisee, counter-sign, etc.)
    // const isSectionForViewer = section?.respondent === viewer;

    // if (!isSectionForViewer) return true;

    // // NEW: If element is gradable and current viewer can grade it, disable the main element
    // // (only grading will be enabled, handled separately in renderGrading)
    // if (element?.gradable && element?.grade_by === viewer) {
    //   return true; // Disable the main element, only grading is fillable
    // }

    // // If element is gradable but viewer cannot grade it, the primary element stays enabled
    // // because they need to fill it (someone else will grade it later)
    return false;
  };

  const renderFormElement = (
    element,
    isSubQuestion = false,
    section = null,
  ) => {
    const isDisabled = isElementDisabled(element, section);

    switch (element?.type) {
      case "header":
        return (
          <h2 className="text-2xl font-bold tracking-wide text-gray-800">
            {element?.label}
          </h2>
        );

      case "paragraph":
        return <p className="text-gray-600">{element?.label}</p>;

      case "text":
        return (
          <Controller
            name={element?.elementKey}
            control={control}
            rules={{
              required:
                element?.isRequired && !isDisabled
                  ? `${element?.label} is required`
                  : false,
            }}
            render={({ field, fieldState }) => (
              <>
                <Input
                  type="text"
                  placeholder={element?.placeholder}
                  status={fieldState.error && "error"}
                  {...field}
                  size={isSubQuestion ? "middle" : "large"}
                  disabled={isDisabled}
                />
                {fieldState.error && (
                  <span className="text-red-500 text-sm">
                    {fieldState.error.message}
                  </span>
                )}
              </>
            )}
          />
        );

      case "textarea":
        return (
          <Controller
            name={element?.elementKey}
            control={control}
            rules={{
              required:
                element?.isRequired && !isDisabled
                  ? `${element?.label} is required`
                  : false,
            }}
            render={({ field, fieldState }) => (
              <>
                <TextArea
                  rows={isSubQuestion ? 3 : 4}
                  placeholder={element?.placeholder}
                  {...field}
                  disabled={isDisabled}
                />
                {fieldState.error && (
                  <span className="text-red-500 text-sm">
                    {fieldState.error.message}
                  </span>
                )}
              </>
            )}
          />
        );

      case "checkbox":
        return (
          <Controller
            name={element?.elementKey}
            control={control}
            rules={{
              required:
                element?.isRequired && !isDisabled
                  ? `${element?.label} is required`
                  : false,
            }}
            render={({ field, fieldState }) => (
              <>
                <Checkbox.Group
                  options={element?.options}
                  {...field}
                  disabled={isDisabled}
                />
                {fieldState.error && (
                  <span className="text-red-500 text-sm">
                    {fieldState.error.message}
                  </span>
                )}
              </>
            )}
          />
        );

      case "radio":
        return (
          <Controller
            name={element?.elementKey}
            control={control}
            rules={{
              required:
                element?.isRequired && !isDisabled
                  ? `${element?.label} is required`
                  : false,
            }}
            render={({ field, fieldState }) => (
              <>
                <Radio.Group {...field} disabled={isDisabled}>
                  <div className="flex flex-wrap gap-3">
                    {element?.options?.map((option, index) => (
                      <Radio
                        key={option?.value + "_" + index}
                        value={option.value}
                      >
                        {option.label}
                      </Radio>
                    ))}
                  </div>
                </Radio.Group>
                {fieldState.error && (
                  <span className="text-red-500 text-sm">
                    {fieldState.error.message}
                  </span>
                )}
              </>
            )}
          />
        );

      case "select":
        return (
          <Controller
            name={element?.elementKey}
            control={control}
            rules={{
              required:
                element?.isRequired && !isDisabled
                  ? `${element?.label} is required`
                  : false,
            }}
            render={({ field, fieldState }) => (
              <>
                <Select
                  options={element?.options}
                  size={isSubQuestion ? "middle" : "large"}
                  className="w-full"
                  disabled={isDisabled}
                  {...field}
                />
                {fieldState.error && (
                  <span className="text-red-500 text-sm">
                    {fieldState.error.message}
                  </span>
                )}
              </>
            )}
          />
        );

      case "rate":
        return (
          <Controller
            name={element?.elementKey}
            control={control}
            render={({ field }) => (
              <div className="flex flex-col space-y-2">
                <Rate
                  tooltips={["poor", "fair", "good", "very good", "excellent"]}
                  onChange={(value) =>
                    handleRateChange(value, element?.elementKey)
                  }
                  disabled={isDisabled}
                  value={field.value?.rate}
                />
                {field.value?.rate < 3 && (
                  <>
                    <label htmlFor="comment">Comment</label>
                    <TextArea
                      rows={4}
                      onChange={(e) => {
                        setValue(field.name, {
                          rate: field?.value?.rate,
                          comment: e.target.value,
                        });
                      }}
                      value={field.value?.comment}
                      placeholder="Comment why here..."
                      disabled={isDisabled}
                    />
                  </>
                )}
              </div>
            )}
          />
        );

      case "submit":
        return (
          <Button
            type="submit"
            className="bg-blue-500 text-white"
            radius="sm"
            size="sm"
            disabled={isDisabled}
          >
            {element?.label}
          </Button>
        );

      default:
        return null;
    }
  };

  const renderGrading = (element, isSubQuestion = false) => {
    if (!element?.gradable || !element?.grade_element?.options) return null;

    // Check if the current viewer can grade this element
    const canGrade = viewer === element?.grade_by;
    const isDisabled = mode === "view" || !canGrade;

    return (
      <div className={`${isSubQuestion ? "mt-3" : "mt-4"}`}>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Grading{" "}
          {!canGrade && (
            <span className="text-gray-400 text-xs">
              (Not available for your role)
            </span>
          )}
        </label>
        <Controller
          name={`${element?.elementKey}_grade`}
          control={control}
          rules={{
            required:
              element?.grade_element?.isRequired && canGrade
                ? "Please select a grade"
                : false,
          }}
          render={({ field, fieldState }) => (
            <>
              <Radio.Group {...field} size="large" disabled={isDisabled}>
                <div className="flex flex-wrap gap-3">
                  {element.grade_element.options.map((option, idx) => (
                    <Radio key={idx} value={option.value}>
                      {option.label}
                    </Radio>
                  ))}
                </div>
              </Radio.Group>
              {fieldState.error && (
                <span className="text-red-500 text-sm">
                  {fieldState.error.message}
                </span>
              )}
            </>
          )}
        />
      </div>
    );
  };

  const renderSubQuestion = (subQuestion, subIndex, section) => {
    const nonLabelElements = ["submit", "header", "paragraph"];

    return (
      <div
        key={subQuestion.id || subIndex}
        className="ml-6 mt-4 p-4 bg-gray-50 border-l-4 border-blue-300 rounded-md"
      >
        <div className="space-y-2">
          {!nonLabelElements.includes(subQuestion?.type) && (
            <label className="block text-sm font-medium text-gray-700">
              {subQuestion?.label}
              {subQuestion?.isRequired &&
                !isElementDisabled(subQuestion, section) && (
                  <span className="text-red-500 ml-1">*</span>
                )}
            </label>
          )}

          {renderFormElement(subQuestion, true, section)}
          {renderGrading(subQuestion, true, section)}
        </div>
      </div>
    );
  };

  const renderMainElement = (element, elementIndex, section) => {
    const nonLabelElements = ["submit", "header", "paragraph"];

    const shouldSpanFull =
      ["submit", "header", "paragraph", "textarea"].includes(element.type) ||
      (element?.has_sub_question && element?.sub_question?.length > 0);

    return (
      <div key={elementIndex} className={shouldSpanFull ? "md:col-span-2" : ""}>
        <div className="space-y-2">
          {!nonLabelElements.includes(element?.type) && (
            <label className="block text-sm font-medium text-gray-700">
              {element?.label}
              {element?.isRequired && !isElementDisabled(element, section) && (
                <span className="text-red-500 ml-1">*</span>
              )}
            </label>
          )}

          {element?.has_sub_question && element?.sub_question?.length > 0 ? (
            <div className="space-y-3">
              {element.sub_question.map((subQuestion, subIndex) =>
                renderSubQuestion(subQuestion, subIndex, section),
              )}
            </div>
          ) : (
            <>
              {renderFormElement(element, false, section)}
              {renderGrading(element, false, section)}
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-[calc(100vh-5rem)] bg-gray-50">
      {/* Left Sidebar - Sections Navigation */}
      {formattedSections?.length > 0 && (
        <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto flex-shrink-0">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                Form Sections
              </h3>
              <span className="text-xs bg-blue-100 text-primary px-2 py-1 rounded-full font-medium">
                {formattedSections.length}
              </span>
            </div>
            <p className="text-xs text-gray-500">
              Click to navigate to section
            </p>
          </div>

          <div className="p-3 space-y-2">
            {formattedSections.map((section, sectionIdx) => (
              <div
                key={sectionIdx}
                onClick={() => scrollToSection(sectionIdx)}
                className={`group relative rounded-lg border-1 transition-all cursor-pointer ${
                  activeSection === sectionIdx
                    ? "border-primary bg-blue-50 shadow-sm"
                    : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
                }`}
              >
                <div className="p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <RiFileList3Line
                          className={
                            activeSection === sectionIdx
                              ? "text-primary"
                              : "text-gray-400"
                          }
                          size={16}
                        />
                        <h4
                          className={`text-sm font-medium capitalize ${
                            activeSection === sectionIdx
                              ? "text-primary font-semibold"
                              : "text-black"
                          }`}
                        >
                          {section.header?.toLowerCase()}
                        </h4>
                      </div>
                      {/* {section.sub_header && (
                        <p className="text-xs text-gray-500 ml-6">
                          {section.sub_header}
                        </p>
                      )} */}
                    </div>
                  </div>
                </div>

                {/* Active Indicator */}
                {activeSection === sectionIdx && (
                  <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-primary rounded-l-lg"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {formattedSections?.map((section, sectionIndex) => (
              <div
                key={sectionIndex}
                ref={(el) => (sectionRefs.current[sectionIndex] = el)}
                className={clsx(
                  "bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden scroll-mt-6",
                  sectionIndex === activeSection ? "" : "hidden",
                )}
              >
                {/* Section Header */}
                <div className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 px-6 py-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {section?.header}
                  </h2>
                  {section?.sub_header && (
                    <p className="text-sm text-gray-600 mt-1">
                      {section?.sub_header}
                    </p>
                  )}
                  {/* Show indicator for sections not editable by current viewer */}
                  {/* {viewer === "appraiser" &&
                    section?.respondent !== "appraiser" && (
                      <p className="text-xs text-orange-600 mt-2 bg-orange-50 px-2 py-1 rounded inline-block">
                        Read-only section (for {section?.respondent})
                      </p>
                    )} */}
                </div>

                {/* Section Content */}
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {section?.formElements?.map((element, elementIndex) =>
                      renderMainElement(element, elementIndex, section),
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Submit Button */}
            {mode === "fill" && (
              <div className="flex justify-between sticky bottom-0 bg-white border-t border-gray-200 p-4 rounded-lg shadow-lg gap-2">
                {canSaveAsDraft && (
                  <Button
                    onPress={() => saveAsDraftFunction(getValues())}
                    isLoading={isDraftLoading}
                  >
                    Save as Draft
                  </Button>
                )}
                <Button
                  type="submit"
                  color="primary"
                  isLoading={isSubmitting}
                  isDisabled={disableSubmit}
                >
                  {submitButtonText || "Submit Form"}
                </Button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

FormRenderer.propTypes = {
  sections: PropTypes.array,
  onSubmit: PropTypes.func,
  mode: PropTypes.string,
  submitButtonText: PropTypes.string,
  viewer: PropTypes.string,
  responseData: PropTypes.array,
  isSubmitting: PropTypes.bool,
  canSaveAsDraft: PropTypes.bool,
  saveAsDraftFunction: PropTypes.func,
  disableSubmit: PropTypes.func,
  isDraftLoading: PropTypes.bool,
};

export default FormRenderer;
