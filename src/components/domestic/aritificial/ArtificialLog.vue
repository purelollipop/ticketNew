<template>
    <div class="log" v-if="logar">
        <header class="titleHead">
            <div class="closeButt" style="float: right" @click="closeLog"></div>
            <div class="headPicture"></div>
            <div style="margin-left: 45%">操作日志</div>
        </header>
        <div>
            <template>
                <i-Table height="380" width="650" :columns="columns1" :data="logar"></i-Table>
            </template>
        </div>
    </div>
</template>

<script>
    export default {
        name: "artificial_log",
        data(){
            return{
                columns1: [
                    {
                        title: '操作人',
                        key: 'name',
                    },
                    {
                        title: '时间',
                        key: 'time',
                    },
                    {
                        title: '操作',
                        key: 'note',
                        width:300,
                    }
                ],
            }
        },
        watch:{

        },
        computed:{
            logar(){
                return this.$store.state.logar
            },
        },
        methods:{
            closeLog(){
                this.$store.state.logar = null;
            }
        },
    }
</script>

<style scoped>

</style>