import useSWR from "swr"
import { api } from "../shared"
import { VMListProvider, VMListItem } from "../api/models"

export const ListPage = () => {
    const {data, error, isLoading} = useSWR('/list', async () => {
        return await api.vmListGet()
    })

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }

    return <div>
        {data?.sort((a, b) => a.provider.localeCompare(b.provider)).map((provider) => {
            return listPerProvider(provider)
        })}
    </div>
}

const listPerProvider = (list : VMListProvider) => {
    return <>
        <h2>{list.provider}</h2>
        {
            list.containers.sort((a, b) => a.svcTag.localeCompare(b.svcTag)).
            map(itemPerProvider)
        }
    </>
}

const itemPerProvider = (item : VMListItem) => {
    return <>
        <h3>{item.owner}:{item.project}</h3>
        <p>{item.status}</p>
        <p>{item.cid}</p>
        <p>{item.svcTag}</p>
        <p>{item.sc}</p>
    </>
}