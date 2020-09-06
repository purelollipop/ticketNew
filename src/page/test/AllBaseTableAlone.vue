<template>
    <div>
        <div class="baseTable">
            <div class="baseHeadDiv baseHeadDivJs baseheaderClass">
                <div>
                    <Button size="small"  @click="searchWindowFun">搜索</Button>
                </div>
                <head-button class="baseHeadDiv" :thead-array="theadArray"
                             @addData="addData"
                             @deletData="deletData"
                             @changeData="changeData"
                             @dealFun="dealFun"
                             @importFun="importFun"
                             @exportFun="exportFun"
                ></head-button>
                <Button size="small" @click="tableSettingFun" >模态设置</Button>
            </div>
            <div class="baseTablesDiv">
                <base-search
                        v-if="searchDomObj&&searchWindow"
                        :searchDomObj="searchDomObj"
                        @searchsure="searchsure"
                ></base-search>
                <tables
                        v-if="tableData.tdObj"
                        :data="tableData"
                        @sortFun="sortFun"
                        @deletData="deletData"
                        @changeData="changeData"
                        @allInput="allInput"
                        @aloneInput="aloneInput"
                        @dealFun="dealFun"
                        @logFun="logFun"
                ></tables>
            </div>
        </div>
        <!--日志弹窗-->
        <log-window :flag="tableData.flag"></log-window>
        <!--新增弹窗-->
        <add-Window
                v-if="addDrawerObj.flag"
                :add-drawer-obj="addDrawerObj"
                @addSureFun="addSureFun"
        ></add-Window>
        <!--修改弹窗-->
        <change-window
                v-if="changeWindowObj.flag"
                :change-window-obj="changeWindowObj"
                @changeSureFun="changeSureFun"
        ></change-window>
        <!--模态弹窗-->
        <base-table-setting
                v-if="tableSettingObj.tableSettingFlag"
                :table-setting-obj="tableSettingObj"
                @parseTableHeadFun="parseTableHeadFun"
        ></base-table-setting>
        <!--翻页组件-->
        <div class="baseChangePageClass">
            <chang-page
                    :changePageObject="changePageObject"
                    @initializationFun="initializationFun"
            >
            </chang-page>
        </div>
    </div>
