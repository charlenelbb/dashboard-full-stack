import { Button } from 'antd'
import { useState } from 'react'
import { useRecoilState } from 'recoil'
import Selector from './selector'
import * as recoilState from '../../../recoilState'
import { useQuery } from '@tanstack/react-query'
import { filterDateRequest } from 'src/utils/request'

const Filter = () => {
  const [school, setSchool] = useState('A')
  const [subject, setSubject] = useState('Maths')
  const [searchData, setSearchData] = useRecoilState(recoilState.searchData)

  const { refetch } = useQuery(
    ['fetchData'],
    () => filterDateRequest({ school, subject }),
    {
      onSuccess: (res: any) => {
        setSearchData(res.data)
      },
    }
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: '20px' }}>
      school:
      <Selector
        options={[
          { label: 'A', value: 'A' },
          { label: 'B', value: 'B' },
          { label: 'C', value: 'C' },
        ]}
        value={school}
        onChange={setSchool}
      />
      subject:
      <Selector
        options={[
          { label: 'Maths', value: 'Maths' },
          { label: 'English', value: 'English' },
          { label: 'Physics', value: 'Physics' },
        ]}
        value={subject}
        onChange={setSubject}
      />
      <Button
        type="default"
        style={{ alignSelf: 'flex-end' }}
        // @ts-ignore
        onClick={refetch}
      >
        apply
      </Button>
    </div>
  )
}

export default Filter
