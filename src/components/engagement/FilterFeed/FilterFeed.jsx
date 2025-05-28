import { FaArrowAltCircleDown } from "react-icons/fa";
import useDepartmentStore from "../../../store/departmentStore";
import { useEffect, useState } from "react";

const FilterFeed = ({ onDepartmentChange, onSort }) => {
  const [selected, setSelected] = useState('all');
  const { departments } = useDepartmentStore();
  const [sortOrder, setSortOrder] = useState("newest");


  useEffect(() => {
    onDepartmentChange(selected);
    onSort(sortOrder)

    console.log(sortOrder, 'sort')
  }, [selected, onDepartmentChange,sortOrder, onSort]);

  const handleDepartmentChange = (e) => {
    setSelected(e.target.value);
  };

  return (
    <div className='w-full flex items-center justify-between'>
     
      <div className="bg-white mr-2 w-full rounded-lg px-2 py-1 shadow mb-4">
        <label className="text-xs block mb-1">Filter by Department</label>
        <select
          className="w-full border text-xs rounded px-2 py-2"
          value={selected}
          onChange={handleDepartmentChange}
        >
          <option value="all">All Departments</option>
          {departments.length > 0 &&
            departments.map((item) => (
              <option key={item._id} value={item._id}>
                {item.department}
              </option>
            ))}
        </select>
      </div>

      
      <div className="bg-white w-full rounded-lg px-2 py-1 shadow mb-4">
        <label className="text-xs block mb-1">Sort by Date</label>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="w-full border text-xs rounded px-2 py-2"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

    </div>
  );
};

export default FilterFeed;
