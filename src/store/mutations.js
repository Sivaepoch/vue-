import * as type from './mutations-types.js'
import { getStore, setStore} from '../util/mutils'

export default{
    [type.INIT](state,shop_id) {
    	state.cartList = getStore('ECart');
    	if(state.cartList){
    		state.cartList = JSON.parse(getStore('ECart'));
    		if(state.cartList[shop_id]){
    			state.cartList[shop_id] = state.cartList[shop_id]
    		}else{
				state.cartList[shop_id] = {}
    		}
    	}else{
    		state.cartList = {}
    		state.cartList[shop_id] = {}
    	}
    	setStore('ECart',state.cartList)
    },
    [type.ADD](state,{sku_id,num,shop_id,info}) {
    	let cart = state.cartList
	    if(cart[shop_id][sku_id]){
	        cart[shop_id][sku_id]['num'] = parseInt(cart[shop_id][sku_id]['num'],  10) +   parseInt(num, 10);

	    }else{
	        cart[shop_id][sku_id] = info;
	        cart[shop_id][sku_id]['sku_id'] = sku_id;
	        cart[shop_id][sku_id]['num'] = parseInt(num, 10);
	        if(cart[shop_id][sku_id]['num'] < 0 ){cart[shop_id][sku_id]['num'] = 0}
	    }
	    if(cart[shop_id][sku_id]['num'] > 99){
	        cart[shop_id][sku_id]['num'] = 99;
	    }else if(parseInt(cart[shop_id][sku_id]['sale_type'], 10) > 0){
	        if(cart[shop_id][sku_id]['num'] > cart[shop_id][sku_id]['sale_sku']){
	            cart[shop_id][sku_id]['num'] = cart[shop_id][sku_id]['sale_sku'];
	        }
	    }
	    if(cart[shop_id][sku_id]['num'] > cart[shop_id][sku_id]['sale_sku']){
	        cart[shop_id][sku_id]['num'] = cart[shop_id][sku_id]['sale_sku'];
	    }
	    var product_list = {};
	    for(var k in cart[shop_id]){
	        cart[shop_id][k]['num'] = parseInt(cart[shop_id][k]['num'], 10)
	        if(cart[shop_id][k]['num'] > 0){
	            product_list[k] = cart[shop_id][k];
	        }
	    }
	    cart[shop_id] = product_list;
	    // state.cartList[shop_id]=cart[shop_id];

	    // state.cartList = Object.assign({}, cart);
	    setStore('ECart',state.cartList)
    },
    [type.CLEAR](state,shop_id){
    	state.cartList[shop_id] = {};
    	setStore('ECart',state.cartList)
    }
}