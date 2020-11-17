<template>
  <div class="form">
    <Navbar title="注册" :hasBack="hasBack" />
    <div class="form-bannerbox">
      <div
              class="banner"
              :style="
            `background-image: url(${form.bannerUrl || defaultBanner}); height: ${(form.bannerHeight || 300) / 2}px`
          "
      ></div>
    </div>
<!--    <div class="form-countflagbox" v-if="form.countFlag">-->
<!--      <div class="form-countflag">-->
<!--        <img class="form-countflag-img" src="../../assets/images/views/pages/form/notice-icon.png" alt="">-->
<!--        <span>{{form.noticeOne?form.noticeOne:'目前已经有'}}</span>-->
<!--        <span class="form-countflag-number">{{form.countNumber}}</span>-->
<!--        <span>{{form.noticeTwo?form.noticeTwo:'人参与活动'}}</span>-->
<!--      </div>-->
<!--    </div>-->
    <!--表单-->
    <div v-for="item in currentWidget">
      <div>
        <div class="input-boxone" v-if="item.type=='textarea'">
          <div class="input-box-textone">
            <span>{{item.label}}</span>
            <span class="input-box-text-vali" v-show="item.Required">*</span>
          </div>
          <textarea name="" id="" cols="30" rows="10"></textarea>
        </div>
        <div v-if="item.type=='radio'" class="input-boxtwo">
          <div class="input-box-textradio">
            <span>{{item.label}}</span>
            <span class="input-box-text-vali" v-show="item.Required">*</span>
          </div>
         <div>
           <van-radio-group v-model="item.value">
             <van-radio :name="sonItem.value" v-for="sonItem in item.arr">{{sonItem.label}}</van-radio>
           </van-radio-group>
         </div>
          <!--          <span class="count-tip" :style="{ color: item&&item.value.length > 20 ? 'red' : '#858C99' }">-->
          <!--                    {{ item&&item.value.length }}/20-->
          <!--                  </span>-->
        </div>
        <div v-if="item.type=='comment'">
          <div class="input-comment">{{item.value}}</div>
        </div>
        <div v-if="item.type=='sex'" class="input-box">
          <div class="input-box-text">
            <span>{{item.label}}</span>
            <span class="input-box-text-vali" v-show="item.Required">*</span>
          </div>
          <div class="sex-options">
            <div class="options" :class="sexValue==1?'':'optionsdefault'" @click="changeSex('1')">
              <img v-if="sexValue==1" src="../../assets/images/views/pages/form/boy.svg" alt="">
              <img v-if="sexValue==2" src="../../assets/images/views/pages/form/boydefault.svg" alt="">
              <span>男</span></div>
            <div class="options" @click="changeSex('2')">
              <img v-if="sexValue==1" src="../../assets/images/views/pages/form/girldefault.svg" alt="">
              <img v-if="sexValue==2" src="../../assets/images/views/pages/form/girl.svg" alt="">
              <span>女</span></div>
          </div>
          <div style="display: none">{{item.type}}</div>
        </div>
        <div v-if="item.type=='address'">
          <div class="input-box">
            <div class="input-box-text">
              <span>{{item.label}}</span>
              <span class="input-box-text-vali" v-show="item.Required">*</span>
            </div>
            <div class="citytext" @click="areaShow=true" v-if="district">
             <span>{{province}},{{city}},{{district}}</span>
              <img  @click.stop="cleanAddress" class="closearrow" src="../../assets/images/views/pages/form/line_close.svg" alt="">
            </div>
            <div class="citytext" @click="areaShow=true" v-else>
              <span>请选择地址</span>
              <img class="closearrow"  src="../../assets/images/views/pages/form/righticon.png" alt="">
            </div>
          </div>
          <div class="input-boxthree">
            <div class="input-box-textthree">
              <span>详细地址</span>
              <span class="input-box-text-valiaddr" v-show="item.Required">*</span>
            </div>
            <textarea name="" cols="30" rows="3" class="detailAddress"></textarea>
          </div>
        </div>
        <div v-if="item.type=='date'">
          <div class="input-box">
            <div class="input-box-text">
              <span>{{item.label}}</span>
              <span class="input-box-text-vali" v-show="item.Required">*</span>
            </div>
            <div class="citytext" @click="openPicker" v-if="month">
              <span>{{year}}/{{month}}/{{date}}</span>
              <img @click.stop="cleanDate" class="closearrow"  src="../../assets/images/views/pages/form/line_close.svg" alt="">
            </div>
            <div class="citytext" @click="openPicker" v-else>
              <span>请选择时间</span>
              <img class="closearrow"  src="../../assets/images/views/pages/form/righticon.png" alt="">
            </div>
          </div>
        </div>
        <div class="input-box"  v-if="item.type=='name'||item.type=='phone'||item.type=='email'||item.type=='text'">
          <div class="input-box-text">
            <span>{{item.label}}</span>
            <span class="input-box-text-vali" v-show="item.Required">*</span>
          </div>
          <input
                  type="text"
                  v-model="item.value"
                  maxlength="20"
                  :placeholder="`请输入${item.label}`"
          />
          <div style="display: none">{{item.type}}</div>
