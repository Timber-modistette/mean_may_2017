var app = angular.module('app', []);

app.factory('ProductFactory', function(){
	var factory = {};
	var products = [
		{name:'pizza', price:500, quanity:50}
	];

	factory.createProduct = function(newProduct, callback){
		newProduct.quanity = 50;
		products.push(newProduct);
		callback(); 
	}
	factory.getProducts = function(callback){
		callback(products);
	}
	factory.deleteProduct = function(product,callback){
		var del = products.indexOf(product);
		products.splice(del,1);
		callback();
	}
	factory.buyProduct = function(product,callback){
		var i = products.indexOf(product);
		products[i].quanity--;
		callback();
	}
	return factory;
})


app.controller('ProductsController', function($scope, ProductFactory){
	$scope.products = [];
	$scope.createProduct = function(newProduct){
		console.log(newProduct);
		ProductFactory.createProduct(newProduct,function(){
			$scope.getProducts();
			$scope.newProduct = {};
		});
	}
	$scope.getProducts = function(){
		ProductFactory.getProducts(function(products){
			$scope.products = products;
			console.log(products)
		})
	}
	$scope.deleteProduct = function(product){
		ProductFactory.deleteProduct(product,$scope.getProducts)
	}

})

app.controller('OrdersController', function($scope, ProductFactory){
	$scope.products = [];

	$scope.getProducts = function(){
		ProductFactory.getProducts(function(products){
			$scope.products = products;
			console.log(products)
		})
	}
	$scope.buyProduct = function(product){
		if(product.quanity <= 0){
			$scope.error = "Not available";
		}else{
			$scope.error = "";
			ProductFactory.buyProduct(product, $scope.getProducts)
		}
			
	}

})