// import { Checkbox } from "flowbite-react";
import { CheckboxGroup } from "rsuite";

const Toggle = () => {
  return (
    <div className="my-8">
      <div className="flex items-center gap-2">
        <h1>Toggle</h1>
        <hr className="w-full" />
      </div>
      <div className="my-4 flex items-center gap-4">
        <label
          htmlFor="toggleSwitch"
          className="relative h-6 w-12 cursor-pointer"
        >
          <input type="checkbox" id="toggleSwitch" className="peer sr-only" />
          <span className="absolute inset-0 bg-gray-200 h-6 w-14 rounded-full peer-checked:bg-blue-500"></span>
          <span className="absolute inset-0 start-[2px] top-[2px] peer-checked:start-[34px] bg-gray-100 h-5 w-5 transition-all rounded-full shadow-sm"></span>
        </label>
        <p>YES</p>
      </div>

      <div className="my-4 flex items-center gap-4">
       <CheckboxGroup name="checkboxList">
    {/* <Checkbox value="A">Item A</Checkbox> */}
    {/* <Checkbox value="B">Item B</Checkbox>
    <p>Group2</p>
    <Checkbox value="C">Item C</Checkbox>
    <Checkbox value="D" disabled>
      Item D
    </Checkbox> */}
  </CheckboxGroup>
        <input type="checkbox" name="" id="" />
        <p>Check this custom checkbox</p>
      </div>

      <div className="my-4 flex items-center gap-4">
        <input type="radio" name="" id="" />
        <p>Toggle this custom radio</p>
      </div>

      <div className="my-4 flex items-center gap-4">
        <input type="radio" name="" id="" />
        <p>Or toggle this other custom radio</p>
      </div>
    </div>
  );
};

export default Toggle;
