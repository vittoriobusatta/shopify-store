import React, { useEffect } from "react";

function Spinner({ isLoading }) {
  const opacity = isLoading ? 1 : 0;
  const display = isLoading ? "flex" : "none"; // réglage de l'affichage

  useEffect(() => {
    // masquer complètement le spinner après la durée de transition
    if (!isLoading) {
      setTimeout(() => {
        document.querySelector(".spinner").style.display = "none";
      }, 500); // durée de transition de 500ms
    }
  }, [isLoading]);

  return (
    <div className="spinner" style={{ opacity, display}}>
      <div className="spinner__circle"></div>
    </div>
  );
}

export default Spinner;