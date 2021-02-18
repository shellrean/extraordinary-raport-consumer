import { mapState, mapActions } from 'vuex'
import { showSweetError } from '@/core/helper/alert.helper'

/**
 * vuex states
 * @type {Object}
 */
const vuex_state = {
    ...mapState('exschool', [
        'exschools'
    ])
}

/**
 * vuex methods
 * @type {Object}
 */
const vuex_methods = {

}

/**
 * vue data
 * @type {Object}
 */
const vue_data = {

}

/**
 * vue computed
 * @type {Object}
 */
const vue_computed = {

}

/**
 * vue methods
 * @type {Object}
 */
const vue_methods = {

}

/**
 * Let's play the game
 * 
 */
export {
    vuex_state,
    vuex_methods,
    vue_data,
    vue_computed,
    vue_methods
}

