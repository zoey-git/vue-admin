<template>
    <div class="serach_wrap">
        <Form ref="form" :fields="fields" :inline="true">
            <template v-slot:field="{params}">
                <slot name="field" :params="params"></slot>
                <el-form-item class="el-form-body-partitioncontain">
                    <el-button type="primary" size="medium" @click="search">查询</el-button>
                    <el-button size="medium" @click="reset">重置</el-button>
                </el-form-item>
            </template>
        </Form>
        <div class="handle_button">
            <slot name="button"></slot>
            <el-button v-if="buttons.includes('export')" type="primary" size="medium">
                <a class="download-link" :href="exportUrl | formatUrl" style="color: #fff">导入模板下载</a>
            </el-button>
            <el-button v-if="buttons.includes('import')" type="primary" size="medium" @click="handleImport">批量导入</el-button>
            <el-button v-if="buttons.includes('add')" type="primary" size="medium" icon="el-icon-plus" @click="add">新增</el-button>
        </div>

        <Dialog title="批量导入" width="400px" :visible.sync="dialogVisible">
            <el-upload class="upload-box"
                action=''
                :multiple='false'
                :auto-upload='true'
                list-type='text'
                :show-file-list='true'
                :before-upload="beforeUpload"
                :drag='true'
                :limit="1"
                :on-exceed="handleExceed"
                :http-request="uploadFile">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">一次只能上传一个文件，仅限excel格式</div>
            </el-upload>
            <template v-slot:footer>
                <span></span>
            </template>
        </Dialog>
    </div>
</template>

<script>
import Form from '../Form/form'
import Dialog from '../Dialog/dialog'
export default {
    props: {
        fields: {
            type: Array,
            default: () => ([])
        },
        exportUrl: String,
        buttons: {
            type: Array,
            default: () => (["add"])
        }
    },
    data() {
        return {
            dialogVisible: false
        }
    },
    filters: {
        formatUrl(val) {
            let locationUrl = window.location.href;
            if(locationUrl.indexOf('10.0.0.22') > 0 || locationUrl.indexOf('10.0.0.220') > 0){
                return 'http://10.0.0.241:9969' + val;
            }else if(locationUrl.indexOf('fadmin.pamodata.com') > 0){
                return 'http://fzs.pamodata.com ' + val;
            }else{
                return 'http://fzs.onccc.com' + val;
            }
        }
    },
    methods: {
        search() {
            let params = this.$refs.form.getValues()
            this.$emit('search', params)
        },
        reset() {
            let params = this.$refs.form.reset()
            this.$emit('reset', params)
        },
        add() {
            this.$emit('add')
        },
        handleImport() {
            this.dialogVisible = true
        },
        handleExceed (files, fileList) {
            console.log("文件");
            console.log(files);
            console.log(fileList);
            this.$message.warning('请勿上传多个文件');
        },
        beforeUpload(file){
         
            //return (isText | isTextComputer)
        },
        uploadFile() {

        }
    },
    components: {
        Form,
        Dialog
    }
}
</script>

<style lang="less" scope>
    .serach_wrap {
        margin-bottom: 20px;
    }
    .handle_button {
        display: flex;
        flex-direction: row-reverse;
        button {
            margin-left: 16px !important;
        }
    }
</style>