<template>
    <div>
        <el-upload
            ref="upload"
            class="upload-demo"
            action="/api/upload/excel"
            :on-preview="handlePreview"
            multiple
            :auto-uploa="false"
            :headers="headers"
            accept=".xlsx"
            :limit="3"
            :on-success="handleSuccess"
            :on-exceed="handleExceed"
            :file-list="fileList">
            <el-button size="small" type="primary">选择文件</el-button>
        </el-upload>
        <cm-table v-if="tableData.length>0" :tableData="tableData" :tableColumn="tableColumn" :isShowDel="false" @currentChange="currentChange"/>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">确认上传</el-button>
    </div>
</template>

<script>
import XLSX from 'xlsx'
export default {
    data() {
        return {
            fileList: [],
            tableData: [],
            tableColumn: [],
            headers: {
                Authorization: ''
            }
        }
    },
    methods: {
        submitUpload() {
            console.log(1233);
            
            this.$refs.upload.submit();
        },
        handleExceed() {
            
        },
        handlePreview(file) {
            
        },
        handleSuccess(response, file, fileList) {
            var selectedFile = file.raw
            var reader = new FileReader();
            reader.onload = (event) => {
                var data = event.target.result;
                var workbook = XLSX.read(data, {
                    type: 'binary'
                });
                workbook.SheetNames.forEach((sheetName) => {
                    var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                    if (XL_row_object.length > 0) {
                        let tableColumn = []
                        let tableData = []
                        let obj = XL_row_object[0]
                        Object.keys(obj).map(item => {
                            tableColumn.push({
                                prop: item,
                                label: item
                            })
                        })
                        XL_row_object.map(item => {
                            tableData.push(item)
                        })
                        this.tableColumn = tableColumn
                        this.tableData = tableData
                    }
                })
            }
            reader.onerror = function(event) {};
            reader.readAsBinaryString(selectedFile)
        },
        currentChange() {

        }
    },
    mounted() {
        let user = JSON.parse(localStorage.getItem('user') || "{}")
        this.headers.Authorization = `Bearer ${user.token}`
    }
}
</script>