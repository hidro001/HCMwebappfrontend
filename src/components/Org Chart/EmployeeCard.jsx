import React, { useEffect, useState } from 'react';
import { getEmployeeByIdApi } from '../../service/getAllEmployeesApi';

const EmployeeCard = ({ id , closeCard }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getEmployeeByIdApi(id);
        console.log(data)
        setUser(data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div className="text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="shadow-md rounded-lg p-4 w-72 border-2 border-green-500 bg-green-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img
            src={user.data.user_Avatar}
            alt={user.name}
            className="w-8 h-8 rounded-full"
          />
          <div>
            <h2 className="text-sm font-semibold text-gray-900">{user.data.first_Name} {user.data.last_Name}</h2>
            <p className="text-xs text-gray-500">
              {user.data.designation} • <span className="text-green-600 font-semibold">{user.data.department}</span>
            </p>
          </div>
          <div onClick={closeCard} className='absolute top-1 right-2 z-20  text-red-500 font-semibold cursor-pointer'>X</div>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <p className='underline'><span className="font-semibold text-green-800">Email:</span> {user.data.working_Email_Id}</p>
        {/* <p><span className="font-semibold">Phone:</span> {user.data.phone}</p>
        <p><span className="font-semibold">Location:</span> {user.location}</p> */}
      </div>
    </div>
  );
};

export default EmployeeCard