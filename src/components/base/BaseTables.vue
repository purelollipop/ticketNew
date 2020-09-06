<!--
    让后台能自己生成页面的Base页面，仅用于后台普通展示适用。
    若业务逻辑复杂，请自己编写组件。
    该组件为纯函数式组件
-->
<script>
export default {
    name: "tables",
    functional:true,
    render(h,context) {
        if(!context.props.data.tbodyButtonArray){return};
        //width:context.props.data.tableWidth
        return h('div',{style:{}},[h('table',{class:{upup_Table:true}},[
                //colgroup
                h('colgroup',{},[context.props.data.tbodyButtonArray.map((item)=>{
                    if(item.width){
                        return h('col',{style:{width:item.width+'px'}})
                    }else{
                        return h('col',{style:{width:'auto',}})
                    }
                })]),
                //thead
                h('thead',{},[h('tr',{class:{headBorder:true}},
                    [
                    context.props.data.tbodyButtonArray.map((item,index)=>{
                        if(!item.hide){
                            //判断该项和列是否能使用input，
                            if(item.dom === 'input'){
                                //需要排序
                                if (item.sort) {
                                    return h('th',{},[
                                        h('label',{
                                            on:{
                                                change:context.listeners.allInput
                                            },
                                            style:{display:'inline-block'}
                                        },[
                                            h('input',{
                                                domProps:{},
                                                attrs:{type:'checkbox'},
                                                class:{allInput:true}
                                            }),
                                            h('span',{domProps:{innerHTML:item.title}})
                                        ]),
                                        h('div',{
                                            style:{display:'inline-block'},
                                            attrs:{
                                                'data-title':item.title,
                                                'data-sort':item.sort,
                                                'data-name':item.name,
                                            },
                                            on:{
                                                click:context.listeners.sortFun
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
                                                change:context.listeners.allInput
                                            },
                                        },[
                                            h('input',{
                                                domProps:{},
                                                attrs:{type:'checkbox'},
                                                class:{allInput:true}
                                            }),
                                            // <Checkbox v-model="single">Checkbox</Checkbox>
                                            h('span',{domProps:{innerHTML:item.title}})
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
                                            'data-title':item.title,
                                            'data-sort':item.sort,
                                            'data-name':item.name,
                                        },
                                        on:{
                                            click:context.listeners.sortFun
                                        }
                                    },[
                                        Array.apply(null,{length:2}).map((ele,index)=>{
                                            //0位总是展示span 排在可排序按钮前面
                                            if(!index){
                                                return h('span',{
                                                    class:{},
                                                    domProps:{innerHTML:item.title},
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
                                return h('th',{domProps:{innerHTML:item.title}},[])
                            }
                        }
                    })]
                )]),
                //tbody
                h('tbody',{},context.props.data.tdObj.records.map((tbody,index)=>{
                    tbody.tableIndex = '';
                return h('tr',{},[context.props.data.tbodyButtonArray.map((headAloneObj)=>{
                    console.log(1232)
                    // 循环生成表格主要根据表头的name 和 表格中列的对象的属性名 通过是否对应 来渲染此格
                    if(!tbody.hasOwnProperty(headAloneObj.name)){
                        return h('td',{domProps:{innerHTML:''}})
                    }
                    //tbody 是tbody对象 循环出对象key
                    for(let it in tbody){
                        //body的值必须与头对应才能渲染
                        if(it === headAloneObj.name){
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
                                    return h('td',{},[
                                        h('label',{
                                            attrs:{},
                                        },[
                                            h('input',{
                                                domProps:{},
                                                attrs:{'data-id':tbody.id,type:'checkbox'},
                                                class:{checkBox:true},
                                                on:{
                                                    click:context.listeners.aloneInput
                                                }
                                            }),
                                            h('span',{domProps:{innerHTML:tbody.id,}})
                                        ])
                                    ])
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
                                                        return context.listeners.logFun()
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
                                                            return context.listeners.deletData(0,buttonArray[index].url,tbody)
                                                        }
                                                        //当为1 为修改按钮
                                                        else if(buttonArray[index].type===1){
                                                            return context.listeners.changeData(0,buttonArray[index].url,buttonArray[index].value,tbody)
                                                        }
                                                        //当为2 为处理按钮
                                                        else{
                                                            return context.listeners.dealFun(buttonArray[index].url,buttonArray[index].value,tbody)
                                                        }
                                                    }
                                                },
                                            })
                                        })
                                    )
                                }
                                //序号渲染
                                else if(headAloneObj.name==='tableIndex') {
                                    return h('td',{
                                        domProps:{innerHTML:index*1+[(context.props.data.tdObj.current*1-1)*context.props.data.tdObj.size]*1+1}
                                    })
                                }
                                //普通头渲染
                                else{
                                    return h('td',{
                                        domProps:{innerHTML:htmlText}
                                    })
                                }
                            }else{
                                //button 为渲染特别选项的关键词 因为在headAloneObj 最后一项插入了button 所以能 dom == buttonArray
                                //特殊头中需要渲染input
                                if(headAloneObj.dom==='input'){
                                    return h('td',{},[
                                        h('label',{
                                            attrs:{},
                                        },[
                                            h('input',{
                                                domProps:{},
                                                attrs:{'data-id':tbody.id,type:'checkbox'},
                                                class:{checkBox:true},
                                                on:{
                                                    click:context.listeners.aloneInput
                                                }
                                            }),
                                            h('span',{domProps:{innerHTML:tbody.id,}})
                                        ])
                                    ])
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
                                                        return context.listeners.logFun()
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
                                                            return context.listeners.deletData(0,buttonArray[index].url,tbody)
                                                        }
                                                        //当为1 为修改按钮
                                                        else if(buttonArray[index].type===1){
                                                            return context.listeners.changeData(0,buttonArray[index].url,buttonArray[index].value,tbody)
                                                        }
                                                        //当为2 为处理按钮
                                                        else{
                                                            return context.listeners.dealFun(buttonArray[index].url,buttonArray[index].value,tbody)
                                                        }
                                                    }
                                                },
                                            })
                                        })
                                    )
                                    /*return h('td',{},headAloneObj.type.map((ele)=>{
                                        return h('button',{
                                            domProps:{innerHTML:ele.name},
                                            style:ele.style,
                                            class:ele.class,
                                            on:{
                                                click:()=>{
                                                    //当为1 意味使用删除
                                                    if(ele.value==1){
                                                        return context.listeners.deletData(undefined,0)
                                                    }
                                                    //当为2 使用修改按钮
                                                    else if(ele.value==2){
                                                        return context.listeners.changeData(0)
                                                    }
                                                    //当为4 请求地址整个改变
                                                    else if(ele.value==4){
                                                        return context.listeners.dealFun(ele.url,ele.type)
                                                    }
                                                    //默认为3 请求地址只需改方法名
                                                    else{
                                                        return context.listeners.dealFun(ele.url,ele.type)
                                                    }
                                                }
                                            }
                                        })


                                        /!*if(ele.dom==='button'){

                                        }else{
                                            return h(ele.dom,{
                                                domProps:{innerHTML:ele.title},
                                                style:{margin:'1px 3px'}
                                            })
                                        }*!/
                                    }))*/
                                }
                                //序号渲染
                                else if(headAloneObj.name==='tableIndex') {
                                    return h('td',{
                                        domProps:{innerHTML:index*1+[(context.props.data.tdObj.current*1-1)*context.props.data.tdObj.size]*1+1}
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
        /*table-layout: automatic;*/
        /*word-break:normal;*/
        /*table-layout: fixed;*/
        /*word-break:break-all;*/
        border-collapse: collapse;
        border-spacing: 0;

    }
    .upup_Table{
        width: 100%;
        overflow-X:scroll;
    }
    .headBorder>th{
        /*box-sizing: border-box;*/
        /*min-width: 80px;*/
        height: 30px;
        border: 1px rgb(153, 197, 232) solid;
        text-align: center;
        background-color: #E4F1F8;
    }
    .upup_Table>tbody>tr{
        height: 40px;

    }
    .upup_Table>tbody>tr>td{
        border: 1px rgb(153, 197, 232) solid;
        text-align: center;
        /*word-break:break-all;*/
    }
    .upup_Table>tbody>tr:hover{
        background-color: #E4F1F8;
    }
    tbody{
        background-color: white;
    }
    .iconUpColor{
        color: red;
    }
    .iconDownColor{
        color: red;
    }
</style>