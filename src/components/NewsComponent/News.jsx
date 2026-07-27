/* eslint-disable no-unused-vars */
// import React from 'react'

import { useState } from "react";
import { latestNews, previousNews } from "./data";
import LatestNews from "./LatestNews";
import PreviousNews from "./PreviousNews";
import Drawer from "../Request&FormComponent/Drawer";
import './NewsFont.css'

const News = () => {
const [isOpen, setIsOpen] = useState(false)
const [selectedNews, setSlectedNews] = useState({})


  const myStyles = {
    backgroundImage:
      `url(${latestNews[0].image_src})`,
    backgroundPosition: "center",
  };

  const handleClick=(news)=>{
  setIsOpen(true)
  setSlectedNews(news)
  }


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
    <div className="font-poppins">
    <h1 className=" text-2xl md:text-3xl font-semibold">News</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-5 my-2 font-">
        {/* Main */}
        <div
          className="bg-white rounded-md md:col-span-3 h-[40vh] md:h-[55vh] relative cursor-pointer"
          // style={myStyles}
          onClick={()=>handleClick(latestNews[0])}
        >
        <img src={latestNews[0].image_src} alt="" className="rounded-lg object-cover w-full h-full" />
          <div className="h-[50%] bg-white bg-opacity-50 absolute left-0 bottom-0 w-full p-4">
            <div className="bg-white rounded-full py-1 px-2 inline-flex gap-1 items-center">
              <p className="rounded-full bg-blue-500 h-2 w-2 m-0"></p>
              <p className="text-blue-500 m-0 font-medium">{latestNews[0].category}</p>
            </div>
            <h1 className="text-medium md:text-2xl text-white my-2">
            {latestNews[0].head_line}
            </h1>

            <div className="absolute left-4 bottom-0 text-gray-100 flex items-center gap-2">
              <p>{latestNews[0].date}</p>
              <p className="rounded-full bg-gray-200 h-2 w-2 m-0"></p>
              <span>{latestNews[0].time_of_read}</span>
            </div>
          </div>
        </div>
        <div className="md:col-span-2 rounded-md">
          <h1 className="md:text-2xl font-medium">Latest News</h1>
          <div className="my-2 flex flex-col gap-6">
          {latestNews.map((news,i)=>(
          <div key={i} onClick={()=>handleClick(news)}>
          <LatestNews news={news}/>
          </div>
          ))}
          
          </div>
        </div>
      </div>
      <hr />
      <div className="my-8">
      <h1 className="md:text-2xl font-medium">Previous News</h1>
      <div className="my-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
       {previousNews.map((news,i)=>(
       <div key={i} onClick={()=>handleClick(news)}>
          <PreviousNews news={news}/>
       </div>
          ))}
      </div>
      </div>

      <Drawer sideBarNeeded={false} isOpen={isOpen} setIsOpen={setIsOpen} drawerWidth={'40rem'}>
      <div className="px-4 py-8 md:px-6 lg:px-10">
      <div className='h-[12rem] sm:h-[15rem] md:h-[18rem]'>
      <img src={selectedNews.image_src} alt="" className="rounded-t-md object-cover w-full h-full" />
      </div>
        <div className="py-6 relative">
           <div className={`${categoryColor(selectedNews?.category)?.bgColor} rounded-full py-1 px-2 inline-flex gap-1 items-center`}>
              <p className={`${categoryColor(selectedNews?.category)?.bulletColor} rounded-full h-2 w-2 m-0`}></p>
              <p className={`${categoryColor(selectedNews?.category)?.textColor} m-0 font-medium`}>{selectedNews?.category}</p>
            </div>
            <h1 className="my-2 md:text-2xl">
            {selectedNews.head_line}
            </h1>
            <p className="mt-3 mb-6 text-md text-gray-400 tracking-wider">
            {selectedNews?.details}
            </p>

            <div className="absolute left-4 bottom-2 text-gray-300 flex items-center gap-2">
              <p>{selectedNews.date}</p>
              <p className="rounded-full bg-gray-300 h-[6px] w-[6px] m-0"></p>
              <span>{selectedNews.time_of_read}</span>
            </div>
          </div>
      </div>
      </Drawer>
    </div>
  );
};

export default News;
