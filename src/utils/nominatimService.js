// nominatimService.js (you can place this in a separate file or inline)

export async function getAddressFromNominatim(lat, lon) {
    try {
      // Construct the URL with lat, lon, and output format
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=jsonv2`;
  
      // Make a fetch request
      const response = await fetch(url, {
        headers: {
          // Nominatim requires a custom User-Agent
          'User-Agent': 'my-mern-app/1.0',
        },
      });
      if (!response.ok) {
        throw new Error(`Nominatim error: ${response.statusText}`);
      }
  
      const data = await response.json();
      // Nominatim returns an address in the "display_name" field
      return data.display_name || 'No address found';
    } catch (err) {
      console.error('Error fetching address from Nominatim:', err);
      return 'Error fetching address';
    }
  }
  