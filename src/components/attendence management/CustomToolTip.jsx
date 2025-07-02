
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;

    return (
      <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg">
        <h3 className="font-semibold mb-2">{label}</h3>
        <p>Productivity Time: <strong>{data.Productivity} mins</strong></p>
        <p>Unproductivity Time: <strong>{data.Unproductivity} mins</strong></p>
        <p>Break Time: <strong>{data.BreakTime} mins</strong></p>
        {data.websites && data.websites.length > 0 && (
          <div className="mt-2">
            <p className="font-semibold">Websites:</p>
            {data.websites.map((site, index) => (
              <div key={index}>
                {site.url} - {site.percentage}% ({site.minutes}m)
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
