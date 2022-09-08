import * as echarts from 'echarts'
import { useEffect, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import * as recoilState from '../../../recoilState'
import { generatedLineData, generatePieData } from './data'

type EChartsOption = echarts.EChartsOption

const Chart = (props: { dataRender: any; name: string }) => {
  const { dataRender, name } = props
  const chartRef = useRef(null)

  const [searchData] = useRecoilState(recoilState.searchData)

  // const [option, setOption] = useState(null)
  useEffect(() => {
    var chartDom = chartRef.current!
    var myChart = echarts.init(chartDom)

    // setOption(dataRender(searchData))
    let generated
    if (name === 'pie') {
      generated = generatePieData(searchData)
    } else {
      generated = generatedLineData(searchData)
    }
    console.log('generated', generated)
    const option = dataRender(generated)
    option && myChart.setOption(option)

    return () => myChart.clear()
  }, [dataRender, name, searchData])

  return <div ref={chartRef} style={{ height: '400px', width: '25%' }}></div>
}

export default Chart
