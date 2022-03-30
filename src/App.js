import { useState } from 'react';
import { Button } from 'antd';
import './App.css';
import Transfer from './demo/transfer'
import Form from './demo/renderForm'
import Test from './demo/test'
import QueryList from './demo/queryList';

const map={
    transfer:<Transfer />,
    test:<Test />,
    Form:<Form />,
    QueryList:<QueryList />
}
function App() {
    const [action, setAction] = useState('test')
    
    return (
        <div className="App">
            <div className="links">
                <Button type='link' onClick={()=>setAction('test')}>home</Button>
                <Button type='link' onClick={()=>setAction('transfer')}>transfer</Button>
                <Button type='link' onClick={()=>setAction('Form')}>Form</Button>
                <Button type='link' onClick={()=>setAction('QueryList')}>QueryList</Button>
            </div>
            {map[action]}
        </div>
    );
}

export default App;
