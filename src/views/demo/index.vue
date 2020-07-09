<template>
    <div>
        <Search @add="handleAdd" @search="handleSearch" :fields="searchFields" @reset="handleReset"></Search>
        <Table
            :column="tableColumn"
            :data="tableData"
            :button="['edit', 'delete']"
            @edit="handleEdit"
            @delete="handleDelete"
            :page="page"
            @current-change="handleCurrentChange"
            v-loading="loading"
        ></Table>
        <Dialog ref="dialog" :visible.sync="dialogVisible" title="添加" @confirm="handleConfirm" @cancel="handleCancel">
            <Form ref="form" :default-value.sync="defaultValue" :fields="fields" :inline="false" label-width="80px" :rules="rules"></Form>
        </Dialog>
    </div>
</template>

<script>
import Table from '@/components/basics/Table/table'
import Search from '@/components/basics/Search/search'
import Dialog from '@/components/basics/Dialog/dialog'
import Form from '@/components/basics/Form/form'
import { getDemoList, addDemo, updateDemo, deleteDemo } from '@/api/demo'
export default {
    data() {
        return {
            dialogVisible: false,
            fields: [
                { label: '姓名', key: 'name' },
                { label: '地址', key: 'address' },
                { label: '出生日期', key: 'birth', type: 'date' },
                { label: '开始时间', key: 'startTime', type: 'time' },
                { label: '状态', key: 'status', type: 'radio', options: [
                    { label: '启用', value: 1 },
                    { label: '禁用', value: 0 },
                ] }
            ],
            rules: {
                name: [
                    { required: true, message: '哈哈哈' }
                ]
            },
            formValue: {
                name: '',
                address: '',
                birth: '',
                startTime: '',
                status: ''
            },
            tableColumn: {
                name: '姓名',
                address: '地址',
                birth: {
                    label: '出生日期',
                    type: 'date'
                },
                startTime: {
                    label: '开始时间',
                    type: 'time'
                },
                status: {
                    label: '状态',
                    format: (row) => {
                        return row.status ? '启用' : '禁用';
                    }
                }
            },
            tableData: [],
            page: {
                current: 1,
                size: 5,
                total: 0
            },
            searchFields: [
                { label: '姓名', key: 'name' },
                { label: '地址', key: 'address' },
                { label: '日期', key: 'date', type: 'daterange' }
            ],
            searchValue: {},
            loading: false,
            defaultValue: {}
        }
    },
    mounted() {
        this.getList()
    },
    methods: {
        handleAdd() {
            this.dialogVisible = true
        },
        handleConfirm() {
            this.$refs.form.validate().then(params => {
                if (params._id) {
                    updateDemo({...params}).then(res => {
                        if (res.code === 200) {
                            this.$refs.dialog.close()
                            this.$refs.form.resetFields()
                            this.getList()
                        } else {
                            this.$message.error(res.msg)
                        }
                    })
                    return
                }
                addDemo({...params}).then(res => {
                    if (res.code === 200) {
                        this.$refs.dialog.close()
                        this.$refs.form.resetFields()
                        this.getList()
                    } else {
                        this.$message.error(res.msg)
                    }
                })
            })
        },
        handleCancel() {
            this.$refs.form.resetFields()
        },
        handleEdit(row) {
            this.dialogVisible = true
            this.formValue = { ...row }
            this.$nextTick(() => {
                this.defaultValue = row
            })
        },
        handleCurrentChange(val) {
            this.page.current = val
            this.getList()
        },
        getList() {
            let params = {}
            this.loading = true
            params = Object.assign(params, this.searchValue, {page: this.page})
            getDemoList(params).then(res => {
                if (res.code === 200) {
                    this.tableData = res.data
                    this.page = res.page
                    this.loading = false
                } else {
                    this.$message.error(res.msg)
                }
            })
        },
        handleSearch(params) {
            this.searchValue = params
            this.page.current = 1
            this.getList()
        },
        handleReset() {
            this.page.current = 1
            this.getList()
        },
        handleDelete(row) {
            deleteDemo({ _id: row._id}).then(res => {
                if (res.code === 200) {
                    this.page.current = 1
                    this.getList()
                    this.$message.success('删除成功')
                } else {
                    this.$message.error(res.msg)
                }
            })
        }
    },
    components: {
        Table,
        Search,
        Dialog,
        Form
    }
}
</script>