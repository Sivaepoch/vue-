export default{
	test_test : ({commit} , param) => commit('TEST_TEST',param),
	add : ({commit} , param) => commit('ADD',param),
	init : ({commit} , param) => commit('INIT',param),
	clear : ({commit} , param) => commit('CLEAR',param),
	// totalnum : ({commit} , param) => commit('TOTALNUM',param)
}