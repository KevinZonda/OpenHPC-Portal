import { useEffect, useState } from "react"
import { api, getApiUrl, getMetricsFreshTime } from "../shared"
import { Typography, Progress, Row, Col } from "antd"
import { StatInfo } from "../api";

const { Title } = Typography

async function statText(path: string): Promise<string> {
    const response = await fetch(getApiUrl() + path, {
        method: 'GET',
        headers: {
            'Content-Type': 'text/plain',
        },
    });
    return response.text()
}

const useStatRefresh = (interval: number) => {
    const [stat, setStat] = useState<StatInfo>({
        cpu: {
            avgLoad: 0,
        },
        mem: {
            total: 0,
            used: 0,
            unit: "MiB",
        },
        gpu: [{
            name: "GPU 0",
            mem: {
                total: 0,
                used: 0,
                unit: "MiB",
            },
            memUtil: 0,
            util: 0,
        }],
    })
    useEffect(() => {
        api.statGet().then((_stat) => setStat(_stat));
        const timer = setInterval(async () => {
            const _stat = await api.statGet()
            setStat(_stat)
        }, interval)
        return () => clearInterval(timer)
    }, [interval])
    
    return stat
}


const useResourceStat = (resource: string, interval: number) => {
    const [stat, setStat] = useState("")
    useEffect(() => {
        statText(`/stat/${resource}`).then((stat) => setStat(stat))
        const timer = setInterval(async () => {
            const stat = await statText(`/stat/${resource}`)
            setStat(stat)
        }, interval)
        return () => clearInterval(timer)
    }, [interval])
    
    return stat
}


const useCPUStat = (interval: number) => {
    return useResourceStat("cpu", interval)
}

const useMemStat = (interval: number) => {
    return useResourceStat("mem", interval)
}

const useNvidiaStat = (interval: number) => {
    return useResourceStat("nvidia-smi", interval)
}

export const PerformanceMetrics = () => {
    const cpuStat = useCPUStat(getMetricsFreshTime())
    const memStat = useMemStat(getMetricsFreshTime())
    const nvidiaStat = useNvidiaStat(getMetricsFreshTime())

    return (
        <div>
            <Title level={5} style={{ marginTop: '0.5em' }}>CPU</Title>
            <pre>{cpuStat}</pre>
            <Title level={5} style={{ marginTop: '0.5em' }}>Memory</Title>
            <pre>{memStat}</pre>
            <Title level={5} style={{ marginTop: '0.5em' }}>NVIDIA</Title>
            <pre>{nvidiaStat}</pre>
        </div>
    )
}

const formatToGiB = (value: number, unit: string, precision: number = 2) => {
    if (unit === "MiB") {
        return (value / 1024).toFixed(precision)
    }
    return value.toFixed(precision)
}

export const StatBar = () => {
    const stat = useStatRefresh(getMetricsFreshTime())

    const getStrokeColor = (percent: number) => {
        if (percent <= 30) return '#52c41a'        // Light green
        if (percent <= 50) return '#73d13d'        // Green
        if (percent <= 70) return '#faad14'        // Yellow
        if (percent <= 85) return '#ff7a45'        // Orange
        return '#f5222d'                           // Red
    }

    return (
        <Row gutter={[16, 16]} style={{ marginBottom: '1em' }}>
            <Col xs={24} sm={24} md={12} lg={6}>
                <div>
                    <Title level={5} style={{ marginTop: '0.5em', marginBottom: '0.5em' }}>CPU</Title>
                    <Progress 
                        percent={Math.round(stat.cpu.avgLoad)} 
                        strokeColor={getStrokeColor(stat.cpu.avgLoad)}
                        format={percent => `${percent}%`}
                    />
                </div>
            </Col>
            <Col xs={24} sm={24} md={12} lg={6}>
                <div>
                    <Title level={5} style={{ marginTop: '0.5em', marginBottom: '0.5em' }}>Memory</Title>
                    <Progress 
                        percent={Math.round((stat.mem.used / stat.mem.total) * 100)}
                        strokeColor={getStrokeColor((stat.mem.used / stat.mem.total) * 100)}
                        format={() => `${formatToGiB(stat.mem.used, stat.mem.unit)} GB / ${formatToGiB(stat.mem.total, stat.mem.unit)} GB`}
                    />
                </div>
            </Col>
            {stat.gpu.map((gpu, index) => (
                <Col xs={24} sm={24} md={12} lg={6} key={index}>
                    <div>
                        <Title level={5} style={{ marginTop: '0.5em', marginBottom: '0.5em' }}>{gpu.name}</Title>
                        <Progress 
                            percent={gpu.util}
                            strokeColor={getStrokeColor(gpu.util)}
                            format={percent => `GPU ${index}: ${percent}%`}
                        />
                        <Progress 
                            percent={gpu.memUtil}
                            strokeColor={getStrokeColor(gpu.memUtil)}
                            format={() => `${formatToGiB(gpu.mem.used, gpu.mem.unit)} GB / ${formatToGiB(gpu.mem.total, gpu.mem.unit)} GB`}
                        />
                    </div>
                </Col>
            ))}
        </Row>
    )
}