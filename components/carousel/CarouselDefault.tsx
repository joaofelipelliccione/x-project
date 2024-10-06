'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

export function CarouselDefault() {
  return (
    <Carousel plugins={[Autoplay({ delay: 2500 })]} className="bg-accent w-full">
      <CarouselContent className="-ml-1">
        {['H', 'E', 'Y', '!'].map((item, index) => (
          <CarouselItem key={index} className="basis-1/2 pl-1 md:basis-1/4 lg:basis-[30%]">
            <div className="p-1">
              <Card>
                <CardContent className="flex h-[20vh] items-center justify-center p-6">
                  <span className="text-2xl font-semibold">{item}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
