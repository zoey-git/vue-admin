<template>
    <div>
        <el-dialog
            title="提示"
            :visible.sync="visible"
            width="600px"
            :before-close="close">
            
            <el-form ref="form" :model="formData" label-width="80px">
                <el-form-item label="标题">
                    <el-input v-model="formData.title"></el-input>
                </el-form-item>
                <el-form-item label="URL">
                    <el-input v-model="formData.url"></el-input>
                </el-form-item>
                <el-form-item label="icon">
                    <el-input v-model="formData.icon"></el-input>
                </el-form-item>
                <el-form-item label="父级菜单">
                    <el-input v-model="formData.parentId"></el-input>
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