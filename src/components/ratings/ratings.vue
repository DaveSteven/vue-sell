<template>
  <div ratings ref="ratings">
    <div ratings-content>
      <div overview>
        <div overview-left class="border-right-1px">
          <span score>{{ seller.score }}</span>
          <h4 title>综合评分</h4>
          <span desc>高于周边商家{{ seller.rankRate }}%</span>
        </div>
        <div overview-right>
          <div info-item>
            <span name>服务态度</span>
            <div star-wrapper>
              <v-star :size="36" :score="seller.serviceScore"></v-star>
            </div>
            <span score>{{ seller.serviceScore }}</span>
          </div>
          <div info-item>
            <span name>食物评分</span>
            <div star-wrapper>
              <v-star :size="36" :score="seller.foodScore"></v-star>
            </div>
            <span score>{{ seller.foodScore }}</span>
          </div>
          <div info-item>
            <span name>送达时间</span>
            <span time>{{ seller.deliveryTime }}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <rating-select
        :onlyContent="onlyContent"
        :ratings="ratings" 
        :selectType="selectType"
        @select="switchRatings" 
        @toggle="toggleOnlyContent"
      ></rating-select>
      <ul ratings-list>
        <li class="border-1px" v-for="(rating, index) in ratings" :key="index" v-show="needShow(rating.rateType, rating.text)">
          <div user-info>
            <div avatar>
              <img :src="rating.avatar" alt="">
            </div>
            <div info>
              <p name>{{ rating.username }}</p>
              <div star-wrapper>
                <v-star :size="24" :score="rating.score"></v-star>
              </div>
            </div>
            <div time>{{ rating.rateTime | formatData }}</div>
          </div>
          <div user-rating>{{ rating.text }}</div>
          <div user-recommend v-show="rating.recommend && rating.recommend.length">
            <i class="iconfont icon-thumb_up"></i>
            <span goods-name v-for="(recommend, index) in rating.recommend" :key="index">{{ recommend }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import { formatDate } from 'common/js/date';
import star from '../star/star';
import split from '../split/split';
import ratingSelect from '../ratingselect/ratingselect';

const ALL = 2;

export default {
  components: {
    'v-star': star,
    split,
    ratingSelect
  },
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      onlyContent: false,
      ratings: [],
      selectType: 2
    };
  },
  methods: {
    fetchData() {
      this.$http('/api/ratings').then(res => {
        this.ratings = res.data;
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.ratings, {
            click: true
          });
        });
      }).catch(err => {
        console.log(err);
      });
    },
    needShow(type, text) {
      if (this.onlyContent && !text) {
        return false;
      }
      if (this.selectType === ALL) {
        return true;
      } else {
        return type === this.selectType;
      }
    },
    switchRatings(type) {
      this.selectType = type;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
    toggleOnlyContent() {
      this.onlyContent = !this.onlyContent;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    }
  },
  created() {
    this.fetchData();
  },
  filters: {
    formatData(time) {
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm');
    }
  }
};
</script>

<style lang="stylus">
@import '../../common/stylus/base';
@import '../../common/stylus/mixin';

[ratings]
  position: absolute
  top: 348px
  bottom: 0
  left: 0
  right: 0
  overflow: hidden

  [overview]
    display: flex
    align-items: center
    padding: 36px 0

    [overview-left]
      flex: 0 0 275px
      padding: 12px;
      text-align: center
      border-right-1px(rgba(7, 17, 27, .1))

      @media screen and (max-width: 320px)
        padding: 12px 12px

      [score]
        font-size: 48px
        color: rgb(255, 153, 0)
      
      [title]
        margin: 12px 0 16px 0
        font-size: 24px
        color: rgb(7, 17, 27)
      
      [desc]
        font-size: 20px
        color: rgba(7, 17, 27, .6)
    
    [overview-right]
      flex: 1
      padding-left: 32px

      @media screen and (max-width: 320px)
        padding: 0 0 0 12px

      [info-item]
        display: flex
        align-items: stretch

        + [info-item]
          margin-top: 16px

        [name]
          margin-right: 24px
          font-size: 24px
          color: rgb(7, 17, 27)

        [star-wrapper]
          margin-right: 24px

        [score]
          font-size: 24px
          color: rgb(255, 153, 0)
        
        [time]
          font-size: 24px
          color: rgb(147, 153, 159)
        
        [name], [score], [time]
          line-height: 36px

  [ratings-list]
    padding: 36px

    li
      margin-bottom: 36px
      padding: 0 0 36px 80px
      border-1px(rgba(7, 17, 27, 0.2))

      &:last-child
        margin: 0

    [user-info]
      display: flex;
      margin: 0 0 12px -80px

      [avatar]
        flex: 0 0 56px
        margin-right: 24px

        img
          width: 100%
          border-radius: 50%
      
      [name]
        margin-bottom: 8px
        font-size: 20px

      [info]
        flex: 1

      [time]
        font-size: 20px
        color: rgb(147, 153, 159)

    [user-rating]
      margin-bottom: 16px
      font-size: 24px

    [user-recommend]
      font-size: 18px

      .icon-thumb_up
        margin-right: 16px
        color: rgb(0, 160, 220)
        font-size: 24px

      .icon-thumb_up,
      [goods-name]
        margin-bottom: 8px
      
      [goods-name]
        display: inline-block
        padding: 5px 12px
        border: 1px solid rgba(7, 17, 27, .1)
        color: rgb(147, 153, 159)
        font-size: 18px

        + [goods-name]
          margin-left: 16px

</style>
