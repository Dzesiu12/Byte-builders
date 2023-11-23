"use client";

import clsx from "clsx";
import { Swiper, SwiperSlide } from "swiper/react";

type Props = {
  images: string[];
  className?: string;
};

export const Carousel = ({ images, className }: Props) => {
  return (
    <Swiper
      className={clsx("rounded-xl bg-gray-100", className)}
      slidesPerView={1}
    >
      {images.map((image) => (
        <SwiperSlide key={image}>
          <img className="h-full w-full object-cover" src={image} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
