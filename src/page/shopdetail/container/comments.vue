<template>
	<div class="comments">
		<div class="pingfen mt10">
            <div class="left border_r">
                <div class="number">{{evaluate.avg_score}}</div>
                <div class="ping">综合评分</div>
                <div class="black6">商家好评率{{evaluate.avg_good}}%</div>
            </div>
            <div class="pingfenStar">
                <div class="taiduNum mt5">
                    <span>商家评分</span>
                    <v-star class="mr5"  :stwidth="evaluate.avg_score*20"></v-star>
                    <span class="fenshu ml5">{{evaluate.avg_score}}分</span>
                </div>
                <div class="peisongNum mt5">
                    <span>配送评分</span>
                    <v-star class="mr5"  :stwidth="evaluate.avg_score_peisong*20"></v-star>
                    <span class="fenshu ml5">{{evaluate.avg_score_peisong}}分</span>
                </div>
            </div>
            <div class="clear"></div>
        </div>
        <div class="sj_Pingjia mt10">
            <div class="qiehuan border_b">
                <div class="switchNav">
                    <div v-for="(item,index) in switchnav" @click="switchbox(index)" :class="{switchNav_active: index == currentIndex}">
                        {{item.name}}({{item.num}})
                    </div>
                </div>
                <!-- <label for="" class="checkbox">
                    <input type="checkbox" value="只看有内容的评价"  @click="hascon"/>只看有内容的评价
                </label> -->
            </div>
            <div class="pingjia">  
                <div class="box  border_b" v-for="(item,index) in pjDetail">
                    <div class="top mb10">
                        <div class="left fl">
                            <div class="fl pic">   
                                <image :src="IMG_URL+item.face"/>
                            </div>
                            <div class="text">
                                <div class="username">{{item.nickname}}</div>
                                <div>
                                    <v-star :stwidth="item.score*20"></v-star>
                                    <span  class="black9 ml10">{{item.pei_time}}送达</span>  
                                </div>
                            </div>
                        </div>
                        <div class="fr black9 createTime">
                            {{item.dateline}}
                        </div>
                        <div class="clear"></div>
                    </div>
                    <div class="detail mt5">
                        {{item.content}}
                    </div>
                    <div v-if="item.have_photo==1">
                        <div class="pics mt5">
                            <div class="pic" v-for="(item,index) in item.comment_photos">
                                <div><image :src="IMG_URL+item.photo"/></div>
                            </div>
                        </div>
                    </div>
                    <div v-if="item.reply!=''" class="shopreply">
                        <div class="">商家回复<span class="black9">({{item.reply_time}})</span>:</div>
                        <div>{{item.reply}}</div>
                    </div>
                </div>
            </div>
        </div>
	</div>
</template>
<script type="text/javascript">
	import api from '../../../fetch/api'
	import vStar from '../../../components/common/star'
	export default{
		data(){
			return {
				shopid:this.$route.query.shopid,
				evaluate:{},
				switchnav:[],
				currentIndex:0,
				IMG_URL:"https://o2o.jhcms.cn/attachs/",
				pjDetail:[]
			}
		},
		created(){
			var that =this
			api.comments({shop_id:that.shopid},function(res){
				// console.log(res.data)
				that.evaluate = res.data.comment
				that.switchnav = res.data.switchnav
				that.pjDetail = res.data.comment_list
			})
		},
		// mounted(){
		// 	console.log(this.evaluate)
		// 	console.log(this.evaluate.avg_score)
		// 	console.log(this.evaluate.avg_score*20)
		// },
		components:{vStar},
		methods:{
			switchbox(index){
				this.currentIndex = index
			},
			hascon(){

			}

		}
	}
</script>