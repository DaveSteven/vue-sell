<template>
  <div goods>
    <div goods-wrapper>
      <div menu-wrapper ref="menuWrapper">
        <ul>
          <li
            menu-item v-for="(item, index) in goods"
            :key="index"
            :class="{'current':currentIndex === index}"
            @click="selectMenu(index, $event)"
            ref="menuList"
          >
            <span text class="border-1px">
              <v-icon v-if="item.type > 0" :iconType="item.type" :iconNo="3"></v-icon>
              <span>{{ item.name }}</span>
            </span>
          </li>
        </ul>
      </div>
      <div foods-wrapper ref="foodsWrapper">
        <ul>
          <li v-for="(item, index) in goods" :key="index" ref="foodList">
            <h4 name>{{ item.name }}</h4>
            <ul foods-list>
              <li class="border-1px" foods-item v-for="(food, index) in item.foods" :key="index">
                <div foods-pic w-114 aspectratio aspectratio-ratio="114/114">
                  <div aspectratio-content>
                    <img :src="food.icon" alt="" width="100%" height="100%">
                  </div>
                </div>
                <div foods-text>
                  <h4 foods-title>{{ food.name }}</h4>
                  <p description v-if="food.description">{{ food.description }}</p>
                  <p description>
                    <span>月销售{{ food.sellCount }}</span>
                    <span>好评率{{ food.rating }}%</span>
                  </p>
                  <p price>
                    <span><i>¥</i>{{ food.price }}</span>
                    <span old v-if="food.oldPrice">¥{{ food.oldPrice }}</span>
                  </p>
                  <div cartcontrol-wrapper>
                    <cartcontrol @add="addFood" :food="food"></cartcontrol>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <v-shopcart ref="shopcart" :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></v-shopcart>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import shopcart from '../shopcart/shopcart';
import icon from '../icon/icon';
import cartcontrol from '../cartcontrol/cartcontrol';

export default {
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    'v-shopcart': shopcart,
    'v-icon': icon,
    cartcontrol
  },
  data() {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0,
      selectedFood: {}
    };
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          this._followScroll(i);
          return i;
        }
      }
      return 0;
    },
    selectFoods() {
      let foods = [];
      this.goods.forEach(good => {
        good.foods.forEach(food => {
          if (food.count) {
            foods.push(food);
          }
        });
      });
      return foods;
    }
  },
  methods: {
    fetchData() {
      this.$http.get('/api/goods').then(res => {
        this.goods = res.data;
        this.$nextTick(() => {
          this._initScroll();
          this._calculateHeight();
        });
      }).catch(err => {
        console.log(err);
      });
    },
    selectMenu(index, event) {
      if (!event._constructed) {
        return;
      }
      let foodList = this.$refs.foodList;
      let el = foodList[index];
      this.foodsScroll.scrollToElement(el, 300);
    },
    addFood(target) {
      this._drop(target);
    },
    _drop(target) {
      this.$refs.shopcart.drop(target);
    },
    _initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      });

      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        click: true,
        probeType: 3
      });

      this.foodsScroll.on('scroll', pos => {
        if (pos.y <= 0) {
          this.scrollY = Math.abs(Math.round(pos.y));
        }
      });
    },
    _calculateHeight() {
      let foodList = this.$refs.foodList;
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },
    _followScroll(index) {
      let menuList = this.$refs.menuList;
      let el = menuList[index];
      this.menuScroll.scrollToElement(el, 300, 0, -100);
    }
  },
  created() {
    this.fetchData();
  }
};
</script>

<style lang="stylus">
@import '../../common/stylus/mixin';

[goods-wrapper]
  display: flex
  position: absolute
  top: 348px
  bottom: 94px
  width: 100%
  overflow: hidden

[menu-wrapper]
  flex: 0 0 160px
  width: 160px
  background: #f3f5f7

  [menu-item]
    display: table
    padding: 0 24px
    width: calc(100% - 48px)
    height: 108px

    &.current
      position: relative
      margin-top: -1px
      background: #fff

      .border-1px
        border-none()

    [text]
      display: table-cell
      vertical-align: middle
      border-1px(rgba(7, 17, 27, 0.1))
      font-size: 24px
      font-weight: 400
      line-height: 28px
      
      [icon]
        margin-right: -3px
        vertical-align: -3px

[foods-wrapper]
  flex: 1
  
  [name]
    padding-left: 28px
    height: 52px
    line-height: 52px
    font-size: 24px
    border-left: 4px solid #d9dde1
    background: #f3f5f7
    color: rgb(147, 153, 159)

  [foods-list]
    padding: 0 36px

    [foods-item]
      display: flex
      align-items: flex-start
      padding: 36px 0
      border-1px(rgba(7, 17, 27, 0.1))

      [foods-pic]
        margin-right: 20px
        border-radius: 4px
        overflow: hidden

      [w-114]
        width: 114px
      
      [w-114]
        aspect-ratio: '114:114'
      
      [foods-text]
        padding-top: 4px
        [foods-title]
          margin-bottom: 16px
          font-size: 28px
          color: #07111b

        [description]
          margin-bottom: 16px
          font-size: 20px
          color: #93999f
        
        [price]
          font-size: 28px
          font-weight: 700
          color: #f61825

          i
            font-size: 20px
            font-style: normal
          
          [old]
            font-size: 20px
            color: rgb(147, 153, 159)
            text-decoration: line-through

        [cartcontrol-wrapper]
          position: absolute
          right: 0
          bottom: 25px
</style>
