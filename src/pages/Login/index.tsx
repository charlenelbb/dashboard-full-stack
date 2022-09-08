import { useMutation } from '@tanstack/react-query'
import { Button, Checkbox, Form, Input } from 'antd'
import { ValidateErrorEntity } from 'rc-field-form/lib/interface'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import * as ROUTES from '../../routes/constant'
import * as recoilState from '../../recoilState'
import { loginRequest, signupRequest } from 'src/utils/request'
import { useEffect, useState } from 'react'

interface ProfileData {
  username: string
  password: string
}

const Login = () => {
  const { pathname } = useLocation()
  const [profileData, setProfileData] = useRecoilState(recoilState.profileData)
  const navigate = useNavigate()

  const [error, setError] = useState('')

  useEffect(() => {
    setError('')
  }, [pathname])

  const mutation = useMutation<ProfileData>(
    // @ts-ignore
    pathname === ROUTES.LOGIN ? loginRequest : signupRequest,
    {
      onSuccess: (res: any) => {
        setProfileData(res.data)
        navigate(ROUTES.DASHBOARD, { replace: true })
      },
      onError: (res: any) => {
        console.log(res.response.data)
        setError(res.response.data)
      },
    }
  )

  const onFinish = (values: void) => {
    console.log('Success:', values)
    mutation.mutate(values)
  }

  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>
      <Form
        key={pathname}
        style={{ width: '50%' }}
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <div style={{ color: 'red' }}>{error}</div>
          {pathname === ROUTES.LOGIN ? (
            <Link to={ROUTES.SIGNUP}>
              Haven't got account yet? SIGN UP here
            </Link>
          ) : (
            <Link to={ROUTES.LOGIN}>Have got an account? LOG IN here</Link>
          )}
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login
