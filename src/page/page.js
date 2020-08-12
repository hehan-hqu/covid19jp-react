import React, { Component } from 'react'
import { getVirusDataOnTime } from '../services/getDate'
import dayjs from 'dayjs'
import styles from './style.module.css'
import Category from '../category/Category'
import Trend from '../trend/Trend'
import { Divider, Skeleton, Select, Row } from 'antd'
// import 'antd/dist/antd.css'
const { Option } = Select

class Page extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            provinceList: [],
            lastUpdated: '',
            cumulativeList: [],
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
            const maplist = prefectures
            let provinceList = []
            provinceList.push('全国')
            maplist.forEach((item) => {
                provinceList.push(item.name_ja)
            })
            let cumulative = [
                [
                    'date',
                    'confirmedCumulative',
                    'activeCumulative',
                    'criticalCumulative',
                    'deceasedCumulative',
                    'recoveredCumulative',
                    'testedCumulative'
                ]
            ]
            dailys.forEach((item) => {
                cumulative.push([
                    item.date,
                    item.confirmedCumulative,
                    item.criticalCumulative,
                    item.deceasedCumulative,
                    item.recoveredCumulative,
                    item.activeCumulative,
                    item.testedCumulative
                ])
            })
            this.setState({
                prefectures: prefectures,
                dailys: dailys,
                lastUpdated: updated,
                provinceList: provinceList,
                cumulativeList: cumulative,
                loading: false
            })
        }
    }
    toProvince = (province) => {
        return
    }
    render() {
        const { dailys, provinceList, loading, cumulativeList } = this.state
        // const columns = [
        //     { title: '地区', dataIndex: 'name', key: 'name' },
        //     { title: '确诊', dataIndex: 'confirmedCount', key: 'confirmedCount' },
        //     { title: '死亡', dataIndex: 'deadCount', key: 'deadCount' },
        //     { title: '治愈', dataIndex: 'curedCount', key: 'curedCount' }
        // ]
        const today = dailys[dailys.length - 1]
        console.log(cumulativeList)
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
                            <Row justify="space-around" gutter={16} className={styles.box}>
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
                            </Row>
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
                            {/* <Divider /> */}
                            <Trend cumulative={cumulativeList} />
                        </div>
                    </div>
                </Skeleton>
            </div>
        )
    }
}

export default Page
