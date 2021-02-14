import axios from 'axios'
import store from '@/store'
import router from '@/router'

const $axios = axios.create({
    headers: {
        'Accept' : 'application/json'
    }
})

$axios.interceptors.request.use(
    function(config) {
        config.headers.Authorization = `Bearer ${store.state.access_token}`
        config.url = `${store.state.baseURL}/${config.url}`
        return config
    },
    function(error) {
        return Promise.reject(error)
    }
)

$axios.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if(error.response.status == 401) {
            let err_code = error.response.data.error_code
            if (err_code == 1201) {
                if (store.state.status_rt == 0) {
                    store.commit('_set_status_rt', 1)
                }
                
                if (store.state.status_rt == 1) {
                    store.commit('_set_status_rt', 2)
                    store.dispatch('auth/refreshToken', {
                        'refresh_token': store.state.refresh_token,
                    })
                    .then((res) => {
                        console.clear()
                        store.commit('_set_status_rt', 0)
                        return Promise.reject(error)
                    })
                    .catch((err) => {
                        store.commit('_set_status_rt', 1)
                        return Promise.reject(error)
                    })
                }
            }
            else if([1203, 1202].includes(err_code)) {
                (async function () {
                    await delete localStorage.access_token
                    await delete localStorage.refresh_token
                        
                    store.state.access_token = localStorage.getItem('access_token')
                    store.state.refresh_token = localStorage.getItem('refresh_token')
                    router.push({ name: 'login' })
                })();
            }
        }
        return Promise.reject(error)
    }
)

export default $axios