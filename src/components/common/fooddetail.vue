<template>
    	<div class="fooddetail">
            <div class="content">
        		<div class="leftNav content_wrap fl left_content">
        	        <div class="sidenav" v-for="(item,index) in catename" :class="{sidenav_active: index == cateid}" @click="switchleft(index)">
        	            <div>{{item.title}}</div>
        	        </div> 
        	    </div>
               	<div class="rightDetail content_wrap fr right_content">
                    <div class="caidan" v-for="(cateid,index) in catename">
                        <div class="title">{{cateid.title}}</div>
                        <div class="box" v-for="(foods,foodindex) in cateid.child">
                            <div class="fl pic">
                                <img :src="IMG_URL+foods.photo"/>
                            </div>
                            <div class="text">
                                <div class="sm-tit">{{foods.title}}</div>
                                <div class="xiaoliang black9">已售{{foods.sales}}</div>
                                <div class="price">￥{{foods.price}}</div>
                            </div>
                            <v-buycart :foods="foods" :shopcart="shopcart" @hidefooter="hidefooter" @totalthing="total"></v-buycart>
                        </div>
                    </div>
                    <div class="clear"></div>
                </div>
                <div class="clear"></div>
            </div>
            <div class="mask_bg2" v-if="ismaskshow" @click="hidecart"></div>
            <div :class="['yidian', 'yidian1',{yidian1_active:cartshow}]">
                <div class="actTitle border_b">
                    <div class="title fl">购物车</div>
                    <div class="fr clear_btn" @click="clearcart"><img src="" class="del mr5 fl"/>清空</div> 
                </div>
                <div class="cartYi">
                    <div class="item  border_b"  v-for="(foods,index) in shopcart" >
                        <div class="fl">
                            <div class="mr5 fl"></div>{{foods.title}}
                        </div>
                        <div class="fr">
                            <div v-if="foods.sale_sku==0"><div class="num">已售罄</div></div>
                            <div v-else>
                            <div class="num">
                              <i class="jian fl" @click="reduce(index)"/><div class="fl no">{{foods.num}}</div><i class="jia fl" @click="addnum(index)"/>
                              <div class="clear"></div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
            <div class="footercart" v-if="isfootershow">
                <div class="left fl">
                    <div class="car fl" @click="showcart">
                        <img src="../../../static/image/index_btn_cart@3x.png">
                        <span>{{totalnum}}</span>
                    </div>
                    <div class="txt">
                        <div class="price">￥{{totalprice}}</div>
                        <div class="black9">配送费:￥</div>
                    </div>
                </div>
                <div class="fr">
                   去支付
                </div> 
            </div>
    	</div>
</template>

<script type="text/javascript">
	import api from '../../fetch/api'
    import vBuycart from './buyevent'
    // import vGuige from './guige'
	export default{
		data(){
			return{
                cateid:0,//左侧idx
				catename:[],
                IMG_URL:"https://o2o.jhcms.cn/attachs/",
                cartshow:false,
                ismaskshow:false,
                isfootershow:true,
                shopcart:[],
                shopid:this.$route.query.shopid
                // foodlist:[]
			}
		},
		mounted(){
			var that=this
			api.shopdetail({"shop_id":this.shopid},function(res){
	    		// console.log(res)
                that.catename=res.data.products;
	    	})

		},
        created(){
            //购物车初始化
            this.$store.dispatch('init',this.shopid);
            this.total()
            //赋值
            this.shopcart = this.$store.state.cartList[this.shopid]

        },
        components:{vBuycart},
        props:[''],
        computed: {
            totalnum:function(){
                let num  = 0 
                for (var i in this.shopcart){
                    num += this.shopcart[i]['num']
                }
                return num
            },
            totalprice:function(){
                let price = 0
                for (var i in this.shopcart){
                    price += this.shopcart[i]['num']*this.shopcart[i]['price']
                }
                return price.toFixed(2)
            }
        },
        methods:{
            //购物车总数量和总价格
            total:function(){
                this.refresh()
            },
            //购物车弹出层显示隐藏
            showcart(){
                this.refresh()
                this.cartshow = true
                this.ismaskshow = true
            },
            hidecart(){
                this.cartshow = false
                this.ismaskshow = false
            },
            hidefooter(msg){
                this.isfootershow = msg
            },
            // 购物车数量
            addnum(index){
                this.$store.dispatch('add',{sku_id:this.shopcart[index].sku_id ,num:1,shop_id:this.shopid})
                this.refresh()
            },
            reduce(index){
                this.$store.dispatch('add',{sku_id:this.shopcart[index].sku_id  ,num:-1,shop_id:this.shopid})
                this.refresh()
            },
            //购物车数据更新
            refresh(){
                this.shopcart = this.$store.state.cartList[this.shopid]
            },
            clearcart(){
                this.$store.dispatch('clear',this.shopid)
                this.hidecart()
                this.refresh()
                console.log(this.shopcart)
            },
            switchleft(index){
                this.cateid = index
            }
        }
	}
</script>
