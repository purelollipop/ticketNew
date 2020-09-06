<template>
    <div>
        <div>404</div>
        <div>404</div>
        <div>404</div>
        <div>404</div>
        <div>404</div>
        <div>404</div>
        <div>404</div>
        <div>404</div>
        <div>404</div>
        <div>404</div>
        <div>404</div>
        <div>404</div>
        <div>404</div>
        <button @click="pageUp">返回上一页</button>
        <button @click="pageToHead">返回首页</button>
    </div>
</template>

<script>
    export default {
        name: "undefinedPage",
        methods:{
            pageUp(){
                this.$router.go(-1)
            },
            pageToHead(){
                this.$router.push('/HeadTemplate')
            },
        }
    }
</script>

<style scoped>

</style>