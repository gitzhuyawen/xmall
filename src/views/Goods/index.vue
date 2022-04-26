<template>
  <div class="goods">
    <div class="nav">
      <div class="w">
        <a
          @click="handleSort(i)"
          :class="{active:i===isIndex}"
          href="javascript:;"
          v-for="(navItem,i) in navList"
          :key="i"
        >{{navItem.title}}</a>
        <div class="price-interval">
          <input type="number" class="input" placeholder="价格" v-model="min">
          <span style="margin: 0 5px">-</span>
          <input type="number" placeholder="价格" v-model="max">
          <el-button type="primary" size="small" style="margin-left: 10px;" @click="reset">确定</el-button>
        </div>
      </div>
    </div>
    <div>
      <div class="goods-box w">
        <mall-goods v-for="goods in allGoods" :key="goods.id" :goods="goods"></mall-goods>
      </div>
      <div class="w">
        <el-pagination
          style="float:right;"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="pageSize"
          :page-sizes="[8, 20, 40, 80]"
          layout="total,sizes, prev, pager, next"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
5
import axios from 'axios'
import MallGoods from "@/components/MallGoods";
import router from '@/router';
export default {
  components: {
    MallGoods
  },
  data() {
    return {
      max: "",
      min: "",
      navList: [
        { title: "综合排序" },
        { title: "价格由低到高" },
        { title: "价格由高到低" }
      ],
      isIndex: 0,
      currentPage: 1,
      pageSize: 20,
      sort: "",
      total: 0,
      allGoods: []
    };
  },
  watch:{
    '$route':'getall'
  },
  created() {
   
    axios('/mz/goods/allGoods?page=1&size=20&sort=&priceGt=&priceLte=').then(req=>{
        this.allGoods=req.data.result.data
        this.total=req.data.result.total
      })
      this.min='',
      this.max=''
  },
  methods: {
    getall(){
      console.log(this.$route.query.cid)
      this.$route.query.cid? axios(
  "/mz/goods/home"
).then((req) => {
console.log(req.data.result[4].panelContents)
this.allGoods=req.data.result[4].panelContents
}):axios('/mz/goods/allGoods?page=1&size=20&sort=&priceGt=&priceLte=').then(req=>{
        this.allGoods=req.data.result.data
        this.total=req.data.result.total
      })
     
    },
    fder(a){
     
      axios(`/mz/goods/allGoods?page=${a}&size=${this.pageSize}&sort=&priceGt=&priceLte=`).then(req=>{
        
        this.allGoods=req.data.result.data
      })
    },
    handleSizeChange(val) {
      this.pageSize = val;
      
      this.fder(this.currentPage,this.pageSize)
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      
      this.fder(val)
    },
    

    // 排序
    priceSort(v) {
      axios(`/mz/goods/allGoods?page=1&size=20&sort=${v}&priceGt=&priceLte=`).then(req=>{
       
        this.allGoods=req.data.result.data
      })
      this.min='',
      this.max=''
    },
    reset() {
      // this.currentPage = 1;
      // this.sort = "";
      // this.getAllGoods();
      axios(`/mz/goods/allGoods?page=1&size=20&sort=&priceGt=${this.min}&priceLte=${this.max}`).then(req=>{
      
        this.allGoods=req.data.result.data
      })
      
    },
    handleSort(i) {
      this.isIndex = i;


      switch (i) {
        case 0:
          //   综合排序
          this.reset();
          break;
        case 1:
          this.priceSort(1);
          //   正序
          break;
        case 2:
          this.priceSort(-1);
          //   倒序
          break;

        default:
          break;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
/* eslint-disable */
// 主色
$main-col: #5079d9;
// 头部
$head-bgc: #1a1a1a;
// 字体颜色
$cc: #ccc;
$c6: #666;
$c9: #999;
$c3: #333;
$cf: #fff;

%block-center {
    display: flex;
    align-items: center;
    justify-content: center;
}

@mixin wh($w, $h:$w) {
    width: $w;
    height: $h;
}

.nav {
  height: 60px;
  line-height: 60px;
  > div {
    display: flex;
    align-items: center;
    a {
      padding: 0 30px 0 0;
      height: 100%;
      @extend %block-center;
      font-size: 12px;
      color: #999;
      &.active {
        color: #5683ea;
      }
      &:hover {
        color: #5683ea;
      }
    }
    input {
      @include wh(80px, 30px);
      border: 1px solid #ccc;
    }
    input + input {
      margin-left: 10px;
    }
  }
  .price-interval {
    padding: 0 15px;
    @extend %block-center;
    input[type="number"] {
      border: 1px solid #ccc;
      text-align: center;
      background: none;
      border-radius: 5px;
    }
  }
}

.goods-box {
  overflow: hidden;
  > div {
    float: left;
    border: 1px solid #efefef;
  }
}

.no-info {
  padding: 100px 0;
  text-align: center;
  font-size: 30px;
  display: flex;
  flex-direction: column;
  .no-data {
    align-self: center;
  }
}

.img-item {
  display: flex;
  flex-direction: column;
}

.el-pagination {
  align-self: flex-end;
  margin: 3vw 10vw 2vw;
}

.section {
  padding-top: 8vw;
  margin-bottom: -5vw;
  width: 1218px;
  align-self: center;
}

.recommend {
  display: flex;
  > div {
    flex: 1;
    width: 25%;
  }
}
</style>