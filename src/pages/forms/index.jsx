/* eslint-disable no-unused-vars */

// import AuthForm from "../../components/forms/AuthForm/AuthForm"
// import LoginForm from "../../components/forms/LoginForm/LoginForm"
import MultiSelectForm from "../../components/forms/MultiSelect"

import InputComponent from "../../components/forms/InputComponent";
import SearchComponent from "../../components/forms/SearchComponent";
import Toggle from "../../components/forms/Toggle";
import DatePicker from "../../components/forms/DatePicker";
import PredefineRangePicker from "../../components/forms/PredefineRangePicker";
import SinglePickerComponent from "../../components/forms/SingleDatePicker";
// import Switcher from "../../components/tabs/Switcher";


const Forms = () => {
  return (
    <div>
      {/* <LoginForm /> */}
      {/* <AuthForm /> */}
      <MultiSelectForm/>
      
      <SearchComponent />
      <InputComponent />
      <Toggle />
      <MultiSelectForm />
      <SinglePickerComponent />
      <DatePicker />
      <PredefineRangePicker />
    </div>
  );
};

export default Forms;
