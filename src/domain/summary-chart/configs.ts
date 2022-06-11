import { ChartOptions } from 'chart.js'
import { formatChartPercentage } from 'utils/format-chart-percentage'

export const SummaryPieConfig: ChartOptions = {
  plugins: {
    legend: {
      display: false,
    },
    datalabels: {
      formatter: formatChartPercentage,
      color: '#fff',
      font: {
        weight: 'bold',
        size: 16,
        family: 'Poppins',
      },
    },
  },
}
