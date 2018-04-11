<template>
  <div seller-wrapper ref="seller">
    <div seller-content>
      <div overview>
        <h1 class="title">{{ seller.name }}</h1>
        <div desc class="border-1px">
          <v-star :size="36" :score="seller.score"></v-star>
          <span class="text">({{ seller.ratingCount }})</span>
          <span class="text">月售{{ seller.sellCount }}单</span>
        </div>
        <ul remark>
          <li>
            <p name>起送价</p>
            <p num>{{ seller.minPrice }}<span class="small">元</span></p>
          </li>
          <li>
            <p name>商家配送</p>
            <p num>{{ seller.deliveryPrice }}<span class="small">元</span></p>
          </li>
          <li>
            <p name>平均配送时间</p>
            <p num>{{ seller.deliveryTime }}<span class="small">分钟</span></p>
          </li>
        </ul>
      </div>
      <split></split>
      <article bulletin>
        <h2 class="title">公告与活动</h2>
        <div content-wrapper class="border-1px">
          <div content>{{ seller.bulletin }}</div>
        </div>
        <ul supports v-if="seller.supports">
          <li v-for="(item, index) in seller.supports" :key="index" support-item class="border-1px">
            <v-icon :iconNo="4" :iconType="item.type"></v-icon>
            <span>{{ item.description }}</span>
          </li>
        </ul>
      </article>
      <split></split>
      <div pics>
        <h2 class="title">商家实景</h2>
        <div pic-wrapper ref="picWrapper">
          <ul pic-list ref="picList">
            <li pic-item v-for="(pic, index) in seller.pics" :key="index">
              <img :src="pic" alt="">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div info>
        <h2 class="title border-1px">商家信息</h2>
        <ul info-list>
          <li info-item v-for="(info, index) in seller.infos" :key="index">
            {{ info }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import star from '../star/star';
import split from '../split/split';
import icon from '../icon/icon';

export default {
  components: {
    'v-star': star,
    split,
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
  methods: {
    _initScroll() {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.seller, {
          click: true
        });
      } else {
        this.scroll.refresh();
      }
    },
    _initPics() {
      if (this.seller.pics) {
        let picWidth = this.convertToVw(240);
        let margin = this.convertToVw(12);
        let width = (picWidth + margin) * this.seller.pics.length - margin;
        this.$refs.picList.style.width = `${width}vw`;
        this.$nextTick(() => {
          if (!this.picScroll) {
            this.picScroll = new BScroll(this.$refs.picWrapper, {
              scrollX: true,
              eventPassthrough: 'vertical'
            });
          } else {
            this.picScroll.refresh();
          }
        });
      }
    },
    convertToVw(num) {
      return num / 750 * 100;
    }
  },
  watch: {
    'seller'() {
      this.$nextTick(() => {
        this._initScroll();
        this._initPics();
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
      this._initScroll();
      this._initPics();
    });
  }
};
</script>

<style lang="stylus">
@import '../../common/stylus/mixin';

[seller-wrapper]
  position: absolute
  top: 384px
  left: 0
  bottom: 0
  right: 0
  overflow: hidden

  .title
    margin-bottom: 16px
    font-size: 28px
    color: rgb(7, 17, 27)

  [seller-content]
    [overview]
      padding: 36px
      
      [desc]
        display: flex
        align-items: center
        padding-bottom: 36px
        font-size: 20px
        border-1px(rgba(7, 17, 27, 0.2))

        .text
          margin: 0 24px 0 16px

          &:last-child
            margin-left: 0
          
      [remark]
        display: flex
        align-items: center
        padding-top: 36px

        li
          flex: 1
          text-align: center
          border-right: 1px solid rgba(7, 17, 27, 0.1)

          &:last-child
            border-right: 0

          [name]
            margin-bottom: 8px
            font-size: 20px
            color: rgb(147, 153, 159)

          [num]
            font-size: 48px

            .small
              font-size: 20px
              color: rgb(7, 17, 27)

    [bulletin]
      padding: 36px
      
      [content-wrapper]
        padding: 0 24px 32px
        border-1px(rgba(7, 17, 27, 0.2))
        
        [content]
          font-size: 24px
          color: rgb(240, 20, 20)
          line-height: 48px
      
      [supports]
        [support-item]
          padding: 32px 24px
          font-size: 24px
          border-1px(rgba(7, 17, 27, 0.2))

          [icon]
            margin-right: 12px
            vertical-align: -8px

    [pics]
      padding: 36px

      [pic-wrapper]
        width: 100%
        overflow: hidden
        white-space: nowrap

        [pic-list]
          font-size: 0
          
          [pic-item]
            display: inline-block
            margin-right: 12px
            width: 240px
            height: 180px
            overflow: hidden
            
            &:last-child
              margin-right: 0

    [info]
      padding: 36px

      .title
        padding-bottom: 24px
        border-1px(rgba(7, 17, 27, 0.1))

      [info-item]
        padding: 32px 24px
        font-size: 24px
        line-height: 32px
        border-1px(rgba(7, 17, 27, 0.1))
</style>
