import { Form, Input, Button, Typography, InputNumber } from 'antd'
import { useState } from 'react'
import { getApiUrl, getApiKey, initApi, getMetricsFreshTime, getHTTPEntry, getSSHEntry } from '../shared'
const { Title } = Typography

export const SettingsPage = () => {
    const [apiUrl, setApiUrl] = useState(getApiUrl())
    const [apiKey, setApiKey] = useState(getApiKey())
    const [metricsFreshTime, setMetricsFreshTime] = useState(getMetricsFreshTime())
    const [httpEntry, setHttpEntry] = useState(getHTTPEntry())
    const [sshEntry, setSshEntry] = useState(getSSHEntry())
    const onFinish = (values: {apiUrl: string, apiKey: string, metricsFreshTime: number, httpEntry: string, sshEntry: string}) => {
        localStorage.setItem('apiUrl', values.apiUrl)
        localStorage.setItem('apiKey', values.apiKey)
        localStorage.setItem('metricsFreshTime', values.metricsFreshTime.toString())
        localStorage.setItem('httpEntry', values.httpEntry)
        localStorage.setItem('sshEntry', values.sshEntry)
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
            <Form.Item label="Metrics Refresh Time" name="metricsFreshTime" initialValue={getMetricsFreshTime()}>
                <InputNumber min={500} max={10000} defaultValue={getMetricsFreshTime()} onChange={(value) => {
                    setMetricsFreshTime(value || 1000)
                }} />
            </Form.Item>
            <Form.Item label="VM HTTP Entry" name="httpEntry" initialValue={httpEntry}>
                <Input value={httpEntry} onChange={(e) => setHttpEntry(e.target.value)} />
            </Form.Item>
            <Form.Item label="VM SSH Entry" name="sshEntry" initialValue={sshEntry}>
                <Input value={sshEntry} onChange={(e) => setSshEntry(e.target.value)} />
            </Form.Item>
        </Form>
        <Button type="primary" onClick={() => {
            onFinish({apiUrl, apiKey, metricsFreshTime, httpEntry, sshEntry})
        }}>Save</Button>
    </div>
}