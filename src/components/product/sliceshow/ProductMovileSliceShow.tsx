"use client";

import { SwiperSlide, Swiper } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import "./sliceshow.css";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import Image from "next/image";

interface Props {
  images: string[];
  title: string;
  className?: string;
}

export default function ProductMovileSliceShow({ images, title, className }: Props) {

  return (
    <div className={className}>
      <Swiper
        pagination
        autoplay={{
          delay: 5000
        }}
        modules={[FreeMode, Autoplay, Pagination]}
        style={{
          width: '100vw',
          height: '500px',
          "--swiper-pagination-color": "black"
        } as React.CSSProperties}
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <Image
              width={600}
              height={500}
              src={`/products/${image}`}
              alt={title}
              className="object-fill"
            />
          </SwiperSlide>
        ))}

      </Swiper>
    </div>
  );
}
