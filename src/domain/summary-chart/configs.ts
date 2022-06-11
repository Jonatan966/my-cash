import { ChartOptions } from "chart.js";
import { formatChartPercentage } from "utils/chart";

export const SummaryPieConfig: ChartOptions = {
  plugins: {
    legend: {
      display: false,
    },
    datalabels: {
      formatter: formatChartPercentage,
      color: "#fff",
      font: {
        weight: "bold",
        size: 16,
        family: "Poppins",
      },
    },
  },
};
