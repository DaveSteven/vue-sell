<template>
  <div star :class="starType">
    <span star-item v-for="(itemClass, index) in itemClasses" :key="index" :class="itemClass"></span>
  </div>
</template>

<script>
const LENGTH = 5;
const CLS_ON = 'on';
const CLS_HALF = 'half';
const CLS_OFF = 'off';

export default {
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  computed: {
    starType() {
      return `star-${this.size}`;
    },
    itemClasses() {
      let result = [];
      let score = Math.floor(this.score * 2) / 2;
      let hasDecimal = score % 1 !== 0;
      let integer = Math.floor(score);
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON);
      }
      if (hasDecimal) {
        result.push(CLS_HALF);
      }
      while(result.length < LENGTH) {
        result.push(CLS_OFF);
      }
      return result;
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="stylus">
@import '../../common/stylus/mixin'
no-margin()
  &:last-child
    margin-right: 0

[star]
  font-size: 0
  [star-item]
    display: inline-block
  &.star-48
    [star-item]
      width: 40px
      height: @width
      margin-right: 41px
      background-size: @width @width

      no-margin()

      &.on
        bg-image('./images/star48_on')
      &.half
        bg-image('./images/star48_half')
      &.off
        bg-image('./images/star48_off')

  &.star-36
    [star-item]
      width: 30px
      height: @width
      margin-right: 12px
      background-size: @width @width

      no-margin()

      &.on
        bg-image('./images/star36_on')
      &.half
        bg-image('./images/star36_half')
      &.off
        bg-image('./images/star36_off')

  &.star-24
    [star-item]
      width: 20px
      height: @width
      margin-right: 6px
      background-size: @width @width

      no-margin()

      &.on
        bg-image('./images/star24_on')
      &.half
        bg-image('./images/star24_half')
      &.off
        bg-image('./images/star24_off')

</style>
