<template>
    <div class="form-horizontal" id="formHorizontal" v-cloak>
        <!--<div :class="{clickshow:clickshow}">-->
        <div>
            <!--serverDom当客服异常单按钮进来时无法操作-->
            <!--<div :class="{serverDom:serverDom}">-->
            <div>
                <!--航程信息-->
                <div>
                    <div>
                        <span class="">航程信息</span>
                    </div>
                    <!--航程信息列表-->
                    <div>
                        <table >
                            <thead class="tableHead">
                            <tr>
                                <th >订单来源</th>
                                <th >系统订单号</th>
                                <th >平台订单号</th>
                                <th >政策号</th>
                                <th >航班号</th>
                                <th >舱位</th>
                                <th >航程</th>
                                <th >出发时间</th>
                                <th >到达时间</th>
                            </tr>
                            </thead>
                            <tbody class="tableBody">
                            <tr v-for="(orr,index) in flight" :key="index">
                                <td>{{orr.platformName}}</td>
                                <td>{{orr.id}}</td>
                                <td>{{orr.platformOrder}}</td>
                                <td>{{orr.policyCode}}</td>
                                <td>{{orr.code}}</td>
                                <td>{{orr.position}}</td>
                                <td>{{orr.dptCity}}-{{orr.arrCity}}</td>
                                <td>{{orr.dptTime}}</td>
                                <td>{{orr.arrTime}}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <!--联系人信息-->
                <div>
                    <div>
                        <label >
                            <span  style="font-size: 14px">联系人信息</span>
                        </label>
                    </div>
                    <!--联系人列表-->
                    <div class="">
                        <table>
                            <colgroup  style="width:auto"></colgroup><!--序号-->
                            <colgroup  style="width:auto"></colgroup><!--序号-->
                            <colgroup  style="width:auto"></colgroup><!--序号-->
                            <colgroup  style="width:auto"></colgroup><!--序号-->
                            <colgroup  style="width:10%"></colgroup><!--序号-->
                            <thead class="tableHead">
                            <tr>
                                <th >联系人姓名</th>
                                <th >联系人手机号码</th>
                                <th >联系人邮箱</th>
                                <th >下单渠道</th>
                                <th >舱位备注</th>
                            </tr>
                            </thead>
                            <tbody class="tableBody">
                            <tr>
                                <td>{{flight[0].contactName}}</td>
                                <td>{{flight[0].contactNumber}}</td>
                                <td>{{flight[0].contactEML}}</td>
                                <td>{{flight[0].channel}}</td>
                                <td>
                                    <div>{{flight.remarks}}</div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--提示框-->
                    <div class="alertWindow">
                        <div>
                            <button style="float: right">关闭</button>
                            <p class="">自动出票失败原因:<span>{{flight.flightno}}</span></p>
                            <p style="color: red;font-size: 16px" v-if="flight.isAssociation==1?true:false">此单是关联订单，请注意！</p>
                        </div>
                    </div>
                </div>
                <!--出票操作与乘机人信息-->
                <div class="">
                    <!--标头-->
                    <div>
                        <span class="">出票操作与乘机人信息</span>
                    </div>
                    <!--乘客详细信息-->
                    <div>
                        <table>
                            <thead class="tableHead">
                            <tr>
                                <th>姓名</th>
                                <th  style="width: 8%">乘客类型</th>
                                <th>证件号</th>
                                <th style="width: 8%">出生日期</th>
                                <th style="width: 30%">
                                    <button class="xtbut"  @click="rtfun('error')">rt编码获取票号</button>
                                    <select class="selectcss manualselect" style="width: 100px;display: inline-block;" v-model="orderticket.officeAbove">
                                        <option value="CSX107" >CSX107</option>
                                        <option value="CSX513" >CSX513</option>
                                    </select>
                                </th>
                                <th style="width: 8%">票面价</th>
                                <th style="width: 8%">机建/燃油</th>
                                <th style="width: 8%">收款金额</th>
                            </tr>
                            </thead>
                            <tbody class="tableBody">
                            <tr v-for="(orr,index) in passengerList" :id="d+index" :key="index">
                                <td>{{orr.name}}</td>
                                <td>{{orr.passengerType}}</td>
                                <td>
                                    <div>
                                        <input type="text" class="chooseinput artificialMust datamessage"  v-model.trim='orr.licenseNumber' />
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <input  type="text" class="chooseinput datamessage" v-model.trim="orr.birthday" />
                                    </div>
                                </td>
                                <td>
                                    <div class="">
                                        <input type="text" class="chooseinput artificialMust datamessage" v-model.trim="orr.ticketNum"  /><span class="col_red">*</span>
                                    </div>
                                </td>
                                <td :rowspan="orr.passengerListType" v-show="orr.passengerListType">
                                    <input class="chooseinput artificialMust datamessage" v-model.trim="orr.facePrice" >
                                </td>
                                <td :rowspan="orr.passengerListType" v-show="orr.passengerListType">
                                    <input class="chooseinput artificialMust datamessage" v-model.trim="orr.infrastructure" >
                                </td>
                                <td :rowspan="orr.passengerListType" v-show="orr.passengerListType" >
                                    <input v-model.trim="orr.collection" class="chooseinput artificialMust datamessage">
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--pnr等输入和按钮功能-->
                    <div style="margin-left: 3%">
                        <div>
                            <!--小编码/新小编码-->
                            <div class="conding">
                                <div>
                                    <span>小编码&#8195;</span>
                                    <input  type="text"  v-model.trim="orderticket.smartPnr"  style="text-transform:uppercase">
                                    <span class="col_red">*</span>
                                    <button class="xtbut" @click="pnr(1)">PNR</button><!--传入小编和判断数值1-->
                                </div>
                                <!--大编码-->
                                <div>
                                    大编码&#8195;
                                    <input  type="text"  v-model.trim="orderticket.bigPnr" style="text-transform:uppercase">
                                    <span class="col_red">*</span>
                                    <button class="xtbut"  @click="bigPnr">取大编码</button>
                                </div>
                                <!--三个按钮-->
                                <div id="butt">
                                    <button class="xtbut" @click="conversionPnr">换编码</button>
                                    <button class="xtbut" @click="changeNumText">换编码文本</button>
                                    <button class="xtbut" @click="changeShareFlight(flight.id)">换共享航班</button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="conding02">
                                <!--新小编码-->
                                <div>
                                    <span>新小编码</span>
                                    <input  type="text" v-model.trim="orderticket.newSmartPnr" style="text-transform:uppercase">
                                    <span style="visibility: hidden">*</span>
                                    <button class="xtbut" @click="pnr(2)">PNR</button> <!--传入新小编和判断数值2，新小编是自己填的-->
                                </div>
                                <!--新大编码-->
                                <div>
                                    <span>新大编码</span>
                                    <input  type="text" v-model.trim="orderticket.newBigPnr" style="text-transform:uppercase">
                                    <span style="visibility: hidden">*</span>
                                    <button class="xtbut " @click="savepnr">保存编码</button>
                                </div>
                            </div>
                        </div>
                        <div style="width: 100%" class="otherSubjects">
                            <!--B2B账户--><!--重新获取B2B政策-->
                            <div>
                                <span>B2B账户：</span>
                                <select class="selectcss" v-model="orderticket.officeBelow">
                                    <option v-for="ele in b2bArray" :key="ele.username" :value="ele.username" >{{ele.username}}</option>
                                </select>
                                <button class="xtbut" @click="actionB2B">重新获取B2B政策</button>
                            </div>
                            <div>
                                <!--BSP出票账户-->
                                <span>BSP出票账户：</span>
                                <select class="selectcss" name="S_drawer">
                                    <option value="1">功能暂未开放</option>
                                    <option value="2"></option>
                                    <option value="3"></option>
                                </select>
                                <button class="xtbut">BSP出票</button>
                                <!--BOP出票选项-->
                                <span>BOP出票账户：</span>
                                <select class="selectcss" name="O_drawer">
                                    <option value="1">功能暂未开放</option>
                                    <option value="2"></option>
                                    <option value="3"></option>
                                </select>
                                <button class="xtbut">BOP出票</button>
                            </div>
                        </div>
                    </div>
                    <!--信息一号栏-->
                    <div class="">
                        <div class="">
                            <table >
                                <thead class="tableHead">
                                <tr>
                                    <th >选择</th>
                                    <th >票面价</th>
                                    <th >税费</th>
                                    <th >返点</th>
                                    <th >代理费</th>
                                    <th >采购金额</th>
                                    <th >收款金额</th>
                                    <th >利润</th>
                                </tr>
                                </thead>
                                <tbody class="tablehover">
                                <tr v-for="(va,index) in B2Barr" :key="index" class="B2Bchooser"> <!--(va,index,key) in B2Barr-->
                                    <td><input type="radio" name="chose" @click="radiofun(index)"></td>
                                    <td>{{va.amtAdulPrice}}</td>
                                    <td>{{va.tax}}</td>
                                    <td>{{va.rebates}}</td>
                                    <td>{{va.fixedFee }}</td>
                                    <td>{{va.payPrice}}</td>
                                    <td>{{flight.collection}}</td>
                                    <td>{{va.profit}}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <!--14个按钮-->
                    <div class="inputpay">
                        <!--汇付-->
                        <button class="xtbut xtbutB">汇付</button>
                        <!--易商旅-->
                        <button class="xtbut xtbutB">易商旅</button>
                        <!--厦航虚拟-->
                        <button class="xtbut xtbutB">厦航虚拟</button>
                        <!--支付宝-->
                        <button class="xtbut xtbutB">支付宝</button>
                        <!--山航虚拟-->
                        <button class="xtbut xtbutB">山航虚拟</button>
                        <!--易宝-->
                        <button class="xtbut xtbutB" @click="b2bpay" v-if="flight.airCompany=='TV'?false:flight.airCompany=='MF'?false:true">易宝</button>
                        <!--易生-->
                        <button class="xtbut xtbutB">易生</button>
                        <!--深航预存-->
                        <button class="xtbut xtbutB">深航预存</button>
                        <!--储蓄卡-->
                        <button class="xtbut xtbutB">储蓄卡</button>
                        <!--奥游卡107-->
                        <button class="xtbut xtbutB">奥游卡107</button>
                        <!--票速通-->
                        <button class="xtbut xtbutB" @click="ticketSpeedThrough">票速通</button>
                        <!--奥游卡531-->
                        <button class="xtbut xtbutB">奥游卡513</button>
                        <!--东海预存-->
                        <button class="xtbut xtbutB" @click="eastSeaFun">东海预存</button>
                        <!--川航预存-->
                        <button class="xtbut xtbutB">川航预存</button>
                    </div>
                    <!--获取平台价格-->
                    <div>
                        <button @click="gerPriceFun">获取平台价格</button>
                        <button @click="gerPriceFun">AQ同程反踩</button>
                    </div>
                </div>
                <div class="priceDiv" v-if="priceDivFlag">
                    <table>
                        <thead class="tableHead">
                        <tr>
                            <th class="">平台</th>
                            <th class="">报价1</th>
                            <th class="">报价2</th>
                            <th class="">报价3</th>
                        </tr>
                        </thead>
                        <tbody class="tableBody">
                        <tr v-for="(ele,index) in Ordprice" :key="index">
                            <td>{{ele.price_type}}</td>
                            <td>
                                <div class="priceTab" v-if="ele.result.vendors[0]" @click="sendPriceFun(0,ele.result.vendors[0].barePrice,index,(ele.result.vendors[0].barePrice+ele.result.arf+ele.result.tof))">{{ele.result.vendors[0].barePrice+ele.result.arf+ele.result.tof}}</div>
                                <div  v-if="ele.result.vendors[0]">{{ele.result.vendors[0].domain}}</div>
                            </td>
                            <td>
                                <div class="priceTab" v-if="ele.result.vendors[1]" @click="sendPriceFun(1,ele.result.vendors[1].barePrice,index,(ele.result.vendors[1].barePrice+ele.result.arf+ele.result.tof))">{{ele.result.vendors[1].barePrice+ele.result.arf+ele.result.tof}}</div>
                                <div  v-if="ele.result.vendors[1]" >{{ele.result.vendors[1].domain}}</div>
                            </td>
                            <td>
                                <div class="priceTab" v-if="ele.result.vendors[2]" @click="sendPriceFun(2,ele.result.vendors[2].barePrice,index,(ele.result.vendors[2].barePrice+ele.result.arf+ele.result.tof))">{{ele.result.vendors[2].barePrice+ele.result.arf+ele.result.tof}}</div>
                                <div  v-if="ele.result.vendors[2]">{{ele.result.vendors[2].domain}}</div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <!--手工出票 从倒数第一个蓝色字采购信息开始-->
            </div>
            <!--出票类型选择 b2b bsp op bop-->
            <div id="manualOperation">
                <div :class="{serverDom:serverDom}">
                    <!--采购信息表-->
                    <div>
                        <div class=" ">
                            <span>出票类型</span>
                            <select  class="selectcss manualselect artificialMust" @change="manualselect(orderticket.ticketObject)" v-model="orderticket.ticketObject">
                                <option value="官网">官网</option>
                                <option value="B2B">B2B</option>
                                <option value="BSP">BSP</option>
                                <option value="OP">OP</option>
                                <option value="BOP">BOP</option>
                            </select>
                        </div>
                    </div>
                    <div class="manualgroup">
                        <!--b2b dom-->
                        <div class="" v-if="orderticket.ticketObject=='B2B'||orderticket.ticketObject=='官网'">
                            <div class="">
                                <span class="">采购科目</span>
                                <!--B2B的采购科目下拉框的结构-->
                                <select  class="selectcss artificialMust manualselect" style="width: 90px" @change="manualObject(B2B.paySubjectsChecked)" v-model="B2B.paySubjectsChecked">
                                    <option :value="paySubject" v-for="(paySubject,index) in paySubjects" :key="index">{{paySubject.subject}}</option>
                                </select>
                                <span class="col_red">*</span>
                                <!--B2B采购账号下拉框接口-->
                                <span>采购账号</span>
                                <select  class="selectcss artificialMust manualselect" style="width: 130px">
                                    <option v-for="(payna,index) in payAccount" :value="payna" :key="index">{{B2B.payAccountChecked}}</option>
                                </select>
                                <span class="col_red">*</span>
                                <!--B2B点数-->
                                <span>点数/采购金额：</span>
                                <input type="text" class="artificialMust manualselect" v-model.trim="B2B.cash">￥
                                <span class="col_red">*</span>
                            </div>
                        </div>
                        <!--BSP dom-->
                        <div class="" v-if="orderticket.ticketObject=='BSP'">
                            <div class="">
                                <span class="" style="font-size: 14px">office号</span>
                                <select  class="selectcss artificialMust manualselect" v-model="BSP.officeNumber">
                                    <option value="CSX107">CSX107</option>
                                    <option value="CSX513">CSX513</option>
                                </select>
                                <span class="col_red">*</span>
                                <span>点数/采购金额：</span>
                                <input type="text" class="artificialMust manualselect" v-model.trim="BSP.cash">￥
                                <span class="col_red">*</span>
                            </div>
                        </div>
                        <!--OP dom-->
                        <div class="form-group  B2B" v-if="orderticket.ticketObject=='OP'" style="margin-left: -15px;height: 80px;">
                            <label class="col-sm-1 control-label">采购平台</label>
                            <div class="col-sm-11 " style="margin-bottom: 9px">
                                <!--op下拉菜单-->
                                <select  class="selectcss artificialMust manualselect" v-model="OP.purchaseTableChecked">
                                    <option v-for="(op,index) in OP.purchaseTable"  :value="op" :key="index">{{op}}</option>
                                </select>
                                <span class="col_red">*</span>
                                <span>采购订单:</span>
                                <input type="text" class="manualselect"  v-model.trim="OP.purchaseOrder">
                            </div>
                            <div>
                                <label class="col-sm-1 control-label">采购科目</label>
                                <div class="col-sm-11 ">
                                    <!--OP采购科目下下拉菜单-->
                                    <select  class="selectcss artificialMust manualselect"  @change="manualObject(order_ticketing.paySubjects)" v-model="OP.paySubjectsChecked">
                                        <option v-for="(paySubject,index) in paySubjects" :value="paySubject" :key="index">{{paySubject.subject}}</option>
                                    </select>
                                    <span class="col_red">*</span>
                                    <span>采购账号</span>
                                    <!--OP科目下采购账号下拉菜单-->
                                    <select  class="selectcss artificialMust manualselect" v-model="OP.payAccountChecked">
                                        <option  v-for="(ele,index) in payAccount" :value="ele" :key="index">{{ele}}</option>
                                    </select>
                                    <span class="col_red">*</span>
                                    <span>点数/采购金额：</span>
                                    <input type="text" class="artificialMust manualselect" v-model.trim="OP.cash">￥
                                    <span class="col_red">*</span>
                                </div>
                            </div>
                        </div>
                        <!--BOP dom-->
                        <div class="" v-if="orderticket.ticketObject=='BOP'">
                            <span>采购科目</span>
                            <select  class="selectcss artificialMust manualselect"
                                     style="width: 130px"
                                     v-model="BOP.bopPaySubjectsChecked" >
                                <option value="CSX107">CSX107</option>
                                <option value="CSX513">CSX513</option>
                            </select>
                            <span class="col_red">*</span>
                            <!--B2B点数-->
                            <span>点数/采购金额：</span>
                            <input type="text" class="artificialMust manualselect" v-model.trim="BOP.cash">￥
                            <span class="col_red">*</span>
                        </div>
                    </div>
                </div>
                <div class="" >
                    <div class="" style="display: inline-block;line-height: initial">
                        <span class="">订单备注</span>
                        <textarea type="text" class="manualselect" v-model="order_ticketing.orderMarkes" style="height: 50px;vertical-align: top;width: 240px"></textarea>
                    </div>
                    <div :class="{serverDom:serverDom}" style="display: inline-block;margin-left: 50px">
                        <div class="">
                            <span class="">支付流水号</span>
                            <input type="text" class="manualselect" v-model.trim="order_ticketing.payNumber">
                        </div>
                    </div>
                </div>
            </div>
            <!--最后的处理按钮-->
            <div class="dealwith" style="margin-left: 13%">
                <!--保存并自动获取票号-->
                <!--<div >-->
                <!--<button class="xtbut" disabled>保存并自动获取票号</button>-->
                <!--</div>-->
                <!--保存并返回-->
                <div>
                    <button class="xtbut" @click="saveReturn(null)">保存并返回</button>
                </div>
                <!--填写日志-->
                <div>
                    <button class="xtbut" @click="orderShow">日志</button>
                </div>
                <!--拒绝出票-->
                <div>
                    <button class="xtbut" @click="refuse">拒绝出票</button>
                </div>
                <!--审核订单-->
                <div :data-set="numlength" @click="shenhe('yes')">
                    <button class="xtbut">审核订单</button>
                </div>
                <!--改航班号/舱位-->
                <div>
                    <button class="xtbut" @click="changeFlightPosition(flight.id)">改航班号/舱位</button>
                </div>
                <!--转锁订单-->
                <div style="position: relative">
                    <button class="xtbut" @click="changelock">订单转锁</button>
                    <div class="passengerList" v-if="passengerListflag">
                        <div class="cancelclock" @click="changelock"></div>
                        <select class="selectcss workerlist">
                            <option :value="name" v-for="name in workerlist" :key="name">{{name}}</option>
                        </select>
                        <button class="btn btn-default btn-sm sureclock" @click="change">确定转锁</button>
                    </div>
                </div>
                <!--解锁并返回-->
                <div @click="unlockreturn">
                    <button class="xtbut">解锁并返回</button>
                </div>
                <!--强制回填-->
                <div @click="shenhe('no')">
                    <button class="xtbut" >强制回填</button>
                </div>
                <!--返回-->
                <div @click="fanhui">
                    <button class="xtbut return">返回</button>
                </div>
            </div>
        </div>
        <!--pnr框-->
        <article class="PNRtext" v-if="pngFlag">
            <div class="">
                <div class="">
                    <button  @click="pnrFlagFun">关闭</button>
                    <h4 class="" style="display: flex;justify-content: center">PNR信息</h4>
                </div>
                <textarea class="pnrValue"  readonly v-model="pnrValue">
            </textarea>
                <div class="" style="display: flex;justify-content: space-between">
                    <div ><span>cnyf: </span><span>{{pat.cnyf}}</span></div>
                    <div ><span>cnycn: </span><span>{{pat.cnycn}}</span></div>
                    <div ><span>cnyyq: </span><span>{{pat.cnyyq}}</span></div>
                </div>
                <div class="">
                    <button class="xtbut" style="float: right" @click="pnrFlagFun">关闭</button>
                </div>
            </div>
        </article>
        <!--日志框-->
        <div class='log' v-show="logObj.logflag">
            <div class="" style="height: 30px">
                <h4 style="display: flex;justify-content: center">操作日志</h4>
            </div>
            <div>
                <template>
                    <i-Table height="380" width="650" :columns="logObj.columns1" :data="logObj.logar"></i-Table>
                </template>
            </div>
            <div class="">
                <button class="xtbut" style="float: right" @click="logfun">关闭</button>
            </div>

        </div>
        <!--共享航班-->
        <div id="showshare" v-if="showarrflag" style="background-color: black;color: #00CC66">
            <div>
                <div style="margin: 5px 5px 5px">
                    <h4>共享航班信息</h4>
                    <button type="button" class="btn btn-white btn-sm col-xs-offset-8" style="border: 1px solid cornflowerblue">关闭</button>
                </div>
                <div style="color: black;float: right">
                    <button type="button" class="" @click="closeshowarr">关闭</button>
                </div>
                <div class="" style="width: 800px">
                    <div  v-for="(va,ind) in showarr" :key="ind" style="width: 100%;">
                        <div if="index==0?true:false">{{va}}</div>
                        <div v-for="(val,inde) in va" style="width: 100%;" :key="inde" >
                            <span v-for="(valu,index) in val" :key="index"  class="" style="margin-left: 2%">{{valu}}</span>
                        </div>
                        <span>&nbsp;&nbsp;&nbsp;{{va.flight}}</span>
                        <div v-if="va.position" style="display: inline-block">
                            <div v-for="(ele,index) in va.position.slice(0,10)" :key="index" style="display: inline-block">
                                <span :class="ele.s==='A'||ele.s*1>0?'classRed':'classGrey'">&nbsp;&nbsp;&nbsp;{{ele.b}}</span><span :class="ele.s==='A'||ele.s*1>0?'':'classGrey'">{{ele.s}}&nbsp;&nbsp;&nbsp;</span>
                            </div>
                        </div>
                        <span>{{va.stime}}&nbsp;&nbsp;</span>
                        <span>{{va.atime}}</span>
                        <div v-if="va.position">
                            <span style="visibility: hidden">&nbsp;&nbsp;&nbsp;{{va.flight}}</span>
                            <div v-for="(ele,index) in va.position.slice(10)" :key="index" style="display: inline-block">
                                <span :class="ele.s==='A'||ele.s*1>0?'classRed':'classGrey'">&nbsp;&nbsp;&nbsp;{{ele.b}}</span><span :class="ele.s==='A'||ele.s*1>0?'':'classGrey'">{{ele.s}}&nbsp;&nbsp;&nbsp;</span>
                            </div>
                        </div>
                         <div v-if="va.position" style="display: inline-block">
                             <!--<span v-for="(ele,index) in va.position.slice(5)" :key="index" v-if="va.position" :class="ele.s==='A'||ele.s*1>0?'classRed':'classGrey'">&nbsp;&nbsp;&nbsp;{{ele.b}}{{ele.s}}&nbsp;&nbsp;&nbsp;</span>-->
                         </div>
                        <div>&nbsp;&nbsp;&nbsp;{{va.shareLine}}</div>
                    </div>
                </div>
            </div>
        </div>
        <!--换编码文本框-->
        <div id="changeText" v-if="changeTextObj.changeTextFlag">
            <div>
                <header>
                    <p>换编码文本</p>
                </header>
                <section style="margin-top: 10px">
                    <div>
                        <span>SS:</span>
                        <span>{{this.flight[0].code}}/</span><span>{{this.flight[0].position}}/</span><span>{{this.flight[0].time06}}/</span><span>{{this.flight[0].dptCity}}{{this.flight[0].arrCity}}/</span><span>{{this.flight[0].population}}</span>
                    </div>
                    <div>
                        <span>NM</span>
                        <span v-for="(ele,index) in passengerList" :key="index">1{{ele.man}}</span>
                    </div>
                    <div>
                        <span>TKTL</span>
                        <span>{{this.flight[0].time03}}</span>
                        <span>{{this.flight[0].time01}}</span>
                    </div>
                    <div v-for="(ele,index) in passengerList" :key="index">
                        <div>
                            <span>SSR</span>
                            <span>FOID</span>
                            <span>{{ele.airCompany}}</span>
                            <span>HK/NI</span><span>{{ele.licenseNumber}}</span><span>/P{{index+1}}</span>
                        </div>
                        <div>
                            <span>OSI</span>
                            <span>{{ele.airCompany}}</span>
                            <span>CTCM</span><span>{{ele.number}}</span><span>/P{{index+1}}</span>
                        </div>
                    </div>
                    <div>
                        <span>OSI</span>
                        <span>{{this.passengerList[0].airCompany}}</span>
                        <span>CTCT18973277876</span>
                    </div>
                    <div>
                        <span>RMK</span>
                        <span>TJ</span>
                        <span>AUTH</span>
                        <span>CSX107</span>
                    </div>
                    <div>
                        <span>\</span>
                    </div>
                </section>
                <footer style="float: right;opacity: 1">
                    <button class="xtbut" @click="closeChangeText">关闭</button>
                </footer>
            </div>
        </div>
        <!--拒绝出票弹框-->
        <div id="refuse" v-if="refuseflag">
            <textarea placeholder="拒绝出票原因" v-model="refusetext"></textarea>
            <button @click="surerefuse(refusetext)">确定</button>
            <button @click="refusewindow">取消</button>
        </div>
        <!--改航班号舱位弹框-->
        <share-position :share.sync="sharePositionFlag" v-if="sharePositionFlag"></share-position>-->
        <!--缓冲动画-->
        <!--<Row>-->
            <!--<Col class="demo-spin-col" span="8">-->
                <!--<Spin fix v-if="animaflag">-->
                    <!--<Icon type="ios-loading" class="demo-spin-icon-load" style="font-size:60px"></Icon>-->
                    <!--<div>Loading</div>-->
                <!--</Spin>-->
            <!--</Col>-->
        <!--</Row>-->
    </div>
