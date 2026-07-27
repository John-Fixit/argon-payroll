/* eslint-disable react-hooks/exhaustive-deps */
import {  useContext, useEffect, useState } from "react";
import {
  useGetPostsInfinite,
  useGetPostsInitial,
  useLoadBirthday,
} from "../../../lib/query/queryandMutation";
import Postfeed from "./Postfeed";
import { useInView } from "react-intersection-observer";
import useCurrentUser from "../../../hooks/useCurrentUser";
import LoadingShimmer from "./LoadingShimmer";
import HorizontalBirthdayCard from "./components/HorizontalBirthdayCard";
import { postContext } from "../../../context/Post";
import TrainingSlider from "./components/TrainingSlider";
import ShoppingSlider from "./components/ShoppingSlider";
import PostLikeusers from "./PostLikeusers";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import LoanCard from "./components/LoanCard";


const PostFeeds = () => {
  const { userData } = useCurrentUser();
  const [pageStart, setPageStart] = useState(0);
  const {data:birthdayData,} = useLoadBirthday(userData?.data)
  const { data: postDatasInitial } = useGetPostsInitial(
    userData?.data
  );
  const { data: postDatasInfinite, hasNextPage, isFetchingNextPage, fetchNextPage } = useGetPostsInfinite(
    userData?.data, pageStart
  );
  const {allAvailablePost, setAllAvailablePost, allAvailableFormattedPost, } = useContext(postContext)
  const [allPostInitial, setAllPostInitial] = useState([]);
  const [allPostPage, setAllPostPage] = useState([]);
  const { ref, inView } = useInView();
  // user likes
  const [openLikesModal, setOpenLikesModal] = useState(false);
  const [likeData, setLikeData] = useState([]);

  useEffect(() => {
    if (postDatasInitial?.pages[0]?.data?.data?.length > 0) {
      const value = postDatasInitial?.pages[0]?.data?.data
      let initial = [...value]
      if(birthdayData?.data?.data?.length > 0){
        initial.splice(4, 0, {birthday: birthdayData?.data?.data, isBirthday: true, key: 0});
      }
      setAllPostInitial([...initial]);
      
      if (allPostPage?.length > 0) {
        setAllAvailablePost([...initial,   ...allPostPage])
      } else {
        setAllAvailablePost([...initial]);
      }     
    }
  }, [postDatasInitial, birthdayData?.data?.data ]);




  useEffect(() => {
    if (inView && !isFetchingNextPage) {
      fetchNextPage();
    }  
 }, [inView, isFetchingNextPage, fetchNextPage])

  useEffect(() => {
      if (!isFetchingNextPage && postDatasInfinite) {
        const all = []
        setPageStart((prev) => prev + 10);

        postDatasInfinite?.pages?.map(info=>{
          info?.data?.data?.map(dt=>{
            all?.push(dt)
            return all
          })
        })
        setAllPostPage([...all])        
        setAllAvailablePost([...allPostInitial, ...all]);
      }
  }, [inView, isFetchingNextPage])

const closeUsersLikesModal = ()=>{
  setOpenLikesModal(false)
}

  return (
    <div className="space-y-5 ">
      {
        <>
          {allAvailablePost?.length === 0 ? (
            <LoadingShimmer isLoaded={allAvailablePost?.length > 0} />
          ) : (
            <>
              {allAvailableFormattedPost?.map((post, i) => (

                post?.isBirthday ?
                  <div key={i} className="space-y-5 overflow-x-clip  bg-transparent">
                  <HorizontalBirthdayCard data={post}  />
                </div>
                : 
                
                post?.isTraining ? 
                <div key={i} className="space-y-5 overflow-x-clip  bg-transparent">
                  <TrainingSlider data={post}  />
                 </div>

                :
                
                post?.isShopping ? 
                <div key={i} className="space-y-5 overflow-x-clip  bg-transparent">
                  <ShoppingSlider data={post}  />
                 </div>

                :
                
                post?.isLoan ? 
                <div key={i} className="space-y-5 overflow-x-clip  bg-transparent">
                  <LoanCard data={post}  />
                 </div>

                :
                
                
                <Postfeed data={post} index={i} key={post.POST_ID} setOpenLikesModal={setOpenLikesModal} setLikeData={setLikeData} />
              ))}

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
            </>
          )}
        </>
      }


      <PostLikeusers
        open={openLikesModal}
        onClose={closeUsersLikesModal}
        likesData={likeData}

      />
    </div>
  );
};

export default PostFeeds;
