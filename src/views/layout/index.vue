<template>
    <div>
        <el-container style="height: 100vh;">
            <Menu />
            <el-container direction="vertical">
                <Header />
                <el-main>
                    <router-view />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import Menu from './menu'
import Header from './header'
export default {
    components: {
        Menu,
        Header
    }
}
</script>

<style lang="scss">
</style>