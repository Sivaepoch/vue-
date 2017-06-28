<template>
    <div>
    	<div v-if="foods.specs.length>0">
            <div class="spec_btn" @click="guigeshow">可选规格</div>
            <div class="mask_bg3" v-if="ismaskshow" @click="hideguige"></div>
            <div :class="['spec_size',{spec_size_active: guigepopup}]">
                <div class="actTitle">
                    <div class="pic">
                        <img :src="IMG_URL+this.foods.photo"/>
                    </div>
                    <div class="textpart">
                        <div class="price"><span>￥</span>{{spectitle.price}}</div>
                        <div class="sale black9">已售{{this.foods.sales}}</div>
                        <div class="choosed">已选:{{spectitle.spec_name}}</div>
                    </div>
                    <img src="../../../static/image/close.png" class="close" @click="hideguige"/>
                </div> 
                <div class="guige_detail border_b">
                    <div class="smtitle">规格</div>
                    <div class="guige border_b">
                        <div v-for="(item,index) in this.foods.specs" :class="['chooseSize',{'chooseSize_active':index == guigechooseindex}]" @click="switchspec(index)">{{item.spec_name}}</div>
                    </div>
                    <div class="numCount num numshow">
                        <span class="smtitle fl">数量</span>
                      <!--   <div v-if="item.sale_sku==0"><div class="num">已售罄</div></div> -->
                        <!-- <div v-else> -->
                        <div class="num guigenum">
                            <transition name="move">
                                <div class="reduce" v-if="foodNum>0"><i class="jian" @click="reduce"/></div>
                            </transition>
                            <div class="fl no"  v-if="foodNum>0">{{foodNum}}</div><i class="jia fl" @click="addnum"/>
                            <div class="clear"></div>
                        </div>
                        <!-- </div> -->
                    </div>
                    <div class="clear"></div>
                    <div class="btn">
                        <div class="chooseOk">选好了</div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <div v-if="foods.sale_sku==0"><div class="num">已售罄</div></div>
            <div v-else>
            <div class="num">
                <transition name="move">
                 <div class="reduce" v-if="foodNum>0"><i class="jian" @click="reduce"/></div>
                </transition>
              <div class="no" v-if="foodNum>0">{{foodNum}}</div><i class="jia" @click="addnum"/>
              <div class="clear"></div>
            </div>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
    import {mapState, mapMutations} from 'vuex'
	export default{
		data(){
			return {
				obj:{ "title" :this.foods.title,
                 "photo" : this.foods.photo,
                 "price" : this.foods.price,
                 'product_id':this.foods.product_id,
                 "cate_id" : this.foods.cate_id,
                 "num":'10',
                 "shopid": this.foods.shop_id,
                },
                guigepopup:false,
                ismaskshow:false,
                IMG_URL:"https://o2o.jhcms.cn/attachs/",
                spectitle:{},
                guigechooseindex:0,
			}
		},
		props:['foods','shopcart'],
		created:function(){
            console.log(this.shopcart)
            if(this.foods.specs.length>0){
                this.obj.sku_id = this.foods.specs[this.guigechooseindex].product_id + '_' + this.foods.specs[this.guigechooseindex].spec_id
                    this.obj.sale_sku = this.foods.specs[this.guigechooseindex].sale_sku
                    this.obj.price = this.foods.specs[this.guigechooseindex].price  
            }else{
                this.obj.sku_id = this.foods.product_id + '_0'
                 this.obj.sale_sku = this.foods.sale_sku
            }
            
            this.$store.dispatch('init',this.foods.shop_id);
        },
        computed:{
            foodNum:function(){
                 if(this.foods.specs.length > 0 ){
                    console.log('更新')
                    this.obj.sku_id = this.foods.specs[this.guigechooseindex].product_id + '_' + this.foods.specs[this.guigechooseindex].spec_id 
                    console.log(this.obj.sku_id)
                    if(this.shopcart&&this.shopcart[this.obj.sku_id]){
                        return this.shopcart[this.obj.sku_id]['num']
                    }else{
                        return 0;
                    }
                 }else{
                    if(this.shopcart&&this.shopcart[this.obj.sku_id]){
                        return this.shopcart[this.obj.sku_id]['num']
                    }else{
                        return 0;
                    }
                 }
                 
            }
        },
		methods:{
			addnum(){
                this.$store.dispatch('add',{sku_id:this.obj.sku_id ,num:1,shop_id:this.foods.shop_id,info:this.obj})
                this.$emit('totalthing')
			},
            reduce(){
                this.$emit('totalthing')
                this.$store.dispatch('add',{sku_id:this.obj.sku_id ,num:-1,shop_id:this.foods.shop_id,info:this.obj})
            },
            guigeshow(msg){
                this.guigechooseindex = 0
                msg = false
                this.$emit('hidefooter',msg)
                this.spectitle.price = this.foods.specs[0].price
                this.spectitle.spec_name = this.foods.specs[0].spec_name   
                this.guigepopup = true
                this.ismaskshow = true
            },
            hideguige(msg){
                msg = true
                this.$emit('hidefooter',msg)
                this.guigepopup = false
                this.ismaskshow = false
               
            },
            switchspec(index){
                this.obj.sku_id = this.foods.specs[index].product_id + '_' + this.foods.specs[index].spec_id
                this.obj.sale_sku = this.foods.specs[index].sale_sku
                this.obj.price = this.foods.specs[index].price  

                console.log(this.obj.sku_id)
                console.log(this.shopcart)
                console.log(this.$store.state.cartList['10006'])
                this.spectitle.price = this.foods.specs[index].price
                this.spectitle.spec_name = this.foods.specs[index].spec_name
                this.guigechooseindex = index
            }
		}
	}
</script>

<style type="text/css">
    .num{display: flex;}
    .reduce{transform: translate3d(0, 0, 0);transition: all 0.3s linear;}
    .reduce .jian{transition: all 0.4s linear;transform: rotate(0);}
    .reduce.move-enter-active,.reduce.move-leave-active{opacity: 0;transition: all 0.3s linear;transform:translate3d(24px,0,0);}
    .reduce.move-enter-active .jian,.reduce.move-leave-active .jian{transform: rotate(180deg);}
        
</style>
