<template>
    <div>
        <el-card class="box-card">
            <el-button type="primary" @click="handleAddMenu">添加</el-button>
        </el-card>
        <el-table
            :data="tableData">
            <el-table-column
                prop="id"
                label="角色ID">
            </el-table-column>
            <el-table-column
                prop="roleName"
                label="角色名称">
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
import { getRoleList } from '@/api/role'
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
            getRoleList().then(res => {
                if (res.code === 200) {
                    this.tableData = res.data
                }
            })
        },
        handleDelete(row) {
            let params = {
                id: row.id
            }
            // }
            // delMenuList(params).then(res => {
            //     this.getList()
            // })
        },
        handleAddMenu() {
            this.dialogVisible = true
        },
        handleEdit(row) {
            this.formData = row
            this.dialogVisible = true
        },
        handleSubmit(form) {
            // addMenu(form).then(res => {
            //     if (res.code === 200) {
            //         this.getList()
            //         this.$refs.dialog.close()
            //     }
            // })
        }
    },
    mounted() {
        console.log(123);
        
        this.getList()
    }
}
</script>

<style lang="scss">
    
</style>