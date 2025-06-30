import { IoClose } from 'react-icons/io5';
import { FaBell } from "react-icons/fa";
import { MdOutlineCalendarToday } from 'react-icons/md';

const NotificationPanel = ({ visible, onClose }) => {
  return (
    <div
      className={`fixed top-16 right-6 w-96 bg-white rounded-xl shadow-xl border border-gray-200 z-50 transform transition-all duration-300 ${
        visible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0 pointer-events-none'
      }`}
    >
      <div className="p-4">
        <div className="flex justify-between items-center pb-2 mb-3">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <div className='rounded-full bg-yellow-200 text-white p-2'>
              <FaBell size={20} />
            </div>
            Notifications
          </h2>
          <button onClick={onClose} className="text-gray-400 cursor-pointer hover:text-red-600 transition">
            <IoClose size={22} />
          </button>
        </div>

        <div className="space-y-3 max-h-72 overflow-y-auto sidebar-scrollbar pr-1">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition">
              <div className="mt-1 text-green-600">
                <MdOutlineCalendarToday size={20} />
              </div>
              <div>
                <h3 className="font-medium text-sm text-gray-800">New Leave Application</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Ankit has applied for leave from <strong>2025-05-01</strong> to <strong>2025-05-01</strong> (1 day).<br />
                  Reason: Sdsdsdsds.
                </p>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-2 rounded-md text-sm font-medium transition">
          Show More
        </button>
      </div>
    </div>
  );
};

export default NotificationPanel;
