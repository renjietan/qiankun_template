import { MessageBox, } from 'element-ui'
function openMsg(renderDom) {
    MessageBox({
        center: true,
        message: renderDom('div', {
            class: "ctm_msgbox"
        }, [
            renderDom("i", {
                class: "el-icon-check"
            }),
            renderDom("p", {
                class: "ctm_label"
            }, "签约合同成功")
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
            Promise.resolve(instance)
            done()
            // if (action === 'confirm') {
            //     instance.confirmButtonLoading = true;
            //     instance.confirmButtonText = '执行中...';
            //     setTimeout(() => {
            //         done();
            //         setTimeout(() => {
            //             instance.confirmButtonLoading = false;
            //         }, 300);
            //     }, 3000);
            // } else {
            //     done();
            // }
        }
    }).then(action => {
        resolve(action)
    });
}
export default openMsg