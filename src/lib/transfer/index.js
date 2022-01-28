import { useState, useEffect,useReducer, useMemo } from 'react'
import { Table, Button } from 'antd'

import './index.css'

const Transfer=({
    dataSource=[],
    targetSource,
    columns,
    onChange,
    rowKey,
    operations=[],
    height='200px',
})=>{

    const renderColumns=useMemo(()=>{
        return columns|| [{dataIndex:rowKey,title:'全选'}]
    },[columns,rowKey])
    
    const [sourceData, setSourceData] = useState(dataSource||[])
    const [targetData, setTargetData] = useState(targetSource||[])
    // state={
    //     left:[keys,rows],
    //     right:[keys,rows]
    // }
    const [state, dispatch] = useReducer((s,o)=>{
        console.log(s,o)
        const {type,keys=[],rows}=o
        s[type]=[keys,rows||s[type][1]]
        return {...s}
    }, {left:[[],[]],right:[[],[]]})

    const getSelection=(type)=>{
        return {
            selectedRowKeys:state[type][0],
            onChange: (keys,rows) => {
                dispatch({type,keys,rows})
            }
        }
    }

    const del=(arr,data)=>{
        console.log(arr,data,'del')
        return arr.filter(item=>!data.find(d=>d[rowKey]===item[rowKey]))
    }

    const toRight=()=>{
        const [,rows]=state.left
        setTargetData(td=>[...td,...rows])
        setSourceData(sd=>del(sd,rows))
        dispatch({type:'left'})
    }

    const toLeft=()=>{
        const [,rows]=state.right
        setTargetData(td=>del(td,rows))
        setSourceData(sd=>[...sd,...rows])
        dispatch({type:'right'})
    }

    useEffect(()=>{
        onChange(targetData)
    },[targetData,onChange])


    return <div className="transfer">
        <Table
            className="transfer-left"
            rowClassName="left"
            columns={renderColumns}
            dataSource={sourceData}
            rowSelection={getSelection('left')}
            rowKey={record=>record[rowKey]} 
            pagination={false}
            scroll={{y:height}}
            size='middle'
        />
        <div className="transfer-btns">
            <Button 
                type="primary"
                onClick={toRight}
                disabled={state.left[0].length<=0}
                icon="right"
            >
                {operations[0]}
            </Button>
            <Button
                type="primary"
                onClick={toLeft}
                disabled={state.right[0].length<=0}
                icon="left"
            >
                {operations[1]}
            </Button>
        </div>
        <Table
            className="transfer-right"
            rowClassName="right"
            columns={renderColumns}
            dataSource={targetData}
            rowSelection={getSelection('right')}
            rowKey={record=>record[rowKey]} 
            pagination={false} 
            scroll={{y:height}}
            size='middle'
        />

    </div>
}

export default Transfer