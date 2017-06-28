<template>
	<div class="food_shoplist">
		<div class="shopList" v-for="(item,index) in shoplist">
			<router-link :to="{path:'/shopdetail',query:{shopid:item.shop_id}}">
				<div class="top">
					<div class="left">
						<div class="left_pic">
							<img :src="IMG_URL+item.logo">
						</div>
						<div class="list-text">
							<h3>{{item.title}}</h3>
							<v-star class="mr5"  :stwidth="item.score*20"></v-star><span>{{item.score}}分</span>
							<p class="peisong"><span class="black9">{{item.min_amout}}元起送/配送费{{item.freight}}元</span></p>
						</div>
					</div>
					<div class="right">
						<div v-if="item.pei_type==1">
							<div class="bg">平台专送</div>
						</div>
						<div v-else>
							<div class="bg">商家配送</div>
						</div>
						<p class="time">{{item.pei_time}}分钟</p>
						<p class="black9">{{item.pei_distance}}km</p>
					</div>
					<div class="clear"></div>
				</div>
				<div class="activity">
					<div class="fr"></div>
					<div class="black6 youhui">
						<div v-if="item.first_amount>0">
							<div class="shou acti"><i class="ico_shou"></i>新用户首单优惠{{item.first_amount}}元</div>
						</div>
						<div v-if="item.youhui_title">
							<div class="jian acti"><i class="ico_jian"></i>{{item.youhui_title}}</div>
						</div>
					</div>
				</div>
			</router-link>
		</div>
	</div>
</template>

<script type="text/javascript">
	import api from '../../fetch/api';
	import vStar from './star'
	export default{
		data(){
			return {
				IMG_URL:"https://o2o.jhcms.cn/attachs/",
				shoplist:[],
			}
		},
		created(){
			var that = this;
			api.shoplist({page:1},function(res){
				console.log(res)
				that.shoplist=res.data.shoplist
			})
		},
		components:{vStar}
	}
</script>
