<template>
  <span icon :class="iconClass"></span>
</template>

<script>
export default {
  props: {
    iconNo: {
      type: Number
    },
    iconType: {
      type: Number
    }
  },
  computed: {
    iconClass() {
      return `${this.classMap[this.iconType]}_${this.iconNo}`;
    }
  },
  data() {
    return {
      classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    };
  }
};
</script>

<style lang="stylus">
@import '../../common/stylus/mixin';

icon-style($width, $url)
  width: $width
  height: @width
  background-size: @width @width
  bg-image('./images/' + $url)

[icon]
  display: inline-block
  background-repeat: no-repeat

  number = 1 2 3 4

  for num in number
    if num % 2 == 0
      size = 32px
    else
      size = 24px

    &.decrease_{num}
      icon-style(size, 'decrease_' + num)
    &.discount_{num}
      icon-style(size, 'discount_' + num)
    &.guarantee_{num}
      icon-style(size, 'guarantee_' + num)
    &.invoice_{num}
      icon-style(size, 'invoice_' + num)
    &.special_{num}
      icon-style(size, 'special_' + num)
</style>
