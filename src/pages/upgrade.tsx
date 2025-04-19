import { Typography, Form, Select, Input, Button, Switch, Card, Space, Spin, message, Slider } from "antd"
import { useState } from "react"
import { api } from "../shared"
import { useLocation, useNavigate } from "react-router-dom"
import { VMUpgradeReq } from "../api"


const { Title } = Typography

export const UpgradePage = () => {
    const [form] = Form.useForm()
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()

    const { provider, item } = location.state || {}

    if (isLoading) {
        return <>
        <Title level={2}>Upgrade VM</Title>
        <div style={{ maxWidth: 600, margin: '0 auto', padding: '24px' }}>
            
            <Space direction="vertical" size="large" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
                <Spin />
            </Space>
        </div>
        </>
    }

    return (
        <>
        <Title level={2}>Upgrade VM</Title>
        <div style={{ maxWidth: 600, margin: '0 auto', paddingTop: '24px' }}>
            
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
                            initialValue={provider}
                        >
                            <Select disabled={true}>
                                <Select.Option value="docker">Docker</Select.Option>
                                <Select.Option value="podman">Podman</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item 
                            label="Service Tag" 
                            name="svcTag"
                            tooltip="Service Tag of your VM"
                            rules={[{ required: true }]}
                            initialValue={item.svcTag}
                        >
                            <Input disabled={true} />
                        </Form.Item>

                        <Form.Item 
                            label="Image" 
                            name="image"
                            tooltip="Select your container image"
                            rules={[{ required: true, message: 'Please select a image!' }]}
                            initialValue={item.image}
                        >
                            <Select disabled={true}>
                                <Select.Option value="kevinzonda/notebook-iso">Jupyter Notebook with Isolation Environment</Select.Option>
                                <Select.Option value="kevinzonda/notebook">Jupyter Notebook (Stable)</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item 
                            label="Owner" 
                            name="owner"
                            rules={[{ required: true, message: 'Please input the owner name!' }]}
                            tooltip="The owner of this VM instance"
                            initialValue={item.owner}
                        >
                            <Input disabled={true} />
                        </Form.Item>
                        <Form.Item 
                            label="Project Name" 
                            name="project"
                            tooltip="Name of your project"
                            initialValue={item.project}
                        >
                            <Input disabled={true} />
                        </Form.Item>

                        <Form.Item
                            label="GPU" 
                            name="gpu"
                            tooltip="GPU for your VM"
                            initialValue={false}
                        >
                            <Switch />
                        </Form.Item>

                        <Form.Item 
                            label="Shared Memory (shm)" 
                            name="shm"
                            tooltip="Shared memory for your VM. Usually 8GB is enough for middle size projects. If you work with videos or large models, you can increase it up to 64GB."
                            initialValue={8192}
                        >
                            <Slider
                                min={64}
                                max={65536}
                                step={null}
                                marks={{
                                    64: '64MB',
                                    128: '128MB',
                                    256: '256MB',
                                    512: '512MB',
                                    1024: '1GB',
                                    2048: '2GB',
                                    4096: '4GB',
                                    8192: '8GB',
                                    12288: '12GB',
                                    16384: '16GB',
                                    24576: '24GB',
                                    32768: '32GB',
                                    49152: '48GB',
                                    65536: '64GB'
                                }}
                                tooltip={{
                                    formatter: (value) => {
                                        if (!value) return '0MB'
                                        return value >= 1024 ? `${value / 1024}GB` : `${value}MB`
                                    }
                                }}
                            />
                        </Form.Item>
                        <Form.Item 
                            label="Enable RDS" 
                            name="enableRds"
                            tooltip="RDS is persistent storage for your VM"
                        >
                            <Switch defaultChecked={item.mount.length > 0} disabled={true}/>
                        </Form.Item>
                        {item.mount.length > 0 && (
                            <Form.Item 
                                label="RDS Subfolder" 
                                name="rdsFolder"
                                tooltip="Subfolder for RDS"
                                initialValue={item.mount[0].host}
                            >
                                <Input disabled={true} />
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
                                        const request : VMUpgradeReq = {
                                            provider: values.provider,
                                            id: item.cid,
                                            shm: values.shm,
                                            gpu: values.gpu
                                        }
                                        api.vmUpgradePost({
                                            vMUpgradeReq: request
                                        }).then((res) => {
                                            console.log(res)
                                            setIsLoading(false)
                                            navigate('/created', { 
                                                state: { 
                                                    vmData: res,
                                                    requestData: request,
                                                    isUpgrade: true
                                                } 
                                            })
                                        }).catch((err) => {
                                            setIsLoading(false)
                                            message.error(err.message)
                                        })
                                    })
                                }}
                            >
                                Upgrade
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Space>
        </div>

        </>
    )
}