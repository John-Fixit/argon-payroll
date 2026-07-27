/* eslint-disable no-unused-vars */

import TextArea from '../../../forms/FormElements/TextArea'
import { Card, CardBody } from '@nextui-org/react'
import { Input } from 'antd'
import PropTypes from 'prop-types'

const T4_ReviewCommitee = ({register, setValue, formState, onNext}) => {
  return (
    <>
        <Card className="shadow-sm my-4">
<div className="px-4 pt-4">
          <p className="text-[17px] font-medium text-zinc-500">PART 9</p>
        
            <p className="text-[15px] my-auto font-normal text-default-600">
            Appraisal Review Committee
              </p>
        
          </div>
          <hr />
          <CardBody>
                  <div className="grid grid-cols-3">
                    <div className="col-span-2">
                    <Input.TextArea
            placeholder="Comment here..."
            onChange={(e)=>setValue("review_committee_comment", e.target.value)}

/>
                    </div>
                  </div>

        </CardBody>
</Card>
    </>
  )
}

T4_ReviewCommitee.propTypes = {
  register: PropTypes.func.isRequired,
  getValues: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  formState: PropTypes.object.isRequired,
  onNext: PropTypes.func
}

export default T4_ReviewCommitee