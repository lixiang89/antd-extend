import React,{useState,useEffect} from 'react'
import { Table,Button,message,Form, Modal } from 'antd';
import FormItemCell from './cell'
import moment from 'moment'

import './index.css'

const fn=()=>{}

const FormItemTable = ({
    form,
    handleSelectRow=fn,
    selectionType='radio',
    columnWidth=50,
    handleAddRow=fn,
    customAddRow,
    dataSource:source,
    changeTableData=fn,
    handleDelRow=fn,
    canEmpty=false,
    isDisabled,
    handleCellChange=fn,
    columns,
    uniqueIdKey='id',
    setTableForm=fn,
    rowKey,
    ...props

})=>{
    const [selectedRows, setSelectedRows] = useState([])
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [selectedRowIndex, setSelectedRowIndex] = useState([])
    const [dataSource, setDataSource] = useState([])

    useEffect(()=>{
        setDataSource(source)
    },[source])

    // 校验方法，去除无用数据
    const validate=(func)=>{
        form.validateFields((errors,values)=>{
            const res={}
            if(!errors){
                for (const key in values) {
                    if (values.hasOwnProperty(key)) {
                        let item = values[key];
                        if(item||item==0){
                            if(moment.isMoment(item)){
                                item=item.format('YYYY-MM-DD')
                            }
                            const [field,uniqueId]=key.split('-')
                            if(!res[uniqueId]){
                                res[uniqueId]={}
                            }
                            res[uniqueId][field]=item
                        }
                    }
                }
            }
            func&&func(errors,Object.values(res))
        })
    }

    useEffect(() => {
        form.validateTable=validate
        setTableForm(form)
    }, [form])

    const rowSelection=()=>{
        return {
            columnWidth,
            type:selectionType,
            selectedRowKeys,
            onChange:(keys,rows)=>{
                setSelectedRowKeys(keys)
                setSelectedRows(rows)
            },
            onSelect:(record,selected,rows,nativeEvent)=>{
                console.log(record,selected,rows,nativeEvent,'onSelect')
                setSelectedRowIndex(record.uniqueId)
                handleSelectRow(record,rows)
            }
        }
    }

    const addInitData=(data)=>{
        const add=(item)=>{
            dataSource.push({
                uniqueId:Date.now(),
                ...item
            })
            setDataSource([...dataSource])
        }
        if(Array.isArray(data)){
            data.forEach(d=>{add(d)})
        }else{
            add(data)
        }
        changeTableData(dataSource)
    }

    const handleAdd=()=>{
        let addFunc=addInitData
        if(customAddRow){
            customAddRow(addFunc)
        }else{
            addFunc()
            handleAddRow()
        }
    }

    const handleDel=()=>{
        const selectedRowKeysLen=selectedRowKeys.length
        const dataSourceLen=dataSource.length
        if(selectedRowKeysLen==0){
            message.error('请先选择要删除的数据')
            return
        }
        if(!canEmpty){
            if(dataSourceLen<=1||selectedRowKeysLen>=dataSourceLen){
                message.error('至少保留一条数据')
            }
        }

        Modal.confirm({
            title:'确认删除',
            content:'确定要删除吗？',
            onOk(){
                const ds=dataSource.filter(d=>!selectedRowKeys.includes(d.uniqueId))
                setDataSource(ds)
                changeTableData(ds)
                handleDelRow(selectedRowIndex,selectedRowKeys,selectedRows)
                setSelectedRowKeys([])
                setSelectedRows([])
            }
        })

    }

    const handleChange=(field,value,index,uniqueId)=>{
        Object.assign(dataSource[index],{[field]:value})
        changeTableData(dataSource,field)
        handleCellChange(field,value,index,uniqueId)
    }

    const handleColumns=columns=>{
        return columns.map(item=>{
            const {renderType,...props}=item
            if(renderType){
                const render=(text,record,index)=>{
                    const params={
                        text,
                        record,
                        index,
                        form,
                        uniqueId:record.uniqueId,
                        isDisabled,
                        ...item
                    }
                    return <FormItemCell 
                        onChange={handleChange} 
                        {...params}     
                    />
                }
                return {...props,render}
            }else{
                return item
            }
        })
    }

    return <div className="formItemTable">
        <div className="optBtns">
            <Button onClick={handleAdd}>新增</Button>
            <Button onClick={handleDel}>删除</Button>
        </div>
        <Table
            {...props}
            rowKey={'uniqueId'}
            disabled={isDisabled}
            columns={handleColumns(columns)} 
            dataSource={dataSource.map(ds=>({...ds,uniqueId:ds.uniqueId||ds['uniqueId']||Date.now()}))}
            rowSelection={rowSelection()}
        />
    </div>
}

export default Form.create()(FormItemTable)