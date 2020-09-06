<template>
    <div class="baseSearchClass">
        <div v-for="(ele,ind) in searchDomCloneObj" :key="ind" class="searchChildDom">
            <div v-if="ele.show && (ele.fieldType==='varchar'
            ||ele.fieldType==='char'
            ||ele.fieldType==='int'
            ||ele.fieldType==='bigint'
            ||ele.fieldType==='double'
            ||ele.fieldType==='decimal')">
                <i-input
                        v-model="searchObj[ele.fieldName].value"
                        :placeholder="ele.placeholderValue"
                >
                    <span slot="prepend">{{ele.name}}</span>
                </i-input>
            </div>
            <div v-else-if="ele.show && (ele.type==='table'||(ele.fieldType==='tinyint'&& ele.mapping))">
                <i-select :placeholder="ele.title" v-model="searchObj[ele.name+':'+ele.findType]">
                    <Option v-for="(elem,inde) in ele.list" :value="elem.v" :key="inde">{{elem.t}}</Option>
                </i-select>
            </div>
            <div v-else-if="ele.show && ele.fieldType==='date'">
                <!--时间类都是between-->
                <span>{{ele.name}}</span>
                <DatePicker
                        :placeholder="ele.name"
                        style="width: 110px"
                ></DatePicker>
                <DatePicker
                        :placeholder="ele.name"
                        style="width: 110px"
                ></DatePicker>
            </div>
            <div v-else-if="ele.show && (ele.fieldType==='datatime' || ele.fieldType==='timestamp')">
                <DatePicker
                        type="datetimerange"
                        :placeholder="ele.name"
                        format="yyyy-MM-dd HH:mm"
                        style="width: 220px"
                        @on-change="timeRulerFun"
                        @on-ok="timeNameFun(ele.name+':'+ele.findType)"
                        editable
                ></DatePicker>
            </div>
            <div v-else-if="ele.show && ele.type==='swtich'">
                <i-Switch size="large">
                    <span slot="open" :value="ele.list[0].v">{{ele.list[0].t}}</span>
                    <span slot="close" :value="ele.list[1].v">{{ele.list[1].t}}</span>
                </i-Switch>
            </div>
        </div>
        <div style="margin-top: 6px">
            <Button type="primary" size="small" @click="searchsure" ref="searchsure">确定搜索</Button>
        </div>
    </div>
</template>
<!--
    基础页面搜索组件，适用于BaseTable，并非普通通用搜索组件
-->
<script>
    export default {
        name: "search",
        data: function () {
            return {
                searchObj: {},
                searchDomCloneObj: null,
                timeNameData: undefined,
            }
        },
        props: ['searchDomObj'],

        beforeMount() {
            this.searchDomCloneObj = JSON.parse(JSON.stringify(this.searchDomObj));

            console.log(this.searchDomCloneObj);
            for (let a = 0; a < this.searchDomCloneObj.length; a++) {
                if (this.searchDomCloneObj[a].show) {
                    //按照后台交互格式要求，定义下列特殊格式用来做特殊变量名
                    let type = this.searchDomCloneObj[a].fieldType;
                    console.log(this.searchDomCloneObj[a].fieldType)
                    if(this.searchDomCloneObj[a].fieldType === 'date'){
                        console.log(this.searchDomCloneObj[a])
                        type = 'gt'
                    }
                    this.searchObj[this.searchDomCloneObj[a].fieldName] = {
                        name: this.searchDomCloneObj[a].fieldName,
                        type,
                        value: ""
                    };
                    switch (this.searchDomCloneObj[a].findType) {
                        case 'eq':
                            this.searchDomCloneObj[a].placeholderValue = '等于';
                            break;
                        case 'ge':
                            this.searchDomCloneObj[a].placeholderValue = '大于等于';
                            break;
                        case 'lt':
                            this.searchDomCloneObj[a].placeholderValue = '小于';
                            break;
                        case 'ne':
                            this.searchDomCloneObj[a].placeholderValue = '不等于';
                            break;
                        case 'like':
                            this.searchDomCloneObj[a].placeholderValue = '包含';
                            break;
                        case 'likeLeft':
                            this.searchDomCloneObj[a].placeholderValue = '左包含';
                            break;
                        case 'likeRight':
                            this.searchDomCloneObj[a].placeholderValue = '右包含';
                            break;
                        case 'notLike':
                            this.searchDomCloneObj[a].placeholderValue = '不包含';
                            break;
                        case 'between':
                            this.searchDomCloneObj[a].placeholderValue = '中间';
                    }
                } else {
                    continue
                    /*this.searchDomCloneObj.splice(a,1);
                    a--;*/
                }
            }
        },
        methods: {
            searchsure() {
                //去除搜索空值
                let searchParam = [];
                for (let i in this.searchObj) {
                    if (this.searchObj[i].value) {
                        searchParam.push(this.searchObj[i]);
                    }
                }
                this.$emit('searchsure', searchParam)
            },
            //转换世界时格式为 - 格式给后台
            timeRulerFun(data) {
                let a = data[0];
                let b = data[1];
                this.timeRulerData = a + '|' + b;
            },
            timeNameFun(data) {
                for (let i in this.searchObj) {
                    if (i == data) {
                        this.searchObj[i] = this.timeRulerData;
                    }
                }
            }
        },
    }
</script>

<style scoped lang="stylus">
    .searchChildDom
        padding 2px 0px

    .searchChildDom > div
        display flex
        flex-wrap wrap
        width 270px
        margin 0 4px
</style>