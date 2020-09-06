<template>
    <div>
        <div v-for="(ele,index) in theadArray" :key="index">
            <!--0为删除-->
            <Button size="small" v-if="ele.type == 0" @click="deletData(ele.value,ele.url)" class="button">{{ele.title}}</Button>
            <!--1为修改-->
            <Button size="small" v-else-if="ele.type == 1" @click="changeData(ele.value,ele.url)" class="button">{{ele.title}}</Button>
            <!--2为处理-->
            <Button size="small" v-else-if="ele.type == 2" @click="dealFun(ele.url,2)" class="button">{{ele.title}}</Button>
            <!--3为新增-->
            <Button size="small" v-else-if="ele.type == 3" @click="addData(ele.url)" class="button">{{ele.title}}</Button>
            <!--4为导出-->
            <Button size="small" v-else-if="ele.type == 4"  @click="exportFun(ele.value,ele.url)" class="button">{{ele.title}}</Button>
            <!--5为导入 .value,ele.url-->
            <input v-else-if="ele.type == 5" @change="importFun()" type="file" value="导出" style="width: 65px" class="files"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "BaseHeadButton",
        props:['theadArray'],
        methods:{
            //新增按钮功能 新增开关函数
            addData(url){
                this.$emit('addData',url)
            },

            //删除按钮函数
            deletData(kind,url,buttonVal){
                //kind有两值，1为批量删除，0为单个删除
                this.$emit('deletData',kind,url,buttonVal)

            },
            //修改函数
            changeData(kind,url){
                this.$emit('changeData',kind,url)
            },

            //处理函数
            dealFun(url,buttonValType,buttonVal){
                this.$emit('dealFun',url,buttonValType,buttonVal)
            },
            //导入
            importFun(){
                // console.log(event.target.files[0])
                this.$emit('importFun',event.target.files[0])
            },
            //导出
            exportFun(){
                this.$emit('exportFun')
            },
        }
    }
</script>

<style scoped>

</style>