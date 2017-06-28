<template>
	<div class="page">
		<!-- <v-header :toptitle="toptitle"></v-header> -->
		<div class="container_mid">
			<div class="takeout_banner">
				<div class="swiper-container">
					<div class="swiper-wrapper">
						<div class="swiper-slide" v-for="(item,index) in banners">
							<a href="javascript:;" :style="{'background':'url('+IMG_URL+item.thumb+') no-repeat center top','background-size':'cover'}"></a>
						 	<!-- <a href="javascript:;"><img class="imgload" :src="IMG_URL+item.thumb"  alt="首页banner图片01"></a> -->
						</div>
					</div>
					<div class="swiper-pagination"></div>
			    </div>
			</div>
			<div class="takeout_nav">
				<div v-for="(item,index) in navs">
					<router-link to="/shoplist">
						<img :src="IMG_URL+item.photo">
						<p>{{item.title}}</p>
					</router-link>
				</div>
				<p class="clear"></p>
			</div>
			<div class="recommend">
				<div v-for="(item,index) in recommend">
					<div v-if="index==0">
						<div class="xianQiang">
							<img :src="IMG_URL+item.thumb" alt="">
						</div>
					</div>
					<div v-else :class="['box','box'+index]">
						<div>
							<img :src="IMG_URL+item.thumb" :class="['tuijian','tuijian'+index]"/>
						</div>
					</div>
				</div>
				<div class="clear"></div>
			</div>
			<div class="nearshop mt10">
				<div class="nearshopTit border_b">
					<i class="ico_shop"></i>
					附近商铺推荐
				</div>
				<v-shoplist></v-shoplist>
			</div>
		</div>
	</div>
</template>

<script>
	import vHeader from '../../components/header/head';
	import vShoplist from '../../components/common/shoplist';
	import Swiper from '../../plugins/swiper.min.js'
 	import '../../../static/css/swiper.min.css'
 	import axios from 'axios'
 	import Qs from 'qs'
 	import api from '../../fetch/api'

	export default{
		data(){
			return{
				toptitle:'首页',
				banners:[],
				IMG_URL:"https://o2o.jhcms.cn/attachs/",
				navs:[],
				recommend:[]
			}
		},
		created(){
			var that = this;
			api.index({page:1},function(res){
				console.log(res.data)
				that.banners=res.data.banner
				that.navs=res.data.waimai_cate
				that.recommend=res.data.adv
			})
		},
		mounted(){
			let mySwiper = new Swiper('.swiper-container', {
		        pagination: '.swiper-pagination',
		        slidesPerView: 1,
		        paginationClickable: true,
		        spaceBetween: 0,
		        loop: true,
			    longSwipesRatio: 0.3,
			    touchRatio:1,
			    observer:true,//修改swiper自己或子元素时，自动初始化swiper
			    observeParents:true,//修改swiper的父元素时，自动初始化swiper
		    })
		},
		components:{vHeader,vShoplist}
	}
</script>

<style type="text/stylus" lang="stylus">
	.swiper-container
		img
			width 100%
	.takeout_banner
		height 200px
		a
			display block
			width 100%
			height 100%
			background-size cover
		.swiper-pagination-bullet
			width 18px
			height 4px
			background-color rgba(0,0,0,.4)
			border-radius 8px
		.swiper-container
			height 100%
		.swiper-pagination-bullet-active
			opacity 1
			background-color #ff9900 
			box-shadow 0 1px 1px 0 rgba(0,0,0,.2)
	.takeout_nav
		background-color #fff
		padding-bottom 10px
		div
			width 25%
			text-align center
			margin-top 10px
			float left
			img
				width 40px
				height 40px
			p
				font-size 12px
				line-height 20px
	.recommend
		width: 100%;
		.box
			position: relative
			overflow: hidden
			line-height: 0
			margin-left: 1%
			background: #f8f8f8
			div
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%; 
				line-height: 0; 
				overflow: hidden;
			img
				width: 100%
				height 100%
		.box1
			width: 43%;
			padding: 24% 0;
			float: left; 
			height: 0;
			border-radius: 10px;
			border:2px solid #dedede;
			box-sizing: border-box;
			-webkit-box-sizing:border-box;
			img
				height: 100%
		.box2,.box3
			width: 54%;
			padding: 11.6% 0;
			float: right; 
			margin-left: 1%;
			border-radius: 10px;
			border:2px solid #dedede;
			box-sizing: border-box;
			-webkit-box-sizing:border-box;
			margin-right: 1%;
		.box3
			margin-top: 3px;
	.tuijian_1
		width:100%;height: 100%;
	.tuijian_2
		width:100%;height: 100%;
	.tuijian_3
		width:100%;height: 100%;
	.xianQiang
		height:80px;
		background:#f8f8f8;
		width:100%;
		margin-top:10px;
		margin-bottom: 10px;
		img
			height: 80px;
			width: 100%;
</style>