<template>
    <div style="margin-top: 6px">
        <!--<transition name="searchAnimation" duration="{enter:3000,leave:3000}">-->
        <search v-if="searchFlag"
                @chooselock="chooselock"
                @conditionsfun="conditionsFun"
                :conditionsFlag="conditionsFlag"
        >
        </search>
        <!--</transition>-->
        <!--<transition name="searchAnimation">-->
        <conditions
                v-if="conditionsFlag"
                @conditionsfun="conditionsFun"
                @choosefun="choosefun"
        >
        </conditions>
        <!--</transition>-->
        <div class="fuzhiDom">
            <input type="text" class="fuzhiId" ref="copy">
        </div>
        <div>
            <div>
                <div class="gray">
                    <Button type="primary" size="small" @click="three">锁定前3单</Button>
                    <Button type="primary" size="small" @click="lotSize">批量锁定</Button>
                    <Button type="primary" size="small" @click="searchFlagFun">搜索</Button>
                    <!--<div class="butt buttOne" @click="three">锁定前3单</div>-->
                    <!--<div class="butt buttOne" @click="lotSize">批量锁定</div>-->
                    <!--<div class="butt buttOne" @click="searchFlagFun">搜索</div>-->
                    <!--<div class="searchDom" @click="searchFlagFun"></div>-->
                </div>
                <div  style="padding:5px;">
                    <table class="ariticialTalbe" style="font-size: 12px;width: 100%">
                        <colgroup>
                            <col style="width:5%"><!--全选-->
                            <col style="width:4%"><!--订单处理-->
                            <col style="width:7%"><!--票台-->
                            <col style="width:16%"><!--政策代码-->
                            <col style="width:10%"> <!--航班信息-->
                            <col style="width:4%;"><!--时长-->
                            <col style="width:auto"><!--订单号-->
                            <col style="width:70px"><!--余位-->
                            <col style="width:5%"><!--收付款	-->
                            <col style="width:6%"><!--备注-->
                            <col style="width:15%"><!--比价-->
                        </colgroup>
                        <thead >
                        <tr style="text-align:center;height: 40px" class="headBorder">
                            <th style="padding: 1px">
                                <div>
                                    <input type="checkbox"  @click='allInp' id="allcheck">
                                    <span>全选</span>
                                </div>
                            </th>
                            <th>
                                <div>
                                    <span>订单</span>
                                </div>
                            </th>
                            <th style="text-align:center">平台</th>
                            <th>政策代码</th>
                            <th>航班信息</th>
                            <th style="padding: 1px">时长</th>
                            <th>订单号</th>
                            <th>余位</th>
                            <th>收付款</th>
                            <th>备注</th>
                            <th>比价</th>
                        </tr>
                        </thead>
                        <tbody class="ariticialTalbeChild" >
                        <tr v-for="(ord,index) in or" :key="ord.id" :data-color="ord.mode==0?'color':false" style="height: 60px">
                            <td>
                                <button class="butt"  @click="locKfun(ord.aircompany_str,ord.id)">锁单</button>
                                <!--<button v-else-if="ord.isAssociation=='1'?true:false"  class="butt"  @click="lienFun(ord.aircompany_str,ord.id)">关联锁单</button>-->
                                <label>
                                    <div>
                                        <input  type="checkbox" @click='onlyInputCheck(ord.id)' ref="inputDom">
                                        {{index+1}}
                                    </div>
                                </label>
                            </td>
                            <td>
                                <div v-if="ord.mode==0?false:ord.aircompany_str=='9C'?true:false" class="ticiketButton">
                                    <button class="butt buttOne" title="重启订票"  :data-cc="ord.id" @click="replacefun(ord.id)">重订</button>
                                    <button class="butt buttTwo" title="重启支付"  :data-cc="ord.id" @click="repay(ord.id)">重付</button>
                                </div>
                            </td>
                            <td>
                                <div>{{ord.ticketTable}}</div>
                            </td>
                            <td> <!--政策代码与个人备注-->
                                <div v-if="ord.orderMarkes" >
                                    <div style="width: 100%;">
                                        <div>{{ord.policyCode}}&emsp;{{ord.policyPerson}}</div>
                                        <div>{{ord.policy_code_smart }}</div>
                                    </div>
                                    <div style="height: 20px;overflow: hidden;color:red" :title="ord.orderMarkes">
                                        {{ord.orderMarkes}}
                                    </div>
                                </div>
                                <div v-else>
                                    <div>
                                        <div>{{ord.policyCode}}&emsp;{{ord.policyPerson}}</div>
                                    </div>
                                </div>
                            </td>
                            <td> <!--航班信息-->
                                <div :data-red="ord.red" class="td_message">
                                    <div>{{ord.code}}</div>
                                    <div>{{ord.dptAirport}}-{{ord.arrAirport}}</div>
                                    <div>{{ord.passengerNumber}}</div>
                                    <div>{{ord.dptTime}}</div>
                                    <div>{{ord.position}}</div>
                                </div>
                            </td>
                            <!--时长-->
                            <td>
                                <div :data-redTime="ord.red_time">{{ord.orderTime}}</div>
                            </td>
                            <!--订单号-->
                            <td class="chaFather">
                                <div class="cha" v-if="ord.isdone==0?false:true"></div>
                                <div @click="locKfuntwo" class="curspointertwo" :data-cc="ord.id" data-toggle="modal">{{ord.id}}</div>
                                <div style="display: inline-block" @dblclick="dblcli" @click="orderUp(ord.id)" class="curspointertwo" :data-cc="ord.id" data-toggle="modal">{{ord.platformOrder}}</div>
                                <div class="fuzhi" @click="fuzhifun(ord.platformOrder)"></div>
                            </td>
                            <!--余位-->
                            <td :data-cursite="ord.cursiteColor">
                                <div :data-cursite="ord.cursiteColor">{{ord.cursite | yuwei}}</div>
                                <div :data-cursite="ord.cursiteColor">{{ord.cursite | yuwei2}}</div>
                            </td>
                            <!--收付款-->
                            <td>
                                <div>{{ord.collection}}</div>
                                <div>{{ord.pay}}</div>
                            </td>
                            <!--备注-->
                            <td>
                                <div :title="ord.remarks" style="height: 50px;overflow: hidden;width: 150px;">{{ord.remarks}}</div>
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
        </div>

    </div>
