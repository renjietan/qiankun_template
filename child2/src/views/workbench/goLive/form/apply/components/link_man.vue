<!-- 
 * @description: 联系人 
 * @fileName: link_man.vue 
 * @author: 谭人杰 
 * @date: 2021-05-28 16:48:03
 * @后台人员:  
!-->
<template>
  <div>
    <el-form :inline="true" ref="form" :model="form"   hide-required-asterisk status-icon>
      <div v-for="(item, index) in form.form_datas" :key="index">
        <div style="display: flex; justify-content: space-between">
          <el-button icon="el-icon-zhengjian" disabled v-waves type="warning">读取证件</el-button>
          <div>
            <el-button icon="el-icon-delete" style="margin-right: 10px; padding: 10px 15px" class="red-btn" v-waves
              type="danger" @click="handleDel(index)">删除联系人</el-button>
            <el-button v-if="index == 0" icon="el-icon-plus" v-waves type="primary" @click="handleCreate()">添加联系人
            </el-button>
          </div>
        </div>
        <div style="margin-top: 20px" @click="getindex(index)">
          <el-row :gutter="20">
            <el-col :span="4">
              <el-form-item label="姓名" class="must-fill" :prop="'form_datas.' + index + '.name'" :rules="{
                    required: true,
                    message: '请输入',
                    trigger: 'change',
                  }">
                <el-input v-model="item.name" placeholder="请输入姓名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item :prop="'form_datas.' + index + '.sex'" label="性别" class="must-fill" :rules="{
                  required: true,
                  message: '请选择性别',
                  trigger: 'change',
                }">
                <el-checkbox-group v-model="item.sex" :max="1">
                  <el-checkbox label="男" border></el-checkbox>
                  <el-checkbox label="女" border></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="与长者关系" class="must-fill" :prop="'form_datas.' + index + '.relation'" :rules="{
                  required: true,
                  message: '请输入长者关系',
                  trigger: 'change',
                }">
                <el-select clearable v-model="item.relation" placeholder="请选择与长者的关系">
                  <el-option v-for="item in relationList" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="是否为付款人" class="must-fill" :prop="'form_datas.' + index + '.isPayer'" :rules="{
                  required: true,
                  message: '请输入名称',
                  trigger: 'change',
                }">
                <el-select clearable v-model="item.isPayer" placeholder="请选择付款人">
                  <el-option v-for="item in isPayerList" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="联系人类型" class="must-fill" :prop="'form_datas.' + index + '.contactType'" :rules="{
                  required: true,
                  message: '请输入联系人类型',
                  trigger: 'change',
                }">
                <el-select clearable v-model="item.contactType" placeholder="请选择类型">
                  <el-option v-for="item in contactList" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item :prop="'form_datas.' + index + '.sort'" :rules="{
                  required: true,
                  message: '请选择联系人顺序',
                  trigger: 'change',
                }" label="联系人顺序" class="must-fill">
              <el-select v-model="item.sort" placeholder="请选择">
                <el-option
                  v-for="item in link_man_list"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="4">
              <el-form-item :prop="'form_datas.' + index + '.phone'" :rules="{
                  validator:isPhone,
                  required: true,
                  message: '请输入手机号',
                  trigger: 'change',
                }" label="手机号" class="must-fill">
                <el-input v-model="item.phone" placeholder="请输入正确的手机号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item :prop="'form_datas.' + index + '.telephone'" label="固定电话" class="default" :rules="{
                  validator:isPhone_maybeNull,
                  message: '请输入正确的手机号',
                  trigger: 'change',
                }">
                <el-input v-model="item.telephone" placeholder="请输入固定电话"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item :prop="'form_datas.' + index + '.papersType'" :rules="{
                  required: true,
                  message: '请输入证件类型',
                  trigger: 'change',
                }" label="证件类型" class="must-fill">
                <el-select clearable v-model="item.papersType" placeholder="请选择证件类型">
                  <el-option v-for="item in id_list" :key="item.type" :label="item.desc" :value="item.type"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item :prop="'form_datas.' + index + '.papersCode'" :rules="{
                    validator: isCert_code ,
                    trigger: 'change',
                  }" label="证件号码" class="must-fill">
                <el-input v-model="item.papersCode" placeholder="请输入证件号码"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item :prop="'form_datas.' + index + '.address'" label="居住地址" class="optional">
                <el-input v-model="item.address" placeholder="请输入居住地址"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item :prop="'form_datas.' + index + '.unit'" label="工作单位" class="default">
                <el-input class="long_input" v-model="item.unit" placeholder="请输入工作单位"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :getter="20">
            <el-col :span="4">
              <el-form-item class="default" :prop="'form_datas.' + index + '.idHead'" label="身份证正面" >
                <el-upload class="avatar-uploader" action :show-file-list="false" :http-request="UploadPic">
                  <img v-if="item.idHead" :src="item.idHead" class="avatars"  />
                  <i v-else class="el-icon-plus avatar-uploader-icon upload_icon">
                    <div class="uploader_desc">上传正面</div>
                  </i>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item class="default" :prop="'form_datas.' + index + '.idTail'" label="身份证反面" >
                <el-upload :id="index" class="avatar-uploader" action :show-file-list="false"
                  :http-request="UploadPic1">
                  <img v-if="item.idTail" :src="item.idTail" class="avatars" />
                  <i v-else class="el-icon-plus avatar-uploader-icon upload_icon">
                    <div class="uploader_desc">上传反面</div>
                  </i>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item class="default" label="户口本首页" :prop="'form_datas.' + index + '.bookletFirst'">
                <el-upload class="avatar-uploader" action :show-file-list="false" :http-request="UploadPic2">
                  <img v-if="item.bookletFirst" :src="item.bookletFirst" class="avatars" />
                  <i v-else class="el-icon-plus avatar-uploader-icon upload_icon">
                    <div class="uploader_desc">上传首页</div>
                  </i>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item class="default" label="户口本本人页" :prop="'form_datas.' + index + '.bookletOneself'">
                <el-upload class="avatar-uploader" action :show-file-list="false" :http-request="UploadPic3">
                  <img v-if="item.bookletOneself" :src="item.bookletOneself" class="avatars" />
                  <i v-else class="el-icon-plus avatar-uploader-icon upload_icon">
                    <div class="uploader_desc">上传本人页</div>
                  </i>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-form>
    <!-- <link-man-item v-for="(item, index) in items" :key="index" :items="item" :index="index"
      @deleteIndex="handleAction('删除联系人', index)">
    </link-man-item> -->

    <div class="footer">
      <el-button type="primary" @click="handleSubmit">保 存</el-button>
    </div>
  </div>
