<template>
  <header header>
    <div content-wrapper>
      <div avatar w-128 aspectratio aspectratio-ratio="128/128">
        <div aspectratio-content>
          <img :src="seller.avatar" alt="" width="100%" height="100%">
        </div>
      </div>
      <div content>
        <div title>
          <span brand></span>
          <span name>{{ seller.name }}</span>
        </div>
        <div description>{{ seller.description }}/{{ seller.deliveryTime }}分钟送达</div>
        <div v-if="seller.supports" support>
          <v-icon :iconType="seller.supports[0].type" :iconNo="1"></v-icon>
          <span text>{{ seller.supports[0].description }}</span>
        </div>
      </div>
      <div v-if="seller.supports" support-count>
        <span count @click="displayControl(1)">{{ seller.supports.length }}个</span>
        <i class="iconfont icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div bulletin-wrapper @click="displayControl(1)">
      <div bulletin-title></div>
      <div bulletin-text>{{ seller.bulletin }}</div>
      <i class="iconfont icon-keyboard_arrow_right"></i>
    </div>
    <div background>
      <img :src="seller.avatar" alt="" width="100%" height="100%">
    </div>
    <transition name="fade">
      <div v-show="detailDisplay" detail>
        <div detail-wrapper class="clearfix">
            <div detail-main>
              <h1 name>{{ seller.name }}</h1>
              <div star-wrapper>
                <v-star :size="48" :score="seller.score"></v-star>
              </div>
              <div title>
                <div line></div>
                <div text>优惠信息</div>
                <div line></div>
              </div>
              <ul v-if="seller.supports" supports>
                <li support-item v-for="(item, index) in seller.supports" :key="index">
                  <v-icon :iconType="item.type" :iconNo="2"></v-icon>
                  <span>{{ item.description }}</span>
                </li>
              </ul>
              <div title>
                <div line></div>
                <div text>商家公告</div>
                <div line></div>
              </div>
              <div bulletin>
                {{ seller.bulletin }}
              </div>
            </div>
          </div>
          <div detail-close @click="displayControl(0)">
            <i class="iconfont icon-close"></i>
          </div>
      </div>
    </transition>
  </header>
</template>

<script>
import star from '../star/star';
import icon from '../icon/icon';

export default {
  components: {
    'v-star': star,
    'v-icon': icon
  },
  props: {
    seller: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      detailDisplay: false
    };
  },
  methods: {
    displayControl(directive) {
      if (directive) {
        this.detailDisplay = true;
      } else {
        this.detailDisplay = false;
      }
      
      this.$emit('detail-display-control', this.detailDisplay);
    }
  },
  mounted() {
    console.log(this.seller);
  }
};
</script>

<style lang="stylus">
@import '../../common/stylus/base.styl';
@import '../../common/stylus/mixin';

[header]
  position: relative
  font-size: 0
  overflow: hidden
  background: rgba(7, 17, 27, 0.5)

  [w-128]
    width: 128px

  [w-128]
    aspect-ratio: '128:128'

  [content-wrapper]
    position: relative
    display: flex
    align-items: stretch
    padding: 48px 0 36px 48px
    color: #fff

    [avatar]
      margin-right: 32px
      border-radius: 4px
      overflow: hidden

    [content]
      [title]
        margin: 4px 0 16px 0
        display: flex
        align-items: center
        font-weight: 500

        [brand]
          display: block
          width: 60px
          height: 36px
          margin-right: 12px
          bg-image('./images/brand')
          background-size: 60px 36px
          background-repeat: no-repeat
          
        [name]
          font-size: 32px

      [description]
        margin-bottom: 20px
        font-size: 24px

      [support]
        display: flex
        align-items: center
        [icon]
          margin-right: 8px
        [text]
          font-size: 20px
    
    [support-count]
      position: absolute
      right: 24px
      bottom: 24px
      padding: 0 16px
      height: 48px
      line-height: 48px
      background: rgba(0, 0, 0, 0.2)
      border-radius: 28px
      text-align: center

      [count]
        display: inline-block
        font-size: 20px

  [bulletin-wrapper]
    display: flex
    align-items: center
    padding: 0 24px
    height: 56px
    line-height: 56px
    background: rgba(7, 17, 27, 0.2)
    color: #fff
    
    [bulletin-title]
      width: 44px
      height: 24px
      bg-image('./images/bulletin')
      background-size: 44px 24px
      background-repeat: no-repeat

    [bulletin-text]
      flex: 1
      padding: 0 8px
      height: 56px
      font-size: 20px
      overflow: hidden
      text-overflow: ellipsis
      white-space: nowrap

  [background]
    position: absolute
    left: 0
    top: 0
    width: 100%
    z-index: -1
    filter: blur(10px)
  
  [detail]
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: 999
    overflow: auto
    background: rgba(7, 17, 27, 0.8)

    [detail-wrapper]
      width: 100%
      min-height: 100%
      color: #fff

      [detail-main]
        margin-top: 128px;
        padding-bottom: 128px;

        [name]
          margin-bottom: 32px
          text-align: center
          font-size: 32px
          font-weight: 700
          line-height 32px
        
        [star-wrapper]
          margin-top: 32px
          text-align: center

        [title]
          display: flex
          align-items: center
          width: 80%
          margin: 56px auto 48px auto;
          font-weight: 700
          
          [line]
            flex: 1
            position: relative
            border-bottom: 1px solid rgba(255, 255, 255, 0.2)

          [text]
            padding: 0 24px
            font-size: 28px
        
        [supports]
          width: 75%
          margin: 0 auto

          [support-item]
            display: flex
            align-items: center
            margin-bottom: 24px
            font-size: @margin-bottom
            line-height: @margin-bottom

            [icon]
              margin-right: 12px

        [bulletin]
          width: 72%
          margin: 0 auto
          font-size: 24px
          line-height: 48px

    [detail-close]
      position: relative
      width: 64px;
      height: 64px;
      margin: -128px auto 0 auto
      clear: both
      color: rgba(255, 255, 255, 0.5)

      .icon-close
        font-size: 64px
</style>
