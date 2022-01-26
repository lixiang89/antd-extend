import './App.css';
import 'antd/dist/antd.css';
import Transfer from './demo/transfer'
import Test from './demo/test'
import { useState } from 'react';

const map={
    transfer:<Transfer />,
    test:<Test />
}
function App() {
    const [action, setAction] = useState()
    
    return (
        <div className="App">
            <div className="links">
                <a onClick={()=>setAction('test')}>test</a>
                <a onClick={()=>setAction('transfer')}>transfer</a>
            </div>
            {map[action]}
        </div>
    );
}

export default App;
