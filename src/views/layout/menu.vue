<template>
    <div class="sidebar-container" :class="classObj">
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu text-color="rgb(191, 203, 217)"
                :router="true"
                :collapse="isCollapse"
                active-text-color="rgb(64, 158, 255)">
                <menu-item v-for="item in treeMenu" :key="item.id" :item="item" :url="item.url"/>
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script>
import menuItem from '@/components/menuItem'
import { getMenuList, delMenuList, addMenu } from '@/api/menu'
import { SET_MENU_LIST } from '@/store/types'
import { mapActions, mapGetters } from 'vuex'
import { setTree, sortTree } from '@/util/index'
export default {
    data() {
        return {
            treeMenu: []
        }
    },
    computed: {
        classObj() {
            return {
                hideMenu: true
            }
        },
        ...mapGetters([
            'menuList',
            'isCollapse'
        ])
    },
    methods: {
        getList() {
            this.treeMenu = sortTree(setTree(this.menuList, -1))
        },
        
    },
    mounted() {
        this.getList()
    },
    components: {
        menuItem
    }
}
</script>

<style lang="scss">
    .el-scrollbar {
      height: 100%;
    }
    .el-menu {
        // width: 100%;
        &:not(.el-menu--collapse) {
            width: 210px;
        }
    }
    .sidebar-container {
        // width: 210px;
        background-color:rgb(48, 65, 86);
        .el-menu-item {
            background-color: rgb(48, 65, 86) !important;
            &:hover {
                background-color: #263445!important;
            }
        }
        .is-active.is-opened {
            .el-submenu__title {
                color: #fff !important;
            }
        }
        .el-submenu__title:hover {
            background-color: #263445!important;
        }
        .el-submenu > .el-submenu__title {
            background-color:rgb(48, 65, 86);
        }
        .el-submenu .el-menu-item {
            background-color: #1f2d3d!important;
        }
    }
    .scrollbar-wrapper {
        overflow-x: hidden !important;
    }
</style>