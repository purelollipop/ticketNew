import tables from "../../components/base/BaseTablesNotFunctional.vue";
import changPage from "../../components/base/BaseChangePage.vue";
import logWindow from '../../components/base/BaseTableLog';
import baseSearch from '../../components/base/BaseSearch';
import addWindow from '../../components/base/BaseAddWindow';
import changeWindow from '../../components/base/BaseChangeWindow';
import headButton from '../../components/base/BaseHeadButton';

let a =  {
    data(){
        return{
            //是否为表格数据体每份单独数据最后一格添加一份处理按钮
            tdObjButtonFlag:false,
            tdObjLastObj:[],
            //表格数据载体
            tableData:{
                tbodyButtonArray:null,
                tdObj:null,
                flag:false,
                tableWidth:undefined
            },
            /*翻页对象*/
            changePageObject:{},
            //搜索框开关
            searchWindow:false,
            //搜索功能切割dom的数据载体 用来帮助sear组件生成dom结构
            searchDomObj:null,
            //搜索数据载体
            searchObj:{},
            //  新增弹窗开关
            addDrawerObj:{
                flag:false,
                dataObj:null,
                url:'',
            },
            // 修改弹窗开关
            changeWindowObj:{
                flag:false,
                dataObj:null,
                url:'',
                changeDataArray:[],
                rowData:null,
            },
            //排序数据载体
            sortObj:{},
            //刷新开关
            selfUpDataFlag:true,
        }
    },
    props:['upkey',],
    watch:{
        upkey(){
            if(this.selfUpDataFlag){
                this.initializationFun()
            }
        }
    },
    methods:{
        //表格数据请求函数
        //函数会接收，页数，size,搜索。page,size都不会去更改，当数据交互完成后，后台
        //会传来页数和size的数据，依靠后台传来的数据，再更改data中的数值。此处不是前端自己修改！！
        initializationFun(page = 1,size = 20){
            let data = {};
            data = {...this.searchObj,page,size,};
            data = Object.assign(data,this.sortObj);
            //表体请求
            this.$axios({
                url:this.urlObj.url+this.urlObj.urlBody,
                method:'post',
                data
            }).then(res => {
                if(res.data.code==0){
                    if(this.tdObjButtonFlag){
                        let leng = res.data.data.records.length;
                        let length = this.tdObjLastObj.length;
                        for (let i = 0; i < leng; i++) {
                            for (let j = 0; j < length; j++) {
                                res.data.data.records[i][this.tdObjLastObj[j].name] = this.tdObjLastObj[j].name
                            }
                        }
                        this.tableData.tdObj = res.data.data;
                    }else{
                        this.tableData.tdObj = res.data.data;
                    };
                    //在此处通过后台传来的数据改翻页的默认值
                    let obj = {
                        total: res.data.data.total,
                        size: res.data.data.size,
                        current: res.data.data.current,
                        pages: res.data.data.pages,
                    }
                    this.changePageObject = obj;
                }else{
                    this.$Message.error({
                        duration:0,
                        content:res.data.msg,
                        closable:true
                    });
                }
            }).catch(err=>{
                console.log(err);
            })
        },
        //排序触发按钮
        sortFun(){
            let leng = this.tableData.tbodyButtonArray.length;
            //清空上次排序的记录 转为默认状态
            let theadSortName = undefined;
            let theadSort = 'desc';
            this.sortObj = {};
            //寻找当前触发排序的表头
            for (let i = 0; i < leng; i++) {
                if(this.tableData.tbodyButtonArray[i].name === event.currentTarget.dataset.name){
                    theadSortName = this.tableData.tbodyButtonArray[i].name + ':';;
                    // console.log(this.tableData.tbodyButtonArray[i].sort)
                    //1 代表 箭头向上 升序 asc；2 代表箭头向下 降序 desc
                    if(this.tableData.tbodyButtonArray[i].sort === 1){
                        this.tableData.tbodyButtonArray[i].sort = 2;
                    }else{
                        this.tableData.tbodyButtonArray[i].sort = 1;
                        theadSort = 'asc';
                    }
                }else if(this.tableData.tbodyButtonArray[i].sort){
                    this.tableData.tbodyButtonArray[i].sort = 3;
                }
            };
            this.sortObj[theadSortName] = theadSort;
            this.initializationFun()
        },
        //全选input函数
        allInput(){
            let inpu = document.getElementsByClassName('checkBox');
            if(event.target.checked){
                for(let a=0;a<inpu.length;a++){
                    inpu[a].checked = true;
                }
            }else{
                for(let a=0;a<inpu.length;a++){
                    inpu[a].checked = false;
                }
            }
        },
        //单独勾选input函数
        aloneInput(){
            console.log(event.target.dataset.id)
            let inpu = document.getElementsByClassName('checkBox');
            let allInput = document.getElementsByClassName('allInput')[0];
            //单独input是否被勾选上
            if(event.target.checked){
                for(let a=0;a<inpu.length;a++){
                    if(inpu[a].checked === false){
                        return
                    }else if(a === inpu.length-1){
                        allInput.checked = true;
                    }else{
                        continue
                    };
                }
            }else{
                allInput.checked = false;
            }
        },
        //搜索功能弹窗开关 用来显示搜索弹窗
        searchWindowFun(){
            if(this.searchWindow){
                //关闭搜索弹窗
                this.searchWindow = !this.searchWindow;
            }else{
                //开启搜素弹窗
                this.searchWindow = !this.searchWindow;
            }
        },
        //搜索确定按钮 触发函数开始向后台请求数据 开始搜索
        searchsure(data){
            this.searchObj = data;
            //确定搜索总是请求第一页
            this.initializationFun(1,this.changePageObject.size,this.searchObj)
        },

        //新增按钮功能 新增开关函数
        addData(url){
            this.addDrawerObj.flag = true;
            this.addDrawerObj.url = url;
        },
        //确定新增
        addSureFun(obj){
            this.$axios({
                url:this.addDrawerObj.url,
                method:'post',
                data:obj,
            }).then(res=>{
                this.$Message.info({
                    content:res.data.msg,
                    closable:true,
                    duration:10
                })
            }).catch(err=>{
                console.log(err)
            })
        },
        //删除按钮函数
        deletData(kind,url,buttonVal){
            //kind有两值，1为批量删除，0为单个删除
            this.$Modal.confirm({
                title: '删除功能',
                content: '<p>是否确定删除？</p>',
                onOk: () => {
                    let dataArray = [];
                    if(kind){
                        let inpu = document.getElementsByClassName('checkBox');
                        for(let a=0;a<inpu.length;a++){
                            if(inpu[a].checked){
                                dataArray.push(inpu[a].dataset.id)
                            }
                        }
                    }else{
                        if(buttonVal.id){
                            dataArray.push(buttonVal.id)
                        }else{
                            alert('输入的id不存在');
                            return
                        }
                    };
                    if(!dataArray.length){
                        this.$Message.error({
                            content: '操作失败。请至少勾选一条数据',
                            duration: 15,
                            closable: true
                        });
                        return
                    };
                    this.$axios({
                        url,
                        method:'post',
                        data: dataArray
                    }).then(res=>{
                        console.log(res)
                    }).catch(err=>{
                        console.log(err)
                    })
                },
                onCancel: () => {return null}
            });

        },
        //修改函数
        changeData(kind,url){
            this.changeWindowObj.url = url;
            let changeDataArray = [];
            let rowData = null;
            if(kind){
                let inpu = document.getElementsByClassName('checkBox');
                for(let a=0;a<inpu.length;a++){
                    if(inpu[a].checked){
                        changeDataArray.push(inpu[a].dataset.id)
                    }
                }
            }else{
                changeDataArray.push(event.currentTarget.dataset.id)
            }
            //当为1 则为单个按钮触发 当没有 则没有任何行被勾选
            if(changeDataArray.length==1){
                let id = changeDataArray[0];
                let leng = this.tableData.tdObj.records.length;

                for (let i = 0; i < leng; i++) {
                    // console.log(this.tableData.tdObj.records[i].id)
                    if(this.tableData.tdObj.records[i].id == id){
                        rowData = this.tableData.tdObj.records[i];
                    }
                }
            }else if(!changeDataArray.length){
                this.$Message.error({
                    content: '操作失败。请至少勾选一条数据',
                    duration: 30,
                    closable: true
                });
                return
            }
            this.changeWindowObj.changeDataArray = changeDataArray;
            this.changeWindowObj.rowData = rowData;
            this.changeWindowObj.flag = true;
        },
        //确定修改函数
        changeSureFun(obj){
            this.$axios({
                url:this.changeWindowObj.url,
                method:'post',
                data:obj,
            }).then(res=>{
                this.$Message.info({
                    content:res.data.msg,
                    closable:true,
                    duration:10
                })
            }).catch(err=>{
                console.log(err)
            })
        },
        //处理函数
        dealFun(url,buttonValType,buttonVal){
            //url 处理地址
            // buttonValType 按钮传值value类型 1代表只用id 0为传整个行的值 2为批量
            // buttonVal传输的整个行所有值
            let data = null;
            if(!buttonValType){
                data = buttonVal
            }else if(buttonValType == 1){
                data = {
                    id:buttonVal.id
                }
            }else if(buttonValType == 2){
                let inpu = document.getElementsByClassName('checkBox');
                for(let a=0;a<inpu.length;a++){
                    if(inpu[a].checked){
                        dataArray.push(inpu[a].dataset.id)
                    }
                }
                data = inpu
            }
            this.$axios({
                url,
                method:'post',
                data
            }).then(res=>{
                this.$Message.warning(res.data)
            }).catch(err=>{
                console.log(err)
            })
        },
        //导入
        importFun(){
            let val = this.$utilObj.importExcelFun(456);
            console.log(val)
            return alert('导入暂未开启')
        },
        //导出
        exportFun(){
            this.$utilObj.exportExcelFun(123)
            //page = 1,size = 20
            return alert('导出暂未开启')
        },
        // 日志开关函数
        logFun(){
            this.tableData.flag = true
        },
        //自适应调整高度
        changeHeightFun(){
            //表格框dom
            let base = document.getElementsByClassName('baseTablesDiv')[0];
            //表格头部按钮栏
            let baseHeadDiv = document.getElementsByClassName('baseHeadDiv')[0];
            //翻页dom
            let baseChangePageClass = document.getElementsByClassName('baseChangePageClass')[0];
            let changePageMarginTop = (window.getComputedStyle(baseChangePageClass).marginTop.match(/[1-9][0-9]{0,}/))[0] ;
            let changePageMarginBottom = (window.getComputedStyle(baseChangePageClass).marginBottom.match(/[1-9][0-9]{0,}/))[0];
            let changeStyleNus = baseChangePageClass.offsetHeight*1+changePageMarginTop*1+changePageMarginBottom*1;
            //50 这个数据是手工测量导航栏和context的magrin 等得出
            base.style.height = (document.body.clientHeight - (baseHeadDiv.offsetHeight+50+changeStyleNus)) + 'px';
        },
    },
    components:{
        tables,
        changPage,
        logWindow,
        baseSearch,
        addWindow,
        changeWindow,
        headButton,
    },
    template:'<div>\n' +
        '        <div class="baseTable">\n' +
        '            <div class="tables" >\n' +
        '                <header class="baseHeadDiv baseheaderClass">\n' +
        '                    <div>\n' +
        '                        <button class="buttonA" @click="searchWindowFun">搜索</button>\n' +
        '                    </div>\n' +
        '                    <head-button class="baseHeadDiv" :thead-array="theadArray"\n' +
        '                                 @addData="addData"\n' +
        '                                 @deletData="deletData"\n' +
        '                                 @changeData="changeData"\n' +
        '                                 @dealFun="dealFun"\n' +
        '                                 @importFun="importFun"\n' +
        '                                 @exportFun="exportFun"\n' +
        '                    ></head-button>\n' +
        '                </header>\n' +
        '                <div class="baseTablesDiv">\n' +
        '                    <div class="baseSearchClass" v-if="searchWindow">\n' +
        '                        <base-search\n' +
        '                                v-if="searchDomObj"\n' +
        '                                :searchDomObj="searchDomObj"\n' +
        '                                @searchsure="searchsure"\n' +
        '                        ></base-search>\n' +
        '                    </div>\n' +
        '                    <tables\n' +
        '                            v-if="tableData.tdObj"\n' +
        '                            :data="tableData"\n' +
        '                            @sortFun="sortFun"\n' +
        '                            @deletData=\'deletData\'\n' +
        '                            @changeData=\'changeData\'\n' +
        '                            @allInput="allInput"\n' +
        '                            @aloneInput="aloneInput"\n' +
        '                            @dealFun="dealFun"\n' +
        '                            @logFun="logFun"\n' +
        '                    ></tables>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <!--日志弹窗-->\n' +
        '        <log-window :flag="tableData.flag"></log-window>\n' +
        '        <!--新增弹窗-->\n' +
        '        <add-Window\n' +
        '                v-if="addDrawerObj.flag"\n' +
        '                :add-drawer-obj="addDrawerObj"\n' +
        '                @addSureFun="addSureFun"\n' +
        '        ></add-Window>\n' +
        '        <!--修改弹窗-->\n' +
        '        <change-window\n' +
        '                v-if="changeWindowObj.flag"\n' +
        '                :change-window-obj="changeWindowObj"\n' +
        '                @changeSureFun="changeSureFun"\n' +
        '        ></change-window>\n' +
        '        <!--翻页组件-->\n' +
        '        <div class="baseChangePageClass">\n' +
        '            <chang-page\n' +
        '                    :changePageObject="changePageObject"\n' +
        '                    @initializationFun="initializationFun"\n' +
        '            >\n' +
        '            </chang-page>\n' +
        '        </div>\n' +
        '    </div>',
    /*render(h) {
        return h('div',{},Array.apply(null,{length:5}).map((ele,index)=>{
            if(!index){
                return h('div',{class:{baseTable:true}},[h('div',{class:{tables:true}},
                    [
                        h('div',{class:{baseHeadDiv:true,baseheaderClass:true}},[
                            h('button',{
                                class:{buttonA:true},
                                domProps:{
                                    innerHTML:'搜索',
                                },
                                on:{
                                    click:this.searchWindowFun
                                }}),
                            h('head-button',{class:{baseHeadDiv:true},
                                props:{theadArray:this.theadArray},
                                listeners:{
                                    addData:this.addData,
                                    deletData:this.deletData,
                                    changeData:this.changeData,
                                    dealFun:this.dealFun,
                                    importFun:this.importFun,
                                    exportFun:this.exportFun,
                                }
                            })
                        ]),
                        h('div',{class:{baseTablesDiv:true}},Array.apply(null,{length:2}).map((ele,index)=>{
                            if(index){
                                if(this.tableData.tdObj){
                                   return h('tables',{
                                        props:{data:this.tableData},
                                        listeners:{
                                            logFun:this.logFun,
                                            sortFun:this.sortFun,
                                            deletData:this.deletData,
                                            changeData:this.changeData,
                                            allInput:this.allInput,
                                            aloneInput:this.aloneInput,
                                            dealFun:this.dealFun,
                                        },
                                    })
                                }
                            }else{
                                if(this.searchWindow){
                                    if(this.searchDomObj){
                                        return h('div',{class:{baseSearchClass:true}},[
                                            h('base-search',{
                                                props:{searchDomObj:this.searchDomObj},
                                                listeners:{
                                                    searchsure:this.searchsure
                                                }
                                            })
                                        ])
                                    }
                                }
                            }
                        }))
                    ]
                )])
            }
           //日志弹窗
            else if(index==1){
                return h('div',123)
            }
            //新增弹窗
            else if(index==2){
                return h('div',123)
            }
            //修改弹窗
            else if(index==3){
                return h('div',123)
            }
            //翻页组件
            else if(index==4){
                return h('div',{class:{baseChangePageClass:true}},[
                    h('chang-page',{
                        props:{changePageObject:this.changePageObject},
                        listeners:{
                            initializationFun:this.initializationFun
                        }
                    })
                ])
            }
        }))
    },*/
    beforeMount(){
        //表头数据请求函数
        this.$axios({
            url:this.urlObj.url+this.urlObj.urlHead,
            method:'get',
        }).then(res => {
            let obj = null;
            if(res.data.code==0){
                obj = res.data.data;
                obj.unshift({title:'序号',name:'tableIndex',index:0})
                let onlyLength = obj.length;
                // let tableWidth = 0;
                for (let i = 0; i < obj.length; i++) {
                    // if(obj[i].width){
                    // tableWidth = obj[i].width*1+tableWidth+1;
                    // }else{
                    // tableWidth = 81+tableWidth;
                    // }
                    for (let j = 0; j < this.tbodyButtonArray.length; j++) {
                        //解析手动编写的按钮 index 为要插入的位置
                        // 负数是往长度的后面插值
                        // -1 为当前长度后加1位 -2为加在当前长度第2位
                        if(this.tbodyButtonArray[j].index === i){
                            obj[i] = {...obj[i],...this.tbodyButtonArray[j]};
                            this.tbodyButtonArray.splice(j,1);
                            break;
                        }else if(this.tbodyButtonArray[j].index < 0){
                            //当自定义头有负数 开启tbody添加按钮属性开关
                            this.tdObjButtonFlag = true;
                            obj[(onlyLength-1)-(this.tbodyButtonArray[j].index)] = this.tbodyButtonArray[j];
                            //当察觉到自定义对象中需要格外定义按钮的时候，打开表体定义开关
                            let a = this.tbodyButtonArray.splice(j,1);
                            this.tdObjLastObj.push(a[0]);
                            break;
                        }
                    }
                }
                console.log(obj)
                this.tableData.tbodyButtonArray = obj;
                this.searchDomObj = obj;
                this.changeWindowObj.dataObj = this.addDrawerObj.dataObj = JSON.parse(JSON.stringify(obj));
                // this.tableData.tableWidth = tableWidth + 'px';
                this.initializationFun();
            }else{
                this.$Message.error(res.data.msg);
            };
        }).catch(err=>{
            console.log(err)
        });
    },
    mounted() {
        //初始化第一次搜索，其他条件都是默认条件
        this.changeHeightFun();

        window.onresize = () => {
            this.changeHeightFun()
        }
    },
    activated(){
        //第一次渲染页面总会触发activated 缓存没有关闭，其他导航进来也会触发
        //关闭该页面，即 从keepAlive中删除缓存，再次进来 不会触发activated 只触发mounted
        //离开该页面 即 不删除缓存 再次进来 只触发activated
        this.selfUpDataFlag = true;
        this.changeHeightFun();
        window.onresize = () => {
            this.changeHeightFun()
        }
    },
    deactivated(){
        this.$set(this.tableData,'flag',false)
        this.selfUpDataFlag = false;
        this.addDrawerObj.flag = false;
        window.onresize = null;
    },
};
export default a