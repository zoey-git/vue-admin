<template>
    <div class="sidebar-container" :class="classObj">
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu text-color="#fff"
                :router="true"
                background-color="#545c64" :collapse="isCollapse"
                active-text-color="#ffd04b">
                <menu-item v-for="item in menuList" :key="item.id" :item="item" :url="item.url"/>
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script>
import menuItem from '@/components/menuItem'
import { getMenuList, delMenuList, addMenu } from '@/api/menu'
export default {
    data() {
        return {
            isCollapse: false,
            menuList: []
        }
    },
    computed: {
        classObj() {
            return {
                hideMenu: true
            }
        }
    },
    methods: {
        getList() {
            getMenuList().then(res => {
                if (res.code === 200) {
                    let data = res.data
                    let handleTree = (arr, parentId) => {
                        let list = JSON.parse(JSON.stringify(arr))
                        let newArr = []
                        for(let i = 0; i < list.length; i++) {
                            let obj = list[i]
                            if (obj.parentId == parentId) {
                                let item = { ...obj }
                                item.children = handleTree(list, obj.id)
                                newArr.push(item)
                            }
                        }
                        return newArr
                    }
                    this.menuList = handleTree(data, -1)
                }
            })
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