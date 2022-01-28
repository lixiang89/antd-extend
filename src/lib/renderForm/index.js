import { useEffect } from 'react';
import { Form } from 'antd';

const RenderForm=({
    form={},
    fields=[],
    disabled,
    itemProps={},
    getForm,
    formProps
})=>{
    const {getFieldDecorator}=form

    useEffect(()=>{
        getForm(form)
    },[])

    return (
        <Form className="renderForm" {...formProps} >
            {
                fields.map((item={})=>{
                    const {
                        label,
                        field,
                        required=true,
                        fieldOptions={rules:[
                            {
                                required,
                                message:' '
                            },
                        ]},
                        renderElement,
                        props,
                    }=item
                    return <Form.Item label={label} key={field} {...itemProps} {...props}>
                        {
                            getFieldDecorator(field,fieldOptions)(
                                renderElement.call(item,disabled,form)||<span></span>
                            )
                        }
                    </Form.Item>
                })
            }
        </Form>
    )
}

const obj2FormField=(obj)=>{
    const target={}
    for (const key in obj) {
        const value = obj[key];
        target[key]=Form.createFormField({value})
    }
    return target
}

export default Form.create({
    onValuesChange(props,changedValues,allValues){
        props.onChange(allValues,changedValues)
    },
    mapPropsToFields(props){
        return obj2FormField(props.formData)
    }
})(RenderForm)