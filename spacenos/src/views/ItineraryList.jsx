import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import {
  handleFetchItineraries,
  handleDeleteItinerary,
  handleUpdateItinerary,
  handleToggleFavorite,
} from "../controllers/itinerary.controller";

const ItineraryList = () => {
  const [itineraries, setItineraries] = useState([]);
  const [filters, setFilters] = useState({ type: "", date: "" });
  const [searchText, setSearchText] = useState("");
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  const fetch = () => {
    handleFetchItineraries(auth.currentUser, filters, setItineraries);
  };

  useEffect(() => {
    fetch();
  }, [filters]);

  const handleSaveEdit = () => {
    handleUpdateItinerary(editId, editData, () => {
      setEditId(null);
      fetch();
    });
  };

  const filteredItineraries = itineraries.filter((item) => {
    const values = [item.destination, item.activity, item.type];
    return values.some((val) =>
      val?.toLowerCase().includes(searchText.toLowerCase())
    );
  });

  return (
    <div className="max-w-3xl mx-auto px-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Filter by type"
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          className="px-3 py-2 border rounded w-full sm:w-auto"
        />
        <input
          type="date"
          value={filters.date}
          onChange={(e) => setFilters({ ...filters, date: e.target.value })}
          className="px-3 py-2 border rounded w-full sm:w-auto"
        />
        <button
          onClick={() => setFilters({ type: "", date: "" })}
          className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded text-sm"
        >
          Clear
        </button>
      </div>

      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search destination, activity, type"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="w-full mb-6 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
      />

      {/* Results */}
      {filteredItineraries.length === 0 ? (
        <p className="text-center text-gray-500">No itineraries found.</p>
      ) : (
        filteredItineraries.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md rounded-lg p-6 mb-6 transition-all hover:shadow-lg"
          >
            {editId === item.id ? (
              <div className="space-y-3">
                <input
                  className="w-full px-3 py-2 border rounded"
                  value={editData.destination}
                  onChange={(e) =>
                    setEditData({ ...editData, destination: e.target.value })
                  }
                  placeholder="Destination"
                />
                <input
                  className="w-full px-3 py-2 border rounded"
                  value={editData.activity}
                  onChange={(e) =>
                    setEditData({ ...editData, activity: e.target.value })
                  }
                  placeholder="Activity"
                />
                <input
                  type="date"
                  className="w-full px-3 py-2 border rounded"
                  value={editData.date}
                  onChange={(e) =>
                    setEditData({ ...editData, date: e.target.value })
                  }
                />
                <input
                  className="w-full px-3 py-2 border rounded"
                  value={editData.type}
                  onChange={(e) =>
                    setEditData({ ...editData, type: e.target.value })
                  }
                  placeholder="Type"
                />

                {/* 📸 Add New Photo Upload Input */}
                <div>
                  <label className="block mb-1 text-sm text-gray-600">
                    Update Photo
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setEditData({ ...editData, photo: reader.result });
                      };
                      reader.readAsDataURL(file);
                    }}
                    className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                  />
                </div>

                {/* Show Current or New Image */}
                {editData.photo && (
                  <img
                    src={editData.photo}
                    alt="Preview"
                    className="mt-3 rounded h-32 object-cover transition-transform duration-300 hover:scale-105"
                  />
                )}

                <div className="flex gap-4 mt-2">
                  <button
                    onClick={handleSaveEdit}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditId(null)}
                    className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              // original non-edit view remains here

              <>
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-semibold text-blue-700">
                    {item.destination}{" "}
                    <span className="text-sm text-gray-600">({item.type})</span>
                  </h3>
                  <button
                    onClick={() =>
                      handleToggleFavorite(item.id, !item.isFavorite, fetch)
                    }
                    className={`text-xl transition transform ${
                      item.isFavorite
                        ? "text-yellow-400 hover:scale-110"
                        : "text-gray-400 hover:text-yellow-400"
                    }`}
                    title={item.isFavorite ? "Unfavorite" : "Mark as Favorite"}
                  >
                    {item.isFavorite ? "★" : "☆"}
                  </button>
                </div>

                <p className="text-gray-700">
                  <strong>Activity:</strong> {item.activity}
                </p>
                <p className="text-gray-700">
                  <strong>Date:</strong> {item.date}
                </p>

                {item.photo && (
                  <img
                    src={item.photo}
                    alt="Trip"
                    className="mt-3 rounded h-32 object-cover transition-transform duration-300 hover:scale-105"
                  />
                )}

                <div className="flex gap-4 mt-4">
                  <button
                    onClick={() => {
                      setEditId(item.id);
                      setEditData(item);
                    }}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => {
                      const confirmDelete = window.confirm(
                        `Are you sure you want to delete the itinerary for "${item.destination}"?`
                      );
                      if (confirmDelete) {
                        handleDeleteItinerary(item.id, fetch);
                      }
                    }}
                    className="text-red-500 hover:text-red-700 font-medium"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ItineraryList;
