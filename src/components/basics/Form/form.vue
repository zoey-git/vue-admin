<template>
    <div class="form_wrap">
        <el-form :inline="inline" :rules="rules" ref="form" :model="value" :label-width="labelWidth">
            <el-form-item v-for="(field, index) in fields" :key="index" :label="field.label" :prop="field.key">
                <el-select v-if="field.type === 'select'" :placeholder="field.placeholder || '下拉选择'" v-model="value[field.key]">
                    <el-option
                        v-for="(option, index) in field.options"
                        :label="option.label"
                        :value="option.value"
                        :key="index"></el-option>
                </el-select>
                <el-input v-else :placeholder="field.placeholder || '请输入'" :maxlength="field.maxlength" v-model="value[field.key]"></el-input>
            </el-form-item>
            <slot name="field" :params="value"></slot>
        </el-form>
    </div>
</template>

<script>
export default {
    name: "Form",
    props: {
        fields: {
            type: Array,
            default: () => ([])
        },
        inline: Boolean,
        labelWidth: {
            type: String,
            default: 'auto'
        },
        rules: Object,
        value: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            nativeValue: {}
        }
    },
    watch: {
        value(val) {
    
        },
        nativeValue: {
            handler(val) {
                console.log(val);
            },
            deep: true
        }
    },
    mounted() {
        this.fields.map(item => {
            this.$set(this.nativeValue, item.key, '')
        })
    },
    methods: {
        reset() {
            this.resetFields()
            this.$emit('reset', this.nativeValue)
            return this.nativeValue
        },
        validate(){
            return new Promise((resolve, reject) => {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        resolve(this.nativeValue)
                    } else {
                        return false;
                    }
                });
            })
        },
        resetFields() {
            this.$refs['form'].resetFields()
            Object.keys(this.value).map(item => {
                this.value[item] = undefined
            })
        }
    }
}
</script>

<style lang="less" scope>
    .form_wrap {
    }
    
</style>