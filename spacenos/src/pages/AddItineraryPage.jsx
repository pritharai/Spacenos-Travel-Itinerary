import React from "react";
import { useNavigate } from "react-router-dom";
import ItineraryForm from "../views/ItineraryForm";
import Navbar from "../views/Navbar";

const AddItineraryPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <ItineraryForm
          onSuccess={() => {
            navigate("/");
          }}
        />
      </div>
    </>
  );
};

export default AddItineraryPage;
