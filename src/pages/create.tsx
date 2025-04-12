import { Typography, Form, Select, Input, Button, Switch, Card, Space, Spin, message } from "antd"
import { useState } from "react"
import { api } from "../shared"
import { useNavigate } from "react-router-dom"
import { VMReq } from "../api"


const { Title } = Typography

export const CreatePage = () => {
    const [form] = Form.useForm()
    const [enableRds, setEnableRds] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    if (isLoading) {
        return <>
        <Title level={2}>Create VM</Title>
        <div style={{ maxWidth: 600, margin: '0 auto', padding: '24px' }}>
            
            <Space direction="vertical" size="large" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
                <Spin />
            </Space>
        </div>
        </>
    }

    return (
        <>
        <Title level={2}>Create VM</Title>
        <div style={{ maxWidth: 600, margin: '0 auto', padding: '24px' }}>
            
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                
                <Card>
                    <Form 
                        form={form}
                        layout="vertical"
                        requiredMark="optional"
                    >
                        <Form.Item 
                            label="Provider" 
                            name="provider"
                            tooltip="Select your container provider"
                            rules={[{ required: true, message: 'Please select a provider!' }]}
                            initialValue="podman"
                        >
                            <Select>
                                <Select.Option value="docker">Docker</Select.Option>
                                <Select.Option value="podman">Podman</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item 
                            label="Owner" 
                            name="owner"
                            rules={[{ required: true, message: 'Please input the owner name!' }]}
                            tooltip="The owner of this VM instance"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item 
                            label="Project Name" 
                            name="project"
                            tooltip="Name of your project"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item 
                            label="Enable RDS" 
                            name="enableRds"
                            tooltip="RDS is persistent storage for your VM"
                        >
                            <Switch defaultChecked={true} onChange={(checked) => setEnableRds(checked)} />
                        </Form.Item>
                        {enableRds && (
                            <Form.Item 
                                label="RDS Subfolder" 
                                name="rdsFolder"
                                tooltip="Subfolder for RDS"
                            >
                                <Input />
                            </Form.Item>
                        )}
                        
                        <Form.Item>
                            <Button 
                                type="primary" 
                                size="large"
                                block
                                onClick={() => {
                                    form.validateFields().then((values) => {
                                        setIsLoading(true)
                                        const request : VMReq = {
                                            provider: values.provider,
                                            owner: values.owner,
                                            project: values.project,
                                            enableRds: enableRds,
                                            rdsFolder: enableRds ? values.rdsFolder : undefined
                                        }
                                        api.vmRequestPost({
                                            vMReq: request
                                        }).then((res) => {
                                            console.log(res)
                                            setIsLoading(false)
                                            navigate('/created', { 
                                                state: { 
                                                    vmData: res,
                                                    requestData: request 
                                                } 
                                            })
                                        }).catch((err) => {
                                            setIsLoading(false)
                                            message.error(err.message)
                                        })
                                    })
                                }}
                            >
                                Create
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Space>
        </div>

        </>
    )
}