</template>

<script>
    const calc = require('calculatorjs');
    export default {
        name: "artificial_deal",
        data(){
            return{
                //游客模式 //是否能够点击
                clickshow:false,
                //客服进来模式 只能操作部分功能
                serverDom:false,
                //国内总订单进入模式 平时为false,当为国内总订单进入时,会为true 为防止单权限转移
                all:false,
                //pnr按钮 控制pnr框显隐
                pngFlag:false,


                //id
                orderid:undefined,
                //航程信息（页面第一个列表），由orderDate传入并改写
                flight:[{}],
                //乘客信息
                passengerList:null,
                //B2B账户数组
                b2bArray:[],
                //出票类型相关信息 为已选定值 非默认值
                orderticket:{},
                //克隆出的出票类型对象，业务员的操作更改此对象值，若业务员没有保存操作，则使用上面原值
                //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                //采购科目因为多个出票类型公用，所以单独提取出来
                paySubjects:null,
                payAccount:null,
                //出票类型的四个数据载体 官网与B2B为同一个数据载体
                //分成四个而不是使用共用，在于操作人切换出票类型时，可以为他们保存上一次使用的值，无需再选择
                B2B:{
                    //采购账号
                    payAccountChecked:null,
                    //采购科目
                    paySubjectsChecked:null,
                //    点数/采购金额
                    cash:undefined,
                },
                BSP:{
                    officeNumber:undefined,
                    cash:null,
                },
                OP:{
                    purchaseTable:undefined,
                    purchaseTableChecked:undefined,
                    purchaseOrder:undefined,
                    paySubjectsChecked:null,
                    payAccountChecked:null,
                    cash:undefined
                },
                BOP:{
                    cash:undefined,
                    bopPaySubjectsChecked:null,
                },
                orderMarks:undefined,
                payNumber:undefined,
                //~~~~~~~~~~~~~~~上面为出票类型整个数据模块~~~~~~~~~~~~~~~~


                //~~~~~~~~~~~~换编码文本信息~~~~~~~~~~~~~~~
                changeTextObj:{
                    changeTextFlag:false,
                },
                //~~~~~~~~~~~~~pnr框相关值~~~~~~~~~~~~~~~~
                pnrValue:'',
                //pnr后拿到的pat里面的值
                pat:{
                    cnyf: undefined,
                    cnycn: undefined,
                    cnyyq: undefined
                },

                // 该条订单的主体信息  data.list
                orderData:'',



                //乘机人信息
                flight02:'',
                //订单统一值前缀
                d:'d',
                manua:'',

                mustflag:false,
                //订单id
                loca:123,
                //订单id地址值
                local:'',
                //paySubjects:'',      //采购科目 for循环时候使用
                buy:'',       //采购账号

                numlength:'',//乘客信息的长度，在下面axios中会将passengerList长度赋值个它
                //日志相关数据
                logObj:{
                    //ajax接受日志参数载体
                    logar:[],
                    //日志表头固定好的信息
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
                    //日志显隐开关
                    logflag:'',
                },
                buyName:'', //采购平台 在出票类型更改后ajax自动获取

                // listobflag:true,
                listobj:false, //票号获取数组
                //记录该订单人工操作后，赋予该订单的其他信息，传给后台做处理
                order_ticketing:{
                    buy: "",
                    cash: "",
                    id: "",
                    officeAbove:"CSX107",
                    officeBelow:"CSX107",
                    order: "",
                    orderMarkes: "",
                    orderStatus: "",
                    payNumber: "",
                    paySubjects: "", //易宝 支付宝 之类采购科目
                    pointNumber: "",
                    table: "",
                    ticketObject:"B2B",
                },
                //票号数组
                ticketnumber:'',
                //当下a 的值 用来在乘机人与票号相互验证中的操作用
                a:0,
                //a的总长度
                a_total:'',
                atotalobj:{},
                //pnr的axios后获取的值


                bigPnrNum:'',    //大编

                // orderticket.newSmartPnr:'', //新小编
                // orderticket.newBigPnr:'',//新大编
                str:'', //换共享航班后接受到的数据
                conversionPnrData:'',//换编码后得到的数据
                showarr:"",
                showarrflag:false,
                arrTime:'',   //起飞时间
                arrTime02:'',  //达到时间
                //B2B政策相关
                B2Barr:'',

                //转锁相关
                passengerListflag:false,  //此passengerList与下面的不是同一个东西，他代表公司客服，出票的员工
                passengerListflag02:false,
                workerlist:'',        //转锁时候用到的工人人员变量

                manualselectobj:'',
                namelist: '',
                messageValue : [],
                //重新获取b2b政策旁边的input的值
                officeBelow:'csx107',

                tickObjFlag:true,
                //拒绝出票弹窗开关
                refuseflag:false,
                //拒绝出票原因文本填写内容
                refusetext:'',
                //动画开关
                animaflag:false,
                //    b2b账户
                b2b:null,
                //    改航班号/舱位开关
                sharePositionFlag:false,
                //    改航班号字体颜色
                classRed:true,
                classGrey:true,
                //    获取供应商价格表格的表格
                Ordprice:null,
                //    平台价格table开关
                priceDivFlag:false,
            }
        },
        watch:{
            //用于监视出票类型改动，当出票类型改动时候，动态变换dom
            // manua:function () {
            //     if (this.manua=='B2B'||this.manua=='官网'){
            //         this.B2B = true;
            //         this.BSP = this.OP = this.BOP = false;
            //     }else if(this.manua=='BSP'){
            //         this.B2B = this.OP = this.BOP = false;
            //         this.BSP = true;
            //     }else if(this.manua=='OP'){
            //         this.BSP = this.B2B = this.BOP = false;
            //         this.OP = true;
            //     }else if(this.manua=='BOP'){
            //         this.B2B = this.BSP = this.OP = false;
            //         this.BOP = true;
            //     }
            // }
        },
        computed:{},
        methods:{
            //当操作人员经过一系列操作，填入大量数据，拿到这些数据在发起ajax的时候传给后台
            domlist:function(){
                // var artificialMust = document.getElementsByClassName('artificialMust');
                var manualselect = document.getElementsByClassName('manualselect');

                var manualselectarry = []; //此数组与对象就在此函数内使用 避免污染全局 仅仅为了传值
                this.manualselectobj = {};
                this.manualselectobj.orderid = this.loca;

                //将购买信息值填入数组中，方便待会传入，避免多次dom查询
                for(var b=0;b<manualselect.length;b++){
                    manualselectarry.push(manualselect[b].value)
                }

                if(manualselect[1].value == 'B2B'|| manualselect[1].value == '官网'){
                    //最上面的office号
                    this.manualselectobj.officeAbove = manualselect[0].value;
                    //出票类型
                    this.manualselectobj.ticketObject  = manualselect[1].value;
                    //采购科目
                    this.manualselectobj.paySubjects = manualselect[2].value;
                    //采购账号
                    this.manualselectobj.buy = manualselect[3].value;
                    //点数采购金额
                    this.manualselectobj.cash = manualselect[4].value;
                    //备注
                    this.manualselectobj.orderMarkes = manualselect[5].value;
                    //支付流水号
                    this.manualselectobj.payNumber = manualselect[6].value;
                    //重获B2B政策的Office号
                    this.manualselectobj.officeBelow = this.officeBelow;
                    this.manualselectobj.table = '';
                    this.manualselectobj.order = '';
                }else if(manualselect[1].value == 'BSP'){
                    this.manualselectobj.officeAbove = manualselect[0].value;
                    this.manualselectobj.ticketObject = manualselect[1].value;
                    this.manualselectobj.officeBelow = this.officeBelow;
                    this.manualselectobj.orderMarkes = manualselect[4].value;
                    this.manualselectobj.payNumber = manualselect[5].value;

                    this.manualselectobj.paySubjects = '';
                    this.manualselectobj.buy = '';

                    this.manualselectobj.cash = manualselect[3].value;

                    this.manualselectobj.table = '';
                    this.manualselectobj.order = '';
                }else if(manualselect[1].value == 'OP'){
                    this.manualselectobj.officeAbove = manualselect[0].value;
                    this.manualselectobj.ticketObject  = manualselect[1].value;
                    this.manualselectobj.table = manualselect[2].value;
                    this.manualselectobj.order = manualselect[3].value;
                    this.manualselectobj.paySubjects = manualselect[4].value;
                    this.manualselectobj.buy = manualselect[5].value;

                    this.manualselectobj.cash = manualselect[6].value;
                    this.manualselectobj.orderMarkes = manualselect[7].value;
                    this.manualselectobj.payNumber = manualselect[8].value;
                    this.manualselectobj.officeBelow = this.officeBelow;
                }else if(manualselect[1].value == 'BOP'){
                    this.manualselectobj.officeAbove = manualselect[0].value;
                    this.manualselectobj.ticketObject  = manualselect[1].value;
                    this.manualselectobj.paySubjects = manualselect[2].value;
                    this.manualselectobj.orderMarkes = manualselect[4].value;
                    this.manualselectobj.payNumber = manualselect[5].value;

                    this.manualselectobj.buy = '';
                    this.manualselectobj.cash = manualselect[3].value;
                    this.manualselectobj.table = '';
                    this.manualselectobj.order = '';
                    this.manualselectobj.officeBelow = this.officeBelow;
                }
                //将乘客信息填入数组中
                for(var c=0;c<this.numlength;c++){
                    var iddom = document.getElementById('d'+[c])
                    this.passengerList[c].licenseNumber = (iddom.getElementsByClassName('datamessage')[0].value)
                    this.passengerList[c].birthday = (iddom.getElementsByClassName('datamessage')[1].value)
                    this.passengerList[c].ticketNum = (iddom.getElementsByClassName('datamessage')[2].value)
                    this.passengerList[c].price = (iddom.getElementsByClassName('datamessage')[3].value)
                    this.passengerList[c].infrastructure = (iddom.getElementsByClassName('datamessage')[4].value)
                }
            },
            //手工出票中 支付科目的ajax动态获取采购账号
            manualObject:function(paySubjects){
                // this.tickObjFlag = !this.tickObjFlag;
                // if(this.tickObjFlag){
                //     var paySubjects = event.target.value
                this.$axios({
                    method:'post',
                    url:'../ticket/manual.php?action=account_number',
                    data:{
                        paySubjects,
                        orderid:this.loca
                    }
                }).then((response)=>{
                    this.buy = response.data.list;
                }).catch((error)=>{
                    console.log(error)
                })
                // }
            },
            //手工出票中出票类型的ajax请求 动态获取采购科目
            manualselect:function (ticketObject) {
                //this.manua 为监听值，作用与dom更换，例如B2B BSP对应的dom不同
                this.manua = ticketObject;
                if(ticketObject=="官网"){
                    doo = 'B2B'
                }
                if(ticketObject == 'B2B' || ticketObject == 'OP'){
                    this.$axios({
                        method:'post',
                        url:'../ticket/manual.php?action=type',
                        data:{
                            ticketObject,
                            orderid:this.loca
                        }
                    }).then((response)=>{
                        if(response.data.buy){
                            this.buy = response.data.buy;
                            this.buyName = response.data.buyName
                        }
                        this.paySubjects = response.data.paySubjects;
                        this.buy = response.data.buy;
                    }).catch((error)=>{
                        console.log(error)
                    })
                }
                // }
            },
            //保存并返回
            saveReturn:function(a){
                this.domlist();
                this.officeAboveFun();
                this.officeBelowFun();
                //大编
                this.manualselectobj.bigNumber = this.bigPnrNum;
                //新大编
                this.manualselectobj.big = this.orderticket.newBigPnr;
                //小编
                this.manualselectobj.smartNumber = this.orderticket.smartPnr;
                //新小编
                this.manualselectobj.smart = this.orderticket.newSmartPnr;
                this.$axios({
                    url:'/ticket/manual.php?action=save_return',
                    method:'post',
                    data:{
                        passengerList: this.passengerList,
                        manualselectobj:this.manualselectobj,
                        orderid:this.loca,
                        all:this.all
                    }
                }).then((response)=>{
                    if(response.data=='保存成功'){
                        //a传入 意味着是转锁按钮在调动函数，转锁已有跳转，此出不许重复跳
                        if(!a){
                            this.$router.go(-1)
                        }
                    }
                }).catch((error)=>{
                    console.log(error)
                })
            },
            //解锁并返回
            unlockreturn:function(){
                var orderid = [];
                orderid.push(this.loca)
                this.$axios({
                    url:'../bingo/ticking.php?action=locking',
                    method:'post',
                    data:{
                        orderid,
                        lockorder:'no',
                    }
                }).then((response)=>{
                    if(response.data.res == 'success'){
                        this.$router.go(-1)
                        // window.location.href='../template/artificialnew.html'
                    }else{
                        alert('解锁失败!')
                    }
                }).catch((error)=>{
                    console.log(error)
                });
            },
            //~~~~~~拒绝出票弹窗相关函数~~~~~~
            //拒绝出票
            refuse:function(){
                let flag = window.confirm('是否确定拒绝？')
                if(flag){
                    this.refuseflag = true;
                }
            },
            //拒绝出票开启后的确定按钮（传输拒绝出票的文本值给后台）
            surerefuse:function(text){
                this.manualselectobj = {};
                this.manualselectobj.orderid = this.loca;
                //
                // this.$axios.interceptors.response.use(()=>{
                //     window.location.href='../template/artificialnew.html'
                // })
                this.$axios({
                    url:'../ticket/manual.php?action=refuse',
                    method:'post',
                    data:{
                        manualselectobj:this.manualselectobj,
                        orderid:this.loca,
                        orderMarkes:text,
                        all:this.all
                    }
                }).then((response)=>{
                    this.$router.go(-1)
                    // window.location.href='../template/artificialnew.html'
                }).catch((error)=>{
                    console.log(error)
                })
                // this.$axios({
                //     url:'../bingo/out_detail.php?action=refuse',
                //     method:'post',
                //     data:{
                //         manualselectobj:this.manualselectobj,
                //         orderid:this.loca,
                //         orderMarkes:text,
                //         all:this.all
                //     }
                // }).then((response)=>{
                //     window.location.href='../bingo/tp_list.php?t=tp_list'
                // }).catch((error)=>{
                //     console.log(error)
                // })
            },
            //拒绝出票弹窗显隐开关
            refusewindow:function () {
                this.refuseflag = !this.refuseflag
            },
            //~~~~~~日志相关函数~~~~~~
            //日志开启开关
            orderShow:function(){
                this.logObj.logflag = true;
                this.$axios({
                    url:'../bingo/ticking.php?action=log',
                    method:'post',
                    data:{
                        orderid:this.loca
                    }
                }).then((response)=>{
                    this.logObj.logar = response.data.list;
                }).catch((error)=>{
                    console.log(error)
                })
            },
            //日志内部关闭日志按钮
            logfun:function(){
                this.logObj.logflag = false
            },
            //改航班号和舱位
            changeFlightPosition(id){
                // console.log(this.sharePositionFlag)
                // console.log(id)
                // this.sharePositionFlag = this.flight[0].id;
                this.sharePositionFlag = id;
                // console.log(this.flight[0].id)
            },
            //关闭改航班号舱位按钮
            closeFlightAndPosition(){
                this.changFlightPositionObj.flag = false;
                // this.changeFlightAndPosition = [];
            },
            //点击审核订单按钮，在该逻辑下拿到所有后台需要的值
            //强制回填 同时也是强制回填的function 根据flag值，1为审核2为回填
            shenhe:function (flag) {
                this.domlist()
                var artificialMust = document.getElementsByClassName('artificialMust');
                this.officeAboveFun();
                this.officeBelowFun();
                for(var a=0;a<artificialMust.length;a++){
                    if(!!artificialMust[a].value){

                    }else{
                        alert('必填项不能为空')
                        return
                    }
                };
                //大编
                this.manualselectobj.bigNumber = this.bigPnrNum;
                //新大编
                this.manualselectobj.big = this.orderticket.newBigPnr;
                //小编
                this.manualselectobj.smartNumber = this.orderticket.smartPnr;
                //新小编
                this.manualselectobj.smart = this.orderticket.newSmartPnr;
                this.$axios({
                    url:'../ticket/manual.php?action=saveTicket',
                    method:'post',
                    data:{
                        passengerList: this.passengerList,
                        manualselectobj:this.manualselectobj,
                        orderid:this.loca,
                        flag,
                        all:this.all
                    }
                }).then((res)=>{
                    if(res.data=='审核成功'){
                        this.$router.go(-1)
                        // window.location.href='../template/artificialnew.html'
                    }else{
                        alert('票号校验失败')
                    }
                }).catch((error)=>{
                    console.log(error)
                })
            },
            //转锁功能
            changelock:function () {
                this.passengerListflag02 = !this.passengerListflag02;
                this.passengerListflag = false;
                if(this.passengerListflag02){
                    this.$axios({
                        url:'../ticket/manual.php?action=name_list',
                        method:'get',
                    }).then((respon)=>{
                        this.passengerListflag = true;
                        this.workerlist = respon.data.passengerList
                    }).catch((error)=>{
                        console.log(error)
                    })
                }
            },
            //确定转锁
            change:function () {
                var nameva = document.getElementsByClassName('workerlist')[0].value;
                this.saveReturn(1);
                this.$axios({
                    url:'../ticket/manual.php?action=change',
                    method:'post',
                    data:{
                        name:nameva,
                        id:this.loca,
                        remakes:this.order_ticketing.orderMarkes
                    }
                }).then((respon)=>{
                    if(respon.data.res == "转单成功"){
                        this.passengerListflag02 = !this.passengerListflag02;
                        this.passengerListflag = false;
                        // window.location.href='../template/artificialnew.html'
                        this.$router.go(-1)

                    }else if(respon.data.data == "!转单失败"){
                        alert("转单失败！")
                    }
                }).catch((error)=>{
                    console.log(error)
                })
            },
            //返回按钮直接返回到展示数据页面
            fanhui:function () {
                this.$router.go(-1)
                // window.location.href='../template/artificialnew.html'
            },
            //rt编码获取票号
            //编码后要与已存在的身份证一一对应，所以需要使用三元表达式传入dom节点的身份证号，不然想不出怎么传身份证，对应则将对应的编码输入。
            //当拿到rt后 想改rt 使用blur来改变data中数据
            //如果自己输入值也要渲染data,还是使用blur
            rtfun:function(){
                let smartNumber = undefined;
                if(!this.orderticket.newSmartPnr){
                    smartNumber = this.orderticket.smartPnr;
                }else{
                    smartNumber = this.orderticket.newSmartPnr;
                }
                this.$axios({
                    url:'common/OrderHandle/ticketNumber',
                    method:'post',
                    data:{
                        pnr:smartNumber, //this.flight.smartNumber,
                        // pnr:'HMYR69', //this.flight.smartNumber  'KRVTL6',
                        type:this.orderticket.officeAbove,
                        orderid:this.orderid,
                    }
                }).then((response)=>{
                    console.log(this.passengerList)

                    if(!response.data.code){
                        let listobj = response.data.data.passengers;
                        let leng = this.passengerList.length;
                        //第一个for循环循环拿出票号
                        for(let b=0;b<listobj.length;b++){
                            //第二个for循环循环拿出list（即原始乘客信息）
                            for(let a=0;a<leng;a++){
                                if(this.passengerList[a].name == listobj[b].Name){
                                    this.$set(this.passengerList[b],'ticketNum',listobj[a].Ticket);
                                    break
                                }else{
                                    this.$set(this.passengerList[b],'ticketNum','没有票号');
                                }
                            }
                        }
                    }else {
                        this.$Message['error']({
                            background: true,
                            closable: true,
                            duration: 0,
                            content: response.data.msg
                        });
                        // alert(response.data.msg)
                    }
                }).catch((error)=>{
                    console.log(error)
                })
            },
            //pnr按钮
            pnr:function (num) {
                let pnr = undefined;
                //根据num的传值不同有小编和新小编 并且显示pnr窗
                if(num == 1){
                    pnr = this.orderticket.smartPnr
                }else if(num ==2){
                    pnr = this.orderticket.newSmartPnr;
                }
                if(pnr){
                    this.$axios({
                        method:'post',
                        url:'common/OrderHandle/pnrButton',
                        data:{
                            pnr,
                            orderid:this.orderid,
                            type:this.orderticket.officeAbove
                        }
                    }).then((response)=>{
                        if(!response.data.code){
                            if(response.data.data.pat.ret_value){
                                this.pat = response.data.data.pat;
                            }else{
                                this.pat.cnyf = response.data.data.pat.content
                            }
                            this.pnrValue = response.data.data.rt;
                            this.pngFlag = true;
                        }else {
                            this.pnrValue = '该编码不存在';
                            this.pngFlag = false
                        }
                    }).catch((error)=>{
                        console.log(error);
                    })
                }else{
                    alert('请输出正确的值')
                }
            },
            //pnr按钮弹出弹窗后。该函数用与关闭弹窗
            pnrFlagFun:function(){
                this.pngFlag = false;
            },
            //大编的获取
            bigPnr:function () {
                let smartNumber = undefined;
                if(this.orderticket.newSmartPnr){
                    smartNumber =  this.orderticket.newSmartPnr;
                }else{
                    smartNumber =  this.orderticket.smartPnr;
                }
                this.$axios({
                    method:'post',
                    url:'common/OrderHandle/getBigPnr',
                    data:{
                        pnr:smartNumber,
                        orderid:this.orderid,
                        type:this.orderticket.officeAbove
                    }
                }).then((response)=>{
                    if(!response.data.code){
                        //当新大编在 旧大编不在 or 两个都在
                        this.orderticket.bigPnr = response.data.data;
                        this.orderticket.newBigPnr = response.data.data;
                    }else{
                        alert(response.data.msg)
                    }
                }).catch((error)=>{
                    console.log(error)
                })
            },
            //保存编码
            savepnr:function(a,b,c,d){
                //orderticket.smartPnr,bigPnrNum,orderticket.newSmartPnr,orderticket.newBigPnr
                //big新大编 smart新小编
                this.$axios({
                    url:'common/OrderHandle/savePnr',
                    method:'post',
                    data:{
                        orderid:this.orderid,
                        bigPnr:this.orderticket.bigPnr,
                        smartPnr:this.orderticket.smartPnr,
                        newBigPnr:this.orderticket.newBigPnr,
                        newSmartPnr:this.orderticket.newSmartPnr
                    }
                }).then((response)=>{
                    if(!response.data.code){
                        alert('保存成功')
                    }
                }).catch((error)=>{
                    console.log(error)
                })
            },
            //换编码文本函数(用来显示换编码文本框)
            changeNumText(){
                //开启弹窗
                this.changeTextObj.changeTextFlag = true;
                //获取订单中起飞时间 time05只在函数中做周转用
                // let time04 = this.flight.flyTime;
                let time05 = (new Date(this.flight[0].dptTime)+'');
                time05 = time05.split(/\s{1,}/);
                //time06是ss信息栏出发时间信息
                let time06 = time05[2]+''+time05[1];
                this.flight[0].time06 = time06;

                // this.flight.time01 = time04.substr(time04.lastIndexOf('-')+1,2);
                for(let a=0,leng=this.passengerList.length;a<leng;a++){
                    this.passengerList[a].airCompany = this.flight.airCompany;
                };
                //time02只在此函数内做赋值使用
                let time02 = new Date((new Date().getTime()+(2*60*60*1000)));
                // let a = time02.getHours();
                // let b = time02.getMinutes();
                // let c = time02.getMonth()+1;
                // console.log(a,b,c)
                time02 = time02+'';
                time02 = time02.split(' ');
                time02[1] = time02[1].toUpperCase();
                //time03为当前时间加两小时
                let time03 = time02[4].split(':');
                time03 = time03[0]+''+time03[1]
                this.flight[0].time02 = time02[1];
                this.flight[0].time03 = time03;
                this.flight[0].time01 = time02[2]+''+time02[1];
                time02 = time03  = time05 = time06 = null;
            },
            closeChangeText(){
                this.changeTextObj.changeTextFlag = false;
            },
            //换共享航班函数
            changeShareFlight:function (orderid) {
                let arrdata = null;
                // 获取起飞到达时间
                let flytime = this.flight[0].flyTime;
                flytime = flytime.split(" ")[1];
                flytime = flytime.split(':');
                flytime = flytime[0]+flytime[1];
                let arrtime = this.flight[0].arrTime.split(" ")[1].split(':');
                arrtime = arrtime[0]+arrtime[1];

                let flight = this.flight[0].flight;

                this.$axios({
                    method:'post',
                    url:'../ticket/manual.php?action=select_aline',
                    data:{
                        orderid
                    }
                }).then(response=>{
                    if(response.data.airline){
                        arrdata = response.data.airline;
                        this.showarrflag = true;
                        this.showarr = [];

                        if(arrdata instanceof Array){
                            //在ariline为数组情况下 获取主飞舱位
                            let leng = arrdata.length;
                            let shareLine = null;
                            for(let i=0;i<leng;i++){
                                let line = arrdata[i]["@attributes"].line_number.replace(/\*/g,"");
                                if(line === flight){
                                    shareLine = arrdata[i]["@attributes"].share_line;
                                    let bsobj = null;
                                    let position = [];
                                    let positionObj = arrdata[i].c;
                                    for(let a=0;a<positionObj.length;a++){
                                        let b = positionObj[a]["@attributes"].b;
                                        let s = positionObj[a]["@attributes"].s;
                                        bsobj = {b,s};
                                        position.push(bsobj);
                                        b = s = null;
                                    };
                                    positionObj = {
                                        flight:arrdata[i]["@attributes"].line_number,
                                        position,
                                        oldFlight:flight,
                                        stime:arrdata[i]["@attributes"].stime,
                                        atime:arrdata[i]["@attributes"].atime,
                                        shareLine:arrdata[i]["@attributes"].share_line
                                    };
                                    this.showarr.push(JSON.parse(JSON.stringify(positionObj)))
                                }
                                line = null;
                            }
                            for(let i=0;i<leng;i++){
                                if(arrdata[i]["@attributes"].line_number == shareLine){
                                    let bsobj = null;
                                    let position = [];
                                    let positionObj = arrdata[i].c;
                                    for(let a=0;a<positionObj.length;a++){
                                        let b = positionObj[a]["@attributes"].b;
                                        let s = positionObj[a]["@attributes"].s;
                                        bsobj = {b,s};
                                        position.push(bsobj);
                                        b = s = null;
                                    };
                                    // this.showarr.push(arrdata[i]);
                                    positionObj = {
                                        flight:arrdata[i]["@attributes"].line_number,
                                        position,
                                        oldFlight:flight,
                                        stime:arrdata[i]["@attributes"].stime,
                                        atime:arrdata[i]["@attributes"].atime,
                                        shareLine:arrdata[i]["@attributes"].share_line
                                    };
                                    this.showarr.push(JSON.parse(JSON.stringify(positionObj)))
                                    // positionObj= position = null
                                }
                                /*if(arrdata[i]["@attributes"].stime === flytime&&arrdata[i]["@attributes"].atime === arrtime){
                                    if(arrdata[i].c.length){

                                    }else{

                                    }
                                }*/
                            }
                        }else{
                            //    airline不为数组情况下
                            let leng = arrdata.c.length;
                            let bsobj = null;
                            let position = [];
                            let positionObj = null;
                            for(let a=0;a<leng;a++){
                                let b = arrdata.c[a]["@attributes"].b;
                                let s = arrdata.c[a]["@attributes"].s;
                                bsobj = {b,s};
                                position.push(bsobj);
                                b = s = null;
                            };
                            positionObj = {
                                flight,
                                position,
                                oldFlight:flight,
                                stime:arrdata["@attributes"].stime,
                                atime:arrdata["@attributes"].atime,
                                shareLine:arrdata["@attributes"].share_line
                            };
                            this.showarr.push(JSON.parse(JSON.stringify(positionObj)))

                            line = null;

                        }
                    }else{
                        alert('没有获取到相关航班数据')
                    }
                }).catch(error=>{
                    console.log(error)
                })
                // flight

                var manualselect = document.getElementsByClassName('manualselect')[0]; //获得107还是513
                this.officeAboveFun();
                /*this.$axios({
                    method:'post',
                    url:'../ticket/manual.php?action=shared_flight',
                    data:{
                        orderid:this.loca,
                        officeAbove:manualselect.value
                    }
                }).then((response)=>{
                    // console.log(response)
                    if(response.data){
                        this.showarrflag = true;
                        let shareStr = response.data;

                        let arr03 = [];

                        shareStr = shareStr.replace(/"/g,''); //删除带过来的 “ 号
                        let strA = shareStr.split(/\\r\\n\s*[1-9]/g); //将分后的值再细分为数组

                        // console.log(strA)
                        // console.log(arrtime)
                        for(var a=1;a<strA.length;a++){
                            if(strA[a].search(flytime)!=-1){
                                if(strA[a].search(arrtime)!=-1){
                                    let f = strA[a].includes('**');
                                    if(f){
                                        let ff = strA[a].split(/\\r\\n\s*\*{2}/)[0]; //去除**
                                        //把真正需要的那一层放入到原str的位置
                                        strA.splice(a,1,ff)
                                    }
                                    let s = strA[a].split(/\\r\\n\s*\(\s*!/g);
                                    arr03.push(s);
                                }
                            }
                        }
                        arr03.forEach((va,index)=>{
                            va.forEach((val,index)=>{
                                va.splice(index,1,val.replace(/(^[^0-9a-zA-Z]*)|([^0-9a-zA-Z]*$)|(\\r\\n)/g,""));
                            })
                        })
                        arr03.forEach((va,ind)=>{
                            va.forEach((val,index)=>{
                                arr03[ind][index] = (val.split(' '))
                            })
                        })
                        this.showarr = arr03;
                        // console.log(this.showarr)
                    }
                }).catch((error)=>{
                    console.log(error)
                })*/
                this.officeAboveFun()
            },
            //关闭共享航班的展示窗
            closeshowarr:function(){
                this.showarrflag = false;
            },
            //换编码函数
            conversionPnr:function () {
                this.$axios({
                    method:'post',
                    url:'common/OrderHandle/conversionPnr',
                    data:{
                        orderId:this.orderid,
                        type:this.orderticket.officeAbove
                    }
                }).then((response)=>{
                    //与后台请求是否成功
                    if(!response.data.code){
                        //后台于黑屏是否请求成功
                        if(!response.data.data.code){
                            //黑屏连接成功，业务处理是否成功
                            if(!(response.data.data.sd.result*1)){
                                //连接成功，业务处理失败，返回处理失败信息
                                alert(response.data.data.sd.errinfo);
                                return
                            }
                            this.orderticket.newSmartPnr = response.data.data.sd.ret.pnr
                        }else{
                            alert(response.data.data.msg)
                        }
                    }else{
                        alert(response.data.msg)
                    }
                }).catch((error)=>{
                    console.log(error)
                })
            },
            //获取B2B政策
            actionB2B:function () {
                let bigNumber = undefined;
                this.officeBelowFun()
                if(this.orderticket.newBigPnr){
                    bigNumber =  this.orderticket.newBigPnr;
                }else{
                    bigNumber =  this.bigPnrNum;
                }
                if(this.bigPnrNum == '此编码没有大编'){
                    alert('没有大编无法获取B2B政策')
                    return
                }else if(!bigNumber){
                    alert('请输入正确的大编');
                    return
                }else{
                    this.animaflag = true;
                    this.$axios({
                        url:'../ticket/manual.php?action=B2B',
                        method:'post',
                        data:{
                            orderid:this.loca,
                            bigNumber,
                            officeBelow:this.officeBelow
                        }}).then((response)=>{
                        this.animaflag = false;
                        if(response.data.code == 101){
                            alert(response.data.msg)
                        }else{
                            this.B2Barr = response.data.priceList;
                            for(let a=0;a<this.B2Barr.length;a++){
                                this.B2Barr[a].profit = calc.sub(this.flight.collection,this.B2Barr[a].payPrice)
                            }
                        }
                    }).catch((error)=>{
                        console.log(error)
                    })
                }
            },
            //记录officeAbove日志函数
            officeAboveFun:function(){
                this.$axios({
                    url:'../ticket/manual.php?action=officeAbove_coding',
                    method:'post',
                    data:{
                        orderid:this.loca,
                        officeAbove:this.order_ticketing.officeAbove
                    }
                }).then((response)=>{
                }).catch((error)=>{
                    console.log(error)
                })
            },
            //记录officeBelow日志函数
            officeBelowFun:function(){
                this.$axios({
                    url:'../ticket/manual.php?action=officeBelow_coding',
                    method:'post',
                    data:{
                        orderid:this.loca,
                        officeBelow:this.officeBelow
                    }
                }).then((response)=>{
                }).catch((error)=>{
                    console.log(error)
                })
            },
            radiofun:function(ind){
                this.radioinde = ind;
                let B2Bchooser = document.getElementsByClassName('B2Bchooser');
                for(let a=0,leng=B2Bchooser.length;a<leng;a++){
                    B2Bchooser[a].style.backgroundColor = 'transparent';
                };
                B2Bchooser[ind].style.backgroundColor = '#C5EEFC';
            },

            /*此处后面的支付按钮在支付方式增多后应给予多态函数，但此时支付不多，暂时先做单独函数*/
            //易宝购买开关
            b2bpay:function () {
                let bigNumber = undefined;
                this.officeAboveFun();
                this.officeBelowFun();
                if(this.orderticket.newBigPnr){
                    bigNumber =  this.orderticket.newBigPnr;
                }else{
                    bigNumber =  this.bigPnrNum;
                }
                this.animaflag = true;
                let ticketPar = '';
                let tax = '';
                let payPrice = '';
                let reBates = '';
                if(typeof this.radioinde=='number'){
                    ticketPar = this.B2Barr[this.radioinde].ticketPar;
                    tax = this.B2Barr[this.radioinde].tax;
                    payPrice = this.B2Barr[this.radioinde].payPrice;
                    reBates = this.B2Barr[this.radioinde].rebates;
                }else{
                    // let ticketPar = '';
                    // let tax = '';
                    // let payPrice = '';
                    // let reBates = '';
                }
                // this.$axios.interceptors.response.use((response)=>{
                //     window.location.href='../bingo/ticking.php?t=order'
                // });
                this.$axios({
                    url:'../ticket/manual.php?action=pay', //
                    method:'post',
                    data:{
                        orderid:this.loca,
                        //大编
                        bigNumber:this.bigPnrNum,
                        //新大编
                        big:this.orderticket.newBigPnr,
                        //小编
                        smartNumber:this.orderticket.smartPnr,
                        //新小编
                        smart:this.orderticket.newSmartPnr,
                        ticketPar,
                        tax,
                        payPrice,
                        reBates,
                        officeBelow:this.officeBelow,
                        officeAbove:this.order_ticketing.officeAbove,
                    }}).then((response)=>{
                    this.animaflag = false;
                    if(response.data=='支付成功'){
                        // window.location.href='../template/artificialnew.html'
                        this.$router.go(-1);
                    }else if(response.data === null){
                        alert('大编已失效')
                    }
                }).catch((error)=>{
                    console.log(error)
                })
            },
            //    票速通
            ticketSpeedThrough(){
                let bigNumber = undefined;
                this.animaflag = true;
                // let ticketPar = this.B2Barr[this.radioinde].ticketPar;
                // let tax = this.B2Barr[this.radioinde].tax;
                // let payPrice = this.B2Barr[this.radioinde].payPrice;
                // let reBates = this.B2Barr[this.radioinde].rebates;
                // this.$axios.interceptors.response.use((response)=>{
                //     window.location.href='../bingo/ticking.php?t=order'
                // });
                let ticketPar = '';
                let tax = '';
                let payPrice = '';
                let reBates = '';
                if(typeof this.radioinde=='number') {
                    ticketPar = this.B2Barr[this.radioinde].ticketPar;
                    tax = this.B2Barr[this.radioinde].tax;
                    payPrice = this.B2Barr[this.radioinde].payPrice;
                    reBates = this.B2Barr[this.radioinde].rebates;
                }
                this.officeAboveFun();
                this.officeBelowFun();
                this.$axios({
                    url:'../ticket/manual.php?action=depay',
                    method:'post',
                    data:{
                        orderid:this.loca,
                        //大编
                        bigNumber : this.bigPnrNum,
                        //新大编
                        big:this.orderticket.newBigPnr,
                        //小编
                        smartNumber:this.orderticket.smartPnr,
                        //新小编
                        smart:this.orderticket.newSmartPnr,
                        ticketPar,
                        tax,
                        payPrice,
                        reBates,
                        officeBelow:this.officeBelow,
                        officeAbove:this.order_ticketing.officeAbove,
                    }}).then((response)=>{
                    this.animaflag = false;
                    if(response.data=='支付成功'){
                        // window.location.href='../template/artificialnew.html'
                        this.$router.go(-1)
                    }else if(response.data === null){
                        alert('大编已失效')
                    }
                }).catch((error)=>{
                    console.log(error)
                })
            },
            //    东海支付按钮
            eastSeaFun(){
                let bigNumber = undefined;
                this.animaflag = true;
                // let ticketPar = this.B2Barr[this.radioinde].ticketPar;
                // let tax = this.B2Barr[this.radioinde].tax;
                // let payPrice = this.B2Barr[this.radioinde].payPrice;
                // let reBates = this.B2Barr[this.radioinde].rebates;
                // this.$axios.interceptors.response.use((response)=>{
                //     window.location.href='../bingo/ticking.php?t=order'
                // });
                let ticketPar = '';
                let tax = '';
                let payPrice = '';
                let reBates = '';
                if(typeof this.radioinde=='number') {
                    ticketPar = this.B2Barr[this.radioinde].ticketPar;
                    tax = this.B2Barr[this.radioinde].tax;
                    payPrice = this.B2Barr[this.radioinde].payPrice;
                    reBates = this.B2Barr[this.radioinde].rebates;
                }
                this.officeAboveFun();
                this.officeBelowFun();
                this.$axios({
                    url:'../ticket/manual.php?action=predeposit_pay',
                    method:'post',
                    data:{
                        order_id:this.loca,
                        //大编
                        bigNumber : this.bigPnrNum,
                        //新大编
                        big:this.orderticket.newBigPnr,
                        //小编
                        smartNumber:this.orderticket.smartPnr,
                        //新小编
                        smart:this.orderticket.newSmartPnr,
                        ticketPar,
                        tax,
                        payPrice,
                        reBates,
                        officeBelow:this.officeBelow,
                        officeAbove:this.order_ticketing.officeAbove,
                    }}).then((response)=>{
                    this.animaflag = false;
                    if(response.data=='支付成功'){
                        // window.location.href='../template/artificialnew.html'
                        this.$router.go(-1)
                    }else if(response.data === null){
                        alert('大编已失效')
                    }
                }).catch((error)=>{
                    console.log(error)
                })
            },
            //    获取平台f价格
            gerPriceFun(){
                this.$axios({
                    url:'../ticket/manual.php?action=searchflight',
                    method:'post',
                    data:{
                        order_id:this.loca,
                    }
                }).then(res=>{
                    this.Ordprice = res.data
                    this.priceDivFlag = true;
                }).catch(err=>{console.log(err)})
            },
            //获取平台价格后 展示弹窗和价格 用户选择传给后台
            sendPriceFun(num,price,index,totalPrice){
                //基建和燃油
                let a = this.Ordprice[index].result.arf;
                let b = this.Ordprice[index].result.tof;
                //总收款
                let c = this.flight.collection*1;
                //乘机人长度（人数）
                let d = this.passengerList.length;
                //总价为 barePrice+基建+燃油再乘以人数
                let ee = calc.add(calc.add(price,a),b)*d
                //总收款减去总价 为 利润
                let e = calc.sub(c,(calc.add(calc.add(price,a),b)*d));
                //此单的id
                this.Ordprice[index].order_id = this.loca;
                let f = this.Ordprice[index].result.vendors[num];
                //拷贝后再赋值，点击确定后需要改Ordprice对象属性，此时弹窗没有关闭，属性改变会导致渲染错误
                //也可以用v-once渲染一次来解决
                let g = JSON.parse(JSON.stringify(this.Ordprice[index]))
                g.totalPrice = totalPrice;
                let that = this;
                g.result.vendors = f;
                this.$Modal.confirm({
                    width:"300",
                    okText:'确定支付',
                    onOk(){
                        this.$axios({
                            url:"../ticket/manual.php?action=bk",
                            method:"post",
                            data:g,
                        }).then(res=>{
                            if(!res.data.code){
                                this.$router.go(-1);
                            }else{
                                that.order_ticketing.orderMarkes = res.data.message;
                                // return this.$Message.warning({content:res.data.msg,duration: 5});
                            }
                        }).catch(err=>{console.log(err)})
                    },
                    render: (h) => {
                        return h('div',{},[h('div',{
                            domProps:{
                                innerHTML:"总采购价格为："+ee
                            },
                        }),h('div',{
                            domProps:{
                                innerHTML:"利润为："+e
                            },
                        })])
                    }
                })
            }
        },
        created(){
            this.orderid = this.$route.params.id;
            if(this.orderid==null){
                alert('地址错误');
                return
            }
            this.$axios({
                url:'common/OrderHandle/dealWith',
                method:'post',
                data:{
                    orderId:this.orderid,
                }
            }).then((response)=>{
                if(response.data.code!=200){
                    //乘客信息
                    // this.passengerList = response.data.data.order;
                    //该订单的整体信息
                    // this.flight = response.data.list;
                    //存放操作人员保存的信息 包括备注 大小编码等等
                    // this.orderticketing = response.data.order_ticketing;
                    //给往返航班信息添加订单来源等前四个数据
                    console.log(response.data.data)
                    //此出转为数组，为方便v-for渲染，同时恰好可做index 1 为往返的表格
                    //航程信息 联系人信息
                    this.flight[0] = response.data.data.order;
                    //~~~~~~~~~~~~~~~大小编等数据载体 出票类型数据~~~~~~~~~~~~~~~~~~~~~~
                    //解析数据 并做数据分类 方便v-model
                    this.orderticket = response.data.data.orderticket;
                    this.paySubjects = response.data.data.purchase;
                    switch (this.orderticket.ticketObject) {
                        case 'B2B'||'官网':
                            this.B2B.payAccountChecked = this.orderticket.buyUsername;
                            this.B2B.paySubjectsChecked = this.orderticket.paySubjects;
                            this.B2B.cash = this.orderticket.cash;
                            break;
                        case 'BSP':
                            this.BSP.officeNumber = this.orderticket.officeBelow;
                            this.B2B.cash = this.orderticket.cash;
                            break;
                        case 'OP':
                            this.OP.purchaseTableChecked = this.orderticket.table;
                            this.OP.purchaseOrder = this.orderticket.order;
                            this.OP.paySubjectsChecked = this.orderticket.paySubjects;
                            this.OP.payAccountChecked = this.orderticket.buyUsername;
                            this.OP.cash = this.orderticket.cash;
                            break;
                        case 'BOP':
                            this.B2B.bopPaySubjectsChecked = this.orderticket.paySubjects;
                            this.B2B.cash = this.orderticket.cash;
                            break;
                    };
                    //OP平台下拉数组
                    this.OP.purchaseTable = [];
                    //订单备注
                    this.orderMarks = this.orderticket.orderMarkes;
                    //支付流水号
                    this.payNumber = this.orderticket.payNumber;
                    //~~~~~~~~~~~~上述为出票类型相关解析数据~~~~~~~~~~~~~~~~~~~~~~

                    //B2B账户
                    this.b2bArray = response.data.data.b2b;
                    //~~~~~~~~~~~~~~乘机人信息列表~~~~~~~~~~~~~~~~~~~~~

                    this.passengerList = response.data.data.passengerList;
                    //此段代码解析乘机人信息，方便表格拼接 aabbcc分别为成人 儿童 婴儿
                    let aa = [];
                    let bb = [];
                    let cc = [];
                    for(let a=0;a<this.passengerList.length;a++){
                        if(this.passengerList[a].passengerType==1){
                            aa.push(this.passengerList[a]);
                        };
                        if(this.passengerList[a].passengerType==2){
                            bb.push(this.passengerList[a])
                        };
                        if(this.passengerList[a].passengerType==3){
                            cc.push(this.passengerList[a])
                        };
                    };
                    if(aa.length){
                        aa[0].passengerListType = aa.length;
                    }
                    if(bb.length){
                        bb[0].passengerListType = bb.length;
                    }
                    if(cc.length){
                        cc[0].passengerListType = cc.length;
                    }
                    this.passengerList = [...aa,...bb,...cc]
                    //~~~~~~~~~~~~~~~~解析乘机人信息代码结束~~~~~~~~~~~~


                    // flightcs[0].platformOrder = response.data.list.platformOrder;
                    // flightcs[0].policyCode = response.data.list.policyCode;
                    // flightcs[0].id = response.data.list.id;
                    // flightcs[0].ticketTable = response.data.list.ticketTable;
                    //
                    // this.flight = flightcs;

                    // this.bigPnrNum = response.data.order_ticketing.bigNumber;
                    // this.orderticket.smartPnr = response.data.list.smartNumber; //小编
                    // this.orderticket.newBigPnr = response.data.order_ticketing.big;//新大编
                    // this.orderticket.newSmartPnr = response.data.order_ticketing.smart; //新小编
                    //
                    // this.arrTime = response.data.list.flyTime;
                    // this.arrTime02 = response.data.list.arrTime;
                    // this.paySubjects = response.data.paySubjects;
                    // // console.log(this.paySubjects)
                    // this.buy = response.data.buy;
                    // this.numlength = response.data.passengerList.length;
                    //添加b2b账户的信息 用来for循环生成 并给定officeBelow的值
                    // this.b2b = response.data.b2b;
                    // for(let a=0,leng=this.b2b.length;a<leng;a++){
                    //     if(this.b2b[a]==='csx107'){
                    //         break
                    //     }else{
                    //         this.officeBelow = this.b2b[0]
                    //     }
                    // }
                    // if(response.data.order_ticketing){
                    //     this.buy = [];
                    //     this.buy.push(response.data.order_ticketing.buy);
                    //     for (let ind in response.data.order_ticketing){
                    //         if(!response.data.order_ticketing[ind]){
                    //             for(let index in this.order_ticketing){
                    //                 if(index===ind){
                    //                     response.data.order_ticketing[ind]= this.order_ticketing[index];
                    //                 }
                    //             }
                    //         }
                    //     }

                }else{
                    alert(response.data.msg)
                }
            }).catch((error)=>{
                console.log(error)
            })
        },
        // created(){
            // let l1 = location.href;
            // // let a = l1.match(/\=/g)
            // let see = l1.match(/see/g);
            // let server = l1.match(/server/g);
            // let all = l1.match(/all/g);
            //
            // if(see){
            //     this.clickshow  = true;
            // }else if(server){
            //     this.serverDom = true;
            // }else if(all){
            //     this.all = true;
            // }
            // l1 = see = server = all = null;

        // },
        beforeCreate(){

        }
    }
