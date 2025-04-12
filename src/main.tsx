import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import { Router } from './router.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider theme={{
      token: {
        borderRadius: 0,
      },
    }}>
      <RouterProvider router={Router} />
    </ConfigProvider>
  </StrictMode>,
)
