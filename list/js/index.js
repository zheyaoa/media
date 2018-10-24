window.onload = function(){
    const page = {
        init:function(){
            this.getCompanyDetail();
            this.getEexlUrl()
        },  
        /**
         * @todo 获取公司签到信息
         */
        getCompanyDetail(){
            // $.get('./mock/data.json',(res)=>{
            //     let data = res.enterprises;
            //     this.getCompanyLength();
            //     this.applyDomByData(data);
            // })
            this.getCompanyLength();
        },
        /**
         * @todo 获取公司信息
         * @returns [公司数量，签到公司数量，未签到公司数量]
         */
        getCompanyLength(){
            $.get('https://www.easy-mock.com/mock/5bc8276c6370ce7431ecbf43/SignInSystem/query/queryEnterpriseSigned',(res) =>{
                document.querySelector('.sumOfEnterprise').innerHTML = res.sumOfEnterprises;
                document.querySelector('.sumOfEnterprisesInsideProvince').innerHTML = res.sumOfEnterprisesInsideProvince;
                document.querySelector('.sumOfSignedEnterprisesInsideProvince').innerHTML = res.sumOfSignedEnterprisesInsideProvince;
                document.querySelector('.unsignedinprovince').innerHTML = res.sumOfEnterprisesInsideProvince - res.sumOfSignedEnterprisesInsideProvince;
                document.querySelector('.sumOfEnterprisesOutsideProvince').innerHTML = res.sumOfEnterprisesOutsideProvince;
                document.querySelector('.sumOfSignedEnterprisesOutsideProvince').innerHTML = res.sumOfSignedEnterprisesOutsideProvince;
                document.querySelector('.unsignedoutprovince').innerHTML = res.sumOfEnterprisesOutsideProvince - res.sumOfSignedEnterprisesOutsideProvince;
                document.querySelector('.sumOfSign').innerHTML = res.sumOfSignedEnterprisesInsideProvince + res.sumOfSignedEnterprisesOutsideProvince;
                document.querySelector('.sumOfUnsign').innerHTML =  res.sumOfEnterprises - res.sumOfSignedEnterprisesInsideProvince -res.sumOfSignedEnterprisesOutsideProvince;
            })
        },
        /**
         * @todo 获取excl的url
         */
        getEexlUrl(){
            $.get('https://www.easy-mock.com/mock/5bc8276c6370ce7431ecbf43/SignInSystem/excel/generate',(res) => {
                document.querySelector('#btn a').setAttribute("href",res.url);
            })
        },
        /**
         * @todo 得到签到队伍的数量
        */
        // signedLength(data){
        //     let count = 0;
        //     data.forEach(item => {
        //         if(item.signed == '1'){
        //             count ++;
        //         }
        //     })
        //     return count; 
        // },
        // /**
        //  * @todo 将返回的数据渲染到页面中
        //  */
        // applyDomByData(data){
        //     let listBox = document.createElement('div');
        //     listBox.className = 'item-list';
        //     let innerHtml = ''
        //     data.forEach(item => {
        //         innerHtml += this.createTemplate(item)
        //     })
        //     listBox.innerHTML = innerHtml;
        //     document.querySelector('.item-box').appendChild(listBox);
        // },
        // /**
        //  * @todo 创造模板
        //  * @returns {DOM} 返回一个<div class='item'></div>
        //  */
        // createTemplate(item){
        //     let classType,
        //         signResult;
        //     if(item.signed == 1){
        //         classType = 'success';
        //         signResult = '签到完成'
        //     }else{
        //         classType = 'failed';
        //         signResult = '未签到'
        //     }
        //     console.log([classType,signResult])
        //     return `
        //         <div class='item'>
        //             <div class='name'>${item.name}</div>
        //             <div class='sign ${classType}'>${signResult}</div>
        //         </div>
        //     `
        // },

    }
    page.init();
}