import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import client1 from "@/assets/client-img/1.jpg";
import client2 from "@/assets/client-img/2.jpg";
import client3 from "@/assets/client-img/3.jpg";
const ClientSay = () => {
  const clientData = [
    {
      id: 1,
      details:
        "Thank you for purchasing our Bluetooth Speaker. Your support means everything to us. We hope you are enjoying your new product. If you have any questions or need any assistance, please don't hesitate to get in touch with our customer service team. We are committed to providing the best experience possible. Your feedback helps us grow and improve, so we would appreciate any comments or suggestions you have. Thank you once again for your trust in us. Contact us at michaelbrown@example.com or call 555-123-4567.",
      name: "Sismita khan",
      img: client1,
    },
    {
      id: 2,
      details:
        "We are thrilled to have you as a customer! Your purchase of our Smartwatch means a lot to us. Our team is dedicated to ensuring you have a positive experience, and we are here to assist you with any questions or concerns. Your feedback is invaluable, and we would love to hear about your experience with our product and service. If you enjoyed your purchase, please consider leaving a review. Thank you again for choosing us. We look forward to serving you in the future. You can reach us at janesmith@example.com or call 987-654-3210.",
      name: "Jomino uhala",
      img: client2,
    },
    {
      id: 3,
      details:
        "Thank you for choosing our Wireless Earbuds. We sincerely appreciate your recent purchase. We strive to provide the best quality and service to our valued customers, and your satisfaction is our top priority. If you have any questions or need further assistance with your purchase, please do not hesitate to reach out to us. We would love to hear your feedback on your shopping experience with us. Your insights help us improve and serve you better in the future. If you have a moment, please consider leaving a review or sharing your thoughts.",
      name: "Samal Aiu",
      img: client3,
    },
  ];

  return (
    <div className="py-10">
      <div>
        <h2 className="text-3xl font-bold mb-10 text-center text-slate-700 ">
          Our Client Say
        </h2>
      </div>
      <div className="relative h-[450px] ">
        <Carousel
          className="overflow-hidden rounded-lg shadow-lg"
          plugins={[
            Autoplay({
              delay: 6000,
            }),
          ]}
        >
          <CarouselContent className="flex">
            {clientData.map((client) => (
              <CarouselItem
                key={client.id}
                className="min-w-full relative bg-[#1F2937]"
              >
                <Card className="bg-transparent">
                  <CardContent className="flex items-center justify-center h-[450px] p-0 relative">
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#1F2937] bg-opacity-50 text-slate-300 text-lg z-20">
                      <p className="mb-4 text-center px-4 lg:mx-56">
                        {client.details}
                      </p>
                      <h2 className="text-xl text-center font-bold mb-4">
                        {client.name}
                      </h2>
                      <div>
                        <img
                          className="h-12 w-12 rounded-full"
                          src={client.img}
                          alt=""
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full cursor-pointer hover:bg-opacity-75 transition-opacity duration-300 z-30">
            &#9664;
          </CarouselPrevious>
          <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full cursor-pointer hover:bg-opacity-75 transition-opacity duration-300 z-30">
            &#9654;
          </CarouselNext>
        </Carousel>
      </div>
    </div>
  );
};

export default ClientSay;
