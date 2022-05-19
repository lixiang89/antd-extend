import React, { cloneElement, Component, forwardRef } from 'react'
import { Table,Button,message,Form, Modal, Input, Select, DatePicker, InputNumber } from 'antd';
import moment from 'moment'

const Slt=forwardRef((props,ref)=>{
    const {options,...rest}=props
    return <Select ref={ref} {...rest}>
        {options.map(op=>{
            return <Select.Option key={op.key||op.value} value={op.value}>{op.label}</Select.Option>
        })}
    </Select>
})

const Cell=({
    onChange,
    dataIndex,
    renderType='text',
    index,
    uniqueId,
    form,
    text,
    record,
    renderProps={},
    required,
    isDisabled,
    rules=[],
    maxlength,
})=>{
    const handleChange=(f,s)=>{
        let value=f;
        if(renderType=='text'){
            value=f.target.value
        }else if(renderType=='date'){
            value=s
        }
        onChange(dataIndex,value,index,uniqueId)
    }

    const item=()=>{
        const itemProps={
            onChange:handleChange,
            disabled:isDisabled,
            ...renderProps
        }
        const map= {
            text:<Input />,
            select:<Slt />,
            date:<DatePicker />,
            number:<InputNumber />
        } 
        return cloneElement(map[renderType],itemProps)     
    }

    return <Form.Item className="formItemCell">
        {
            form.getFieldDecorator(dataIndex+'-'+uniqueId,{
                rules,
                initialValue:text,
            })(
                item()
            )
        }
    </Form.Item>

}

export default Cell