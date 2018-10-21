window.onload = function(){
    const page = {
        init:function(){
            this.getCompanyDetail()
        },  
        /**
         * @todo 获取公司签到信息
         */
        getCompanyDetail(){
            $.get('./mock/data.json',(res)=>{
                let data = res.enterprises;
                this.getCompanyLength(data);
                this.applyDomByData(data);
            })
        },
        /**
         * @todo 获取长度信息
         * @returns [公司数量，签到公司数量，未签到公司数量]
         */
        getCompanyLength(data){
            let companyLength = data.length;
            let signedLength = this.signedLength(data);
            document.querySelector('#signed').innerText = signedLength;
            document.querySelector('#unSigned').innerText = companyLength - signedLength;
        },
        /**
         * @todo 得到签到队伍的数量
        */
        signedLength(data){
            let count = 0;
            data.forEach(item => {
                if(item.signed == '1'){
                    count ++;
                }
            })
            return count; 
        },
        /**
         * @todo 将返回的数据渲染到页面中
         */
        applyDomByData(data){
            let listBox = document.createElement('div');
            listBox.className = 'item-list';
            let innerHtml = ''
            data.forEach(item => {
                innerHtml += this.createTemplate(item)
            })
            listBox.innerHTML = innerHtml;
            document.querySelector('.item-box').appendChild(listBox);
        },
        /**
         * @todo 创造模板
         * @returns {DOM} 返回一个<div class='item'></div>
         */
        createTemplate(item){
            let classType,
                signResult;
            if(item.signed == 1){
                classType = 'success';
                signResult = '签到完成'
            }else{
                classType = 'failed';
                signResult = '未签到'
            }
            console.log([classType,signResult])
            return `
                <div class='item'>
                    <div class='name'>${item.name}</div>
                    <div class='sign ${classType}'>${signResult}</div>
                </div>
            `
        }

    }
    page.init();
}