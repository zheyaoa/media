<template>
    <div class="container">
        <div class='header'>高招咨询会签到表</div>
        <div class="content">
            <mt-field label="公司名称" 
                placeholder="公司名称" 
                v-model="formData.companyName" 
                @input="handleChange"
            >
            </mt-field>
            <div class="searchBox" v-show="show.searchBox">
                <template v-for="item in companiesData">
                    <div class="searchItem" :key="item.id" :signed='item.signed' 
                        @click="handleItemClick(item)">
                        {{item.name}}
                    </div>
                </template>
            </div>
            <div class="success" v-show="show.success">你已经完成签到</div>
            <mt-field label="负责人姓名" 
                placeholder="负责人姓名" 
                v-model="formData.name"
            >
            </mt-field>
            <mt-field label="联系方式" 
                placeholder="联系方式" 
                v-model="formData.tel"
            ></mt-field>
            <mt-button class="submit" 
                type="primary" 
                @click="handleSubmit" 
                :disabled="btnDisabled"
            >
                签到
            </mt-button>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name:'Form',
    data() {
        return{
            formData:{
                companyName:'',
                id:'',
                name:'',
                tel:''
            },
            timer:null,
            companiesData:[],
            show:{
                searchBox:false,
                success:false
            },
            clickValue:'',
            btnDisabled:true,
            html:`<p>你已经签到成功，有问题加微信群</p>
                  <div>
                    <img style='height:4rem' src="./static/images/wx.jpg"></img>
                  </div> 
                    `
        }
    },
    methods:{
        /**
         * @todo 数据修改时执行
         */
        handleChange(){
            this.judgeChangeEventByClick()
            if(!this.judgeExit()) return false;
            this.btnDisabled = true;
            this.show.searchBox = true
            this.timer = setTimeout(()=>{
                this.getCompaniesDetailByInput()
                clearInterval(this.timer)
                this.timer = null
            },500)
        },
        /**
         * @todo 判断是否退出handleChange事件
         */
        judgeExit(){
            if(this.clickValue == this.formData.companyName||this.formData.companyName == ''||this.timer){
                return false
            }
            return true
        },
        /**
         * @todo 判断handleChange事件是否由点击事件触发,执行对应操作
         */
        judgeChangeEventByClick(){
            if(this.clickValue != this.formData.companyName){
                this.show.success = false;
            }
        },
        /**
         * @todo 根据input获取值渲染到页面中 
         */
        getCompaniesDetailByInput(){
            if(this.formData.companyName ==  ''){
                this.show.searchBox = false
                return false
            }
            axios.get(`api/search?name=${this.formData.companyName}`)
            .then((res) => {
                this.companiesData = res.data.enterprises;
            })
        },
        /**
         * @todo 判断该公司是否完成签到
         */
        judgeSigned(signed){
           if(signed == 1){
                this.show.success = true;
                this.btnDisabled = true;          
           }else{
                this.show.success = false;
                this.btnDisabled = false;                         
           }
        },
        /**
         * @todo 点击item图标对值进行修改
         */
        handleItemClick(item){
            this.clickValue = item.name;
            this.formData.id = item.id;
            this.formData.companyName = item.name;
            this.show.searchBox = false;
            this.judgeSigned(item.signed)
        },
        /**
         * @todo 提交表单的数据　
         */
        handleSubmit(){
            //禁用提交按钮一秒后恢复
            this.btnDisabled = true;
            setTimeout(()=>{
                this.btnDisabled = false;
            },1000)
            if(!this.testFormData()){
                return false;
            }
            //处理上传数据
            let data = {
                "enterpriseId":this.formData.id,
                "personInCharge":this.formData.name,
                "phoneNumber":this.formData.tel
            }
            console.log(data)
            axios.post('api/sign',data)
            .then((res)=>{
                if(res.data.result == 1){
                    this.$messagebox.alert(this.html);                    
                }
            })
            .catch(()=>{
                this.$messagebox.alert('网络繁忙请重试')
            });
        },
        /**
         * @todo 检验表单数据是合理
         * @returns {Boolean 表单数据是否合理}
         */
        testFormData(){
            //数据不为空
            let result = true
            if(this.formData.companyName==''||this.formData.name==''||this.formData.companyName == ''){
                result = false;
            }
            //验证手机号格式
            let reg = /^1[3|4|5|7|8][0-9]{9}$/
            if(!reg.test(this.formData.tel)){
                result = false
            }
            if(!result){
                this.$messagebox.alert('输入格式有误')
            }
            return result
        }
    }
}
</script>
<style lang="stylus" scoped>
    .content >>> .mint-cell-title
        text-align left
    .container
        display flex
        flex-direction column 
        margin 0 auto  
        height 100%
        max-width 8rem
        background-color #ffffff
        .header
            margin-top .4rem
            margin-bottom .6rem
            height 1rem
            line-height 1rem
            font-size .48rem
        .content
            flex 1
            width 80%
            margin 0 auto
            padding-top 1.4rem
            .success
                color: #a94442; 
                padding-left .2rem
                text-align left 
                line-height .4rem
            .searchBox
                max-height 4rem
                overflow auto
                .searchItem
                    border-top .02rem solid #f1f1f1
                    height .7rem
                    line-height .7rem
        .submit
            margin-top .8rem
            width 100%
            border-radius .1rem
</style>

