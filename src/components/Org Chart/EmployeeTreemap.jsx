

import OrgChart from "./OrgChart";

function EmployeeTreemap() {
  return (
    <div className="  rounded-3xl">
      <div className=" ">
        {/* Header Section */}
   

        {/* Chart Container */}
        <div className="relative">
          {/* Chart wrapper with enhanced styling */}
          <div className="relative  flex items-center justify-center">
            <OrgChart />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeTreemap;