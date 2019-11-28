<template>
    <div>
        <el-card class="box-card">
            <el-button type="primary" @click="handleAddMenu">添加</el-button>
        </el-card>
        <el-table
            :data="tableData">
            <el-table-column
                prop="title"
                label="标题">
            </el-table-column>
            <el-table-column
                prop="url"
                label="url">
            </el-table-column>
            <el-table-column
                prop="icon"
                label="icon">
            </el-table-column>
             <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="success"
                        @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
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
            dialogVisible: false
        }
    },
    methods: {
        getList() {
            getMenuList().then(res => {
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
            changeMenu(form).then(res => {
                if (res.code === 200) {
                    this.getList()
                    this.$refs.dialog.close()
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