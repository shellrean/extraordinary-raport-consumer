import { showSweetError } from '@/core/helper/alert.helper'
import { mapActions, mapState } from 'vuex'

/**
 * Vue data
 * @type {Object}
 */
const vue_data = {
  pageIndex: 0
}

/**
 * Vue computed
 * @type {Object}
 */
const vue_computed = {

}

/**
 * Vue methods
 * @type {Object}
 */
const vue_methods = {
    showError
}

/**
 * Vuex states
 * @type {Object}
 */
const vuex_states = {

}

/**
 * Vuex methods
 * @type {Object}
 */
const vuex_methods = {

}

/**
 * Export module let's go
 */
export {
  vue_data,
  vue_methods,
  vue_computed,
  vuex_states,
  vuex_methods,
}

/**
 * Show sweet error
 * @type vue-method
 */
function showError(err) {
    showSweetError(this, err)
}