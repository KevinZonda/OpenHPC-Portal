import { Typography } from 'antd'
import { Outlet, useNavigate } from 'react-router-dom'

const { Title } = Typography

export const App = () => {
  const navigate = useNavigate()

  return (
    <div style={{ padding: '24px' }}>
      <Title onClick={() => navigate('/')} level={1} style={{ marginTop: 0,  cursor: 'pointer' }}>OpenHPC Portal</Title>
      <Outlet />
    </div>
  )
}
