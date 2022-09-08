import { Select } from 'antd'
const { Option } = Select

interface TOption {
  label: string
  value: string
}

interface TProps {
  options: TOption[]
  value: string
  onChange: (value: string) => void
}

const Selector = (props: TProps) => {
  const { options, value, onChange } = props

  return (
    <div style={{ marginBottom: '30px' }}>
      <Select
        defaultValue={options[0].value}
        style={{
          width: '100%',
        }}
        onChange={onChange}
        size="large"
        value={value}
      >
        {options.map((option) => (
          <Option value={option.value}>{option.label}</Option>
        ))}
      </Select>
    </div>
  )
}

export default Selector
