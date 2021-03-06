import React, { Component } from 'react'
import { getVirusDataOnTime } from '../common/getData'
import dayjs from 'dayjs'
import styles from './page.module.css'
import Category from './category'
import Trend from './trend'
import MapComponent from './map'
import { Divider, Skeleton } from 'antd'
// import 'antd/dist/antd.css'
// const { Option } = Select, Select,Row, Col

class Page extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            lastUpdated: '',
            prefectures: [
                {
                    confirmed: '',
                    dailyConfirmedCount: [],
                    dailyConfirmedStartDate: '',
                    newlyConfirmed: 0,
                    yesterdayConfirmed: 0,
                    dailyDeceasedCount: [],
                    dailyDeceasedStartDate: '',
                    deceased: 0,
                    cruisePassenger: 0,
                    recovered: 0,
                    critical: 0,
                    tested: 0,
                    confirmedByCity: {},
                    newlyDeceased: 0,
                    yesterdayDeceased: 0,
                    name_ja: '',
                    deaths: 0,
                    name: ''
                }
            ],
            dailys: [
                {
                    confirmed: 0,
                    confirmedCumulative: 0,
                    deceased: 0,
                    deceasedCumulative: 0,
                    recovered: 0,
                    recoveredCumulative: 0,
                    critical: 0,
                    criticalCumulative: 0,
                    tested: 0,
                    testedCumulative: 0,
                    active: 0,
                    activeCumulative: 0,
                    cruiseConfirmedCumulative: 0,
                    cruiseDeceasedCumulative: 0,
                    cruiseRecoveredCumulative: 0,
                    cruiseTestedCumulative: 0,
                    cruiseCriticalCumulative: 0,
                    date: '',
                    deaths: 0,
                    confirmedAvg3d: 0,
                    confirmedAvg7d: 0,
                    confirmedCumulativeAvg3d: 0,
                    confirmedCumulativeAvg7d: 0,
                    deceasedAvg3d: 0,
                    deceasedAvg7d: 0,
                    deceasedCumulativeAvg3d: 0,
                    deceasedCumulativeAvg7d: 0,
                    recoveredAvg3d: 0,
                    recoveredAvg7d: 0,
                    recoveredCumulativeAvg3d: 0,
                    recoveredCumulativeAvg7d: 0
                }
            ]
        }
    }
    componentDidMount() {
        this.initDate()
        this.setState({
            // 每隔10分钟获取数据
            timer: setInterval(() => {
                this.initDate()
            }, 1000 * 60 * 10)
        })
    }
    componentWillUnmount() {
        const { timer } = this.state
        clearInterval(timer)
        this.setState({ timer: null })
    }
    initDate = async () => {
        const res = await getVirusDataOnTime()
        if (res.status === 200) {
            // console.log(res)
            const dailys = res.data.daily
            const prefectures = res.data.prefectures
            const updated = res.data.updated

            this.setState({
                prefectures: prefectures,
                dailys: dailys,
                lastUpdated: updated,
                loading: false
            })
        }
        // const japanMapJson = await getJapanJson()
        // if (japanMapJson.status === 200) {
        //     this.setState({ japanMapJson: japanMapJson.data })
        // }
    }
    // toProvince = (province) => {
    //     return
    // }
    render() {
        const { dailys, prefectures, loading } = this.state
        let provinceList = []
        provinceList.push('全国')
        prefectures.forEach((item) => {
            provinceList.push(item.name_ja)
        })
        const cumulativeList = [
            [
                'date',
                'confirmed',
                'confirmedCumulative',
                'activeCumulative',
                'deceasedCumulative',
                'recoveredCumulative'
            ]
        ]
        dailys.forEach((item) => {
            cumulativeList.push([
                item.date,
                item.confirmed,
                item.confirmedCumulative,
                item.deceasedCumulative,
                item.recoveredCumulative,
                item.activeCumulative
            ])
        })
        const today = dailys[dailys.length - 1]
        const startDay = dayjs(new Date(Date.now() - 4 * 30 * 24 * 60 * 60 * 1000)).format('YYYY-MM-DD')
        const activeList = []
        prefectures.forEach((item) => {
            activeList.push({ name: item.name, value: item.active, name_ja: item.name_ja })
        })
        return (
            <div className={styles.page}>
                <Skeleton loading={loading} active paragraph={{ rows: 50 }}>
                    <div>
                        <div className={styles.top}>
                            <p className={styles.title}>新型コロナウイルス (COVID-19) 感染状況追跡</p>
                            <div className={styles.tip} style={{ textAlign: 'right' }}>
                                <span>更新日:{dayjs(today.date).format('YYYY年MM月DD日')}</span>
                            </div>
                        </div>
                        <Divider />
                        <div>
                            <div className={styles.box}>
                                <Category
                                    title={'累積感染者数'}
                                    count={today.confirmedCumulative}
                                    addcount={today.confirmed}
                                    rate={0}
                                    color={'#e57471'}
                                />
                                <Category
                                    title={'既存感染者数'}
                                    count={today.activeCumulative}
                                    addcount={today.active}
                                    rate={(today.criticalCumulative / today.activeCumulative) * 100}
                                    color={'#df0e1f'}
                                />
                                <Category
                                    title={'重症者数'}
                                    count={today.criticalCumulative}
                                    addcount={today.critical}
                                    rate={(today.criticalCumulative / today.activeCumulative) * 1000}
                                    color={'#5d4037'}
                                />
                                <Category
                                    title={'死亡者数'}
                                    count={today.deceasedCumulative}
                                    addcount={today.deceased}
                                    rate={(today.deceasedCumulative / today.confirmedCumulative) * 100}
                                    color={'#919399'}
                                />
                                <Category
                                    title={'回復者数'}
                                    count={today.recoveredCumulative}
                                    addcount={today.recovered}
                                    rate={(today.recoveredCumulative / today.confirmedCumulative) * 100}
                                    color={'#7ebe50'}
                                />
                                <Category
                                    title={'検査実施人数'}
                                    count={today.testedCumulative}
                                    addcount={today.tested}
                                    rate={(today.confirmedCumulative / today.testedCumulative) * 100}
                                    color={'#1876d3'}
                                />
                            </div>

                            {/* </Row> */}
                            {/* <Divider />
                            <div>
                                <p>
                                    都道府県：
                                    <Select defaultValue="全国" style={{ width: 120 }} onChange={this.toProvince}>
                                        {provinceList.map((item, index) => {
                                            return (
                                                <Option value={item} key={index}>
                                                    {item}
                                                </Option>
                                            )
                                        })}
                                    </Select>
                                </p>
                            </div> */}
                            <div className={styles.graph}>
                            {/* <div> */}
                                <Trend
                                    cumulative={cumulativeList}
                                    title={'累計'}
                                    label={['累積感染者数', '既存感染者数', '死亡者数', '回復者数']}
                                    start={startDay}
                                />
                                <Trend
                                    cumulative={cumulativeList}
                                    title={'日别'}
                                    label={['感染者数']}
                                    start={startDay}
                                />
                            </div>
                            <MapComponent data={activeList} />
                        </div>
                    </div>
                </Skeleton>
            </div>
        )
    }
}

export default Page
