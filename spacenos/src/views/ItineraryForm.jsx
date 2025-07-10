import React, { useState } from "react";
import { auth } from "../firebase";
import { handleAddItinerary } from "../controllers/itinerary.controller";

const ItineraryForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    destination: "",
    activity: "",
    date: "",
    type: "",
    photo: "",
  });

  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, photo: reader.result });
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const submit = () => {
    handleAddItinerary(
      auth.currentUser,
      formData,
      () => {
        alert("Itinerary added!");
        setFormData({
          destination: "",
          activity: "",
          date: "",
          type: "",
          photo: "",
        });
        setPreview(null);
        onSuccess();
      },
      (err) => alert("Error: " + err)
    );
  };

  return (
    <div className="flex justify-center items-center p-6">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md transition-transform duration-300 hover:scale-[1.01]">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
          Add New Itinerary
        </h2>

        <div className="flex flex-col gap-4">
          {["destination", "activity", "date", "type"].map((field) => (
            <input
              key={field}
              type={field === "date" ? "date" : "text"}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={formData[field]}
              onChange={(e) =>
                setFormData({ ...formData, [field]: e.target.value })
              }
              className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          ))}

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
          />

          {preview && (
            <div className="flex justify-center mt-2">
              <img
                src={preview}
                alt="Preview"
                className="rounded shadow-md h-32 object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          )}

          <button
            onClick={submit}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition duration-300"
          >
            Submit Itinerary
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItineraryForm;
