import { Button } from 'antd'
import { useEffect, useState } from 'react'
import { atom, useRecoilState } from 'recoil'
import Selector from './selector'
import * as recoilState from '../../../recoilState'
import { useMutation } from '@tanstack/react-query'
import { filterDateRequest } from 'src/utils/request'

const Filter = () => {
  const [school, setSchool] = useState('A')
  const [subject, setSubject] = useState('Maths')
  const [searchData, setSearchData] = useRecoilState(recoilState.searchData)

  const mutation = useMutation(
    // @ts-ignore
    filterDateRequest,
    {
      onSuccess: (res: any) => {
        setSearchData(res?.data)
      },
    }
  )

  useEffect(() => {
    school && subject && mutation.mutate({ school, subject })
  }, [])

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
        onClick={() => mutation.mutate({ school, subject })}
      >
        apply
      </Button>
    </div>
  )
}

export default Filter
