/* eslint-disable no-unused-vars */

import CompanySponsoredTrainingTable from "./CompanySponsoredTrainingTable";
import PageHeader from "../../../components/payroll_components/PageHeader";
import { app_routes } from "../../../utils/app_routes";
import Separator from "../../../components/payroll_components/Separator";
export default function CompanySponsoredTraining() {
  const data = [
    {
      _id: 1,
      title: "Aeronautical Conventional Cartography ICAO 022",
      description: "To understand the basics and principle of Aeronautical Charts",
      trainer: "East Africa School of Aviation",
      venue: "NAIROBI KENYA",
      status: 'Not Completed',
      startDate: '1900-01-01 00:00:00.000',
      periodInDay: '26',
      endDate: "1900-01-01 00:00:00.000"
    },
    {
      _id: 2,
      title: "Aeronautical Conventional Cartography ICAO 022",
      description: "To understand the basics and principle of Aeronautical Charts",
      trainer: "East Africa School of Aviation",
      venue: "NAIROBI KENYA",
      status: 'Not Completed',
      startDate: '1900-01-01 00:00:00.000',
      periodInDay: '26',
      endDate: "1900-01-01 00:00:00.000"
    },
    {
      _id: 3,
      title: "Aeronautical Conventional Cartography ICAO 022",
      description: "To understand the basics and principle of Aeronautical Charts",
      trainer: "East Africa School of Aviation",
      venue: "NAIROBI KENYA",
      status: 'Not Completed',
      startDate: '1900-01-01 00:00:00.000',
      periodInDay: '26',
      endDate: "1900-01-01 00:00:00.000"
    },
    {
      _id: 4,
      title: "Aeronautical Conventional Cartography ICAO 022",
      description: "To understand the basics and principle of Aeronautical Charts",
      trainer: "East Africa School of Aviation",
      venue: "NAIROBI KENYA",
      status: 'Not Completed',
      startDate: '1900-01-01 00:00:00.000',
      periodInDay: '26',
      endDate: "1900-01-01 00:00:00.000"
    },
    {
      _id: 5,
      title: "Aeronautical Conventional Cartography ICAO 022",
      description: "To understand the basics and principle of Aeronautical Charts",
      trainer: "East Africa School of Aviation",
      venue: "NAIROBI KENYA",
      status: 'Not Completed',
      startDate: '1900-01-01 00:00:00.000',
      periodInDay: '26',
      endDate: "1900-01-01 00:00:00.000"
    },
    
  ];
  return (
    <>
      <section className="suspension_list">
         {/* company sponsored table */}
         <section>
         <Separator separator_text={'Company Sponsored'}/>

          <CompanySponsoredTrainingTable rows={data} />
        </section>
      </section>
    </>
  );
}
