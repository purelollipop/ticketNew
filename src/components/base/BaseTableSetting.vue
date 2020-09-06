<template>
    <div>
        <Modal
            v-model="tableSettingObj.tableSettingFlag"
            :styles="{top: '20px'}"
            width="620"
            draggable
            title="本页表格配置弹窗"
            :z-index="1"
            :footer-hide="true"
        >
        <div>
            <div>
                <h4>表格排列与显隐设置</h4>
                <!--<p>提示1：合并后的位置 以第一个被勾选的项的位置作为合并后的位置</p>-->
                <!--穿梭框-->
                <div class="transferWrap">
                    <!--不展示的表格-->
                    <div class="transfer">
                        <div v-for="(ele) in this.domParseFalseArr" :key="ele.fieldName" class="transferChild">
                            <Checkbox v-model="ele.show" size="small" title="是否在表格中展示此条"></Checkbox>
                            <Input v-model="ele.name" size="small" style="width: 150px" />
                            <!--<InputNumber readonly v-model="ele.position" size="small"  title="该条在表格中所处位置"></InputNumber>-->
                        </div>
                    </div>
                    <!--穿梭按钮-->
                    <div class="transferButton">
                        <div @click="changeShow(0)">
                            <Icon size="25" style="color: #2D8CF0" type="md-arrow-dropleft-circle" />
                        </div>
                        <div @click="changeShow(1)">
                            <Icon size="25" style="color: #2D8CF0" type="md-arrow-dropright-circle" />
                        </div>
                    </div>
                    <!--展示的表格-->
                    <div class="transfer">
                        <div v-for="(ele) in this.domParseArr" :key="ele.fieldName" class="transferChild">
                            <Checkbox v-model="ele.show" size="small" title="是否在表格中展示此条"></Checkbox>
                            <input type="checkbox" @change="checkArrAdd(ele)" :value="ele.fieldName" class="checkMergeInput" ttile="合并该条"/>
                            <!--<span>{{ele.name}}</span>-->
                            <Input v-model="ele.name" size="small" style="width: 100px" />
                            <InputNumber :min="0" :step="1" v-model="ele.position" size="small" style="width: 50px"  title="该条在表格中所处位置"></InputNumber>
                            <input type="checkbox" v-model="ele.sort" class="sortClass" title="此条是否排序" />
                            <input type="checkbox" v-model="ele.fold" @click="foldFun(ele)"  class="sortTwoClass" title="此条是否折叠展示" />
                            <i-Input v-model="ele.width" placeholder="数字。无则使用默认" size="small">
                                <span slot="prepend">表宽</span>
                            </i-Input>
                            <div v-if="ele.mergeFlag">
                                <div v-for="(elem) in ele.mergeList" :key="elem.fieldName" class="aloneTableDom">
                                    <div v-if="!elem.breakIsDom">
                                        <Icon type="md-close" size="small" style="color: red" title="合并项中删除此条"/>
                                        <span>{{elem.name}}</span>
                                        <!--<InputNumber :min="0" :step="1" v-model="elem.position" size="small"></InputNumber>-->
                                        <i-switch v-model="elem.show" size="small" title="合并项中是否展示此条"/>
                                        <Icon type="md-undo" v-if="elem.mergeBreak" size="small" style="color:#DAAF90" title="此条换行"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <i-button size="small" @click="changeTheadFun">表格修改确定</i-button>
                <!--<i-button size="small">表格默认展示</i-button>-->
            </div>
            <div class="headNumIndex cssheadNumIndex">
                <div>
                    <p>按钮栏背景颜色(渐变)</p>
                    <ColorPicker v-model="tableCssObj.headButtonBackgrounA" size="small" @on-change="tableBorderColFun"/>
                    <ColorPicker v-model="tableCssObj.headButtonBackgrounB" size="small" @on-change="tableBorderColFun"/>
                </div>
                <div>
                    <p>表头背景颜色</p>
                    <ColorPicker v-model="tableCssObj.headerBackColor" size="small" @on-change="tableBorderColFun"/>
                </div>
                <div>
                    <p>表头边框颜色</p>
                    <ColorPicker alpha  v-model="tableCssObj.headBorderColor" size="small" @on-change="tableBorderColFun"/>
                </div>
                <div>
                    <p>表头字体颜色</p>
                    <ColorPicker v-model="tableCssObj.headColor" size="small" @on-change="tableBorderColFun"/>
                </div>
                <div>
                    <p>表格头字体大小</p>
                    <input v-model="tableCssObj.headFontSize" @change="tableBorderColFun" size="small"/>
                </div>
                <div>
                    <p>表格头高</p>
                    <input v-model="tableCssObj.headHeight" @change="tableBorderColFun" size="small"/>
                </div>
            </div>
            <div class="headNumIndex cssheadNumIndex">
                <div>
                    <p>表格鼠标移入背景颜色变换</p>
                    <ColorPicker v-model="tableCssObj.upup_Table_trHover" size="small" @on-change="tableBorderColFun"/>
                </div>
                <div>
                    <p>表格背景颜色</p>
                    <ColorPicker v-model="tableCssObj.tableBackGroundColor" size="small" @on-change="tableBorderColFun"/>
                </div>
                <div>
                    <p>表格边框颜色</p>
                    <ColorPicker alpha  v-model="tableCssObj.tbodyBorderColor" size="small" @on-change="tableBorderColFun"/>
                </div>
                <div>
                    <p>表格字体颜色</p>
                    <ColorPicker v-model="tableCssObj.tbodyColor" size="small" @on-change="tableBorderColFun"/>
                </div>
                <div>
                    <p>表格字体大小</p>
                    <input v-model="tableCssObj.tbodyFontSize" @change="tableBorderColFun" size="small" />
                </div>
                <div>
                    <p>表格行高</p>
                    <input v-model="tableCssObj.tbodyHeight" @change="tableBorderColFun" size="small" />
                </div>
            </div>
            <i-button size="small" @click="tableBorderColFun">表格样式修改确定</i-button>
            <div class="settingFooter">
                <i-button size="small" @click="sureTableChangeFun(1)">修改通用</i-button>
                <i-button size="small" @click="sureTableChangeFun(0)">修改个人</i-button>
            </div>
        </div>
        </Modal>
        <Modal
            v-model="mergeWindowFlag"
            :styles="{top: '20px'}"
            draggable
            title="表格合并"
            footer-hide
            :z-index="100"
            @on-cancel="closeMergeWindFun"
    >
        <div>
            <div>
                <h3>表格合并项</h3>
                <p>提示3：如果合并的表格中需要在某处开始换行，则勾选此项，则从此项开始换行。</p>
                <p>提示4：如果多处被勾选，则多处换行。</p>
                <div class="headNumIndex">
                    <div v-for="(ele) in this.mergeList" :key="ele.fieldName">
                        <!--当该条是已经合并过的数据-->
                        <div v-if="ele.mergeFlag" class="aloneTableDom">
                            <input type="checkbox" class="deletCheck"  @change="checkArrAdd(ele)" :value="ele.fieldName" checked title="不合并该条"/>
                            <span>{{ele.name}}</span>
                            <div class="headNumIndex">
                                <div v-for="(elem) in ele.mergeList" :key="elem.fieldName" >
                                    <div v-if="!elem.breakIsDom" class="aloneTableDom">
                                        <input type="checkbox" class="deletCheck"  @change="checkArrAdd(elem)" :value="elem.fieldName" checked title="不合并该条"/>
                                        <span>{{elem.name}}</span>
                                        <i-switch :value="elem.show" size="small" title="合并中不展示这条"/>
                                        <input type="checkbox" @click="mergeListBreakFun(elem)" class="breakCheckbox" :checked="elem.mergeBreak" :value="elem.fieldName" title="合并后是否换行"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--当此条不是已经合并过的-->
                        <div v-else class="aloneTableDom">
                            <input type="checkbox" class="deletCheck"  @change="checkArrAdd(ele)" :value="ele.fieldName" checked title="不合并该条"/>
                            <span>{{ele.name}}</span>
                            <i-switch :value="ele.show" size="small" title="合并中不展示这条"/>
                            <input type="checkbox" @click="mergeListBreakFun(ele)" :value="ele.fieldName" :checked="ele.mergeBreak" class="breakCheckbox" title="合并后是否换行"/>
                        </div>
                    </div>
                </div>
                <i-Input v-model="mergeHeadVal">
                    <span slot="prepend">合并项目名字</span>
                </i-Input>
                <i-Input v-model="mergeHeadWidth" placeholder="数字">
                    <span slot="prepend">合并项目宽度</span>
                </i-Input>
                <i-button size="small" @click="mergeHeadFun">确定合并</i-button>
            </div>
        </div>
    </Modal>
    </div>
