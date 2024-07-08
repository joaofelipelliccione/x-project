'use client';
import * as React from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

export function StandardCarousel() {
  return (
    <Carousel plugins={[Autoplay({ delay: 2500 })]} className="w-full bg-purple-500">
      <CarouselContent className="-ml-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="basis-[50%] pl-1 md:basis-1/4 lg:basis-[30%]">
            <div className="p-1">
              <Card>
                <CardContent className="flex h-[20vh] items-center justify-center p-6">
                  <span className="text-2xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
