import { Typography } from 'antd'
import { Outlet, useNavigate } from 'react-router-dom'

const { Title } = Typography

export const App = () => {
  const navigate = useNavigate()

  return (
    <div style={{ padding: '32px' }}>
      <Title onClick={() => navigate('/')} level={1} style={{ marginTop: '-6px',  cursor: 'pointer' }}>OpenHPC</Title>
      <Outlet />
    </div>
  )
}
