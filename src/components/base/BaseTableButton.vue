<template>
    <div>
        <button>回帖</button>
    </div>
</template>

<script>
    export default {
        name: "table_button",
        data(){return{
            buttonObj:[
                {name:'回帖',src:'',type:1},
                {name:'重置',src:'',type:1},
                {name:'删除',src:'',type:1},
                {name:'修改',src:'',type:1},
            ]
        }},
        props:[],
        // render(h) {
        //     return h('button','kaiqi')
        // },
        methods:{
            huitie:()=>{

            }
        },
        created() {
            console.log('chufa')
        }
    }
</script>

<style scoped>

</style>