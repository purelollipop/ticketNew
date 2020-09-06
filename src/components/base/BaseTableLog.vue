<template>
    <div class="tableWindow">
        <Modal v-model="windowFlag"
               draggable
               scrollable
               title="历史数据"
               footer-hide
               @on-cancel="cancelFun"
               @on-ok="okFun"
        >
            <div>
                <Table border :columns="columns1" :data="data1"></Table>
            </div>
        </Modal>
    </div>
</template>

<script>

    export default {
        name: "table_changeDateWindow",
        data () {
            return {
                // modal12: true,
                columns1: [
                    {
                        title: 'Name',
                        key: 'name'
                    },
                    {
                        title: 'Age',
                        key: 'age'
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    }
                ],
                data1: [
                    {
                        name: 'test',
                        age: 18,
                        address: 'test',
                        date: '2016-10-03'
                    },
                    {
                        name: 'test',
                        age: 18,
                        address: 'test',
                        date: '2016-10-03'
                    },
                    {
                        name: 'test',
                        age: 18,
                        address: 'test',
                        date: '2016-10-03'
                    },
                    {
                        name: 'test',
                        age: 18,
                        address: 'test',
                        date: '2016-10-03'
                    }
                ]
            }
        },
        computed:{
          windowFlag:{
              get:function(){
                  return this.flag
              },
              set:function(){}
          }
        },
        // functional:true,
        props:['flag'],
        // render(h,contenxt){
        //     return h('div',{
        //         style:{},
        //         class:{
        //             tableWindow:true,
        //         }
        //     },[])
        // },
        methods:{
            //弹窗退出按钮，作用于改变父的数据
            cancelFun(){
                this.$parent.tableData.flag = false
            },
            okFun(){
                this.$parent.tableData.flag = false
            }
        },
        beforeMount(){

        }
    }
</script>

<style scoped>
.tableWindow{
    /*position: fixed;*/
    /*top: 50px;*/
    /*left: 150px;*/
}
</style>