<template>
  <div>
    <div class="elder_box">
      <div class="elder-item" v-for="(v, i) in elder" :key="i">
        <div class="avator">
          <img v-if="!!v.headUrl" :src="v.headUrl" alt="" srcset="" />
        </div>
        <p class="name">
          {{ v.elderName }}
        </p>
      </div>
    </div>
    
     <div slot="footer" class="dialog-footer">
        <el-button @click="exit">取 消</el-button>
      </div>
  </div>
</template>
<script>
export default {
  props: {
    elder: {
      type: Array,
      default: [],
    },
  },
  methods:{
      exit(){
          this.$emit('exit')
      }
  }
};
</script>
<style lang="scss">
.elder_box {
  width: 859px;
  height: 500px;
  border: 1px solid #dedede;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  .elder-item {
    width: 120px;
    height: 150px;
    border: 1px solid #dedede;
    margin-left: 12px;
    display: flex;
    align-items: center;
    flex-direction: column; 
    .avator {
      margin-top: 20px;
      width: 80px;
      height: 80px;
      overflow: hidden;
      border-radius: 50%;
     
      img {
        width: 100%;
        height: auto;
      }
    }
  }

}
  .dialog-footer{
      margin-top: 12px;
    text-align: center;
  }
</style>