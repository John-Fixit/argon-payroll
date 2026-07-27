
import TrainingFeeTable from "./TrainingFeeTable";
import PageHeader from "../../../components/payroll_components/PageHeader";
import { app_routes } from "../../../utils/app_routes";
import Separator from "../../../components/payroll_components/Separator";
export default function TrainingFee() {
  const data = [
    {
      _id: 1,
      grade: "0-6",
      nigeriaDta: "10000",
      nigeriaLocalRunning: "30",
      nigeriaOtherRunning: "0",
      overseeDta: 'Local',
      ovsLocalRunning: '19',
      ovsOtherRunning: '2024-09-02',
      
    },
    {
      _id: 2,
      grade: "7-9",
      nigeriaDta: "14000",
      nigeriaLocalRunning: "30",
      nigeriaOtherRunning: "0",
      overseeDta: 'Local',
      ovsLocalRunning: '19',
      ovsOtherRunning: '2024-09-02',
      
    },
    {
      _id: 3,
      grade: "10-13",
      nigeriaDta: "20000",
      nigeriaLocalRunning: "30",
      nigeriaOtherRunning: "0",
      overseeDta: 'Local',
      ovsLocalRunning: '19',
      ovsOtherRunning: '2024-09-02',
      
    },
    {
      _id: 4,
      grade: "14-15",
      nigeriaDta: "30000",
      nigeriaLocalRunning: "30",
      nigeriaOtherRunning: "0",
      overseeDta: 'Local',
      ovsLocalRunning: '19',
      ovsOtherRunning: '2024-09-02',
      
    },
    {
      _id: 5,
      grade: "16-17",
      nigeriaDta: "40000",
      nigeriaLocalRunning: "30",
      nigeriaOtherRunning: "0",
      overseeDta: 'Local',
      ovsLocalRunning: '19',
      ovsOtherRunning: '2024-09-02',
      
    },
    
  ];
  return (
    <>
      <section className="suspension_list">
      <PageHeader header_text={'Training Fees'} breadCrumb_data={[{path: app_routes.training.index, name: 'Trainings'}, {path: app_routes.training.training_fee, name: 'Training Fees'}]} btnAvailable = {false}/>
        
         {/* pending training list table */}
         <section>
         <Separator separator_text={'All Training Fees'}/>

          <TrainingFeeTable rows={data} />
        </section>
      </section>
    </>
  );
}
