/* eslint-disable no-unused-vars */

import PendingTrainingTable from "./PendingTrainingTable";
import PageHeader from "../../../components/payroll_components/PageHeader";
import { app_routes } from "../../../utils/app_routes";
import Separator from "../../../components/payroll_components/Separator";
import { trainingData } from "../../SelfService/Training/TrainingDashboard/trainingData";
export default function PendingTraining() {
  const data = [
    {
      _id: 1,
      creator: "LASISI OLAYINKA",
      directorate: "DIRECTORATE OF FINANCE & ACCOUNTS",
      title: "BUDGETINGPLANNING ANG MANAGEMENT REPORTING",
      desc: "TO EQUIP STAFF WITH FINANCIAL SKILLS FOR BETTER DECISION MAKING",
      type: 'Local',
      staff: '19',
      start: '2024-09-02',
      end: '2024-09-14',
      period: '13',
      venue: 'UYO',
      fee: '₦450,000',
    },
    {
      _id: 2,
      creator: "LASISI OLAYINKA",
      directorate: "DIRECTORATE OF FINANCE & ACCOUNTS",
      title: "BUDGETINGPLANNING ANG MANAGEMENT REPORTING",
      desc: "TO EQUIP STAFF WITH FINANCIAL SKILLS FOR BETTER DECISION MAKING",
      type: 'Local',
      staff: '19',
      start: '2024-09-02',
      end: '2024-09-14',
      period: '13',
      venue: 'UYO',
      fee: '₦450,000',
    },
    {
      _id: 3,
      creator: "LASISI OLAYINKA",
      directorate: "DIRECTORATE OF FINANCE & ACCOUNTS",
      title: "BUDGETINGPLANNING ANG MANAGEMENT REPORTING",
      desc: "TO EQUIP STAFF WITH FINANCIAL SKILLS FOR BETTER DECISION MAKING",
      type: 'Local',
      staff: '19',
      start: '2024-09-02',
      end: '2024-09-14',
      period: '13',
      venue: 'UYO',
      fee: '₦450,000',
    },
    {
      _id: 4,
      creator: "LASISI OLAYINKA",
      directorate: "DIRECTORATE OF FINANCE & ACCOUNTS",
      title: "BUDGETINGPLANNING ANG MANAGEMENT REPORTING",
      desc: "TO EQUIP STAFF WITH FINANCIAL SKILLS FOR BETTER DECISION MAKING",
      type: 'Local',
      staff: '19',
      start: '2024-09-02',
      end: '2024-09-14',
      period: '13',
      venue: 'UYO',
      fee: '₦450,000',
    },
    {
      _id: 5,
      creator: "LASISI OLAYINKA",
      directorate: "DIRECTORATE OF FINANCE & ACCOUNTS",
      title: "BUDGETINGPLANNING ANG MANAGEMENT REPORTING",
      desc: "TO EQUIP STAFF WITH FINANCIAL SKILLS FOR BETTER DECISION MAKING",
      type: 'Local',
      staff: '19',
      start: '2024-09-02',
      end: '2024-09-14',
      period: '13',
      venue: 'UYO',
      fee: '₦450,000',
    },
    
  ];
  return (
    <>
      <section className="suspension_list">
      <PageHeader header_text={'Pending Trainings'} breadCrumb_data={[{path: app_routes.training.index, name: 'Trainings'}, {path: app_routes.training.pending_training, name: 'Pending Training'}]} btnAvailable = {false}/>
        
         {/* pending training list table */}
         <section>
         <Separator separator_text={'Pending Training List'}/>

          <PendingTrainingTable rows={trainingData?.filter(item=>(item?.category)==='Pending')} />
        </section>
      </section>
    </>
  );
}
