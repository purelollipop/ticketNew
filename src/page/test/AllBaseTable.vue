<template>
    <div>
        <div v-for="(ele,index) in tablesArr" :key="ele">
            <keep-alive>
                <tableTwo
                        :table-alone-name="ele"
                        v-show="ele == tableCloneName"
                        :ind="index"
                        :table-clone-name="tableCloneName"
                        v-bind="$attrs"></tableTwo>
            </keep-alive>
        </div>
    </div>
</template>

<script>
    import tableTwo from './AllBaseTableAlone';
    export default {
        name: "AllBaseTable",
        data(){
            return{
                tableCloneName:undefined,
                tablesArr:[],
                childUpKey:'',
            }
        },
        watch:{
            tableName:{
                handler(newValue,old){
                    if(!newValue){
                        return
                    }
                    this.tableCloneName = newValue;
                    if(this.tablesArr.length === 0){
                        return this.tablesArr.push(newValue);
                    }
                    for (let i = 0; i < this.tablesArr.length; i++) {
                        if(this.tablesArr[i] == newValue){
                            return
                        }else if(i === this.tablesArr.length-1){
                            this.tablesArr.push(newValue);
                        }
                    };
                },
                immediate:true,
                deep:true,
            },
            deletTableName:{
                handler(newValue,old){
                    let leng = this.tablesArr.length;
                    for (let i = 0; i < leng; i++) {
                        if(this.tablesArr[i] == newValue){
                            this.tablesArr.splice(i,1);
                            return
                        }
                    }
                },
            }
        },
        computed:{
            tableName(){
                return this.$store.state.tableName
            },
            deletTableName(){
                return this.$store.state.deletTableName
            }
        },
        components:{
            tableTwo,
        },
        activated(){

        },
        created() {
            // console.log('created')
        }
    }
</script>

