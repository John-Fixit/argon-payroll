
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

export const postContext = createContext()

const PostContext = ({children}) => {
    const [allAvailablePost, setAllAvailablePost] = useState([]);
    const [allAvailableFormattedPost, setAllAvailableFormattedPost] = useState([]);

  useEffect(() => {
    const all = [...allAvailablePost]
    pushToEveryTenth(all)  
  }, [allAvailablePost])
  
function pushToEveryTenth(array) {

  // ----------------------------- training & shopping-----------------
    // let nextTarget = "training"

    // for (let i = 9; i < array.length; i += 10) {
    //   let next =  nextTarget  === "training" ? {birthday: [], isTraining: true, key: 0} : {birthday: [], isShopping: true, key: 0}
    //   nextTarget = nextTarget === "training" ? "shopping" : "training"
    //   array.splice(i, 0, next);
    // }
   // ----------------------------- training & shopping-----------------



    // --------------------------Loan--------------------------------
    //   for (let i = 9; i < array.length; i += 10) {
    //   let next =   {birthday: [], isLoan: true, key: 0}
    //   array.splice(i, 0, next);
    // }
    // --------------------------Loan--------------------------------




    setAllAvailableFormattedPost([...array])
}



  const editAPostComment = (postId, commentId, msg)=>{
    const all = [...allAvailablePost]
    const thePost = all.find(p => p?.POST_ID === postId)

    if(thePost){
      const thePostComment = thePost?.COMMENTS?.find(c => c?.COMMENT_ID === commentId)

      if(thePostComment){

          thePostComment.MESSAGE = msg
    
          thePost.COMMENTS = [...thePost.COMMENTS.map(c => c?.COMMENT_ID === commentId ? thePostComment: c  )]
    
          setAllAvailablePost([...allAvailablePost.map(p=> p?.POST_ID === postId ? thePost: p  )])
      }

    }
  }


  const deleteAPostComment = (postId, commentId)=>{
    const all = [...allAvailablePost]
    const thePost = all.find(p => p?.POST_ID === postId)

    if(thePost){
      const remainingPostComment = thePost?.COMMENTS?.filter(c => c?.COMMENT_ID !== commentId)

      thePost.COMMENTS = [...remainingPostComment]

      setAllAvailablePost([...allAvailablePost.map(p=> p?.POST_ID === postId ? thePost: p  )])
    }
  }



  const deleteAPost = (postId)=>{
    const all = [...allAvailablePost]
    const thePost = all.find(p => p?.POST_ID === postId)
    if(thePost){
      const remainingPost = all.filter(p => p?.POST_ID !== postId)

      setAllAvailablePost([...remainingPost])
    }
  }

    const addAComment = (msgValue, userData, postId, commentId )=>{
        const date = Date.now()
      const thePost = allAvailablePost.find(p => p?.POST_ID === postId)
      if(thePost){
        const commentObj = {
          COMMENT_ID: commentId,
          DATE_POSTED: date,
          FILE_NAME: null,
          FIRST_NAME: userData?.data?.FIRST_NAME,
          LAST_NAME: userData?.data?.LAST_NAME,
          OTHER_NAMES: userData?.data?.OTHER_NAMES,
          MESSAGE: msgValue,
          POST_ID: postId,
          THREAD_ID: null,
          USER_ID: userData?.data?.STAFF_ID
        }
        if (thePost?.COMMENTS === null ) {
          thePost.COMMENTS = [commentObj]
        }else{
          thePost?.COMMENTS?.unshift(commentObj)
        }
        setAllAvailablePost([...allAvailablePost.map(p=> p?.POST_ID === postId ? thePost: p  )])
      }
        
    }

    const likeAPost = (postId, userData, returndata, total)=>{
      let thePost = allAvailablePost.find(p => p?.POST_ID === postId)
      const liked = thePost?.LIKES?.find(l => l.USER_ID === userData?.STAFF_ID )
      if(liked){
        let data =  thePost?.LIKES?.filter(lk => lk.USER_ID !== userData?.STAFF_ID )
        thePost.LIKES = data
        thePost.TOTAL_LIKES = total
      }else{
          thePost.LIKES = [...returndata]
          thePost.TOTAL_LIKES = total
      }
      return  setAllAvailablePost([...allAvailablePost.map(p=> p?.POST_ID === postId ? thePost: p  )])

    }

    const loadMoreComments = (postId, incomingComment )=>{      
      const thePost = allAvailablePost.find(p => p?.POST_ID === postId)
      if(thePost){ 
        thePost.COMMENTS = [...thePost.COMMENTS, ...incomingComment]
        setAllAvailablePost([...allAvailablePost.map(p=> p?.POST_ID === postId ? thePost: p  )])
      }
    }

  return (
    <postContext.Provider value={{allAvailablePost, setAllAvailablePost, allAvailableFormattedPost, addAComment, likeAPost, loadMoreComments, deleteAPost, deleteAPostComment, editAPostComment }}>
       {children}
    </postContext.Provider>
  )
}

export default PostContext
















