import { Card, Descriptions, Button, Result } from "antd"
import { useLocation, useNavigate } from "react-router-dom"
import { VMReq, VMCreatedInfo } from "../api"
import { useState } from "react"

export const CreatedPage = () => {
    const location = useLocation()
    const { vmData, requestData } = location.state || {}
    const req : VMReq = requestData
    const resp : VMCreatedInfo = vmData
    const navigate = useNavigate()
    const [showDetails, setShowDetails] = useState(false)

    return (
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '24px' }}>
            <Result
                status="success"
                title="VM Created Successfully"
                subTitle="Your VM is ready to use. You can access it via the Jupyter Notebook or SSH."
                extra={[
                    <>
                        <Card>
                                <Descriptions column={1}>
                                <Descriptions.Item label="Service Tag">{resp?.svcTag}</Descriptions.Item>
                                <Descriptions.Item label="Jupyter HTTP">{resp?.http}</Descriptions.Item>
                                <Descriptions.Item label="SSH">{resp?.ssh}</Descriptions.Item>
                                <Descriptions.Item label="Token/Password">{resp?.token}</Descriptions.Item>
                                <Descriptions.Item label="RDS Mount">{resp?.rdsAt}</Descriptions.Item>
                            </Descriptions>
                        </Card><br/>
                        <Button type="primary" key="jupyter" onClick={() => {
                            window.open(resp?.http, '_blank')
                        }}>
                            Go to Jupyter Notebook
                        </Button>
                        <Button key="console" onClick={() => {
                            navigate('/')
                        }}>
                            Back to Console
                        </Button>
                        <br/>
                        <Button style={{ marginTop: '10px' }} type="text" onClick={() => setShowDetails(!showDetails)}>Show Details</Button>
                    </>
                ]}
            />

            {
                showDetails && (
                    <>
                        <Card title="VM Service Details">
                            <Descriptions column={1}>
                            <Descriptions.Item label="CID">{resp?.cid}</Descriptions.Item>
                            <Descriptions.Item label="Service Tag">{resp?.svcTag}</Descriptions.Item>
                            <Descriptions.Item label="Short Code (SC)">{resp?.sc}</Descriptions.Item>
                            </Descriptions>
                        </Card>
                        <br/>
                        <Card title="VM Request Details">
                            <Descriptions column={1}>
                                <Descriptions.Item label="Provider">{req?.provider}</Descriptions.Item>
                                <Descriptions.Item label="Owner">{req?.owner}</Descriptions.Item>
                                <Descriptions.Item label="Project">{req?.project}</Descriptions.Item>
                                <Descriptions.Item label="RDS Enabled">{req?.enableRds ? 'Yes' : 'No'}</Descriptions.Item>
                                {req?.enableRds && (
                                    <Descriptions.Item label="RDS Folder">{req?.rdsFolder}</Descriptions.Item>
                                )}
                            </Descriptions>
                        </Card>
                    </>
                )
            }
            
            
        </div>
    )
}