</template>

<script>
    export default {
        name: "BaseTableSetting",
        data(){
            return{
                //被勾选中的可能需要合并的数组
                checkArray:[],
                //解析后head show 为trur的数据 渲染的dom也是使用该数据
                domParseArr:[],
                //解析后head shwo 为false的数据 渲染的dom也是使用该数据
                domParseFalseArr:[],
                //合并表格数据被污染时，使用此数据复原 show 为true的数据
                domParseArrDuplicate:{},
                //合并表格数据被污染时，使用此数据复原 show 为false的数据
                domParseArrFalseDuplicate:null,
                //合并项目名字
                mergeHeadVal:'',
                //合并项目的下标集合
                mergeHeadIndex:'',
                //合并项目的宽度 数字
                mergeHeadWidth:'',
                //通过checkArray解析后的待合并集合
                mergeList:[],
                //合并好的集合
                mergeBreak:[],
                mergeWindowFlag:false,
                //当合并input被勾选时候，存储已经合并的集合
                mergedObj:[],

                tableCssObj:{
                    //按钮栏渐变背景
                    headButtonBackgrounA:'',
                    headButtonBackgrounB:'',
                    //表头背景颜色
                    headerBackColor : '',
                    //表头字体颜色
                    headColor : '',
                    //表头边框颜色
                    headBorderColor:'',
                    //表格头字体大小
                    headFontSize : '',
                    //表头高
                    headHeight:'',

                    //表格背景颜色
                    tableBackGroundColor:'',
                    //表格高
                    tbodyHeight:'',
                    //表格边框颜色
                    tbodyBorderColor:'',
                    //字体大小
                    tbodyFontSize : '',
                    //表格字体颜色
                    tbodyColor:'',
                    //按钮栏背景颜色 渐变
                    upup_Table_trHover : '#E4F1F8',
                }
            }
        },
        props:['tableSettingObj'],
        watch:{
            tableSettingObj:{
                handler(val){
                    this.parseHeadFun(val.tableSettingHead,this.domParseArr,1);
                    this.parseHeadFun(val.tbodyFlaseArray,this.domParseFalseArr,0);
                    this.tableCssObj = Object.assign(this.tableCssObj,val.cssObj);
                },
                immediate:true,
            },
        },
        methods:{
            //解析表格头数据，生成表格合并需要的数据
            parseHeadFun(val,data,type){
                val = JSON.parse(JSON.stringify(val))
                let leng = val.length
                for (let i = 0; i < leng; i++) {
                    data.push(val[i]);
                    //定义该表头当前是否展示
                    if(!!val[i].show){
                        data[data.length-1].show = true;
                    }else{
                        data[data.length-1].show = false;
                    }
                    //定义该表头当前所处的位置，方便后面修改
                    data[data.length-1].position = i;

                };
                if(type){
                    this.domParseArrDuplicate = JSON.parse(JSON.stringify(data));
                }else{
                    this.domParseArrFalseDuplicate = JSON.parse(JSON.stringify(data));
                }
            },
            //修改表格头数据的show 穿梭栏按钮的函数。type=1为添加显示项，为0添加隐藏项
            changeShow(type){
                let arr = [];
                if(type){
                    for (let i = 0; i < this.domParseFalseArr.length; i++) {
                        if(this.domParseFalseArr[i].show){
                            arr.push(this.domParseFalseArr[i]);
                            this.domParseFalseArr.splice(i,1);
                            i--;
                        }
                    }
                    this.domParseArr = this.domParseArr.concat(arr);
                    this.domParseArrDuplicate = JSON.parse(JSON.stringify(this.domParseArr));
                    //副本重新赋值
                    this.domParseArrFalseDuplicate = JSON.parse(JSON.stringify(this.domParseFalseArr))
                }else{
                    for (let i = 0; i < this.domParseArr.length; i++) {
                        if(!this.domParseArr[i].show){
                            arr.push(this.domParseArr[i]);
                            this.domParseArr.splice(i,1);
                            i--;
                        }
                    }
                    this.domParseFalseArr =this.domParseFalseArr.concat(arr);
                    this.domParseArrFalseDuplicate = JSON.parse(JSON.stringify(this.domParseFalseArr));
                    //副本重新赋值
                    this.domParseArrDuplicate = JSON.parse(JSON.stringify(this.domParseArr))
                }
            },
            //是否折叠函数
            foldFun(data){
                if(event.target.checked){

                    console.log(data)
                }else{

                }

            },
            //添加被选中的表格，用来准备合并。或者，勾选合并好的集合，修改它
            checkArrAdd(data){
                //合并此项
                if(event.target.checked){
                    //判断当前项是否是合并项
                    if(data.mergeFlag){
                        for (let i = 0; i < data.mergeList.length; i++) {
                            if(data.mergeList[i].breakIsDom){
                                data.mergeList.splice(i,1);
                                i--;
                            }
                        }
                    }
                    this.mergeList.push(data);
                    //开启合并弹窗
                    this.mergeWindowFlag = true;


                    if(data.mergeFlag){
                        this.mergeHeadVal = data.name;
                        this.mergeHeadWidth = data.width;
                    }
                }
                //删除合并集合的此项
                else{
                    //合并中删除的此项。其show属性都转成true。
                    data.show = true;
                    //待合并的集合中删除此条
                    for (let i = 0; i < this.mergeList.length; i++) {
                        if(this.mergeList[i].fieldName == data.fieldName){
                            this.mergeList.splice(i,1);
                            i--;
                        }
                    };
                    //表格展示合并的input 勾选取消 或者 已经合并的表格中 取消该项的合并，让他重新回到domParseArr
                    let checkboxList = document.getElementsByClassName('checkMergeInput');
                    for (let i = 0; i < checkboxList.length; i++) {
                        //当点击项是没有被合并过的，则取消domParseArr中的input 勾选
                        //如果没有一项与此相等,则说明该点击项不在domParseArr中，是早已经被合并过的数据。
                        if(checkboxList[i].value == data.fieldName){
                            checkboxList[i].checked = false;
                            break
                        };
                        //没有合并过，则在domParseArr需要添加此项，同时还要删除已经合并中的此项。
                        if(i == checkboxList.length-1){
                            //在domParseArr添加此项
                            this.domParseArr.splice([data.position],0,data);
                            //循环domParseArr 找出在domParseArr中哪一个合并项合并了改值 找到后 删除合并中的该值
                            for (let j = 0; j < this.domParseArr.length; j++) {
                                if(this.domParseArr[j].mergeFlag){
                                    for (let k = 0; k < this.domParseArr[j].mergeList.length; k++) {
                                        //找到该值 删除掉
                                        if(this.domParseArr[j].mergeList[k].fieldName == data.fieldName){
                                            this.domParseArr[j].mergeList.splice(k,1);
                                            break
                                        }
                                    };
                                    if(!this.domParseArr[j].mergeList.length){
                                        this.domParseArr.splice(j,1)
                                    }
                                }
                            }
                        }
                    }
                    //当被选中的合并集合长度为0 即 没有需要合并的表格时，则关闭合并弹窗
                    if(!this.mergeList.length){
                        this.mergeWindowFlag = false;
                    }
                }
            },
            //合并弹窗中的换行函数
            mergeListBreakFun(data){
                //勾选中 则展示时候需要换行

                let len = this.mergeList.length;
                for (let i = 0; i < len; i++) {
                    if(this.mergeList[i].mergeFlag){
                        let length = this.mergeList[i].mergeList.length;
                        for (let j = 0; j < length; j++) {
                            if(this.mergeList[i].mergeList[j].fieldName == data.fieldName){
                                this.mergeList[i].mergeList[j].mergeBreak = event.target.checked;
                                break;
                            }
                        }
                    }else if(this.mergeList[i].fieldName == data.fieldName){
                        this.mergeList[i].mergeBreak = event.target.checked;
                        break;
                    }
                }
            },
            //合并弹窗的确定合并的按钮
            mergeHeadFun(){
                //先判断合并名字是否输入,宽度值是否正确
                if(!this.mergeHeadVal){
                    this.$Message.warning({
                        content:'合并项的名字必须填写',
                        duration:5,
                        closable:true,
                    })
                    return
                }
                else if(this.mergeHeadWidth){
                    let num = this.mergeHeadWidth*1;
                    if(!num||num<=0){
                        this.$Message.warning({
                            content:'合并项的宽度必须填写有效数字',
                            duration:5,
                            closable:true,
                        })
                        return
                    }

                };
                
                let parsArr = [];
                let index = this.mergeList[0].position;

                let leng = this.mergeList.length;
                //遍历合并数组
                for (let i = 0; i < leng; i++) {
                    //遍历能展示的head 数组
                    for (let j = 0; j < this.domParseArr.length; j++) {
                        //当合并数组中fieldName 与 渲染数组中某条数据fieldName 相等 开始合并
                        if(this.mergeList[i].fieldName == this.domParseArr[j].fieldName){
                            //如果渲染数据中已经是合并数据
                            if(this.domParseArr[j].mergeFlag){
                                parsArr = [...parsArr,...this.mergeList[i].mergeList];
                                this.domParseArr.splice(j,1);
                                break
                            }
                            //如果不是合并数据 parseArr 添加该条数据，同时删除渲染数据中的该条
                            else{
                                parsArr.push(this.domParseArr.splice(j,1)[0]);
                                break
                            }
                        }
                    }
                }
                //添加一个空节点
                let len = parsArr.length;
                for (let i = 0; i < len; i++) {
                    if(parsArr[i].mergeBreak){
                        if(!parsArr[i+1].breakIsDom){
                            //breakNameDom+i 作为唯一key
                            parsArr.splice(i+1,0,{breakIsDom:true,fieldName:'breakNameDom'+i})
                        }
                    }
                }
                //包裹成对象
                let obj = {
                    name:this.mergeHeadVal,
                    width:this.mergeHeadWidth,
                    mergeFlag:true,
                    mergeList:parsArr,
                    position:index*1,
                    fieldName:(new Date()).valueOf(),
                    show:true,
                };
                //展示数据的index位置插入要合并的数据
                this.domParseArr.splice(index,0,obj);
                //情况合并数据
                this.mergeList = [];
                //关闭合并弹窗
                this.mergeWindowFlag = false;
                //备份一份数据 当数据已经篡改，同时又取消操作后，保证数据为原数据不动
                this.domParseArrDuplicate = JSON.parse(JSON.stringify(this.domParseArr));
            },
            //关闭合并弹窗
            closeMergeWindFun(){
                this.mergeList = [];
                this.mergeWindowFlag = false;
                let checkboxList = document.getElementsByClassName('checkMergeInput');
                for (let i = 0; i < checkboxList.length; i++) {
                    checkboxList[i].checked = false;
                }
                //关闭弹窗后还原数据
                this.domParseArr = JSON.parse(JSON.stringify(this.domParseArrDuplicate));
                this.domParseFalseArr = JSON.parse(JSON.stringify(this.domParseArrFalseDuplicate));
            },
            //表格修改确定。作用，宽度，排序，位置层级，是否折叠展示等
            changeTheadFun(){
                let beforDomParseArr = JSON.parse(JSON.stringify(this.domParseArr));
                let leng = beforDomParseArr.length;
                for (let i = 1; i < leng; i++) {
                    let j = i-1;
                    if(!beforDomParseArr[i].position){
                        beforDomParseArr[i].position = 0;
                    };
                    if(!beforDomParseArr[j].position){
                        beforDomParseArr[j].position = 0;
                    };
                    deepPosition(beforDomParseArr[i].position,beforDomParseArr[j].position);
                    //根据传入的位置数据来排序。此处 根据position值大小不同，用来排序表格
                    function deepPosition(val,beforVal){
                        if(val<beforVal){
                            if(!j){
                                let a = beforDomParseArr.splice(i,1)[0];
                                beforDomParseArr.splice(j,0,a);
                            }
                            else{
                                j-=1;
                                deepPosition(beforDomParseArr[i].position,beforDomParseArr[j].position);
                            }
                        }else{
                            if(j!=i-1){
                                let a = beforDomParseArr.splice(i,1)[0];
                                beforDomParseArr.splice(j+1,0,a)
                            }
                        }
                    }
                }
                this.domParseArr = beforDomParseArr;
            },
            //确定修改表格，并渲染
            sureTableChangeFun(type){
                // type 1 是通用修改。 type 0 是个人修改
                let cssObj = undefined;
                if(this.tableCssObj.defaultFlag){
                    cssObj = this.tableCssObj
                }
                // console.log(this.domParseArr)
                // console.log(this.domParseArrFalseDuplicate)
                // console.log(cssObj)

                this.$emit('parseTableHeadFun',this.domParseArr,this.domParseArrFalseDuplicate,cssObj,type)
            },
            tableBorderColFun(){
                this.tableCssObj.defaultFlag = true;
            }
        },
        created() {}
    }
