import { useState } from "react";
import { Card, CardBody, Button } from "@nextui-org/react";
import { Modal, Input, Dropdown, Checkbox, Radio, Menu } from "antd";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline, MdDragIndicator } from "react-icons/md";
import { BsInputCursorText } from "react-icons/bs";
import { RiFileList3Line } from "react-icons/ri";
import DraggableFormElement from "./DraggableFormElement";
import SectionFormDrawer from "./SectionFormDrawer";
import { formatError, showSuccess } from "../../../../utils/messagePopup";
import clsx from "clsx";
import PropTypes from "prop-types";
import OverlayWhileLoading from "../../../../components/core/shared/OverlayWhileLoading";

const defaultSection = [];
// [
//   {
//     sectionId: `section_${crypto.randomUUID()}`,
//     header: "PRELIMINARY ASSESSMENT",
//     sub_header: "",
//     formElements: [],
//     gradable: false,
//     section_grade_element: null,
//     grade_by: {},
//     respondent: "",
//   },
//   {
//     sectionId: `section_${crypto.randomUUID()}`,
//     header: "TASK AND TARGET",
//     sub_header: "",
//     formElements: [],
//     gradable: false,
//     section_grade_element: null,
//     grade_by: {},
//     respondent: "",
//   },
//   {
//     sectionId: `section_${crypto.randomUUID()}`,
//     header: "PERFORMANCE CRITERIA ",
//     sub_header: "",
//     formElements: [],
//     gradable: false,
//     section_grade_element: null,
//     grade_by: {},
//     respondent: "",
//   },
//   {
//     sectionId: `section_${crypto.randomUUID()}`,
//     header: "EMPLOYEE’S STRENGTHS AND WEAKNESSES",
//     sub_header: "",
//     formElements: [],
//     gradable: false,
//     section_grade_element: null,
//     grade_by: {},
//     respondent: "",
//   },
//   {
//     sectionId: `section_${crypto.randomUUID()}`,
//     header: "COMMENTS BY OFFICER APPRAISED",
//     sub_header: "",
//     formElements: [],
//     gradable: false,
//     section_grade_element: null,
//     grade_by: {},
//     respondent: "appraisee",
//   },
//   {
//     sectionId: `section_${crypto.randomUUID()}`,
//     header: "Comment By Appraiser",
//     sub_header: "",
//     formElements: [],
//     gradable: false,
//     section_grade_element: null,
//     grade_by: {},
//     respondent: "appraiser",
//   },
//   {
//     sectionId: `section_${crypto.randomUUID()}`,
//     header: "Comment By Countersign",
//     sub_header: "",
//     formElements: [],
//     gradable: false,
//     section_grade_element: null,
//     grade_by: {},
//     respondent: "counter-sign",
//   },
//   {
//     sectionId: `section_${crypto.randomUUID()}`,
//     header: "Recommendation By Appraiser",
//     sub_header: "",
//     formElements: [
//       {
//         id: crypto.randomUUID(),
//         elementKey: `field_${crypto.randomUUID()}`,
//         type: "textarea",
//         label: `Recommendation`,
//         has_sub_question: false,
//         sub_question: null,
//         placeholder: "",
//         isRequired: false,
//         options: [],
//         specifyFor: { all: true, for_HR: false },
//         grade_element: null,
//       },
//     ],
//     gradable: false,
//     section_grade_element: null,
//     grade_by: {},
//     respondent: "appraiser",
//   },
// ];

const gradingOption = [
  { id: `option_${crypto.randomUUID}`, label: "Poor", value: 1 },
  { id: `option_${crypto.randomUUID}`, label: "Fair", value: 2 },
  { id: `option_${crypto.randomUUID}`, label: "Good", value: 3 },
  { id: `option_${crypto.randomUUID}`, label: "Very good", value: 4 },
  { id: `option_${crypto.randomUUID}`, label: "Excellent", value: 5 },
];

