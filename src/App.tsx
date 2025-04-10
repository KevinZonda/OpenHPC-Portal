import { ListPage } from "./pages/list"
import { Typography } from 'antd'

const { Title } = Typography

function App() {
  return (
    <div style={{ padding: '24px' }}>
      <Title level={1} style={{ marginTop: 0 }}>OpenHPC Portal</Title>
      <ListPage />
    </div>
  )
}

export default App
