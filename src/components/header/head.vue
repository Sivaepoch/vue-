<template>
	<div class="headertop">
		<div class="left"></div>
		<p>{{toptitle}}</p>
		<div class="right"></div>
	</div>
</template>

<script type="text/javascript">
	export default{
		props:['toptitle']
	}
</script>
<style type="text/stylus" lang="stylus">
	.headertop
		width 100%
		height 40px
		background-color #3190E8
		color #fff
		display flex
		align-items center
		font-size 18px
		.left,.right
			width 20px
			height 20px
		p
			flex 1
			text-align center
</style>