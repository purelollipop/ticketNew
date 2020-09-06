<script>
    export default {
        name: "BaseTableUl",
        props:['data',],
        render(h) {
            if(!this.data.tbodyButtonArray){return};

            this.$nextTick(()=>{
                let aa = document.getElementsByClassName('cssClass')[0];
                console.log(aa)
                // aa.style.color = 'red'
            })
            return h(
                'div',
                {class:{cssClass:true,upup_ulTable:true,[this.data.tableAloneName+'class']:true},},
                [
                  //表头展示
                  h('div',{class:{table_ulth:true}}, this.data.tbodyButtonArray.map((elem,inde)=>{
                    if(elem.show){
                        //排序展示
                        if(elem.buttonSort){
                            return h('div',{
                                class:{tableHeadCla:true},
                                style:{width:(elem.width)?elem.width+'px':'100px'},
                            },[
                                h('div',{
                                    style:{},
                                    attrs:{
                                        'data-title':elem.name,
                                        'data-sort':elem.buttonSort,
                                        'data-name':elem.fieldName,
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
                                                domProps:{innerHTML:elem.name},
                                                style:{cursor:'pointer'},
                                            })
                                        }else{
                                            //根据当前buttonSort值 变换颜色 和 排列顺序
                                            return h('div',{
                                                    style:{display:'inline-block',position:'relative'},},
                                                [
                                                    h('Icon',{
                                                        attrs:{type:"md-arrow-dropup"},
                                                        style:{position:'absolute',bottom:'2px',},
                                                        class:{iconUpColor:elem.buttonSort===1?true:false}
                                                    }),
                                                    h('Icon',{
                                                        attrs:{type:"md-arrow-dropdown"},
                                                        style:{position:'absolute',top:'-6px',},
                                                        class:{iconDownColor:elem.buttonSort===2?true:false}
                                                    })
                                                ])
                                        }
                                    })
                                ])
                            ])
                        }
                        //序号展示
                        if(elem.fieldName == 'tableIndex'){
                            if(elem.dom){
                                return h('div',{
                                    class:{tableHeadCla:true},
                                    style:{width:(elem.width)?elem.width+'px':'100px'},
                                },[
                                    h(elem.dom,{
                                        domProps:{},
                                        attrs:{type:'checkbox'},
                                        class:{allInput:true},
                                        on:{
                                            input : e => {
                                                return this.$emit('allInput')
                                            }
                                        }
                                    }),
                                    h('span',{domProps:{innerHTML:'全选'}})
                                ])
                            }else{
                                return h('div',{
                                    class:{tableHeadCla:true},
                                    style:{width:(elem.width)?elem.width+'px':'100px'},
                                },[
                                    h('span',{domProps:{innerHTML:'序号'}})
                                ])
                            }
                        }
                        //按钮展示
                        if(elem.dom == "buttonArray"){
                            return h('div',{
                                class:{tableHeadCla:true},
                                style:{width:(elem.width)?elem.width+'px':'200px'},
                                domProps:{innerHTML:'操作'},
                            })
                        }
                        //普通展示
                        else{
                            return h('div',{
                                class:{tableHeadCla:true},
                                style:{width:(elem.width)?elem.width+'px':'100px'},
                                domProps:{innerHTML:elem.name},
                            })
                        }
                    }})),
                    //表格展示
                    this.data.tdObj.records.map((ele,ind)=>{
                        let c = Object.getOwnPropertyNames(ele);
                        return h('ul',{class:{table_ultr:true},key:ele[this.data.data_id]},
                            this.data.tbodyButtonArray.map((elem,inde)=>{
                                if(elem.show){
                                    let cc = 0;
                                    for(let i in ele){
                                        cc +=1;
                                        //序号 列 渲染
                                        if(elem.fieldName == 'tableIndex'){
                                            //当存在dom 渲染dom 值
                                            if(elem.dom){
                                                return h('li',{
                                                    class:{},
                                                    style:{width:(elem.width)?elem.width+'px':'100px'},
                                                },[
                                                    h(elem.dom,{
                                                        domProps:{},
                                                        attrs:{'data-id':ele[this.data.data_id],type:'checkbox'},
                                                        class:{checkBox:true},
                                                        on:{
                                                            input : e => {
                                                                return this.$emit('aloneInput')
                                                            }
                                                        }
                                                    }),
                                                    h('span',{domProps:{innerHTML:ind*1+[(this.data.tdObj.current*1-1)*this.data.tdObj.size]*1+1}})
                                                ])
                                            }
                                            //普通渲染
                                            else{
                                                return h('li',{
                                                    class:{},
                                                    style:{width:(elem.width)?elem.width+'px':'100px'},
                                                },[h('span',{domProps:{innerHTML:ind*1+[(this.data.tdObj.current*1-1)*this.data.tdObj.size]*1+1}})])
                                            }

                                        }
                                        //其他dom 渲染
                                        if(elem.dom){
                                            //button渲染
                                            if(elem.dom==='input'){
                                                if(i == elem.fieldName){
                                                    return h('li',{
                                                        class:{},
                                                        style:{width:(elem.width)?elem.width+'px':'100px'},
                                                    },[
                                                        h(elem.dom,{
                                                            domProps:{},
                                                            attrs:{'data-id':ele[this.data.data_id],type:'checkbox'},
                                                            class:{checkBox:true},
                                                            on:{
                                                                input : e => {
                                                                    return this.$emit('aloneInput')
                                                                }
                                                            }
                                                        }),
                                                        h('span',{domProps:{innerHTML:ele[i]}})
                                                    ])
                                                }

                                            }
                                            //button渲染
                                            else if(elem.dom==='buttonArray'){
                                                //是否有正确的按钮数组值或数组长度
                                                if(!elem.hasOwnProperty('array')||!elem.array.length){
                                                    return h('li',{
                                                        class:{},
                                                        style:{width:(elem.width)?elem.width+'px':'100px'},
                                                    },[h('span',{domProps:{}})])
                                                }
                                                //当存在按钮
                                                let buttonArray = elem.array;
                                                return h('li',{
                                                        style:{width:(elem.width)?elem.width+'px':'200px'},
                                                        class:{liFlexClass:true},
                                                    },
                                                    buttonArray.map((element,index)=>{
                                                        return h('button',{
                                                            domProps:{innerHTML:element.title},
                                                            class:{buttonA:true},
                                                            attrs:{'data-id':ele[this.data.data_id],},
                                                            style:{marginLeft:'2px'},
                                                            on:{
                                                                click:()=>{
                                                                    //当为0 为删除按钮
                                                                    if(buttonArray[index].type===0){
                                                                        return this.$emit('deletData',0,buttonArray[index].url,ele)
                                                                    }
                                                                    //当为1 为修改按钮
                                                                    else if(buttonArray[index].type===1){
                                                                        return this.$emit('changeData',0,buttonArray[index].url,buttonArray[index].value,ele)
                                                                    }
                                                                    //当为2 为处理按钮
                                                                    else{
                                                                        return this.$emit('dealFun',buttonArray[index].url,buttonArray[index].value,ele)
                                                                    }
                                                                }
                                                            },
                                                        })
                                                    })
                                                )
                                            }
                                            //日志
                                            else if(elem.dom==='date'){
                                                if(i == elem.fieldName){
                                                    return h('li',{
                                                            style:{color: '#3385FF',cursor:'pointer'},
                                                        },[
                                                            h('span',{
                                                                domProps:{innerHTML:ele[i]},
                                                                attrs:{'data-id':ele[this.data.data_id],},
                                                                style:{marginLeft:'2px'},
                                                                on:{
                                                                    click:()=>{
                                                                        return this.$emit('logFun');
                                                                    }
                                                                },
                                                            })
                                                        ]
                                                    )
                                                }
                                            }
                                        }
                                        //合并渲染
                                        if(elem.mergeFlag){
                                            return h('li',{
                                                    class:{mergeLi:true,},
                                                style:{width:(elem.width)?elem.width+'px':'100px'},
                                            },[
                                                h('div',
                                                    {class:{liDivFlexClass:true},},
                                                    elem.mergeList.map((element,index)=>{
                                                    let htmlText = undefined;
                                                    if(element.breakIsDom){
                                                        return h('br',{},)
                                                    }
                                                    else{
                                                        // if(element.mapping){
                                                        //     for (let i = 0; i < element.mapping.length; i++) {
                                                        //         if(ele[i] == element.mapping[i].v*1){
                                                        //             htmlText = element.mapping[i].t;
                                                        //         }
                                                        //     }
                                                        // }
                                                        return h(
                                                            'span',
                                                            {
                                                                class:{},domProps:{innerHTML:htmlText?htmlText:ele[element.fieldName]}
                                                            },
                                                        )
                                                    }
                                                }))
                                                ]
                                            )
                                        }
                                        //普通渲染
                                        if(i == elem.fieldName){
                                            //根据表头中是否要解析展示来判断
                                            let htmlText = undefined;
                                            //当存在 则 htmlText会被赋值
                                            if(elem.mapping){
                                                for (let i = 0; i < elem.mapping.length; i++) {
                                                    if(ele[i] == elem.mapping[i].v*1){
                                                        htmlText = elem.mapping[i].t;
                                                    }
                                                }
                                            };
                                            //折叠展示
                                            if(elem.fold){
                                                return h(
                                                    'li',
                                                    { style:{width:(elem.width)?elem.width+'px':'100px'},},
                                                    [h('span',{class:{foldClass:true},domProps:{
                                                            innerHTML:htmlText?htmlText:ele[i],
                                                            title:htmlText?htmlText:ele[i]
                                                        }})]
                                                )
                                            }
                                            //不折叠展示
                                            else{
                                                return h(
                                                    'li',
                                                    { style:{width:(elem.width)?elem.width+'px':'100px'},},
                                                    [h('span',{class:{},domProps:{
                                                            innerHTML:htmlText?htmlText:ele[i],
                                                        }})]
                                                )
                                            }

                                        }
                                        //空值渲染
                                        if(cc == c.length-2){
                                            return h(
                                                'li',
                                                { style:{width:(elem.width)?elem.width+'px':'100px'},},
                                                [h('span',{class:{},})]
                                            )
                                        }
                                    }
                                }
                            })
                        )})
                ]
            )
        },
    }
