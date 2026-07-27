import { Card } from "@nextui-org/react";
import SalaryTable from "../tables/SalaryTable";
import { useGetProfile } from "../../API/profile";
import { API_URL } from "../../API/api_urls/api_urls";

export default function Salary() {
  const { data, isLoading } = useGetProfile({
    path: API_URL.getPaySlip,
    key: "salary",
  });
  return (
    <>
      <Card className="  shadow-md  my-6 container mx-auto p-4">
        <h1 className="text-[1.2rem] font-medium font-helvetica text-gray-600 my-3">
          Salary Information
        </h1>
        <SalaryTable data={data?.payslips} isLoading={isLoading} />
      </Card>
    </>
  );
}
