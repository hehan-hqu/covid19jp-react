import React, { useState, useEffect } from 'react'
// import { Component } from 'react'
import ReactEcharts from 'echarts-for-react/lib/core'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/map'
import 'echarts/lib/component/visualMap'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
// import 'echarts/lib/component/legend'
import styles from './map.module.css'
import { getJapanJson } from '../common/getData'

let japanMapJson = require('./Japan.json')

// async function initMap() {
//     const japanMapJson = await getJapanJson()
//     // console.log(japanMapJson)
//     echarts.registerMap('japan', japanMapJson.data)
// }
function MapComponent(props) {
    // const [activeList, setActiveList] = useState(props.data)
    const activeList = props.data
    echarts.registerMap('japan', japanMapJson)
    const getOption = () => {
        let option = {
            title: { text: '感染マップ' },
            toolbox: {
                feature: {
                    // dataView: { show: true, readOnly: false },
                    restore: { show: true }
                }
            },
            tooltip: {
                show: true,
                formatter: function (params) {
                    let tip = ''
                    if (params.data) {
                        tip = params.data.name_ja + '：<br>現在感染者数：' + params.data['value'] + '<br>'
                    }
                    return tip
                }
            },
            visualMap: {
                show: true,
                type: 'piecewise',
                min: 0,
                max: 2000,
                align: 'right',
                top: '2%',
                right: 0,
                left: 'center',
                inRange: {
                    color: ['#ffc0b1', '#ff8c71', '#ef1717', '#9c0505']
                },
                pieces: [
                    { min: 1000 },
                    { min: 500, max: 999 },
                    { min: 100, max: 499 },
                    { min: 1, max: 99 }
                    // { min: 10, max: 99 },
                ],
                orient: 'horizontal',
                showLabel: true,
                padding: 5,
                text: ['高', '低'],
                itemWidth: 10,
                itemHeight: 10,
                textStyle: {
                    fontSize: 12
                }
            },
            series: [
                {
                    // left: 'center',
                    type: 'map',
                    map: 'japan',
                    // name: '現在感染者数',
                    // silent: province ? true : false,
                    label: {
                        show: false,
                        position: 'inside',
                        fontSize: 6,
                        formatter: (params) => {
                            return params.data.name_ja
                        }
                    },
                    data: activeList,
                    zoom: 1.5,
                    center: [139.54, 39.55],
                    roam: true,
                    showLegendSymbol: false,
                    rippleEffect: {
                        show: true,
                        brushType: 'stroke',
                        scale: 2.5,
                        period: 4
                    }
                }
            ]
        }
        return option
    }
    return (
        <ReactEcharts
            className={styles.map}
            // style={{ height: '400px' }}
            echarts={echarts}
            option={getOption()}
            notMerge={true}
            lazyUpdate={true}
        />
    )
}

// class MapComponent extends Component {
//     // constructor(props) {
//     //     super(props)
//     // }
//     async componentDidMount() {
//         console.log('装载....')
//         const japanMapJson = await getJapanJson()
//         echarts.registerMap('japan', japanMapJson.data)
//     }
//     componentWillUnmount() {
//         console.log('卸载....')
//     }
//     render() {
//         return (
//             <ReactEcharts
//                 style={{ height: '400px' }}
//                 echarts={echarts}
//                 option={getOption()}
//                 notMerge={true}
//                 lazyUpdate={true}
//             />
//         )
//     }
// }

export default MapComponent