</script>

<style src="../../../assets/css/artificial_table.css" scoped>

</style>
<style scoped type="text/css">
    table{
        /*border: 1px silver solid;*/
    }
    .tableHead>tr>th{
        border: 1px #E7E7E7 solid;
    }
    .tableBody>tr>td{
        border: 1px #E7E7E7 solid;
    }
    /*失败原因样式（黄色板块）*/
    .alertWindow{
        margin: 20px 5px 20px;
        height: 40px;
        border: 1px #FAEBCC solid;
        background-color: #FCF8E3;
    }
    /*乘机人input样式*/
    .chooseinput{
        width: 90%;
        border: 1px solid white;
        cursor: pointer;
        text-align: center;
    }
    .chooseinput:hover{
        width: 90%;
        border: 1px solid #40a9ff;
    }
    /*游客模式*/
    .clickshow{
        pointer-events: none;
    }
    /*小编 大编 换编码 共享航班等等样式*/
    .conding{
        width: 1100px;
    }
    .conding>div{
        width: 350px;
        float: left;
    }
    .conding02{
        width: 1100px;
        margin-top: 10px;
    }
    .conding02>div{
        margin-top: 5px;
        width: 350px;
        float: left;
    }
    /*换共享航班三个一排的单独样式*/
    #butt{
        width: 300px;
        position: relative;
        top: -4px;
        left: 55px;
    }
    /*B2B BSP BOP账户相关样式*/
    .otherSubjects{
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: space-between;
    }
    .otherSubjects div:nth-of-type(1){
    }
    .otherSubjects div:last-child{
        color: green;
        margin-right: 50px;
    }
    .otherSubjects>div{
        /*float: left;*/
        margin: 10px 0 0 0px;
        /*margin-top: 15px;*/
    }
    /*按钮样式集合*/
    .xtbut{
        /*height: 30px;*/
        padding: 2px 7px 2px;
    }
    /*易宝等按钮那一排的父的样式*/
    .inputpay{
        display: flex;
        justify-content: space-around;
        /*margin-left: 10%;*/
        margin-top: 10px;
        flex-wrap:wrap;
        /*transform: translateX(-1%);*/
    }
    .inputpay>button{
        margin-bottom: 10px;
        /*transform: translateX(-1%);*/
    }
    /*选择出票类型，采购科目等操作按钮样式集合*/
    #manualOperation{
        margin: 10px 0px 0px 5px;
        /*width: 80%;*/
        display:inline-block
    }
    .manualgroup{
        position: relative;
        top: -30px;
        left: 200px;
    }
    #manualOperation>div:nth-of-type(3){
        position: relative;
        /*top: -20px;*/
    }
    /*最下方操作按钮*/
    .dealwith{
        margin-top: 10px;
        height: 300px;
        position: relative;
    }
    .dealwith>div{
        margin-top: 3px;
        margin-left: 20px;
        /*width: 120px;*/
        float: left;
    }
    /*换编码文本*/
    #changeText{
        position: fixed;
        top:40%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 400px;
        /*height: 300px;*/
        /*box-shadow: 1px 1px 10px 1px;*/
        background-color: black;
        opacity: 0.8;
        color: #4CD98C;
        font-size: 16px;
        /*z-index: 999;*/
    }
    /*pnr框样式*/
    .PNRtext{
        position: fixed;
        left:50%;
        top: 40%;
        background-color: white;
        transform: translate(-50%,-50%);
        box-shadow:0px 0px 10px 1px;
    }
    /*pnrtextarea文本框*/
    .pnrValue{
        height: 300px;
        width: 400px;
    }
    /*日志样式*/
    .log{
        z-index: 999;
        position: fixed;
        left:50%;
        top: 40%;
        background-color: white;
        transform: translate(-50%,-50%);
        box-shadow:0px 0px 10px 1px;
    }
    /*共享航班样式*/
    #showshare{
        position: fixed;
        top: 150px;
        left: 10%;
        width: 80%;
        height: auto;
        background-color: #87CEFA;
        opacity: 0.7;
        border : 0.5px solid #E5E5E5;
    }
    /*换共享航班舱位样式*/
    .sharePosition{
        position: fixed;
        top:50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 300px;
        height: 100px;
        padding: 4px;
        background-color: white;
        box-shadow: 0px 0px 5px 0px;
    }
    /*共享标红*/
    .classRed{
        color: #FF00FD;
    }
    .classGrey{
        color: grey;
    }
    /*.classGreen{
        color:green
    }*/
    /*必填项标红*/
    .col_red{
        color: red;
    }
    /*客服异常按钮进入时的模式*/
    .serverDom{
        pointer-events: none;
    }
    /*动画*/
    .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
