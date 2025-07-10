import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../views/Navbar.jsx";
import ItineraryList from "../views/ItineraryList.jsx";
import HeroSection from "../views/HeroSection.jsx";

const Home = () => {
  const navigate = useNavigate();

  const goToAddItinerary = () => {
    navigate("/add-itinerary");
  };

  return (
    <>
      <Navbar />
      <HeroSection />

      <div className="max-w-5xl mx-auto mt-6 px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
          <h1 className="text-2xl font-semibold text-gray-800">
            Travel Itinerary Planner
          </h1>
          <button
            onClick={goToAddItinerary}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow transition"
          >
            + Add Itinerary
          </button>
        </div>

        <ItineraryList />
      </div>
    </>
  );
};

export default Home;
