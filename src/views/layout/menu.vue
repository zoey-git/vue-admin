<template>
    <div class="sidebar-container" :class="classObj">
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu text-color="#fff"
                :router="true"
                background-color="#545c64" :collapse="isCollapse"
                active-text-color="#ffd04b">
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
import { setTree } from '@/util/index'
export default {
    data() {
        return {
            isCollapse: false,
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
            'menuList'
        ])
    },
    methods: {
        getList() {
            this.treeMenu = setTree(this.menuList, -1)
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
        width: 100%;
    }
    .sidebar-container {
        width: 210px;
        background-color:#545c64;
    }
    .scrollbar-wrapper {
        overflow-x: hidden !important;
    }
</style>