<template>
    <el-header class="layout_header">
        <div>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for="(item,index) in breadList" :key="item.path">
                    <span v-if="item.redirect === 'noRedirect' || index == breadList.length-1" class="no-redirect">{{ item.meta.title }}</span>
                    <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        
        <div>
            <div class="full" @click="handleFull">
                <i :class="isFull"></i>
            </div>
            <div class="user">
                <div class="head">
                    <div v-if="!user.head" class="el-icon-user-solid" style="font-size: 34px;"></div>
                    <img v-else :src="user.head" alt="">
                </div>
                <div>{{user.userName}}</div>
                <el-dropdown @command="handleClick">
                    <i class="el-icon-caret-bottom" style="margin-right: 15px"></i>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="updateHead">修改头像</el-dropdown-item>
                        <el-dropdown-item command="logOut">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <UpdateHead ref="updateHead" :user="user"/>
    </el-header>
</template>

<script>
import { full } from '@/util/index'
import UpdateHead from './components/UpdateHead'
export default {
    data() {
        return {
            breadList: [],
            user: {},
            isFull: 'el-icon-menu',
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
    created() {
        this.getBreadcrumb()
        this.user = JSON.parse(localStorage.getItem('user') || "{}")
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
        },
        handleFull() {
            this.isFull = this.isFull === 'el-icon-menu' ? 'el-icon-s-grid' : 'el-icon-menu'
            full()
        },
        handleClick(command) {
            if( command === 'updateHead') {
                this.updateHead()
            } else if (command === 'logOut') {
                this.logOut()
            }
        },
        updateHead() {
            this.$refs.updateHead.dialogVisible = true
        },
        logOut() {

        },
        
    },
    components: {
        UpdateHead
    }
}
</script>

<style lang="scss">
    .layout_header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0px 1px 3px 0px rgba(0,0,0,.2);
        > div {
            display: flex;
            align-items: center;
            .full {
                width: 30px;
                height: 30px;
                padding-right: 10px;
                i {
                    font-size: 30px;
                }
            }
            .user {
                display: flex;
                align-items: center;
                .head {
                    width: 40px;
                    height: 40px;
                    overflow: hidden;
                    padding-right: 4px;
                    border-radius: 10px;
                    img {
                        width: 100%;
                    }
                }
            }
        }
    }
</style>