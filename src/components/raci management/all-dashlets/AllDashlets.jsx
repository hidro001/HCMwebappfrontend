import React from 'react';
import DemographicAgeGender from './DemographicAgeGender';
import DemographicNationalMarital from './DemographicNationalMarital';
import ValidPan from './ValidPan';
import ValidAdhaar from './ValidAdhaar';
import ValidPassport from './ValidPassport';

export default function AllDashlets() {
  return (
    <div className="min-h-screen  dark: ">
      {/* Page title */}
      <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        Dashboards
      </h1>

      {/* 3-column layout with NO extra gap */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
        {/* Column 1: Age,Gender */}
        <div >
          <DemographicAgeGender />
        </div>

        {/* Column 2: Nationality,Marital */}
        <div >
          <DemographicNationalMarital />
        </div>

        {/* Column 3: stacked smaller donut charts (reduced vertical spacing) */}
        <div className="flex flex-col">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md">
            <ValidPan />
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md">
            <ValidAdhaar />
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md">
            <ValidPassport />
          </div>
        </div>
      </div>
    </div>
  );
}
