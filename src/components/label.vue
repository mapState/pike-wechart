<template>
  <div class="contain">
    <div class="label label1">{{type}}</div>
  </div>
</template>

<script>
export default {
  props: ["type"],
  data(){
    return {
      labelType:1
    }
  },
  methods: {
  },
  mounted() {
    this.labelType=parseInt(this.type/4)+1;
  }
};
</script>

<style lang="scss" scoped>
.contain {
  display: inline-block;
  vertical-align: middle;
  
  .label {
    line-height: 15px;
    text-align: center;
    font-size:8px;
    border-radius:8px;
    color: #fff;
    padding: 1px 4px;
    
  }
  .label1 {
    background: linear-gradient(
      0deg,
      rgba(253, 177, 132, 1),
      rgba(251, 122, 123, 1)
    );
  }
  .label2 {
    background:linear-gradient(0deg,rgba(255,183,73,1),rgba(250,98,59,1));
  }
  .label3 {
    background:linear-gradient(0deg,rgba(255,200,73,1),rgba(248,145,6,1));
  }
  .label4 {
    background:linear-gradient(0deg,rgba(142,205,246,1),rgba(32,167,214,1));
  }
  .label5 {
    background:linear-gradient(0deg,rgba(117,243,133,1),rgba(5,172,116,1));
  }
  .label6 {
    background:linear-gradient(0deg,rgba(241,151,177,1),rgba(175,106,235,1));
  }
  .label7 {
    background:linear-gradient(0deg,rgba(47,204,221,1),rgba(55,122,239,1));
  }
  .label8 {
    background:linear-gradient(0deg,rgba(255,180,48,1),rgba(253,29,17,1));
  }
}
</style>

