// ============================================
// 3. ElementDrawer.jsx
// ============================================
import { Drawer, Input as AntInput } from "antd";
import { Button, Checkbox, Chip } from "@nextui-org/react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import PropTypes from "prop-types";

const ElementDrawer = ({
  open,
  onClose,
  elementForm,
  setElementForm,
  onSave,
  isEditing,
}) => {
  const [optionInput, setOptionInput] = useState("");

  const optionsElements = ["radio", "select", "checkbox"];
  const nonRequiredElement = ["header", "paragraph", "submit"];
  const nonPlaceholderElement = [
    "checkbox",
    "radio",
    "submit",
    "header",
    "paragraph",
  ];

  const addOption = () => {
    if (!optionInput) return;
    const value = optionInput.toLowerCase().split(" ").join("_");
    setElementForm({
      ...elementForm,
      options: [
        ...elementForm.options,
        {
          id: elementForm.options.length,
          label: optionInput,
          value,
        },
      ],
    });
    setOptionInput("");
  };

  const removeOption = (optionToRemove) => {
    setElementForm({
      ...elementForm,
      options: elementForm.options.filter((opt) => opt !== optionToRemove),
    });
  };

  return (
    <Drawer
      title={`${isEditing ? "Edit" : "Add"} ${
        elementForm.type.charAt(0).toUpperCase() + elementForm.type.slice(1)
      } Element`}
      placement="right"
      onClose={onClose}
      open={open}
      width={500}
      footer={
        <div className="flex justify-end space-x-2">
          <Button variant="flat" onPress={onClose}>
            Cancel
          </Button>
          <Button color="primary" onPress={onSave}>
            {isEditing ? "Update" : "Add"} Element
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Label Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Label <span className="text-red-500">*</span>
          </label>
          <AntInput
            size="large"
            value={elementForm.label}
            onChange={(e) =>
              setElementForm({ ...elementForm, label: e.target.value })
            }
            placeholder={`Enter ${elementForm.type} label`}
          />
        </div>

        {/* Placeholder Input */}
        {!nonPlaceholderElement.includes(elementForm.type) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Placeholder (Optional)
            </label>
            <AntInput
              size="large"
              value={elementForm.placeholder}
              onChange={(e) =>
                setElementForm({ ...elementForm, placeholder: e.target.value })
              }
              placeholder="Enter placeholder text"
            />
          </div>
        )}

        {/* Required Checkbox */}
        {!nonRequiredElement.includes(elementForm.type) && (
          <div>
            <Checkbox
              isSelected={elementForm.isRequired}
              onChange={(e) =>
                setElementForm({ ...elementForm, isRequired: e.target.checked })
              }
            >
              Mark as required field
            </Checkbox>
          </div>
        )}

        {/* Specify For */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Visibility
          </label>
          <div className="flex gap-4">
            <Checkbox
              isSelected={elementForm.specifyFor?.all}
              onChange={(e) =>
                setElementForm({
                  ...elementForm,
                  specifyFor: {
                    all: e.target.checked,
                    for_HR: false,
                  },
                })
              }
              radius="full"
              size="sm"
            >
              All
            </Checkbox>
            <Checkbox
              isSelected={elementForm.specifyFor?.for_HR}
              onChange={(e) =>
                setElementForm({
                  ...elementForm,
                  specifyFor: {
                    for_HR: e.target.checked,
                    all: false,
                  },
                })
              }
              radius="full"
              size="sm"
            >
              For HR only
            </Checkbox>
          </div>
        </div>

        {/* Options for select, radio, checkbox */}
        {optionsElements.includes(elementForm.type) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Options <span className="text-red-500">*</span>
            </label>

            {/* Display existing options */}
            <div className="flex flex-wrap gap-2 mb-3">
              {elementForm.options?.map((option, index) => (
                <Chip
                  key={index}
                  onClose={() => removeOption(option)}
                  variant="flat"
                >
                  {option.label}
                </Chip>
              ))}
            </div>

            {/* Add new option */}
            <div className="flex space-x-2">
              <AntInput
                placeholder="Option label"
                value={optionInput}
                onChange={(e) => setOptionInput(e.target.value)}
                onPressEnter={addOption}
                size="large"
              />
              <Button
                color="primary"
                onPress={addOption}
                isIconOnly
                className="min-w-[40px]"
              >
                <FaPlus />
              </Button>
            </div>
          </div>
        )}
      </div>
    </Drawer>
  );
};

export default ElementDrawer;

ElementDrawer.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  elementForm: PropTypes.object,
  setElementForm: PropTypes.func,
  onSave: PropTypes.func,
  isEditing: PropTypes.bool,
};
