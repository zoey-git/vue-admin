<template>
    <div class="menu-wrapper">
        <el-submenu v-if="item.children && item.children.length > 0" :key="item.id" :index="item.url || item.id">
            <template slot="title">
                <i :class="item.icon || 'el-icon-sunny'"></i>
                <span slot="title">{{item.title}}</span>
            </template>
            <menu-item v-for="child in item.children" :key="child.id" :item="child" :url="child.url" />
        </el-submenu>
        <el-menu-item v-else :key="item.id" :index="item.url || item.id">
            <template slot="title">
                <i :class="item.icon"></i>
                <span slot="title">{{item.title}}</span>
            </template>
        </el-menu-item>
    </div>
</template>

<script>
export default {
    name: 'menu-item',
    props: {
        item: {
            type: Object
        },
        
    },
    data() {
        return {
            
        }
    },
    mounted() {

    }
}
</script>

<style lang="scss">
    .el-menu--collapse .el-menu-item span, .el-menu--collapse .el-submenu>.el-submenu__title span {
        height: 0;
        width: 0;
        overflow: hidden;
        visibility: hidden;
        display: inline-block;
    }
    .el-menu--collapse .el-menu-item .el-submenu__icon-arrow, .el-menu--collapse .el-submenu>.el-submenu__title .el-submenu__icon-arrow {
        display: none;
    }
</style>