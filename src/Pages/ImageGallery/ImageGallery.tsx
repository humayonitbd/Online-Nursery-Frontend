
import img1 from "../../assets/HeroSecImg/12.jpg";
import img2 from "../../assets/HeroSecImg/11.jpg";
import img3 from "../../assets/HeroSecImg/10.jpg";
import img4 from "../../assets/HeroSecImg/9.jpg";
import img5 from "../../assets/HeroSecImg/8.jpg";
import img6 from "../../assets/HeroSecImg/7.jpg";
import img7 from "../../assets/HeroSecImg/6.jpg";
import img8 from "../../assets/HeroSecImg/5.jpg";
import img9 from "../../assets/HeroSecImg/4.jpg";
import img10 from "../../assets/HeroSecImg/3.jpg";

const ImageGallery = () => {
  const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];

  return (
    <div id="gallerySec" className="pt-5 pb-10 ">
      <h2 className="text-3xl font-bold mb-6 text-center text-slate-700">
        Gallery of our products
      </h2>
      <p className="text-center px-5 sm:px-10 md:px-32 text-slate-700 text-lg">
        Welcome to our product gallery! Here, you can see how our products have
        positively impacted the lives of our customers. This visual showcase not
        only highlights the variety and quality of our offerings but also
        provides real-life examples of their effectiveness.
      </p>
      <div className="mt-10">
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-6">
          {images.map((src, index) => (
            <div
              key={index}
              className={`relative group ${
                index === 0 ? "col-span-1 row-span-1" : ""
              }${index === 1 ? "col-span-2 row-span-1" : ""} ${
                index === 3 ? "col-span-2 row-span-1" : ""
              } ${index === 5 ? "col-span-1 row-span-1" : ""}`}
            >
              <img
                src={src}
                alt={`Healthy individual ${index + 1}`}
                className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white text-lg font-semibold">
                  Image {index + 1}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;



