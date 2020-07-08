<template>
    <div>
        <Search @add="handleAdd" @search="handleSearch" :fields="searchFields" v-model="searchValue" @reset="handleReset"></Search>
        <Table
            :column="tableColumn"
            :data="tableData"
            :button="['edit']"
            @edit="handleEdit"
            :page="page"
            @current-change="handleCurrentChange"
        ></Table>
        <Dialog ref="dialog" :visible.sync="dialogVisible" title="添加" @confirm="handleConfirm" @cancel="handleCancel">
            <Form ref="form" v-model="formValue" :fields="fields" :inline="false" label-width="80px" :rules="rules" ></Form>
        </Dialog>
    </div>
</template>

<script>
import Table from '@/components/basics/Table/table'
import Search from '@/components/basics/Search/search'
import Dialog from '@/components/basics/Dialog/dialog'
import Form from '@/components/basics/Form/form'
import { getDemoList, addDemo, updateDemo } from '@/api/demo'
export default {
    data() {
        return {
            dialogVisible: false,
            fields: [
                { label: '姓名', key: 'name' },
                { label: '地址', key: 'address' }
            ],
            rules: {
                name: [
                    { required: true, message: '哈哈哈' }
                ]
            },
            formValue: {},
            tableColumn: {
                name: '姓名',
                address: '地址'
            },
            tableData: [],
            page: {
                current: 1,
                size: 15,
                total: 0
            },
            searchFields: [
                { label: '姓名', key: 'name' },
                { label: '地址', key: 'address' }
            ],
            searchValue: {}
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
                console.log(this.formValue);
                if (this.formValue._id) {
                    updateDemo({...this.formValue}).then(res => {
                        console.log(res);
                        if (res.code === 200) {
                            console.log(res);
                            this.$refs.dialog.close()
                            this.$refs.form.resetFields()
                            this.getList()
                        } else {
                            this.$message.error(res.msg)
                        }
                    })
                    return
                }
                addDemo({...this.formValue}).then(res => {
                    console.log(res);
                    if (res.code === 200) {
                        console.log(res);
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
        },
        handleCurrentChange(val) {
            this.page.current = val
            this.getList()
        },
        getList() {
            let params = {}
            params = Object.assign(params, this.searchValue, {page: this.page})
            getDemoList(params).then(res => {
                if (res.code === 200) {
                    this.tableData = res.data
                    this.page = res.page
                } else {
                    this.$message.error(res.msg)
                }
            })
        },
        handleSearch() {
            this.page.current = 1
            this.getList()
        },
        handleReset() {
            this.page.current = 1
            this.getList()
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