/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Select, SelectItem, RadioGroup, Radio } from "@nextui-org/react"
import { DatePicker, Space } from "antd";
export default function SettingForm(){
    const teams = [
        "Dept 1",
        "Dept 2",
        "Dept 3",
        "Dept 4",
        "Dept 5",
    ]
    const grades = [
        "grade 1",
        "grade 2",
        "grade 3",
        "grade 4",
        "grade 5",
    ]
    const [freq, setFreq] = useState("")
    return(
        <>
            <form className="my-4">
            <div className="teams">
                <label htmlFor="">Teams</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
              label="Department"
              variant="underlined"
              classNames={{
                trigger: [
                  "outline-none",
                  "border-b-1",
                  "border-b-gray",
                  "shadow-none",
                ],
              }}
            >
              {teams.map((team) => (
                <SelectItem key={team} value={team}>
                  {team}
                </SelectItem>
              ))}
            </Select>

            <Select
              label="Job Grade"
              variant="underlined"
              classNames={{
                trigger: [
                  "outline-none",
                  "border-b-1",
                  "border-b-gray",
                  "shadow-none",
                ],
              }}
            >
              {grades.map((grade) => (
                <SelectItem key={grade} value={grade}>
                  {grade}
                </SelectItem>
              ))}
            </Select>

                </div>
            
            </div>

            <div className="my-5">
            

            <RadioGroup
      label="Select your performance Frequency"
      orientation="horizontal"
      onValueChange={setFreq}
    >
      <Radio value="monthly">Monthly</Radio>
      <Radio value="quarterly">Quarterly</Radio>
      <Radio value="yearly">Yearly</Radio>
      <Radio value="other">Other</Radio>
    </RadioGroup>
                <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="my-4 flex flex-col my-2 gap-1">
              <label htmlFor="">Start Date</label>
              <DatePicker
                className="border-b border-0 py-2 rounded-none focus:outline-none"
              />

                </div>
                </div>


            </div>
   
            </form>
        </>
    )
}