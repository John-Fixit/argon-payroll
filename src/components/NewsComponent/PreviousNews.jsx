import PropTypes from 'prop-types'

const PreviousNews = ({news}) => {
const categoryColor=(category)=>{
if (category=='Sport') {
    return {bgColor:'bg-green-200',textColor:'text-green-500',bulletColor:'bg-green-500'}
}
else if (category=='Education') {
    return {bgColor:'bg-purple-200',textColor:'text-purple-500',bulletColor:'bg-purple-500'}
    
}
else if (category=='Politics') {
    return {bgColor:'bg-blue-200',textColor:'text-blue-500',bulletColor:'bg-blue-500'}
    
}
else if (category=='Fintech') {
    return {bgColor:'bg-yellow-200',textColor:'text-yellow-500',bulletColor:'bg-yellow-500'}
    
}
}
  return (
    <div className=" bg-white rounded-md cursor-pointer font-poppins">
      <div className='h-[12rem]'>
      <img src={news.image_src} alt="" className="rounded-t-md object-cover w-full h-full" />
      </div>
        <div className="p-4 relative">
            <div className={`${categoryColor(news.category).bgColor} rounded-full py-1 px-2 inline-flex gap-1 items-center`}>
              <p className={`${categoryColor(news.category).bulletColor} rounded-full h-2 w-2 m-0`}></p>
              <p className={`${categoryColor(news.category).textColor} m-0 font-medium`}>{news.category}</p>
            </div>
            <p className="text-[15px] leading-5 font-medium my-2">
            {news.head_line}
            </p>
            <p className="mt-2 mb-6 text-sm text-gray-400">
            {news.details.length>100?news.details.substring(0,100)+'...':news.details}
            </p>

            <div className="absolute left-4 bottom-2 text-gray-300 flex items-center gap-2 text-xs">
              <p>{news.date}</p>
              <p className="rounded-full bg-gray-300 h-[6px] w-[6px] m-0"></p>
              <span>{news.time_of_read}</span>
            </div>
          </div>
      </div>
  )
}

export default PreviousNews
PreviousNews.propTypes={
news:PropTypes.object
}