import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef } from "react";

const BestSeller = () => {
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const intervalRef = useRef(null);

  const data = [
    { src: "/GenInfo/adidas.jpg", name: "Adidas", to: "/search/adidas" },
    { src: "/GenInfo/nike.png", name: "Nike", to: "/search/nike" },
    { src: "/GenInfo/skechers.jpg", name: "Skechers", to: "/search/skechers" },
    { src: "/GenInfo/puma.jpg", name: "Puma", to: "/search/puma" },
    { src: "/GenInfo/adidas.jpg", name: "Adidas", to: "/search/adidas" },
    { src: "/GenInfo/nike.png", name: "Nike", to: "/search/nike" },
    { src: "/GenInfo/skechers.jpg", name: "Skechers", to: "/search/skechers" },
    { src: "/GenInfo/puma.jpg", name: "Puma", to: "/search/puma" },
  ];

  // 🔁 Auto Scroll Start
  const startAutoScroll = () => {
    stopAutoScroll();

    intervalRef.current = setInterval(() => {
      const container = scrollRef.current;
      if (!container) return;

      const maxScroll = container.scrollWidth - container.clientWidth;

      if (container.scrollLeft >= maxScroll) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: 280, behavior: "smooth" });
      }
    }, 2500);
  };

  // 🛑 Stop Auto Scroll
  const stopAutoScroll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    startAutoScroll();
    return stopAutoScroll;
  }, []);

  const handleScroll = (direction) => {
    stopAutoScroll();
    const container = scrollRef.current;
    if (!container) return;

    container.scrollBy({
      left: direction === "left" ? -280 : 280,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative my-16 w-full">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Best Seller
      </h2>

      {/* Left Button */}
      <button
        onClick={() => handleScroll("left")}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-3 hover:scale-110 transition"
      >
          ◀
      </button>

      {/* Right Button */}
      <button
        onClick={() => handleScroll("right")}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-3 hover:scale-110 transition"
      >
       ▶
      </button>

      {/* Scroll Container */}
      <div
        ref={scrollRef}
        onMouseEnter={stopAutoScroll}
        onMouseLeave={startAutoScroll}
        className="flex overflow-x-auto gap-6 px-10 scroll-smooth no-scrollbar"
      >
        {data.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(item.to)}
            className="min-w-[260px] h-[260px] relative rounded-xl overflow-hidden cursor-pointer group"
          >
            <img
              src={item.src}
              alt={item.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />

            <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/60 transition">
              <span className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition">
                Explore →
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
