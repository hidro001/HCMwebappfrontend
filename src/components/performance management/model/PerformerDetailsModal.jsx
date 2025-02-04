import React from 'react';


const PerformerDetailsModal = ({ performer, onClose }) => {
  // If no performer is selected, don't render anything
  if (!performer) return null;

  // For demo purposes, imagine we have some media (image) to display:
  const sampleMediaUrl =
    'https://via.placeholder.com/600x300.png?text=Sample+Media+Image';

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-30 z-40"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="relative bg-white dark:bg-gray-800 p-6 rounded-md w-full max-w-lg shadow-lg">
          {/* Close Button */}
          <button
            className="absolute top-2 right-2 text-gray-600 dark:text-gray-100 hover:text-gray-800 dark:hover:text-gray-200"
            onClick={onClose}
          >
            ✕
          </button>

          <h2 className="text-xl font-bold mb-2">
            Ratings for {performer.name} (ID: {performer.empId})
          </h2>
          <p className="text-sm mb-4">
            <strong>Designation:</strong> {performer.designation} <br />
            <strong>Department:</strong> {performer.department} <br />
            <strong>Average Rating:</strong> {performer.avgRating} / 5 <br />
            <strong>Month/Year:</strong> {performer.monthYear} <br />
            <strong>Comments:</strong> No comments available
          </p>

          {/* Example "Media" Section */}
          <h3 className="text-base font-semibold mb-2">Media</h3>
          <div className="border rounded-md p-2">
            <img
              src={sampleMediaUrl}
              alt="Sample Media"
              className="w-full h-auto"
            />
            <p className="mt-2 text-sm font-semibold">
              How Human Maximizer is Transforming the Workplace
            </p>
            <button
              className="mt-2 inline-block text-blue-600 hover:underline text-sm"
              onClick={() => alert('Read more clicked!')}
            >
              READ MORE
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PerformerDetailsModal;
