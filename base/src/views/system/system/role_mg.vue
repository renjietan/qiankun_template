<!-- 
 * @description: 角色权限管理
 * @fileName: role_mg.vue 
 * @author: 王文涛 
 * @date: 2021-05-31 16:02:41
 * @后台人员:  岳喜多
!-->
<template>
  <div class="container">
    <div class="container_card">
      <el-row :gutter="40">
        <el-col :span="23">
          <div class="title">角色权限管理（默认）</div>
        </el-col>
        <el-col :span="1">
          <el-button type="primary" @click="handleSubmit()">保存</el-button>
        </el-col>
      </el-row>
    </div>
    <el-row :gutter="40">
      <el-col :span="6">
        <div class="left-box">
          <div class="left-box-title">
            <div class="title" style="font-size: 14px; width: 100%; text-align: left">
              角色列表（职位）
            </div>
            <el-tree ref="newTop" class="el-tree-custom" :props="props_job" :data="departmentInfo" node-key="id"
              :expand-on-click-node="false" @node-click="nodeClick" :default-checked-keys="defaultCheckDepart">
            </el-tree>
          </div>
        </div>
      </el-col>
      <el-col :span="9">
        <div class="center-box">
          <div class="center-box-title">
            <div class="title" style="font-size: 14px">菜单权限</div>
            <el-tree class="el-tree-custom" :props="props_menu" :data="permission_routes" show-checkbox node-key="id"
              ref="newTopRightsTree" :expand-on-click-node="false" :default-checked-keys="defaultCheck">
            </el-tree>
          </div>
        </div>
      </el-col>
      <el-col :span="9">
        <div class="right-box">
          <div class="right-box-title">
            <div class="title" style="font-size: 14px">接受消息</div>
            <el-tree class="el-tree-custom" :props="props_mess" :data="message_tree" show-checkbox node-key="id"
              :expand-on-click-node="false">
            </el-tree>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import Pagination from "@/components/Pagination";
  import waves from "@/directive/waves";
  import permission from "@/directive/permission";
  import elDragDialog from "@/directive/el-drag-dialog";
  import { valid_error_msg } from "@/utils/valid-error-msg";
  import { } from "@/utils/validate";
  import { menu_auth } from "@/api/system/menu-auth";
  import { get_organize } from "@/api/pensionagency/administrative/administrative";
  import { addPer } from "@/api/system/auth";
  import { by_pos_id } from "@/api/system/account-position";
  import { mapGetters } from "vuex";

  export default {
    name: "system_role_mg",
    components: { Pagination },
    directives: { waves, permission, elDragDialog },
    data() {
      return {
        flt: {
          search: "",
        },
        props_menu: {
          label: function (data, node) {
            return data.title ? data.title : data.path;
          },
        },
        props_job: {
          label: "title",
          children: "positions",
        },
        props_mess: {},
        defaultCheck: [],
        defaultCheckDepart: [],
        departmentInfo: [],
        permission_routes: [],
        message_tree: [],
        role_tree: [],
        tempArr: [],
        count: 10,
        posId: null,
        loading: false,
        dialog_cof: {
          visible: false,
          title: "新增",
          escape: false,
          destroy: true,
          modal: false,
        },
      };
    },
    computed: {
      ...mapGetters(["userInfo"]),
    },
    methods: {
      getMenu() {
        menu_auth().then((res) => {
          this.permission_routes = res;
        });
      },

      getDepart() {
        get_organize().then((res) => {
          console.log(res);
          this.departmentInfo = this.process(res.departmentInfo);
        });
      },
      getshowMenu() {
        this.$nextTick(() => {
          this.$refs.newTopRightsTree.setCheckedKeys([]);
        });
        by_pos_id({ posId: this.posId }).then((res) => {
          this.defaultCheck = res;
        });
      },
      handleSubmit() {
        if (!!this.posId) {
          addPer({
            posId: this.posId,
            auth: this.$refs.newTopRightsTree.getCheckedKeys(),
          }).then((res) => {
            this.$message({
              message: "添加成功",
              type: "success",
            });
          });
        } else {
          this.$message({
            message: "请勾选菜单或职位",
            type: "error",
          });
        }
      },

      nodeClick(data) {
        this.$nextTick(() => {
          this.$refs.newTop.setCheckedKeys([]);
        });
        this.$nextTick(() => {
          this.$refs.newTopRightsTree.setCheckedKeys([]);
        });
        this.posId = null;
        if (!!data.id) {
          this.posId = data.id;
          this.getshowMenu();
        }
      },
      process(data) {
        return data.map((e) => {
          e.title = e.departmentName || e.positionName;
          if (!!e.positions) {
            this.process(e.positions);
          }
          return e;
        });
      },
    },
    mounted() {
      this.getMenu();
      this.getDepart();
      this.defaultCheckDepart = [this.userInfo.posId];
      this.posId = this.userInfo.posId;
      this.getshowMenu();
    },
  };
</script>
<style lang='scss' scoped>
</style>