// holidayService.js
import axios from 'axios';

/**
 * Fetch holidays from your API endpoint.
 * Example response: 
 * {
 *   "success": true,
 *   "data": [
 *     { "id": "679b5bf77fda73758b938f8e", "name": "Testing", "date": "2025-02-05T00:00:00.000Z", "recurring": false }
 *   ]
 * }
 */
export async function getHolidays() {
  // Replace with your real endpoint
  const url = "https://apiv2.humanmaximizer.com/api/v1/superadmin/companysettings/holidays";
  const response = await axios.get(url);
  return response.data; // { success: boolean, data: [...], ... }
}
