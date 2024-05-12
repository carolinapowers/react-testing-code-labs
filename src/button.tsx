import React from "react";

export const SeeMoreButton: React.FC<{
  handleClick: () => void;
  children?: React.ReactNode;
}> = ({ handleClick, children }) => {
  return (
    <button className="app-button" onClick={handleClick}>
      See more
    </button>
  );
};
