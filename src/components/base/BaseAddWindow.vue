<template>
    <div>
        <Drawer
                title="新增"
                v-model="addDrawerObj.flag"
                width="500"
                :mask-closable="false"
        >
            <div v-for="(ele,ind) in addObj" :key="ind" class="searchChildDom">
                <div v-if="ele.type==='varchar'||ele.type==='char'||ele.type==='int'||ele.type==='bigint'||ele.type==='double'
                    ||ele.fieldType==='decimal'">
                    <i-input
                            v-model="ele.value"
                            :placeholder="ele.placeholderValue"
                    >
                        <span slot="prepend">{{ele.title}}</span>
                    </i-input>
                </div>
                <div v-else-if="ele.type==='table'||ele.type==='tinyint'" style="width: 200px">
                    <i-select :placeholder="ele.title" v-model="ele.value">
                        <Option v-for="(elem,inde) in ele.list" :value="elem.v" :key="inde">{{elem.t}}</Option>
                    </i-select>
                </div>
                <div v-else-if="ele.type==='date'">
                    <DatePicker
                            :placeholder="ele.title"
                            style="width: 220px"
                            @on-change="timeRulerFun"
                            @on-ok="timeNameFun(ele.name)"
                            :confirm="true"
                    ></DatePicker>
                </div>
                <div v-else-if="ele.type==='timestamp' || ele.type==='datetime'">
                    <DatePicker
                            type="datetime"
                            :placeholder="ele.title"
                            format="yyyy-MM-dd HH:mm:ss"
                            style="width: 220px"
                            @on-change="timeRulerFun"
                            @on-ok="timeNameFun(ele.name)"
                            editable
                    ></DatePicker>
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
                <Button type="primary" size="small" @click="addSelfSureFun" v-model="addDrawerObj.urlObjData">确定新增</Button>
            </div>
        </Drawer>
    </div>
</template>
<!--
    基础页面新增组件，适用于BaseTable，并非普通通用搜索组件
-->

<script>
    export default {
        name: "BaseAddWindow",
        data() {
            return {
                addObj: [],
                timeRulerData: '',
            }
        },
        props: ['addDrawerObj'],
        methods: {
            addSelfSureFun() {
                let leng = this.addObj.length;
                let obj = {};
                for (let a = 0; a < leng; a++) {
                    obj[this.addObj[a].name] = this.addObj[a].value
                }
                let addDrawerObj =JSON.parse(JSON.stringify(this.addDrawerObj)).urlObjData;
              for (let i = 0; i < addDrawerObj.length; i++) {
                if (addDrawerObj[i].isUpdate){
                  let value = addDrawerObj[i].value;
                  let name =  addDrawerObj[i].name;
                  obj[name] = value;
                }
              }
                this.$emit('addSureFun', obj)
            },
            //转换世界时格式为 - 格式给后台
            timeRulerFun(data) {
                this.timeRulerData = data
            },
            timeNameFun(data) {
                for (let i = 0; i < this.addObj.length; i++) {
                    if (this.addObj[i].name == data) {
                        this.addObj[i].value = this.timeRulerData;
                    }
                }
            }
        },
        beforeMount() {
            let leng = this.addDrawerObj.dataObj.length;
            for (let a = 0; a < leng; a++) {
                if (this.addDrawerObj.dataObj[a].dom === 'buttonArray') {
                    continue
                }
                if(this.addDrawerObj.dataObj[a].disable){
                    continue;
                }
                // 映射关系 || 状态
                if (this.addDrawerObj.dataObj[a].fieldType === 'table' || (this.addDrawerObj.dataObj[a].fieldType === 'tinyint' && this.addDrawerObj.dataObj[a].mapping)) {
                    this.addObj.push({
                        name: this.addDrawerObj.dataObj[a].fieldName,
                        title: this.addDrawerObj.dataObj[a].name,
                        type: this.addDrawerObj.dataObj[a].fieldType,
                        list: this.addDrawerObj.dataObj[a].mapping,
                        value: '',
                    })
                } else {
                    this.addObj.push({
                        name: this.addDrawerObj.dataObj[a].fieldName,
                        title: this.addDrawerObj.dataObj[a].name,
                        type: this.addDrawerObj.dataObj[a].fieldType,
                        value: '',
                    })
                }
            }
        },
    }
</script>

<style scoped lang="stylus">
    .searchChildDom
        padding 2px 5px
</style>
