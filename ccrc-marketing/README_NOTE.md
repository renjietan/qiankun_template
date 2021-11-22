{
	// Place your 全局 snippets here. Each snippet is defined under a snippet name and has a scope, prefix, body and 
	// description. Add comma separated ids of the languages where the snippet is applicable in the scope field. If scope 
	// is left empty or omitted, the snippet gets applied to all languages. The prefix is what is 
	// used to trigger the snippet and the body will be expanded and inserted. Possible variables are: 
	// $1, $2 for tab stops, $0 for the final cursor position, and ${1:label}, ${2:another} for placeholders. 
	// Placeholders with the same ids are connected.
	// Example:
	// "Print to console": {
	// 	"scope": "javascript,typescript",
	// 	"prefix": "log",
	// 	"body": [
	// 		"console.log('$1');",
	// 		"$2"
	// 	],
	// 	"description": "Log output to console"
	// }
	"Print to htmlStart": {
		"prefix": "htmlStart",
		"body": [
			"<!-- $0start @date:${CURRENT_YEAR}-${CURRENT_MONTH}-${CURRENT_DATE} ${CURRENT_HOUR}:${CURRENT_MINUTE}:${CURRENT_SECOND} @author: 谭人杰 !-->"
		],
		"description": " Start在html区块开始时使用"
	},
	"Print to htmlItem": {
		"prefix": "htmlEnd",
		"body": [
			"<!-- $0end @date:${CURRENT_YEAR}-${CURRENT_MONTH}-${CURRENT_DATE} ${CURRENT_HOUR}:${CURRENT_MINUTE}:${CURRENT_SECOND} @author: 谭人杰 !-->"
		],
		"description": " End在html区块开始时使用"
	},
	"Print to vueTitle": {
		"prefix": "vueTitle",
		"body": [
			"<!-- ",
			" * @description: ",
			" * @fileName: ${TM_FILENAME} ",
			" * @author: 谭人杰 ",
			" * @date: ${CURRENT_YEAR}-${CURRENT_MONTH}-${CURRENT_DATE} ${CURRENT_HOUR}:${CURRENT_MINUTE}:${CURRENT_SECOND}",
			" * @后台人员: $1 ",
			"!-->"
		],
		"description": "在vue文件开头配置注释"
	},
	"Print to console": {
		"prefix": "vue-tp",
		"body": [
			"<!-- ",
			" * @description: ",
			" * @fileName: ${TM_FILENAME} ",
			" * @author: 谭人杰 ",
			" * @date: ${CURRENT_YEAR}-${CURRENT_MONTH}-${CURRENT_DATE} ${CURRENT_HOUR}:${CURRENT_MINUTE}:${CURRENT_SECOND}",
			" * @后台人员: $1 ",
			"!-->",
			"<template>",
				"<div class=''>",
					"<el-dialog v-el-drag-dialog :visible.sync='dialog_cof.visible' :title='dialog_cof.title'",
						":destroy-on-close='dialog_cof.destroy' :close-on-click-modal='dialog_cof.modal'>",
					"</el-dialog>",
				"</div>",
			"</template>",

			"<script>",
				"import Pagination from '@/components/Pagination'",
				"import waves from '@/directive/waves'",
				"import permission from '@/directive/permission'",
				"import elDragDialog from '@/directive/el-drag-dialog'",
				"import { valid_error_msg } from '@/utils/valid-error-msg'",
				"import { } from '@/utils/validate'",
				"export default {",
					"components: { Pagination },",
					"directives: { waves, permission, elDragDialog },",
					"data() {",
						"return {",
							"dialog_cof: {",
								"visible: true,",
								"title: '新增',",
								"escape: false,",
								"destroy: true,",
								"modal: false",
							"}",
						"};",
					"},",
					"methods: {",

					"},",
					"mounted() {",

					"},",
				"}",
			"</script>",
			"<style lang='scss' scoped>",

			"</style>"
		],
		"description": "Log output to console"
	}
}