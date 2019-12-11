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
                        type="success"
                        @click="handleMenuAccess(scope.row)">菜单权限</el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <Dialog ref="dialog" title="添加角色" :formData="formData" :formItem="formItem" :dialogVisible.sync="dialogVisible"
        @submit="handleAddRole"/>

        <el-dialog
            title="菜单权限" :visible.sync="visible" width="600px" :before-close="close">

            <el-tree
                ref="tree"
                :data="treeMenu"
                show-checkbox
                node-key="id"
                default-expand-all
                :default-checked-keys="checkedKeys"
                @check="handleNodeClick"
                :props="defaultProps">
            </el-tree>

            <span slot="footer" class="dialog-footer">
                <el-button @click="close">取 消</el-button>
                <el-button type="primary" @click="handleSubmit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { getRoleList, addRole, addRoleMenu, getRoleMenu } from '@/api/role'
import { getMenuList, getMenuListAll } from '@/api/menu'

import { SET_MENU_LIST } from '@/store/types'
import { mapGetters } from 'vuex'
import { setTree } from '@/util/index'

export default {
    data() {
        return {
            tableData: [],
            formData: {},
            formItem: [
                {
                    label: '角色名称',
                    key: 'roleName'
                }
            ],
            menuFormData: {},
            menuFormItem: [],
            dialogVisible: false,
            visible: false,
            treeMenu: [],
            defaultProps: {
                children: 'children',
                label: 'title'
            },
            roleId: '',
            selectIds: '',
            checkedKeys: []
        }
    },
    computed: {
        ...mapGetters([
            'menuList'
        ])
    },
    methods: {
        getList() {
            getRoleList().then(res => {
                if (res.code === 200) {
                    this.tableData = res.data
                }
            })
        },
        getMenuList() {
            getMenuListAll().then(res => {
                this.treeMenu = setTree(res.data, -1)
            })
        },
        handleAddRole() {
            let params = {
                roleName: this.formData.roleName
            }
            addRole(params).then(res=> {
                if(res.code === 200) {
                    this.getList()
                    this.$refs.dialog.close()
                }
            })
        },
        handleDelete(row) {
            let params = {
                id: row.id
            }
        },
        handleAddMenu() {
            this.dialogVisible = true
        },
        handleEdit(row) {
            this.formData = row
            this.dialogVisible = true
        },
        handleSubmit(form) {
            this.selectIds = this.$refs.tree.getCheckedKeys().join(',')
            let params = {
                menuId: this.selectIds,
                roleId: this.roleId
            }
            addRoleMenu(params).then(res => {
                if (res.code === 200) {
                    this.close()
                }
            })
        },
        handleMenuAccess(row) {
            this.roleId = row.id
            let params = {
                roleId: this.roleId
            }
            getRoleMenu(params).then(res=> {
                if (res.code === 200) {
                    this.checkedKeys = res.data.menuId.split(',')
                    this.visible = true
                }
            })
        },
        handleNodeClick(data) {
            console.log(data);
            
        },
        close() {
            this.visible = false
        }
    },
    mounted() {
        this.getList()
        this.getMenuList()
    }
}
</script>

<style lang="scss">
    
</style>