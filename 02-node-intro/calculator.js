var calculator = {
	add:function(x,y){
		return x + y;
	},
	subtract:function(x,y){
		return x - y;
	},
	multiply:function(x,y){
		return x * y;
	},
	divide:function(x,y){
		return x / y;
	}
}

var x = 100,
	y = 50;

console.log(calculator.add(x,y));
console.log(calculator.subtract(x,y));
console.log(calculator.multiply(x,y));
console.log(calculator.divide(x,y));