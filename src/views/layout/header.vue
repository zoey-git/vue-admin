<template>
    <el-header class="layout_header">
        <!-- <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb> -->

        <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="(item,index) in breadList" :key="item.path">
                <span v-if="item.redirect === 'noRedirect' || index == breadList.length-1" class="no-redirect">{{ item.meta.title }}</span>
                <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
            </el-breadcrumb-item>
        </el-breadcrumb>
        
        <div>
            <el-dropdown>
                <i class="el-icon-setting" style="margin-right: 15px"></i>
                <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>查看</el-dropdown-item>
                <el-dropdown-item>新增</el-dropdown-item>
                <el-dropdown-item>删除</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <span>王小虎</span>
        </div>
    </el-header>
</template>

<script>
export default {
    data() {
        return {
            breadList: []
        }
    },
    watch: {
        $route(route) {
            if (route.path.startsWith('/redirect/')) {
                return
            }
            this.getBreadcrumb()
        }
    },
    mounted() {
        this.getBreadcrumb()
    },
    methods: {
        getBreadcrumb() {
            let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
            let first = matched[0]
            if (!this.isDashboard(first)) {
                matched = [{ path: '/home', meta: { title: '首页' }}].concat(matched)
            }
            this.breadList = matched.filter(item => item.meta && item.meta.title)
        },
        isDashboard(route) {            
            let name = route && route.name
            if (!name) {
                return false
            }
            return name.trim().toLocaleLowerCase() === '首页'.toLocaleLowerCase()
        },
        handleLink(item) {
            const { redirect, path } = item
            if (redirect) {
                this.$router.push(redirect)
                return
            }
            this.$router.push(path)
        }
    }
}
</script>

<style lang="scss">
    .layout_header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #545c64;
    }
</style>