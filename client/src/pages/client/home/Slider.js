// import { useState, useEffect } from "react";

// const slides = [
//   {
//     id: 1,
//     title: "Electronics Sale",
//     description: "Huge discounts on electronics! Up to 60% off!",
//     img: "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=800",
//     url: "/electronics",
//     bg: "bg-gradient-to-r from-blue-50 to-purple-50",
//   },
//   {
//     id: 2,
//     title: "Winter Sale Collections",
//     description: "Sale! Up to 50% off!",
//     img: "https://images.pexels.com/photos/1457983/pexels-photo-1457983.jpeg?auto=compress&cs=tinysrgb&w=800",
//     url: "/",
//     bg: "bg-gradient-to-r from-pink-50 to-blue-50",
//   },
//   {
//     id: 3,
//     title: "Spring Sale Collections",
//     description: "Sale! Up to 50% off!",
//     img: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800",
//     url: "/",
//     bg: "bg-gradient-to-r from-blue-50 to-yellow-50",
//   },

// ];

// const Slider = () => {
//   const [current, setCurrent] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
//     }, 3000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="h-[calc(100vh-80px)] max-h-[800px] overflow-hidden relative">
//       {/* Slider Container */}
//       <div
//         className="w-max h-full flex transition-all ease-in-out duration-1000"
//         style={{ transform: `translateX(-${current * 100}vw)` }}
//       >
//         {slides.map((slide) => (
//           <div
//             className={`${slide.bg} w-screen h-full flex flex-col md:flex-row gap-4 md:gap-8 lg:gap-16`}
//             key={slide.id}
//           >
//             {/* Left Content */}
//             <div className="min-h-[200px]  flex-1 flex flex-col items-center md:items-center justify-center gap-4 md:gap-8 lg:gap-12 text-center md:text-center p-4 md:p-8">
//               <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl mr-7 sm:mr-0">
//                 {slide.description}
//               </h2>
//               <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mr-7 sm:mr-0">
//                 {slide.title}
//               </h1>
//               <a href={slide.url}>
//                 <button className="rounded-md bg-black text-white py-2 px-3 md:py-3 md:px-4 text-sm md:text-base hover:bg-gray-800 transition-colors mr-7 sm:mr-0">
//                   SHOP NOW
//                 </button>
//               </a>
//             </div>

//             {/* Right Content (Image) */}
//             <div className="flex-1 relative min-h-[300px] md:min-h-[400px] flex items-center justify-center">
//               <img
//                 src={slide.img}
//                 alt="Slide Image"
//                 className="object-cover w-full h-full"
//               />
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Dots Navigation */}
//       <div className="absolute left-1/2 -translate-x-1/2 bottom-4 md:bottom-8 flex gap-2 md:gap-4">
//         {slides.map((_, index) => (
//           <div
//             className={`w-2 h-2 md:w-3 md:h-3 rounded-full cursor-pointer transition-all ${current === index ? "bg-black scale-150" : "bg-gray-300"
//               }`}
//             key={index}
//             onClick={() => setCurrent(index)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Slider;

import { useState, useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    id: 1,
    title: "Summer Collection",
    description: "Discover our hottest summer styles",
    subtitle: "Up to 50% Off Selected Items",
    img: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800",
    bg: "bg-gradient-to-r from-amber-100/80 via-orange-100/60 to-rose-100/40",
  },
  {
    id: 2,
    title: "Winter Essentials",
    description: "Stay warm in style",
    subtitle: "New Arrivals Just Landed",
    img: "https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800",
    bg: "bg-gradient-to-r from-blue-100/80 via-indigo-100/60 to-purple-100/40",
  },
  {
    id: 3,
    title: "Spring Refresh",
    description: "Fresh looks for the new season",
    subtitle: "Limited Time Offers",
    img: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800",
    bg: "bg-gradient-to-r from-emerald-100/80 via-teal-100/60 to-cyan-100/40",
  },
];

const Slider = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const shopCollection = () =>{
     navigate("/allproduct")
  }

  return (
    <div className="relative w-full h-[70vh]  max-sm:h-[250px] overflow-hidden">
      <div
        className="flex w-max h-full transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${current * 100}vw)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="relative w-screen h-full flex flex-col lg:flex-row"
          >
            {/* Image with overlay */}
            <div className="absolute inset-0 z-0">
              <img
                src={slide.img}
                alt=""
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Content */}
            <div className={`relative z-10 flex-1 flex ${slide.bg}`}>
              <div className="container mx-auto flex flex-col justify-center px-6 py-16 max-sm:py-6 lg:w-1/2 lg:px-12 xl:px-24">
                <div className="max-w-md space-y-6 max-sm:space-y-3 text-white">
                  <p className="text-lg font-semibold tracking-wide text-opacity-90 max-md:text-sm">
                    {slide.subtitle}
                  </p>
                  <h1 className="text-4xl font-bold leading-tight  md:text-6xl max-md:text-2xl">
                    {slide.title}
                  </h1>
                  <p className="text-xl font-medium max-md:text-sm">
                    {slide.description}
                  </p>
                  <button onClick={shopCollection} className="flex w-fit items-center gap-2 rounded-full bg-white/10 px-8 py-4 max-sm:py-2 max-sm:px-4 text-lg max-md:text-sm font-medium backdrop-blur-sm transition-all hover:bg-white/20 hover:gap-4">
                    Shop Collection
                    <FiArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              current === index
                ? "scale-125 bg-white"
                : "scale-100 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute top-0 z-20 h-1 w-full bg-white/20">
        <div
          className="h-full bg-white transition-all duration-500"
          style={{ width: `${((current + 1) / slides.length) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default Slider;
