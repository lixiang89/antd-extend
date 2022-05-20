import React from 'react';
import Input from '../lib/CInput/index';

const ins=<div>
    中文输入框，汉字输入中不会触发change<br />
    
</div>

const T=()=>{
    return <div>
        {ins}
        <Input 
            onChange={(e)=>{console.log(e.target.value)}}
        />
        {/* <Button onClick={submit}>submit</Button> */}
    </div>
}

export default T