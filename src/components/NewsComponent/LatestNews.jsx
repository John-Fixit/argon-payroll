import { Avatar,} from "@nextui-org/react"
import PropTypes from 'prop-types'


const LatestNews = ({news}) => {
  return (
     <div className="flex gap-4 h-20 cursor-pointer font-poppins">
             <Avatar
                  alt="NextUI hero Image with delay"
                  src={news.image_src}
                  radius="sm"
                  className="h-full w-[6.5rem] z-0"
                />
              <div className="relative flex flex-col justify-between">
                <h2 className="text-[14px] leading-5 font-medium">
                 {news.head_line.length>50?news.head_line.substring(0,50)+'...':news.head_line}
                </h2>
                <div className=" absolute bottom-0 text-gray-400 flex items-center gap-2 text-xs">
                  <p>{news.date}</p>
                  <p className="rounded-full bg-gray-500 h-[6px] w-[6px] m-0"></p>
                  <span>{news.time_of_read}</span>
                </div>
              </div>
            </div>
  )
}

export default LatestNews
LatestNews.propTypes={
news:PropTypes.object
}