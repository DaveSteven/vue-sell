<template>
  <div shopcart-wrapper>
    <div shopcart>
      <div content @click="toggleList">
        <div content-left>
          <div logo-wrapper>
            <div logo :class="{'highlight': totalCount > 0}">
              <i class="iconfont icon-shopping_cart"></i>
            </div>
            <div num v-show="totalCount > 0">{{ totalCount }}</div>
          </div>
          <div price :class="{'highlight': totalPrice > 0}">¥{{ totalPrice }}</div>
          <div desc class="border-left-1px">另需配送费¥{{ deliveryPrice }}元</div>
        </div>
        <div content-right>
          <div pay :class="payClass" @click.stop.prevent="pay">{{ payDesc }}</div>
        </div>
      </div>
      <div ball-container>
        <div v-for="(ball, index) in balls" :key="index">
          <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
            <div ball v-show="ball.show">
              <div inner class="inner-hook"></div>
            </div>
          </transition>
        </div>
      </div>
      <transition name="fold">
        <div shopcart-list v-show="fold">
          <div list-header class="border-1px">
            <h4 title>购物车</h4>
            <span empty @click="empty">清空</span>
          </div>
          <div list-content ref="listContent">
            <ul>
              <li class="border-1px" food v-for="(food, index) in selectFoods" :key="index">
                <span name>{{ food.name }}</span>
                <div price>
                  <span><i>¥</i>{{ food.price * food.count }}</span>
                </div>
                <div cartcontrol-wrapper>
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div shopcart-mask v-show="fold" @click="hideList"></div>
    </transition>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import cartcontrol from '../cartcontrol/cartcontrol';

export default {
  components: {
    cartcontrol
  },
  props: {
    minPrice: {
      type: Number,
      default: 0
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    selectFoods: {
      type: Array
    }
  },
  data() {
    return {
      balls: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ],
      dropBalls: [],
      fold: false
    };
  },
  computed: {
    totalCount() {
      return this.selectFoods.length;
    },
    totalPrice() {
      let total = 0;
      this.selectFoods.forEach(food => {
        total += food.price * food.count;
      });
      return total;
    },
    payDesc() {
      if (this.totalPrice === 0) {
        return `¥${this.minPrice}元起送`;
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice; 
        return `还差¥${diff}元`;
      } else {
        return '去结算';
      }
    },
    payClass() {
      return this.totalPrice >= this.minPrice ? 'enough' : 'not-enough';
    }
  },
  watch: {
    totalCount() {
      if (!this.totalCount) {
        this.fold = false;
      }
    },
    fold() {
      let show = !this.fold;
      if (show) {
        if (!this.scroll) {
          this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs.listContent, {
              click: true
            });
          });
        } else {
          this.scroll.refresh();
        }
      }
    }
  },
  methods: {
    drop(el) {
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i];
        if (!ball.show) {
          ball.show = true;
          ball.el = el;
          this.dropBalls.push(ball);
          return;
        }
      }
    },
    beforeDrop(el) {
      let count = this.balls.length;
      while (count--) {
        let ball = this.balls[count];
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect();
          let x = rect.left - 32;
          let y = -(window.innerHeight - rect.top - 22);
          el.style.display = '';
          el.style.webKitTransform = `translate3d(0, ${y}px, 0)`;
          el.style.transform = `translate3d(0, ${y}px, 0)`;
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webKitTransform = `translate3d(${x}px, 0, 0)`;
          inner.style.transform = `translate3d(${x}px, 0, 0)`;
        }
      }
    },
    dropping(el) {
      /* eslint-disable no-unused-vars */
      let rf = el.offsetHeight;
      this.$nextTick(() => {
        el.style.webKitTransform = 'translate3d(0, 0, 0)';
        el.style.transform = 'translate3d(0, 0, 0)';
        let inner = el.getElementsByClassName('inner-hook')[0];
        inner.style.webKitTransform = 'translate3d(0, 0, 0)';
        inner.style.transform = 'translate3d(0, 0, 0)';
      });
    },
    afterDrop(el) {
      let ball = this.dropBalls.shift();
      if (ball) {
        ball.show = false;
        el.style.display = 'none';
      }
    },
    toggleList() {
      if (!this.totalCount) {
        return;
      }
      this.fold = !this.fold;
    },
    empty() {
      this.selectFoods.forEach(food => {
        food.count = 0;
      });
    },
    hideList() {
      this.fold = false;
    },
    pay() {
      if (this.totalPrice < this.minPrice) {
        return;
      }
      window.alert(`需要支付${this.totalPrice}`);
    }
  }
};
</script>