</template>
<script>

    import tables from "../../components/base/BaseTableUl.vue";
    import changPage from "../../components/base/BaseChangePage.vue";
    import logWindow from '../../components/base/BaseTableLog';
    import baseSearch from '../../components/base/BaseSearch';
    import addWindow from '../../components/base/BaseAddWindow';
    import changeWindow from '../../components/base/BaseChangeWindow';
    import headButton from '../../components/base/BaseHeadButton';
    import baseTableSetting from '../../components/base/BaseTableSetting';


    import url_data from '../../apis/urlApi';
    //地址集合
    const allUrlData = url_data;
    export default {
        name:'AllBaseTableAlone',
        data(){
            return{
                //页面最上面的按钮（搜索，新增，批量修改）
                theadArray:[],
                //表格体中的按钮集合，包括input 日志按钮，序号等，在created中初次赋值
                tbodyButtonArray:[],
                //已有表格头格式数据
                theadRulerArray:null,
                //表格头中被隐藏的表格头数据
                theadShowFalse:[],
                //具体地址请求对象
                urlObj:{
                    url:null,
                    urlHead:null,
                    urlBody:null,
                    urlBodyPostObj:null,
                },
                //请求地址对象
                allUrlData:{},

                //是否为表格数据体每份单独数据最后一格添加一份处理按钮
                tdObjButtonFlag:false,
                tdObjLastObj:[],
                //表格数据载体
                tableData:{
                    tbodyButtonArray:null,
                    tdObj:null,
                    //???
                    flag:false,
                    tableWidth:undefined,
                    //每条数据的唯一id
                    data_id:undefined,
                    tableAloneName:this.tableAloneName,
                },
                /*翻页对象*/
                changePageObject:{},
                //搜索框开关
                searchWindow:false,
                //搜索功能切割dom的数据载体 用来帮助sear组件生成dom结构
                searchDomObj:null,
                //搜索数据载体
                searchObj:[],
                //  新增弹窗开关和数据
                addDrawerObj:{
                    flag:false,
                    dataObj:null,
                    url:'',
                    urlObjData:''
                },
                // 修改弹窗开关和数据
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
                //修改表格的数据功能的数据载体
                tableSettingObj:{
                    tableSettingFlag:false,
                    tableSettingHead:null,
                    tbodyFlaseArray:null,
                    cssObj:{
                        //设计思路：当只有css中的控件触发，才会改值为true,
                        //否则每次修改模态设置功能，都会传css的东西，但实际上可能并没有修改，
                        //如果触发了css的控件，则可能修改，则给后台数据时候才给cssObj,否则不给
                        defaultFlag:false,
                    },
                }
            }
        },
        props:['tableAloneName','tableCloneName','ind'],
        watch:{
            upkey(){
                if(this.selfUpDataFlag&&(this.tableCloneName==this.tableAloneName)){
                    this.initializationFun()
                }
            },
            tableCloneName(data){
                if(data==this.tableAloneName){
                    this.changeHeightFun()
                }else{
                    this.tableSettingObj.tableSettingFlag = false;
                }
            }
        },
        computed:{
            upkey:{
                get(){
                    return  this.$attrs.upkey
                }
            }
        },
        methods:{
            //表格数据请求函数
            //函数会接收，页数，size,搜索。page,size都不会去更改，当数据交互完成后，后台
            //会传来页数和size的数据，依靠后台传来的数据，再更改data中的数值。此处不是前端自己修改！！
            initializationFun(page = 1,size = 20){
                if(!this.urlObj.url){
                    console.log('urlObj.url为'+this.urlObj.url)
                    return
                }
                if(this.searchObj){

                }
                let data = [...this.urlObj.urlBodyPostObj,...this.searchObj];
                //表体请求
                this.$axios({
                    url:this.urlObj.url+this.urlObj.urlBody+"?page="+page+"&size="+size,
                    method:'post',
                    data
                }).then(res => {
                    if(res.data.code==0){
                        if(this.tdObjButtonFlag){
                            let leng = res.data.data.records.length;
                            let length = this.tdObjLastObj.length;
                            for (let i = 0; i < leng; i++) {
                                for (let j = 0; j < length; j++) {
                                    res.data.data.records[i][this.tdObjLastObj[j].name] = this.tdObjLastObj[j].name;
                                    res.data.data.records[i].breakNameDom = ' ';
                                }
                            }
                            this.tableData.tdObj = res.data.data;
                        }else{
                            let leng = res.data.data.records.length;
                            for (let j = 0; j < leng; j++) {
                                res.data.data.records[j].breakNameDom = ' ';
                            }
                            this.tableData.tdObj = res.data.data;
                        };
                        //在此处通过后台传来的数据改翻页的默认值
                        let obj = {
                            total: res.data.data.total,
                            size: res.data.data.size,
                            current: res.data.data.current,
                            pages: res.data.data.pages,

                        }
                        this.changePageObject = Object.assign({},obj);
                    }else{
                        this.$Message.error({
                            duration:5,
                            content:res.data.msg,
                            closable:true
                        });
                    }
                }).catch(err=>{
                    this.$Message.warning({
                        content:err,
                        duration:5,
                        closable:true
                    });
                    console.log(err);
                })
            },
            // 表头请求函数
            tableHeadGetFun(){
                if(!this.urlObj.url){
                    console.log('urlObj.url不存在')
                    return
                }
                this.$axios({
                    url:this.urlObj.url+this.urlObj.urlHead,
                    method:'get',
                }).then(res => {
                    if(res.data.code==0){
                        //解析表头数据
                        this.parseTableHeadFun(res.data.data);
                    //    获取业务员修改的表格格式数据
                        this.theadRulerArray = null;
                    }else{
                        this.$Message.error(res.data.msg);
                    };
                }).catch(err=>{
                    console.log(err)
                });
                this.initializationFun();
            //    获取规则axios
                this.$axios({
                    url:'common/modal/list',
                    method:'post',
                    data:{
                        userId:this.$store.state.userInfo.id,
                        pageId:this.tableAloneName,
                    }
                }).then(res=>{
                    console.log(res)
                }).catch(err=>{
                    console.log(err)
                })
            },
            //解析表头函数
            parseTableHeadFun(data,datatwo,cssObjFlag,type){
                console.log(data)
                console.log(datatwo)


                //传入表头函数，来解析
                let obj = JSON.parse(JSON.stringify(data));
                //不会被解析的原始数据
                let noParseData = JSON.parse(JSON.stringify(data));
                //urlObj的值
                let urlObjData = JSON.parse(JSON.stringify(this.allUrlData)).urlObj.urlBodyPostObj;
                this.addDrawerObj.urlObjData = urlObjData;
                let num = 0;
                //修改源数据的头部信息，形成新的规则
                //datatow如果存在，代表从模态框调中用的函数。
                if(datatwo){
                    this.tableData.tbodyButtonArray = this.tableSettingObj.tableSettingHead = data;

                    this.tableSettingObj.tbodyFlaseArray = datatwo;

                    let pageId = this.tableAloneName;
                    // type 1 是通用修改。 type 0 是个人修改
                    if(!type){
                        pageId = '*'
                    }
                    console.log(data)
                    console.log(datatwo)
                    // let mergeObjDate = Object.assign(data,datatwo);

                    return
                    //表格合并对象
                    let mergeObj = {
                        userId:this.$store.state.userInfo.id,
                        pageId,
                        type:1,
                        param:mergeObjDate
                    }
                    let cssObj = {
                        userId:this.$store.state.userInfo.id,
                        pageId:'*',
                        type:2,
                        param:cssObjFlag,
                    }
                    if(!cssObjFlag){
                        cssObj = undefined
                    }
                    let data = [mergeObj,cssObj]
                    console.log(data)

                    this.$axios({
                        url:'common/modal/saveBatch',
                        method:'post',
                        data:data
                    }).then(res=>{
                        console.log(res)
                    }).catch(err=>{

                    })
                }
                //初始化函数请求直接调用函数，直接源数据解析
                else{
                    //当规则数据存在
                    if(this.theadRulerArray){
                        for (let i = 0; i < obj.length; i++) {
                            //拥有primaryKey 这项 代表这是主键（id）
                            if(obj[i].primaryKey){
                                this.tableData.data_id = obj[i].fieldName;
                            }
                            //先判断是否需要存在，再判断显隐
                            for (let j = 0; j < this.theadRulerArray.length; j++) {
                                //如果规则中此条本身是合并数据
                                if(typeof this.theadRulerArray[j] === 'object'){
                                    console.log('hebingxiang')
                                }
                                //如果不是合并数据
                                //头部规则数据存在，源数据也存在，
                                else if(obj[i].fieldName === this.theadRulerArray[j].fieldName){
                                    //源数据去除该条
                                    let a = obj.splice(i,1)[0];
                                    //是否隐藏
                                    if(!a.show){
                                        this.theadShowFalse.push(obj.splice(i,1)[0]);
                                    }
                                    //规则数据添加一个存在开关
                                    this.theadRulerArray[j][Symbol('rulerExist')] = 1;
                                    i--;
                                    break;
                                    //当源数据存在，规则数据不存在，则代表该数据是新增数据，则obj最终会留下该种类
                                    //当源数据不存咋，规则数据存在，则代表规则数据中的该条应该删除，在后续中根据上述rulerExist不存在再来删除
                                }
                            }
                        }
                    }
                    //规则数据不存在，直接解析源数据
                    else{
                        for (let i = 0; i < obj.length; i++) {
                            //拥有primaryKey 这项 代表这是主键（id）
                            if(obj[i].primaryKey){
                                this.tableData.data_id = obj[i].fieldName;
                            }
                            if(obj[i].show){
                                num+=1;
                                for (let j = 0; j < this.tbodyButtonArray.length; j++) {
                                    //解析手动编写的按钮 index 为要插入的位置
                                    // 负数是往长度的后面插值
                                    // -1 为当前长度后加1位 -2为 在当前长度后加2位
                                    if(this.tbodyButtonArray[j].index == 0){
                                        if(this.tbodyButtonArray[j].name == 'tableIndex'){
                                            let obj12 = {
                                                show:true,
                                                fieldName: "tableIndex",
                                                dom:this.tbodyButtonArray[j].dom
                                            };
                                            obj.splice(i,0,obj12);
                                            i+=1;
                                            this.tbodyButtonArray.splice(0,1);
                                            break;
                                        }else{
                                            obj[i] = {...obj[i],...this.tbodyButtonArray[0]};
                                            this.tbodyButtonArray.splice(0,1);
                                        }
                                        break;
                                    }
                                    if(this.tbodyButtonArray[j].index === num){
                                        obj[i] = {...obj[i],...this.tbodyButtonArray[j]};
                                        this.tbodyButtonArray.splice(j,1);
                                        break;
                                    }
                                    else if(this.tbodyButtonArray[j].index < 0){
                                        //当自定义头有负数 开启tbody添加按钮属性开关
                                        this.tdObjButtonFlag = true;
                                        obj[(obj.length-1)-(this.tbodyButtonArray[j].index)] = this.tbodyButtonArray[j];
                                        //当察觉到自定义对象中需要格外定义按钮的时候，打开表体定义开关
                                        let a = this.tbodyButtonArray.splice(j,1);
                                        a[0].show = true;
                                        this.tdObjLastObj.push(a[0]);
                                        break;
                                    }
                                }
                            }
                            else{
                                this.theadShowFalse.push(obj.splice(i,1)[0]);
                                i--;
                            }
                        }
                    };

                    this.tableData.tbodyButtonArray = obj;
                    this.tableSettingObj.tbodyFlaseArray = this.theadShowFalse;
                    this.tableSettingObj.tableSettingHead = this.searchDomObj = obj;
                    this.changeWindowObj.dataObj = this.addDrawerObj.dataObj = noParseData;
                }
            },
            //排序触发按钮
            sortFun(){
                let leng = this.tableData.tbodyButtonArray.length;
                //清空上次排序的记录 转为默认状态
                let theadSortName = undefined;
                let theadSort = 'orderByDesc';
                this.sortObj = {};
                //寻找当前触发排序的表头
                for (let i = 0; i < leng; i++) {
                    //如果是此项排序 则进入判断
                    if(this.tableData.tbodyButtonArray[i].fieldName === event.currentTarget.dataset.name){
                        // theadSortName = this.tableData.tbodyButtonArray[i].fieldName+':'+'desc';
                        theadSortName = this.tableData.tbodyButtonArray[i].fieldName;
                        //1 代表 箭头向上 升序 asc；2 代表箭头向下 降序 desc
                        if(this.tableData.tbodyButtonArray[i].buttonSort === 1){
                            this.tableData.tbodyButtonArray[i].buttonSort = 2;
                        }else{
                            this.tableData.tbodyButtonArray[i].buttonSort = 1;
                            // theadSortName = this.tableData.tbodyButtonArray[i].fieldName+':'+'asc';
                            theadSortName = this.tableData.tbodyButtonArray[i].fieldName;
                            theadSort = 'orderByAsc';
                        }
                    }
                    //否则 此项不排序
                    else if(this.tableData.tbodyButtonArray[i].buttonSort){
                        this.tableData.tbodyButtonArray[i].buttonSort = 3;
                    }
                };
                //当有其他排序的时候，删除默认排序
                if(this.urlObj.urlBodyPostObj){
                    //默认排序一般放在数组第一位，但是防止万一
                    let leng = this.urlObj.urlBodyPostObj.length;
                    for (let i = 0; i < leng; i++) {
                        if(this.urlObj.urlBodyPostObj[i].default){
                            this.urlObj.urlBodyPostObj[i].name = theadSortName;
                            this.urlObj.urlBodyPostObj[i].type = theadSort;
                        }
                    }
                    // delete this.urlObj.urlBodyPostObj['lasttime:desc'];
                }
                this.sortObj[theadSortName] = '';
                console.log(this.sortObj)
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
                    //页面不一定会添加全选input
                    if(allInput){
                        allInput.checked = false;
                    };
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
                //this.urlObj.urlBodyPostObj = null;
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
                console.log(kind)
                console.log(url)
                console.log(buttonVal)
                // kind有两值，1为批量删除，0为单个删除
                if(window.confirm('是否确定删除？')){
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
                }else{
                    return null
                }
                // this.$Modal.confirm({
                //     title: '删除功能',
                //     content: '<p>是否确定删除？</p>',
                //     onOk: () => {
                //
                //     },
                //     onCancel: () => {}
                // });

            },
            //修改函数
            changeData(kind,url){
                this.changeWindowObj.url = url;
                let changeDataArray = [];
                let rowData = null;
                //当kind 为1则代表是批量按钮触发。0则是表格内部单条数据的修改按钮触发
                if(kind){
                    let inpu = document.getElementsByClassName('checkBox');
                    //所有被勾选的数据整条都存入集合
                    for(let a=0;a<inpu.length;a++){
                        if(inpu[a].checked){
                            changeDataArray.push(this.tableData.tdObj.records[a])
                        }
                    }
                }else{
                    changeDataArray.push(event.currentTarget.dataset.id)
                }
                //当为长度1则可以看作为单个按钮触发。否则提示没有任何数据被勾选
                // if(changeDataArray.length==1){
                //     let id = changeDataArray[0];
                //     let leng = this.tableData.tdObj.records.length;
                //     //当为单条数据被勾选的时候，则将table中该条数据的具体信息转录到rowData中
                //     for (let i = 0; i < leng; i++) {
                //         if(this.tableData.tdObj.records[i].id == id){
                //             rowData = this.tableData.tdObj.records[i];
                //         }
                //     }
                // }else
                if(!changeDataArray.length){
                    this.$Message.error({
                        content: '操作失败。请至少勾选一条数据',
                        duration: 30,
                        closable: true
                    });
                    return
                }
                //被勾选的数据id集合
                this.changeWindowObj.changeDataArray = changeDataArray;
                //被勾选的行的具体value值 如果是一个被勾选的，则有制，多条勾选的话，则没有值
                this.changeWindowObj.rowData = rowData;
                //处理的弹窗开关
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
                if(!this.tableData.data_id){
                    this.$Message.error({
                        content:'没有获取到有效id',
                        duration:5,
                        closable:true,
                    });
                    return
                }
                let id = event.target.dataset.id;
                //url 处理地址
                // buttonValType 按钮传值value类型 1代表只用id 0为传整个行的值 2为批量
                // buttonVal传输的整个行所有值
                let data = null;
                if(!buttonValType){
                    data = buttonVal
                }else if(buttonValType == 1){
                    data = {
                        id,
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
            importFun(data){
                let val = this.$utilObj.importExcelFun(data);
            },
            //导出
            exportFun(){
                this.$utilObj.exportExcelFun(123)
                //page = 1,size = 20
            },
            // 日志开关函数
            logFun(){
                let id = event.target.dataset.id;
                this.tableData.flag = true
            },
            //自适应调整高度c
            changeHeightFun(){
                //表格框dom
                let base = document.getElementsByClassName('baseTablesDiv')[this.ind];
                // //表格头部按钮栏
                let baseHeadDivJs = document.getElementsByClassName('baseHeadDivJs')[this.ind];
                // //翻页dom
                let baseChangePageClass = document.getElementsByClassName('baseChangePageClass')[this.ind];
                let changePageMarginTop = (window.getComputedStyle(baseChangePageClass).marginTop.match(/[1-9][0-9]{0,}/))[0] ;
                let changePageMarginBottom = (window.getComputedStyle(baseChangePageClass).marginBottom.match(/[1-9][0-9]{0,}/))[0];
                let changeStyleNus = baseChangePageClass.offsetHeight*1+changePageMarginTop*1+changePageMarginBottom*1;
                // //50 这个数据是手工测量导航栏和context的magrin 等得出
                base.style.height = (document.body.clientHeight - (baseHeadDivJs.offsetHeight+50+changeStyleNus)) + 'px';
            },
            //获取并修改tableName
            getTableNameFun(){
                let rule = {
                    'systemCurrentTime':function () {
                        let fullTime = new Date().toLocaleDateString();
                        let year = new Date(fullTime).getFullYear();
                        let month = (new Date(fullTime).getMonth())+1;
                        let day = new Date(fullTime).getDate();
                        if(month<10){
                            month = '0'+month;
                        }
                        if(day<10){
                            day = '0'+day;
                        }
                        let parseTime = year +"-"+ month +"-"+ day +' 00:00';
                        return parseTime
                    },
                    'baseSCTAfterYear':function () {
                        let fullTime = new Date().toLocaleDateString();
                        let year = new Date(fullTime).getFullYear()+1;
                        let month = (new Date(fullTime).getMonth())+1;
                        let day = new Date(fullTime).getDate();
                        if(month<10){
                            month = '0'+month;
                        }
                        if(day<10){
                            day = '0'+day;
                        }
                        let parseTime = year +"-"+ month +"-"+ day +' 00:00';
                        return parseTime
                    }
                }
                //验证地址是否存在
                if(!this.allUrlData.theadArray){
                    this.$Message({
                        content:'theadArray'+'解析错误',
                        duration:5,
                        closable:true
                    });
                    return
                }
                else if(!this.allUrlData.tbodyButtonArray){
                    this.$Message({
                        content:'tbodyButtonArray'+'解析错误',
                        duration:5,
                        closable:true
                    });
                    return
                }
                else if(!this.allUrlData.urlObj){
                    this.$Message({
                        content:'urlObj'+'解析错误',
                        duration:5,
                        closable:true
                    });
                    return
                }
                //开始使用数据
                this.theadArray = JSON.parse(JSON.stringify(this.allUrlData.theadArray));
                this.tbodyButtonArray = JSON.parse(JSON.stringify(this.allUrlData.tbodyButtonArray));
                this.urlObj = JSON.parse(JSON.stringify(this.allUrlData.urlObj));
                if(this.urlObj.urlBodyPostObj){
                    let length = this.urlObj.urlBodyPostObj.length
                    for (let i = 0; i < length; i++) {
                        for(let e in this.urlObj.urlBodyPostObj[i]){
                            if(typeof this.urlObj.urlBodyPostObj[i][e] == 'boolean'){continue}
                            let a = this.urlObj.urlBodyPostObj[i][e] = this.urlObj.urlBodyPostObj[i][e].replace(/\#|\{|\}/g,'');
                            for (let q in rule) {
                                let ruleReg = new RegExp(q);
                                if(ruleReg.test(a)){
                                    this.urlObj.urlBodyPostObj[i][e] = this.urlObj.urlBodyPostObj[i][e].replace(ruleReg,rule[q]())
                                }
                            }
                        }
                    }
                }
            },
            //模态设置开关
            tableSettingFun(){
                if(this.tableSettingObj.tableSettingHead&&this.tableSettingObj.tbodyFlaseArray){
                    //按钮背景渐变
                    let a = window.getComputedStyle(document.getElementsByClassName('baseheaderClass')[0]).backgroundImage;
                    a = a.split('rgb');
                    let b = a[1];
                    let binde = b.lastIndexOf(',')
                    let c = a[2]
                    let cind = c.lastIndexOf(')');
                    let headButtonBackgrounA = 'rgb'+b.slice(0,binde);
                    let headButtonBackgrounB = 'rgb'+c.slice(0,cind);


                    let Name = document.getElementsByClassName([this.tableAloneName+'class'])[0];
                    //主体表格
                    // let upup_ulTable = document.getElementsByClassName('upup_ulTable')[0];
                    let cssDate = window.getComputedStyle(Name);

                    let backGround = cssDate.backgroundColor;
                    console.log('表格'+backGround)
                    //表格头
                    let table_ulth = window.getComputedStyle(Name.getElementsByClassName('table_ulth')[0]);
                   //单独头
                    let tableHeadCla = window.getComputedStyle(Name.getElementsByClassName('tableHeadCla')[0]);


                    //单独表格行
                    // let liFlexClass = window.getComputedStyle(document.getElementsByClassName('liFlexClass')[0]);
                    // console.log('表格行边框颜色'+liFlexClass.borderBottomColor);

                    //单独表格行
                    let table_ultr = window.getComputedStyle(Name.getElementsByClassName('table_ultr')[0]);
                    // console.log(table_ultr)
                    //单独一个表格
                    let tdCss = window.getComputedStyle(Name.getElementsByClassName('table_ultr')[0].getElementsByTagName('li')[0]);
                    let tableStyleObj = {
                        headButtonBackgrounA:headButtonBackgrounA,
                        headButtonBackgrounB:headButtonBackgrounB,

                        //表头背景颜色
                        headerBackColor : table_ulth.backgroundColor,
                        //表头字体颜色
                        headColor : table_ulth.color,
                        //表头边框颜色
                        headBorderColor:tableHeadCla.borderBottomColor,
                        //表格头字体大小
                        headFontSize : table_ulth.fontSize,
                        //表头高
                        headHeight:table_ulth.height,

                        //表格背景颜色
                        tableBackGroundColor:backGround,
                        //表格高
                        tbodyHeight:table_ultr.height,
                        //表格边框颜色
                        tbodyBorderColor:tdCss.borderBottomColor,
                        //字体大小
                        tbodyFontSize : table_ultr.fontSize,
                        //表格字体颜色
                        tbodyColor:table_ultr.color,

                        //按钮栏背景颜色 渐变
                        // baseheaderBackgroundImage : window.getComputedStyle(baseheaderClass).backgroundImage,
                        //.upup_Table>tbody>tr hover值 默认值为0 即#E4F1F8
                        upup_Table_trHover : '#E4F1F8',
                    }
                    this.tableSettingObj.cssObj = Object.assign(this.tableSettingObj.cssObj,tableStyleObj);
                    this.tableSettingObj.tableSettingFlag = !this.tableSettingObj.tableSettingFlag;
                }

            },
        //    模态设置后 改动head数据方法
            tableSetHeadFun(){
                let beforDomParseArr = JSON.parse(JSON.stringify(this.domParseArr));
                let leng = beforDomParseArr.length;
                for (let i = 1; i < leng; i++) {
                    let j = i-1;
                    deepPosition(beforDomParseArr[i].position,beforDomParseArr[j].position);
                    //根据传入的数据 排序 此处 根据position值大小不同，用来排序表格
                    function deepPosition(val,beforVal){
                        if(val<beforVal){
                            j-=1;
                            deepPosition(beforDomParseArr[i].position,beforDomParseArr[j].position);
                        }else{
                            if(j!=i-1){
                                let a = beforDomParseArr.splice(i,1)[0];
                                beforDomParseArr.splice(j+1,0,a);
                            }
                        }
                    }
                }
                this.domParseArr = beforDomParseArr
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
            baseTableSetting,
        },
        created(){
            this.allUrlData = allUrlData[this.tableAloneName];
            if(!this.allUrlData){
                this.$Message.warning({
                    content:'地址解析错误',
                    duration:5,
                    closable:true
                });
                return
            }
            this.getTableNameFun()
        },
        beforeMount(){
            //表头数据请求函数
            if(!this.urlObj){
                return
            }
            this.tableHeadGetFun();
        },
        mounted() {

        },
        activated(){
            // 第一次渲染页面总会触发activated 缓存没有关闭，其他导航进来也会触发
            // 关闭该页面，即 从keepAlive中删除缓存，再次进来 不会触发activated 只触发mounted
            // 离开该页面 即 不删除缓存 再次进来 只触发activated
            this.selfUpDataFlag = true;
            this.changeHeightFun();
            window.onresize = () => {
                this.changeHeightFun()
            }
        },
        deactivated(){

            window.onresize = null;
            this.$set(this.tableData,'flag',false)
            this.selfUpDataFlag = false;
            this.addDrawerObj.flag = false;

        },
    }
</script>

<!--滚动条-->

<style scoped type="text/css">

    ::-webkit-scrollbar{
        width: 6px;
        height: 8px;
    }
    ::-webkit-scrollbar-track{
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        border-radius: 1px;
        /*background-color: #DCDCDC;*/
        background-color: white;
        /*width: 1px;*/
    }
    ::-webkit-scrollbar-track-piece{
        /*background-color: red;*/
    }
    ::-webkit-scrollbar-thumb
    {
        border-radius: 10px;
        /*border: 1px silver solid;*/
        /*-webkit-box-shadow: inset 0 0 6px cornflowerblue;*/
        /*background-color: whitesmoke;*/
        /*background: linear-gradient(#2b85e4,white,#2b85e4);*/
        background: #2b85e4;
    }
    ::-webkit-resizer{
        /*background-color: red;*/
    }
    ::-webkit-scrollbar-corner{
        /*background-color: #2b85e4;*/
    }
</style>