const FormBuilder = ({
  role = "builder",
  appraisalHeader,
  handleSubmit,
  isSubmitting,
  sections,
  isEditing,
}) => {
  const [allSection, setAllSection] = useState(
    sections || defaultSection || [],
  );
  const [activeSelectedSection, setActiveSelectedSection] = useState(0);
  const [openSectionModal, setOpenSectionModal] = useState(false);
  const [editSection, setEditSection] = useState(false);

  const [openSectionDrawerDetail, setOpenSectionDrawerDetail] = useState({
    state: false,
    sectionIdx: null,
  });

  const [sectionHeader, setSectionHeader] = useState({
    header: "",
    sub_header: "",
  });

  const [draggedItem, setDraggedItem] = useState(null);
  const [draggedOverItem, setDraggedOverItem] = useState(null);

  // Sidebar section drag and drop
  const [draggedSection, setDraggedSection] = useState(null);
  const [draggedOverSection, setDraggedOverSection] = useState(null);

  // Drag and Drop Handlers for Elements
  const handleDragStart = (index) => {
    setDraggedItem(index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    setDraggedOverItem(index);
  };

  const handleDrop = (e, sectionIndex) => {
    e.preventDefault();
    if (draggedItem === null || draggedOverItem === null) return;

    const newElements = [...allSection[sectionIndex].formElements];
    const draggedElement = newElements[draggedItem];
    newElements.splice(draggedItem, 1);
    newElements.splice(draggedOverItem, 0, draggedElement);

    const updatedSections = [...allSection];
    updatedSections[sectionIndex].formElements = newElements;
    setAllSection(updatedSections);

    setDraggedItem(null);
    setDraggedOverItem(null);
  };

  // Drag and Drop Handlers for Sections
  const handleSectionDragStart = (e, index) => {
    setDraggedSection(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleSectionDragOver = (e, index) => {
    e.preventDefault();
    setDraggedOverSection(index);
  };

  const handleSectionDrop = (e, dropIndex) => {
    e.preventDefault();
    if (draggedSection === null) return;

    const newSections = [...allSection];
    const draggedSectionData = newSections[draggedSection];
    newSections.splice(draggedSection, 1);
    newSections.splice(dropIndex, 0, draggedSectionData);

    setAllSection(newSections);
    setActiveSelectedSection(dropIndex);
    setDraggedSection(null);
    setDraggedOverSection(null);
  };

  // Section Management
  const addSection = () => {
    if (!sectionHeader.header && !sectionHeader.sub_header) {
      formatError("Please provide at least a header or sub header");
      return;
    }

    if (editSection && activeSelectedSection !== null) {
      const updatedSections = [...allSection];
      updatedSections[activeSelectedSection] = {
        ...updatedSections[activeSelectedSection],
        header: sectionHeader.header,
        sub_header: sectionHeader.sub_header,
      };
      setAllSection(updatedSections);
      setEditSection(false);
    } else {
      setAllSection([
        ...allSection,
        {
          sectionId: `section_${crypto.randomUUID()}`,
          header: sectionHeader.header,
          sub_header: sectionHeader.sub_header,
          formElements: [],
          gradable: false,
          section_grade_element: null,
        },
      ]);
      setActiveSelectedSection(allSection.length);
    }

    setSectionHeader({ header: "", sub_header: "" });
    setOpenSectionModal(false);
    showSuccess("Section added successfully");
  };

  const editSectionFn = (index) => {
    setActiveSelectedSection(index);
    setEditSection(true);
    setSectionHeader({
      header: allSection[index].header,
      sub_header: allSection[index].sub_header,
    });
    setOpenSectionModal(true);
  };

  const removeSection = (index) => {
    setAllSection(allSection.filter((_, i) => i !== index));
    if (activeSelectedSection === index) {
      setActiveSelectedSection(Math.max(0, index - 1));
    }
    showSuccess("Section removed successfully");
  };

  const editElement = (sectionIdx) => {
    setActiveSelectedSection(sectionIdx);
  };

  //   const editElement = (sectionIdx, elementIdx) => {
  //   const element = allSection[sectionIdx].formElements[elementIdx];
  //   setActiveSelectedSection(sectionIdx);
  //   setElementForm({
  //     ...element,
  //     editIndex: elementIdx,
  //   });
  //   setDrawerOpen(true);
  // };

  //   const editElement = (sectionIdx, elementIdx) => {
  //     const element = allSection[sectionIdx].formElements[elementIdx];
  //     setActiveSelectedSection(sectionIdx);
  //     setElementForm({
  //       ...element,
  //       editIndex: elementIdx,
  //     });
  //     setDrawerOpen(true);
  //   };

  const removeElement = (elementIdx) => {
    const updatedSections = [...allSection];
    updatedSections[activeSelectedSection].formElements.splice(elementIdx, 1);
    setAllSection(updatedSections);
    showSuccess("Element removed successfully");
  };

  // Save Form
  const handleSaveFn = async () => {
    const payload = {
      appraisalHeader: appraisalHeader?.header,
      appraisalSubHeader: appraisalHeader?.sub_header,
      allSection,
    };

    console.log("Form Structure:", JSON.stringify(payload, null, 2));

    handleSubmit(payload);
  };

  const openSectionDrawer = (sectionIdx) => {
    setOpenSectionDrawerDetail({
      state: true,
      sectionIdx,
    });
  };

  const closeSectionDrawer = () => {
    setOpenSectionDrawerDetail({
      state: false,
      sectionIdx: null,
    });
  };

  const handleUpdateSection = (sectionId, updatedFields) => {
    const updatedSections = [...allSection];
    updatedSections[sectionId].formElements = updatedFields;
    setAllSection(updatedSections);
  };

  const selectedSection = allSection[activeSelectedSection];

  const updateSection = (updatedData) => {
    const updatedSections = [...allSection];
    updatedSections[activeSelectedSection] = {
      ...updatedData,
    };
    setAllSection(updatedSections);
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const predefinedOptions = [
    "Goal Achievement Rate",
    "KPI Score",
    "Competency Rating",
    "Productivity & Efficiency",
    "Engagement & Feedback",
    "Learning & Development Progress",
  ];

  const menu = (
    <Menu
      onClick={({ key }) => {
        setSectionHeader({ ...sectionHeader, header: key });
        setDropdownOpen(false);
      }}
      items={predefinedOptions.map((option) => ({
        key: option,
        label: option,
      }))}
    />
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <OverlayWhileLoading isLoading={isSubmitting} />
      {/* Header */}
      <div className="bg-white border-gray-200 px-6 py-4 sticky top-0 z-10 border-b rounded-t-xl">
        <div className=" mx-auto flex justify-between items-center">
          <div className={clsx("group relative flex-1")}>
            <h1 className="text-2xl font-bold text-gray-900">
              {appraisalHeader?.header || "Performance Title"}
            </h1>
          </div>
          {allSection.length > 0 && (
            <Button
              color="primary"
              onPress={handleSaveFn}
              size="sm"
              isLoading={isSubmitting}
              className="font-helvetica"
            >
              {isEditing ? "Update Template" : "Save Template"}
            </Button>
          )}
        </div>
      </div>

      <div className="flex h-[calc(100vh-5rem)]">
        {/* Left Sidebar - Sections Navigation */}
        {allSection.length > 0 && (
          <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto flex-shrink-0">
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                  Sections
                </h3>
                <span className="text-xs bg-blue-100 text-primary px-2 py-1 rounded-full font-medium">
                  {allSection.length}
                </span>
              </div>
              <p className="text-xs text-gray-500">
                Click to view, drag to reorder
              </p>
            </div>

            <div className="p-3 space-y-2">
              {allSection.map((section, sectionIdx) => (
                <div
                  key={section.sectionId}
                  draggable
                  onDragStart={(e) => handleSectionDragStart(e, sectionIdx)}
                  onDragOver={(e) => handleSectionDragOver(e, sectionIdx)}
                  onDrop={(e) => handleSectionDrop(e, sectionIdx)}
                  onClick={() => setActiveSelectedSection(sectionIdx)}
                  className={`group relative rounded-lg border-1 transition-all cursor-pointer ${
                    activeSelectedSection === sectionIdx
                      ? "border-primary bg-blue-50 shadow-sm"
                      : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
                  } ${
                    draggedOverSection === sectionIdx &&
                    draggedSection !== sectionIdx
                      ? "border-primary border-dashed"
                      : ""
                  }`}
                >
                  {/* Drag Handle */}
                  <div className="absolute left-2 top-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <MdDragIndicator className="text-gray-400" size={18} />
                  </div>

                  <div className="p-3 group-hover:pl-8 pl-3 transition-all duration-300">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <div>
                            <RiFileList3Line
                              className={
                                activeSelectedSection === sectionIdx
                                  ? "text-primary"
                                  : "text-gray-400"
                              }
                              size={16}
                            />
                          </div>
                          <h4
                            className={`text-sm font-medium capitalize ${
                              activeSelectedSection === sectionIdx
                                ? "text-primary font-semibold"
                                : "text-black"
                            }`}
                          >
                            {section.header?.toLowerCase()}
                          </h4>
                        </div>
                      </div>

                      {/* Section Actions */}
                      <Dropdown
                        menu={{
                          items: [
                            {
                              key: "edit",
                              label: (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    editSectionFn(sectionIdx);
                                  }}
                                  className="flex items-center gap-2 w-full"
                                >
                                  <FaEdit size={14} color="blue" />
                                  <span>Edit Section</span>
                                </button>
                              ),
                            },
                            {
                              key: "delete",
                              label: (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeSection(sectionIdx);
                                  }}
                                  className="flex items-center gap-2 w-full text-red-600"
                                >
                                  <MdOutlineDeleteOutline size={16} />
                                  <span>Delete Section</span>
                                </button>
                              ),
                            },
                          ],
                        }}
                        trigger={["click"]}
                        placement="bottomRight"
                      >
                        <button
                          onClick={(e) => e.stopPropagation()}
                          className="opacity-0 group-hover:opacity-100 hover:bg-gray-200 p-1.5 rounded transition-all"
                        >
                          <IoEllipsisVerticalSharp size={16} />
                        </button>
                      </Dropdown>
                    </div>
                  </div>

                  {/* Active Indicator */}
                  {activeSelectedSection === sectionIdx && (
                    <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-primary rounded-l-lg"></div>
                  )}
                </div>
              ))}

              {/* Add Section Button */}
              <button
                onClick={() => setOpenSectionModal(true)}
                className="w-full flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-primary hover:text-primary hover:bg-blue-50 transition-all"
              >
                <IoIosAddCircleOutline size={20} />
                <span className="text-sm font-medium">Add Section</span>
              </button>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto p-6">
            {allSection.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm border-2 border-dashed border-gray-300 p-16 text-center">
                <IoIosAddCircleOutline
                  size={80}
                  className="text-gray-300 mx-auto mb-4 cursor-pointer hover:text-primary transition-colors"
                  onClick={() => setOpenSectionModal(true)}
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Start Building Your Form
                </h3>
                <p className="text-gray-600 mb-6">
                  Add your first section to get started
                </p>
                <Button
                  color="primary"
                  onPress={() => setOpenSectionModal(true)}
                  className="bg-primary"
                >
                  Add New Section
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Active Section Display */}
                {allSection[activeSelectedSection] && (
                  <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleDrop(e, activeSelectedSection)}
                  >
                    <Card className="shadow-md border border-gray-200">
                      {/* Section Header */}
                      <div className="bg-gradient-to-r from-gray-100 to-gray-50 border-b border-gray-300 px-6 py-5">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h2 className="text-xl font-bold text-gray-900">
                              {allSection[activeSelectedSection].header}
                            </h2>
                            {allSection[activeSelectedSection].sub_header && (
                              <p className="text-sm text-gray-600 mt-1">
                                {allSection[activeSelectedSection].sub_header}
                              </p>
                            )}
                            {/* <div className="flex gap-4 mt-6">
                              <p className="font-medium">Respondent:</p>
                              <div>
                                <Radio.Group
                                  value={selectedSection.respondent}
                                  onChange={(e) => {
                                    updateSection({
                                      ...selectedSection,
                                      respondent: e.target.value,
                                    });
                                  }}
                                >
                                  <Radio value="appraisee">Appraisee</Radio>
                                  <Radio value="appraiser">Appraiser</Radio>
                                  <Radio value="counter-sign">
                                    Counter Signing
                                  </Radio>
                                </Radio.Group>
                              </div>
                            </div> */}
                          </div>

                          <div className="flex gap-2 items-center">
                            <Button
                              isIconOnly
                              radius="full"
                              variant="flat"
                              onPress={() =>
                                openSectionDrawer(activeSelectedSection)
                              }
                              className="hover:bg-blue-100"
                            >
                              <BsInputCursorText
                                size={20}
                                className="text-primary"
                              />
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Section Content */}
                      <CardBody className="p-6">
                        {allSection[activeSelectedSection].formElements
                          .length === 0 ? (
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-16 text-center bg-gray-50">
                            <BsInputCursorText
                              size={48}
                              className="text-gray-300 mx-auto mb-4"
                            />
                            <p className="text-gray-600 font-medium mb-2">
                              No fields yet
                            </p>
                            <p className="text-sm text-gray-500 mb-4">
                              Click the icon above to add fields to this section
                            </p>
                            <Button
                              color="primary"
                              variant="flat"
                              onPress={() =>
                                openSectionDrawer(activeSelectedSection)
                              }
                              startContent={<BsInputCursorText />}
                            >
                              Add Fields
                            </Button>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {allSection[activeSelectedSection].formElements.map(
                              (element, elementIdx) => (
                                <div
                                  key={elementIdx}
                                  draggable
                                  onDragStart={() =>
                                    handleDragStart(elementIdx)
                                  }
                                  onDragOver={(e) =>
                                    handleDragOver(e, elementIdx)
                                  }
                                >
                                  <DraggableFormElement
                                    element={element}
                                    index={elementIdx}
                                    onEdit={() =>
                                      editElement(
                                        activeSelectedSection,
                                        elementIdx,
                                      )
                                    }
                                    // onEdit={() =>
                                    //   editElement(
                                    //     activeSelectedSection,
                                    //     elementIdx
                                    //   )
                                    // }
                                    openSectionDrawer={() =>
                                      openSectionDrawer(activeSelectedSection)
                                    }
                                    onRemove={() => removeElement(elementIdx)}
                                    isDragging={draggedItem === elementIdx}
                                    isDraggedOver={
                                      draggedOverItem === elementIdx
                                    }
                                    componentRole={role}
                                  />
                                </div>
                              ),
                            )}
                            {/* <div className="p-4 border rounded-xl">
                              <Checkbox
                                isSelected={selectedSection?.gradable}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    // eslint-disable-next-line no-unused-vars

                                    updateSection({
                                      ...selectedSection,
                                      gradable: e.target.checked,
                                      section_grade_element: {
                                        id: crypto.randomUUID(),
                                        isRequired: true,
                                        type: "checkbox",
                                        options: gradingOption,
                                      },
                                    });
                                  } else {
                                    updateSection({
                                      ...selectedSection,
                                      gradable: e.target.checked,
                                      section_grade_element: null,
                                    });
                                  }
                                }}
                                size="large"
                                classNames={{
                                  label: "text-gray-500 text-lg",
                                }}
                              >
                                Section Gradable?
                              </Checkbox>
                              {selectedSection.gradable && (
                                <div className="mt-4">
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    To be gradaded by:
                                  </label>
                                  <div className="flex gap-4">
                                    <Radio.Group
                                      value={selectedSection.grade_by}
                                      onChange={(e) => {
                                        updateSection({
                                          ...selectedSection,
                                          grade_by: e.target.value,
                                        });
                                      }}
                                    >
                                      <Radio value="counter_sign">
                                        Counter Signing
                                      </Radio>
                                      <Radio value="appraiser">Appraiser</Radio>
                                    </Radio.Group>
                                  </div>
                                </div>
                              )}
                            </div> */}
                          </div>
                        )}
                      </CardBody>
                    </Card>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Section Modal */}
      <Modal
        open={openSectionModal}
        onCancel={() => {
          setOpenSectionModal(false);
          setEditSection(false);
          setSectionHeader({ header: "", sub_header: "" });
        }}
        title={
          <div className="text-lg font-semibold">
            {editSection ? "Edit Section" : "Add New Section"}
          </div>
        }
        footer={[
          <Button
            key="cancel"
            variant="flat"
            onPress={() => {
              setOpenSectionModal(false);
              setEditSection(false);
              setSectionHeader({ header: "", sub_header: "" });
            }}
          >
            Cancel
          </Button>,
          <Button
            key="save"
            color="primary"
            onPress={addSection}
            className="bg-primary"
          >
            {editSection ? "Update" : "Add"} Section
          </Button>,
        ]}
      >
        <div className="space-y-4 pt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Section Header <span className="text-red-500">*</span>
            </label>
            <div style={{ position: "relative" }}>
              <Input
                size="large"
                value={sectionHeader.header}
                onChange={(e) =>
                  setSectionHeader({ ...sectionHeader, header: e.target.value })
                }
                onFocus={() => setDropdownOpen(true)}
                onBlur={() => setTimeout(() => setDropdownOpen(false), 200)}
                placeholder="e.g., Personal Information"
              />
              {dropdownOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    backgroundColor: "white",
                    border: "1px solid #d9d9d9",
                    borderRadius: "4px",
                    maxHeight: "200px",
                    overflowY: "auto",
                    zIndex: 1000,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  }}
                >
                  {predefinedOptions.map((option) => (
                    <div
                      key={option}
                      onClick={() => {
                        setSectionHeader({ ...sectionHeader, header: option });
                        setDropdownOpen(false);
                      }}
                      style={{
                        padding: "8px 12px",
                        cursor: "pointer",
                        ":hover": { backgroundColor: "#f5f5f5" },
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "#f5f5f5")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "white")
                      }
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sub Header (Optional)
            </label>
            <Input
              size="large"
              value={sectionHeader.sub_header}
              onChange={(e) =>
                setSectionHeader({
                  ...sectionHeader,
                  sub_header: e.target.value,
                })
              }
              placeholder="e.g., Please provide your details"
            />
          </div>
        </div>
      </Modal>

      {/* Section Form Drawer */}
      {openSectionDrawerDetail.state && (
        <SectionFormDrawer
          openSectionEditor={openSectionDrawerDetail.state}
          closeSectionEditor={closeSectionDrawer}
          sectionId={openSectionDrawerDetail.sectionIdx}
          selectedSection={allSection[openSectionDrawerDetail.sectionIdx]}
          onUpdateSection={handleUpdateSection}
        />
      )}
    </div>
  );
};

export default FormBuilder;

FormBuilder.propTypes = {
  role: PropTypes.string,
  appraisalHeader: PropTypes.object,
  setAppraisalHeader: PropTypes.func,
  handleSubmit: PropTypes.func,
  isSubmitting: PropTypes.bool,
  sections: PropTypes.array,
  isEditing: PropTypes.bool,
};
