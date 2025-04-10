import useSWR from "swr"
import { api } from "../shared"
import { VMListProvider, VMListItem } from "../api/models"
import { Card, Typography, Space, Row, Col, Spin, Alert, Tag } from 'antd'
import { ContainerOutlined } from '@ant-design/icons'

const { Title } = Typography

export const ListPage = () => {
    const {data, error, isLoading} = useSWR('/list', async () => {
        return await api.vmListGet()
    })

    if (isLoading) {
        return <div style={{ textAlign: 'center', padding: '50px' }}>
            <Spin size="large" />
        </div>
    }

    if (error) {
        return <Alert
            message="Error"
            description={error.message}
            type="error"
            showIcon
        />
    }

    return <div>
        {data?.sort((a, b) => a.provider.localeCompare(b.provider)).map((provider) => {
            return listPerProvider(provider)
        })}
    </div>
}

const listPerProvider = (list : VMListProvider) => {
    return <div key={list.provider} style={{ marginBottom: '24px' }}>
        <Title level={2}>
            <ContainerOutlined /> {list.provider}
        </Title>
        <Row gutter={[16, 16]}>
            {
                list.containers.sort((a, b) => a.svcTag.localeCompare(b.svcTag))
                .map(itemPerProvider)
            }
        </Row>
    </div>
}

const itemPerProvider = (item : VMListItem) => {
    return <Col xs={24} sm={12} md={8} lg={6} key={item.cid}>
        <Card
            title={ item.project ? `${item.owner}/${item.project}` : `${item.owner}`}
            style={{ height: '100%' }}
        >
            <Space direction="vertical" style={{ width: '100%' }}>
                <Space wrap>
                    <Tag color="blue">Owner: {item.owner}</Tag>
                    {item.project && <Tag color="cyan">Project: {item.project}</Tag>}
                    <Tag color="purple">CID: {shortCID(item.cid)}</Tag>
                </Space>
                <span>
                    <span><strong>Status:</strong> {item.status}</span><br/>
                    <span><strong>SC:</strong> {item.sc}</span><br/>
                    <span><strong>SvcTag:</strong> {item.svcTag}</span>
                </span>
            </Space>
        </Card>
    </Col>
}

const shortCID = (cid : string) => {
    return cid ? cid.slice(0, 12) : ""
}