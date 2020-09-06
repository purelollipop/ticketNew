<!--该文件只适用于基础页面的翻页组件
    不适用于其他自己编写的组件
    因为翻页使用的方法已经固定，和BaseTable相关联，并没有分割
-->
<template>
    <div>
        <span>每页展示</span>&nbsp;
        <input type="text" style="width:40px;height:22px;padding:5px;display: inline;font-size: .9em;" v-model.lazy="size" >&nbsp;条
        <span>共{{total}}条</span>&nbsp;
        <button type="button"  class=""  @click="firstpage">第一页</button>
        <button type="button"  class=""  @click="uppage">上一页</button>
        共<span>{{pages}}</span>页&nbsp;
        第&nbsp;<input type="text" style="width:40px;height:22px;padding:5px;display: inline;font-size: .9em;" v-model="num" ref="num">&nbsp;页&nbsp;
        <button  class=""  @click="gotopage">跳转</button>
        <button  class=""  @click="downpage">下一页</button>
        <button  class=""  @click="llastpage">最后一页</button>
    </div>
</template>

<script>
    export default {
        name: "changePage",
        props:{
            changePageObject:Object,
        },
        data(){
            return{
                num:1,
                pages:this.changePageObject.pages,
                total:this.changePageObject.total,
                size:this.changePageObject.size,
                sizeFlag:0,
            }
        },
        watch:{
            //当size改变，要引发数据更新。同时将size传入给函数。但是主函数的size，此处没有去改变
            size:function (size) {
                if(this.sizeFlag){
                    this.$emit('initializationFun',this.num,size)
                }
                this.sizeFlag = 1
            },
            changePageObject:function (data) {
                //总页数数
                this.pages = data.pages;
                //数据总条数
                this.total = data.total;
                //每页共展示多少条
                this.size = data.size;
                //当前页
                this.num = data.current
            }
        },
        methods:{
            //分页函数
            //向后转页面 —
            uppage:function(){
                let num = undefined;
                num = Number(this.num);
                if(this.num>1){
                    num -= 1;
                }else if(this.num<1){
                    alert('没有该页码')
                }else{
                    return
                }
                this.axfun(num);
            },
            //向前转页面 +
            downpage:function(){
                let num = undefined;
                num = Number(this.num); //之前的显示数字其本质为字符串导致无法数字计算
                if(num<this.pages){
                    num += 1;
                }else{
                    return
                };
                this.axfun(num)
            },
            //直接去某页面
            gotopage:function () {
                let val = this.num;
                let num = undefined;

                if(isNaN(Number(val))){
                    this.$Message.error({
                        content:'输入页数不符合规范',
                        closable:true,
                        duration:10,
                    });
                    return
                }
                if(val > this.pages||val<1){
                    //页数框页码重置
                    this.pages = this.num;
                    alert('没有该页码');
                }else{
                    num = Math.round(val);
                    this.axfun(num)
                }
            },
            //直接去首页
            firstpage:function () {
                //如果num已经是第一页了，就不再请求了
                if(this.num == 1){
                    return
                }
                let num = undefined;
                num = 1;
                this.axfun(num)
            },
            //直接去末尾页
            llastpage:function () {
                //如果已经等于最后已页，就不再请求
                if(this.num == this.pages){
                    return
                }
                let num = this.pages;
                this.axfun(num)
            },
            //跳转后把页面值传入，用来获取要跳转页面的数据，此函数为上面所有跳转函数的通用操作
            axfun:function(page){
                this.initializationFun(page)
            },
            initializationFun(page){
                this.$emit('initializationFun',page,this.size)
            }
        },
        created() {}
    }
</script>

<style scoped>

</style>
