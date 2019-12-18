<template>
    <div>
        <el-upload
            ref="upload"
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            multiple
            :auto-uploa="false"
            accept=".xlsx"
            :limit="3"
            :on-success="handleSuccess"
            :on-exceed="handleExceed"
            :file-list="fileList">
            <el-button size="small" type="primary">选择文件</el-button>
        </el-upload>
        <cm-table :tableData="tableData" @currentChange="currentChange"/>
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
            tableColumn: []
        }
    },
    methods: {
        submitUpload() {
            this.$refs.upload.submit();
        },
        handleExceed() {
            
        },
        handlePreview(file) {
            
        },
        handleSuccess(response, file, fileList) {
            var selectedFile = file.raw
            var reader = new FileReader();
            reader.onload = function(event) {
                var data = event.target.result;
                var workbook = XLSX.read(data, {
                    type: 'binary'
                });
                workbook.SheetNames.forEach(function(sheetName) {
                    var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                    if (XL_row_object.length > 0) {
                        console.log(XL_row_object);
                        XL_row_object.map(item => {
                            this.tableColumn = Object.keys(item).map(citem => {
                                return {
                                    key: item[citem],
                                    label: item[citem]                          
                                }                                
                            })
                            this.tableData = Object.keys(item).map(citem => {
                                return {
                                    [item[citem]]: item[citem],
                                }                                
                            })
                        })
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
        
    }
}
</script>