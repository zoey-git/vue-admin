<template>
    <div>
        <el-table
            :data="data"
            style="width: 100%">
            <el-table-column
                v-for="(item, index) in Object.entries(column)" :key="index"
                :label="typeof item[1] === 'string' ? item[1] : item[1]['label']"
                :width="Object.prototype.toString.call(item[1]) === '[object Object]' && item[1]['width']">
                <template slot-scope="scope">
                    <span v-if="['time', 'datetime', 'date'].includes(item[1]['type'])">{{scope.row[item[0]] | formatDate(item[1]['type'])}}</span>
                    <span v-else-if="typeof item[1]['format'] === 'function'">{{item[1]['format'](scope.row)}}</span>
                    <span v-else>{{scope.row[item[0]]}}</span>
                </template>
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="200">
                <template slot-scope="scope">
                    <el-button v-if="button.includes('detail')" @click="handleDetail(scope.row)" type="text" size="small">查看</el-button>
                    <el-button v-if="button.includes('edit')" type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button v-if="button.includes('delete')" type="text" style="color: #F56C6C" size="small" @click="handleDelete(scope.row)">删除</el-button>
                    <slot name="button" :scope="scope"></slot>
                </template>
            </el-table-column>
        </el-table>
        <div class="page_wrap">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page.current"
                :page-sizes="[10, 15, 30, 50]"
                :page-size="page.size"
                layout="total, prev, pager, next, jumper"
                :total="page.total || 0">
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Array,
            default: () => ([])
        },
        column: {
            type: Object,
            default: () => ({})
        },
        button: {
            type: Array,
            default: () => ([])
        },
        page: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
           
        }
    },
    filters: {
        /**
         * type: date | datetime | time
         */
        formatDate(timer, type = 'datetime') {
            if (!timer) {
                return ''
            }
            let date = new Date(timer);
            let y = date.getFullYear();// 年
            let MM = date.getMonth() + 1;// 月
            MM = MM < 10 ? ('0' + MM) : MM;
            let d = date.getDate();// 日
            d = d < 10 ? ('0' + d) : d;
            if (type === 'date') {
                return [y, MM, d].join('-')
            }
            let h = date.getHours();// 时
            h = h < 10 ? ('0' + h) : h;
            let m = date.getMinutes();// 分
            m = m < 10 ? ('0' + m) : m;
            let s = date.getSeconds();// 秒
            s = s < 10 ? ('0' + s) : s;
            if (type === 'time') {
                return [h, m, s].join(':')
            }
            return [y, MM, d].join('-') + ' ' +[h, m, s].join(':')
        }
    },
    methods: {
        handleDetail(row) {
            this.$emit('detail', row)
        },
        handleDelete(row) {
            this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$emit('delete', row)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        handleEdit(row) {
            this.$emit('edit', row)
        },
        handleSizeChange(val) {
            this.$emit('size-change', val)
        },
        handleCurrentChange(val) {
            this.$emit('current-change', val)
        }
    }
}
</script>

<style lang="less" scope>
    .page_wrap {
        display: flex;
        flex-direction: row-reverse;
    }
</style>