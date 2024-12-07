import { useState } from "react";

const questions = [
  "Business operates in a well-established, stable industry",
  "The industry / market is growing",
  "Business likely to be negatively influenced by industry restructuring",
  "Business likely to be influenced by negative global trends",
  "Future industry trends will positively affect the business",
];

// Mapping value to color based on exact value
const getColorFromValue = (value) => {
  switch (value) {
    case "1":
      return "green";
    case "2":
      return "yellow";
    case "3":
      return "red";
    case "4":
      return "red";
    case "5":
      return "red";
    default:
      return "white";
  }
};

const getColorFromAverage = (averageValue) => {
  if (averageValue >= 4) {
    return "red";
  } else if (averageValue >= 3) {
    return "red";
  } else if (averageValue >= 2) {
    return "yellow";
  } else if (averageValue >= 1) {
    return "green";
  } else {
    return "white";
  }
};

const calculateAveragePerformance = (values) => {
  const numericValues = values.map(Number);
  const validValues = numericValues.filter((val) => val > 0); // Ignore 0 (blank)

  if (validValues.length === 0)
    return { averageColor: "white", averagePercentage: 0 };

  const total = validValues.reduce((acc, val) => acc + val, 0);
  const averageValue = total / validValues.length;

  // Convert average value (1-5) to a percentage out of 100
  const averagePercentage = ((6 - averageValue) / 5) * 100;

  // Get color from average value
  const averageColor = getColorFromAverage(averageValue);

  return { averageColor, averagePercentage: averagePercentage.toFixed(2) }; // 2 decimal precision
};

const RACI2 = () => {
  const [values, setValues] = useState(Array(questions.length).fill("0"));

  const handleDropdownChange = (index, event) => {
    const newValues = [...values];
    newValues[index] = event.target.value;
    setValues(newValues);
  };

  // Calculate average performance for "Industry"
  const { averageColor, averagePercentage } =
    calculateAveragePerformance(values);

  return (
    <div className="main">
      <div className="ems-content">
        <div className="container">
          <div className="hm-rzr-spr-admin-RACI2 container">
            <h1>Industry Performance Assessment</h1>

            <table>
              <thead>
                <tr>
                  <th>Question</th>
                  <th>Response</th>
                  <th>Performance Review</th>
                </tr>
              </thead>
              <tbody>
                {questions.map((question, index) => {
                  const value = values[index];
                  const color = getColorFromValue(value);
                  return (
                    <tr key={index}>
                      <td>{question}</td>
                      <td>
                        <select
                          value={value}
                          onChange={(event) => handleDropdownChange(index, event)}
                        >
                          <option value="0">Blank</option>
                          <option value="1">Definitely</option>
                          <option value="2">Probably</option>
                          <option value="3">No - Will change slightly</option>
                          <option value="4">No - Will change moderately</option>
                          <option value="5">
                            No - Will change significantly
                          </option>
                        </select>
                      </td>
                      <td style={{ backgroundColor: color }}>
                        {value === "0" ? "No response" : value}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <h2>Key Performance Metrics</h2>
            <table>
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>Performance Color</th>
                  <th>Performance Percentage</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Industry</td>
                  <td style={{ backgroundColor: averageColor }}>
                    {averageColor}
                  </td>
                  <td>{averagePercentage}%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RACI2;