<!--          <span class="count-tip" :style="{ color: item&&item.value.length > 20 ? 'red' : '#858C99' }">-->
<!--                    {{ item&&item.value.length }}/20-->
<!--                  </span>-->
        </div>
      </div>
    </div>
    <!--提交按钮-->
    <div class="form-btn-box">
      <div class="form-btn" @click="post">111111{{form.btnText}}</div>
    </div>
    <!--列表-->
    <div class="form-list" v-if="form.signUpFlag">
      <div class="form-list-title">{{form.listName?form.listName:'最近报名客户'}}</div>
      <div class="list-barbox-con" v-if="form.listStyle==1">
        <van-swipe  :autoplay="5000" class="list-barbox-one" indicator-color="white" :show-indicators="false" vertical>
          <van-swipe-item style="width: 100%" class="list-bar-one" v-for="item in swiperData">
            <div class="list-bar-onebox">
              <div class="list-bar-two" v-for="sonItem in item.data">
                <div class="list-barleft">
                  <span>{{sonItem.name}}</span>
                </div>
                <div>{{sonItem.phone}}</div>
                <div>{{sonItem.time}}</div>
              </div>
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
      <div v-if="form.listStyle==2" class="list-barbox-con">
        <van-swipe :autoplay="1000" class="list-barbox" indicator-color="white" :show-indicators="false" vertical>
          <van-swipe-item style="width: 100%" class="list-bar" v-for="item in swiperData">
            <div class="list-bar">
              <div class="list-barleft">
                <img class="list-bar-icon" src="../../assets/images/views/pages/form/hot_icon.png" alt="">
                <span>{{item.name}}</span>
              </div>
              <div>{{item.phone}}</div>
              <div>{{item.time}}</div>
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>
    <!--地址彈出层-->
    <van-popup v-model="areaShow" position="bottom" :style="{ height: '60%' }" >
      <van-area title="标题" :area-list="areaList" @confirm="onAddrConfirm" @cancel="shut" :value="areaValue"
               />
    </van-popup>
    <!--时间-->
    <mt-datetime-picker
            ref="picker"
            type="date"
            year-format="{value}"
            month-format="{value}"
            date-format="{value}"
            :startDate=disStartDate
            :endDate=disEndDate
            @confirm="handleConfirm"
            v-model="pickerValue">
    </mt-datetime-picker>
  </div>
</template>

