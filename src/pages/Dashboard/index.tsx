import { Layout } from 'antd'
import { useNavigate } from 'react-router-dom'
import Chart from './charts'
import chartData from './charts/data'
import Filter from './filter'
import './style.css'
import DataTable from './table'
import * as ROUTES from '../../routes/constant'
import { useMutation } from '@tanstack/react-query'
import { logoutRequest } from 'src/utils/request'

const { Header, Sider, Content } = Layout

const Dashboard = () => {
  const username = localStorage.getItem('username')
  const navigate = useNavigate()

  const mutation = useMutation(logoutRequest, {
    onSuccess: (res: any) => {
      navigate(ROUTES.LOGIN)
    },
  })

  const logOut = () => {
    mutation.mutate({})
  }

  return (
    <Layout className="layout">
      <Sider className="sider">
        <Filter />
      </Sider>
      <Layout>
        <Header className="header">
          <div>{`welcome,${username}`}</div>
          <div style={{ cursor: 'pointer' }} onClick={logOut}>
            logout
          </div>
        </Header>
        <Content style={{ padding: '20px' }}>
          <div className="content">
            {chartData.map((data) => (
              <Chart
                key={data.name}
                dataRender={data.option}
                name={data.name}
              />
            ))}
          </div>
          <DataTable />
        </Content>
      </Layout>
    </Layout>
  )
}
export default Dashboard
