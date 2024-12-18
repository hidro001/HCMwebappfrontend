import React from "react";

const Card = ({ label, value }) => {
  return (
    <div className="bg-white dark:bg-gray-700 shadow-md p-4 rounded flex flex-col items-center">
      <div className="text-purple-600 text-3xl">👤</div>
      <div className="text-lg font-semibold mt-2">{label}</div>
      <div className="text-2xl font-bold mt-1">{value}</div>
    </div>
  );
};

export default Card;
