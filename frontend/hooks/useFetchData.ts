import { useEffect, useState } from "react"

interface FetchDataResult<T>{
    data: T | null
    loading: boolean
    error: string | null
}

const useFetchData = <T>(url:string) : FetchDataResult<T>=>{
    const [data, setData] = useState<T | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string|null>(null)


    useEffect(()=>{

        const fetchData = async()=>{
            setLoading(true);
            try{
                const response = await fetch(process.env.NEXT_PUBLIC_SERVER_API_URL + url)
                if (!response.ok)
                    throw new Error("Failed to fetch data!")
                const fetchedData : T = await response.json()
                setData(fetchedData);
                setLoading(false);
            }catch(error:any){
                setError(error)
                setLoading(false)
            }
        }

        fetchData()
    },[url])

    return {data, loading, error}
}

export default useFetchData