<script lang="js">
import LoginApi from "../../apis/login"
import "../../assets/style/views/pages/form.less";
import defaultBanner from "../../assets/images/views/pages/form/form-util-banner-default.png";
import Navbar from "../../components/Navbar.vue";
import { Toast} from 'vant';
import areaList from '../../utils/area';
export default {
    components: {Navbar},
    data() {
        return {
          //地址start
          province:'',
          city:'',
          district:'',
          areaValue:'',
          areaList,
          areaShow:false,
          //地址end
          //日期start
          date: '',
          year:'',
          month:'',
          pickerValue: null,
          disStartDate:new Date('2020/07/01'),
          disEndDate:new Date('2020/10/01'),
          //日期end
          hasBack: false,
          defaultBanner: defaultBanner,
          swiperData: [
            {
              name: '马**',
              phone:'185****3514',
              time: '10分钟前',
              data: [
                {
                  name: '马1**',
                  phone:'185****3514',
                  time: '10分钟前'
                },
                {
                  name: '马2**',
                  phone:'185****3514',
                  time: '10分钟前'
                },
                {
                  name: '马3**',
                  phone:'185****3514',
                  time: '10分钟前'
                },{
                  name: '马4**',
                  phone:'185****3514',
                  time: '10分钟前'
                },
                {
                  name: '马5**',
                  phone:'185****3514',
                  time: '10分钟前'
                }
              ]
            },
            {
              name: '马1**',
              phone:'185****3512',
              time: '20分钟前',
              data: [
                {
                  name: '2马1**',
                  phone:'185****3514',
                  time: '10分钟前'
                },
                {
                  name: '2马2**',
                  phone:'185****3514',
                  time: '10分钟前'
                },
                {
                  name: '2马3**',
                  phone:'185****3514',
                  time: '10分钟前'
                },{
                  name: '2马4**',
                  phone:'185****3514',
                  time: '10分钟前'
                },
                {
                  name: '2马5**',
                  phone:'185****3514',
                  time: '10分钟前'
                }
              ]
            }
          ],
          currentWidget: [
            {
              label:'姓名',
              value:'',
              type:'name',
              Required: true
            },
            {
              label:'密码',
              value:'',
              type: 'text',
              Required: false
            },
            {
              label:'邮箱',
              value:'',
              type: 'text',
              Required: false
            },
            // {
            //   label:'多行输入',
            //   value:'',
            //   type: 'textarea',
            //   Required: true
            // },
            // {
            //   label:'单选框',
            //   value:'1',
            //   type: 'radio',
            //   Required: true,
            //   arr: [
            //     {
            //       label: '单选1',
            //       value: 1,
            //     },
            //     {
            //       label: '单选2',
            //       value: 2,
            //     }
            //   ]
            // },
            // {
            //   label:'邮箱',
            //   value:'',
            //   type: 'email',
            //   Required: true
            // },
            // {
            //   label:'手机号',
            //   value:'',
            //   type: 'phone',
            //   Required: true
            // },
            // {
            //   label:'表单说明',
            //   value:'表单说明注意事项',
            //   type: 'comment',
            //   Required: true
            // },
            // {
            //   label:'性别',
            //   value:'',
            //   type: 'sex',
            //   Required: true
            // },
            // {
            //   label:'地址',
            //   value:'',
            //   type: 'address',
            //   Required: true
            // },
            // {
            //   label:'日期',
            //   value:'',
            //   type: 'date',
            //   Required: true
            // }
          ],
          sexValue:'1',
          form: {
            name: '预约表单',
            btnText: '提交表单',
            bannerVisible: false,
            bannerUrl: '',
            bannerHeight: 300,
            widgetValue: [],
            countFlag: false,
            countNumber: 1,
            noticeOne: '目前已经有',
            noticeTwo: '人参与活动',
            signUpFlag: false,
            listName: '最近报名客户',
            JumpLinkFlag: false,
            JumpLink: '',
            listStyle: 1
          },
        }
    },
    methods: {
      changeSex(val) {
        this.sexValue =val
      },
      //地址start
      onAddrConfirm(e) {
        console.log('this.onAddrConfirm=>e', e)
        this.province = e[0].name
        this.city = e[1].name
        this.district = e[2].name
        this.areaShow = false
      },
      shut () {
        this.areaShow = false
      },
      cleanAddress() {
        this.province = '';
        this.city = '';
        this.district = '';
      },
      //地址end
      //时间
      openPicker() {
        this.$refs.picker.open();
      },
      handleConfirm (value) {
        console.log(value);
        if(value){
          this.year = value.getFullYear();
          this.month = value.getMonth() + 1;
          this.date = value.getDate();
        }
      },
      cleanDate() {
        this.year = '';
        this.month = '';
        this.date='';
      },
      //时间end
      post() {
        let params = {
          name: this.currentWidget[0].value,
          pwd: this.currentWidget[1].value,
          email: this.currentWidget[2].value
        };
        console.log('asdas',params)
        LoginApi.login(params)
                .then((res) => {
                  Toast(res.msg);
                })
                .catch((err) => {
                  console.log(err);
                });
      }
    },
    mounted() {

    }
}
</script>
