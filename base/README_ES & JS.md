### **基础变量篇**
- let && var && const && 函数作用域
  - let: 块级作用域
    - 由于let不存在变量提升，所以声明前无法使用
    - 暂时性死区（区块中存在let或const，会形成封闭区域）
    - 不允许重复声明
    - 不会造成变量泄漏
    - Exapmle
      ```
        case1:
          let a = 1
          let a = 2                 //不允许重复声明
        case2:
          cosole.log(a)             //由于let不存在变量提升，所以声明前无法使用
          let a = 1;
        case3:
          for(let i = 1; i < 10; i++) {
              console.log(i);
          }
          console.log(i);           // 块级作用域，此时i未定义
        case4:
          for(let i = 1; i < 10; i++) {
            setTimeout(() => {
              console.log(i)
            }, 1000)
          }                         // 区块中存在let或const，会形成封闭区域
      ```
  - var: 
    - 由于var存在变量提升，所以声明前可使用
    - 会造成意外的变量声明，造成不必要的内存负担
    - 允许重复声明
    - 容易造成变量泄漏
    - Example:
      ```
        case1:
          var a = 1
          var a = 2                 //可重复赋值
        case2:
          cosole.log(a)             // 变量提升
          var a = 1;
        case3:
          for(var i = 1; i < 10; i++) {
              console.log(i);
          }
          console.log(i);           //i相当于全局变量，变量泄漏
        case4:
          let dom_list = document.getElementsByClassName("class_button")
          for(var i = 1; i < dom_list; i++) {
            document.getElementsByClassName("a11y-nav")[0].onfocus = function() {
              console.log(i)
            }
          }
      ```

  - const:常量
    - 不允许被重新赋值
    - 由于const不存在变量提升，所以声明前无法使用
    - 不允许重复声明
    - 不会造成变量泄漏
    - Example:
      ```
        case1:
          const a = 1
          const a = 2 // 不允许重复声明
        case2:
          cosole.log(a) //变量声明前，无法使用
          const a = 1;
        case3:
          for(const i = 1; i < 10; i++) {
              this.data.push(i)
              console.log(this.data);
          } //变量被赋值后，无法改变
        case4:
          const a = {"b": 1}
          a.b = 2 //赋值成功，只对最外层的数据进行const声明
      ```
- 变量结构赋值
  - 字符串
    - 取值
      ```
        let [a, b, c] = "1,2,3,4";      // a = 1 & b = 2 & c = 3
      ```
    - 取字符串长度
      ```
        let {length} = "my"
        console.log(length);            // 2
      ```
  - 数组
    - 取值
      ```
        let [a,b,c] = [1,2,3,4]         // a = 1 & b = 2 & c = 3
      ```
    - 复杂性取值
      ```
        let [a,[b,c]] = [1,[2,3], 4]    // a = 1 & b = 2 & c = 3
      ```
    - 数组拼接
      ```
        [...[1,2,3], 1]                 // [1,2,3,4]
        [...[1,2,3], ...[1]]            // [1,2,3,4]
      ```
    - 数组默认值
      ```
        [a = 1, b = 2] = []             // a = 1 & b = 2
        [a = 1, b = 2] = [3,4]          // a = 3 & b = 4
      ```
  - 对象
    - 赋值，属性名一致
      ```
        let { a, b } = { a: 1, b: 2 };          // a = 1 & b = 2 
      ```
    - 赋值，属性名不一致
      ```
        let {a: c, b: d} = { a: 1, b: 2 }       // c = 1 & d = 2 
      ```
    - 复杂性赋值
      ```
        { a : [{ aa,bb }] } = {
            a: [{
                aa: 1,
                bb: 5
            }]
        }
      ```
    - 默认值
      ```
        {a = 1, b =2 } = {a = 3}            // a = 3 & b =2
        {a:b =3 } = {a: 5}                  // a = 5
      ```
  - 函数
    - 不固定参数个数的传值
      ```
        test(...s){
            console.log(s);
        }
        test(1,2,3,4,5)             // [1,2,3,4,5]
      ```
    - 参数默认值
      - 固定顺序
        ```
          test(x, y = 2) {
              console.log(y)          
          }
          test(1)             // 2
        ```
      - 不固定顺序
        ```
          test({x, y = 2} = {x, y}) {
              console.log(x)
              console.log(y)
          }
          test({y = 3, x = 4})           // y = 3 & x = 4
        ```
- 任务队列
  ```
    setTimeout(() => {
        console.log("settimeout")    5
    })
    async function async1() {
        console.log(await async2())   // 3
        console.log('async1 end');   // 4
    }
    console.log("start")         // 1 
    async function async2() {
        return Promise.resolve('async2');
    }

    async1();

    new Promise(function (resolve) {
        resolve();
    }).then(function () {
        console.log('Promise then');   //2     
    });
  ```
- 常用函数
  - Set: 不重复列表结构
    ```
      let set =  new Set([1,2,2,1,3])
      console.log(set)      // [1,2,3]
    ```
  - proxy: 对象拦截器
    ```
      var test = new Proxy([], {
          get: function(params1, params2, params3) {

          },
          set: function(params1, params2, params3, params4) {

          }
      })
      test[0] = 1
    ```
  - promise: 异步编程
    ```
      test(a = 1) {
          return new Promise((resolve, reject) => {
              setTimeout(() => {
                  if (a == 1) {
                      resolve("111")
                  } else {
                      reject("222")
                  }
                  
              }, 3000)
          })
      }
      this.test(2).then(res => {

      }).catch(err => {
          
      })
    ```
  - Generator
    ```
      * test(a = 1) {
          yield a
          yield a + 1
      }
      test().next()
    ```
  - async/await
    ```
      test(){
          return new Promise((resolve,reject) => {
              setTimeout(function() {
                  resolve(1)
              }, 5000)
          })
      }
      async function test2() {
        var s = await this.test();
        console.log(s)        // 1
      }
    ```
  - Array.from
    ```
      Array.from("123")        // [1,2,3]
      Array.from(new Set([1,2,3,3]))      // [1,2,3]
      Array.from({length: 20}, function(item, index) {
        return index
      })      //1-20的数组 
    ```
  - reduce
    ```
      Array.from({length: 20},(item,index) => index + 1).reduce((cur,pre) => cur + pre, 0)      //210
    ```
  - 扁平化
    ```
      [[1],[2]].flat(Infinity) 
      [[1],[2]].toString()
    ```
  - 类型判断
    ```
      Object.prototype.toString.call(params)
    ```
  - 冻结
    ```
      let a = Object.freeze({})
    ```
  - 将一组指转为数组
    ```
      Array.of(1,2,3,4)
    ```
  - 循环
    ```
      for(let i of list) {

      }
    ```
  - 货币转换
    ```
      let a = 11111111.111111
      a.toLocaleString()
    ```
- 隐式转换
  - 变量相加
  - 判断
  - 变量相减
  - 变量相乘
  - 变量相除
- 自执行函数
  ```
    var b = 1
    (function b() {
      b = 2
      console.log(b)
    })()
  ```
- 闭包
  ```
    function test(params) {
      var a = function() {
        return params
      }
      return a
    }
  ```
  

