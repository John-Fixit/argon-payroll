import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/pagination';
import './slide.css';
import { Pagination,  } from 'swiper/modules';
import SingleMemo from "./SingleMemo";
import propTypes from 'prop-types'
import { CiMemoPad } from 'react-icons/ci';

const Multiplememo = ({memos}) => {
  return (
    <div className=" bg-white rounded-xl py-7   w-full shadow-sm overflow-x-auto">
      <div className=" flex items-center px-7 justify-between shadow-sm  py-1  pb-4 border-b">
        <div className="flex gap-x-2">
          <CiMemoPad size={24}/>
          <span className="text-lg font-bold">Memos</span>
        </div>
      </div>
      <div className="py-7 bg-white flex justify-end ">
        <Swiper
              slidesPerView={'auto'}
              modules={[Pagination,]}
              className="mySwiper"
            >
            {
                memos?.map((mm, i)=> (
                <SwiperSlide key={i}>
                    <SingleMemo isMedium memo={mm}/>
                </SwiperSlide>

                ))
            }
            </Swiper>
      </div>
    </div>
  );
};

Multiplememo.propTypes = {
    memos : propTypes.any
}
export default Multiplememo;
