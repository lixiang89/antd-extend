import FormItemTable from '../lib/formItemTable/index';
import { useEffect,useRef } from 'react';
import moment from 'moment'

const ins=<div>
    通过配置来生成Form<br />
    
</div>
const columns=[
    {
        title:'文本框',
        dataIndex:'text',
        renderType:'text'
    },
    {
        title:'数字框',
        dataIndex:'number',
        renderType:'number'
    },
    {
        title:'日期框',
        dataIndex:'date',
        renderType:'date'
    },
    {
        title:'选择框',
        dataIndex:'select',
        renderType:'select',
        renderProps:{
            options:[
                {label:'a',value:'11'},
                {label:'b',value:'12'},
                {label:'c',value:'13'},
            ]
        },
        width:200
    },
]
const dataSource=[
    {
        id:1,
        text:'1',
        number:1,
        date:moment('2022-02-02'),
        selecct:'0'
    }
]
const T=()=>{
    return <div>
        {ins}
        <FormItemTable 
            // disabled
            onChange={(v)=>{console.log(v)}}
            changeTableData={(v)=>{console.log(v,'datachange')}}
            handleCellChange={(field,value,index,uniqueId)=>{console.log(field,value,index,uniqueId,'cellchange')}}
            // getForm={f=>form.current=f}
            dataSource={dataSource}
            columns={columns}
            rowKey='id'
        />
        {/* <Button onClick={submit}>submit</Button> */}
    </div>
}

export default T