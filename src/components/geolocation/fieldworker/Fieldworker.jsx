import React, { useState, lazy, Suspense } from "react";

// Lazy‑load the tab bodies so the bundle stays light
const NonFieldWorkerDashboard = lazy(() =>
  import("./NonFieldWorkerDashboard")
);
const FieldWorkerDashboard = lazy(() =>
  import("./FieldWorkerDashboard")
);

const tabs = [
  { id: "non-field", label: "Non‑Field Worker" },
  { id: "field",     label: "Field Worker"   },
];

const FieldworkerTabs = () => {
  const [active, setActive] = useState("non-field");

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      {/* Tab Header */}
      <div className="flex flex-col sm:flex-row bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
        {tabs.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setActive(id)}
            className={`flex-1 rounded-lg py-2 sm:py-3 text-sm sm:text-base font-medium transition
                        focus:outline-none focus:ring-2 focus:ring-indigo-500
                        ${active === id
                          ? "bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow"
                          : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"}`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Tab Body */}
      <div className="mt-6 text-gray-700 dark:text-gray-200 min-h-[150px]">
        <Suspense fallback={<p className="text-center">Loading…</p>}>
          {active === "non-field" ? (
            <NonFieldWorkerDashboard />
          ) : (
            <FieldWorkerDashboard />
          )}
        </Suspense>
      </div>
    </div>
  );
};

export default FieldworkerTabs;
