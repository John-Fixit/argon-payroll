import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
export default function PayrollCard({icon, title, routePath}) {
    const navigate = useNavigate({});
    const navigateFn=()=>{
        navigate(routePath)
    }
  return (
    <>
        <div className="py-10 cursor-pointer rounded-2xl bg-white shadow flex flex-col items-center justify-center gap-1 border--[3px] borde-[#344860]" onClick={navigateFn}>
                {icon}
                <p className="text-base text-black font-medium">{title}</p>
              </div>
    </>
  )
}

PayrollCard.propTypes = {
  icon: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  routePath: PropTypes.string
}