</template>

<script>
    // import search from '../components/aritificial/BaseSearch.vue'
    // import memory from '../components/aritificial/memoryChoose.vue'

    export default {
        name: "artificial_unlocked",
        data(){
            return{
                //存放未锁单数据的集合
                or:null,
                //ajaxs请求后拿到的总页数
                pages:undefined,
                //起始页数总为1
                num:1,
                //存放选中的id，其它ajax函数用次集合来锁单这些id
                lockArray:[],
                //    搜索框开关
                searchFlag:false,
                //    搜索函数是否开启，当搜索开启，此变量会作为true传入，方便翻页的时候判断
                choose:false,
                //    搜索条件存储函数,当搜索开启，此对象将拥有值，方便翻页的时候调用
                chooseObj:null,
                //    平台订单号
                platformOrder:null,
                //    条件筛选框开关
                conditionsFlag:false,
            }
        },
        methods:{
            //未锁单页面功能 触发未锁单页面并请求数据
            inpLock:function(page){

                // this.$store.state.artificialModule.animaFlag = true;
                // this.inplock = false;
                // this.flag = true;
                // this.num = 1;  //从锁单页面跳转过来，将num,nnum重置，避免因为两个页面使用同一个参数导致错误
                // this.nnum = '';
                this.$axios({
                    method:'post',
                    url:'common/OrderHandle/notLockOrders',
                    data:{},
                    params:{
                        page
                    }
                }).then( (res)=>{
                    this.or = res.data.data.list
                    //酷讯时间筛选
                    let leng = this.or.length;
                    for(let i=0;i<leng;i++){
                        //替换id
                        if(this.or[i].ticketTable=="酷讯"){
                            let timeyuan = this.or[i].orderTime;
                            let time = timeyuan.match('m');
                            let timeA = undefined;
                            if(time){
                                timeA = (this.or[i].orderTime.match(/[1-9]([0-9]*)m/))[0];
                                timeA = (timeA.replace('m',''))*1;
                                if((timeA-20)>=0){
                                    // 超时
                                    this.or[i].red_time = "red";
                                }else{
                                    //    没超时
                                    this.or[i].red_time = "";
                                }
                            }else if(timeyuan=="刚刚"){
                                this.or[i].red_time = "";
                                //    没超时
                            }else if(timeyuan=="以前"){
                                this.or[i].red_time = "red";
                                //    超时
                            }else{
                                //    超时 h d
                                this.or[i].red_time = "red";
                            }
                            timeyuan = time = timeA = null;
                        }
                    }
                    leng = null;
                    //
                    this.pages = res.data.data.pages;
                    //初始化请求让条件筛选ajax函数开关为false。
                    this.choose = false;
                    this.$store.state.artificialModule.animaFlag = false;
                }).catch( (error)=> {
                    console.log(error)
                });
            },
            //搜索框显示隐藏按钮触发函数（非记忆搜索框）
            searchFlagFun(flag){
                if(flag){
                    this.searchFlag = !this.searchFlag
                }
            },
            //搜索框确认筛选函数（非记忆搜索功能）
            chooselock(obj,choose,page,flag){
                //obj 搜索条件对象
                // choose boolean值,判断是否有翻页
                // page页数
                // flag boolean值，判断是否开启搜索框,但是这里使用这个仅仅是为了在页面初始化的时候不会
                //开启搜索框，因为从前写的逻辑，搜索框有值，且调用，会自动开启搜索框。所以用此值来关闭。
                this.$store.state.artificialModule.animaFlag = true;
                //当obj传入，意味搜索打开，obj是搜索的条件;choose作为true传进来;
                let pagee = undefined;
                if(obj){
                    this.chooseObj = JSON.parse(JSON.stringify(obj));
                }
                page?pagee=page:pagee = 1;
                //如果翻页，翻页函数会通过此判断翻页是否有搜索条件
                choose?this.choose=true:this.choose=false;
                obj.page = pagee;
                obj.flag = true;
                this.$axios({
                    method: 'post',
                    url: '../bingo/ticking.php?action=countersign',
                    data:obj
                }).then((response)=>{
                    this.or = response.data.list;
                    this.pages = response.data.pages;
                    this.$store.state.artificialModule.animaFlag = false;
                    this.searchFlagFun(flag)
                }).catch((error)=>{
                    console.log(error)
                });
            },
            //条件筛选关闭函数（记忆搜索框功能）
            conditionsFun(){
                this.conditionsFlag = !this.conditionsFlag;
            },
            //条件筛选触发函数（记忆搜索功能）
            choosefun:function(choosear){   //条件筛选下的 确认筛选按钮 会筛选所有打钩的input 放入到choosear里面
                this.$axios({
                    url:'../bingo/ticking.php?action=choose',
                    method:'post',
                    data: choosear,
                }).then((response)=>{
                    this.conditionsFlag = false;
                    this.inpLock(1)
                }).catch((error)=>{
                    console.log(error)
                })
            },
            //锁定前三张单按钮
            three:function(){
                if(this.or.length == 0){
                    alert('暂无数据')
                    return
                }
                for(let a=0;a<=2;a++){
                    //用判断是因为有的时候单没有三个单，比如两个单情况下，a为2是没有值的。
                    if(this.or[a]){
                        this.lockArray.push(this.or[a].id)
                    }
                }
                this.$axios({
                    url:'../bingo/ticking.php?action=locking',
                    method:'post',
                    data:{
                        orderid:this.lockArray,
                        lockorder:'yes',
                    }
                }).then((response)=>{
                    if(response.data.res=='success'){
                        //锁定前三单后跳转到已锁单页面
                        this.$store.state.artificialModule.name = 'name3';
                    }else{
                        alert('锁单失败')
                    }
                }).catch((error)=>{
                    console.log(error)
                })
            },
            //批量锁定按钮
            lotSize:function(){
                if(this.lockArray.length){
                    var f1 = confirm('确定所选？');
                    if(f1){
                        this.$axios({
                            url:'../bingo/ticking.php?action=locking',
                            method:'post',
                            data:{
                                orderid:this.lockArray,
                            }
                        }).then((res)=>{
                            if(!res.data.code){
                                //批量锁定后需要直接跳转到已锁定页面
                                this.$store.state.artificialModule.name = 'name3';
                            }else{
                                alert('该单已被锁')
                                return
                            }
                        }).catch((error)=>{
                            console.log(error)
                        })
                    }else if(!f1){
                        return
                    }
                }else{
                    alert('选项为空')
                }
            },
            //全选按钮
            allInp:function(){
                //全选按钮为true后，将所有input按钮置位true
                if(event.target.checked){
                    //下面直接清空id的集合数组，然后再赋值，直接使用ajax得来的数据集合中的各个id
                    //清空原因在于如果某个订单已经被选中，那么再次全选会导致选中两次，所以需要去重，
                    //但是去重需要for循环，干脆直接重置为空，然后再for循环赋值。
                    this.lockArray = [];
                    for(let a=0;a<this.$refs.inputDom.length;a++){
                        this.$refs.inputDom[a].checked = true;
                        this.lockArray.push(this.or[a].id)
                    }
                }else{
                    //当全选按钮为false,将所有按钮置位false
                    for(let a=0;a<this.$refs.inputDom.length;a++){
                        this.$refs.inputDom[a].checked = false;
                    }
                    //下面直接清空id的集合数组，然后再赋值，直接使用ajax得来的数据集合中的各个id
                    this.lockArray = [];
                }
            },
            //单个input在打钩的时候输出id值到集中选地的array
            onlyInputCheck:function(id){
                let alldom = document.getElementById('allcheck');
                if(event.target.checked){
                    this.lockArray.push(id);
                    if(this.lockArray.length==this.or.length){
                        alldom.checked = true;
                    }
                }else{
                    this.lockArray.forEach((item,index)=> {   //删除在ar中添加的cc值
                        this.lockArray[index] == id?this.lockArray.splice(index,1):'';
                    });
                    alldom.checked = false;
                }
            },
            //锁单按钮直接跳转页面
            locKfun:function(table,id){
                let orderId=[id];  //后台需要传入一个数组
                //告诉后台当前是锁单而不是解锁
                this.$axios({
                    url:'common/OrderHandle/lockOrder',
                    method:'post',
                    data:orderId,
                }).then((res)=>{
                    if(!res.data.code){
                        this.$store.state.artificialModule.name = 'name3';
                    }else{
                        alert('该单已被锁')
                        // window.location.reload(true)
                    }
                }).catch((error)=>{
                    console.log(error)
                })
            },
            //关联锁单按钮
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
            //双击函数
            dblcli:function(){
                this.dbl = true;
                //清除上个计时器
                clearTimeout(this.clinum)
            },
            //点击订单号，触发游客模式
            locKfuntwo:function(){
                // this.orderid=[];  //重置orderid 以免上次数组里面的值残留其中没有去掉
                var va = event.target.dataset.cc;
                window.location.href='../template/artificialDeal.html?id='+va+'&see=true';
            },
            //copy函数
            fuzhifun:function(id){
                this.$refs.copy.value = id;
                this.$refs.copy.select();
                document.execCommand('copy',false);
            },
            //日志功能
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
            //比价功能函数
            comparefun(id,index){
                this.$axios({
                    url:'../bingo/ticking.php?action=price',
                    method:'post',
                    data:{
                        orderid:id
                    }
                }).then(res=>{
                    /*let a = [{"webname":"同程","pricemin":980},{"webname":"淘宝","pricemin":980},{"webname":"携程","pricemin":910},{"webname":"去哪儿","pricemin":"910"}]
                    Vue.set(this.or[index],'compareError',a)*/

                    if(res.data instanceof Array){
                        Vue.set(this.or[index],'compare',res.data)
                    }else{
                        Vue.set(this.or[index],'compareError',res.data)
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
                //如果num已经是第一页了，就不再请求了
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
                    this.inpLock(page);
                }
            },
        },
        filters:{
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
                this.inpLock(1);
            }

        }
    }
</script>
<style scoped src="../../../assets/css/artificial_table.css"></style>
<style scoped>
.gray>button{
    margin-left: 10px;
}

</style>