/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import Select, { components } from "react-select"; // eslint-disable-line
import { Controller, useForm } from "react-hook-form";
import Avatar from "../Avatar";
import { useState } from "react";
import { selectThemeColors } from "../../utils/theme";
import { TagPicker } from "rsuite";

const rSuitdata = [
  "Eugenia",
  "Bryan",
  "Linda",
  "Nancy",
  "Lloyd",
  "Alice",
  "Julia",
  "Albert",
].map((item) => ({ label: item, value: item }));

const MultiSelectForm = () => {
  const [interestLabel, setInterestLabel] = useState([
    { value: "Business", label: "Business", color: "blue" },
  ]);
  const [guests, setGuests] = useState({});

  const [siutValue, setSiutValue] = useState({});

  const {
    control,
    setError,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { title: "" },
  });

  // ** Select Options
  const options = [
    { value: "Business", label: "Business", color: "blue" },
    { value: "Personal", label: "Personal", color: "red" },
    { value: "Family", label: "Family", color: "yellow" },
    { value: "Holiday", label: "Holiday", color: "green" },
    { value: "ETC", label: "ETC", color: "purple" },
  ];

  const guestsOptions = [
    { value: "Donna Frank", label: "Donna Frank", avatar: "" },
    { value: "Jane Foster", label: "Jane Foster", avatar: "" },
    { value: "Gabrielle Robertson", label: "Gabrielle Robertson", avatar: "" },
    { value: "Lori Spears", label: "Lori Spears", avatar: "" },
    { value: "Sandy Vega", label: "Sandy Vega", avatar: "" },
    { value: "Cheryl May", label: "Cheryl May", avatar: "" },
  ];

  const OptionComponent = ({ data, ...props }) => {
    return (
      <components.Option {...props}>
        <span className={`w-5 h-5 bg-${data.color}-500 text-sm mr-5`}></span>
        {data.label}
      </components.Option>
    );
  };

  const GuestsComponent = ({ data, ...props }) => {
    return (
      <components.Option {...props}>
        <div className="flex flex-wrap items-center gap-x-2">
          <Avatar />
          <div>{data.label}</div>
        </div>
      </components.Option>
    );
  };

  return (
    <div className="py-5 ">
      <h2>MultiSelectForm</h2>
      
      <div className="grid  grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-1 ">


        


        <div className="mb-1  max-w-[80%]">
          <label className="form-label" htmlFor="label">
            Interests
          </label>
          {/* {} */}
          <Select
            id="label"
            value={interestLabel}
            options={options}
            theme={selectThemeColors}
            className="react-select z-40"
            classNamePrefix="select"
            isClearable={false}
            onChange={(data) => setInterestLabel([data])}
            components={{
              Option: OptionComponent,
            }}
          />
        </div>

        <div className="mb-1 max-w-[80%]">
          <label className="form-label" htmlFor="guests">
            Guests
          </label>
          <Select
            isMulti
            id="guests"
            className="react-select z-30"
            classNamePrefix="select"
            isClearable={false}
            options={guestsOptions}
            //   theme={selectThemeColors}
            value={guests.length ? [...guests] : null}
            onChange={(data) => setGuests([...data])}
            components={{
              Option: GuestsComponent,
            }}
          />
        </div>

         {/* rsuite */}
         <div className="mb-1 max-w-[80%]">
          <label className="form-label block" htmlFor="guests">
            Label
          </label>
          <TagPicker
            onChange={setSiutValue}
            data={rSuitdata}
            style={{ width: 300 }}
            searchable={true}
            className=" z-20 "
          />
        </div>


       

      </div>
    </div>
  );
};

export default MultiSelectForm;
