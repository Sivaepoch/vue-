<template>
	<div class="page">
		<div class="shoplistNav">
		    <div class="nav  border_b">
		        <div v-for="(item,index) in navtab" class="lei" @click="switchNav">
		            <span>{{item}}</span>
		        </div>
		    </div>
		</div>
		<div class="container_mid container_mid-hastop">
			<v-shoplist></v-shoplist>
		</div>
	</div>
</template>

<script type="text/javascript">
	import vShoplist from '../../components/common/shoplist';
	import api from '../../fetch/api'
	export default{
		data(){
			return {
				// choose:[],
				navtab:["餐饮美食","排序","筛选"],
			}
		},
		components:{vShoplist},
		methods: {
	      switchNav(){}
	    },
	    created(){
	    	var that = this
	    	api.getfilter({},function(res){
	    		console.log(res)
	    		// that.choose=res.data.cates
	    	})
	    }
	}
</script>
