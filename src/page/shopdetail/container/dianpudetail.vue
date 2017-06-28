<template>
	<div class="dianpu">
		<div class="haspad">
            <div class="xinxi">
                <div><img src="" class="img1"/><span>{{xinxi.phone}}</span></div>
            </div>
            <div class="xinxi">
                <div><img src="" class="img1 fl"/><span>{{xinxi.addr}}</span></div>
            </div>
            <div class="xinxi">
                <div><img src="" class="img1 fl"/><span>营业时间: {{xinxi.yy_stime}}--{{xinxi.yy_ltime}}</span></div>
            </div>
            <div class="xinxi">
                <div><image src="" class="img1 fl"/><span>配送服务:<div v-if="xinxi.pei_type==0">商家配送</div><div v-else if="xinxi.pei_type==1">第三方配送</div><div v-else if="xinxi.pei_type==2">第三方代购及配送</div><div v-else if="xinxi.pei_type==1">用户自提</div></span></div>
            </div>
        </div>
        <!-- <div class="activity">
            <div wx:if="{{xinxi.first_amount>'0.00'}}" class="activity_single">
                <div class="ico"><image src="../../image/label_icon_shou@3x.png" class="fl mr10"/><div>新用户首单优惠{{xinxi.first_amount}}元</div></div>
            </div>
            <div wx:if="{{xinxi.manjian.title}}"  class="activity_single">
                <div class="ico"><image src="../../image/label_icon_jian@3x.png" class="fl mr10"/><div>{{xinxi.manjian.title}}</div></div>
            </div>
        </div> -->
        <div class="shangjiaPic">
            <div class="picTitle">商家资质</div>
            <div class="pics">
                <div  class="pic"  v-for="pic in xinxi.verify"><img :src="IMG_URL+pic"/></div>
            </div>
        </div> 
        <div class="shangjiaPic">
            <div class="picTitle">商家实景</div>
            <div class="pics">
                <div  class="pic" v-for="pic in xinxi.album"><img :src="IMG_URL+pic"/></div>
            </div>
        </div>
	</div>
</template>

<script type="text/javascript">
	import api from '../../../fetch/api'
	export default{
		data(){
			return {
				shopid:this.$route.query.shopid,
				xinxi:{},
				IMG_URL:"https://o2o.jhcms.cn/attachs/",
			}
		},
		created(){
			var that = this
			api.dianpudetail({shop_id:this.shopid},function(res){
				console.log(res.data)
				that.xinxi = res.data.info
			})
		}
	}
</script>