import React, { useEffect, useRef } from "react";
import { Input } from "antd";

const CInput = props=>{
    const {value,onChange,className,...rest}=props

    let coming=false

    const onComStart=()=>{
        coming=true
    }

    const onInputChange=e=>{
        if(!coming){
            onChange(e)
        }
    }

    const onComEnd=e=>{
        coming=false
        onInputChange(e)
    }

    return <Input 
        {...rest}
        onCompositionStart={onComStart}
        onCompositionEnd={onComEnd}
        onChange={onInputChange}
    />

}

export default CInput