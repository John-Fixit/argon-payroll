// // ============================================
// // 2. DraggableFormElement.jsx
// // ============================================
// import { MdDragIndicator, MdModeEdit, MdDeleteOutline } from "react-icons/md";
// import { Button, Input, Textarea } from "@nextui-org/react";
// import { Checkbox, Radio, Rate, Select } from "antd";

// const DraggableFormElement = ({
//   element,
//   index,
//   onEdit,
//   onRemove,
//   isDragging,
//   isDraggedOver,
//   componentRole,
// }) => {
//   const nonLabelElements = ["submit", "header", "paragraph"];

//   const renderPreview = () => {
//     switch (element?.type) {
//       case "header":
//         return (
//           <h2 className="text-2xl font-bold text-gray-800">{element?.label}</h2>
//         );
//       case "paragraph":
//         return <p className="text-gray-600">{element?.label}</p>;
//       case "text":
//         return (
//           <Input
//             type="text"
//             placeholder={element?.placeholder}
//             className="w-full"
//             size="large"
//             disabled
//           />
//         );
//       case "textarea":
//         return (
//           <Textarea
//             rows={4}
//             placeholder={element?.placeholder}
//             className="w-full"
//             disabled
//           />
//         );
//       case "checkbox":
//         return <Checkbox.Group options={element?.options} disabled />;
//       case "radio":
//         return (
//           <Radio.Group disabled>
//             {element?.options?.map((option, i) => (
//               <Radio key={i} value={option.value}>
//                 {option.label}
//               </Radio>
//             ))}
//           </Radio.Group>
//         );
//       case "select":
//         return (
//           <Select
//             options={element?.options}
//             size="large"
//             className="w-full"
//             disabled
//           />
//         );
//       case "rate":
//         return <Rate disabled />;
//       case "submit":
//         return (
//           <Button className="bg-blue-500 text-white" radius="sm" size="sm">
//             {element?.label}
//           </Button>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div
//       className={`group relative bg-white rounded-lg border transition-all ${
//         isDragging ? "opacity-50" : ""
//       } ${
//         isDraggedOver
//           ? "border-2 border-blue-400 border-dashed"
//           : "border-gray-200"
//       } hover:shadow-md p-4`}
//     >
//       {/* Drag Handle */}
//       {componentRole !== "edit" && (
//         <div className="absolute left-2 top-4 cursor-move opacity-0 group-hover:opacity-100 transition-opacity">
//           <MdDragIndicator className="text-gray-400" size={20} />
//         </div>
//       )}

//       {/* Action Buttons */}
//       {componentRole !== "edit" && (
//         <div className="absolute right-2 top-4 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
//           <Button
//             isIconOnly
//             size="sm"
//             type="button"
//             variant="flat"
//             onPress={onEdit}
//           >
//             <MdModeEdit size={18} color="blue" />
//           </Button>
//           <Button
//             isIconOnly
//             size="sm"
//             type="button"
//             variant="flat"
//             onPress={onRemove}
//           >
//             <MdDeleteOutline size={18} color="red" />
//           </Button>
//         </div>
//       )}

//       {/* Element Content */}
//       <div className={componentRole !== "edit" ? "ml-6 mr-16" : ""}>
//         {!nonLabelElements.includes(element?.type) && (
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             {element?.label}
//             {element?.isRequired && (
//               <span className="text-red-500 ml-1">*</span>
//             )}
//           </label>
//         )}
//         {renderPreview()}
//         {element?.gradable && (
//           <div className="mt-2">
//             <Radio.Group
//               size="large"
//               options={element?.grade_element?.options}
//               disabled
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DraggableFormElement;

// ============================================
// DraggableFormElement.jsx
// ============================================
import { MdDragIndicator, MdModeEdit, MdDeleteOutline } from "react-icons/md";
import { Button, Input, Textarea } from "@nextui-org/react";
import { Checkbox, Radio, Rate, Select } from "antd";