</template>
<script>
  import Pagination from "@/components/Pagination";
  import waves from "@/directive/waves";
  import { valid_error_msg } from "@/utils/valid-error-msg";
  import { } from "@/utils/validate";
  import { id_type_list, upload_pic } from "@/api/pensionagency/administrative/administrative";
  import { arrayGroupBy } from "@/utils/index";
  import { add_live_linkMan, get_live_linkMan } from "@/api/pensionagency/goLive/goLive";
  import linkManItem from "./components/link_man_item.vue";
  import { data } from "@/utils/common";

  import { isTrue, contactList, relationList, uploadType ,link_man_list} from "@/utils/enum";
  import {
    isCert_code,
    isPhone,
    isOldman_name,
    isPhone_maybeNull
  } from "@/utils/validate";
  export default {
    name: "link_man",
    components: { Pagination, linkManItem },
    directives: { waves },


    data() {
      return {
        link_man_list,
        isPayerList: isTrue,
        contactList,
        relationList,
        id_list: [],
        step: undefined,
        dindex:0,
        form: {
          form_datas: [
            {
              address: undefined, //居住地址
              bookletFirst: undefined, //户口本首页
              bookletOneself: undefined, //户口本人页
              contactType: undefined, //联系人类型
              idHead: undefined, //身份证正面
              idTail: undefined, //身份证反面
              isPayer: undefined, //是否为付款人
              name: undefined, //	联系人姓名
              papersCode: undefined, //证件号码
              papersType: undefined, //证件类型
              phone: undefined, //手机号
              relation: undefined, //与老人关系
              sort: undefined, //	联系人顺序
              telephone: undefined, //	固定电话
              unit: undefined, //	工作单位
              sex: [], //性别
            },
          ],
        },
        isCert_code,
          rules: {
          papersCode: [
            { trigger: "change", validator: isCert_code },
          ],
        },
        isPhone,
        isOldman_name,
        isPhone_maybeNull,
        required: true,
        elderId: undefined,
      };
    },
    watch: {
      form: function (n) {
      }
    },
    methods: {
      getindex(index){
        console.log(index);
        this.dindex = index;
      },
      UploadPic(file) {
        let self = this;
        let formData = new FormData();
        formData.append("file", file.file);
        formData.append("fileType", uploadType["员工身份证正面"]);
        upload_pic(formData).then((res) => {
          
          self.form.form_datas[self.dindex].idHead = res;
          self.$notify({
            title: "提示",
            message: "上传成功",
            type: "success",
          });
        });
      },

      UploadPic1(file) {       
        let self = this;
        let formData = new FormData();
        formData.append("file", file.file)
        formData.append("fileType", uploadType["员工身份证反面"]);
        console.log(self.dindex);
        upload_pic(formData).then((res) => {

          self.form.form_datas[self.dindex].idTail = res;
          self.$notify({
            title: "提示",
            message: "上传成功",
            type: "success",
          });
        });
      },
      UploadPic2(file) {
        let self = this;
        let formData = new FormData();

        formData.append("file", file.file);
        formData.append("fileType", uploadType["员工户口本正面"]);
        upload_pic(formData).then((res) => {

          self.form.form_datas[self.dindex].bookletFirst = res;
          self.$notify({
            title: "提示",
            message: "上传成功",
            type: "success",
          });
        });
      },
      UploadPic3(file) {
        let self = this;
        let formData = new FormData();
        formData.append("file", file.file);
        formData.append("fileType", uploadType["员工户口本反面"]);
        upload_pic(formData).then((res) => {
          self.form.form_datas[self.dindex].bookletOneself = res;
          self.$notify({
            title: "提示",
            message: "上传成功",
            type: "success",
          });
        });
      },
      handleCreate() {
        let self = this;
  
        this.setOnceForm();
      },
      handleDel(index) {
        this.$confirm(`删除后需保存，是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$notify({
            type: 'success',
            message: '操作成功!',
            title: ""
          });
          this.form.form_datas = this.form.form_datas.filter(
            (item, i) => i != index
          );
        }).catch(() => {
          this.$message({
            type: 'info',
            message: "已取消"
          });
        });

      },
      idTypeList() {
        id_type_list().then((res) => {
          this.id_list = res ?? [];
        });
      },
     
      setOnceForm() {
        this.form.form_datas.push({
          address: undefined, //居住地址
          bookletFirst: undefined, //户口本首页
          bookletOneself: undefined, //户口本人页
          contactType: undefined, //联系人类型
          idHead: undefined, //身份证正面
          idTail: undefined, //身份证反面
          isPayer: undefined, //是否为付款人
          name: undefined, //	联系人姓名
          papersCode: undefined, //证件号码
          papersType: undefined, //证件类型
          phone: undefined, //手机号
          relation: undefined, //与老人关系
          sort: undefined, //	联系人顺序
          telephone: undefined, //	固定电话
          unit: undefined, //	工作单位
          sex: [], //性别
        });
      },
      handleSubmit() {
        if (this.elderId) {
          // console.log(this.$refs["form"].validate);
          this.$refs["form"].validate((isvaild) => {
            if (isvaild) {
              let params = this.form.form_datas.map((el) => {
                el.elderId = this.elderId;
                el.sex = el.sex[0] === "男" ? "0" : "1";
                el.sort = Number(el.sort);
                return el;
              });
              add_live_linkMan(params).then((res) => {
                this.$message({
                  message: "添加成功",
                  type: "success",
                });
              });
            }
          });
        } else {
          this.$message({
            message: "长者信息不存在,请添加长者",
            type: "warning",
          });
        }
      },
      getDetail() {
        let self = this;
        get_live_linkMan({ elderId: this.elderId }).then((res) => {
          if (res?.length != 0) {
            self.form.form_datas = res.map((item) => {
              item.sex = item.sex == 0 ? ["男"] : ["女"];
              return item;
            });
          }
        });
      },

    },
    mounted() {
      const { id, step } = this.$route.params;
      this.step = step
      if (!isNaN(Number(id))) {
        this.elderId = id;

        this.getDetail();

      }
      this.idTypeList();
    },
  };
</script>
<style lang='scss' scoped>
.width {
    width: 120px;
  }

  .upload_icon {
    width: 240px;
    height: 150px;
    line-height: 120px;
    font-size: 40px;
  }

  .margin-top {
    margin-top: 15px;
  }
</style>