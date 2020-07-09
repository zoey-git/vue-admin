<template>
    <el-card class="box-card-box">
        <h3>{{title}}</h3>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="账号">
                <el-input v-model="form.userName"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input type="password" v-model="form.password" show-password></el-input>
            </el-form-item>
            <el-form-item label="验证码" class="captcha">
                <el-input v-model="form.captcha"></el-input>
                <div @click="handleGetCaptcha" style="display: inline-block;height: 40px;vertical-align: bottom;" v-html="captcha"></div>
            </el-form-item>
            <div class="slot">
                <slot name="handle"></slot>
            </div>
            <el-form-item>
                <el-button class="login_btn" type="primary" :loading="loading" @click="onSubmit">{{title}}</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
const { captcha } = require('@/api/user')
export default {
    props: {
        title: {
            type: String,
            required: true
        },
        loading: Boolean
    },
    data() {
        return {
            form: {},
            captcha: ''
        }
    },
    mounted() {
        this.handleGetCaptcha()
    },
    methods: {
        onSubmit() {
            this.$emit('confirm', this.form)
        },
        handleGetCaptcha() {
            captcha().then(res => {
                this.captcha = res.data.url
            })   
        }
    }
}
</script>

<style lang="scss">
    .box-card-box {
        width: 500px;
        position: fixed;
        left: 50%;
        top: 40%;
        transform: translate(-50%, -50%);
        h3 {
            text-align: center;
            font-size: 30px;
            padding-top: 10px;
            padding-bottom: 20px;
        }
        .el-form {
            padding-right: 40px;
            .login_btn {
                width: 100%;
            }
            .captcha {
                .el-input {
                    width: 240px;
                }
            }
        }
        .slot {
            text-align: right;
        }
    }
</style>