import { Table } from 'antd'
import React from 'react'
import { useRecoilState } from 'recoil'
import * as recoilState from 'src/recoilState'

const columns = [
  {
    title: 'name',
    dataIndex: 'name',
  },
  {
    title: 'year',
    dataIndex: 'year',
    sorter: {
      compare: (a: any, b: any) => a.year - b.year,
      multiple: 3,
    },
  },
  {
    title: 'score',
    dataIndex: 'score',
    sorter: {
      compare: (a: any, b: any) => a.score - b.score,
      multiple: 2,
    },
  },
]
const data = [
  {
    key: '1',
    name: 'John Brown',
    chinese: 98,
    math: 60,
    english: 70,
  },
  {
    key: '2',
    name: 'Jim Green',
    chinese: 98,
    math: 66,
    english: 89,
  },
  {
    key: '3',
    name: 'Joe Black',
    chinese: 98,
    math: 90,
    english: 70,
  },
  {
    key: '4',
    name: 'Jim Red',
    chinese: 88,
    math: 99,
    english: 89,
  },
]

// const onChange = (pagination, filters, sorter, extra) => {
//   console.log('params', pagination, filters, sorter, extra)
// }

const DataTable = () => {
  const [searchData] = useRecoilState(recoilState.searchData)

  return <Table columns={columns} dataSource={searchData} />
}

export default DataTable
