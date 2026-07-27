import Separator from '../payroll_components/Separator'
import FamilyCard from './FamilyCard'

export default function FamilyComponent() {
  return (
    <div className='my-8 order'>
      <Separator separator_text={'Family'} />
      <div className='space-y-4  overflow-hidden w-full'>
        <FamilyCard />
      </div>
    </div>
  )
}
