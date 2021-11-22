import Vue from 'vue'
import Clipboard from 'clipboard'

/**
 * @functionName 复制成功
 * @author 谭人杰
 * @date 2020-06-10 10:59:56
*/
function clipboardSuccess() {
  Vue.prototype.$message({
    message: '内容已复制',
    type: 'success',
    duration: 1500
  })
}
/**
 * @functionName 复制失败
 * @author 谭人杰
 * @date 2020-06-10 10:59:56
*/
function clipboardError() {
  Vue.prototype.$message({
    message: '复制失败',
    type: 'error'
  })
}
/**
 * @functionName 复制
 * @param {} text
 * @param {} event
 * @description 
 * @author 谭人杰
 * @date 2020-06-10 11:00:46
*/
export default function handleClipboard(text, event) {
  const clipboard = new Clipboard(event.target, {
    text: () => text
  })
  clipboard.on('success', () => {
    clipboardSuccess()
    clipboard.destroy()
  })
  clipboard.on('error', () => {
    clipboardError()
    clipboard.destroy()
  })
  clipboard.onClick(event)
}
