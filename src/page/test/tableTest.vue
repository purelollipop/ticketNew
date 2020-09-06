
<script>

    import table from '../otherSetting/baseTablesObj';
    import TableName from '../otherSetting/tableButtonObj';
    creatData(TableName.tableTest);
    function creatData (data){
        table.created = function () {
            this.theadArray = data.theadArray;
            this.tbodyButtonArray = data.tbodyButtonArray;
            this.urlObj = data.urlObj;
        };
    };
    export default table

</script>

<!--滚动条-->
<style scoped type="text/css">
    ::-webkit-scrollbar{
        width: 6px;
        height: 8px;
    }
    ::-webkit-scrollbar-track{
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        border-radius: 1px;
        /*background-color: #DCDCDC;*/
        background-color: white;
        /*width: 1px;*/
    }
    ::-webkit-scrollbar-track-piece{
        /*background-color: red;*/
    }
    ::-webkit-scrollbar-thumb
    {
        border-radius: 10px;
        /*border: 1px silver solid;*/
        /*-webkit-box-shadow: inset 0 0 6px cornflowerblue;*/
        /*background-color: whitesmoke;*/
        /*background: linear-gradient(#2b85e4,white,#2b85e4);*/
        background: #2b85e4;
    }
    ::-webkit-resizer{
        /*background-color: red;*/
    }
    ::-webkit-scrollbar-corner{
        /*background-color: #2b85e4;*/
    }
</style>