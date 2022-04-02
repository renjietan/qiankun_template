import enterFloat from './enterFloat'

const install = function(Vue) {
  Vue.directive('enterFloat', enterFloat)
}

if (window.Vue) {
  window['enterFloat'] = enterFloat
  Vue.use(install); // eslint-disable-line
}

enterFloat.install = install
export default enterFloat
