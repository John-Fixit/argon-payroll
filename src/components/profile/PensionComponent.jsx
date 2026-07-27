import Pension from './Pension'
import PropTypes from "prop-types"

export default function PensionComponent({profile}) {
  return (
    <div>
      <div className=''>
        <div className='grid gap-4 md:gap-6'>
          <div className=''>
            <Pension profile={profile}/>
          </div>
        </div>
      </div>
    </div>
  )
}

PensionComponent.propTypes = {
  profile: PropTypes.object
}