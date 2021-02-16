import { showSweetError } from '@/core/helper/alert.helper'
import { mapActions, mapState } from 'vuex'

/**
 * Vue data
 * @type {Object}
 */
const vue_data = {
  search: ""
}

/**
 * Vue computed
 * @type {Object}
 */
const vue_computed = {
  filteredClassroom
}

/**
 * Vue methods
 * @type {Object}
 */
const vue_methods = {
  showError,
  fetchData,
}

/**
 * Vuex states
 * @type {Object}
 */
const vuex_states = {
  ...mapState(['isLoading','academic_active']),
  ...mapState('academic_classroom', ['classrooms']),
}

/**
 * Vuex methods
 * @type {Object}
 */
const vuex_methods = {
  ...mapActions('academic_classroom', ['fetchClassrooms']),
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
 * Get classroom by search
 * @type vue-computed
 */
function filteredClassroom() {
    if(this.classrooms == null) {
        return []
    }
    return this.classrooms.filter((item) => item.classroomName.toLowerCase().includes(this.search.toLowerCase()))
}

/**
 * Show sweet error
 * @type vue-method
 */
function showError(err) {
    showSweetError(this, err)
}

/**
 * Fetch data classrooms
 * @type vue-method
 */
async function fetchData() {
  try {
    await this.fetchClassrooms()
  } catch (err) {
    if (typeof err.error_code != 'undefined' && err.error_code == 1201) {
      this.fetchData()
      return
    }
    this.showError(err)
  }
}