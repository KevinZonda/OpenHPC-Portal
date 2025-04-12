import { Form, Input, Button, Typography } from 'antd'
import { useState } from 'react'
import { getApiUrl, getApiKey, initApi } from '../shared'
const { Title } = Typography

export const SettingsPage = () => {
    const [apiUrl, setApiUrl] = useState(getApiUrl())
    const [apiKey, setApiKey] = useState(getApiKey())
    const onFinish = (values: {apiUrl: string, apiKey: string}) => {
        localStorage.setItem('apiUrl', values.apiUrl)
        localStorage.setItem('apiKey', values.apiKey)
        initApi(values.apiUrl, values.apiKey)
    }
    return <div>
        <Title level={2}>Settings</Title>
        <Form layout="vertical" onFinish={onFinish}>
            <Form.Item label="API URL" name="apiUrl" initialValue={apiUrl}>
                <Input value={apiUrl} onChange={(e) => setApiUrl(e.target.value)} />
            </Form.Item>
            <Form.Item label="API Key" name="apiKey" initialValue={apiKey}>
                <Input value={apiKey} onChange={(e)  => setApiKey(e.target.value)} />
            </Form.Item>
        </Form>
        <Button type="primary" onClick={() => {
            onFinish({apiUrl, apiKey})
        }}>Save</Button>
    </div>
}