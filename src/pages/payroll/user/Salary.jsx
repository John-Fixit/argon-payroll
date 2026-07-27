import PageHeader from "../../../components/payroll_components/PageHeader";
import Salary from "../../../components/profile/Salary";

const UserSalary = () => {
  return (
    <>
      <PageHeader
        header_text={"My Payslip"}
        breadCrumb_data={[{ name: "Payroll" }, { name: "User" }]}
      />

      <Salary />
    </>
  );
};

export default UserSalary;
