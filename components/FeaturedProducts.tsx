import Image from "next/image"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import FallbackImage from '@/public/fallback-image.jpg'
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { ShoppingBagIcon } from "lucide-react"
 
export function FeaturedProducts() {
  return (
    <Carousel className="w-full">
      <CarouselContent className="-ml-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardHeader className="p-0">
                  <div className="relative w-full h-60">
                  <Image 
                    src={FallbackImage}
                    alt="fallback-image"
                    fill
                    className="object-cover"
                  />
                  </div>
                </CardHeader>
                <CardContent className="py-4 space-y-4">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-semibold">Product</h2>
                    <h3 className="text-xl">₱99.75</h3>
                    <Badge variant={'outline'} className="w-fit">Shirt</Badge>
                  </div>

                  <Button size={'lg'} className="w-full flex items-center">
                    <ShoppingBagIcon className="w-4" /> BUY NOW
                  </Button>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="-left-2 md:-left-4" />
      <CarouselNext className="-right-2 md:-right-4"/>
    </Carousel>
  )
}