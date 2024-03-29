import * as React from 'react'
import styles from './category.module.css'
import { Col, Statistic } from 'antd'
// import 'antd/dist/antd.css'

const Category = ({ title, count, addcount, rate, color }) => {
    // console.log(rate)
    let str = ''
    if (title === '回復者数') {
        str = '累計感染者数の' + rate.toFixed(1) + '%'
    }
    if (title === '重症者数') {
        str = '既存感染者数の' + rate.toFixed(1) + '%'
    }
    if (title === '死亡者数') {
        str = '累計感染者数の' + rate.toFixed(1) + '%'
    }
    if (title === '回復者数') {
        str = '累計感染者数の' + rate.toFixed(1) + '%'
    }
    if (title === '検査実施人数') {
        str = '検査結果の' + rate.toFixed(1) + '%が陽性'
    }
    return (
        <Col span={4}>
            <div className={styles.item}>
                <Statistic
                    title={<div className={styles.label}>{title}</div>}
                    value={[count, addcount]}
                    valueStyle={{ color: color }}
                    formatter={(value) => {
                        count = value[0]
                        addcount = value[1]
                        return (
                            <div className={styles.data}>
                                <div className={styles.value}>{count}</div>
                                <div className={styles.diff}>
                                    {' ( ' + (addcount >= 0 ? '+' + addcount : addcount) + ' ) '}
                                </div>
                                <div className={styles.description}>
                                    <span>{str}</span>
                                </div>
                            </div>
                        )
                    }}
                ></Statistic>
            </div>
        </Col>
    )
}
export default Category
