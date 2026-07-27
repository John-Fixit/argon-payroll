/* eslint-disable no-unused-vars */
import React from 'react'
import Separator from '../../../components/payroll_components/Separator'
import PageHeader from '../../../components/payroll_components/PageHeader'
import { app_routes } from '../../../utils/app_routes'
import TrainingStatusTable from './TrainingStatusTable'

const TrainingStatus = () => {
const data = [
  {
      _id: 1,
      directorate: "DIRECTORATE OF AIR TRANSPORT REGULATION",
      courseName: "ADVANCED AVIATION PLANNING OPERATIONS AND MANAGEMENT",
      type: "LOCAL",
      staffCount: "1",
      start: '2024-10-21',
      end: '2024-12-21',
      venue: 'Zaria',
      courseFee: '216,000',
      status: 'approved',
    },
  {
      _id: 2,
      directorate: "DIRECTORATE OF AIR TRANSPORT REGULATION",
      courseName: "ADVANCED AVIATION PLANNING OPERATIONS AND MANAGEMENT",
      type: "LOCAL",
      staffCount: "1",
      start: '2024-10-21',
      end: '2024-12-21',
      venue: 'Zaria',
      courseFee: '216,000',
      status: 'approved',
    },
  {
      _id: 3,
      directorate: "DIRECTORATE OF AIR TRANSPORT REGULATION",
      courseName: "ADVANCED AVIATION PLANNING OPERATIONS AND MANAGEMENT",
      type: "LOCAL",
      staffCount: "1",
      start: '2024-10-21',
      end: '2024-12-21',
      venue: 'Zaria',
      courseFee: '216,000',
      status: 'approved',
    },
  {
      _id: 4,
      directorate: "DIRECTORATE OF AIR TRANSPORT REGULATION",
      courseName: "ADVANCED AVIATION PLANNING OPERATIONS AND MANAGEMENT",
      type: "LOCAL",
      staffCount: "1",
      start: '2024-10-21',
      end: '2024-12-21',
      venue: 'Zaria',
      courseFee: '216,000',
      status: 'approved',
    },
  {
      _id: 5,
      directorate: "DIRECTORATE OF AIR TRANSPORT REGULATION",
      courseName: "ADVANCED AVIATION PLANNING OPERATIONS AND MANAGEMENT",
      type: "LOCAL",
      staffCount: "1",
      start: '2024-10-21',
      end: '2024-12-21',
      venue: 'Zaria',
      courseFee: '216,000',
      status: 'approved',
    },
  {
      _id: 6,
      directorate: "DIRECTORATE OF AIR TRANSPORT REGULATION",
      courseName: "ADVANCED AVIATION PLANNING OPERATIONS AND MANAGEMENT",
      type: "LOCAL",
      staffCount: "1",
      start: '2024-10-21',
      end: '2024-12-21',
      venue: 'Zaria',
      courseFee: '216,000',
      status: 'approved',
    },
  {
      _id: 7,
      directorate: "DIRECTORATE OF AIR TRANSPORT REGULATION",
      courseName: "ADVANCED AVIATION PLANNING OPERATIONS AND MANAGEMENT",
      type: "LOCAL",
      staffCount: "1",
      start: '2024-10-21',
      end: '2024-12-21',
      venue: 'Zaria',
      courseFee: '216,000',
      status: 'approved',
    },
  {
      _id: 8,
      directorate: "DIRECTORATE OF AIR TRANSPORT REGULATION",
      courseName: "ADVANCED AVIATION PLANNING OPERATIONS AND MANAGEMENT",
      type: "LOCAL",
      staffCount: "1",
      start: '2024-10-21',
      end: '2024-12-21',
      venue: 'Zaria',
      courseFee: '216,000',
      status: 'approved',
    },
]
  return (
       <>
      <section className="training_status">
      <PageHeader header_text={'Training Status'} breadCrumb_data={[{path: app_routes.training.index, name: 'Trainings'}, {path: app_routes.training.training_status, name: 'Training Status'}]} btnAvailable = {false}/>
        
         {/* training status table */}
         <section>
         <Separator separator_text={'Training Status'}/>

          <TrainingStatusTable rows={data} />
        </section>
      </section>
    </>
  )
}

export default TrainingStatus