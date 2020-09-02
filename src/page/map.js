import React from 'react'
import ReactEcharts from 'echarts-for-react/lib/core'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/toolbox'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/grid'
import 'echarts/lib/component/dataZoom'
import styles from './map.module.css'

const getOption = (data) => {
    const symbolSize = 0
    let option = {
        title: { text: title },
        legend: { data: label },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
            // showContent: false
        },
        toolbox: {
            feature: {
                // dataView: { show: true, readOnly: false },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        dataset: {
            dimensions: ['日付', '感染者数', '累積感染者数', '死亡者数', '回復者数', '既存感染者数'],
            source: source
        },
        xAxis: { type: 'time', gridIndex: 0, name: '日付' },
        yAxis: {
            type: 'value'
        },
        dataZoom: [
            {
                // start: 80,
                type: 'inside',
                startValue: start
            },
            {
                type: 'slider',
                startValue: start
            }
        ],
        series: []
    }
    if (label.length > 1) {
        for (let i = 0; i < label.length; i++) {
            option.series.push({
                type: 'line',
                symbolSize: symbolSize,
                encode: {
                    x: '日付',
                    y: label[i]
                },
                name: label[i]
            })
        }
    } else {
        option.series.push({
            type: 'bar',
            encode: {
                x: '日付',
                y: label[0]
            },
            name: label[0]
        })
    }
    return option
}
const MapComponent = (props) => {
    // console.log(props.cumulative)
    return (
        <ReactEcharts
            echarts={echarts}
            option={getOption(props.data)}
            notMerge={true}
            lazyUpdate={true}
            className={styles.trend}
        ></ReactEcharts>
    )
}

export default MapComponent
