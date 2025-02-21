
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
  import ChartDataLabels from 'chartjs-plugin-datalabels';
  import { Chart } from 'react-chartjs-2';
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
    LineElement,
    ChartDataLabels
  );
  