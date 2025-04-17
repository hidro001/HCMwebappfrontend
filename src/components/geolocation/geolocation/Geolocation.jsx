import React, { useEffect, useState } from "react";
const baseUrl=import.meta.env.VITE_API_BASE_URL


function AllWorkersEmbeddedMap() {
  const [employeesData, setEmployeesData] = useState({});
  const [addresses, setAddresses] = useState({});

  // Reverse geocode using OpenStreetMap Nominatim
  const getAddressFromCoords = async (lat, lon, employee_Id) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );
      const data = await response.json();
      if (data && data.display_name) {
        setAddresses((prev) => ({
          ...prev,
          [employee_Id]: data.display_name,
        }));
      }
    } catch (err) {
      console.error("Error fetching address:", err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const url = `${baseUrl}/api/v1/geolocation/subscribe-all?accessToken=${token}&employee_Id=all`;
    const source = new EventSource(url);

    source.onmessage = (event) => {
      try {
        const parsedData = JSON.parse(event.data);
        if (parsedData?.success && parsedData.data) {
          const empDoc = parsedData.data;
          const { employee_Id, latestLocation } = empDoc;

          // Save employee data
          setEmployeesData((prev) => ({
            ...prev,
            [employee_Id]: empDoc,
          }));

          // Fetch address only if new coordinates are available
          if (
            latestLocation?.coordinates &&
            !addresses[employee_Id]
          ) {
            const [lng, lat] = latestLocation.coordinates;
            getAddressFromCoords(lat, lng, employee_Id);
          }
        }
      } catch (err) {
        console.error("Error parsing SSE data:", err);
      }
    };

    source.onerror = (err) => {
      console.error("SSE connection error:", err);
    };

    return () => {
      source.close();
    };
  }, [addresses]);

  const employeesArray = Object.values(employeesData);

  return (
    <div className="p-4 min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <h2 className="text-xl font-semibold mb-4">
        All Workers' Real-Time Locations (Google Map Embeds + Address)
      </h2>

      {employeesArray.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No data yet...
        </p>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {employeesArray.map((emp) => {
            const {
              employee_Id,
              first_Name,
              last_Name,
              latestLocation,
            } = emp;

            if (!latestLocation?.coordinates) {
              return (
                <div
                  key={employee_Id}
                  className="border rounded shadow bg-white dark:bg-gray-800 p-4"
                >
                  <h3 className="text-md font-bold mb-1">
                    {first_Name} {last_Name} (ID: {employee_Id})
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    No coordinates yet.
                  </p>
                </div>
              );
            }

            const [lng, lat] = latestLocation.coordinates;
            const mapUrl = `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
            const address = addresses[employee_Id];

            return (
              <div
                key={employee_Id}
                className="border rounded shadow bg-white dark:bg-gray-800 p-4"
              >
                <h3 className="text-md font-bold mb-2">
                  {first_Name} {last_Name} (ID: {employee_Id})
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                  <strong>Coordinates:</strong> {lat}, {lng}
                </p>
                {address ? (
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    <strong>Address:</strong> {address}
                  </p>
                ) : (
                  <p className="text-sm italic text-gray-500 dark:text-gray-400 mb-2">
                    Loading address...
                  </p>
                )}
                <div className="w-full h-48">
                  <iframe
                    title={`map-employee-${employee_Id}`}
                    src={mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default AllWorkersEmbeddedMap;
