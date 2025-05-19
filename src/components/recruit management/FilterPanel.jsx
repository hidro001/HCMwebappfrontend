

import React from 'react';
import FilterChip from './FilterChip';

function FilterPanel({ filters, handleFilterClick, handleClearAll }) {
  return (
    <div
      className="overflow-y-auto pr-2 "
      style={{ maxHeight: 'calc(80vh - 100px)' }} // adjust the value as needed
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg">Vacancies Filter</h2>
        <button
          onClick={handleClearAll}
          className="text-blue-500 text-sm underline"
        >
          CLEAR ALL
        </button>
      </div>
      {/* Department */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Department</h3>
        <div className="flex flex-wrap gap-2">
          {[
            'All Department',
            'Development',
            'Sales & Marketing',
            'Project Management',
            'Support',
            'Analytics & Data',
          ].map((dept) => (
            <FilterChip
              key={dept}
              label={dept}
              selected={filters.department === dept}
              onClick={() => handleFilterClick('department', dept)}
            />
          ))}
        </div>
      </div>
      {/* Position Type */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Position Type</h3>
        <div className="flex flex-wrap gap-2">
          {[
            'All Positions',
            'UX/UI Designer',
            'PM',
            'React Developer',
            'QA',
            'Data Analyst',
            'Backend Java Developer',
            'DevOps',
            'Python Django Developer',
          ].map((posType) => (
            <FilterChip
              key={posType}
              label={posType}
              selected={filters.positionType === posType}
              onClick={() => handleFilterClick('positionType', posType)}
            />
          ))}
        </div>
      </div>
      {/* Work Experience */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Work Experience</h3>
        <div className="flex flex-wrap gap-2">
          {[
            'Any Experience',
            'Less than 1 year',
            '1-2 years',
            '2-3 years',
            '3-5 years',
            'More than 5 years',
          ].map((we) => (
            <FilterChip
              key={we}
              label={we}
              selected={filters.workExperience === we}
              onClick={() => handleFilterClick('workExperience', we)}
            />
          ))}
        </div>
      </div>
      {/* Location */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Location</h3>
        <div className="flex flex-wrap gap-2">
          {['Any Location', 'United States', 'Ukraine', 'Germany', 'France', 'Remote'].map(
            (loc) => (
              <FilterChip
                key={loc}
                label={loc}
                selected={filters.location === loc}
                onClick={() => handleFilterClick('location', loc)}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default FilterPanel;

