import { cloneElement,useEffect } from "react";
import {Form} from 'antd'

// 单独处理时间控件
// import moment from 'moment'
// moment.fn.toJSON=function(){return this.format('YYYY-MM-DD')}

const RenderFormV2 =({
    form={},
    getForm=()=>void 0,
    fields=[],
    chunk=3,
    layout="inline",
    ...props
})=>{
    
    useEffect(()=>{
        getForm(form)
    },[form, getForm])

    return <Form 
        layout={layout}
        className="renderForm"
        style={{display:'grid',gridTemplateColumns:`repeat(${chunk},1fr)`,columnGap:'8px'}}
    >
        {
            fields.map(item=>{
                const {
                    label,
                    field,
                    element,
                    disable=false,
                    initVal,
                    rules=[]
                }=item
                return <Form.Item label={label} key={field}>
                    {
                        form.getFieldDecorator(field,{
                            rules,
                            initialValue:initVal
                        })(
                            cloneElement(element,{disable:disable+''})
                        )
                    }
                </Form.Item>
            })
        }
    </Form>
}

const onValuesChange=(props,changedValues,allValues)=>{
    props.onChange&&props.onChange(allValues,changedValues)
}

const target={}
const mapPropsToFields=(props)=>{
    const obj=props.data
    for (const key in obj) {
        const value = obj[key];
        target[key]=Form.createFormField({value})
    }
    return target
}

export default Form.create({
    onValuesChange,
    mapPropsToFields,
})(RenderFormV2)