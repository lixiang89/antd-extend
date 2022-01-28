import RenderForm from '../lib/renderForm/index';
import { Input,DatePicker, Button } from 'antd';
import moment from 'moment';
import { useEffect,useRef } from 'react';

const ins=<div>
    通过配置来生成Form<br />
    fields:生成表单的配置arr<br />
        label: item的label<br />
        field: getFieldDecorator的field<br />
        renderElement：getFieldDecorator返回函数的入参，需返回jsx<br />
    {`const fields=[
        {
            label:'姓名',
            field:'name',
            renderElement(){
                return <Input placeholder="姓名" />
            }
        },
        {
            label:'年龄',
            field:'age',
            renderElement(){
                return <Input placeholder="年龄" />
            }
        },
        {
            label:'生日',
            field:'birthday',
            props:{wrapperCol: { span: 20 }},
            renderElement(disabled){
                return <DatePicker placeholder="生日" disabled={disabled}  />
            }
        }
    ]
    `}<br />
    formData：表单值 obj<br />
    {
        `const formData={
            name:'lily',
            // age:22,
            birthday:moment('2000-02-02')
        }`
    }<br />
    disabled：是否禁用表单，可以和renderElement配合使用<br />
    onChange：表单变化时回调<br />
    getForm：获取form对象<br />
    formProps：Form的props<br />
    itemProps：item的props<br />
</div>
const fields=[
    {
        label:'姓名',
        field:'name',
        renderElement(){
            return <Input placeholder="姓名" />
        }
    },
    {
        label:'年龄',
        field:'age',
        renderElement(){
            return <Input placeholder="年龄" />
        }
    },
    {
        label:'生日',
        field:'birthday',
        props:{wrapperCol: { span: 20 }},
        renderElement(disabled){
            return <DatePicker placeholder="生日"   />
        }
    }
]
const formData={
    name:'lily',
    // age:22,
    birthday:moment('2000-02-02')
}
const T=()=>{
    const form = useRef({})
    useEffect(() => {
        console.log(form)
    })
    const submit=()=>{
        form.current.validateFieldsAndScroll((errors,values)=>{
            if(errors){
                console.log(errors)
            }else{
                console.log('dosubmit')
            }
        })
    }
    return <div>
        {ins}
        <RenderForm 
            fields={fields}
            formData={formData}
            disabled
            onChange={()=>{}}
            getForm={f=>form.current=f}
            formProps={{}}
            itemProps={{
                labelCol: { span: 4 },
                wrapperCol: { span: 14 },
            }}
        />
        <Button onClick={submit}>submit</Button>
    </div>
}

export default T