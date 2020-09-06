<template>
    <div>
        <button @click="testOne">点击测试</button>
    </div>
</template>

<script>
    export default {
        name: "buttonTest",
        methods:{
            testOne(){
                this.$axios.get('lei/authorization/menu/all').then(res=>{
                    console.log(res)
                }).catch(err=>{
                    console.log(err)
                });

            }
        }
    }
</script>

<style scoped>

</style>