/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import CreatePost from "./CreatePost";
import InfoTab from "./components/InfoTab";
import PostFeeds from "./PostFeeds";
import NewsCatalogue from "./NewsCatalogue";
import Announcement from "../../HR/Announcement";
import Memos from "./components/Memos";
import useAdPopupStore from "../../../hooks/useAdsPopup";

const CenterFeed = () => {
  const [stepper, setstepper] = useState(1);

  const { handleHomePageVisit, resetInitialization, visitCount, hasShownOnLogin } = useAdPopupStore();

  useEffect(() => {
    console.log('🏠 Home page visited, triggering visit handler');
    handleHomePageVisit();
    
    // Cleanup function to reset initialization when component unmounts
    return () => {
      resetInitialization();
    };
  }, []);

  // Log the updated visit count
  useEffect(() => {
    console.log(`📊 Current visit count: ${visitCount}, Has logged in: ${hasShownOnLogin}`);
  }, [visitCount, hasShownOnLogin]);


  return (
    <div className="h-full flex col-span-2 flex-col justify-start  sz:col-span-1 order-1 space-y-5 overflow-hidden z-0">
      <InfoTab step={setstepper} />
      {stepper === 1 && (
        <div className="space-y-5">
          <CreatePost />
          <Memos/>
          <PostFeeds/>
        </div>
      )}

      {stepper === 2 && (
        <div className="space-y-5 flex flex-col">
          <Announcement fromUser={true}/>
        </div>
      )}
      {stepper === 3 && (
        <div className="space-y-5 flex flex-col">
         <NewsCatalogue/>
        </div>
      )}
    </div>
  );
};

export default CenterFeed;
