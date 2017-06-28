<template>
	<div class="starBg">
		<span class="star" :style="starwidth"></span>
	</div>
</template>

<script type="text/javascript">
	export default{
		data(){
			return{
				starwidth:'width:'+this.stwidth+'%'
			}
		},
		mounted(){
			console.log('star中的:'+this.stwidth)
		},
		props:['stwidth'],
	}
</script>
