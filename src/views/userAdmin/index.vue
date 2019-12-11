<template>
    <div>
        <el-card class="box-card">
            <el-button type="primary" @click="handleAddMenu">添加</el-button>
        </el-card>
        <el-table
            :data="tableData">
            <el-table-column
                prop="userName"
                label="用户名">
            </el-table-column>
            <el-table-column
                prop="createTime"
                label="创建时间">
            </el-table-column>
            <el-table-column
                prop="updateTime"
                label="更新时间">
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
        <Dialog ref="dialog" title="添加菜单" :formData="formData" :formItem="formItem" :dialogVisible.sync="dialogVisible"
        @submit="handleSubmit"/>
    </div>
</template>

<script>
import { getUserList, addUser } from '@/api/userAdmin'
import { getRoleList } from '@/api/role'
import { MD5 } from '@/util/index'
export default {
    data() {
        return {
            tableData: [],
            formData: {},
            formItem: [
                { label: '用户名称', key: 'userName' },
                { label: '登录密码', key: 'password' },
                { label: '所属角色', key: 'roleId', type: "select", options: [] },
            ],
            dialogVisible: false
        }
    },
    methods: {
        getList() {
            getUserList().then(res => {
                if (res.code === 200) {
                    this.tableData = res.data
                }
            })
        },
        getRoleList() {
            getRoleList().then(res => {
                if (res.code === 200) {
                    let roleList = res.data.map(item => {
                        return {
                            label: item.roleName,
                            key: item.id
                        }
                    })
                    this.formItem.find(item => {
                        if (item.key === 'roleId') {
                            return item.options = roleList
                        }
                    })
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
            let password = MD5(form.password)
            let params = {
                userName: form.userName,
                password: password,
                roleId: form.roleId
            }
            addUser(params).then(res => {
                if (res.code === 200) {
                    this.$refs.dialog.close()
                } else {
                    this.$message({
                        type: 'error',
                        message: res.msg
                    })
                }
            })
        }
    },
    mounted() {
        this.getList()
        this.getRoleList()
    }
}
</script>

<style lang="scss">
    
</style>