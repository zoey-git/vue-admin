<template>
    <div>
        <el-dialog
            title="提示"
            :visible.sync="visible"
            width="600px"
            :before-close="close">
            
            <el-form ref="form" :model="formData" label-width="80px">
                <el-form-item :label="item.label" v-for="item in formItem" :key="item.key">
                    <el-select v-if="item.type === 'select'" v-model="formData[item.key]" placeholder="请选择">
                        <el-option
                            v-for="option in item.options"
                            :key="option.key"
                            :label="option.label"
                            :value="option.key">
                        </el-option>
                    </el-select>
                    <el-input v-else v-model="formData[item.key]"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="close">取 消</el-button>
                <el-button type="primary" @click="handleSubmit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String
        },
        dialogVisible: {
            type: Boolean,
            required: true
        },
        formData: {
            type: Object
        },
        formItem: {
            type: Array
        }
    },
    watch: {
        visible(val) {
            if (!val) {
                this.$emit('update:dialogVisible', false)
            }
        },
        dialogVisible(val) {
            if (val) {
                this.visible = true
            }
        }
    },
    data() {
        return {
            visible: false
        }
    },
    methods: {
        close() {
            this.visible = false
        },
        handleSubmit() {
            this.$emit('submit', this.formData)
        }
    }
}
</script>

<style lang="scss">
    
</style>