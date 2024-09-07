import React from "react";

export const CircularLoader = ({ size = 8, color = "blue-500" }) => {
  const loaderSize = `h-${size} w-${size}`;
  const loaderColor = `border-t-${color}`;

  return (
    <div className={`flex items-center justify-center`}>
      <div
        className={`${loaderSize} border-4 border-t-transparent border-solid rounded-full animate-spin ${loaderColor}`}
      ></div>
    </div>
  );
};
