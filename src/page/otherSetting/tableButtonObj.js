
const TableName = {
    name:null,
    setNameFun(data){
        this.name = data.url.split('/')[1]
    },
    tableTest : {
        //基础表格头部按钮数据载体
        //搜索不在其中 因为搜索是必须项
        //value=1，只会传id。value=0，会传整个行的信息。如果是 删除 修改 按钮 则 value:1 代表批量 value:0 代表单行数据
        //type=0 为删除按钮 type=1 修改按钮 type=2 处理按钮 3 新增按钮 4 导出 5导入 默认为2 （只有012345 六个值）
        theadArray:[
            {value:0,url:'http://192.168.2.0:82',title:'新增',type:3},
            {value:1,url:'http://192.168.2.199:82',title:'批量修改',type:1},
            {value:1,url:'http://192.168.2.199:82',title:'导出',type:4},
            {value:1,url:'http://192.168.2.199:82',title:'导入',type:5},
        ],
        //表格按钮的数据载体，单独手动编写
        //index 为需要放在的表格位置，-1为倒数位置。dom为要展示的结构。title为表头标题
        //当有index 为负数时候必须添加name值 否则该index所属的对象不会生效 表头与表体通过name关联
        tbodyButtonArray:[],
        //地址数据集合载体
        urlObj:{
            url:'common/ttrCheck/',
            urlHead:'header',
            urlBody:'page',
        },
    },
    baseTableTwo : {
        //基础表格头部按钮数据载体
        //搜索不在其中 因为搜索是必须项
        //value=1，只会传id。value=0，会传整个行的信息。如果是 删除 修改 按钮 则 value:1 代表批量 value:0 代表单行数据
        //type=0 为删除按钮 type=1 修改按钮 type=2 处理按钮 3 新增按钮 4 导出 5导入 默认为2 （只有012345 六个值）
        theadArray:[
            {value:0,url:'http://192.168.2.0:82',title:'新增',type:3},
            {value:1,url:'http://192.168.2.199:82',title:'批量修改',type:1},
            {value:1,url:'http://192.168.2.199:82',title:'导出',type:4},
            {value:1,url:'http://192.168.2.199:82',title:'导入',type:5},
        ],
        //表格按钮的数据载体，单独手动编写
        //index 为需要放在的表格位置，-1为倒数位置。dom为要展示的结构。title为表头标题
        //当有index 为负数时候必须添加name值 否则该index所属的对象不会生效 表头与表体通过name关联
        tbodyButtonArray:[],
        //地址数据集合载体
        urlObj:{
            url:'common/order/',
            urlHead:'header',
            urlBody:'page',
        },
    },
    baseTableThree : {
        //基础表格头部按钮数据载体
        //搜索不在其中 因为搜索是必须项
        //value=1，只会传id。value=0，会传整个行的信息。如果是 删除 修改 按钮 则 value:1 代表批量 value:0 代表单行数据
        //type=0 为删除按钮 type=1 修改按钮 type=2 处理按钮 3 新增按钮 4 导出 5导入 默认为2 （只有012345 六个值）
        theadArray:[
            {value:0,url:'http://192.168.2.0:82',title:'新增',type:3},
            {value:1,url:'http://192.168.2.199:82',title:'批量修改',type:1},
            {value:1,url:'http://192.168.2.199:82',title:'导出',type:4},
            {value:1,url:'http://192.168.2.199:82',title:'导入',type:5},
        ],
        //表格按钮的数据载体，单独手动编写
        //index 为需要放在的表格位置，-1为倒数位置。dom为要展示的结构。title为表头标题
        //当有index 为负数时候必须添加name值 否则该index所属的对象不会生效 表头与表体通过name关联
        tbodyButtonArray:[],
        //地址数据集合载体
        urlObj:{
            url:'policy/dataCh/',
            urlHead:'header',
            urlBody:'page',
        },
    },
}
export default TableName