<template>
    <div class="cm-search">
        <el-form ref="form" :inline="true" :model="form" label-width="80px">
            <el-form-item :label="item.label" v-for="(item) in formItem" :key="item.key">
                <el-select v-if="item.type === 'select'" v-model="formData[item.key]" placeholder="请选择">
                  <el-option
                    v-for="item in item.options"
                    :key="item.key"
                    :label="item.label"
                    :value="item.key">
                  </el-option>
                </el-select>
                <el-input v-else v-model="formData[item.key]"></el-input>
            </el-form-item>           
           
            <el-form-item>
                <el-button type="primary" @click="onSubmit">搜索</el-button>
                <slot></slot>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'Search',
    props: {
      formItem: {
        type: Array
      },
      formData: {
        type: Object
      }
    },
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
}
</script>

<style lang="scss">
    .cm-search {

    }
</style>