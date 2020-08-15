import React from 'react'
import ReactEcharts from 'echarts-for-react/lib/core'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/grid'
import styles from './style.module.css'

const getOption = (title, label, source) => {
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
                dataView: { show: true, readOnly: false },
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
        series: []
    }
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
    return option
}

const Trend = (props) => {
    // console.log(props.cumulative)
    return (
        <ReactEcharts
            echarts={echarts}
            option={getOption(props.title, props.label, props.cumulative)}
            notMerge={true}
            lazyUpdate={true}
            className={styles.trend}
        ></ReactEcharts>
    )
}

export default Trend
