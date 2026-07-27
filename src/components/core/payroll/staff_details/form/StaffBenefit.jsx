import { Checkbox } from "antd";

const restructureData = (data) => {
  //   return data?.map((item) => {
  //     const {
  //       id,
  //       companyId,
  //       name,
  //       createdAt,
  //       updatedAt,
  //       status,
  //       ...permissions
  //     } = item;

  //     // Convert permissions into an array of key-value pairs
  //     const benefitsArray = Object.entries(data).map(
  //       ([key, value]) => ({
  //         key,
  //         value,
  //         label: key.replace(/_/g, " "),
  //       })
  //     );

  //     return {
  //       benefits: benefitsArray,
  //     };
  //   });

  const benefitsArray = Object.entries(data).map(([key, value]) => ({
    key,
    value,
    label: key.replace(/_/g, " "),
  }));

  return benefitsArray;
};

const StaffBenefit = () => {
  const benefitList =
    restructureData({
      basic_salary: true,
      rent: true,
      transport_allowance: true,
      utility: true,
      meal_subsidy_allowance: true,
      child_education_allowance: true,
      entertainment_allowance: true,
      domestic_servant_allowance: true,
      proficiency_allowance: true,
      drivers_allowance: true,
      security_allowance: true,
      hazard_allowance: true,
      leave_allowance: true,
      outfit_allowance: true,
      furniture_grant_allowance: true,
      monetized_gen_allowance: true,
      inducement_allowance: true,
      shift_allowance: true,
      contract_allowance: true,
    }) || [];

  return (
    <>
      <main>
        <div className="mt-3 grid md:grid-cols-2 grid-cols-1 gap-x-6 gap-y-3">
          {benefitList?.map((benefit, index) => (
            <Checkbox
              // onChange={(e) => onChange(e, item?.id)}
              // disabled={!staff_benefit?.edit_settings}
              defaultChecked={benefit?.value}
              // checked={benefit?.value}
              name={benefit?.key}
              key={index + "____sales_data"}
              className={"capitalize"}
            >
              <span className="font-helvetica text-[0.80rem] opacity-70">
                {benefit?.label}
              </span>
            </Checkbox>
          ))}
        </div>
      </main>
    </>
  );
};

export default StaffBenefit;