<style lang="stylus">
@import '../../common/stylus/mixin';

[shopcart]
  position: fixed
  bottom: 0
  left: 0
  right: 0
  z-index: 90
  
  [content]
    display: flex
    align-items: stretch
    height: 94px

    [content-left]
      flex: 1
      display: flex
      align-items: center
      padding-left: 36px
      background: rgb(7, 17, 27)
      color: rgba(255, 255, 255, 0.4)
      
      [logo-wrapper]
        display: flex
        align-items: center
        position: relative
        margin: -20px 24px 0 0
        width: 100px
        height: @width
        border-radius: 50%
        text-align: center
        background: rgb(7, 17, 27)

        [logo]
          margin: 0 auto
          width: 88px
          height: @width
          line-height: @width
          border-radius: 50%
          background: rgba(32, 41, 50, 0.9)

          &.highlight
            background: rgb(0, 160, 220)

            .iconfont
              color: #fff

          .iconfont
            font-size: 44px
        
        [num]
          position: absolute
          top: 0
          right: 0
          width: 48px
          height: 32px
          line-height: @height
          background: rgb(240, 20, 20)
          color: #fff
          font-size: 18px
          border-radius: 32px
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
      
      [price]
        margin-right: 24px
        font-size: 32px
        font-weight: 700
        letter-spacing: 5px

        &.highlight
          color: #fff

      [desc]
        padding-left: 24px
        height: 48px
        line-height: 48px
        font-size: 24px
        border-left-1px(#2c343d)
    
    [content-right]
      flex: 0 0 210px
      width: 210px
      
      [pay]
        height: 94px
        line-height: 94px
        color: #939a9c
        font-size: 24px
        font-weight: 700
        text-align: center

        &.not-enough
          background: #2b333b

        &.enough
          background: #058a41
          color: #fff
  [ball-container]
    [ball]
      position: fixed
      left: 64px
      bottom: 44px
      z-index: 200
      transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)

      [inner]
        width: 32px
        height: @width
        border-radius: 50%
        background: rgb(0, 160, 220)
        transition: all 0.4s linear

[shopcart-list]
  position: absolute
  top: 0
  left: 0
  z-index: -1
  width: 100%
  transform: translate3d(0, -100%, 0)
  transition: all 0.5s
    
  &.fold-enter, &.fold-leave-active
    transform: translate3d(0, 0, 0)

  [list-header]
    display: flex
    justify-content: space-between
    padding: 0 36px
    height: 80px
    line-height: 80px
    background: #f3f5f7
    border-1px(rgba(7, 17, 27, 0.1))

    [name]
      font-size: 28px
      color: rgb(7, 17, 27)

    [empty]
      font-size: 24px
      color: rgb(0, 160, 220)
  
  [list-content]
    padding: 0 36px
    max-height: 531px
    overflow: hidden
    background: #fff

    [food]
      display: flex
      align-items: center
      height: 96px
      border-1px(rgba(7, 17, 27, 0.1))

      [name]
        flex: 1
        font-size: 28px
        color: rgb(7, 17, 27)
      
      [price]
        margin-right: 24px
        font-size: 28px
        color: rgb(240, 20, 20)

        i
          font-size: 20px

[shopcart-mask]
  position: fixed
  top: 0
  bottom: 0
  left: 0
  right: 0
  z-index: 80
  background: rgba(0, 0, 0, 0.5)
</style>
