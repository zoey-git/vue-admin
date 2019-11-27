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
             <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <Dialog ref="dialog" title="添加菜单" :dialogVisible.sync="dialogVisible"
        @submit="handleSubmit"/>
    </div>
</template>

<script>
import { getMenuList, delMenuList, addMenu } from '@/api/menu'
export default {
    data() {
        return {
            tableData: [],
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
                console.log(res);
                
            })
        },
        handleAddMenu() {
            this.dialogVisible = true
        },
        handleSubmit(form) {
            addMenu(form).then(res => {
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