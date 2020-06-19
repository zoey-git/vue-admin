<template>
    <div>
        <Search :formItem="formItem" :formData="formData">
            <el-button type="primary" @click="handleAddMenu">添加菜单</el-button>
        </Search>
        <cm-table :tableData="tableData" :tableColumn="tableColumn" :tableBtn="tableBtn" :page="page" @currentChange="currentChange" @sizeChange="sizeChange" @del="handleDelete"/>
        <Dialog ref="dialog" title="添加菜单" :formItem="dialogFormItem" :formData="dialogFormData" :dialogVisible.sync="dialogVisible"
        @submit="handleSubmit"/>
    </div>
</template>

<script>
import { getMenuList, getMenuListAll, delMenuList, addMenu, changeMenu } from '@/api/menu'
import { setTree } from '@/util/index'
export default {
    data() {
        return {
            tableColumn: [
                { label: '标题', prop: 'title'},
                { label: 'url', prop: 'url'},
                { label: 'icon', prop: 'icon'},
            ],
            tableData: [],
            tableBtn: [
                { label: '编辑', type: "info", callback: (row) => {
                    this.handleEdit(row)
                }}
            ],
            dialogFormData: {},
            dialogFormItem: [
                {
                    label: '标题',
                    key: 'title'
                },
                {
                    label: '父级ID',
                    key: 'parentId',
                    type: 'select',
                    options: []
                },
                {
                    label: 'URL',
                    key: 'url'
                },
                {
                    label: '排序',
                    key: 'order'
                },
                {
                    label: 'ICON',
                    key: 'icon'
                },
            ],
            dialogVisible: false,
            page: {
                total: 10,
                currentPage: 1,
                pageSize: 10
            },
            formData: {},
            formItem: [
                {
                    label: '标题',
                    key: 'title'
                }
            ]
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
            console.log(row);
            
            delMenuList(params).then(res => {
                this.getList()
            })
        },
        handleAddMenu() {
            getMenuListAll().then(res=>{
                if (res.code === 200) {
                    let list = []
                    res.data.map(item => {
                        list.push({
                            label: item.title,
                            key: item.id
                        })
                    })
                    this.dialogFormItem.map(item => {
                        if (item.key === 'parentId') {
                            item.options = list
                        }
                    })
                    this.dialogVisible = true
                }
            })
        },
        handleEdit(row) {
            this.dialogFormData = row
            this.dialogVisible = true
        },
        handleSubmit() {
            if(this.dialogFormData.id) {
                changeMenu(this.dialogFormData).then(res => {
                    if (res.code === 200) {
                        this.getList()
                        this.$refs.dialog.close()
                    }
                })
            } else {
                addMenu(this.dialogFormData).then(res => {
                    if (res.code === 200) {
                        this.getList()
                        this.$refs.dialog.close()
                    }
                })
            }
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