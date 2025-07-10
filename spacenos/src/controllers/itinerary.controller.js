import {
  addItinerary,
  getUserItineraries,
  updateItinerary,
  deleteItinerary,
} from "../models/itinerary.model";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export const handleAddItinerary = async (user, formData, onSuccess, onError) => {
  if (!user) return onError("User not logged in");
  try {
    await addItinerary({ ...formData, userEmail: user.email });
    onSuccess();
  } catch (err) {
    onError(err.message);
  }
};

export const handleFetchItineraries = async (user, filters, setItineraries) => {
  if (!user) return;
  const all = await getUserItineraries(user.email);
  const filtered = all.filter(item => {
    return (
      (!filters.type || item.type.toLowerCase().includes(filters.type.toLowerCase())) &&
      (!filters.date || item.date === filters.date)
    );
  });
  setItineraries(filtered);
};

export const handleDeleteItinerary = async (id, refresh) => {
  await deleteItinerary(id);
  refresh();
};

export const handleUpdateItinerary = async (id, newData, refresh) => {
  await updateItinerary(id, newData);
  refresh();
};



export const handleToggleFavorite = async (itineraryId, newStatus, callback) => {
  try {
    const ref = doc(db, "itineraries", itineraryId);
    await updateDoc(ref, {
      isFavorite: newStatus,
    });
    if (callback) callback();
  } catch (err) {
    alert("Failed to update favorite status: " + err.message);
  }
};