</style>
<style scoped type="text/css">
    table{
        width: 100%;
    }
    .tablehover>tr:hover{
        background-color: #D5E7F1;
    }
    .passengerList{
        position: absolute;
        top: 50px;
        left: -20px;
    }
    .cancelclock{
        position: absolute;
        width: 20px;
        height: 20px;
        top: -15px;
        right: -45px;
        /*background-image: url("../images/font/cha02.png");*/
        background-repeat: no-repeat;
    }
    .sureclock{
        margin-top: 10px;
        margin-left: 8px;
    }
    /*诸多按钮样式*/
    .xtbutA{
        font-size: 14px;
        display: inline-block;
        margin-left: 8px;
        border: 0.5px solid #C3C3D6;
        background-color: #a0ccf8;
        color: #383d43;
        border-radius: 4px;
        padding: 4px 9px 4px 9px;
    }
    .xtbutB{
        font-size: 14px;
        display: inline-block;
        margin-left: 8px;
        border: 0.5px solid #C3C3D6;
        background-color: #CBE3FB;
        color: black;
        border-radius: 4px;
        padding: 4px 9px 4px 9px;
    }
    .xtbutB:hover{
        border: 0.5px solid #40a9ff;
        /*background-color: #00b7ee;*/
        /*color: #40a9ff;*/
    }
    .selectcss{
        height: 30px;
        font-size: 14px;
        display: inline-block;
        border: 0.5px solid #CBE3FB;
        /*background-color: #F3F6FB;*/
    }
    #refuse{
        position: fixed;
        top: 200px;
        left: 30%;
        background-color: white;
        width: 30%;
        height: 150px;
        border: 0.5px silver solid;
        box-shadow: 0px 1px 10px;
    }
    #refuse>textarea{
        width: 100%;
        height: 120px;
    }
    #refuse>button{
        margin-right: 15px;
        float: right;
    }
    [v-cloak]{
        display: none;
    }
    /*换航宝改舱位样式*/
    .changeFlightAndPosition{
        /*width: 200px;*/
        border:1px solid silver;
        background-color: white;
        height: 200px;
        position: fixed;
        left:50%;
        top: 60%;
        transform:translate(-50%,-50%)
    }
    .changeFlightAndPositionTest{
        transform:translate(-50%,-50%);
        background-color: black;
        /*z-index: 99;*/
        color: #4DDB94;
        overflow-y:scroll;
        font-size: 21px;
    }
    .anima{
        position: fixed;
        top: 40%;
        left: 45%;
    }
    /*缓冲动画修改*/
    .ivu-spin-fix{
        background-color: transparent;
    }
    /*.ivu-icon-ios-loading{font-size: 60px;}*/
    /*.ivu-icon{font-size: 60px;}*/
    /*获取其他平台价格表格*/
    .priceDiv{
        display: flex;
        justify-content: center;
        width: 70%;
    }
    /*.priceDiv>.pricetabHead{*/
    /*width: 70%;*/
    /*!*border:none;*!*/
    /*background-color: white;*/
    /*}*/
    /*.priceDiv>.pricetabBody{*/
    /*!*border:none;*!*/
    /*}*/
    .priceTab{
        cursor: pointer;
    }
    .tableBody>tr:hover{
        /*background-color: white;*/
    }
    .priceUl>li{
        width: 40px;
        margin-left: 20px;
    }
    .priceTab:hover{
        color: red;
        cursor: pointer;

    }
    tbody>tr:hover{
        background-color: white;
    }
</style>