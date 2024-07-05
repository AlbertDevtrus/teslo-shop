"use client";

import { useState } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import { Swiper as SwiperObj } from "swiper";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./sliceshow.css";
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";
import { ProductImage } from "../product-image/ProductImage";

interface Props {
  images: string[];
  title: string;
  className?: string;
}

export default function ProductSliceShow({ images, title, className }: Props) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObj>();

  return (
    <div className={className}>
      <Swiper
        style={
          {
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          } as React.CSSProperties
        }
        spaceBetween={10}
        navigation={true}
        autoplay={{
          delay: 5000
        }}
        thumbs={{ 
          swiper: thumbsSwiper
        }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="mySwiper2"
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <ProductImage
              width={800}
              height={800}
              src={image}
              alt={title}
              className="rounded-lg object-fill"
            />
          </SwiperSlide>
        ))}

      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {images.map((image) => (
        <SwiperSlide key={image}>
          <ProductImage
            width={300}
            height={300}
            src={image}
            alt={title}
            className="rounded-lg object-fill"
          />
        </SwiperSlide>
      ))}
      </Swiper>
    </div>
  );
}
