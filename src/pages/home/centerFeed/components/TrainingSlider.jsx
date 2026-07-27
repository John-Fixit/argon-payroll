import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './slide.css';
import { Pagination, Navigation } from 'swiper/modules';
import { courses } from '../../../../components/CoursesComponent/data';
import { Button } from '@nextui-org/react';
import { GiGiftOfKnowledge } from 'react-icons/gi';
import TrainingSliderCard from './TrainingSliderCard';

const TrainingSlider = () => {
    const seaAll = ()=>{
        // return navigate("/learning/courses")
    }

  return (
    <div className=" bg-white rounded-xl py-7   w-full shadow-sm" >
        <div className=" flex items-center px-7 justify-between shadow-sm  py-1  pb-4 border-b">
            <div className="flex gap-x-2 items-center justify-between w-full" >
                <div className="flex gap-x-2 items-center">
                    <GiGiftOfKnowledge size={25} color="green"/>
                    <span className="text-lg font-bold">Training</span>
                </div>
                <div className=" flex gap-2">
                  <Button
                    variant="light"
                    size="sm"
                    className="  px-2 !rounded-full"
                    onClick={seaAll}
                  >
                    {" "}
                    <span className="font-medium text-base px-2 text-gray-600 " >See all</span>
                  </Button>
                </div>
            </div>
            <div>   
              
            </div>
        </div>
        <div className="py-1 bg-white flex justify-end relative w-full swiper-container ">
            <Swiper
              slidesPerView={'auto'}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="mySwiper"
              scrollbar={{ draggable: true }}
            >
              {
                    courses?.map((course, i) => (
                      <SwiperSlide  key={i} className="py-2">
                        <TrainingSliderCard  course={course}/>
                      </SwiperSlide>
                      
                    ))
                }
            </Swiper>
        </div>
    </div>
  )
}

export default TrainingSlider
