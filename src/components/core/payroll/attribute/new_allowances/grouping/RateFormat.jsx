import { useState, useEffect, useCallback, useMemo } from "react";
import { Modal, Select, Button, Input, Space, Divider, Tag } from "antd";
import { PlusOutlined, ClearOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { useGetAllowanceAbbrv } from "../../../../../../API/allowance";
import useCurrentUser from "../../../../../../hooks/useCurrentUser";

const RateFormat = ({
  isOpenRateFormat,
  closeRateFormat,
  getValues,
  defaultFormula,
  onSubmit,
}) => {
  const [formulaElements, setFormulaElements] = useState([]);
  const [currentElement, setCurrentElement] = useState({
    type: "coefficient", // 'coefficient', 'abbreviation', 'operator', 'bracket'
    value: "",
    coefficient: 1,
  });

  const { userData } = useCurrentUser();

  const { data: abbreviations } = useGetAllowanceAbbrv({
    company_id: userData?.data?.COMPANY_ID,
    allowance_type: getValues?.allowance_type || 0,
  });

  // Available operators
  const operators = [
    { label: "+", value: "+" },
    { label: "−", value: "-" },
    { label: "×", value: "*" },
    { label: "÷", value: "/" },
  ];

  // Available brackets
  const brackets = [
    { label: "(", value: "(" },
    { label: ")", value: ")" },
  ];

  const lastElement = formulaElements.at(-1);

  // Element types
  const defaultElementTypes = useMemo(
    () => [
      { label: "Number", value: "coefficient" },
      { label: "Abbreviation", value: "abbreviation" },
      { label: "Operator", value: "operator" },
      { label: "Bracket", value: "bracket" },
    ],
    []
  );

  const elementTypes = useMemo(() => {
    let filteredElements = [...defaultElementTypes];

    if (lastElement?.type) {
      filteredElements = defaultElementTypes.filter(
        (el) => el?.value !== lastElement?.type
      );
    }
    if (lastElement?.type === "number") {
      filteredElements = defaultElementTypes.filter(
        (el) => el.value !== "abbreviation"
      );
    }
    if (lastElement?.type === "abbreviation") {
      filteredElements = defaultElementTypes.filter(
        (el) => el.value !== "number"
      );
    }

    return filteredElements;
  }, [defaultElementTypes, lastElement]);

  // Get abbreviation options from API data
  const abbreviationOptions =
    abbreviations?.map((item) => ({
      label: item.name,
      value: item.code,
    })) || [];

  const addElement = ({ paramElement }) => {
    const newElement = paramElement || currentElement;

    if (!newElement.value && newElement.type !== "coefficient") return;

    let elementToAdd = { ...newElement };

    // For coefficient type, use the coefficient value
    if (newElement.type === "coefficient") {
      elementToAdd.value = newElement.coefficient.toString();
    }

    setFormulaElements([
      ...formulaElements,
      { ...elementToAdd, id: Date.now() },
    ]);

    // Reset current element
    setCurrentElement({
      type: "",
      value: "",
      coefficient: 1,
    });
  };

  const removeElement = (id) => {
    setFormulaElements(formulaElements.filter((el) => el.id !== id));
  };

  const clearFormula = () => {
    setFormulaElements([]);
  };

  const addQuickFormula = useCallback((formula) => {
    const elements = [];
    let id = Date.now();

    formula?.forEach((item) => {
      elements.push({
        ...item,
        id: id++,
      });
    });

    setFormulaElements((prevElements) => [...prevElements, ...elements]);
  }, []);

  //if there's default formular
  const formularParser = useCallback((formula) => {
    const formulaSpliting = formula?.split(" ");

    const formularMap = formulaSpliting.map((el) => {
      const operator = operators.find((op) => op.value === el)
        ? "operator"
        : null;
      const bracket = brackets.find((op) => op.value === el) ? "bracket" : null;
      const number = Number(el) ? "number" : null;
      const abbreviation = abbreviationOptions.find(
        (abbrv) => abbrv.value === el
      )
        ? "abbreviation"
        : null;

      const type = operator || number || abbreviation || bracket;

      return {
        type: type,
        value: el,
      };
    });
    return formularMap;
  }, []);

  useEffect(() => {
    if (defaultFormula) {
      const parsedFormula = formularParser(defaultFormula);
      addQuickFormula(parsedFormula);
    }
  }, [defaultFormula, addQuickFormula, formularParser]);

  // Quick formula templates
  // const quickFormulas = [
  //   {
  //     name: "Basic (A + B)",
  //     elements: [
  //       { type: "abbreviation", value: "BSC" },
  //       { type: "operator", value: "+" },
  //       { type: "abbreviation", value: "TRNS" },
  //     ],
  //   },
  //   {
  //     name: "Weighted (2 × A + B)",
  //     elements: [
  //       { type: "coefficient", value: "2" },
  //       { type: "operator", value: "*" },
  //       { type: "abbreviation", value: "BSC" },
  //       { type: "operator", value: "+" },
  //       { type: "abbreviation", value: "TRNS" },
  //     ],
  //   },
  //   {
  //     name: "Complex (A + (B × C))",
  //     elements: [
  //       { type: "abbreviation", value: "BSC" },
  //       { type: "operator", value: "+" },
  //       { type: "bracket", value: "(" },
  //       { type: "abbreviation", value: "TRNS" },
  //       { type: "operator", value: "*" },
  //       { type: "abbreviation", value: "HOU" },
  //       { type: "bracket", value: ")" },
  //     ],
  //   },
  // ];

  const generateFormulaString = () => {
    return formulaElements
      .map((el) => {
        if (el.type === "abbreviation") {
          return el.value;
        } else if (el.type === "operator") {
          return ` ${el.value} `;
        } else if (el.type === "bracket") {
          return el.value;
        } else if (el.type === "coefficient") {
          return el.value;
        }
        return el.value;
      })
      .join("");
  };

  const validateFormula = () => {
    const formula = generateFormulaString();
    if (!formula.trim()) return false;

    // Basic validation - check for balanced brackets
    const openBrackets = (formula.match(/\(/g) || []).length;
    const closeBrackets = (formula.match(/\)/g) || []).length;

    return openBrackets === closeBrackets;
  };

  const handleOk = () => {
    if (!validateFormula()) {
      alert("Please check your formula for errors (e.g., unbalanced brackets)");
      return;
    }

    const finalFormula = generateFormulaString();
    onSubmit(finalFormula);
    // Reset form
    setFormulaElements([]);
    setCurrentElement({
      type: "coefficient",
      value: "",
      coefficient: 1,
    });
  };

  const renderElementInput = () => {
    switch (currentElement.type) {
      case "coefficient":
        return (
          <Input
            type="number"
            placeholder="Enter number"
            value={currentElement.coefficient}
            onChange={(e) =>
              setCurrentElement({
                ...currentElement,
                coefficient: parseFloat(e.target.value) || 0,
              })
            }
            style={{ width: 120 }}
          />
        );
      case "abbreviation":
        return (
          <Select
            placeholder="Select abbreviation"
            value={currentElement.value}
            onChange={(value) => {
              setCurrentElement({ ...currentElement, value });
              addElement({ paramElement: { ...currentElement, value } });
            }}
            options={abbreviationOptions}
            style={{ width: 150 }}
          />
        );
      case "operator":
        return (
          <Select
            placeholder="Select operator"
            value={currentElement.value}
            onChange={(value) => {
              setCurrentElement({ ...currentElement, value });
              addElement({ paramElement: { ...currentElement, value } });
            }}
            options={operators}
            style={{ width: 100 }}
          />
        );
      case "bracket":
        return (
          <Select
            placeholder="Select bracket"
            value={currentElement.value}
            onChange={(value) =>
              // setCurrentElement({ ...currentElement, value })
              addElement({ paramElement: { ...currentElement, value } })
            }
            options={brackets}
            style={{ width: 80 }}
          />
        );
      default:
        return null;
    }
  };

  const getElementColor = (type) => {
    switch (type) {
      case "coefficient":
        return "blue";
      case "abbreviation":
        return "green";
      case "operator":
        return "orange";
      case "bracket":
        return "purple";
      default:
        return "default";
    }
  };

  return (
    <Modal
      title={`Rate Formula Builder`}
      centered
      open={isOpenRateFormat}
      onOk={handleOk}
      okText="Set Formula"
      onCancel={closeRateFormat}
      width={700}
      okButtonProps={{ disabled: formulaElements.length === 0 }}
    >
      <div style={{ width: "100%" }}>
        <Divider />
        {/* Element Builder */}
        <div>
          <h4>Add Element:</h4>
          <Space>
            <Select
              value={currentElement.type}
              onChange={(value) =>
                setCurrentElement({
                  type: value,
                  value: "",
                  coefficient: value === "coefficient" ? 1 : undefined,
                })
              }
              options={elementTypes}
              style={{ width: 120 }}
            />
            {renderElementInput()}
            {currentElement.type === "coefficient" && (
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={addElement}
                disabled={
                  !currentElement.value && currentElement.type !== "coefficient"
                }
              >
                Add
              </Button>
            )}
          </Space>
        </div>

        {/* Formula Preview */}
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h4>Formula Preview:</h4>
            {formulaElements.length > 0 && (
              <Button
                size="small"
                icon={<ClearOutlined />}
                onClick={clearFormula}
              >
                Clear All
              </Button>
            )}
          </div>

          <div
            style={{
              minHeight: "60px",
              border: "1px dashed #d9d9d9",
              borderRadius: "6px",
              padding: "12px",
              backgroundColor: "#fafafa",
            }}
          >
            {formulaElements.length === 0 ? (
              <span style={{ color: "#999" }}>
                Your formula will appear here...
              </span>
            ) : (
              <Space wrap size="small">
                {formulaElements.map((element) => (
                  <Tag
                    key={element.id}
                    color={getElementColor(element.type)}
                    closable
                    onClose={() => removeElement(element.id)}
                    style={{ margin: "2px", fontSize: "14px" }}
                  >
                    {element.value}
                  </Tag>
                ))}
              </Space>
            )}
          </div>

          {formulaElements.length > 0 && (
            <div
              style={{
                marginTop: "8px",
                padding: "8px",
                backgroundColor: "#f0f0f0",
                borderRadius: "4px",
              }}
            >
              <strong>Formula String: </strong>
              <code>{generateFormulaString()}</code>
            </div>
          )}
        </div>

        {/* Validation Status */}
        {formulaElements.length > 0 && (
          <div className="mt-2">
            <Tag color={validateFormula() ? "success" : "error"}>
              {validateFormula() ? "✓ Valid Formula" : "✗ Invalid Formula"}
            </Tag>
          </div>
        )}
      </div>
    </Modal>
  );
};

RateFormat.propTypes = {
  isOpenRateFormat: PropTypes.bool,
  closeRateFormat: PropTypes.func,
  onSubmit: PropTypes.func,
  getValues: PropTypes.func,
  defaultFormula: PropTypes.string,
};

export default RateFormat;
