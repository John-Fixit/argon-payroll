/* eslint-disable no-unused-vars */

import { useGetInsights } from "../../../../API/news"
// import HorizontalNews from "../components/HorizontalNews"
import News from "../components/News"
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";


const NewsCatalogue = () => {
  const { 
    data, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage,
  } = useGetInsights();
  // Intersection observer for infinite scroll
  const { ref, inView } = useInView();

  useEffect(() => {
    // Explicitly trigger fetchNextPage when conditions are met
    if (inView && hasNextPage && !isFetchingNextPage) {
      // console.log('Attempting to fetch next page');
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);




  // Flatten insights from all pages
  const allInsights = data?.pages.flatMap(page => page.insights) || [];

  return (
        <div className="space-y-5 mb-5"> 
            {/* <News/>
            <News/>
            <HorizontalNews/>
            <News/> */}

            {allInsights.map((insight, index) => (
              <div key={insight.id || index}>
                     <News data={insight}/>
                {/* <p>{insight.title}</p> */}
              </div>
            ))}


             {/* Intersection observer target */}
             {
               hasNextPage  && ( <div ref={ref} style={{ marginTop: "10px" }}>
                 <span className="w-5 h-5 rounded-full animate-spin duration-75  border-t-2 border-btnColor "></span>
                </div>)
              }


             {
                isFetchingNextPage && 
                <div className="items-center justify-center flex py-2">
                  <AiOutlineLoading3Quarters  size={27} className="animate-spin text-gray-300"/>
                </div>
              
              }
           

        </div>
  )
}

export default NewsCatalogue
