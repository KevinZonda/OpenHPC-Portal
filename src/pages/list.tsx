import useSWR from "swr"
import { api, getHTTPEntry, getSSHEntry } from "../shared"
import { VMListProvider, VMListItem } from "../api/models"
import { Card, Typography, Space, Row, Col, Spin, Alert, Tag, Button, Popconfirm, Popover } from 'antd'
import { CloseOutlined, ContainerOutlined, PlusOutlined, ReloadOutlined, SettingOutlined, BarChartOutlined } from '@ant-design/icons'
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react" 
import { PerformanceMetrics } from "../components/AutoRefresh"
import { SiJupyter } from 'react-icons/si'
import { LuKey } from "react-icons/lu"
import { RiTerminalFill } from "react-icons/ri"
const { Title } = Typography

interface CreateVMBarProps {
    children : React.ReactNode
}

const CreateVMBar = ({ children } : CreateVMBarProps) => {
    const navigate = useNavigate()
    const [showMetrics, setShowMetrics] = useState(false)
    return <div>
        <Space>
            <Button icon={<PlusOutlined />} type="primary" onClick={() => navigate('/create')}></Button>
            <Button icon={<ReloadOutlined />} onClick={() => {
                window.location.reload()
            }}></Button>
            <Button icon={<SettingOutlined />} onClick={() => navigate('/settings')}></Button>
            <Button icon={<BarChartOutlined />} type={showMetrics ? "primary" : "default"} onClick={() => setShowMetrics(!showMetrics)}></Button>
        </Space>
        {showMetrics && <PerformanceMetrics />}
        {children}
        </div>
}
export const ListPage = () => {
    const {data, error, isLoading} = useSWR('/list', async () => {
        return await api.vmListGet()
    })

    if (isLoading) {
        return <CreateVMBar>
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <Spin size="large" />
            </div>
        </CreateVMBar>
    }

    if (error) {
        return <CreateVMBar>
            <Alert
            message="Error"
            description={error.message}
            type="error"
            showIcon
        />
        </CreateVMBar>
    }

    return <CreateVMBar>
        {data?.sort((a, b) => a.provider.localeCompare(b.provider)).map((provider) => {
            return listPerProvider(provider.provider, provider)
        })}
    </CreateVMBar>
}

const listPerProvider = (provId : string, list : VMListProvider) => {
    return <div key={list.provider} style={{ marginBottom: '24px' }}>
        <Title level={2}>
            <ContainerOutlined /> {list.provider}
        </Title>
        <Row gutter={[16, 16]}>
            {
                list.containers.sort((a, b) => a.svcTag.localeCompare(b.svcTag))
                .map(v => <ItemPerProvider key={v.cid} provId={provId} item={v} />)
            }
        </Row>
    </div>
}

interface ItemPerProviderProps {
    provId : string
    item : VMListItem
}

const ItemPerProvider = ({provId, item} : ItemPerProviderProps) => {
    const [isDeleting, setIsDeleting] = useState(false)
    const [isDeleted, setIsDeleted] = useState(false)
    const [openToken, setOpenToken] = useState(false);
    const [token, setToken] = useState<string[]>([])

    let jupyterAccess = ''
    let sshAccess = ''
    const ports = item.port && item.port.length > 0 ? item.port.map((p) => {
        const split = p.host.split(':')
        const is_ssh = p.container.endsWith(':22')
        if (!is_ssh) {
            jupyterAccess = getHTTPEntry(split[split.length - 1])
        } else {
            sshAccess = getSSHEntry(split[split.length - 1])
        }
        return {port: split[split.length - 1], is_ssh}
    }) : []

    const rds = item.mount && item.mount.length > 0 ? item.mount : []

    return isDeleted ? <>Deleted</> : <Col xs={24} sm={12} md={8} lg={6} key={item.cid}>
        <Card
            title={ item.project ? `${item.owner}/${item.project}` : `${item.owner}`}
            style={{ height: '100%' }}
            styles={{
                body: {
                    padding: '16px',
                    paddingBottom: '12px',
                    paddingTop: '8px'
                },
                header: {
                    padding: '16px',
                    paddingTop: '4px',
                    paddingBottom: '4px',
                    minHeight: '0px'
                }
            }}
        >
            {
                isDeleting
                ? <div style={{ textAlign: 'center', padding: '20px' }}><Spin /></div> 
                : (<Space direction="vertical" style={{ width: '100%' }}>
                <Space wrap size={[0, 8]}>
                    <Tag color="blue">Owner: {item.owner}</Tag>
                    {item.project && <Tag color="cyan">Project: {item.project}</Tag>}
                    <Tag color="purple">CID: {shortCID(item.cid)}</Tag>
                    <Tag color="green">Image: {item.image}</Tag>
                    {
                        ports.length > 0 && ports.map((p) => {
                            return <Tag color={p.is_ssh ? 'red' : 'orange'}>{p.is_ssh ? 'SSH' : 'HTTP'}: {p.port}</Tag>
                        })
                    }
                </Space>
                <span>
                    <span><strong>Status:</strong> {item.status}</span><br/>
                    <span><strong>SC:</strong> {item.sc}</span><br/>
                    <span><strong>SvcTag:</strong> {item.svcTag}</span>
                    {
                        rds.length > 0 && rds.map((r) => {
                            return (<>
                                <br/><span><strong>Mount:</strong> {r.container} {r.readonly ? '(RO)' : '(RW)'}</span>
                            </>)
                        })
                    }
                </span>
                <Space>
                <Popconfirm
                    title="Delete the VM"
                    description="Are you sure to delete this VM?"
                    onConfirm={() => {
                        setIsDeleting(true)
                        api.vmDelPost({
                            vMDelReq: {
                                provider: provId,
                                id: item.cid
                            }
                        }).then(() => {
                            setIsDeleted(true)
                            setIsDeleting(false)
                            window.location.reload() // TODO: use SWR to refresh the list
                        }).catch((err) => {
                            setIsDeleting(false)
                            console.error(err)
                            // message.error(err.message)
                        })
                    }}
                >
                    <Button danger size="small" icon={<CloseOutlined />}></Button>
                </Popconfirm>
                <Popover
                    content={
                        <>
                        {token.map((t) => {
                            return <div key={t}>{t}</div>
                        })}
                        </>
                    }
                    trigger="click"
                    open={openToken}
                    onOpenChange={(newVal) => {
                        if (newVal && token.length == 0) {
                            api.vmTokenPost({
                                vMTokenReq: {
                                    provider: provId,
                                    id: item.cid
                                }
                            }).then((resp) => {
                                setToken(resp.token)
                                setOpenToken(newVal)
                            })
                        } else {
                            setOpenToken(newVal)
                        }
                    }}
                >
                    <Button size="small" icon={<LuKey />} />
                </Popover>

                {jupyterAccess && (
                <Popover
                    content={
                        <Link target="_blank" to={jupyterAccess}>{jupyterAccess}</Link>
                    }
                    trigger="click"
                >
                        <Button size="small" icon={<SiJupyter />} />
                    </Popover>
                )}
                {sshAccess && (
                <Popover
                    content={sshAccess}
                    trigger="click"
                >
                    <Button size="small" icon={<RiTerminalFill />} />
                </Popover>
                )}
                </Space>
            </Space>)
            }
        </Card>
    </Col>
}

const shortCID = (cid : string) => {
    return cid ? cid.slice(0, 12) : ""
}