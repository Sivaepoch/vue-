<template>
	<div class="page">
		<div class="detailTop">
			<div class="top">
				<div class="left fl">
					<div class="pic fl">
	                    <img :src="IMG_URL+pulldown.logo"/>
	                    <div class="blacktip"><span v-if="pulldown.yy_status==0 || pulldown.yysj_status==0">打烊了</span><span v-else-if="pulldown.yy_status==1 && pulldown.yysj_status==1" class="doing">营业中</span></div>
	                </div> 
	                <div class="text">
	                    <div class="detailTit">{{pulldown.title}}</div>
	                    <span class="peisong">{{pulldown.min_amount}}元起送/{{pulldown.pei_time}}分钟送达/配送费{{pulldown.freight_stage}}元</span>
	                    <div class="activity">
							<div class="black6 youhui whiteColor">
								<div v-if="pulldown.first_amount>0">
									<div class="shou acti"><i class="ico_shou"></i>新用户首单优惠{{pulldown.first_amount}}元</div>
								</div>
								<div v-if="pulldown.youhui_title">
									<div class="jian acti"><i class="ico_jian"></i>{{pulldown.youhui_title}}</div>
								</div>
							</div>
						</div>
					</div>
                </div>
                <div class="right fr">
	                <div class="shouc"><span v-if="pulldown.collect==1">收藏</span><span v-else>取消</span></div>
	                <div class="pulldown"><span>活动</span></div>
	            </div>
	            <div class="clear"></div> 
			</div>
			<div class="detailtishi"><span>用餐高峰请提前下单，O(∩_∩)O谢谢！！</span></div>
		</div>
		<div class="detailNav">
	        <div v-for="(items,index) in navTab" :class=" {nav_active : index == topnav}" @click="switchTopnav(index)">
	            {{items}}
	        </div>
	    </div>
	    <v-container class="container_mid" :topnav="topnav"></v-container>
	</div>
</template>

<script type="text/javascript">
	import api from '../../fetch/api'
	// import vFood from '../../components/common/fooddetail'
	import vContainer from './container/container'
	import vBuycart from '../../components/common/buyevent'
	export default{
		data(){
			return {
				pulldown:{
					aa:1
				},
                topnav:0,
				IMG_URL:"https://o2o.jhcms.cn/attachs/",
				navTab:['商品','评价','详情'],
				shopcart:[],
				cartNum:0,
				shopid:this.$route.query.shopid
			}
		},
		components:{vBuycart,vContainer},
	    created(){
	    	var that = this
	    	api.shopdetail({"shop_id":this.shopid},function(res){
	    		that.pulldown=res.data.shopinfo;
	    	})
	    },
	    methods:{
	    	switchTopnav(index){
	    		this.topnav = index
	    	}
	    }

	}
</script>
