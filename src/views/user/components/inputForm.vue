<template>
    <el-card class="box-card-box">
        <h3>{{title}}</h3>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="账号">
                <el-input v-model="form.userName"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input type="password" v-model="form.password"></el-input>
            </el-form-item>
            <div class="slot">
                <slot name="handle"></slot>
            </div>
            <el-form-item>
                <el-button class="login_btn" type="primary" @click="onSubmit">{{title}}</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            form: {}
        }
    },
    methods: {
        onSubmit() {
            this.$emit('confirm', this.form)
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
        }
        .slot {
            text-align: right;
        }
    }
</style>