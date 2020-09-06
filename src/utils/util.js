let utilObj = {
    //转换时间格式
    parseDate(value,ruler){
        let timeRuler = (value+'').match('')
        if(timeRuler instanceof Array){
            console.error(value +' 检测到不正确符号' + timeRuler[0]);
            return
        };
        let time1 = new Date(value);
        if(time1+''=='Invalid Date'){
            console.error(value +' 不是正确时间格式');
            return
        }
        let year = new Date(time1).getFullYear();
        let month = (new Date(time1).getMonth())+1;
        let day = new Date(time1).getDate();
        let hour = new Date(time1).getHours();
        let minutes = new Date(time1).getMinutes();
        let seconds = new Date(time1).getSeconds();
        if(month<10){
            month = '0'+month;
        }
        if(day<10){
            day = '0'+day;
        }
        if(!hour){
            hour = '00';
        }else if(hour<10){
            hour = '0'+ hour;
        }
        if(!minutes){
            minutes = '00';
        }
        if(!seconds){
            seconds = '00';
        }
        let parseTime = year +"-"+ month +"-"+ day +' '+hour+':'+minutes +':'+seconds;

        return parseTime
    },
    debounce(func, wait, immediate) {
        let timeout, args, context, timestamp, result
        const later = function() {
            // 据上一次触发时间间隔
            const last = +new Date() - timestamp
            // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
            if (last < wait && last > 0) {
                timeout = setTimeout(later, wait - last)
            } else {
                timeout = null
                // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
                if (!immediate) {
                    result = func.apply(context, args)
                    if (!timeout) context = args = null
                }
            }
        }
        return function(...args) {
            context = this
            timestamp = +new Date()
            const callNow = immediate && !timeout
            // 如果延时不存在，重新设定延时
            if (!timeout) timeout = setTimeout(later, wait)
            if (callNow) {
                result = func.apply(context, args)
                context = args = null
            }

            return result
        }
    },
    //导出
    exportExcelFun(exportExcelFun){
        console.log(exportExcelFun)
    },
    //导入
    importExcelFun(value){
        let read = new FileReader();
        read.onload = function(evt) {
            console.log(evt.target.result);
            let c = new Buffer(evt.target.result);
            console.log(c)
            console.log(c.toString())
        };
        // read.readAsBinaryString(value);

        // read.readAsText(value);
        read.readAsArrayBuffer(value);
    }
}
export default utilObj