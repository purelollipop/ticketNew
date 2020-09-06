<template>
    <div id="artificialDom">
        <div>
            <!--日志-->
            <log></log>
            <!--拆分-->
            <split v-if="splitFlag"></split>
            <!--动画-->
            <!--<Col class="demo-spin-col" span="8">-->
            <!--<Spin fix v-if="animaFlag">-->
            <!--<Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>-->
            <!--<div>Loading</div>-->
            <!--</Spin>-->
            <!--</Col>-->
            <!--主体table-->
            <Tabs v-model="name"
                  :animated="false"
                  style="min-height: 1000px">
                <Tab-pane label="自动出票中" name="name1">
                    <ticketing v-if="name=='name1'"></ticketing>
                </Tab-pane>
                <Tab-pane label="未锁定" name="name2">
                    <unlocked v-if="name=='name2'"></unlocked>
                </Tab-pane>
                <Tab-pane label="已锁定" name="name3">
                    <locked v-if="name=='name3'"></locked>
                </Tab-pane>
                <Tab-pane label="客服异常单" name="name4">
                    <serve v-if="name=='name4'"></serve>
                </Tab-pane>
            </Tabs>
        </div>
    </div>
</template>

<script>

    // const Foo = () => Promise.resolve('../page/Artificial.vue')
    import ticketing from '../../../components/domestic/aritificial/ArtificialTicketing.vue'
    import unlocked from '../../../components/domestic/aritificial/ArtificialUnlocked.vue'
    import locked from '../../../components/domestic/aritificial/ArtificialLock.vue'
    import serve from '../../../components/domestic/aritificial/ArtificialServeAbnormal.vue'
    import log from '../../../components/domestic/aritificial/ArtificialLog.vue'


    import {mapActions,mapState,mapGetters,mapMutations} from 'vuex'

    export default {
        name: "artificial",
        data(){
            return{}
        },
        computed:{
            name:{
                get:function () {
                    return this.$store.state.artificialModule.name;
                    // return mapState.artificial.name;
                },
                set:function (data) {
                    this.$store.state.artificialModule.name = data
                }
            },
            animaFlag(){
                return this.$store.state.artificialModule.animaFlag;
            },
            splitFlag(){
                return this.$store.state.artificialModule.splitFlag
            },
        },
        components:{
            ticketing,
            unlocked,
            locked,
            serve,
            log,
        },
        created() {

        }
    }
