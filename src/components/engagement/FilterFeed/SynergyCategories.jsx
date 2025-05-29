import  { useEffect, useState } from "react";

const categories = [
  { name: "All Announcement", count: 15, circleBg: "bg-green-100" },
  { name: "General", count: 15, circleBg: "bg-yellow-100" },
  { name: "New Hire", count: 15, circleBg: "bg-sky-100" },
  { name: "SOP Updates", count: 15, circleBg: "bg-indigo-100" },
  { name: "Policy Updates", count: 15, circleBg: "bg-slate-100" },
  { name: "Promotion", count: 15, circleBg: "bg-yellow-100" },
  { name: "Transfer", count: 15, circleBg: "bg-green-100" },
  { name: "Training", count: 15, circleBg: "bg-green-100" },
  { name: "Special", count: 15, circleBg: "bg-yellow-100" },
];

export default function CategoriesListCompact({ onCategoryChange }) {

  const [selected, setSelected] = useState("All Announcement");

  useEffect(() => {
   onCategoryChange(selected)
  }, [selected])

  return (
    <div className="w-56 bg-white rounded-lg shadow-sm p-3 select-none font-sans">
      <h3 className="font-semibold text-gray-900 mb-2 text-sm">Categories</h3>
      <ul className="max-h-72 overflow-y-auto">
        {categories.map(({ name, count, circleBg }) => {
          const isSelected = selected === name;
          return (
            <li
              key={name}
              onClick={() => setSelected(name)}
              className={`flex justify-between items-center  rounded-md cursor-pointer px-2 py-1 mb-1
                transition-colors duration-150 ease-in-out
                ${
                  isSelected
                    ? "bg-green-50 border border-green-100"
                    : "hover:bg-green-100"
                }
              `}
            > 
              <span
                className={`flex items-center gap-2 text-xs font-normal ${
                  isSelected ? "text-green-900" : "text-gray-900"
                }`}
              >
                {name}
              </span>

              <span
                className={`flex items-center gap-1 text-[10px] font-semibold rounded-full px-2 py-0.5
                  ${
                    isSelected
                      ? "bg-green-300"
                      : `${circleBg} hover:bg-green-300`
                  }
                `}
               >
                {count}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
