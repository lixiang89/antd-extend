import { useState } from 'react';
import { Button } from 'antd';
import './App.css';
import {Test,Transfer,Form,QueryList,EditTable,Input} from './demo/index'

const map={
    home:<Test />,
    transfer:<Transfer />,
    Form:<Form />,
    QueryList:<QueryList />,
    EditTable:<EditTable />,
    Input:<Input />,
}
function App() {
    const [action, setAction] = useState('test')
    
    return (
        <div className="App">
            <div className="links">
                {Object.keys(map).map((key)=>{
                    return <Button key={key} type='link' onClick={()=>setAction(key)}>{key}</Button>
                })}
            </div>
            {map[action]}
        </div>
    );
}

export default App;
