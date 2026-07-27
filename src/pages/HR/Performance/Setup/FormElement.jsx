/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useState } from "react";
import { Button, SelectItem, Textarea } from "@nextui-org/react";
import { Input, Select, Checkbox, Rate, Radio } from "antd";
import { IoMdClose } from "react-icons/io";
import { MdDeleteOutline, MdModeEdit } from "react-icons/md";
import { Controller } from "react-hook-form";
import { MdErrorOutline } from "react-icons/md";

const { TextArea } = Input;

const nonLabelElements = ["submit", "header", "paragraph"];

const desc = ["poor", "fair", "good", "very good", "excellent"];

const FormElement = ({
  element,
  componentRole,
  elementKey,
  setValue,
  control,
  removeElementFn,
  editElementFn,
}) => {
  const handleRateChange = (e, elementKey) => {
    if (e > 2) {
      setValue(elementKey, { rate: e, comment: "" });
    }
    setValue(elementKey, { rate: e, comment: "" });
  };

  let Element;
  switch (element?.type) {
    case "header":
      Element = (
        <h2 className="text-2xl font-bold tracking-wide">{element?.label}</h2>
      );
      break;
    case "paragraph":
      Element = <p className="cols-span-2">{element?.label}</p>;
      break;
    case "text":
      Element = (
        <Controller
          name={element?.elementKey}
          control={control}
          rules={{
            required: element?.isRequired
              ? `${element?.label} is required`
              : false,
          }}
          render={({ field, fieldState, formState }) => {
            return (
              <>
                <Input
                  type="text"
                  ref={field.ref}
                  status={fieldState.error && "error"}
                  {...field}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  className="w-full"
                  size="large"
                />
                {!!fieldState.error && (
                  <span className="text-red-500">
                    {fieldState.error.message}
                  </span>
                )}
              </>
            );
          }}
        ></Controller>
      );
      break;
    case "checkbox":
      Element = (
        <Controller
          name={element?.elementKey}
          control={control}
          render={({ field }) => {
            return (
              <Checkbox.Group
                ref={field.ref}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                options={element?.options}
              />
            );
          }}
        ></Controller>
      );
      break;
    case "radio":
      Element = (
        <Controller
          name={element?.elementKey}
          control={control}
          render={({ field, formState }) => {
            return (
              <Radio.Group
                ref={field.ref}
                name={field.name}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
              >
                {element?.options?.map((option, index) => (
                  <Radio key={option?.id + "_" + index} value={option.value}>
                    {option.label}
                  </Radio>
                ))}
              </Radio.Group>
            );
          }}
        />
      );
      break;
    case "rate":
      Element = (
        <Controller
          name={element?.elementKey}
          control={control}
          render={({ field }) => {
            return (
              <div className="flex flex-col space-y-2">
                <Rate
                  ref={field.ref}
                  tooltips={desc}
                  onChange={(e) => handleRateChange(e, element?.elementKey)}
                  value={field.value?.rate}
                  onBlur={field.onBlur}
                />
                {field.value?.rate < 3 && (
                  <>
                    <label htmlFor="comment">Comment</label>
                    <TextArea
                      rows={4}
                      ref={field.ref}
                      name={field.value?.comment}
                      onChange={(e) => {
                        setValue(field.name, {
                          rate: field?.value?.rate,
                          comment: e.target.value,
                        });
                      }}
                      value={field.value?.comment}
                      onBlur={field.onBlur}
                      className="w-full"
                      placeholder="Comment why here..."
                    />
                  </>
                )}
              </div>
            );
          }}
        />
      );
      break;
    case "textarea":
      Element = (
        <Controller
          name={element?.elementKey}
          control={control}
          render={({ field }) => {
            return (
              <TextArea
                rows={4}
                ref={field.ref}
                name={field.name}
                onChange={field.onChange}
                value={field.value}
                onBlur={field.onBlur}
                className="w-full"
              />
            );
          }}
        />
      );
      break;
    case "select":
      Element = (
        <Controller
          name={element?.elementKey}
          control={control}
          render={({ field }) => {
            return (
              <Select
                options={element?.options}
                size="large"
                className="w-full"
                ref={field.ref}
                onChange={field.onChange}
                value={field.value}
                onBlur={field.onBlur}
              />
            );
          }}
        />
      );
      break;
    case "submit":
      Element = (
        <Button
          type="submit"
          className="bg-blue-500 text-white"
          radius="sm"
          size="sm"
        >
          {element?.label}
        </Button>
      );
      break;
    // Add cases for other form element types
    default:
      Element = (
        <Input
          type={element?.type}
          name={element?.elementKey}
          placeholder={element?.placeholder}
          className="w-full"
        />
      );
    // Element = null
  }

  return (
    <div className="flex flex-col space-y-1 group hover:border rounded-lg p-3 transition-all duration-300">
      <div className="flex justify-between items-end">
        {nonLabelElements?.includes(element?.type) ? (
          ""
        ) : (
          <label>{element?.label}</label>
        )}
        {componentRole === "edit" ? (
          ""
        ) : (
          <div className="opacity-0 transition duration-300 group-hover:opacity-100">
            <div className="flex space-x-1">
              <Button
                isIconOnly
                size="sm"
                type="button"
                variant="flat"
                onPress={editElementFn}
              >
                <MdModeEdit size={20} color="blue" />
              </Button>
              <Button
                isIconOnly
                size="sm"
                type="button"
                variant="flat"
                onPress={removeElementFn}
              >
                <MdDeleteOutline size={20} color="red" />
              </Button>
            </div>
          </div>
        )}
      </div>
      <div>{Element}</div>
    </div>
  );
};

export default FormElement;
