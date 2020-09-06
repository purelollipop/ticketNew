
<!--
    让后台能自己生成页面的Base页面，仅用于后台普通展示适用。
    若业务逻辑复杂，请自己编写组件。
-->
<script>
    export default {
        name: "BaseTablesNotFunctional",
        /*functional:true,*/
        props:['data',
            /*"sortFun",
            "deletData",
            "changeData",
            "allInput",
            "aloneInput",
            "dealFun",
            "logFun",*/
        ],
        render(h) {
            if(!this.data.tbodyButtonArray){return};
            //width:this.data.tableWidth
            return h('div',{style:{}},[h('table',{class:{upup_Table:true}},[
                //colgroup
                h('colgroup',{},[this.data.tbodyButtonArray.map((item)=>{
                    if(item.width){
                        return h('col',{style:{width:item.width+'px'}})
                    }else{
                        return h('col',{style:{width:'auto',}})
                    }
                })]),
                //thead
                h('thead',{},[h('tr',{class:{headBorder:true}},
                    [
                        this.data.tbodyButtonArray.map((item,index)=>{
                            if(item.show){
                                //判断该项和列是否能使用input，
                                if(item.dom === 'input'){
                                    //需要排序
                                    if (item.sort) {
                                        return h('th',{},[
                                            h('label',{
                                                on:{
                                                    change:e => {
                                                        return this.$emit('allInput')
                                                    }
                                                },
                                                style:{display:'inline-block'}
                                            },[
                                                h('input',{
                                                    domProps:{},
                                                    attrs:{type:'checkbox'},
                                                    class:{allInput:true}
                                                }),
                                                h('span',{domProps:{innerHTML:item.name}})
                                            ]),
                                            h('div',{
                                                style:{display:'inline-block'},
                                                attrs:{
                                                    'data-title':item.name,
                                                    'data-sort':item.sort,
                                                    'data-name':item.fieldName,
                                                },
                                                on:{
                                                    click: e => {
                                                        this.$emit('sortFun')
                                                    }
                                                }
                                            },[
                                                Array.apply(null,{length:2}).map((ele,index)=>{
                                                    return h('div',{
                                                            style:{display:'inline-block',position:'relative',cursor:'pointer'},},
                                                        [
                                                            h('Icon',{
                                                                attrs:{type:"md-arrow-dropup"},
                                                                style:{position:'absolute',bottom:'2px',},
                                                                class:{iconUpColor:item.sort===1?true:false}
                                                            }),
                                                            h('Icon',{
                                                                attrs:{type:"md-arrow-dropdown"},
                                                                style:{position:'absolute',top:'-6px',},
                                                                class:{iconDownColor:item.sort===2?true:false}
                                                            })
                                                        ])
                                                })
                                            ])
                                        ])
                                    }
                                    //不需要排序
                                    else{
                                        return h('th',{},[
                                            h('label',{
                                                on:{
                                                    change:e => {
                                                        this.$emit('allInput')
                                                    }
                                                },
                                            },[
                                                h('input',{
                                                    domProps:{},
                                                    attrs:{type:'checkbox'},
                                                    class:{allInput:true}
                                                }),
                                                // <Checkbox v-model="single">Checkbox</Checkbox>
                                                h('span',{domProps:{innerHTML:item.name}})
                                            ])
                                        ])
                                    }
                                    //0为不能排序
                                }
                                //判断是否要排序
                                else if(item.sort){
                                    //当使用排序功能时 返回th
                                    //th下包含div,div包含一个span和两个icon
                                    /*div触发排序函数，函数通过dataset获取触发id和触发查询条件*/
                                    return h('th',{
                                        style:{}
                                    },[
                                        h('div',{
                                            style:{},
                                            attrs:{
                                                'data-title':item.name,
                                                'data-sort':item.sort,
                                                'data-name':item.fieldName,
                                            },
                                            on:{
                                                click:()=>{
                                                   return this.$emit('sortFun')
                                                }
                                            }
                                        },[
                                            Array.apply(null,{length:2}).map((ele,index)=>{
                                                //0位总是展示span 排在可排序按钮前面
                                                if(!index){
                                                    return h('span',{
                                                        class:{},
                                                        domProps:{innerHTML:item.name},
                                                        style:{cursor:'pointer'},
                                                    })
                                                }else{
                                                    return h('div',{
                                                            style:{display:'inline-block',position:'relative'},},
                                                        [
                                                            h('Icon',{
                                                                attrs:{type:"md-arrow-dropup"},
                                                                style:{position:'absolute',bottom:'2px',},
                                                                class:{iconUpColor:item.sort===1?true:false}
                                                            }),
                                                            h('Icon',{
                                                                attrs:{type:"md-arrow-dropdown"},
                                                                style:{position:'absolute',top:'-6px',},
                                                                class:{iconDownColor:item.sort===2?true:false}
                                                            })
                                                        ])
                                                }
                                            })
                                        ])
                                    ])
                                }
                                //普通展示
                                else{
                                    return h('th',{domProps:{innerHTML:item.name}},[])
                                }
                            }
                        })]
                )]),
                //tbody
                h('tbody',{},this.data.tdObj.records.map((tbody,index)=>{
                    tbody.tableIndex = '';
                    return h('tr',{class:{upup_Table_tr:true}},[this.data.tbodyButtonArray.map((headAloneObj)=>{
                        if(headAloneObj.show){
                            if(headAloneObj.mergeFlag){
                                return h('td',{},headAloneObj.mergeList.map((listVal,listIndex)=>{
                                    for(let it in tbody){
                                        if(it === listVal.name){
                                            /*if(listVal.list){
                                                let htmlText = '';
                                                for (let i = 0; i < listVal.list.length; i++) {
                                                    if(tbody[it] == listVal.list[i].v*1){
                                                        htmlText = listVal.list[i].t
                                                    }
                                                }
                                                //button 为渲染特别选项的关键词 因为在headAloneObj 最后一项插入了button 所以能 dom == buttonArray
                                                //特殊头中需要渲染input
                                                if(listVal.dom==='input'){
                                                    if(listVal.name==='tableIndex') {
                                                        return h('td',{},
                                                            h('label',{attrs:{},},
                                                                [
                                                                    h('input',{
                                                                        domProps:{},
                                                                        attrs:{'data-id':tbody.id,type:'checkbox'},
                                                                        class:{checkBox:true},
                                                                        on:{
                                                                            input : e => {
                                                                                return this.$emit('aloneInput')
                                                                            }
                                                                        }
                                                                    }),
                                                                    h('span',{domProps:{innerHTML:index*1+[(this.data.tdObj.current*1-1)*this.data.tdObj.size]*1+1}})
                                                                ]))
                                                    }
                                                    else{
                                                        return h('td',{},[
                                                            h('label',{
                                                                attrs:{},
                                                            },[
                                                                h('input',{
                                                                    domProps:{},
                                                                    attrs:{'data-id':tbody.id,type:'checkbox'},
                                                                    class:{checkBox:true},
                                                                    on:{
                                                                        input : e => {
                                                                            return this.$emit('aloneInput')
                                                                        }
                                                                    }
                                                                }),
                                                                h('span',{domProps:{innerHTML:tbody[it],}})
                                                            ])
                                                        ])
                                                    }
                                                }
                                                //日志
                                                else if(listVal.dom==='date'){
                                                    return h('td',{
                                                            style:{color: '#3385FF',cursor:'pointer'},
                                                        },[
                                                            h('span',{
                                                                domProps:{innerHTML:htmlText},
                                                                attrs:{'data-id':tbody.id,},
                                                                style:{marginLeft:'2px'},
                                                                on:{
                                                                    click:()=>{
                                                                        return this.$emit('logFun')
                                                                    }
                                                                },
                                                            })
                                                        ]
                                                    )
                                                }
                                                //后台配置的处理按钮 或 前端统一配置对象的处理按钮
                                                else if(listVal.dom==='buttonArray'){
                                                    let buttonArray = listVal.array;
                                                    return h('td',{},
                                                        Array.apply(null,{length:buttonArray.length}).map((ele,index)=>{
                                                            return h('button',{
                                                                domProps:{innerHTML:htmlText},
                                                                class:{buttonA:true},
                                                                attrs:{'data-id':tbody.id,},
                                                                style:{marginLeft:'2px'},
                                                                on:{
                                                                    click:()=>{
                                                                        //当为0 为删除按钮
                                                                        if(buttonArray[index].type===0){
                                                                            return this.$emit('deletData',0,buttonArray[index].url,tbody)
                                                                        }
                                                                        //当为1 为修改按钮
                                                                        else if(buttonArray[index].type===1){
                                                                            return this.$emit('changeData',0,buttonArray[index].url,buttonArray[index].value,tbody)
                                                                        }
                                                                        //当为2 为处理按钮
                                                                        else{
                                                                            return this.$emit('dealFun',buttonArray[index].url,buttonArray[index].value,tbody)
                                                                        }
                                                                    }
                                                                },
                                                            })
                                                        })
                                                    )
                                                }
                                                //序号渲染
                                                else if(listVal.name==='tableIndex') {
                                                    return h('td',{
                                                        domProps:{innerHTML:index*1+[(this.data.tdObj.current*1-1)*this.data.tdObj.size]*1+1}
                                                    })
                                                }
                                                //普通头渲染
                                                else{
                                                    return h('td',{
                                                        domProps:{innerHTML:htmlText}
                                                    })
                                                }
                                            }
                                            else{
                                                //button 为渲染特别选项的关键词 因为在headAloneObj 最后一项插入了button 所以能 dom == buttonArray
                                                //特殊头中需要渲染input
                                                if(listVal.dom==='input'){
                                                    if(listVal.name==='tableIndex') {
                                                        return h('td',{}, [
                                                            h('label',{
                                                                attrs:{},
                                                            },[
                                                                h('input',{
                                                                    domProps:{},
                                                                    attrs:{'data-id':tbody.id,type:'checkbox'},
                                                                    class:{checkBox:true},
                                                                    on:{
                                                                        input : e => {
                                                                            return this.$emit('aloneInput')
                                                                        }

                                                                    }
                                                                }),
                                                                h('span',{domProps:{innerHTML:index*1+[(this.data.tdObj.current*1-1)*this.data.tdObj.size]*1+1}})
                                                            ])
                                                        ])
                                                    }
                                                    else{
                                                        return h('td',{},[
                                                            h('label',{
                                                                attrs:{},
                                                            },[
                                                                h('input',{
                                                                    domProps:{},
                                                                    attrs:{'data-id':tbody.id,type:'checkbox'},
                                                                    class:{checkBox:true},
                                                                    on:{
                                                                        input : e => {
                                                                            return this.$emit('aloneInput')
                                                                        }

                                                                    }
                                                                }),
                                                                h('span',{domProps:{innerHTML:tbody[it],}})
                                                            ])
                                                        ])
                                                    }
                                                }
                                                //日志
                                                else if(listVal.dom==='date'){
                                                    return h('td',{
                                                            style:{color: '#3385FF',cursor:'pointer'},
                                                        },[
                                                            h('span',{
                                                                domProps:{innerHTML:tbody[it]},
                                                                attrs:{'data-id':tbody.id,},
                                                                style:{marginLeft:'2px'},
                                                                on:{
                                                                    click:()=>{
                                                                        return this.$emit('logFun')
                                                                    }
                                                                },
                                                            })
                                                        ]
                                                    )
                                                }
                                                //后台配置的处理按钮 或 前端统一配置对象的处理按钮
                                                else if(listVal.dom==='buttonArray'){
                                                    let buttonArray = listVal.array;
                                                    /!*console.log(tbody[it])
                                                    console.log(listVal)*!/
                                                    return h('td',{},
                                                        Array.apply(null,{length:buttonArray.length}).map((ele,index)=>{
                                                            return h('button',{
                                                                domProps:{innerHTML:buttonArray[index].title},
                                                                class:{buttonA:true},
                                                                attrs:{'data-id':tbody.id,},
                                                                style:{marginLeft:'2px'},
                                                                on:{
                                                                    click:()=>{
                                                                        //当为0 为删除按钮
                                                                        if(buttonArray[index].type===0){
                                                                            return this.$emit('deletData',0,buttonArray[index].url,tbody)
                                                                        }
                                                                        //当为1 为修改按钮
                                                                        else if(buttonArray[index].type===1){
                                                                            return this.$emit('changeData',0,buttonArray[index].url,buttonArray[index].value,tbody)
                                                                        }
                                                                        //当为2 为处理按钮
                                                                        else{
                                                                            return this.$emit('dealFun',buttonArray[index].url,buttonArray[index].value,tbody)
                                                                        }
                                                                    }
                                                                },
                                                            })
                                                        })
                                                    )
                                                }
                                                //序号渲染
                                                else if(listVal.name==='tableIndex') {
                                                    return h('td',{
                                                        domProps:{innerHTML:index*1+[(this.data.tdObj.current*1-1)*this.data.tdObj.size]*1+1}
                                                    })
                                                }
                                                //普通头渲染
                                                else{
                                                    console.log('chufa')
                                                    console.log(tbody[it])
                                                    return h('td',{
                                                        domProps:{innerHTML:tbody[it]}
                                                    })
                                                }
                                            }*/


                                            // let htmlText = '';
                                            // for (let i = 0; i < listVal.list.length; i++) {
                                            //     if(tbody[it] == listVal.list[i].v*1){
                                            //         htmlText = listVal.list[i].t
                                            //     }
                                            // }
                                            if(listVal.breakIsDom){
                                                return h('br',{
                                                })
                                            }else{
                                                let htmlText = '';
                                                if(listVal.list){
                                                    for (let i = 0; i < listVal.list.length; i++) {
                                                        if(tbody[it] == listVal.list[i].v*1){
                                                            htmlText = listVal.list[i].t
                                                        }
                                                    }
                                                    return h('span',{
                                                        domProps:{innerHTML:htmlText,title:listVal.name},
                                                        style:{margin:'0 2px',cursor:'pointer'}
                                                    })
                                                }else{
                                                    return h('span',{
                                                        domProps:{innerHTML:tbody[it],title:listVal.name},
                                                        style:{margin:'0 2px',cursor:'pointer'}
                                                    })
                                                }

                                            }
                                        }
                                    }
                                }))
                            }else{
                                for(let it in tbody){
                                    if(!tbody.hasOwnProperty(headAloneObj.fieldName)){
                                        return h('td',{domProps:{innerHTML:''}})
                                    }
                                    //body的值必须与头对应才能渲染
                                    else if(it === headAloneObj.fieldName){
                                        //根据表头中是否要解析展示来判断
                                        if(headAloneObj.list){
                                            let htmlText = '';
                                            for (let i = 0; i < headAloneObj.list.length; i++) {
                                                if(tbody[it] == headAloneObj.list[i].v*1){
                                                    htmlText = headAloneObj.list[i].t
                                                }
                                            }
                                            //button 为渲染特别选项的关键词 因为在headAloneObj 最后一项插入了button 所以能 dom == buttonArray
                                            //特殊头中需要渲染input
                                            if(headAloneObj.dom==='input'){
                                                if(headAloneObj.fieldName==='tableIndex') {
                                                    return h('td',{},
                                                        h('label',{attrs:{},},
                                                            [
                                                                h('input',{
                                                                    domProps:{},
                                                                    attrs:{'data-id':tbody.id,type:'checkbox'},
                                                                    class:{checkBox:true},
                                                                    on:{
                                                                        input : e => {
                                                                            return this.$emit('aloneInput')
                                                                        }
                                                                    }
                                                                }),
                                                                h('span',{domProps:{innerHTML:index*1+[(this.data.tdObj.current*1-1)*this.data.tdObj.size]*1+1}})
                                                            ]))
                                                }
                                                else{
                                                    return h('td',{},[
                                                        h('label',{
                                                            attrs:{},
                                                        },[
                                                            h('input',{
                                                                domProps:{},
                                                                attrs:{'data-id':tbody.id,type:'checkbox'},
                                                                class:{checkBox:true},
                                                                on:{
                                                                    input : e => {
                                                                        return this.$emit('aloneInput')
                                                                    }
                                                                }
                                                            }),
                                                            h('span',{domProps:{innerHTML:tbody[it],}})
                                                        ])
                                                    ])
                                                }
                                            }
                                            //日志
                                            else if(headAloneObj.dom==='date'){
                                                return h('td',{
                                                        style:{color: '#3385FF',cursor:'pointer'},
                                                    },[
                                                        h('span',{
                                                            domProps:{innerHTML:htmlText},
                                                            attrs:{'data-id':tbody.id,},
                                                            style:{marginLeft:'2px'},
                                                            on:{
                                                                click:()=>{
                                                                    return this.$emit('logFun')
                                                                }
                                                            },
                                                        })
                                                    ]
                                                )
                                            }
                                            //后台配置的处理按钮 或 前端统一配置对象的处理按钮
                                            else if(headAloneObj.dom==='buttonArray'){
                                                let buttonArray = headAloneObj.array;
                                                return h('td',{},
                                                    Array.apply(null,{length:buttonArray.length}).map((ele,index)=>{
                                                        return h('button',{
                                                            domProps:{innerHTML:htmlText},
                                                            class:{buttonA:true},
                                                            attrs:{'data-id':tbody.id,},
                                                            style:{marginLeft:'2px'},
                                                            on:{
                                                                click:()=>{
                                                                    //当为0 为删除按钮
                                                                    if(buttonArray[index].type===0){
                                                                        return this.$emit('deletData',0,buttonArray[index].url,tbody)
                                                                    }
                                                                    //当为1 为修改按钮
                                                                    else if(buttonArray[index].type===1){
                                                                        return this.$emit('changeData',0,buttonArray[index].url,buttonArray[index].value,tbody)
                                                                    }
                                                                    //当为2 为处理按钮
                                                                    else{
                                                                        return this.$emit('dealFun',buttonArray[index].url,buttonArray[index].value,tbody)
                                                                    }
                                                                }
                                                            },
                                                        })
                                                    })
                                                )
                                            }
                                            //序号渲染
                                            else if(headAloneObj.fieldName==='tableIndex') {
                                                return h('td',{
                                                    domProps:{innerHTML:index*1+[(this.data.tdObj.current*1-1)*this.data.tdObj.size]*1+1}
                                                })
                                            }
                                            //普通头渲染
                                            else{
                                                return h('td',{
                                                    domProps:{innerHTML:htmlText}
                                                })
                                            }
                                        }
                                        else{
                                            //button 为渲染特别选项的关键词 因为在headAloneObj 最后一项插入了button 所以能 dom == buttonArray
                                            //特殊头中需要渲染input
                                            if(headAloneObj.dom==='input'){
                                                if(headAloneObj.fieldName==='tableIndex') {
                                                    return h('td',{}, [
                                                        h('label',{
                                                            attrs:{},
                                                        },[
                                                            h('input',{
                                                                domProps:{},
                                                                attrs:{'data-id':tbody.id,type:'checkbox'},
                                                                class:{checkBox:true},
                                                                on:{
                                                                    input : e => {
                                                                        return this.$emit('aloneInput')
                                                                    }

                                                                }
                                                            }),
                                                            h('span',{domProps:{innerHTML:index*1+[(this.data.tdObj.current*1-1)*this.data.tdObj.size]*1+1}})
                                                        ])
                                                    ])
                                                }
                                                else{
                                                    return h('td',{},[
                                                        h('label',{
                                                            attrs:{},
                                                        },[
                                                            h('input',{
                                                                domProps:{},
                                                                attrs:{'data-id':tbody.id,type:'checkbox'},
                                                                class:{checkBox:true},
                                                                on:{
                                                                    input : e => {
                                                                        return this.$emit('aloneInput')
                                                                    }
                                                                }
                                                            }),
                                                            h('span',{domProps:{innerHTML:tbody[it],}})
                                                        ])
                                                    ])
                                                }
                                            }
                                            //日志
                                            else if(headAloneObj.dom==='date'){
                                                return h('td',{
                                                        style:{color: '#3385FF',cursor:'pointer'},
                                                    },[
                                                        h('span',{
                                                            domProps:{innerHTML:tbody[it]},
                                                            attrs:{'data-id':tbody.id,},
                                                            style:{marginLeft:'2px'},
                                                            on:{
                                                                click:()=>{
                                                                    return this.$emit('logFun')
                                                                }
                                                            },
                                                        })
                                                    ]
                                                )
                                            }
                                            //后台配置的处理按钮 或 前端统一配置对象的处理按钮
                                            else if(headAloneObj.dom==='buttonArray'){
                                                let buttonArray = headAloneObj.array;
                                                /*console.log(tbody[it])
                                                console.log(headAloneObj)*/
                                                return h('td',{},
                                                    Array.apply(null,{length:buttonArray.length}).map((ele,index)=>{
                                                        return h('button',{
                                                            domProps:{innerHTML:buttonArray[index].title},
                                                            class:{buttonA:true},
                                                            attrs:{'data-id':tbody.id,},
                                                            style:{marginLeft:'2px'},
                                                            on:{
                                                                click:()=>{
                                                                    //当为0 为删除按钮
                                                                    if(buttonArray[index].type===0){
                                                                        return this.$emit('deletData',0,buttonArray[index].url,tbody)
                                                                    }
                                                                    //当为1 为修改按钮
                                                                    else if(buttonArray[index].type===1){
                                                                        return this.$emit('changeData',0,buttonArray[index].url,buttonArray[index].value,tbody)
                                                                    }
                                                                    //当为2 为处理按钮
                                                                    else{
                                                                        return this.$emit('dealFun',buttonArray[index].url,buttonArray[index].value,tbody)
                                                                    }
                                                                }
                                                            },
                                                        })
                                                    })
                                                )
                                            }
                                            //序号渲染
                                            else if(headAloneObj.fieldName==='tableIndex') {
                                                return h('td',{
                                                    domProps:{innerHTML:index*1+[(this.data.tdObj.current*1-1)*this.data.tdObj.size]*1+1}
                                                })
                                            }
                                            //普通头渲染
                                            else{
                                                return h('td',{
                                                    domProps:{innerHTML:tbody[it]}
                                                })
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        // 循环生成表格主要根据表头的name 和 表格中列的对象的属性名 通过是否对应 来渲染此格
                        //tbody 是tbody对象 循环出对象key
                    })])
                })),
            ])])
        },
    }
</script>

<style scoped>
    .red{
        color: red;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;

    }
    .upup_Table{
        width: 100%;
        overflow-X:scroll;
        background-color: white;

    }
    .headBorder>th{
        height: 30px;
        border: 1px rgb(153, 197, 232) solid;
        text-align: center;
        background-color: #E4F1F8;
    }
    .upup_Table_tr{
        height: 40px;

    }
    .upup_Table_tr>td{
        border: 1px rgb(153, 197, 232) solid;
        text-align: center;
        /*word-break:break-all;*/
    }
    .upup_Table_tr:hover{
        background-color: #E4F1F8;
    }
    .iconUpColor{
        color: red;
    }
    .iconDownColor{
        color: red;
    }
</style>


