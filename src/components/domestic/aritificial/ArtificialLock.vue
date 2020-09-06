<template>
    <div style="margin-top: 6px">
        <!--复制dom-->
        <div class="fuzhiDom">
            <input type="text" class="fuzhiId" ref="copy">
        </div>
        <!--搜索条件框-->
        <!--choose传conditionsfun，该函数用来开关条件筛选的按钮，条件筛选显示是的开关是在搜索框内，
            另有一个关闭开关在条件筛选自己内部，所以下面的conditions dom也传入了该函数。 -->
        <!--<transition name="searchAnimation" duration="{enter:3000,leave:3000}">-->
        <search v-if="searchFlag"
                @chooselock="chooselock"
                @conditionsfun="conditionsFun"
        ></search>
        <!--</transition>-->
        <!--<transition name="searchAnimation">-->
        <!--具体条件筛选框-->
        <conditions
                v-if="conditionsFlag"
                @conditionsfun="conditionsFun"
                @choosefun="choosefun"
        ></conditions>
        <!--</transition>-->
        <div class="gray">
            <Button type="primary" size="small" @click="lotSizeLock">批量解锁</Button>
            <Button type="primary" size="small" @click="searchFlagFun">搜索</Button>
            <Button type="primary" size="small" @click="onelockshow">个人锁单</Button>
        </div>
        <div class="">
            <!--主体展示dom-->
            <table class="ariticialTalbe" style="font-size: 12px;width: 100%">
                <colgroup>
                    <col  style="width:40px"><!--序号-->
                    <col  style="width:50px"><!--处理方式-->
                    <col  style="width:60px"><!--处理人-->
                    <col  style="width:50px;"><!--票台-->
                    <col  style="width:auto"><!--政策代码-->
                    <col><!--航班信息-->
                    <col  style="width:45px"><!--时长-->
                    <col  style="width:auto"><!--订单号-->
                    <col  style="width:70px"><!--收款	-->
                    <col  style="width:100px"><!--支付-->
                    <!--<col  style="width:50px">&lt;!&ndash;票号&ndash;&gt;-->
                    <col  style="width:70px"><!--余位-->
                    <col  style="width:65px"><!--平台状态	-->
                    <col  style="width:65px"><!--航司状态-->
                    <col  style="width:100px"><!--备注-->
                    <col  style="width:150px"><!--比价-->
                </colgroup>
                <thead class="">
                <tr class="headBorder" style="height: 60px">
                    <th style="padding: 1px;width: 40px">
                        <div>
                            <input type="checkbox" @click="allInpLock"  id="allcheck_lock">
                        </div>
                        <div>
                            <span>全选</span>
                        </div>
                    </th>
                    <th>处理</th>
                    <th>处理人</th>
                    <th>票台</th>
                    <th>政策代码</th>
                    <th>航班信息</th>
                    <th>时长</th>
                    <th>订单号</th>
                    <th>收款/支付</th>
                    <th>票号回帖</th>
                    <!--<th>票号</th>-->
                    <th>余位</th>
                    <th>平台状态</th>
                    <th>航司状态</th>
                    <th>备注</th>
                    <th>比价</th>
                </tr>
                </thead>
                <tbody   class="ariticialTalbeChild" >
                <tr v-for="(ord,index) in orLock" :data-cc="ord.show" :key="ord.id">
                    <td>
                        <div>
                            <label>
                                <!--<Checkbox  v-if="ord.permission||ord.drawer==user" @on-change="addInputId(ord.id,event)" ref="inputDom"></Checkbox>-->
                                <input type="checkbox"  @click="addInputId(ord.id)" :data-cc="ord.id" v-if="ord.permission||ord.drawer==user" ref="inputDom">
                                {{index + 1}}
                            </label>
                        </div>
                        <div @click="jiesuo(ord.id)" class="butt" v-if="ord.permission||ord.drawer==user" style="margin-top: 10px">解锁</div>
                    </td>
                    <td>
                        <div></div>
                        <div v-if="ord.permission||ord.drawer==user" >
                            <div v-if="ord.airCompany=='9C'?true:false">
                                <div class="butt" @click="replacefun(ord.id)" :data-cc="ord.id"  >重订</div>
                                <div class="butt" @click="repay(ord.id)" :data-cc="ord.id" >重付</div>
                            </div>
                            <div v-else-if="ord.airCompany=='PN'?true:false">
                                <div class="butt" @click="replacefun(ord.id)" :data-cc="ord.id"  >重订</div>
                                <div class="butt" @click="repay(ord.id)" :data-cc="ord.id" >重付</div>
                            </div>
                            <div class="butt" v-if="ord.population>1?true:false||ord.Interconnection==2?true:false" @click="BreakUpFun(ord.id,ord.collection)">拆分</div>
                        </div>
                    </td>
                    <td>
                        <div v-if="ord.permission||ord.drawer==user">
                            <div class="butt" v-if="ord.airCompany=='9C'?true:false" @click="changerestart(ord.id)">换号</div>
                            <div class="butt" v-if="ord.airCompany=='PN'?true:false" @click="returnOrdFun(ord.id)" :data-cc="ord.id"  >重回</div>
                            <div class="butt" @click="chupiao(ord.id)" :data-cc="ord.id" >出票</div>
                        </div>
                        <div v-else>{{ord.dealpeople}}</div>
                    </td>
                    <!--票台-->
                    <td>{{ord.platform}}</td>
                    <td> <!--政策代码-->
                        <div>{{ord.policyCode}}</div>
                        <div>{{ord.policy_code_smart}}</div>
                        <div style="display: inline-block">{{ord.policyPerson}}</div>
                        <div v-if="ord.policyRemarks" :title="ord.policyRemarks" style="display: inline-block;height:18px;width: 50px;overflow: hidden;color: red;display: inline-block">
                            {{ord.policyRemarks}}
                        </div>
                    </td>
                    <!--航班信息-->
                    <td>
                        <div :data-red="ord.red" class="td_message">
                            <div>{{ord.code}}</div>
                            <div>{{ord.dptAirport}}</div>
                            <div>{{ord.arrAirport}}</div>
                            <div>{{ord.passengerNumber}}</div>
                            <div>{{ord.dptTime | flightTime}}</div>
                            <div>{{ord.position}}</div>
                        </div>
                    </td>
                    <!--时长  =="酷讯"-->
                    <td>
                        <div :data-redTime="ord.platformTime">{{ord.orderTime}}</div>
                    </td>
                    <!--订单号-->
                    <td>
                        <div @click="locKfuntwo" class="curspointertwo" :data-cc="ord.id" title="以游客身份进入处理页面">{{ord.id}}</div>
                        <div>
                            <div style="display: inline-block;" @dblclick="dblcli" @click="orderUp(ord.id)" class="curspointertwo" :data-cc="ord.id" title="查看日志">{{ord.platformOrder}}</div>
                            <Icon class="curspointertwo" size="15" type="md-document" @click="fuzhifun(ord.platformOrder)" title="复制平台订单号"/>
                        </div>
                    </td>
                    <!--收款付款-->
                    <td>
                        <div>{{ord.collection}}</div>
                        <input type="text" :class="ord.id" placeholder="金额" style="width: 100%;height: 17px"  v-model="ord.pay" v-if="ord.airCompany == '9C'&&ord.permission||ord.drawer==user?true:false">
                    </td>
                    <!--票号回帖-->
                    <td>
                        <div v-if="ord.airCompany == '9C'&&ord.permission||ord.drawer==user?true:false&&ord.ticketTable=='平安淘宝'" style="display: inline-block">
                            <!--<div style="display: inline-block">-->
                            <input type="text" :class="ord.id" placeholder="票号" style="width: 100%;height: 17px" v-model="ord.ticketNum">
                        </div>
                        <div v-if="ord.airCompany == '9C'&&ord.permission||ord.drawer==user?true:false&&ord.ticketTable=='平安淘宝'" style="display: inline-block">
                            <!--<div style="display: inline-block">-->
                            <button class="hand"  @click="returnNum(ord.pay,ord.ticketNum,ord.id)">回帖</button>
                        </div>
                        <div v-if="ord.airCompany == '9C'&&ord.permission||ord.drawer==user?true:false&&ord.ticketTable=='去哪儿'" style="display: inline-block">
                            <!--<div style="display: inline-block">-->
                            <button class="hand"  @click="removeId(ord.policyCode)">拉黑</button>
                        </div>
                    </td>
                    <!--余位-->
                    <td :data-cursite="ord.cursiteColor">
                        <div :data-cursite="ord.cursiteColor">{{ord.cursite | yuwei}}</div>
                        <div :data-cursite="ord.cursiteColor">{{ord.cursite | yuwei2}}</div>
                    </td>
                    <!--平台状态-->
                    <td :title="ord.platformStatus">
                        <div style="height: 60px;overflow: hidden;width: 65px;line-height: 60px;text-align: center; vertical-align:middle;">{{ord.platformStatus}}</div>
                    </td>
                    <!--航司状态-->
                    <td>{{ord.airlineStatus}}</td>
                    <td>
                        <div :title="ord.remarks" style="height: 50px;overflow: hidden;width: 100px">{{ord.remarks}}</div>
                    </td>
                    <td>
                        <button class="butt"  @click="comparefun(ord.id,index)" v-if="!ord.compare&&!(ord.compareError!=null)">比价</button>
                        <div class="td_price" v-else-if="ord.compare">
                            <div>
                                <div><span>{{ord.compare[0].webname}}</span>:<span>{{ord.compare[0].pricemin}}</span></div>
                                <div><span>{{ord.compare[1].webname}}</span>:<span>{{ord.compare[1].pricemin}}</span></div>
                            </div>
                            <div>
                                <div><span>{{ord.compare[2].webname}}</span>:<span>{{ord.compare[2].pricemin}}</span></div>
                                <div><span>{{ord.compare[3].webname}}</span>:<span>{{ord.compare[3].pricemin}}</span></div>
                            </div>
                        </div>
                        <div v-else>{{ord.compareError}}</div>
                    </td>
                </tr>
                </tbody>
            </table>
            <!--分页逻辑-->
            <div style="float: right;margin-top: 20px">
                <button type="button"  class=""  @click="firstpage">第一页</button>
                <button type="button"  class=""  @click="uppage">前一页</button>
                共<span>{{pages}}</span>页&nbsp;&nbsp;
                第&nbsp;<input type="text" style="width:40px;height:22px;padding:5px;display: inline;font-size: .9em;" :value="num" ref="num">&nbsp;页&nbsp;&nbsp;
                <button  class=""  @click="gotopage">转到</button>
                <button  class=""  @click="downpage">后一页</button>
                <button  class=""  @click="llastpage">最后一页</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "artificial_lock",
        data(){
            return{
                //锁定页面的数据承接载体
                orLock:null,
                //总页数
                pages:undefined,
                //起始页数 总是为1
                num:1,
                //  搜索框开关
                searchFlag:false,
                //  条件筛选框开关
                conditionsFlag:false,
                //    input勾选id的集合，当单个input勾选的时候，将其id放入其中，方便批量处理
                orderid:[],
                //    搜索函数是否开启，当搜索开启，此变量会作为true传入，方便翻页的时候判断
                choose:false,
                //    搜索条件存储函数,当搜索开启，此对象将拥有值，方便翻页的时候调用
                chooseObj:null,
                //    个人锁单按钮勾选状态
                aloneChecked:false,
            }
        },
        computed:{
            user:{
                get(){
                    return this.$store.state.user;
                }
            }
        },
        methods:{
            //组件首次调用ajax，获取主体table值
            inpLock2:function(page){
                let a = null;
                this.$store.state.artificialModule.animaFlag = true;
                this.$axios({
                    method:'post',
                    url:'common/OrderHandle/lockOrders',
                    data:{},
                    params:{
                        page
                    }
                    //解析id 将long 转成 string
                    // transformResponse:[(data)=>{
                    //     a = data.match(/"id":[0-9]{1,}/g);
                    //     for(let i=0;i<a.length;i++){
                    //         a[i] = a[i].replace('"id":','')
                    //     }
                    //     data = JSON.parse(data)
                    //     return data
                    // }],
                }).then( (response)=>{
                    this.orLock = response.data.data.list;
                    //筛选酷讯时间变红
                    let leng = this.orLock.length;
                    for(let i=0;i<leng;i++){
                        // this.orLock[i].id = a[i]
                        if(this.orLock[i].ticketTable=="酷讯"){
                            let timeyuan = this.orLock[i].orderTime;
                            let time = timeyuan.match('m');
                            let timeA = undefined;
                            if(time){
                                timeA = (this.orLock[i].orderTime.match(/[1-9]([0-9]*)m/))[0];
                                timeA = (timeA.replace('m',''))*1;
                                if((timeA-20)>=0){
                                    // 超时
                                    this.orLock[i].red_time = "red";
                                }else{
                                    //    没超时
                                    this.orLock[i].red_time = "";
                                }
                            }else if(timeyuan=="刚刚"){
                                this.orLock[i].red_time = "";
                                //    没超时
                            }else if(timeyuan=="以前"){
                                this.orLock[i].red_time = "red";
                                //    超时
                            }else{
                                //    超时 h d
                                this.orLock[i].red_time = "red";
                            }
                            timeyuan = time = timeA = null;
                        }
                    }
                    leng = null;
                    //
                    this.pages = response.data.data.pages;
                    this.choose = false;
                    this.$store.state.artificialModule.animaFlag = false;
                }).catch( (error)=>{
                    console.log(error)
                });
            },
            //搜索框显示隐藏按钮
            searchFlagFun(flag){
                if(flag){
                    this.searchFlag = !this.searchFlag
                }
            },
            //搜索框确认筛选按钮触发函数
            chooselock(obj,choose,page,flag){
                this.$store.state.artificialModule.animaFlag = true;
                //当且只有当搜索条件框的确认筛选按钮按下，才会传obj进来,且choose为true。
                let pagee = undefined;
                if(obj){
                    this.chooseObj = JSON.parse(JSON.stringify(obj));
                }
                page?pagee=page:pagee = 1;
                choose?this.choose=true:this.choose=false;
                obj.page = pagee;
                obj.flag = false;
                this.$axios({
                    method: 'post',
                    url: '../bingo/ticking.php?action=countersign',
                    data:obj
                }).then((response)=>{
                    this.orLock = response.data.list;
                    this.pages = response.data.pages;
                    this.$store.state.artificialModule.animaFlag = false;
                    this.searchFlagFun(flag)
                }).catch((error)=>{
                    console.log(error)
                })
            },
            //条件筛选触发函数
            choosefun:function(choosear){   //条件筛选下满的 确认筛选按钮 会筛选所有打钩的input 放入到choosear里面
                this.$axios({
                    url:'../bingo/ticking.php?action=choose',
                    method:'post',
                    data: choosear,
                }).then((response)=>{
                    this.conditionsFlag = false;
                    this.inpLock2(1)
                }).catch((error)=>{
                    console.log(error)
                })
            },
            //条件筛选关闭函数
            conditionsFun(){
                this.conditionsFlag = !this.conditionsFlag;
            },
            //已经锁单待处理页面的全选按钮 同时在全选的时候给orderid里面添加input,
            allInpLock:function(){
                // var markeLock = document.getElementsByClassName('markeLock');
                let markeLock = this.$refs.inputDom;
                if(event.target.checked){
                    //当全选按钮为true,其input都为置为勾选
                    for(let a=0;a<markeLock.length;a++){
                        markeLock[a].checked = true;
                        //此处去重，防止重复勾选订单，与锁定页面不同，此处使用for循环。而没有直接使用置空。
                        if(!(this.orderid.includes(markeLock[a].dataset.cc))){
                            this.orderid.push(markeLock[a].dataset.cc)
                        }
                    }
                    //同时因为是全选，不能直接使用orLock，因为不一定单是自己的
                    //所以直接用input的属性
                }else{
                    for(let c=0;c<markeLock.length;c++){
                        markeLock[c].checked = false ;
                    };
                    this.orderid = [];
                }
            },
            //批量解锁
            lotSizeLock:function(){
                // let arlockflag = null;
                //用来判断是否有订单被选中，直接通过被选中订单的集合的length来判断
                if(this.orderid.length){
                    this.$axios({
                        method:'post',
                        url:'../bingo/ticking.php?action=locking',
                        data:{
                            orderid:this.orderid,
                            lockorder:'no',
                        }
                    }).then((response)=>{
                        if(response.data.res == 'success'){
                            window.location.reload(true)
                            console.log(this.arLock)
                        }else{
                            alert('解锁失败')
                        }
                    }).catch((error)=>{
                        console.log(error)
                    })
                }else{
                    alert('选项不能为空')
                    window.location.reload(true)
                }
            },
            //锁单待处理页面 只显示个人锁单功能的按钮
            onelockshow:function(){
                this.aloneChecked = !this.aloneChecked;
                if(this.aloneChecked){
                    this.$axios({
                        url:'../bingo/ticking.php?action=oneman',
                        method:'get',
                    }).then((response)=>{
                        this.orLock = response.data.list
                    }).catch((error)=>{
                        console.log(error)
                    })
                }else{
                    this.$axios({
                        method:'post',
                        url:'../bingo/ticking.php?action=locklist',
                        data:{
                            page:this.num
                        }
                    }).then( (response)=>{
                        this.orLock = response.data.list;
                        this.lockpages = response.data.pages;
                    }).catch( (error)=>{
                        console.log(error)
                    });
                }
            },
            //单个订单的input触发函数 当为true,看是否要勾选全选按钮，当为fals,全选按钮置为false
            addInputId(id){
                let markeLock = this.$refs.inputDom;
                if(event.target.checked){
                    this.orderid.push(id);
                    if(this.orderid.length==markeLock.length){
                        const allInput = document.getElementById('allcheck_lock');
                        allInput.checked = true;
                    }
                }else{
                    this.orderid.forEach((value,index)=>{
                        if(value==id){
                            this.orderid.splice(index,1)
                        }
                    })
                    const allInput = document.getElementById('allcheck_lock');
                    allInput.checked = false;
                }
            },
            //单独解锁按钮函数
            jiesuo:function (orderid) {
                orderid = [orderid];
                this.$axios({
                    url:'../bingo/ticking.php?action=locking',
                    method:'post',
                    data:{
                        orderid,
                        lockorder:'no',
                        // see:false,
                    }
                }).then((response)=>{
                    if(response.data.res == 'success'){
                        window.location.reload(true)
                    }else{
                        alert('解锁失败')
                    }
                }).catch((error)=>{
                    console.log(error)
                });

            },
            //重启订票
            replacefun:function(orderid){
                this.$axios({
                    url:'../ticket/manual.php?action=restart',
                    method:'post',
                    data:{
                        orderid
                    }
                }).then(res=>{
                    if(!res.data){
                        window.location.reload(true)
                    }else{
                        alert('该单已经被其他人重启订票')
                    }
                }).catch(error=>console.log(error))

            },
            //重回函数
            returnOrdFun(orderid){
                this.$axios({
                    url:'../ticket/manual.php?action=pn_replay',
                    method:'post',
                    data:{
                        orderid
                    }
                }).then(res=>{
                    if(!res.data){
                        window.location.reload(true)
                    }else{
                        alert('该单已经被其他人重回')
                    }
                }).catch(error=>console.log(error))
            },
            //重启支付
            repay:function(orderid){
                this.$axios({
                    url:'../ticket/manual.php?action=repay',
                    method:'post',
                    data:{
                        orderid
                    }
                }).then(res=>{
                    if(!res.data){
                        window.location.reload(true)
                    }else{
                        alert('该单已经被其他人重启支付')
                    }
                }).catch(error=>{console.log(error)})
            },
            //换号重启
            changerestart:function(orderid){
                this.$axios({
                    url:'../ticket/manual.php?action=change_restart',
                    method:'post',
                    data:{
                        orderid
                    }
                }).then(res=>{
                    if(!res.data){
                        window.location.reload(true)
                    }else{
                        alert('该单已经被其他人换号重启')
                    }
                }).catch(error=>console.log(error))
            },
            //出票函数
            chupiao:function(id){
                this.$router.push({name:'deal',params:{id}})
                // this.$router.push({path:'deal',query:{id}})
                // window.location.href='../template/artificialDeal.html?id='+id;
            },
            //拆分函数
            BreakUpFun:function(id,collection){
                // this.$axios({
                //     method:'post',
                //     url:'../bingo/ticking.php?action=obtain_information',
                //     data:{
                //         orderid:id
                //     }
                // }).then((response)=>{
                //     this.$store.state.artificialModule.splitFlag = true;
                //     this.$store.state.artificialModule.splitObj = response.data.namelist;
                //     this.$store.state.artificialModule.splitObj.totalmoney = collection;
                //     this.$store.state.artificialModule.splitObj.id = id;
                // }).catch((error)=>{
                //     console.log(error)
                // })
                this.$store.state.artificialModule.splitCollection = collection;
                this.$store.state.artificialModule.splitFlag = true;
                this.$store.state.artificialModule.splitId = id
            },
            //回帖函数 （指令函数已去除，但还保留指令，但是不会触发，防不时之需）
            returnNum(cash,ticket,orderid){
                ticket = ticket.replace(/^\s+/,'');
                ticket = ticket.replace(/\s+$/,'');
                store.state.animaFlag = true;
                this.$axios({
                    url:'../ticket/manual.php?action=reply',
                    method:'post',
                    data:{
                        orderid,
                        ticket,
                        cash,
                    }
                }).then((response)=>{
                    store.state.animaFlag = false;
                    if(response.data=='回帖成功'){
                        window.location.reload(true)
                    }else if(response.data=='票号校验失败'){
                        alert('票号校验失败')
                    }
                }).catch((error)=>{
                    console.log(error)
                })
            },
            //拉黑函数
            removeId(username){
                this.$axios({
                    method:'post',
                    url:'../ticket/manual.php?action=black',
                    data:{
                        username
                    }
                }).then(res=>{if(res.data)alert('成功')}).catch(err=>{console.log(err)})
            },
            //点击订单号，跳转到处理页面，但是只能看不能操作 游客模式
            locKfuntwo:function(){
                // this.orderid=[];  //重置orderid 以免上次数组里面的值残留其中没有去掉
                var va = event.target.dataset.cc;
                window.location.href='../template/artificialDeal.html?id='+va+'&see=true';
            },
            //双击函数
            dblcli:function(){
                this.dbl = true;
                //清除上个计时器
                clearTimeout(this.clinum)
            },
            //copy函数
            fuzhifun:function(id){
                this.$refs.copy.value = id;
                this.$refs.copy.select();
                document.execCommand('copy',false);
            },
            //日志函数
            orderUp:function(orderid){
                this.clinum = setTimeout(()=>{
                    if(!this.dbl){
                        this.logflag = true;
                        this.$store.state.artificialModule.animaFlag = true;
                        this.$axios({
                            url:'../bingo/ticking.php?action=log',
                            method:'post',
                            data:{
                                orderid
                            }
                        }).then((response)=>{
                            //日志显隐是通过logar是否有值来判断的。即logar既是数据载体，也是判断依据
                            this.$store.state.artificialModule.logar = response.data.list;
                            this.$store.state.artificialModule.animaFlag = false;
                        }).catch((error)=>{
                            console.log(error)
                        })
                    }
                    this.dbl = false
                },200)
                let b = new Date().getTime();
            },
            //比价函数
            comparefun(id,index){
                this.$axios({
                    url:'../bingo/ticking.php?action=price',
                    method:'post',
                    data:{
                        orderid:id
                    }
                }).then(res=>{
                    //res.data = [{"webname":"同程","pricemin":980},{"webname":"淘宝","pricemin":980},{"webname":"携程","pricemin":910},{"webname":"去哪儿","pricemin":"910"}]
                    // Vue.set(this.orLock[index],'compare',a)
                    if(res.data instanceof Array){
                        Vue.set(this.orLock[index],'compare',res.data)
                    }else{
                        Vue.set(this.orLock[index],'compareError',res.data)
                    }
                }).catch(err=>{console.log(err)})
            },
            //分页函数
            //向后转页面 —
            uppage:function(){
                if(this.num>1){
                    this.num -= 1;
                }else if(this.num<1){
                    alert('没有该页码')
                }else{
                    return
                }
                this.axfun(this.num);
            },
            //向前转页面 +
            downpage:function(){
                this.num = Number(this.num); //之前的显示数字其本质为字符串导致无法数字计算
                if(this.num<this.pages){
                    this.num = this.num + 1;
                }else{
                    return
                };
                this.axfun(this.num)
            },
            //直接去某页面
            gotopage:function () {
                let val = this.$refs.num.value;
                if(val > this.pages||val<1){
                    //页数框页码重置
                    this.$refs.num.value = this.num;
                    alert('没有该页码');
                }else{
                    this.num = Math.round(this.num);
                    this.num = val;
                    this.axfun(this.num)
                }
            },
            //直接去首页
            firstpage:function () {
                //如果已经等于第一页，就不再请求
                if(this.num == 1){
                    return
                }
                this.num = 1;
                this.axfun(this.num)
            },
            //直接去末尾页
            llastpage:function () {
                //如果已经等于最后已页，就不再请求
                if(this.num == this.pages){
                    return
                }
                this.num = this.pages;
                this.axfun(this.num)
            },
            //跳转后把页面值传入，用来获取要跳转页面的数据，此函数为上面所有跳转函数的通用操作
            axfun:function(page){
                //根据不同的值 来做ajax不同请求 当choose为true;则搜索是开启状态，否则是关闭状态
                //若搜索为真，则直接调用搜索函数，把之前保存的搜索条件传过去；请求搜索后的结果;
                //若搜索为假，则直接调用请求函数，直接拿值；
                if(this.choose){
                    this.chooselock(this.chooseObj,true,page)
                }else{
                    this.inpLock2(page);
                }
            },
        },
        filters:{
            flightTime(data){
                let spaceInd = data.split(' ');
                return spaceInd[0]
            },
            yuwei:function (data) {
                if(data){
                    const data01 = data.split('-');
                    return data01[0];
                }
            },
            yuwei2:function (data) {
                if(data){
                    const data01 = data.split('-');
                    return data01[1];
                }
            },
        },
        created(){
            let a = sessionStorage.getItem('payTimeA');
            let b = sessionStorage.getItem('payTimeB');
            this.$store.state.artificialModule.remenberObj.payTime[0] = a;
            this.$store.state.artificialModule.remenberObj.payTime[1] = b;
            if(a){
                this.chooselock(this.$store.state.artificialModule.remenberObj,true,1)
            }else{
                this.inpLock2(1);
            }
        }
    }
