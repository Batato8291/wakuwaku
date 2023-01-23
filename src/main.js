import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Swiper, SwiperSlide } from 'swiper/vue';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import CKEditor from '@ckeditor/ckeditor5-vue';
import { Form, Field, ErrorMessage, defineRule, configure } from 'vee-validate';
import AllRules from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';
import App from './App.vue';
import router from './router';
import { currency, date } from './methods/filters';
import $httpMessageState from './methods/pushMessageState';
import emitter from './methods/emitter';

const app = createApp(App);
app.config.globalProperties.$filters = { currency, date };
app.config.globalProperties.$httpMessageState = $httpMessageState;
app.config.globalProperties.$emitter = emitter;

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});
configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: true, // 當輸入內容 直接進行驗證
});
// 設定預設語系
setLocale('zh_TW');

app.use(router);
app.use(VueAxios, axios);
app.use(CKEditor);

app.component('swiper-item', Swiper);
app.component('swiper-slide', SwiperSlide);
app.component('LoadingOverlay', Loading);
app.component('VForm', Form);
app.component('VField', Field);
app.component('ErrorMessage', ErrorMessage);

app.mount('#app');
