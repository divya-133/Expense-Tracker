import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

function CategoryTrendChart({ expenses }) {
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  // Build category => monthly map
  const grouped = {};
  expenses.forEach((e) => {
    const m = new Date(e.date).getMonth();
    if (!grouped[e.category]) grouped[e.category] = new Array(12).fill(0);
    grouped[e.category][m] += e.amount;
  });

  const datasets = Object.entries(grouped).map(([cat, values]) => ({
    label: cat,
    data: values,
    borderColor: "#" + Math.floor(Math.random() * 16777215).toString(16),
    tension: 0.35,
    fill: false
  }));

  const data = { labels: months, datasets };
  const options = { responsive: true };

  return <Line data={data} options={options} />;
}

export default CategoryTrendChart;
