// import { useEffect } from "react";
// import useAdPopupStore from "../../hooks/useAdsPopup";
import CenterFeed from "./centerFeed";
import RightBar from "./rightBar";
import RightMenu from "./rightMenu";

const Home = () => {




  return (
    <div>
      <div className="grid grid-cols-1  gap-6 subsemi:gap-4  semi:gap-6 xmd:gap-8  md:grid-cols-[10fr_1fr] xxd:gap:12 xx:gap-14  my-6 mx-auto ">
        <div className="h-full   mx-auto">
          <div className="w-full h-full   grid grid-cols-1 subsemi:grid-cols-[1.5fr_1fr] subsemi:gap-4  semi:grid-cols-[1.5fr_1fr] semi:gap-6 xmd:grid-cols-[1.5fr_1fr] xmd:gap-8 xm:grid-cols-[1.6fr_1fr] xm:gap-10 xxd:gap:12 xx:gap-14">
            <CenterFeed />

            <div className="h-full order-2 ">
              <RightBar />
            </div>
          </div>
        </div>

        <div>
          <RightMenu />
        </div>
      </div>
    </div>
  );
};

export default Home;
