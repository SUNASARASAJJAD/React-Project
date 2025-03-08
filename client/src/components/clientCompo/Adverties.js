import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Adverties = () => {
  const slides = [
    {
      id: 1,
      title: "Step Out in Trendy Flats",
      price: "₹118",
      description: "High in Fashion & Comfort",
      image:
        "https://img.freepik.com/free-vector/gradient-discount-numbers-set_23-2149577274.jpg", 
      alt: "Trendy Flats",
      bgColor: "bg-gradient-to-r from-indigo-900 to-indigo-700",
    },
    {
      id: 2,
      title: "Stylish Summer Collection",
      price: "₹299",
      description: "Beat the Heat in Style",
      image:
        "https://img.freepik.com/free-vector/gradient-discount-numbers-set_23-2149577274.jpg",
      alt: "Summer Collection",
      bgColor: "bg-gradient-to-r from-rose-900 to-rose-700",
    },
    {
      id: 3,
      title: "Designer Sneakers",
      price: "₹499",
      description: "Sports Meets Fashion",
      image:
        "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c21hcnQlMjB3YXRjaHxlbnwwfHwwfHx8MA%3D%3D", 
      alt: "Designer Sneakers",
      bgColor: "bg-gradient-to-r from-emerald-900 to-emerald-700",
    },
    {
      id: 4,
      title: "Formal Collection",
      price: "₹899",
      description: "Professional & Comfortable",
      image:
        "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c21hcnQlMjB3YXRjaHxlbnwwfHwwfHx8MA%3D%3D", 
      alt: "Formal Collection",
      bgColor: "bg-gradient-to-r from-amber-900 to-amber-700",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        nextSlide();
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="w-full">
      <div
        className={`relative ${slides[currentSlide].bgColor} text-white p-4 transition-colors duration-500`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button
          onClick={prevSlide}
          className="absolute left-2 max-sm:hidden top-1/2 -translate-y-1/2 bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors z-10"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 max-sm:hidden top-1/2 -translate-y-1/2 bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors z-10"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between">
          <div className="flex-1 space-y-4 max-sm:space-y-1 max-sm:text-center">
            <h1 className="text-2xl sm:text-4xl font-bold">
              {slides[currentSlide].title}
            </h1>
            <div className="space-y-2 max-sm:space-y-0">
              <p className="text-lg sm:text-2xl">From {slides[currentSlide].price}</p>
              <p className="text-base sm:text-xl">{slides[currentSlide].description}</p>
            </div>
            <button className="bg-amber-400 text-gray-900 max-sm:px-4 px-6 max-sm:py-0 py-3 rounded-lg max-sm:font-semibold font-bold hover:bg-amber-500 transition-all shadow-lg hover:shadow-xl">
              Shop Now
            </button>
          </div>

          {/* Updated Product Display with Image */}
          <div className="flex-1 flex justify-center mt-4 sm:mt-0">
            <div className="relative w-64 h-44 sm:w-80 sm:h-64">
              <div className="absolute inset-0 bg-white/10 rounded-lg backdrop-blur-sm"></div>
              <div className="relative w-full h-full p-4">
                <img
                  src={slides[currentSlide].image}
                  alt={slides[currentSlide].alt}
                  className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/20 rounded-full blur-3xl"></div>
            <div
              className={`absolute bottom-0 right-1/4 w-96 h-96 ${slides[currentSlide].bgColor} rounded-full blur-3xl transition-colors duration-500`}
            ></div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${currentSlide === index ? "bg-amber-400 w-6" : "bg-white/50"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Adverties;