</script>

<style scoped>
    /*.headBorder>th{*/
        /*border: 1px #E7E7E7 solid;*/
    /*}*/
    .gray>button{
        margin-left: 10px;
    }
    /*.butt{*/
        /*background-color: #F0FAFF;*/
        /*cursor: pointer;*/
        /*display: inline-block;*/
        /*margin: 1px 0 1px 0;*/
        /*padding: 0 5px;*/
        /*border: 1px silver solid;*/
    /*}*/
    /*.butt:hover{*/
        /*background-color: orange;*/
    /*}*/
    .buttOne{
        margin: -2px 0 1px 0;
    }
    .buttTwo{
        margin: 6px 0 1px 0;
    }
    .buttTwo:hover{
        background-color: #ABA3E0;

    }
    /*个人锁单按钮*/
    .aloneClock{
        position: absolute;
        margin-left: 112px;
        margin-top: -20px;
        width: auto;
        /*height: 32px;*/
    }
    /*确认筛选与条件筛选按钮的样式*/
    .buttThree{
        border: 1px solid #C3C3D6;
        background-color: white;
        padding: 4px;
        cursor: pointer;
        border-radius: 4px;
    }
    .buttThree:hover{
        background-color: #ABA3E0;
    }
    .buttThree:active{
        background-color: skyblue;
    }
</style>