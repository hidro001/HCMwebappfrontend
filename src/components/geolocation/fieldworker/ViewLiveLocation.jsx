import React, { useEffect, useState, useMemo } from 'react';
const baseUrl=import.meta.env.VITE_API_BASE_URL


const LocationTracker = ({ onClose, fieldworker }) => {
  const [error, setError] = useState(null);
  const [lat, setLat] = useState(fieldworker?.defaultLat || 0);
  const [lng, setLng] = useState(fieldworker?.defaultLng || 0);

  const fullName = fieldworker ? `${fieldworker.first_Name} ${fieldworker.last_Name}` : '';
  const avatarUrl = fieldworker ? fieldworker.user_Avatar : '';

  // Rebuild the Google Maps embed URL when lat or lng changes.
  // Using useMemo ensures that the URL is recomputed only when lat or lng change.
  const mapUrl = useMemo(() => `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`, [lat, lng]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const employeeId = fieldworker?.employee_Id;

    if (!token || !employeeId) {
      setError("Missing token or fieldworker information.");
      return;
    }
    const deviceType = "web";
    // Pass the token and employeeId via query parameters
    const url = `${baseUrl}/api/v1/geolocation/subscribe?accessToken=${token}&empId=${employeeId}&device_type=${deviceType}`;
    const eventSource = new EventSource(url);

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('Updated Location:', data);
        if (data.data && data.data.employee_Id === employeeId) {
          // Assuming coordinates are provided as [longitude, latitude]
          if (Array.isArray(data.data.latestLocation.coordinates)) {
            const [newLng, newLat] = data.data.latestLocation.coordinates;
            setLat(newLat);
            setLng(newLng);
          }
        }
      } catch (parseError) {
        console.error("Error parsing SSE data", parseError);
      }
    };

    eventSource.onerror = (error) => {
      console.error('Error with SSE:', error);
      setError("There was an error receiving updates. Please try reloading.");
      eventSource.close();
      if (onClose) onClose();
    };

    return () => {
      eventSource.close();
      if (onClose) onClose();
    };
  }, [fieldworker, onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full h-full md:w-[90%] md:h-[90%] bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition z-10"
        >
          Close
        </button>

        <div className="absolute top-4 left-4 z-10 flex items-center p-2 bg-opacity-50 bg-gray-800 rounded-lg">
          <img
            src={avatarUrl}
            alt="Profile"
            className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-gray-800 shadow"
          />
          <span className="ml-2 font-semibold">{fullName}</span>
        </div>

        <div className="flex-1">
          {/* Using a key prop based on lat and lng forces the iframe to reload when they change */}
          <iframe
            key={`${lat}-${lng}`}
            src={mapUrl}
            style={{ width: '100%', height: '100%', border: 'none' }}
            title="Live Location"
            className="w-full h-full"
          ></iframe>
        </div>

        {error && (
          <div className="absolute bottom-4 left-4 z-10 text-red-500">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationTracker;