</script>

<style scoped>
    .cssClass{

    }
    /*最上层div 主体包裹层*/
    .upup_ulTable{
        width: 100%;
        background-color: white;
    }
    /*表头行*/
    .table_ulth{
        display: flex;
        background-color: #E4F1F8;
        font-weight: bold;
        font-size: 12px;
        height: 30px;
        line-height:30px;
    }
    /*表格单独的head头 独立一格*/
    .tableHeadCla{
        width:100px;

        flex-grow: 1;
        text-align: center;
        border-bottom: 1px silver solid;
        border-right: 1px silver solid;
    }
    /*表格一行 独立一行*/
    .table_ultr{
        display: flex;
        text-align: center;
        height: 40px;
    }
    .table_ultr:hover{
        background-color: #E4F1F8;
    }
    /*表格单独的body 独立一格*/
    .liFlexClass{
        border-bottom: 1px silver solid;
        border-right: 1px silver solid;
    }
    /*,*/
    .table_ultr>li:not(.liFlexClass){
        width:100px;
        /*height: 30px;*/
        /*line-height:30px;*/
        flex-grow: 1;
        border-bottom: 1px silver solid;
        border-right: 1px silver solid;

        align-items: center;
        overflow: hidden;
        word-break: break-all;

        display: flex;
        justify-content: center;
    }
    .table_ultr>li>*{
        /*align-self:center;
        align-items: center;*/
    }
    /*合并的li*/
    .mergeLi{
        align-items: center;
        flex-shrink: 1;
        /*display: flex;*/
        /*flex-wrap:nowrap;*/
    }
    .mergeLi>div{
        /*display: flex;*/
        word-break: break-word;
    }
    .mergeLi>div>span{
        white-space: nowrap;
        margin-left: 5px;
    }
    /*折叠的样式*/
    .foldClass{
        white-space: nowrap;  /*强制span不换行*/
        display: inline-block;  /*将span当做块级元素对待*/
        /*width: 300px;  !*限制宽度*!*/
        /*height: 20px;*/
        text-overflow: ellipsis;  /*超出部分以点号代替*/
        overflow: hidden;
    }
    .iconUpColor{
        color: red;
    }
    .iconDownColor{
        color: red;
    }
</style>