</script>
<style scoped>
</style>
<style lang="stylus">
    table
        border-collapse collapse
        .butt
            background-color: #F0FAFF;
            cursor: pointer;
            display: inline-block;
            margin: 1px 0 1px 0;
            padding: 0 5px;
            border: 1px silver solid;
        .butt:hover
            background-color: orange;
         tr td
            text-align: center;

    /*----搜索框的诸多样式集合----*/
    /*开启搜索框的dom*/
    .searchDom{
        /*margin-top: 50px;*/
        position: absolute;
        margin-left: 10px;
        margin-top: -5px;
        /*background-image:url('../images/font/search04.png');*/
        width: 32px;
        height: 32px;
        background-size: 80%;
        background-repeat: no-repeat;
        display: inline-block;
        cursor:pointer;
    }
    .platformOrderDom{
        position: absolute;
        margin-left: 175px;
        top: -10px;
        margin-bottom: 5px;
        /*display: inline-block;*/
    }
    /*搜索框内部模块*/
    .chooseOne{
        /*width: 100%;*/
        display: flex;
        flex-wrap: wrap;
        align-items: center;

        /*flex-grow: ;*/
    }
    .chooseOne>div{
        margin: 0 10px 0 10px;
    }
    .chooseTwo{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        /*flex-grow: ;*/
    }
    .chooseChild{
        width: 250px;
        margin: 10px;
    }
    .chooseChildA{
        width: 100px;
    }
    /*----table样式集合----*/
    /*table下字体，图标样式*/
    /*用与航班信息字体标红*/
    div[data-red='red']>div{
        color: red;
    }
    /*用于时长标红*/
    div[data-redTime='red']{
        background-color: red;
    }
    /*余位字体标红*/
    div[data-cursite='1']{
        color: red;
        font-weight: bold;
    }
    /*未锁单页面红叉样式*/
    .cha{
        position: relative;
        top: 20px;
        left: 1%;
        width: 15px;
        height: 15px;
        /*background-image: url('../images/font/cha03.png');*/
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }
    /*复制按钮的样式*/
    .fuzhi{
        display: inline-block;
        cursor: pointer;
        /*background-image: url("../images/font/fuzhi3.png");*/
        background-repeat: no-repeat;
        background-size: 100% 100%;
        width: 15px;
        height: 15px;
        margin-top: -5px;
    }
    .fuzhi:active{
        border: 1px black solid;
    }
    .fuzhiDom{
        position: absolute;
        left: -300px;
    }
    .fuzhiId{
        background-color: red;
    }
    /*table内部日志，游客模式按钮样式*/
    .curspointertwo:hover{
        box-shadow: 1px 1px 2px 1px gray;
        cursor:pointer;
    }
    /*table主体样式*/
    .ariticialTalbe{
        border: 1px silver solid;
    }
    /*给头加border*/
    .headBorder>th{
        border: 1px #E7E7E7 solid;
    }
    /*给tr加border*/
    .ariticialTalbeChild>tr>td{
        border: 1px #E7E7E7 solid;
    }
    /*航班信息的样式*/
    .td_message{
        display: flex;
        /*width: 120px;*/
        margin: 0 auto;
        justify-content: space-around;
        flex-wrap: wrap;
        width: 130px;
    }
    .td_message>div{
        margin-left: 2px;
    }
    /*比价的样式*/
    .td_price>div{
        /*float: left;*/
        /*margin-left: 8px;*/
        display: flex;
        justify-content: center;
        margin-top: 2px;
    }
    .td_price>div>div{
        margin-left: 4px;
    }
    /*重付 重订的按钮的两种样式*/
    .ticiketButton>button{

    }
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
    /*搜索中view-design的input边框改深色*/
    .ivu-input-group-prepend{
        border-color: silver;
    }
    .ivu-input{
        /*border-color: black;*/
    }
    .ivu-input-default{
        border-color: silver;
    }
    /*条件筛选样式*/
    /*条件筛选主体样式*/
    .conditionsFlag{
        position: fixed;
        width: 460px;
        height: 412px;
        background-color: white;
        z-index: 10;
        box-shadow: 0 0 10px 0;
        top: 43%;
        left: 49%;
        transform: translate(-50%,-50%);
    }
    .conditionsFlag>*{
        padding: 7px;
        margin-top: 5px;
        padding-bottom: 10px;
        border-bottom: 1px solid silver;
    }
    /*条件筛选头部样式*/
    .titleHead{
        height: 70px;
        /*background-color: red;*/
        border-bottom: 1px solid silver;
    }
    .headPicture{
        width: 20%;
        height: 70%;
        margin-left: 45%;
        /*background-image: url("../images/font/computed01.png");*/
        background-size: 40%;
        background-repeat: no-repeat;

    }
    /*自动出票中查找样式*/
    /*自动出票中主体样式*/
    .ticketingChoose{
        display: flex;
    }
    /*.ticketingChoose>div{*/
    /*!*margin-top: 3px;*!*/
    /*margin-bottom: 5px;*/
    /*}*/
    .ticketingChooseTwo>div{
        margin-bottom: 5px;
    }
    .search{
        /*display: inline-block;*/
        /*position: relative;*/
        /*left: -30%;*/
        /*width: ;*/
        /*height: 20px;*/
        /*background-image: url('../images/font/ticketingSearch.png');*/
        background-repeat: no-repeat;
        background-size: 18px 18px;
        cursor:pointer;
    }
    .selectDom{
        padding: 5px;
        border-color: silver;
        border-radius:3px;
    }
    /*拆分按钮*/
    .splitButt{
        display: flex;
        flex-direction: row-reverse;
    }
    /*日志主体样式*/
    /*日志*/
    .log{
        width: 650px;
        height: 450px;
        box-shadow: 0 0 10px 0;
        position: fixed;
        top: 100px;
        left: 30%;
        background-color: white;
        z-index: 1;
    }
    .log>header>.headPicture{
        width: 50px;
        height: 50px;
        /*background-image: url('../images/font/log03.png');*/
        background-size: 100%;
        background-repeat:no-repeat;

    }
    .closeButt{
        width: 25px;
        height: 25px;
        /*background-image: url('../images/font/close02.png');*/
        background-size: 100%;
        background-repeat:no-repeat;
        margin: -3px -3px 0px 0px;
        cursor:pointer;
    }
    /*split拆分样式*/
    .splitWindow{
        position: fixed;
        top:40%;
        left: 50%;
        width: 600px;
        box-shadow:0px 0px 10px 1px;
        background-color: white;
        z-index: 2;
        transform: translate(-50%, -50%);
    }
    .splitOneWindow{
        display: flex;
        justify-content: space-around;
    }
    .splitWindow header{
        height: 50px;
        border-bottom: 1px silver solid;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
    }
    .headertitle{
        margin-bottom: -20px;
    }
    .closesplit{
        position: absolute;
        top: 1px;
        right: 1px;
        cursor:pointer
    }
    .icon_split{
        position: absolute;
        top: 1px;
        width: 20px;
        height: 20px;
        /*background-image:url('../images/font/split.png');*/
        background-repeat:no-repeat;
        background-size:100% 100%;
    }
    .close_splitIcon{
        position: absolute;
        right: 0px;
        top: 0px;
    }
    .splitBody{
        height: auto;
    }
    .splitDeal{
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: right;
    }
    .splitDeal>*{
        margin-left: 5px;
    }
    .splitDeal>input{
        border: none;
        background-color: #1C84C6;

    }
    /*j标红*/
    .red{
        color: red;
    }
    /*动画*/
    .searchAnimation-enter-active, .searchAnimation-leave-active{
        transition: opacity .5s;
    }
    .searchAnimation-enter, .searchAnimation-leave-to{
        /*transform: translateY(-150px);*/
        opacity: 0;
        /*transition: opacity .1s;*/
    }
    .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
    /*其它*/
    .ivu-tabs-bar{
        margin-bottom: 0px;
    }
    /*缓冲高度*/
    .ivu-spin-fix{
        height: 1350px;
    }
    .ivu-table-border th{
        text-align: center;
    }
    .ivu-table-row>td{
        text-align: center;
    }
</style>
