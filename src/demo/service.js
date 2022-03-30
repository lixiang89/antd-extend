import { dataSource } from "./data"

const s={
    getList:({current})=>new Promise(resolve=>{
            setTimeout(()=>{
                resolve({dataSource,current,total:9999})
            },2000)
        })
    
}

export default s