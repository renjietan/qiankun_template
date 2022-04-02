<!-- 
 * @description: 兴趣爱好 
 * @fileName: hobby.vue 
 * @author: 姜纬杰 
 * @date: 2021-05-28 16:48:03
 * @后台人员:  
!-->
<template>
  <div>
    <div style="margin-top: 20px">
      <el-form :inline="true" ref="form" hide-required-asterisk status-icon>
        <el-row>
          <div class="title">书籍相关</div>
          <el-form-item>
            <el-checkbox-group v-model="form_data.book.hobbyIds">
              <el-checkbox label="看书" border></el-checkbox>
              <el-checkbox label="小说" border></el-checkbox>
              <el-checkbox label="杂志" border></el-checkbox>
              <el-checkbox label="报纸" border></el-checkbox>
              <el-checkbox label="书法" border></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item>
            <el-input v-model="form_data.book.other" placeholder="请输入其他书籍相关"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <div class="title">影视相关</div>

          <el-form-item>
            <el-checkbox-group v-model="form_data.movies.hobbyIds">
              <el-checkbox label="电视" border></el-checkbox>
              <el-checkbox label="电影" border></el-checkbox>
              <el-checkbox label="潮剧" border></el-checkbox>
              <el-checkbox label="新闻" border></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item>
            <el-input v-model="form_data.movies.other" placeholder="请输入其他影剧类型"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <div class="title">音乐相关</div>

          <el-form-item>
            <el-checkbox-group v-model="form_data.music.hobbyIds">
              <el-checkbox label="唱歌" border></el-checkbox>
              <el-checkbox label="听歌" border></el-checkbox>
              <el-checkbox label="奏乐器" border></el-checkbox>
              <el-checkbox label="跳舞" border></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item>
            <el-input v-model="form_data.music.other" placeholder="请输入其他音乐类型"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <div class="title">运动相关</div>

          <el-form-item>
            <el-checkbox-group v-model="form_data.sports.hobbyIds">
              <el-checkbox label="健身" border></el-checkbox>
              <el-checkbox label="跑步" border></el-checkbox>
              <el-checkbox label="球类" border></el-checkbox>
              <el-checkbox label="游泳" border></el-checkbox>
              <el-checkbox label="爬山" border></el-checkbox>
              <el-checkbox label="划船" border></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item>
            <el-input v-model="form_data.sports.other" placeholder="请输入其他运动类型"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <div class="title">休闲相关</div>

          <el-form-item>
            <el-checkbox-group v-model="form_data.free_time.hobbyIds">
              <el-checkbox label="旅游" border></el-checkbox>
              <el-checkbox label="麻将" border></el-checkbox>
              <el-checkbox label="扑克" border></el-checkbox>
              <el-checkbox label="棋类" border></el-checkbox>
              <el-checkbox label="摄像" border></el-checkbox>
              <el-checkbox label="手工" border></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item>
            <el-input v-model="form_data.free_time.other" placeholder="请输入其他休闲类型"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <div class="title">养生相关</div>

          <el-form-item>
            <el-checkbox-group v-model="form_data.health.hobbyIds">
              <el-checkbox label="美容" border></el-checkbox>
              <el-checkbox label="化妆" border></el-checkbox>
              <el-checkbox label="保养" border></el-checkbox>
              <el-checkbox label="睡觉" border></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item>
            <el-input v-model="form_data.health.other" placeholder="请输入其他养生类型"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <div class="title">饮食相关</div>

          <el-form-item>
            <el-checkbox-group v-model="form_data.diet.hobbyIds">
              <el-checkbox label="美食" border></el-checkbox>
              <el-checkbox label="饮酒" border></el-checkbox>
              <el-checkbox label="吸烟" border></el-checkbox>
              <el-checkbox label="做饭" border></el-checkbox>
              <el-checkbox label="做点心" border></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item>
            <el-input v-model="form_data.diet.other" placeholder="请输入其他饮食类型"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <div class="title">农乐相关</div>
          <el-form-item>
            <el-checkbox-group v-model="form_data.agritainment.hobbyIds">
              <el-checkbox label="钓鱼" border></el-checkbox>
              <el-checkbox label="养鱼" border></el-checkbox>
              <el-checkbox label="养宠物" border></el-checkbox>
              <el-checkbox label="织绣" border></el-checkbox>
              <el-checkbox label="做服饰" border></el-checkbox>
              <el-checkbox label="种花草" border></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item>
            <el-input v-model="form_data.agritainment.other" placeholder="请输入其他农乐类型"></el-input>
          </el-form-item>
        </el-row>
      </el-form>
    </div>

    <div class="footer">
      <el-button :disabled="step >= 7 ? 'disabled' : false" type="primary" @click="handleSubmit">保 存</el-button>
    </div>
  </div>
</template>
<script>
  import Pagination from "@/components/Pagination";
  import waves from "@/directive/waves";
  import { valid_error_msg } from "@/utils/valid-error-msg";
  import { } from "@/utils/validate";
  import { arrayGroupBy } from "@/utils/index";
  import { dict } from '@/utils/enum'
  import { add_live_hobby, get_live_hobby } from "@/api/pensionagency/goLive/goLive";
  export default {
    name: "hobby",
    components: { Pagination },
    directives: { waves },
    data() {
      return {
        step: undefined,
        required: true,
        form_data: {
          id: undefined,
          book: {
            //书籍
            other: "",
            hobbyType: "书籍",
            hobbyIds: [],
          },
          movies: {
            //影视
            other: "",
            hobbyType: "影视",
            hobbyIds: [],
          },
          music: {
            //音乐
            other: "",
            hobbyType: "音乐",
            hobbyIds: [],
          },
          sports: {
            //运动
            other: "",
            hobbyType: "运动",
            hobbyIds: [],
          },
          free_time: {
            //休闲
            other: "",
            hobbyType: "休闲",
            hobbyIds: [],
          },
          health: {
            //养生
            other: "",
            hobbyType: "养生",
            hobbyIds: [],
          },
          diet: {
            //饮食
            other: "",
            hobbyType: "饮食",
            hobbyIds: [],
          },
          agritainment: {
            //农乐
            other: "",
            hobbyType: "农乐",
            hobbyIds: [],
          },
        },
      };
    },

    methods: {
      handleSubmit() {
        let hobbyInfo = [];
        if (this.form_data.id) {
          let hobbyInfo = Object.values(this.form_data).filter(
            (item) => item?.hobbyIds?.length > 0
          );
          add_live_hobby({ elderId: this.form_data.id, hobbyInfo }).then(
            (res) => {
              this.$message({
                message: "添加成功",
                type: "success",
              });
            }
          );
        } else {
          this.$message({
            message: "长者信息不存在,请添加长者",
            type: "warning",
          });
        }
      },

      getDetail() {
        get_live_hobby({
          elderId: this.form_data.id,
        }).then((res) => {
          let { hobbyInfo } = res;
          for (let item of hobbyInfo) {
            let key = dict[item.hobbyType];
            this.form_data[key] = item;
          }
        });
      },
    },
    mounted() {
      const { id, step } = this.$route.params;
      this.step = step
      if (!isNaN(Number(id))) {
        this.form_data.id = id;

        this.getDetail();

      }
    },
  };
</script>
<style lang='scss' scoped>
  .title {
    color: #333333;
    font-size: 14px;
    font-weight: Medium;
    margin-bottom: 10px;
  }

  .upload_icon {
    width: 240px;
    height: 150px;
    line-height: 120px;
    font-size: 40px;
  }
</style>