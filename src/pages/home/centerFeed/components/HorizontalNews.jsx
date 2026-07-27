import MediumNews from "./MediumNews";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/pagination';
import './slide.css';
import { Pagination,  } from 'swiper/modules';

const HorizontalNews = () => {
  return (
    <div className=" bg-white rounded-xl py-7   w-full shadow-sm overflow-x-auto">
      <div className=" flex items-center px-7 justify-between shadow-sm  py-1  pb-4 border-b">
        <div className="flex gap-x-2">
          <span className="text-lg font-bold">Trending News</span>
        </div>
      </div>

      <div className="py-7 bg-white flex justify-end ">
        <Swiper
              slidesPerView={'auto'}       
              modules={[Pagination,]}
              className="mySwiper"
            >
              <SwiperSlide>
                  <MediumNews/>
              </SwiperSlide>
              <SwiperSlide>
                  <MediumNews/>
              </SwiperSlide>
              <SwiperSlide>
                  <MediumNews/>
              </SwiperSlide>
            </Swiper>
      </div>
    </div>
  );
};

export default HorizontalNews;
