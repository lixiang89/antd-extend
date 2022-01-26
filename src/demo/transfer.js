import Transfer from '../lib/transfer/index';
import { dataSource,targetSource,columns} from './data'

const T= ()=>{
    const handleChange=(rows)=>{
        console.log(rows,'rows')
    }
    return <div>
        <div>因为要在右边放入左边没有的数据，原transfer不能实现，故自己用table写了个。</div>
        <div>实现的api有 dataSource、onChange、operations</div>
        <div>columns：只有一列且无需显示标题时无需传入，其他需传入。array</div>
        <div>rowkey：行数据唯一标识 string</div>
        <div>targetSource：如果初始需要右侧有数据，传入。array</div>
        <div>height：默认200px，不带表头 string</div>
        单列
        {
        `<Transfer
            dataSource={dataSource}
            targetSource={targetSource}
            onChange={handleChange}
            rowKey='name'
        />`
        }
        <Transfer
            dataSource={dataSource}
            targetSource={targetSource}
            onChange={handleChange}
            rowKey='name'
        />
        多列
        {`<Transfer
            dataSource={dataSource}
            targetSource={targetSource}
            onChange={handleChange}
            columns={columns}
            rowKey='id'
            operations={['选择','取消']}
        />`}
        <Transfer
            dataSource={dataSource}
            targetSource={targetSource}
            onChange={handleChange}
            columns={columns}
            rowKey='id'
            operations={['选择','取消']}
        />
    </div>
}
export default T