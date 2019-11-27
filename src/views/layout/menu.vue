<template>
    <div>
        <el-aside style="height: 100vh; background-color: #545c64">
            <el-menu text-color="#fff"
                background-color="#545c64" :collapse="isCollapse"
                active-text-color="#ffd04b">
                <el-submenu v-for="item in menuList" :key="item.id" :index="item.id">
                    <template slot="title">
                        <i class="el-icon-message"></i>
                        {{item.title}}
                    </template>
                    <template v-if="item.children.length > 0">
                        <el-menu-item v-for="childrenItem in item.children" :key="childrenItem.id" :index="childrenItem.id">
                            <template slot="title">
                                <i class="el-icon-message"></i>
                                {{childrenItem.title}}
                            </template>
                        </el-menu-item>
                    </template>
                </el-submenu>
            </el-menu>
        </el-aside>
    </div>
</template>

<script>
import { getMenuList, delMenuList, addMenu } from '@/api/menu'
export default {
    data() {
        return {
            isCollapse: false,
            menuList: []
        }
    },
    methods: {
        getList() {
            getMenuList().then(res => {
                if (res.code === 200) {
                    let data = res.data
                    for(let i = 0; i < data.length; i++) {
                        data[i].children = []
                        for (let j = 0; j < data.length; j++) {
                            if (data[i].id === data[j].parentId) {
                                data[i].children.push(data[j])
                            }
                        }
                    }
                    this.menuList = data
                }
            })
        },
    },
    mounted() {
        this.getList()
    }
}
</script>