webpackJsonp([1],{MPzD:function(t,e){},NHnr:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});a("d8/S");var s=a("clQT"),n=a.n(s),i=a("7+uW"),o=a("mtWM"),r=a.n(o),c={name:"Form",data:function(){return{formData:{companyName:"",id:"",name:"",tel:""},timer:null,companiesData:[],show:{searchBox:!1,success:!1},clickValue:"",btnDisabled:!0,html:"<p>你已经签到成功，有问题加微信群</p>\n                  <div>\n                    <img style='height:4rem' src=\"./static/images/wx.jpg\"></img>\n                  </div> \n                    "}},methods:{handleChange:function(){var t=this;if(this.judgeChangeEventByClick(),!this.judgeExit())return!1;this.btnDisabled=!0,this.show.searchBox=!0,this.timer=setTimeout(function(){t.getCompaniesDetailByInput(),clearInterval(t.timer),t.timer=null},500)},judgeExit:function(){return this.clickValue!=this.formData.companyName&&""!=this.formData.companyName&&!this.timer},judgeChangeEventByClick:function(){this.clickValue!=this.formData.companyName&&(this.show.success=!1)},getCompaniesDetailByInput:function(){var t=this;if(""==this.formData.companyName)return this.show.searchBox=!1,!1;r.a.get("api/search?name="+this.formData.companyName).then(function(e){t.companiesData=e.data.enterprises})},judgeSigned:function(t){1==t?(this.show.success=!0,this.btnDisabled=!0):(this.show.success=!1,this.btnDisabled=!1)},handleItemClick:function(t){this.clickValue=t.name,this.formData.id=t.id,this.formData.companyName=t.name,this.show.searchBox=!1,this.judgeSigned(t.signed)},handleSubmit:function(){var t=this;if(this.btnDisabled=!0,setTimeout(function(){t.btnDisabled=!1},1e3),!this.testFormData())return!1;var e={enterpriseId:this.formData.id,personInCharge:this.formData.name,phoneNumber:this.formData.tel};console.log(e),r.a.post("api/sign",e).then(function(e){1==e.data.result&&t.$messagebox.alert(t.html)}).catch(function(){t.$messagebox.alert("网络繁忙请重试")})},testFormData:function(){var t=!0;""!=this.formData.companyName&&""!=this.formData.name&&""!=this.formData.companyName||(t=!1);return/^1[3|4|5|7|8][0-9]{9}$/.test(this.formData.tel)||(t=!1),t||this.$messagebox.alert("输入格式有误"),t}}},m={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[a("div",{staticClass:"header"},[t._v("高招咨询会签到表")]),t._v(" "),a("div",{staticClass:"content"},[a("mt-field",{attrs:{label:"公司名称",placeholder:"公司名称"},on:{input:t.handleChange},model:{value:t.formData.companyName,callback:function(e){t.$set(t.formData,"companyName",e)},expression:"formData.companyName"}}),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.show.searchBox,expression:"show.searchBox"}],staticClass:"searchBox"},[t._l(t.companiesData,function(e){return[a("div",{key:e.id,staticClass:"searchItem",attrs:{signed:e.signed},on:{click:function(a){t.handleItemClick(e)}}},[t._v("\n                    "+t._s(e.name)+"\n                ")])]})],2),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.show.success,expression:"show.success"}],staticClass:"success"},[t._v("你已经完成签到")]),t._v(" "),a("mt-field",{attrs:{label:"负责人姓名",placeholder:"负责人姓名"},model:{value:t.formData.name,callback:function(e){t.$set(t.formData,"name",e)},expression:"formData.name"}}),t._v(" "),a("mt-field",{attrs:{label:"联系方式",placeholder:"联系方式"},model:{value:t.formData.tel,callback:function(e){t.$set(t.formData,"tel",e)},expression:"formData.tel"}}),t._v(" "),a("mt-button",{staticClass:"submit",attrs:{type:"primary",disabled:t.btnDisabled},on:{click:t.handleSubmit}},[t._v("\n            签到\n        ")])],1)])},staticRenderFns:[]};var l={name:"App",components:{Form:a("VU/8")(c,m,!1,function(t){a("qUzW")},"data-v-5e90a9ba",null).exports}},h={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("Form")],1)},staticRenderFns:[]};var u=a("VU/8")(l,h,!1,function(t){a("Uxwe")},"data-v-15a4da80",null).exports;a("MPzD");i.default.use(n.a),i.default.config.productionTip=!1,new i.default({el:"#app",components:{App:u},template:"<App/>"})},Uxwe:function(t,e){},"d8/S":function(t,e){},qUzW:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.a735e6e58e252d8b29eb.js.map