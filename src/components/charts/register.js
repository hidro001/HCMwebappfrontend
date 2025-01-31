// // src/charts/register.js
// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     PointElement,   
//     BarElement,
//     Title,
//     Tooltip,
//     Legend,
//     ArcElement,
    
//   } from 'chart.js';
  
//   // Register Chart.js components for a bar chart
//   ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend,ArcElement,PointElement);
  

// src/charts/register.js
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    // This is crucial for a line chart
    LineElement,
  } from 'chart.js';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    // Register LineElement so that "line" is recognized
    LineElement
  );
  