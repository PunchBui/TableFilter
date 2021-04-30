import { useState, useCallback, useEffect } from 'react'
import debounce from 'lodash.debounce'
import useAxios from 'axios-hooks'
import { Table, Input } from 'antd'

import { isPrime, isFibonacci } from './utils'

const App = () => {
  const base = 'con'
  const ENDPOINT = 'https://api.publicapis.org/categories'
  const columns = [
    {
      title: 'Categories',
      dataIndex: 'categories',
      key: 'categories',
    },
  ]
  const [{ data, loading, errors }] = useAxios(ENDPOINT)
  const [search, setSearch] = useState('')

  const filter = (_data) => _data?.filter((item) => item.includes(search))
  const dataSource = filter(data)?.map((item, index) => ({
    key: index,
    categories: item,
  }))

  const onChange = (e) => {
    const value = e.target.value
    setSearch(value)
  }

  return (
    <div className={base}>
      <Input value={search} onChange={onChange} allowClear/>
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        pagination={false}
      />
    </div>
  )
}

export default App
