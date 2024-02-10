import { Navigation, Pagination, Autoplay, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { EffectFade } from 'swiper/modules';

export default function Slider() {
  return (
    <div className='mb-10 '>
        <Swiper
            modules={[Navigation,Autoplay, Pagination, Scrollbar, A11y, EffectFade]}
            effect='flip'
            spaceBetween={50}
            slidesPerView={1}
            navigation
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
        >
            <SwiperSlide><img className="rounded-lg w-[100%] h-[100%] object-contain" src="../../public/image2.jpg" alt="" /></SwiperSlide>
            <SwiperSlide><img className=" rounded-lg w-[100%] h-[100%] object-contain" src="../../public/Image1.jpg" alt="" /></SwiperSlide>
            <SwiperSlide><img className="rounded-lg w-[100%] h-[100%] object-contain" src="../../public/Image3.jpg" alt="" /></SwiperSlide>
            <SwiperSlide><img className="rounded-lg w-[100%] h-[100%] object-contain" src="../../public/Image4.jpg" alt="" /></SwiperSlide>
        </Swiper>

    </div>
    
  )
}
