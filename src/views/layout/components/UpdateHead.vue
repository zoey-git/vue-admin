<template>
    <el-dialog
        title="上传头像"
        :visible.sync="dialogVisible" width="30%"
        :before-close="handleClose">
        
        <el-upload
            class="upload-demo"
            action="/api/upload/head"
            :on-preview="handlePreview"
            multiple
            :limit="1"
            name="file"
            :headers="headers"
            :on-success="handleSuccess"
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>

        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleSubmit">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { updateHead } from '@/api/user'
export default {
    props: {
        user: {
            type: Object
        }
    },
    data() {
        return {
            fileList: [],
            dialogVisible: false,
            headers: {
                Authorization: ''
            },
        }
    },
    methods: {
        handleSuccess(res) {
            if (res.code === 200) {
                this.url = res.data.url
            } else {
                this.$message.error(res.msg)
            }
        },
        handlePreview(event) {
            console.log(event);
        },
        handleSubmit() {
            let params = {
                userId: this.user.userId,
                headUrl: this.url
            }
            updateHead(params).then(res => {
                if(res.code === 200) {
                    let user = JSON.parse(localStorage.getItem('user') || '{}')
                    user.head = res.data.head
                    this.user.head = user.head
                    localStorage.setItem('user', JSON.stringify(user))
                    this.dialogVisible = false
                }
            })
        },
        handleClose(done) {
            this.dialogVisible = false
        }
    },
    mounted() {
        this.headers.Authorization = `Bearer ${this.user.token}`
    }
}
</script>