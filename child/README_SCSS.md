- 变量
  ```
    $base-color: red;
    $base-position: bottom;
    .main {
        color: $base-color,
        border-#{$base-position}: 1px solid blue
    }
  ```


- 嵌套
  ```
    a { &:hover { color:red; }}
  ```
  
- 深度查找
  ```
    /deep/ .element-button {
        background: red
    }
  ```

- !global & !default
    - !global：提升为全局变量
    - !default: 未赋值时，可赋值，赋值后，再进行赋值时，将无效


- 混入
  ```
    @mixin radius ($radius: 10px) {
      border-radius: $radius;
    }
    @include border-radius(20px)

    - 继承、复用
    %test {
      border: 1px solid #ccc;
      padding: 10px;
      color: #333;
    }
    .box {
      @extend %test;
    }
  ```

- 函数式
  ```
    @function double($n) {
      @return $n * 2
    }
  ```

- 内置函数
  ```
    lighten(green, 10%);            #表示绿色变浅10%
    darken(green, 10%);             #表示绿色加深10%
  ```

- 判断
  ```
    $type: 3;
    p {
      @if $type == 1 {
        color: red;
      } @else if $type == 2 {
        color: blue;
      } @else if $type == 3 {
        color: green;
      } @else {
        color: black;
      }
    }
  ```

- 循环
    - for循环
      ```
        $test: test !default;
        @for $i from 1 through 4 { 
            .#{$test}-#{$i}{ 
                width: 60px + $i; 
            }}
        @for $i from 1 to 4 { 
            .#{$test}-#{$i}{ 
                width: 60px + $i; 
            }}
        - while 循环
        $nums: 4;
        $test: 20px;
        $while $nums > 0 {
            .while-#{$nums} {
                witdh: $test + $nums
                $nums: $nums - 1
            }
        }
      ```
    - each 循环
      ```
        $list: test1 test2 test3 test4 test5;
        @mixin images {
            @each $img in $list {
                background: url("/images/avatars/#{$img}.png") no-repeat;
            }
        }
        .main {
            @include images;
        }
      ```
