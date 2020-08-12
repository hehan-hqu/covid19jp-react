import React from 'react'
import ReactEcharts from 'echarts-for-react/lib/core'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/grid'

const getOption = (source) => {
    const symbolSize = 0
    const option = {
        legend: { data: ['感染者数', '重症者数', '死亡者数', '回復者数', '既存感染者数', '検査実施人数'] },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
            // showContent: false
        },
        toolbox: {
            feature: {
                dataView: { show: true, readOnly: false },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        dataset: {
            dimensions: ['日付', '累積感染者数', '重症者数', '死亡者数', '回復者数', '既存感染者数', '検査実施人数'],
            source: source
        },
        xAxis: { type: 'time', gridIndex: 0, name: '日付' },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                type: 'line',
                symbolSize: symbolSize,
                encode: {
                    x: '日付',
                    y: '累積感染者数'
                },
                name: '累積感染者数'
            },
            {
                type: 'line',
                symbolSize: symbolSize,
                encode: {
                    x: '日付',
                    y: '既存感染者数'
                },
                name: '既存感染者数'
            },
            {
                type: 'line',
                symbolSize: symbolSize,
                encode: {
                    x: '日付',
                    y: '重症者数'
                },
                name: '重症者数'
            },
            {
                type: 'line',
                symbolSize: symbolSize,
                encode: {
                    x: '日付',
                    y: '死亡者数'
                },
                name: '死亡者数'
            },
            {
                type: 'line',
                symbolSize: symbolSize,
                encode: {
                    x: '日付',
                    y: '回復者数'
                },
                name: '回復者数'
            }
        ]
    }
    return option
}

const Trend = (props) => {
    // console.log(props.cumulative)
    return (
        <ReactEcharts
            echarts={echarts}
            option={getOption(props.cumulative)}
            notMerge={true}
            lazyUpdate={true}
            // onEvents={onEvents}
            // style={{ width: '50%' }}
        />
    )
}

export default Trend
