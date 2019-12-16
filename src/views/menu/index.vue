<template>
    <div>
        <el-upload
            class="upload-demo"
            action="/api/upload/head"
            :on-preview="handlePreview"
            multiple
            :limit="3"
            name="file"
            :headers="headers"
            :on-success="handleSuccess"
            :on-exceed="handleExceed"
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <img :src="url" alt="">
        <Search  />
        <cm-table :tableData="tableData" :page="page" @currentChange="currentChange" @sizeChange="sizeChange"/>
        <Dialog ref="dialog" title="添加菜单" :formData="formData" :dialogVisible.sync="dialogVisible"
        @submit="handleSubmit"/>
    </div>
</template>

<script>
import { getMenuList, delMenuList, addMenu, changeMenu } from '@/api/menu'
export default {
    data() {
        return {
            tableData: [],
            formData: {},
            dialogVisible: false,
            page: {
                total: 10,
                currentPage: 1,
                pageSize: 10
            },
            fileList: [],
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InpvZXk0IiwicGFzc3dvcmQiOiIkMmIkMTAkaHlBUTdZdzRTVHh2NVY2UldORXpsLmpTRXBPb1NoRjFhdVFuOUgzMThGYjJUZEFHTDRZSW0iLCJpYXQiOjE1NzY1MDA4MjYsImV4cCI6MTU3NjUwNDQyNn0.AaXMK0P8sgo9UN9gS-iKLZdlZ4poFQCUOJDnKZcz1LY'
            },
            url: ''
        }
    },
    methods: {
        getList() {
            let user = JSON.parse(localStorage.getItem('user') || '{}')
            let params = {
                userId: user.userId
            }
            getMenuList(params).then(res => {
                if (res.code === 200) {
                    this.tableData = res.data
                }
            })
        },
        handleDelete(row) {
            let params = {
                id: row.id
            }
            delMenuList(params).then(res => {
                this.getList()
            })
        },
        handleAddMenu() {
            this.dialogVisible = true
        },
        handleEdit(row) {
            this.formData = row
            this.dialogVisible = true
        },
        handleSubmit(form) {
            addMenu(form).then(res => {
                if (res.code === 200) {
                    this.getList()
                    this.$refs.dialog.close()
                }
            })
        },
        currentChange(page) {
            this.page.currentPage = page
            let params = {
                page: {
                    currentPage: this.page.currentPage,
                    pageSize: this.page.pageSize
                }
            }
            getMenuList(params).then(res => {
                if (res.code === 200) {
                    this.tableData = res.data
                }
            })
        },
        sizeChange(size) {
            this.page.pageSize = size
            let params = {
                page: {
                    currentPage: this.page.currentPage,
                    pageSize: this.page.pageSize
                }
            }
            getMenuList(params).then(res => {
                if (res.code === 200) {
                    this.tableData = res.data
                }
            })
        },
        handleExceed(event) {
            console.log(event);
            
        },
        handleSuccess(event) {
            console.log(event.data.url);
            this.url = event.data.url
        },
        handlePreview(event) {
            console.log(event);
            
        }
    },
    mounted() {
        this.getList()
    }
}
</script>

<style lang="scss">
    
</style>