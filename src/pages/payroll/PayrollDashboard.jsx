import PayrollSummaryCard from "../../components/core/payroll/dashboard/payrollSumaryCard";
import PageHeader from "../../components/payroll_components/PageHeader";
import StatBarChart from "../../components/statisticGraphs/StatBarChart";
import { Button } from "antd";
import StatLineChart from "../../components/statisticGraphs/StatLineChart";
import PayrollTable from "../../components/core/payroll/dashboard/payrolllTable";
import LineChartComponent from "./PayrollDashboard/LineChartComponent";
import QuickLink from "../../components/profile/QuickLink";
const PayrollDashboard = () => {
  const trafficData = [
    { name: "SUN", amount: 400 },
    { name: "MON", amount: 200 },
    { name: "TUE", amount: 450 },
    { name: "WED", amount: 460 },
    { name: "THUR", amount: 220 },
    { name: "FRI", amount: 380 },
    { name: "SAT", amount: 800 },
  ];

  return (
    <>
      <main className="mb-10">
        <PageHeader header_text={"Payroll"} btnAvailable={false} />

        <PayrollSummaryCard />

        <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="col-span-3 rounded-sm border-[0.1px]">
            <div className="p-3 h-auto">
              <h3 className="font-helvetica text-lg">Payroll History</h3>
              <p className="text-default-500 font-helvetica opacity-60">
                Checkout the total payout vs requested amount
              </p>
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-3">
                  <StatBarChart
                  // title={"AGE"}
                  // labels={extractedData?.AGE?.labels}
                  //   stat_data={data}
                  />
                  {/* <LineChartComponent trafficData={trafficData} /> */}
                </div>
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-3">
                    <div className="border-l border-[#00bcc2] p-1 flex flex-col">
                      <p className="font-helvetica my-auto">N89,235</p>
                      <p className="text-default-500 font-helvetica opacity-60 text-xs my-auto">
                        Total payout
                      </p>
                    </div>
                    <div className="border-l border-gray-200 p-2">
                      <p className="font-helvetica my-auto">N7,263</p>
                      <p className="text-default-500 font-helvetica opacity-60 text-xs my-auto">
                        Delayed payout
                      </p>
                    </div>
                  </div>
                  <div>
                    <Button className="text-xs" size="small">
                      <span className="font-helvetica">View Full Report</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1 rounded-sm border-[0.1px] border-gray-50">
            {/* <QuickLink /> */}
            {/* <div className="px-3 pt-3">
              <h3 className="font-helvetica text-lg">Request</h3>
              <p className="text-default-500 font-helvetica opacity-60">
                Check the request from employees
              </p>
            </div>
            <div>
              <StatLineChart />
            </div> */}
          </div>
        </section>

        <PayrollTable />
      </main>
    </>
  );
};

export default PayrollDashboard;
