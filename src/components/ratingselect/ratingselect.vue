<template>
  <div ratingselect class="border-1px">
    <div rating-type class="border-1px">
      <span block :class="['positive', selectType === 2 ? 'active':'']" @click="select(2)">
        {{ desc.all }}
        <span count>{{ ratings.length }}</span>
      </span>
      <span block :class="['positive', selectType === 0 ? 'active':'']" @click="select(0)">
        {{ desc.positive }}
        <span count>{{ positive.length }}</span>
      </span>
      <span block :class="['negative', selectType === 1 ? 'active':'']" @click="select(1)">
        {{ desc.negative }}
        <span count>{{ negative.length }}</span>
      </span>
    </div>
    <div switch :class="{'on': onlyContent}" @click="toggleContent">
      <i class="iconfont icon-check_circle"></i>
      <span text>只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;

export default {
  props: {
    ratings: {
      type: Array,
      default() {
        return [];
      }
    },
    selectType: {
      type: Number,
      default: ALL
    },
    onlyContent: {
      type: Boolean,
      default: false
    },
    desc: {
      type: Object,
      default() {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        };
      }
    }
  },
  computed: {
    positive() {
      let positives = this.ratings.filter(item => {
        return item.rateType === 0;
      });
      return positives;
    },
    negative() {
      let negatives = this.ratings.filter(item => {
        return item.rateType === 1;
      });
      return negatives;
    }
  },
  methods: {
    select(type, event) {
      this.$emit('select', type);
    },
    toggleContent(event) {
      this.$emit('toggle');
    }
  }
};
</script>

<style lang="stylus">
@import '../../common/stylus/mixin';

[ratingselect]
  padding: 36px
  border-1px(rgba(7, 17, 27, 0.2))

  [rating-type]
    padding-bottom: 36px
    border-1px(rgba(7, 17, 27, 0.2))

    [block]
      display: inline-block
      padding: 20px 24px
      line-height: 36px
      text-align: center
      border-radius: 2px
      font-size: 24px
      color: #4d555d
      
      &.active
        color: #fff
      
      &.positive
        background: rgba(0, 160, 220, 0.2)

        &.active
          background: rgb(0, 160, 220)

      &.negative
        background: rgba(147, 153, 159, 0.2)
        &.active
          background: rgb(0, 160, 220)

      [count]
        font-size: 16px
    
  [switch]
    padding-top: 36px
    font-size: 0

    &.on
      .icon-check_circle
        color: #00c850

    .icon-check_circle
      margin-right: 8px
      font-size: 40px
      color: #b7bbbf
      vertical-align: -4px

    [text]
      color: #93999f
      font-size: 24px
</style>
 