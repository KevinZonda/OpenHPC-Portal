import { useEffect, useState } from "react"
import { getApiUrl, getMetricsFreshTime } from "../shared"
import { Typography } from "antd"

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

const useCPUStat = (interval: number) => {
    const [cpuStat, setCPUStat] = useState("")
    useEffect(() => {
        const timer = setInterval(async () => {
            const stat = await statText("/stat/cpu")
            setCPUStat(stat)
        }, interval)
        return () => clearInterval(timer)
    }, [interval])
    
    return cpuStat
}

const useMemStat = (interval: number) => {
    const [memStat, setMemStat] = useState("")
    useEffect(() => {
        const timer = setInterval(async () => {
            const stat = await statText("/stat/mem")
            console.log(stat)
            setMemStat(stat)
        }, interval)
        return () => clearInterval(timer)
    }, [interval])
    
    return memStat
}

const useNvidiaStat = (interval: number) => {
    const [nvidiaStat, setNvidiaStat] = useState("")
    useEffect(() => {
        const timer = setInterval(async () => {
            const stat = await statText("/stat/nvidia-smi")
            setNvidiaStat(stat)
        }, interval)
        return () => clearInterval(timer)
    }, [interval])
    
    return nvidiaStat
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