var ECart = function(shop_id){
    this.shop_id = shop_id;
    // console.log(this.ECart())
    this.init();
}

//初始化购物车
ECart.prototype.init = function(){
	try {
    	this.cart_list=window.localStorage.getItem('ECart') || {};
        console.log(window.localStorage.getItem('ECart'))
	} catch (e) { 
		//todo...  
	}
    this.shop_cart = this.cart_list[this.shop_id] || {}; 
    this.save();
}

//保存购物车信息
ECart.prototype.save = function(){
    console.log('save')
    console.log(this.shop_id)
    console.log(this.shop_cart)
    console.log(this.cart_list)
    this.cart_list[this.shop_id] = this.shop_cart;
       // wx.setStorageSync("Ecart", this.cart_list);
    try {
    	 window.localStorage.setItem('ECart', this.cart_list);
	} catch (e) { 
		//todo...  
	}
},

/* 增加
 * product,产品id及product_id product_id_spec_id
 * spec,规格id及spec_id,选填
 * info,要存放的数据,对象格式{'title':'','price':'',...}
 * 注意:请将商品数量自行更新
 */
ECart.prototype.add = function(sku_id, num, info){
    
    if(this.shop_cart[sku_id]){
        this.shop_cart[sku_id]['num'] = parseInt(this.shop_cart[sku_id]['num'],  10) +   parseInt(num, 10);
    }else{
        this.shop_cart[sku_id] = info;
        this.shop_cart[sku_id]['sku_id'] = sku_id;
        this.shop_cart[sku_id]['num'] = parseInt(num, 10);
    }
    if(this.shop_cart[sku_id]['num'] > 99){
        this.shop_cart[sku_id]['num'] = 99;
    }else if(parseInt(this.shop_cart[sku_id]['sale_type'], 10) > 0){
        if(this.shop_cart[sku_id]['num'] > this.shop_cart[sku_id]['sale_sku']){
            this.shop_cart[sku_id]['num'] = this.shop_cart[sku_id]['sale_sku'];
        }
    }
    if(this.shop_cart[sku_id]['num'] > this.shop_cart[sku_id]['sale_sku']){
        this.shop_cart[sku_id]['num'] = this.shop_cart[sku_id]['sale_sku'];
    }
    var product_list = {};
    for(var k in this.shop_cart){
        this.shop_cart[k]['num'] = parseInt(this.shop_cart[k]['num'], 10)
        if(this.shop_cart[k]['num'] > 0){
            product_list[k] = this.shop_cart[k];
        }
    }
    this.shop_cart = product_list;
    this.save();
}

ECart.prototype.remove = function (sku_id){
    var product_list = {};
    for(var k in this.shop_cart){
        this.shop_cart[k]['num'] = parseInt(this.shop_cart[k]['num'], 10)
        if(this.shop_cart[k]['num'] > 0 && k != sku_id){
            product_list[k] = this.shop_cart[k];
        }
    }
    this.shop_cart = product_list;
    this.save();      
}

ECart.prototype.clear = function(){
    this.shop_cart = {};
    this.save();
}

/* 商品
 * sku_id
 */
ECart.prototype.product = function(sku_id){
    return this.shop_cart[sku_id] || {};
}

/* 商品数量
 * sku_id
 */
ECart.prototype.product_num = function(sku_id){
    if(typeof(this.shop_cart[sku_id]) == 'undefined'){
        return 0;
    }else{
        return this.shop_cart[sku_id]['num'] || 0;
    }
}

/** 
 * 购物车所有商品
 * shop_id，可选
 */    
ECart.prototype.product_list = function(){
    return this.shop_cart;
}

ECart.prototype.total_count = function(){
    var count = 0;
    for(var i in this.shop_cart){
        count += parseInt(this.shop_cart[i]['num'] || 0, 10);
    }
    return count;
}

ECart.prototype.cate_count = function(cate_id){
    var count = 0;
    for(var i in this.shop_cart){
        if(this.shop_cart[i]['cate_id'] == cate_id){
            count += parseInt(this.shop_cart[i]['num'] || 0, 10);
        }
    }
    return count; 
}

ECart.prototype.total_price = function(){
    var price = 0;
    for(var i in this.shop_cart){
        var num = parseInt(this.shop_cart[i]['num'] || 0, 10);
        price += parseFloat(this.shop_cart[i]['price'], 10) * num;
    }
    return price.toFixed(2);
}


ECart.prototype.all_shopProduct=function(){
    
}

export default{
    ECart
}