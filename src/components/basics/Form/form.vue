<template>
    <div class="form_wrap">
        <el-form :inline="inline" :rules="rules" ref="form" :model="nativeValue" :label-width="labelWidth">
            <el-form-item v-for="(field, index) in fields" :key="index" :label="field.label" :prop="field.key">
                <el-select v-if="field.type === 'select'" :placeholder="field.placeholder || '下拉选择'" v-model="nativeValue[field.key]">
                    <el-option
                        v-for="(option, index) in field.options"
                        :label="option.label"
                        :value="option.value"
                        :key="index"></el-option>
                </el-select>
                <el-radio-group v-if="field.type === 'radio'" v-model="nativeValue[field.key]">
                    <el-radio
                        v-for="(radio, index) in field.options" :key="index"
                        :label="radio.value">{{radio.label}}</el-radio>
                </el-radio-group>
                <el-date-picker
                    v-else-if="field.type === 'daterange'"
                    v-model="nativeValue[field.key]"
                    type="daterange"
                    value-format="timestamp"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
                <el-date-picker
                    v-else-if="field.type === 'date'"
                    v-model="nativeValue[field.key]"
                    type="date"
                    value-format="timestamp"
                    placeholder="选择日期">
                </el-date-picker>
                <el-time-picker
                    v-else-if="field.type === 'time'"
                    v-model="nativeValue[field.key]"
                    value-format="timestamp"
                    placeholder="任意时间点"></el-time-picker>
                <el-input v-else :placeholder="field.placeholder || '请输入'" :maxlength="field.maxlength" v-model="nativeValue[field.key]"></el-input>
            </el-form-item>
            <slot name="field" :params="nativeValue"></slot>
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
        defaultValue: {
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
        defaultValue: {
            handler(value) {
                let keys = new Set(Object.keys(value), this.fields.map(item => item.key))
                keys.forEach(key => {
                    this.$set(this.nativeValue, key, value[key])
                })
            },
            immediate: true
        }
    },
    mounted() {
        // this.fields.map(field => {
        //     this.$set(this.nativeValue, field.key, field.value)
        // })
    },
    beforeDestroy() {
        console.log(1231231);
        
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
            this.nativeValue = {}
            this.$emit('update:defaultValue', {})
        },
        getValues() {
            return this.nativeValue
        }
    }
}
</script>

<style lang="less" scope>
    .form_wrap {
    }
    
</style>