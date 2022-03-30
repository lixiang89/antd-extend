import { Input,DatePicker } from 'antd';

const columns=[
    {
        dataIndex:'name',
        title:'名称'
    },
    {
        dataIndex:'id',
        title:'id'
    },
]

const dataSource=[
    {name:'lily',id:1},
    {name:'lily2',id:2},
    {name:'lily3',id:3},
    {name:'lily4',id:4},
    {name:'lily5',id:5},
    {name:'lily6',id:6},
]

const targetSource=[
    {name:'mali',id:7},
    {name:'mali2',id:8},
    {name:'mali3',id:9},
]

const fields=[
    {
        label:'姓名',
        field:'name',
        element:<Input placeholder="姓名" />
    },
    {
        label:'年龄',
        field:'age',
        element:<Input placeholder="年龄" />
    },
    {
        label:'身高',
        field:'height',
        element:<Input placeholder="身高" />
    },
    {
        label:'体重',
        field:'weight',
        element:<Input placeholder="体重" />
    },
    {
        label:'生日',
        field:'birthday',
        element: <DatePicker placeholder="生日"   />
    }
]

export {
    columns,
    dataSource,
    targetSource,
    fields
}