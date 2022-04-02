export function isFloat(rule, value, callback) {
    if (value === '') {
        callback(new Error('请输入'));
    } else {
        if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
    }
};