import * as echarts from 'echarts'

type EChartsOption = echarts.EChartsOption

const chartData: { name: string; option: any }[] = [
  {
    name: 'pie',
    option: (data: any) => ({
      title: {
        text: 'student grade',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    }),
  },
  {
    name: 'bar',
    option: (data: any) => ({
      xAxis: {
        type: 'category',
        data: [2018, 2019, 2020, 2021, 2022],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data,
          type: 'bar',
        },
      ],
    }),
  },
  {
    name: 'line',
    option: (data: any) => ({
      xAxis: {
        type: 'category',
        data: [2018, 2019, 2020, 2021, 2022],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data,
          type: 'line',
        },
      ],
    }),
  },
]

export const generatePieData = (raw: any[]) => {
  let generated = []
  const res = { super: 0, good: 0, passed: 0, failed: 0 }
  const dealer = (val: any) => {
    if (val.score >= 90) {
      res.super += 1
    } else if (val.score >= 70) {
      res.good += 1
    } else if (val.score >= 60) {
      res.passed += 1
    } else {
      res.failed += 1
    }
  }
  raw.forEach(dealer)
  for (const key in res) {
    //@ts-ignore
    generated.push({ name: key, value: res[key] })
  }
  return generated
}

export const generatedLineData = (raw: any) => {
  // let generated = []
  const res = { 2018: 0, 2019: 0, 2020: 0, 2021: 0, 2022: 0 }
  const dealer = (val: any) => {
    switch (val.year) {
      case 2018:
        res[2018] += 1
        break
      case 2019:
        res[2019] += 1
        break
      case 2020:
        res[2020] += 1
        break
      case 2021:
        res[2021] += 1
        break
      case 2022:
        res[2022] += 1
        break
      default:
        break
    }
  }
  raw.forEach(dealer)
  return Object.values(res)
}

export default chartData
