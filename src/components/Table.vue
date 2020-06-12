<template>
    <div class="cm-table">
        <el-table
            border
            :data="tableData">

            <el-table-column
                v-for="item in tableColumn" :key="item.prop"
                :prop="item.prop"
                :label="item.label">
            </el-table-column>

            <el-table-column
                v-if="isShowDel || tableBtn && tableBtn.length > 0"
                label="操作"
                fixed="right"
                width="100">
                <template slot-scope="scope">
                    <el-button
                        v-for="item in tableBtn" :key="item.label"
                        size="mini"
                        :type="item.type || 'info'"
                        @click="item.callback && item.callback(scope.row)">{{item.label}}</el-button>
                    <el-button
                        v-if="isShowDel"
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="page" v-if="page">
            <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page.currentPage || 10"
                :page-sizes="[4, 10, 20, 30, 50]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="page.total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    name: "cm-table",
    props: {
        tableColumn: {
            type: Array
        },
        tableData: {
            type: Array
        },
        tableBtn: {
            type: Array
        },
        page: {
            type: Object
        },
        isShowDel: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            currentPage: 10
        }
    },
    methods: {
        handleDelete(row) {
            this.$emit('del', row)
        },
        handleSizeChange(size) {
            this.$emit('sizeChange', size)
        },
        handleCurrentChange(pageNum) {
            this.$emit('currentChange', pageNum)
        }
    },
    mounted() {
    }
}
</script>

<style lang="scss">
    .cm-table {
        padding: 15px;
        border: 1px solid #dcdfe6;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
        .page {
            padding-top: 20px;
        }
    }
</style>