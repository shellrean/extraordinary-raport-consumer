import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import CoreuiVue from '@coreui/coreui'
import VueSweetalert2 from 'vue-sweetalert2'
import {
 TablePlugin,
 ButtonPlugin,
 CardPlugin,
 SpinnerPlugin,
 FormGroupPlugin,
 InputGroupPlugin,
 PaginationPlugin,
 FormCheckboxPlugin,
 BadgePlugin,
 FormSelectPlugin,
 ProgressPlugin ,
 FormInputPlugin,
 ModalPlugin,
 ToastPlugin,
 FormRadioPlugin,
 CollapsePlugin,
} from 'bootstrap-vue';

[TablePlugin, ButtonPlugin, CardPlugin, SpinnerPlugin, FormGroupPlugin, 
InputGroupPlugin, PaginationPlugin, FormCheckboxPlugin, BadgePlugin,
FormSelectPlugin,ProgressPlugin, FormInputPlugin, ModalPlugin, ToastPlugin,
FormRadioPlugin, CollapsePlugin ].forEach(comp => {
  Vue.use(comp);
});

Vue.use(CoreuiVue)
Vue.use(VueSweetalert2)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
