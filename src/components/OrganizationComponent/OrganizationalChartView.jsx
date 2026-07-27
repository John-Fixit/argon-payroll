// import React from 'react'

import OrganizationTree from "./OrganizationTree"
import { organizationalData } from "./data"

const OrganizationalChartView = () => {

  return (
    <div>
    {organizationalData?.map((data,i)=><OrganizationTree organizationalChart={data} key={i}/>)}
    </div>
  )
}

export default OrganizationalChartView