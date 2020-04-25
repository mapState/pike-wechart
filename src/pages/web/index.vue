<template>
  <div class="container">
    <web-view :src="link"></web-view>
  </div>
</template>

<script>
export default {

  data() {
    return {
      link:''
    };
  },
  mounted() {
    this.link =decodeURIComponent(this.$mp.query.link) ;
    console.log(this.link)
  }
};
</script>

