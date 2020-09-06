// let tok = window.sessionStorage.getItem('token');
// console.log(tok)

export default {
    baseTableRule: {
        //基础表格头部按钮数据载体
        //搜索不在其中 因为搜索是必须项
        //value=1，只会传id。value=0，会传整个行的信息。如果是 删除 修改 按钮 则 value:1 代表批量 value:0 代表单行数据
        //type=0 为删除按钮 type=1 修改按钮 type=2 处理按钮 3 新增按钮 4 导出 5导入 默认为2 （只有012345 六个值）
        theadArray:
            [
                {value: 0, url: 'http://192.168.2.0:82', title: '新增', type: 3},
                {value: 1, url: 'http://192.168.2.199:82', title: '批量修改', type: 1},
                {value: 1, url: 'http://192.168.2.199:82', title: '导出', type: 4},
                {value: 1, url: 'http://192.168.2.199:82', title: '导入', type: 5},
            ],
        //~~~~~~~~~~~~表格内部特殊展示和按钮的数据载体，需要单独手动编写~~~~~~
        //index 为需要放在的表格位置，-1为倒数位置。dom为要展示的结构。
        //当有index 为负数时候必须添加name值 否则该index所属的对象不会生效 表头与表体通过filedName关联
        //name:'tableIndex' 则代表此格要展示序号
        //dom 为input 代表横向可展示表格的第index格需要渲染多选框。 如果同时还拥有属性 name:'tableIndex' 则代表还要展示序号
        //序号只要放在0号位，就一定会单独横向创建一个格子，不会与数据渲染到一起
        //dom 为 buttonSort 是否展示排序按钮
        //dom 为 buttonArray 则代表展示按钮。title为要展示的标题（只在buttonArray有用） array为存放按钮的数组 必须是数组
        //value 1 代表 只传id。value=0，会传整个行的信息 url 为该按钮请求的地址 title 为展示按钮的文字
        //type 0 为删除 1 为修改 2 为处理 默认为2
        tbodyButtonArray: [
            {index: 0, name: 'tableIndex'},
            // {index: 0, dom: 'input',name:'tableIndex'},
            {index: 2, buttonSort: true},
            {index: 8, buttonSort: true},
            {index: 5, dom: 'date'},
            {
                dom: 'buttonArray', title: '操作', index: -1, array: [
                    {value: 1, url: 'common/order/place', title: '重订', type: 2},
                    {value: 1, url: 'common/order/pay', title: '重付', type: 2},
                    {value: 0, url: 'xxxxx', title: '重回123456'},
                    {value: 0, url: 'xxxxx', title: '删除56', type: 0},
                    {value: 0, url: 'xxxxx', title: '修改', type: 1},
                ]
            },
        ],
        //地址数据集合载体
        urlObj: {
            url: 'policy/dataCh/',
            urlHead: 'header',
            urlBody: 'page',
            //新增功能函数地址
            addUrl: 'addUrladdUrladdUrl',
            //修改按钮函数地址
            changeUrl: 'changeUrlchangeUrl',
            urlBodyPostObj: {
                "lasttime:desc": "",
                //#{}为一个匹配规则 可能存在多个
                //当date值存在systemCurrentTime需要替换成当前浏览器时间
                //当date值存在baseSCTAfterYear 需要替换成距离当前时候一年后
                "date:between": "#{systemCurrentTime}|#{baseSCTAfterYear}",
            }
        },
    },
    baseTableTwo: {
        //基础表格头部按钮数据载体
        //搜索不在其中 因为搜索是必须项
        //value=1，只会传id。value=0，会传整个行的信息。如果是 删除 修改 按钮 则 value:1 代表批量 value:0 代表单行数据
        //type=0 为删除按钮 type=1 修改按钮 type=2 处理按钮 3 新增按钮 4 导出 5导入 默认为2 （只有012345 六个值）
        theadArray: [
            {value: 0, url: 'http://192.168.2.0:82', title: '新增', type: 3},
            {value: 1, url: 'http://192.168.2.199:82', title: '批量修改', type: 1},
            {value: 1, url: 'http://192.168.2.199:82', title: '导出', type: 4},
            {value: 1, url: 'http://192.168.2.199:82', title: '导入', type: 5},
        ],
        //表格按钮的数据载体，单独手动编写
        //index 为需要放在的表格位置，-1为倒数位置。dom为要展示的结构。title为表头标题
        //当有index 为负数时候必须添加name值 否则该index所属的对象不会生效 表头与表体通过name关联
        tbodyButtonArray: [],
        //地址数据集合载体
        urlObj: {
            url: 'common/order/',
            urlHead: 'header',
            urlBody: 'page',
        },
    },
    baseTableThree: {
        //基础表格头部按钮数据载体
        //搜索不在其中 因为搜索是必须项
        //value=1，只会传id。value=0，会传整个行的信息。如果是 删除 修改 按钮 则 value:1 代表批量 value:0 代表单行数据
        //type=0 为删除按钮 type=1 修改按钮 type=2 处理按钮 3 新增按钮 4 导出 5导入 默认为2 （只有012345 六个值）
        theadArray: [
            {value: 0, url: 'http://192.168.2.0:82', title: '新增', type: 3},
            {value: 1, url: 'http://192.168.2.199:82', title: '批量修改', type: 1},
            {value: 1, url: 'http://192.168.2.199:82', title: '导出', type: 4},
            {value: 1, url: 'http://192.168.2.199:82', title: '导入', type: 5},
        ],
        //表格按钮的数据载体，单独手动编写
        //index 为需要放在的表格位置，-1为倒数位置。dom为要展示的结构。title为表头标题
        //当有index 为负数时候必须添加name值 否则该index所属的对象不会生效 表头与表体通过name关联
        tbodyButtonArray: [],
        //地址数据集合载体
        urlObj: {
            url: 'policy/dataCh/',
            urlHead: 'header',
            urlBody: 'page',
        },
    },
    AllBaseTable: {
        //基础表格头部按钮数据载体
        //搜索不在其中 因为搜索是必须项
        //value=1，只会传id。value=0，会传整个行的信息。如果是 删除 修改 按钮 则 value:1 代表批量 value:0 代表单行数据
        //type=0 为删除按钮 type=1 修改按钮 type=2 处理按钮 3 新增按钮 4 导出 5导入 默认为2 （只有012345 六个值）
        theadArray: [
            {value: 0, url: 'http://192.168.2.0:82', title: '新增', type: 3},
            {value: 1, url: 'http://192.168.2.199:82', title: '批量修改', type: 1},
            {value: 1, url: 'http://192.168.2.199:82', title: '导出', type: 4},
            {value: 1, url: 'http://192.168.2.199:82', title: '导入', type: 5},
        ],
        //表格按钮的数据载体，单独手动编写
        //index 为需要放在的表格位置，-1为倒数位置。dom为要展示的结构。title为表头标题
        //当有index 为负数时候必须添加name值 否则该index所属的对象不会生效 表头与表体通过name关联
        tbodyButtonArray: [],
        //地址数据集合载体
        urlObj: {
            url: 'policy/dataCh/',
            urlHead: 'header',
            urlBody: 'page',
        },
    },
    baseTableFour: {
        //基础表格头部按钮数据载体
        //搜索不在其中 因为搜索是必须项
        //value=1，只会传id。value=0，会传整个行的信息。如果是 删除 修改 按钮 则 value:1 代表批量 value:0 代表单行数据
        //type=0 为删除按钮 type=1 修改按钮 type=2 处理按钮 3 新增按钮 4 导出 5导入 默认为2 （只有012345 六个值）
        theadArray: [
            {value: 0, url: 'http://192.168.2.0:82', title: '新增', type: 3},
            {value: 1, url: 'http://192.168.2.199:82', title: '批量修改', type: 1},
            {value: 1, url: 'http://192.168.2.199:82', title: '导出', type: 4},
            {value: 1, url: 'http://192.168.2.199:82', title: '导入', type: 5},
        ],
        //表格按钮的数据载体，单独手动编写
        //index 为需要放在的表格位置，-1为倒数位置。dom为要展示的结构。title为表头标题
        //当有index 为负数时候必须添加name值 否则该index所属的对象不会生效 表头与表体通过name关联
        tbodyButtonArray: [],
        //地址数据集合载体
        urlObj: {
            url: 'common/order/',
            urlHead: 'header',
            urlBody: 'page',
        },
    },
    data_ch: {
        //基础表格头部按钮数据载体
        //搜索不在其中 因为搜索是必须项
        //value=1，只会传id。value=0，会传整个行的信息。如果是 删除 修改 按钮 则 value:1 代表批量 value:0 代表单行数据
        //type=0 为删除按钮 type=1 修改按钮 type=2 处理按钮 3 新增按钮 4 导出 5导入 默认为2 （只有012345 六个值）
        theadArray:
            [
                {value: 1, url: '/policy/dataCh/edits', title: '批量删除', type: 0}
            ],
        //表格按钮的数据载体，单独手动编写
        //index 为需要放在的表格位置，-1为倒数位置。dom为要展示的结构。title为表头标题
        //当有index 为负数时候必须添加name值 否则该index所属的对象不会生效 表头与表体通过name关联
        tbodyButtonArray: [
            {index: 0, name: 'tableIndex', dom: 'input'},
            {index: 4, dom: 'date'},
            {index: 5, buttonSort: true}
        ],
        //地址数据集合载体
        urlObj: {
            url: 'policy/base/DataCh/',
            urlHead: 'header',
            urlBody: 'page',
            //新增功能函数地址
            addUrl: 'addUrladdUrladdUrl',
            //修改按钮函数地址
            changeUrl: 'changeUrlchangeUrl',
            urlBodyPostObj: [{
                "name": "lasttime",
                "type": "orderByDesc",
                "value": "",
                default: true,
            }]
        },
    },
    data_aq: {
        theadArray:
            [
                {value: 1, url: '/policy/dataCh/edits', title: '批量删除', type: 0}
            ],
        tbodyButtonArray: [
            {index: 0, name: 'tableIndex', dom: 'input'},
            {index: 4, dom: 'date'},
            {index: 5, buttonSort: true}
        ],
        //地址数据集合载体
        urlObj: {
            url: 'policy/base/DataAq/',
            urlHead: 'header',
            urlBody: 'page',
            //新增功能函数地址
            addUrl: 'addUrladdUrladdUrl',
            //修改按钮函数地址
            changeUrl: 'changeUrlchangeUrl',
            urlBodyPostObj: [{
                "name": "lasttime",
                "type": "orderByDesc",
                "value": ""
            }]
        },
    },
    data_ows: {
        theadArray:
            [
                {value: 1, url: '/policy/dataCh/edits', title: '批量删除', type: 0}
            ],
        tbodyButtonArray: [
            {index: 0, name: 'tableIndex', dom: 'input'},
            {index: 4, dom: 'date'},
            {index: 5, buttonSort: true}
        ],
        //地址数据集合载体
        urlObj: {
            url: 'policy/base/Donot/',
            urlHead: 'header',
            urlBody: 'page',
            //新增功能函数地址
            addUrl: 'addUrladdUrladdUrl',
            //修改按钮函数地址
            changeUrl: 'changeUrlchangeUrl',
            urlBodyPostObj: [{
                "name": "lasttime",
                "type": "orderByDesc",
                "value": ""
            }]
        },
    },
    data_pn: {
        theadArray:
            [
                {value: 1, url: '/policy/dataCh/edits', title: '批量删除', type: 0}
            ],
        tbodyButtonArray: [
            {index: 0, name: 'tableIndex', dom: 'input'},
            {index: 4, dom: 'date'},
            {index: 5, buttonSort: true}
        ],
        //地址数据集合载体
        urlObj: {
            url: 'policy/base/DataPn/',
            urlHead: 'header',
            urlBody: 'page',
            urlBodyPostObj: [{
                "name": "lasttime",
                "type": "orderByDesc",
                "value": ""
            }]
        },
    },
    data_gs: {
        theadArray:
            [
                {value: 1, url: '/policy/dataCh/edits', title: '批量删除', type: 0}
            ],
        tbodyButtonArray: [
            {index: 0, name: 'tableIndex', dom: 'input'},
            {index: 4, dom: 'date'},
            {index: 5, buttonSort: true}
        ],
        //地址数据集合载体
        urlObj: {
            url: 'policy/base/DataGs/',
            urlHead: 'header',
            urlBody: 'page',
            urlBodyPostObj: [{
                "name": "lasttime",
                "type": "orderByDesc",
                "value": ""
            }]
        },
    },
    data_uq: {
        theadArray:
            [
                {value: 1, url: '/policy/dataCh/edits', title: '批量删除', type: 0}
            ],
        tbodyButtonArray: [
            {index: 0, name: 'tableIndex', dom: 'input'},
            {index: 4, dom: 'date'},
            {index: 5, buttonSort: true}
        ],
        //地址数据集合载体
        urlObj: {
            url: 'policy/base/DataUq/',
            urlHead: 'header',
            urlBody: 'page',
            urlBodyPostObj: [{
                "name": "lasttime",
                "type": "orderByDesc",
                "value": ""
            }]
        },
    },
    data_tv: {
        theadArray:
            [
                {value: 1, url: '/policy/dataCh/edits', title: '批量删除', type: 0}
            ],
        tbodyButtonArray: [
            {index: 0, name: 'tableIndex', dom: 'input'},
            {index: 4, dom: 'date'},
            {index: 5, buttonSort: true}
        ],
        //地址数据集合载体
        urlObj: {
            url: 'policy/base/DataTv/',
            urlHead: 'header',
            urlBody: 'page',
            urlBodyPostObj: [{
                "name": "lasttime",
                "type": "orderByDesc",
                "value": ""
            }]

        },
    },
    ttrCheck: {
        //基础表格头部按钮数据载体
        //搜索不在其中 因为搜索是必须项
        //value=1，只会传id。value=0，会传整个行的信息。如果是 删除 修改 按钮 则 value:1 代表批量 value:0 代表单行数据
        //type=0 为删除按钮 type=1 修改按钮 type=2 处理按钮 3 新增按钮 4 导出 5导入 默认为2 （只有012345 六个值）
        theadArray: [
            {value: 0, url: 'common/base/DirectOrder/save', title: '新增', type: 3},
            {value: 1, url: 'common/ttrCheck/edits', title: '批量修改', type: 1},
            // {value:1,url:'http://192.168.2.199:82',title:'导出',type:4},
            // {value:1,url:'http://192.168.2.199:82',title:'导入',type:5},
        ],
        //表格按钮的数据载体，单独手动编写
        //index 为需要放在的表格位置，-1为倒数位置。dom为要展示的结构。title为表头标题
        //当有index 为负数时候必须添加name值 否则该index所属的对象不会生效 表头与表体通过name关联
        tbodyButtonArray: [
            {index: 0, dom: 'input', name: 'tableIndex'},
            // {index: 0, dom: 'input'},
            {index: 2, buttonSort: true},
            {index: 8, buttonSort: true},
            {index: 5, dom: 'date'},
            {
                dom: 'buttonArray', title: '操作', name: 'button', index: -1, array: [
                    {value: 1, url: 'common/order/place', title: '重订', type: 2},
                    {value: 1, url: 'common/order/place', title: '删除', type: 0},
                    {value: 1, url: 'common/order/pay', title: '重付', type: 2},
                    {value: 0, url: 'xxxxx', title: '重回123456'},
                ]
            },
        ],
        //地址数据集合载体
        urlObj: {
            url: 'common/base/DirectOrder/',
            urlHead: 'header',
            urlBody: 'page',
            urlBodyPostObj: [{
                "name": "create_order_time",
                "type": "orderByDesc",
                "value": ""
            }]
        },
    },
    xss9cToufang: {
        theadArray: [],
        //表格按钮的数据载体，单独手动编写
        //index 为需要放在的表格位置，-1为倒数位置。dom为要展示的结构。title为表头标题
        //当有index 为负数时候必须添加name值 否则该index所属的对象不会生效 表头与表体通过name关联
        tbodyButtonArray: [
            //name 在index 为负数时候,必填。且不同的index，name值不能一样 建议有序递增 例如 button2 button3
            //value=1，只会传id。value=0，会传整个行的信息。
            //如果是 删除 修改 按钮 则 value:1 代表批量 value:0 代表单行数据
            //type=0 为删除按钮 type=1 修改按钮 type=2 处理按钮 不填 默认为2 （只有012 三个值）
        ],
        //地址数据集合载体
        urlObj: {
            url: 'policy/base/PutData/',
            urlHead: 'header',
            urlBody: 'page',
            urlBodyPostObj: [
                // ":eq": '1',
                // "date:between":"#{systemCurrentTime}|#{baseSCTAfterYear}",
                {
                    "name": "platform",
                    "type": "eq",
                    "value": "1",
                    "isUpdate": true
                },
                {
                    "name": "date",
                    "type": "between",
                    "value": "#{systemCurrentTime},#{baseSCTAfterYear}"
                }
            ]
        },
    },
    xss9cPolicy: {
        theadArray: [
            {value: 0, url: 'policy/base/Policy/save', title: '新增', type: 3},
        ],
        //表格按钮的数据载体，单独手动编写
        //index 为需要放在的表格位置，-1为倒数位置。dom为要展示的结构。title为表头标题
        //当有index 为负数时候必须添加name值 否则该index所属的对象不会生效 表头与表体通过name关联
        tbodyButtonArray: [
            //name 在index 为负数时候,必填。且不同的index，name值不能一样 建议有序递增 例如 button2 button3
            //value=1，只会传id。value=0，会传整个行的信息。
            //如果是 删除 修改 按钮 则 value:1 代表批量 value:0 代表单行数据
            //type=0 为删除按钮 type=1 修改按钮 type=2 处理按钮 不填 默认为2 （只有012 三个值）
            {
                dom: 'buttonArray', title: '操作', name: 'button2', index: -1, array: [
                    {value: 1, url: 'http://192.168.2.199/policy/base/Policy/del', title: '删除', type: 0},
                ]
            }
        ],
        //地址数据集合载体
        urlObj: {
            url: 'policy/base/Policy/',
            urlHead: 'header',
            urlBody: 'page',
            urlBodyPostObj: [
                {
                    "name": "platform",
                    "type": "eq",
                    "value": "1",
                    "isUpdate": true
                }
            ]
        }
    },
    ttr9cToufang: {
        theadArray: [],
        tbodyButtonArray: [
            {index: 0, name: 'tableIndex', dom: 'input'}
        ],
        //地址数据集合载体
        urlObj: {
            url: 'policy/base/PutData/',
            urlHead: 'header',
            urlBody: 'page',
            urlBodyPostObj: [
                {
                    "name": "platform",
                    "type": "eq",
                    "value": "20",
                    "isUpdate": true
                },
                {
                    "name": "date",
                    "type": "between",
                    "value": "#{systemCurrentTime},#{baseSCTAfterYear}"
                }
            ]
        },
    },
    ttr9cPolicy: {
        theadArray: [
            {value: 0, url: '/add', title: '新增', type: 3},
        ],
        tbodyButtonArray: [
            {index: 0, name: 'tableIndex', dom: 'input'}
        ],
        //地址数据集合载体
        urlObj: {
            url: 'policy/base/Policy/',
            urlHead: 'header',
            urlBody: 'page',
            urlBodyPostObj: [
                {
                    "name": "platform",
                    "type": "eq",
                    "value": "20",
                    "isUpdate": true
                }
            ]
        }
    },
    order: {
        theadArray: [
            {value: 1, url: 'common/order/place', title: '批量删除', type: 0},
            {value: 0, url: 'http://192.168.2.199:82', title: '新增', type: 3},
            {value: 1, url: 'common/base/Order/updateBatch', title: '批量修改', type: 1},
            {value: 1, url: 'http://192.168.2.199:82', title: '导出', type: 4},
            {value: 1, url: 'http://192.168.2.199:82', title: '导入', type: 5},
        ],
        //表格按钮的数据载体，单独手动编写
        //index 为需要放在的表格位置，-1为倒数位置。dom为要展示的结构。title为表头标题
        //当有index 为负数时候必须添加name值 否则该index所属的对象不会生效 表头与表体通过name关联
        tbodyButtonArray: [
            {dom: 'input', index: 0},
            {dom: 'date', index: 5,},
            {dom: 'date', index: 7},
            //name 在index 为负数时候,必填。且不同的index，name值不能一样 建议有序递增 例如 button2 button3
            //value=1，只会传id。value=0，会传整个行的信息。
            //如果是 删除 修改 按钮 则 value:1 代表批量 value:0 代表单行数据
            //type=0 为删除按钮 type=1 修改按钮 type=2 处理按钮 不填 默认为2 （只有012 三个值）
            {
                dom: 'buttonArray', title: '操作', name: 'button', index: -1, array: [
                    {value: 1, url: 'common/order/place', title: '重订', type: 2},
                    {value: 1, url: 'common/order/pay', title: '重付', type: 2},
                    {value: 0, url: 'xxxxx', title: '重回123456'},
                ]
            },
            {
                dom: 'buttonArray', title: '操作', name: 'button2', index: -2, array: [
                    {value: 1, url: 'http://192.168.2.19', title: '删除', type: 0},
                ]
            }
        ],
        //地址数据集合载体
        urlObj: {
            url: 'common/base/Order/',
            urlHead: 'header',
            urlBody: 'page',
            //新增功能函数地址
            addUrl: 'addUrladdUrladdUrl',
            //修改按钮函数地址
            changeUrl: 'changeUrlchangeUrl',
            urlBodyPostObj: [{
                "name": "platform_time",
                "type": "orderByDesc",
                "value": ""
            }]
        }
    }
}

