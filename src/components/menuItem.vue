<template>
    <div class="menu-wrapper">
        <el-submenu v-if="item.children && item.children.length > 0" :key="item.id" :index="item.url || item.id">
            <template slot="title">
                <i :class="item.icon"></i>
                {{item.title}}
            </template>
            <menu-item v-for="child in item.children" :key="child.id" :item="child" :url="child.url" />
        </el-submenu>
        <el-menu-item v-else :key="item.id" :index="item.url || item.id">
            <template slot="title">
                {{item.title}}
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
    
</style>