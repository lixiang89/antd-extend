import { useState,useEffect } from "react";
import QueryList from "../lib/queryList";
import { columns,fields } from "./data.js";
import service from './service.js'

const Demo= ()=>{
    const [list,setList]=useState({})
    const [loading,setLoading]=useState(false)

    const getData=async val=>{
        console.log(val,'query')
        setLoading(true)
        const data=await service.getList({current:1,...val})
        setList(data)
        setLoading(false)
    }

    useEffect(()=>{
        getData()
    },[])

    return <QueryList 
        queryClick={getData}
        queryFields={fields}

        loading={loading}
        columns={columns}
        dataSource={list.dataSource}

        currentPage={list.current}
        totalPage={list.total}
    />
}

export default Demo