import { Context } from 'chartjs-plugin-datalabels'

export const formatChartPercentage: (value: any, context: Context) => any = (
  value,
  ctx
) => {
  let sum = 0
  let dataArr = ctx.chart.data.datasets[0].data
  dataArr.map((data) => {
    if (typeof data !== `number`) return null
    sum += data

    return null
  })
  let percentage = ((value * 100) / sum).toFixed(2) + '%'

  return percentage
}
