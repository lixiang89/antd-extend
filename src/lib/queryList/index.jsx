import { Button, Table } from "antd"
import { useState,useMemo, useCallback } from "react"
import RenderForm from '../renderForm/v2'

import './index.css'

const fn=()=>void 0

const QueryList=({
    queryClick=fn,
    queryChange=fn,
    queryData,
    queryFields,
    loading,
    columns=[],
    dataSource=[],
    currentPage=1,
    totalPage,
    ...props
})=>{
    const [form,setForm]=useState({})
    const [queryParams,setQueryParams]=useState({})

    const handleQuery=()=>{
        const values=form.getFieldsValue()
        queryClick(values)
    }

    const handleChange=useCallback((v={})=>{
        setQueryParams(v)
        queryChange(v)
    },[queryChange])

    const handlePage=(current=1)=>{
        queryClick({...queryParams,current})
    }

    return <div className="queryList">
        <div className="queryList_query">
            {
                useMemo(()=><RenderForm
                        fields={queryFields}
                        data={{...queryParams,...queryData}}
                        onChange={handleChange}
                        getForm={setForm} 
                    />
                ,[queryFields, queryParams, queryData, handleChange])
            }
            <div className="queryList_query_btns">
                <Button onClick={handleQuery}>查询</Button>
            </div>
        </div>
        <div className="queryList_table">
            <Table
                loading={loading}
                columns={columns}
                dataSource={dataSource} 
                pagination={{current:currentPage,total:totalPage,onChange:handlePage}}
                rowKey='id'
            />
        </div>
    </div>
}

export default QueryList