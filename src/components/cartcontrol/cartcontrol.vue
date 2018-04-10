<template>
  <div cartcontrol>
    <transition name="move">
      <div cart-decrease v-show="food.count" @click.stop.prevent="decreaseCart">
        <i class="inner iconfont icon-remove_circle_outline"></i>
      </div>
    </transition>
    <transition name="fade">
      <div cart-count v-show="food.count > 0">{{ food.count }}</div>
    </transition>
    <div cart-add @click.stop.prevent="addCart">
      <i class="iconfont icon-add_circle"></i>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    addCart(event) {
      if (!event._constructed) {
        return;
      }
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1);
      } else {
        this.food.count++;
      }
      this.$emit('add', event.target);
    },
    decreaseCart(event) {
      if (!event._constructed) {
        return;
      }
      if (this.food.count) {
        this.food.count--;
      }
    }
  }
};
</script>

<style lang="stylus">
[cartcontrol]
  font-size: 0

  > div
    display: inline-block

  [cart-decrease]
    opacity: 1
    transform: translate3d(0, 0, 0)

    .inner
      display: inline-block
      transform: rotate(0)
      transition: all .4s linear

    &.move-enter-active, &.move-leave-active
        transition: all 0.4s linear

    &.move-enter, &.move-leave-active
      opacity: 0
      transform: translate3d(24px, 0, 0)

      .inner
        transform: rotate(180deg)
  
  [cart-count]
    padding: 0 24px
    font-size: 20px
    color: rgb(147, 153, 159)

  .iconfont
    font-size: 48px
    color: rgb(0, 160, 220)
    vertical-align: -10px
</style>
