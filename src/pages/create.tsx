import { Typography, Form, Select, Input, Button, Switch, Card, Space, Spin, message, Slider } from "antd"
import { useState } from "react"
import { api } from "../shared"
import { useNavigate } from "react-router-dom"
import { VMReq } from "../api"
import useSWR from "swr"


const { Title } = Typography

export const CreatePage = () => {
    const [form] = Form.useForm()
    const [enableRds, setEnableRds] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [enableGpu, setEnableGpu] = useState(false)
    const [enableAllGpu, setEnableAllGpu] = useState(true)
    const navigate = useNavigate()
    const {data: hpcCfg, isLoading: isCfgLoading} = useSWR('/api/vm/request/avail', async () => {
        return await api.vmRequestAvailGet()
    })

    if (isLoading || isCfgLoading) {
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
                            initialValue={hpcCfg?.providers[0]}
                        >
                            <Select>
                                {hpcCfg?.providers.map((prov) => (
                                    <Select.Option value={prov}>{prov}</Select.Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item 
                            label="Image" 
                            name="image"
                            tooltip="Select your container image"
                            rules={[{ required: true, message: 'Please select a image!' }]}
                            initialValue={hpcCfg?.images[0].image}
                        >
                            <Select>
                                {hpcCfg?.images.map((img) => (
                                    <Select.Option value={img.image}>{img.displayName}</Select.Option>
                                ))}
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
                            label="GPU" 
                            name="gpu"
                            tooltip="GPU for your VM"
                            initialValue={enableGpu}
                            style={{ display: 'inline-block', width: 'calc(50% - 8px)', marginRight: '16px' }}
                        >
                            <Switch onChange={(checked) => setEnableGpu(checked)} />
                        </Form.Item>

                        { enableGpu &&
                            <Form.Item
                                label="All GPUs" 
                                name="allGpu"
                                tooltip="GPU for your VM"
                                initialValue={enableAllGpu}
                                style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                            >
                                <Switch onChange={(checked) => setEnableAllGpu(checked)} />
                            </Form.Item>
                        }

                        {enableGpu && !enableAllGpu && (
                            <Form.Item
                                label="GPU" 
                                name="gpuSelection"
                                tooltip="Select GPUs for your VM"
                                dependencies={['gpu']}
                            >
                                <Select
                                    mode="multiple"
                                    disabled={!enableGpu}
                                    placeholder="Select GPUs"
                                    style={{ width: '100%' }}
                                >
                                    {hpcCfg?.gpus.map((gpu) => (
                                        <Select.Option key={gpu.gpuId} value={gpu.gpuId}>
                                            {gpu.gpuId} - {gpu.displayName}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        )}
                        

                        <Form.Item 
                            label="Max Memory" 
                            name="maxMem"
                            tooltip="Max memory for your VM. 0 for no limit."
                            initialValue={0}
                        >
                            <Slider
                                min={0}
                                max={96}
                                step={null}
                                marks={{
                                    0: 'Unlimited',
                                    2: '2GB',
                                    4: '4GB',
                                    8: '8GB',
                                    16: '16GB',
                                    32: '32GB',
                                    48: '48GB',
                                    64: '64GB',
                                    80: '80GB',
                                    96: '96GB',
                                }}
                                tooltip={{
                                    formatter: (value) => {
                                        return value && value !== 0 ? `${value}GB` : 'Unlimited'
                                    }
                                }}
                            />
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
                            <Switch defaultChecked={enableRds} onChange={(checked) => setEnableRds(checked)} />
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
                                            image: values.image,
                                            gpu: values.gpu,
                                            maxMem: values.maxMem * 1024,
                                            enableRds: enableRds,
                                            rdsFolder: enableRds ? values.rdsFolder : undefined,
                                            shm: values.shm
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