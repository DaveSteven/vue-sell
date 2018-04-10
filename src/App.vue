<template>
  <div id="app" :class="detailDisplay ? 'blur':''">
    <v-header :seller="seller" @detail-display-control="detailDisplayControl"></v-header>
    <div tab class="border-1px">
      <div tab-item>
        <router-link to="/goods">商品</router-link>
      </div>
      <div tab-item>
        <router-link to="/ratings">评价</router-link>
      </div>
      <div tab-item>
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller" />
    </keep-alive>
  </div>
</template>

<script>
import header from '@/components/header/header';

export default {
  name: 'App',
  components: {
    'v-header': header
  },
  data() {
    return {
      seller: {},
      detailDisplay: false
    };
  },
  methods: {
    fetchData() {
      this.$http.get('/api/seller').then(res => {
        this.seller = res.data;
      }).catch(err => {
        console.log(err);
      });
    },
    detailDisplayControl(directive) {
      this.detailDisplay = directive;
    }
  },
  created() {
    this.fetchData();
  }
};
</script>

<style lang="stylus">
@import './common/stylus/mixin.styl';

[tab]
  display: flex
  height: 80px
  line-height: 80px
  align-items: center
  border-1px(rgba(7, 17, 27, 0.1))

  [tab-item]
    flex: 1
    text-align: center
    
    & > a
      display: block
      font-size: 28px
      color: rgb(77, 85, 93)

      &.active
        color: rgb(240, 20, 20)
    
</style>

