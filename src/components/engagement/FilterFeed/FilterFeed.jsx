


import { 
  HiOutlineBuildingOffice2, 
  HiOutlineCalendarDays,
  HiOutlineAdjustmentsHorizontal,
  HiChevronDown 
} from "react-icons/hi2";
import { 
  RiFilterLine, 
  RiSortAsc, 
  RiSortDesc,
  RiArrowUpDownLine 
} from "react-icons/ri";
import useDepartmentStore from "../../../store/departmentStore";
import { useEffect, useState } from "react";

const FilterFeed = ({ onDepartmentChange, onSort }) => {

  const [selected, setSelected] = useState('all');
  const { departments } = useDepartmentStore();
  const [sortOrder, setSortOrder] = useState("newest");
  const [isHovered, setIsHovered] = useState(null);

  useEffect(() => {
    onDepartmentChange(selected);
    onSort(sortOrder);
    console.log(sortOrder, 'sort');
  }, [selected, onDepartmentChange, sortOrder, onSort]);

  const handleDepartmentChange = (e) => {
    setSelected(e.target.value);
  };

  const selectedDepartment = departments.find(dept => dept._id === selected);

  return (
      <div className="relative ">
        <div className="relative  px-4 pb-4 ">

          {/* <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
              <HiOutlineAdjustmentsHorizontal className="w-4 h-4 text-white" />
            </div>
            <h3 className="font-semibold text-gray-800 dark:text-white">Filters & Sort</h3>
          </div> */}

          <div className="grid grid-rows-1 md:grid-rows-2 gap-4">
            
            <div 
              className="group"
              onMouseEnter={() => setIsHovered('department')}
              onMouseLeave={() => setIsHovered(null)}
            >
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <HiOutlineBuildingOffice2 className={`w-4 h-4 transition-all duration-300 ${isHovered === 'department' ? 'text-blue-500 scale-110' : ''}`} />
                Department
              </label>
              <div className="relative">
                <select
                  className="w-full appearance-none bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 border-2 border-gray-200 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 focus:border-blue-500 dark:focus:border-blue-400 text-sm rounded-lg px-4 py-3 pr-10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-800 dark:text-white group-hover:shadow-lg dark:bg-gray-700"
                  value={selected}
                  onChange={handleDepartmentChange}
                >
                  <option value="all">🏢 All Departments</option>
                  {departments.length > 0 &&
                    departments.map((item) => (
                      <option key={item._id} value={item._id}>
                        🏛️ {item.department}
                      </option>
                    ))}
                </select>
                <HiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none transition-transform duration-300 group-hover:rotate-180" />
              </div>

              {selected !== 'all' && selectedDepartment && (
                <div className="mt-2 flex items-center gap-2 text-xs text-blue-600 dark:text-blue-400 dark:bg-gray-700">
                  <RiFilterLine className="w-3 h-3" />
                  <span >Filtering: {selectedDepartment.department}</span>
                </div>
              )}
            </div>

            <div 
              className="group"
              onMouseEnter={() => setIsHovered('sort')}
              onMouseLeave={() => setIsHovered(null)}
            >
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <HiOutlineCalendarDays className={`w-4 h-4 transition-all duration-300 ${isHovered === 'sort' ? 'text-purple-500 scale-110' : ''}`} />
                Sort Order
              </label>
              <div className="relative">
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="w-full appearance-none bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 border-2 border-gray-200 dark:border-gray-600 hover:border-purple-400 dark:hover:border-purple-500 focus:border-purple-500 dark:focus:border-purple-400 text-sm rounded-lg px-4 py-3 pr-10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-gray-800 dark:text-white group-hover:shadow-lg dark:bg-gray-700"
                >
                  <option value="newest">🆕 Newest First</option>
                  <option value="oldest">📅 Oldest First</option>
                </select>
                <HiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none transition-transform duration-300 group-hover:rotate-180" />
              </div>
     
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <RiArrowUpDownLine className="w-3 h-3" />
                <span>
                  {selected === 'all' ? 'All departments' : selectedDepartment?.department} • 
                  {sortOrder === 'newest' ? ' Newest first' : ' Oldest first'}
                </span>
              </div>
              
              {selected !== 'all' && (
                <button
                  onClick={() => setSelected('all')}
                  className="text-xs text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors duration-200 hover:underline"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
   
  );
};

export default FilterFeed;