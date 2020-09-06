<template>
    <div>
        <Drawer
                title="修改"
                v-model="changeWindowObj.flag"
                width="400"
                :mask-closable="false"
        >
            <div v-for="(ele,ind) in changeObj" :key="ind" class="searchChildDom">
                <div v-if="ele.type==='varchar'||ele.type==='char'||ele.type==='int'||ele.type==='bigint'||ele.type==='double'">
                    <i-input
                            v-model="ele.value"
                            :placeholder="ele.placeholderValue"
                    >
                        <span slot="prepend">{{ele.title}}</span>
                    </i-input>
                </div>
                <!--mappin 映射-->
                <div v-else-if="ele.type==='table'||ele.type==='tinyint'">
                    <i-select :placeholder="ele.title" v-model="ele.value">
                        <Option v-for="(elem,inde) in ele.list" :value="elem.v" :key="inde">{{elem.t}}</Option>
                    </i-select>
                </div>
                <div v-else-if="ele.type==='date'">
                    <DatePicker
                            v-model="ele.value"
                            type="date"
                            :placeholder="ele.title"
                            style="width: 220px"
                            format="yyyy-MM-dd"
                            confirm
                            @on-change="timeRulerFun"
                            @on-ok="timeNameFun(ele.name)"
                    ></DatePicker>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <span>{{ele.title}}</span>
                </div>
                <div v-else-if="ele.type==='timestamp' || ele.type==='datetime'">
                    <DatePicker
                            v-model="ele.value"
                            type="datetime"
                            style="width: 200px"
                            format="yyyy-MM-dd HH:mm:ss"
                            @on-change="timeRulerFun"
                            @on-ok="timeNameFun(ele.name)"
                    ></DatePicker>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <span>{{ele.title}}</span>
                </div>
                <div v-else-if="ele.type==='swtich'">
                    <i-Switch size="large">
                        <span slot="open" :value="ele.list[0].v">{{ele.list[0].t}}</span>
                        <span slot="close" :value="ele.list[1].v">{{ele.list[1].t}}</span>
                    </i-Switch>
                </div>
                <div v-else-if="!ele.type"></div>
                <div v-else>
                    <i-input
                            v-model="ele.value"
                            :placeholder="ele.placeholderValue"
                    >
                        <span slot="prepend">{{ele.title}}</span>
                    </i-input>
                </div>
            </div>
            <div style="margin-top: 6px">
                <Button type="primary" size="small" @click="changeSureFun">确定修改</Button>
            </div>
        </Drawer>
    </div>
</template>

<script>
    export default {
        name: "BaseChangeWindow",
        data:function(){
            return{
                changeObj:[],
                timeRulerData:'',
                rowDataClone : [],
            }
        },
        props:['changeWindowObj'],
        methods:{
            changeSureFun(){
                let leng = this.changeObj.length;
                let obj = {};

                for(let a=0;a<leng;a++){
                    obj[this.changeObj[a].name] = this.changeObj[a].value
                }
                for(let i in obj){
                    let leng = this.rowDataClone.length;
                    for (let j = 0; j < leng; j++) {
                        for(let o in this.rowDataClone[j]){
                            if(i==o){
                                if(obj[i] instanceof Date){
                                    //此处开关是用来判断原始数据中 时间格式是date 还是datetime
                                    //存在：则是datetime 否则 是date
                                    //当格式是date的时候，则不要具体到小时分钟等 并且要把00：00：00格式删除
                                    let timeFlag = false;
                                    if(this.rowDataClone[j][o].match(':')){
                                        timeFlag = true;
                                    }
                                    if(timeFlag){
                                        obj[i] = this.$utilObj.parseDate(obj[i])
                                    }else{
                                        obj[i] = this.$utilObj.parseDate(obj[i]).split(' ')[0];
                                    }
                                }
                                //当原始值和更改值一样时候，需要将此值置为null （后台要求为null）
                                // if(obj[i]==""||obj[i]==this.rowDataClone[j][o]){
                                //     this.rowDataClone[j][o] = null;
                                // }else{
                                //
                                // }
                                this.rowDataClone[j][o] = obj[i]
                            }
                        }
                    }
                }
                this.$emit('changeSureFun',this.rowDataClone)
            },
            //转换世界时格式为 - 格式给后台
            timeRulerFun(data){
                this.timeRulerData = data

            },
            timeNameFun(data){
                for (let i=0;i<this.changeObj.length;i++) {
                    if(this.changeObj[i].name == data){
                        this.changeObj[i].value = this.timeRulerData;
                    }
                }
            }
        },
        beforeMount(){
            //dataObj为表格头数据 根据表格头的信息来展示修改弹窗中的各种dom结构
            let leng = this.changeWindowObj.dataObj.length;
            //生成dom需要的数据结构
            for(let a=0;a<leng;a++){
                if(this.changeWindowObj.dataObj[a].dom==='buttonArray'||this.changeWindowObj.dataObj[a].name==='tableIndex'){
                    continue
                }
                //disable 0 禁止编辑。1 可以编辑
                if(this.changeWindowObj.dataObj[a].disable){
                    continue;
                }
                //下拉结构
                if(this.changeWindowObj.dataObj[a].type==='table'||this.changeWindowObj.dataObj[a].fieldType === 'tinyint'){
                    if(this.changeWindowObj.dataObj[a].mapping){
                        for (let i = 0; i < this.changeWindowObj.dataObj[a].mapping.length; i++) {
                            this.changeWindowObj.dataObj[a].mapping[i].v *=1
                        }
                    }

                    this.changeObj.push({
                        name:this.changeWindowObj.dataObj[a].fieldName,
                        title:this.changeWindowObj.dataObj[a].name,
                        type:this.changeWindowObj.dataObj[a].fieldType,
                        list:this.changeWindowObj.dataObj[a].mapping,
                        value:null,
                    })
                }else{
                    this.changeObj.push({
                        name:this.changeWindowObj.dataObj[a].fieldName,
                        title:this.changeWindowObj.dataObj[a].name,
                        type:this.changeWindowObj.dataObj[a].fieldType,
                        value:null,
                    })
                }
            };
            let length = this.changeObj.length;
            this.rowDataClone = JSON.parse(JSON.stringify(this.changeWindowObj.changeDataArray));
            if(this.changeWindowObj.changeDataArray.length==1){
                //将表格头和表格体数据一一对应，渲染默认值
                for (let i = 0; i < length; i++) {
                    for (let j in this.rowDataClone[0]) {
                        if(this.changeObj[i].name == j){
                            if(typeof this.rowDataClone[0][j] === 'boolean'){
                                this.rowDataClone[0][j] += '';
                            }
                            this.changeObj[i].value = this.rowDataClone[0][j];
                        }
                    }
                }
            };
        },
    }
</script>

<style scoped lang="stylus">
    .searchChildDom
        padding  2px 5px
</style>
