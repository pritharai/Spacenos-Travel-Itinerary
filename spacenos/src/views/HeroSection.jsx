import React from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative bg-blue-600 text-white">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80')",
        }}
      ></div>

      {/* Overlay Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 text-center animate-fade-in">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 drop-shadow-md">
          Explore the World, One Plan at a Time ✈️
        </h1>
        <p className="text-lg sm:text-xl mb-8 text-blue-100">
          Organize, favorite, and manage your travel dreams effortlessly.
        </p>
        <button
          onClick={() => navigate("/add-itinerary")}
          className="bg-white text-blue-700 font-semibold px-6 py-3 rounded shadow-md hover:bg-gray-100 transition duration-300"
        >
          Plan Your Trip
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
