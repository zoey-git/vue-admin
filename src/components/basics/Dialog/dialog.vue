<template>
    <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        :width="width"
        :before-close="close">
        <slot></slot>
        <span slot="footer" class="dialog-footer">
            <slot name="footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="confirm">确 定</el-button>
            </slot>
        </span>
    </el-dialog>
</template>

<script>
export default {
    props: {
        visible: Boolean,
        title: String,
        width: {
            type: String,
            default: '30%'
        },
        button: Array,
        fields: Array,
        rules: Object,
        editValue: Object
    },
    watch: {
        visible(val, oldVal) {
            if (val) {
                this.dialogVisible = val
            }
        },
        dialogVisible(val, oldVal) {
            if (!val) {
                this.$emit('update:visible', false)
            }
        }
    },
    data() {
        return {
            dialogVisible: false
        }
    },
    methods: {
        cancel() {
            this.close()
            this.$emit('cancel')
        },
        confirm() {
            this.$emit('confirm')
        },
        close() {
            this.dialogVisible = false
        }
    },
    mounted() {
        
    },
    components: {
    }
}
</script>