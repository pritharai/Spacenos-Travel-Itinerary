import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { handleFetchItineraries } from "../controllers/itinerary.controller";
import Navbar from "../views/Navbar";

const FavoriteItineraries = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    handleFetchItineraries(auth.currentUser, {}, (all) => {
      const favs = all.filter((item) => item.isFavorite);
      setFavorites(favs);
    });
  }, []);

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 mt-8">
        <h2 className="text-2xl font-semibold mb-6 text-blue-700">
          ⭐ Favorite Itineraries
        </h2>
        {favorites.length === 0 ? (
          <p className="text-gray-500 text-center">No favorites yet.</p>
        ) : (
          favorites.map((item) => (
            <div key={item.id} className="bg-white shadow rounded-lg p-6 mb-5">
              <h3 className="text-lg font-bold text-gray-800">
                {item.destination}{" "}
                <span className="text-sm text-gray-500">({item.type})</span>
              </h3>
              <p>
                <strong>Activity:</strong> {item.activity}
              </p>
              <p>
                <strong>Date:</strong> {item.date}
              </p>
              {item.photo && (
                <img
                  src={item.photo}
                  alt="Trip"
                  className="mt-3 rounded h-32 object-cover"
                />
              )}
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default FavoriteItineraries;