</script>

<style scoped>
.headNumIndex{
    display: flex;
    flex-wrap: wrap;
    border: 1px solid #e8eaec;
}
.headNumIndex>div{
    margin: 2px 3px;
    padding: 5px;
    /*border: 1px solid gainsboro;*/
    border: 1px solid #e8eaec;
    border-radius: 4px;
    align-self:flex-start;
}
.headNumIndex>div>*{
    margin: 0px 2px;
    /*border-bottom: 1px solid #e8eaec;*/
}
/*穿梭框*/
/*外部包裹层*/
.transferWrap{
    display: flex;
    border: 1px solid #e8eaec;
    justify-content: space-around;
}
/*两个穿梭框*/
.transfer{
    height: 300px;
    width: 270px;
    overflow-y: auto;
    margin: 5px;
    /*border: 1px solid #e8eaec;*/
}

/*穿梭框内部单独的子*/
.transferChild{
    margin: 2px 1px;
    padding: 3px;
    border: 1px solid #e8eaec;
    border-radius: 4px;
}
.transferChild>*{
    margin: 0px 2px;
}
/*穿梭框 穿梭按钮*/
.transferButton{
    height: 300px;
    width: 20px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}
/*换行标识样式*/
.breakCheckbox{
    width: 12px;
    height: 12px;
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    line-height: 12px;
    margin-right: 10px;
    position: relative;
}
.breakCheckbox::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    background: #fff;
    width: 100%;
    height: 100%;
    border: 1px solid #3DB8A5;

}
.breakCheckbox:checked::before {
    /*content: "\2716";*/
    content: "\2713";
    background-color: #3DB8A5;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    border: 1px solid #3DB8A5;
    color: white;
    font-size: 12px;
    font-weight: bold;
}
/*删除合并样式*/
.deletCheck{
    width: 12px;
    height: 12px;
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    line-height: 12px;
    margin-right: 10px;
    position: relative;
}
.deletCheck::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    background: #fff;
    width: 100%;
    height: 100%;
    border: 1px solid white;

}
.deletCheck:checked::before {
    content: "\2716";
    background-color: white;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    /*border: 1px solid #3DB8A5;*/

    color: red;
    font-size: 12px;
    font-weight: bold;
}
/*排序样式*/
.sortClass{
    width: 12px;
    height: 12px;
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    line-height: 12px;
    margin-right: 10px;
    position: relative;
}
.sortClass::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    background: #fff;
    width: 100%;
    height: 100%;
    border: 1px solid #DAAF90;

}
.sortClass:checked::before {
    content: "\21C4";
    background-color: white;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    border: 1px solid white;

    color: #DAAF90;
    font-size: 12px;
    font-weight: bold;
}
/*折叠样式*/
.sortTwoClass{

    width: 12px;
    height: 12px;
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    line-height: 12px;
    margin-right: 10px;
    position: relative;

    /*border: 1px solid deepskyblue;*/
}

.aloneTableDom>*{
    margin: 0 2px;
}
    /*样式框的样式*/
.cssheadNumIndex{
    font-size: 12px;
    margin-top: 5px;
    height: 70px;
    overflow-y: auto;
}
/*弹窗底部样式*/
.settingFooter{
    margin-top: 5px;
    border-top: 1px #E8EAEC solid;
}
.settingFooter>*{
    margin-top: 5px;
    margin-right: 5px;
}
</style>
<style scoped>
    .baseSettingWindowClass{
        height: 400px;
        overflow-y: auto;
    }
</style>