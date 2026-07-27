
import ApprovedTrainingTable from "./ApprovedTrainingTable";
import PageHeader from "../../../components/payroll_components/PageHeader";
import { app_routes } from "../../../utils/app_routes";
import Separator from "../../../components/payroll_components/Separator";
export default function ApprovedTraining() {
  const data = [
    {
      _id: 1,
      courseName: "ADVANCED AVIATION PLANNING OPERATIONS AND MANAGEMENT",
      refNo: "10000",
      type: "LOCAL",
      staffCount: "0",
      start: '2024-10-21',
      end: '2024-10-21',
      venue: '2024-09-02',
      courseFee: '2024-09-02',
      status: 'approved',
      
    },
    {
      _id: 2,
      courseName: "ADVANCED AVIATION PLANNING OPERATIONS AND MANAGEMENT",
      refNo: "14000",
      type: "LOCAL",
      staffCount: "0",
      start: '2024-10-21',
      end: '2024-10-21',
      venue: '2024-09-02',
      courseFee: '2024-09-02',
      status: 'approved',
      
    },
    {
      _id: 3,
      courseName: "ADVANCED AVIATION PLANNING OPERATIONS AND MANAGEMENT",
      refNo: "20000",
      type: "LOCAL",
      staffCount: "0",
      start: '2024-10-21',
      end: '2024-10-21',
      venue: '2024-09-02',
      courseFee: '2024-09-02',
      status: 'pending',
    },
    {
      _id: 4,
      courseName: "ADVANCED AVIATION PLANNING OPERATIONS AND MANAGEMENT",
      refNo: "30000",
      type: "LOCAL",
      staffCount: "0",
      start: '2024-10-21',
      end: '2024-10-21',
      venue: '2024-09-02',
      courseFee: '2024-09-02',
      status: 'approved',
      
    },
    {
      _id: 5,
      courseName: "ADVANCED AVIATION PLANNING OPERATIONS AND MANAGEMENT",
      refNo: "40000",
      type: "LOCAL",
      staffCount: "0",
      start: '2024-10-21',
      end: '2024-10-21',
      venue: '2024-09-02',
      courseFee: '230000',
      status: 'pending',
    },
    
  ];
  return (
    <>
      <section className="approved_training">
      <PageHeader header_text={'Approved Training'} breadCrumb_data={[{path: app_routes.training.index, name: 'Trainings'}, {path: app_routes.training.approve_training, name: 'Approved Training'}]} btnAvailable = {false}/>
        
         {/* pending training list table */}
         <section>
         <Separator separator_text={'All Approve Training'}/>

          <ApprovedTrainingTable rows={data} />
        </section>
      </section>
    </>
  );
}
