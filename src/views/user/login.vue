<template>
    <div class="login" :style="`background-image:url(${photo})`">
        <inputForm @confirm="confirm" :title="title" :captcha="captcha">
            <template slot="handle">
                <div v-if="type === 'login'">
                    <el-button type="text" @click="goRegister">注册</el-button>
                </div>
                <el-button v-else type="text" @click="goLogin">登录</el-button>
            </template>
        </inputForm>
    </div>
</template>

<script>
const { getPhoto, login, register, captcha } = require('@/api/user')
import { MD5 } from '@/util/index'
import inputForm from './components/inputForm'
import { SET_MENU_LIST } from '@/store/types'
import { mapActions, mapGetters } from 'vuex'
export default {
    data() {
        return {
            photo: '',
            type: 'login',
            captcha: ''
        }
    },
    computed: {
        title(val) {
            return this.type === 'login' ? '登录' : '注册'
        }
    },
    methods: {
        confirm(data) {
            let password = MD5(data.password)
            let params = {
                userName: data.userName,
                password: password,
                captcha: data.captcha
            }
            if (this.type === 'login') {
                return this.login(params)
            }
            return this.register(params)
        },
        login(params) {
            login(params).then(res => {
                if (res.code === 200) {
                    localStorage.setItem('user', JSON.stringify(res.data))
                    this.setMenu().then(res=>{
                        if(res.code) {
                            this.$router.push({ path: '/' })
                        }
                    })
                } else {
                    this.$message({
                        type: 'error',
                        message: res.msg
                    })
                }
            })
        },
        register(params) {
            register(params).then(res => {
                if (res.code === 200) {
                    this.type = 'login'
                } else {
                    this.$message({
                        type: 'error',
                        message: res.msg
                    })
                }
            })
        },
        goRegister() {
            this.type = 'register'
        },
        goLogin() {
            this.type = 'login'
        },
        ...mapActions({
            setMenu: SET_MENU_LIST
        })
    },
    mounted() {
        let params = {
            count: 1,
            urls: true,
            https: false
        }
        getPhoto(params).then(res => {
            this.photo = res[0]
        })
        captcha().then(res => {
            console.log(res);
            this.captcha = res.data.url
        })
    },
    components: {
        inputForm
    }
}
</script>

<style lang="scss">
    .login {
        width: 100%;
        height: 100vh;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center, center;
    }
</style>