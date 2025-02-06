// Function to get color based on percentage (returns Tailwind background classes)
export const getColorFromPercentage = (percentage) => {
    if (percentage >= 75) return "bg-green-400";
    if (percentage >= 50) return "bg-yellow-400";
    if (percentage >= 25) return "bg-orange-400";
    return "bg-red-400";
  };
  
  // Function to get color based on dropdown value (returns Tailwind background classes)
  export const getColorFromValue = (value) => {
    switch (value) {
      case "Excellent":
      case "Good":
      case "Low":
      case "Yes":
      case "Adequate":
      case "Secure":
      case "Never":
        return "bg-green-300";
      case "Moderate":
      case "Medium":
      case "Somewhat reliant":
      case "Partially":
        return "bg-yellow-300";
      case "Poor":
      case "High":
      case "No":
      case "> 1%":
      case "Inadequate":
      case "Highly reliant":
        return "bg-red-300";
      default:
        return "bg-gray-100";
    }
  };
  
  // Function to calculate overall performance based on mapping
  export const calculatePerformance = (values, mapping) => {
    const numericValues = values.map((value) => mapping[value] || 0);
    const validValues = numericValues.filter((val) => val > 0);
  
    if (validValues.length === 0)
      return { averageColor: "bg-gray-100", averagePercentage: 0 };
  
    const total = validValues.reduce((acc, val) => acc + val, 0);
    const averagePercentage = (total / validValues.length) * 20; // Scale to 100%
  
    return {
      averageColor: getColorFromPercentage(averagePercentage),
      averagePercentage: +averagePercentage.toFixed(2),
    };
  };
  