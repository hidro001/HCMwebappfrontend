import React from "react";
import {
  FaFilePdf,
  FaFilePowerpoint,
  FaRegImage,
  FaVideo,
} from "react-icons/fa";

function renderIcon(type) {
  switch (type) {
    case "ppt":
      return <FaFilePowerpoint className="text-orange-500 w-6 h-6" />;
    case "pdf":
      return <FaFilePdf className="text-red-500 w-6 h-6" />;
    case "video":
      return <FaVideo className="text-blue-500 w-6 h-6" />;
    case "image":
      return <FaRegImage className="text-green-500 w-6 h-6" />;
    default:
      return null;
  }
}

export default function MaterialsList({ materials }) {
  if (!materials || materials.length === 0) {
    return <div>No materials available for this module.</div>;
  }

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
      {materials.map((item) => (
        <div
          key={item.id}
          className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col"
        >
          <div className="flex items-center space-x-2">
            {renderIcon(item.type)}
            <h4 className="text-gray-800 dark:text-gray-100 font-medium">
              {item.title}
            </h4>
          </div>
          <button
            onClick={() => window.open(item.presignedUrl, "_blank")}
            className="mt-2 text-sm text-blue-600 dark:text-blue-400 underline self-start"
          >
            Open {item.type.toUpperCase()}
          </button>
        </div>
      ))}
    </div>
  );
}
