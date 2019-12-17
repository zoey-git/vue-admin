<template>
    <div>
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
            }
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
        }
    },
    mounted() {
        this.getList()
    }
}
</script>

<style lang="scss">
    
</style>