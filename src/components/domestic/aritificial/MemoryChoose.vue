<template>
    <div class="conditionsFlag">
        <header class="titleHead">
            <div class="headPicture"></div>
            <div style="margin-left: 44%">详细查询</div>
        </header>
        <div id="tiaojian">
            <span>查单排序条件</span>
            <Radio-Group v-model="ticketTime">
                <Radio label="1">
                    <span>进单时间</span>
                </Radio>
                <Radio label="2">
                    <span>起飞时间</span>
                </Radio>
            </Radio-Group>
        </div>
        <div id="hangsi">
            <span>选择航空公司</span>
            <div style="display: inline-block">
                <Icon type="ios-paper-plane" size="10px"/>
            </div>
            <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
                <Checkbox
                        :indeterminate="airlineIndeterminate"
                        :value="airlineCheckAll"
                        @on-change="airlineCheckAllFun">全选</Checkbox>
            </div>
            <Checkbox-Group v-model="airlineGroup" @on-change="airlineGroupChange">
                <Checkbox :label="ele" v-for="(ele) in airline" :key="ele"></Checkbox>
            </Checkbox-Group>
        </div>
        <div id="pingtai">
            <span>选择平台</span>
            <div style="display: inline-block">
                <Icon type="ios-home" size="15px"/>
            </div>
            <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
                <Checkbox
                        :indeterminate="tableIndeterminate"
                        :value="tableCheckAll"
                        @on-change="tableCheckAllFun" ref="">全选</Checkbox>
            </div>
            <Checkbox-Group v-model="tableCheckGroup" @on-change="tableCheckGroupChange">
                <Checkbox :label="ele" v-for="(ele,index) in tableGroup" :key="ele" :value="index"></Checkbox>
            </Checkbox-Group>
        </div>
        <div id="last">
            <!--<div >-->
            <!--<div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">-->
            <!--<Checkbox-->
            <!--:indeterminate="AllIndeterminate"-->
            <!--:value="AllValue"-->
            <!--@on-change="AllCheckGroupFun">全选</Checkbox>-->
            <!--</div>-->
            <!--</div>-->

            <button @click="choosefun">确定筛选</button>
            <button @click="conditionsFun">返回</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "memoryChoose",
        props:[],
        computed:{
        },
        data(){
            return{
                //单选默认
                ticketTime:'1',
                //~~~航司~~~
                //航司数据
                airlineIndeterminate: false,
                //航司全选按钮
                airlineCheckAll:false,
                //航司数组
                // airline:['3U', '9C','A6','BK','CA','CZ','DZ',
                //          'EU','G5','GJ','GX','GY','JR','KN',
                //          'KY','LT','MF','NS','PN','QW','RY',
                //          'SC','TV','UQ','ZH'],
                airline:[],
                //选择后的航司值
                airlineGroup:[],
                //~~~平台~~~
                tableIndeterminate:false,
                tableCheckAll:false,
                //平台数组
                tableGroup:['xss','xsg','ttr','携程','淘宝9C','517NA','酷讯',
                    '同程','淘宝B平台','平安淘宝','携程团队','八千翼','pai'],
                // tableGroup:['tts向上商旅','tts向上优选','tts天天航服','tb携程','淘宝','517na','酷讯',
                //     '同程','淘宝B平台供应','TB','携程团队'],
                //被选中后的平台
                tableCheckGroup:[],
                //最高全选按钮
                // AllIndeterminate:false,
                // AllValue:false,
                // AllGroup:[],
            }
        },
        methods:{
            //关闭开启条件筛选框
            conditionsFun(){
                this.$emit('conditionsfun')
            },
            //航司函数
            //函数是view-design的样式函数喝自己写的逻辑函数结合。需要参照view-design的多选按钮样式函数来解读
            airlineCheckAllFun(){
                if (this.airlineIndeterminate) {
                    this.airlineCheckAll = false;
                } else {
                    this.airlineCheckAll = !this.airlineCheckAll;
                }
                this.airlineIndeterminate = false;

                if (this.airlineCheckAll) {
                    this.airlineGroup = this.airline;
                } else {
                    this.airlineGroup = [];
                }
            },
            airlineGroupChange (data) {
                if (data.length === this.airline.length) {
                    this.airlineIndeterminate = false;
                    this.airlineCheckAll = true;
                } else if (data.length > 0) {
                    this.airlineIndeterminate = true;
                    this.airlineCheckAll = false;
                } else {
                    this.airlineIndeterminate = false;
                    this.airlineCheckAll = false;
                }
            },
            //平台函数
            tableCheckAllFun(){
                if (this.tableIndeterminate) {
                    this.tableCheckAll = false;
                } else {
                    this.tableCheckAll = !this.tableCheckAll;
                }
                this.tableIndeterminate = false;

                if (this.tableCheckAll) {
                    this.tableCheckGroup = this.tableGroup;
                } else {
                    this.tableCheckGroup = [];
                }
            },
            tableCheckGroupChange(data){
                if (data.length === this.tableGroup.length) {
                    this.tableIndeterminate = false;
                    this.tableCheckAll = true;
                } else if (data.length > 0) {
                    this.tableIndeterminate = true;
                    this.tableCheckAll = false;
                } else {
                    this.tableIndeterminate = false;
                    this.tableCheckAll = false;
                }
            },
            //    全选 暂时没做
            AllCheckGroupFun(data){
                if (data.length === this.tableGroup.length+this.airline.length) {
                    // this.tableIndeterminate = false;
                    this.tableCheckAll = true;
                    this.AllGroup=this.tableGroup
                } else if (data.length > 0) {
                    // this.tableIndeterminate = true;
                    this.tableCheckAll = false;
                } else {
                    // this.tableIndeterminate = false;
                    this.tableCheckAll = false;
                }
            },
            //    条件筛选确定筛选按钮
            choosefun(){
                let tableCheckGroupA = [];
                let inde = [];
                for(let a=0,leng=this.tableCheckGroup.length;a<leng;a++){
                    if(this.tableCheckGroup[a]=='xss'){
                        tableCheckGroupA.push(1);
                        inde.push(a)
                    }else if(this.tableCheckGroup[a]=='xsg') {
                        tableCheckGroupA.push(2);
                        inde.push(a)
                    }else if(this.tableCheckGroup[a]=='ttr'){
                        tableCheckGroupA.push(3)
                        inde.push(a)
                    }
                };
                // this.tableCheckGroup.forEach((ele,index)=>{
                //     if(ele=='xss'||ele=='xsg'||ele=='ttr'){
                //         this.tableCheckGroup.splice(index)
                //     }
                // })
                // for(let a=0;a<inde.length;a++){
                //     this.tableCheckGroup.splice(inde[a])
                //     console.log(inde[a])
                // }
                // let tableCheckGroupB = [...this.tableCheckGroup];
                let tableCheckGroupB = JSON.parse(JSON.stringify(this.tableCheckGroup));
                let c = [];
                tableCheckGroupB.filter((ele,index)=>{
                    if(ele!='xss'&&ele!='xsg'&&ele!='ttr'){
                        c.push(tableCheckGroupB[index])
                    }
                })
                // tableCheckGroupB = []
                // for(let a=0;a<tableCheckGroupB.length;a++){
                //     let ele = tableCheckGroupB[a];
                //     if(ele=='xss'||ele=='xsg'||ele=='ttr'){
                //         tableCheckGroupB.splice(a);
                //     }
                // }
                // console.log(tableCheckGroupB)
                // console.log(c)
                let choosear = [[this.ticketTime],this.airlineGroup,tableCheckGroupA,c];
                // console.log(choosear)
                this.$emit('choosefun',choosear);
            }
        },
        created(){
            axios({
                url:'../bingo/ticking.php?action=confirmation_screening',
                post:'get'
            }).then(res=>{
                this.airline=res.data['0'];
                if(this.ticketTime) {
                    this.ticketTime = res.data.s_condition;
                }
                let ar1 = [];
                if(res.data.s_airways){
                    ar1 = res.data.s_airways.replace(/'/g,'').split((/,/));
                }
                let ar2 = [];
                if(res.data.s_platform){
                    ar2 = res.data.s_platform.replace(/'/g,'').split(/,/);
                }
                //选择航司的数组
                this.airlineGroup = ar1;
                //    选择平台
                this.tableCheckGroup = ar2;
                ar1 = ar2 = null;
            }).catch(err=>console.log(err))
        },
        updated(){}
    }
</script>

<style scoped>

</style>