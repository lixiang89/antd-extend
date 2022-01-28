import './App.css';
import Transfer from './demo/transfer'
import Form from './demo/renderForm'
import Test from './demo/test'
import { useState } from 'react';

const map={
    transfer:<Transfer />,
    test:<Test />,
    Form:<Form />,
}
function App() {
    const [action, setAction] = useState('test')
    
    return (
        <div className="App">
            <div className="links">
                <a onClick={()=>setAction('test')}>home</a>
                <a onClick={()=>setAction('transfer')}>transfer</a>
                <a onClick={()=>setAction('Form')}>Form</a>
            </div>
            {map[action]}
        </div>
    );
}

export default App;
