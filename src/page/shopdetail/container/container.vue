<template>
	<div>
		<v-food v-if="topnav==0"></v-food>
		<v-comments v-if="topnav==1"></v-comments>
		<v-dian v-if="topnav==2"></v-dian>
	</div>
</template>

<script type="text/javascript">
	import vFood from '../../../components/common/fooddetail'
	import vComments from './comments'
	import vDian from './dianpudetail'
	export default{
		components:{vFood,vComments,vDian},
		props:['topnav']
	}
</script>