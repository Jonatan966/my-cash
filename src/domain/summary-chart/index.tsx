import { Pie } from 'react-chartjs-2'
import ChartDatalabelsPlugin from 'chartjs-plugin-datalabels'

import { Summary } from 'interfaces/summary'
import { SummaryPieConfig } from './configs'

interface SummaryChartProps {
  summaries: Summary[]
}

export function SummaryChart({ summaries }: SummaryChartProps) {
  return (
    <Pie
      plugins={[ChartDatalabelsPlugin] as any}
      options={SummaryPieConfig}
      data={{
        labels: summaries.map(({ category }) => category),
        datasets: [
          {
            data: summaries.map(({ amount }) => amount),
            backgroundColor: summaries.map(({ color }) => color),
            borderWidth: 0,
          },
        ],
      }}
    />
  )
}
