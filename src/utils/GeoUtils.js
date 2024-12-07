// src/utils/GeoUtils.js

/**
 * Company's Geolocation Coordinates
 * Replace these with your actual company location coordinates.
 */
export const COMPANY_LOCATION = {
  latitude: 37.7749, // Example: San Francisco Latitude
  longitude: -122.4194, // Example: San Francisco Longitude
};

/**
 * Allowable Radius in Meters
 * Employees must be within this radius to Punch In/Out.
 */
export const ALLOWABLE_RADIUS = 50; // in meters

/**
 * Calculates the distance between two geographic coordinates using the Haversine formula.
 *
 * @param {number} lat1 - Latitude of the first location.
 * @param {number} lon1 - Longitude of the first location.
 * @param {number} lat2 - Latitude of the second location.
 * @param {number} lon2 - Longitude of the second location.
 * @returns {number} - Distance in meters.
 */
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const toRadians = (degree) => (degree * Math.PI) / 180;

  const R = 6371e3; // Earth's radius in meters
  const φ1 = toRadians(lat1);
  const φ2 = toRadians(lat2);
  const Δφ = toRadians(lat2 - lat1);
  const Δλ = toRadians(lon2 - lon1);

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // in meters
  return distance;
};
