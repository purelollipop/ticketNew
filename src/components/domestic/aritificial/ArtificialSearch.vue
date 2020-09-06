<template>
    <div id="choose">
        <div class="chooseOne">
            <!--航司选择框-->
            <div style="margin: 0px 10px 0px 10px">
                <div style="color:black">航司选择</div>
                <select  class="chooseChildA" filterable v-model="aircompany_str">
                    <option value="">全部</option>
                    <option value="3U">3U</option>
                    <option value="9C">9C</option>
                    <option value="ZH">ZH</option>
                    <option value="MF">MF</option>
                    <option value="CA">CA</option>
                    <option value="BK">BK</option>
                    <option value="HO">HO</option>
                    <option value="EU">EU</option>
                    <option value="SC">SC</option>
                    <option value="KY">KY</option>
                    <option value="NS">NS</option>
                    <option value="QW">QW</option>
                    <option value="TV">TV</option>
                    <option value="G5">G5</option>
                    <option value="DZ">DZ</option>
                    <option value="UQ">UQ</option>
                    <option value="GJ">GJ</option>
                    <option value="JR">JR</option>
                    <option value="A6">A6</option>
                    <option value="GY">GY</option>
                    <option value="RY">RY</option>
                </select>
            </div>
            <!--平台选择-->
            <div>
                <!--<input type="text" placeholder="" class="form-control inp">-->
                <div style="margin: 0px 10px 0px 10px">
                    <div style="color:black">平台选择</div>
                    <select class="chooseChildA" v-model="ticketTable">
                        <option value="">全部</option>
                        <option value="淘宝9C">淘宝9C</option>
                        <option value="去哪儿">去哪</option>
                    </select>
                </div>
            </div>
            <!--日期选择框-->
            <div>
                <div>支付日期</div>
                <div id="datepicker">
                    <Date-picker v-model="payTime"
                                 type="daterange"
                                 placement="bottom-end"
                                 placeholder="支付日期"
                                 @on-change="payTimeFun"
                                 @on-clear = 'flyClearFun'
                                 style="width: 250px">
                    </Date-picker>
                </div>
            </div>
            <!--起飞日期-->
            <div>
                <div>起飞日期</div>
                <Date-picker type="daterange"
                             v-model="flyTime"
                             placement="bottom-end"
                             placeholder="起飞日期"
                             @on-change="flyTimeFun"
                             style="width: 200px;display: block">
                </Date-picker>
            </div>
            <!--条件筛选-->
            <div> <!-- 筛选弹窗 @click="ceshifun" -->
                <div class="buttThree"  @click="condition">条件筛选</div>
                <!--<i-button type="primary" shape="circle" icon="ios-book" size="small">条件筛选</i-button>-->
                <!--<button></button>-->
            </div>
        </div>
        <div class="chooseTwo">
            <!--大PNR-->
            <i-input class="chooseChild" v-model="bigNumber">
                <span slot="prepend">大PNR</span>
            </i-input>
            <!--小PNR-->
            <i-input class="chooseChild" v-model="smartNumber">
                <span slot="prepend">小PNR</span>
            </i-input>
            <!--换大PNR-->
            <i-input class="chooseChild" v-model="big">
                <span slot="prepend">换大PNR</span>
            </i-input>
            <!--换小PNR-->
            <i-input class="chooseChild" v-model="smart">
                <span slot="prepend">换小PNR</span>
            </i-input>
            <!--乘客姓名-->
            <i-input class="chooseChild" v-model="man">
                <span slot="prepend">乘客姓名</span>
            </i-input>
            <!--平台政策代码-->
            <i-input class="chooseChild" v-model="policyCode">
                <span slot="prepend">平台政策代码</span>
            </i-input>
            <!--航班号-->
            <i-input class="chooseChild" v-model="flight">
                <span slot="prepend">航班号</span>
            </i-input>
            <!--系统订单号-->
            <i-input class="chooseChild" v-model="id">
                <span slot="prepend">系统订单号</span>
            </i-input>
            <!--平台订单号-->
            <i-input class="chooseChild" v-model="platformOrder">
                <span slot="prepend">平台订单号</span>
            </i-input>
            <!--确认筛选条件-->
            <div>
                <div class="buttThree" @click="chooselock">确认筛选</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "search",
        data(){
            return{
                aircompany_str:null,//航司
                payTime:[], //支付日期
                flyTime:[], //起飞日期
                ticketTable:null,//平台选择
                bigNumber:null, //大pnr
                smartNumber:null,//小pnr
                big:null,//换大pnr
                smart:null, //换小pnr
                man:null, //乘客姓名
                policyCode:null, //政策代码
                flight:null, //航班号
                id:null,//系统订单号
                platformOrder:null,//平台订单号
                //是否要调用格式转换
                changeFlmat:true,
            }
        },
        computed:{
            name(){
                return this.$store.state.name;
            }
        },
        methods:{
            //清空支付日期
            flyClearFun(){
                sessionStorage.setItem('payTimeA','');
                sessionStorage.setItem('payTimeB','');
            },
            //确认筛选按钮的函数，更新为筛选后的数据
            chooselock:function () {
                if(this.changeFlmat){
                    let a = new Date();
                    this.payTime[0] = a.toLocaleDateString(this.payTime[0]).replace(/\//g,'-');
                    this.payTime[1] = a.toLocaleDateString(this.payTime[1]).replace(/\//g,'-');
                }
                let obj = {
                    aircompany_str:this.aircompany_str,
                    payTime:this.payTime,
                    flyTime:this.flyTime,
                    ticketTable:this.ticketTable,
                    bigNumber:this.bigNumber,
                    smartNumber:this.smartNumber,
                    big:this.big,
                    smart:this.smart,
                    man:this.man,
                    policyCode:this.policyCode,
                    flight:this.flight,
                    id:this.id,
                    platformOrder:this.platformOrder,
                    //    还有个判断是否在锁定页面的开关？
                };
                this.$emit('chooselock',obj,true);
                a=obj=null;
            },
            //支付日期过滤
            payTimeFun(data){
                this.payTime[0] = data[0];
                this.payTime[1] = data[1];
                // console.log(this.payTime[0],this.payTime[1])
                // console.log(sessionStorage.getItem('payTimeA'))
                sessionStorage.setItem('payTimeA',this.payTime[0]);
                sessionStorage.setItem('payTimeB',this.payTime[1]);
                // console.log(sessionStorage.getItem('payTimeA'))
                this.changeFlmat = false;
            },
            //起飞日期过滤
            flyTimeFun(data){
                this.flyTime[0] = data[0];
                this.flyTime[1] = data[1];
            },
            //条件筛选按钮触发
            condition(){
                this.$emit('conditionsfun')
            },
        },
        created(){
            this.payTime[0] = sessionStorage.getItem('payTimeA');
            this.payTime[1] = sessionStorage.getItem('payTimeB');
            if(!this.payTime[0]) {
                let time = new Date;
                let b = time.toLocaleDateString().replace(/\//g,'-');
                let a = (time.toLocaleDateString(time.setDate(time.getDate()-1))).replace(/\//g,'-');
                this.payTime[0] = a;
                this.payTime[1] = b;
                time=a=b=null;
            }
        },
        updated(){}
    }
</script>

<style scoped>

</style>