const DraggableFormElement = ({
  element,
  index,
  onEdit,
  onRemove,
  isDragging,
  isDraggedOver,
  componentRole,
  openSectionDrawer,
}) => {
  const nonLabelElements = ["submit", "header", "paragraph"];

  const renderPreview = (field, isSubQuestion = false) => {
    switch (field?.type) {
      case "header":
        return (
          <h2 className="text-2xl font-bold text-gray-800">{field?.label}</h2>
        );
      case "paragraph":
        return <p className="text-gray-600">{field?.label}</p>;
      case "text":
        return (
          <Input
            type="text"
            placeholder={field?.placeholder}
            className="w-full"
            size={isSubQuestion ? "md" : "large"}
            disabled
          />
        );
      case "textarea":
        return (
          <Textarea
            rows={isSubQuestion ? 3 : 4}
            placeholder={field?.placeholder}
            className="w-full"
            disabled
          />
        );
      case "checkbox":
        return <Checkbox.Group options={field?.options} disabled />;
      case "radio":
        return (
          <Radio.Group disabled className="flex flex-col space-y-2">
            {field?.options?.map((option, i) => (
              <Radio key={i} value={option.value}>
                {option.label}
              </Radio>
            ))}
          </Radio.Group>
        );
      case "select":
        return (
          <Select
            options={field?.options}
            size={isSubQuestion ? "middle" : "large"}
            className="w-full"
            disabled
          />
        );
      case "rate":
        return <Rate disabled />;
      case "submit":
        return (
          <Button className="bg-blue-500 text-white" radius="sm" size="sm">
            {field?.label}
          </Button>
        );
      default:
        return null;
    }
  };

  const renderGrading = (field, isSubQuestion = false) => {
    if (!field?.gradable || !field?.grade_element?.options) return null;

    return (
      <div className={`${isSubQuestion ? "mt-3" : "mt-4"} space-y-2`}>
        <div className="flex flex-wrap gap-3 items-center">
          {field.grade_element.options.map((option, idx) => (
            <div key={idx} className="flex items-center space-x-2">
              <Radio value={option.value} disabled />
              <span className="text-sm text-gray-600">{option.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSubQuestion = (subQuestion, subIndex) => {
    return (
      <div
        key={subQuestion.id || subIndex}
        className="ml-6 mt-3 p-4 bg-gray-50 border-l-4 border-blue-300 rounded-md"
      >
        {/* Sub-question label */}
        {!nonLabelElements.includes(subQuestion?.type) && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {subQuestion?.label}
            {subQuestion?.isRequired && (
              <span className="text-red-500 ml-1">*</span>
            )}
          </label>
        )}

        {/* Sub-question input */}
        {renderPreview(subQuestion, true)}

        {/* Sub-question grading */}
        {renderGrading(subQuestion, true)}
      </div>
    );
  };

  return (
    <div
      className={`group relative bg-white rounded-lg border transition-all ${
        isDragging ? "opacity-50" : ""
      } ${
        isDraggedOver
          ? "border-2 border-blue-400 border-dashed"
          : "border-gray-200"
      } hover:shadow-md p-4`}
    >
      {/* Drag Handle */}
      {componentRole !== "edit" && (
        <div className="absolute left-2 top-4 cursor-move opacity-0 group-hover:opacity-100 transition-opacity">
          <MdDragIndicator className="text-gray-400" size={20} />
        </div>
      )}

      {/* Action Buttons */}
      {componentRole !== "edit" && (
        <div className="absolute right-2 top-4 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
          <Button
            isIconOnly
            size="sm"
            type="button"
            variant="flat"
            onPress={openSectionDrawer}
          >
            <MdModeEdit size={18} color="blue" />
          </Button>
          <Button
            isIconOnly
            size="sm"
            type="button"
            variant="flat"
            onPress={onRemove}
          >
            <MdDeleteOutline size={18} color="red" />
          </Button>
        </div>
      )}

      {/* Main Element Content */}
      <div className={componentRole !== "edit" ? "ml-6 mr-16" : ""}>
        {/* Main Question Label */}
        {!nonLabelElements.includes(element?.type) && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {element?.label}
            {element?.isRequired && (
              <span className="text-red-500 ml-1">*</span>
            )}
          </label>
        )}

        {/* Render main element or sub-questions */}
        {element?.has_sub_question && element?.sub_question?.length > 0 ? (
          // If has sub-questions, render them
          <div className="space-y-3">
            {element.sub_question.map((subQuestion, subIndex) =>
              renderSubQuestion(subQuestion, subIndex)
            )}
          </div>
        ) : (
          // Otherwise render normal element
          <>
            {renderPreview(element, false)}
            {renderGrading(element, false)}
          </>
        )}
      </div>
    </div>
  );
};

export default DraggableFormElement;
