<!-- 
 * @description: 登录
 * @fileName: index.vue 
 * @author: 胡洁 
 * @date: 2021-07-23 09:37:06
 * @后台人员:  
!-->
<template>
  <div class="login-container">
    <div class="login-container-box">
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-container-box-form" autocomplete="on"
        label-position="left">
        <div class="login-container-box-form-title">
          安居智慧颐养平台
        </div>
        <div class="login-container-box-form-subtitle">账号登录</div>
        <div class="login-container-box-form-line"></div>
        <div class="login-container-box-form-inputTitle" style="padding-top: 15px;">账号</div>
        <el-form-item prop="username" class="login-container-box-form-item">
          <el-input ref="username" v-model="loginForm.username" placeholder="请输入职工账号" name="username" type="text"
            tabindex="1" autocomplete="on" />
        </el-form-item>
        <div class="login-container-box-form-inputTitle">密码</div>
        <el-form-item prop="password" class="login-container-box-form-item">
          <el-input ref="password" v-model="loginForm.password" type="password" placeholder="密码" name="password"
            tabindex="2" autocomplete="on" @keyup.enter.native="handleLogin" />
        </el-form-item>
        <!-- <el-form-item prop="username">
          <span>验证码:（不区分大小写） </span>
          <div class="Ver_Code">
            <el-input ref="Ver_Code" v-model="loginForm.Ver_Code" placeholder="请输入验证码" name="Ver_Code" type="text"
              tabindex="3" autocomplete="on">
            </el-input>
            <div class="code"></div>
          </div>
        </el-form-item> -->

        <el-button :loading="loading" type="primary" class="login-container-box-form-btn" @click.native.prevent="handleLogin">
          登陆
        </el-button>
      </el-form>
    </div>

  </div>
</template>

<script>
  import { valid_error_msg } from "@/utils/valid-error-msg";
  import md5 from "js-md5";
  import { mapGetters } from "vuex";
  export default {
    name: "Login",
    data() {
      return {
        loginForm: {
          username: "",
          password: "",
          Ver_Code: "",
        },
        loginRules: {
          username: [
            {
              required: true,
              trigger: "blur",
              message: valid_error_msg.login.username,
            },
          ],
          password: [
            {
              required: true,
              trigger: "blur",
              message: valid_error_msg.login.passWord,
            },
          ],
          Ver_Code: [
            {
              required: true,
              trigger: "blur",
              message: valid_error_msg.login.Ver_Code,
            },
          ],
        },
        loading: false,
        redirect: undefined,
        otherQuery: {},
      
      };
    },
    watch: {
      $route: {
        handler: function (route) {
          const query = route.query;
          if (query) {
            this.redirect = query.redirect;
            this.otherQuery = this.getOtherQuery(query);
          }
        },
        immediate: true,
      },
    },
    computed: {
      ...mapGetters(["permission_routes"]),
    },
    mounted() {
      if (this.loginForm.username === "") {
        this.$refs.username.focus();
      } else if (this.loginForm.password === "") {
        this.$refs.password.focus();
      }
    },

    methods: {
      handleLogin() {
        var self = this;
        self.$refs.loginForm.validate((valid) => {
          if (valid) {
            self.loading = true;
            var loginForm = { ...self.loginForm };
             loginForm.password = md5(loginForm.password);

            self.$store
              .dispatch("user/login", loginForm)
              .then((res) => {
                if(res.code===1){
                  self.$notify({
                    type:'error',
                    message:`${res.msg}`,
                    title:'警告'
                  })
                  self.loading = false;
                  return
                }
                // 跳转到退出前的页面
                // window.location.reload()
                // var temp = { path: self.redirect || "/", query: self.otherQuery };
                // self.$router.push(temp);

                //todo:
                //1、判断是总部账号还是机构账号
                //2、总部账号跳转到 “/select_team”
                //1、机构账号跳转到  { path: self.redirect || "/", query: self.otherQuery };

                switch(res.accountType){
                   case 'P':
                       self.$router.push("/select_team");
                     break;
                   case 'M':
                      self.$router.push({path:res.workPath});
                     break;
                   case "S":
                       self.$router.push("/select_team");
                     break;      
                }
              
                self.loading = false;
              })
              .catch(() => {
                self.loading = false;
              });
          } else {
            return false;
          }
        });
      },
      getOtherQuery(query) {
        return Object.keys(query).reduce((acc, cur) => {
          if (cur !== "redirect") {
            acc[cur] = query[cur];
          }
          return acc;
        }, {});
      },
    },
  };
</script>

<style lang="scss" scoped>
  .login-container {
    min-height: 100%;
    width: 100%;
    overflow: hidden;
    background: url("../../assets/images/login_bg.png") no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;

    &-box {
      width: 50%;
      margin-left: 50%;

      &-form {
        width: 55%;

        &-title {
          font-size: 30px;
          font-weight: bolder;
        }

        &-subtitle {
          font-size: 23px;
          margin-top: 60px;
        }

        &-line {
          width: 60px;
          margin: 10px 0 0 0;
          border: 2px solid blue;
        }

        &-inputTitle {
          margin: 40px 0 15px 0;
          font-size: 16px;
          font-weight: bolder;
          text-indent: 5px;
        }

        &-item {
          padding: 10px 0;
          background: white;
          border-radius: 50px;

          /deep/ .el-form-item__error {
            margin: 15px 0 0 20px;
          }

          /deep/ .el-input__inner {
            border: 0;
            border-radius: 50px;
            background: white;
          }

          /deep/ .el-textarea__inner:focus {
            border: 1px solid blue;
            outline: 0;
          }
        }
        &-btn {
          width: 100%;
          border-radius: 50px;
          font-size: 17px;
          padding: 15px 0;
          margin: 80px 0 0 0;
        }
      }
    }
  }
</style>