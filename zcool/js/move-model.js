function startMove(dom,json,fn){
	clearInterval(dom.timer);
	dom.timer = setInterval(function(){
		var isOk = true;
		for(var attr in json){
			if(attr == "opacity"){
				var current = Math.round(getStyle(dom,attr) * 100);
			}else{
				var current = parseInt(getStyle(dom,attr));
			}
			if(current !== json[attr]){
				isOk = false;
			}
			var dis = json[attr] - current;
			var speed = dis > 0 ? Math.ceil(dis / 10) : Math.floor(dis / 10);
			if(attr == "opacity"){
				dom.style[attr] = (current + speed) / 100;
				dom.style.filter = "alpha(opacity=" + (current + speed) + ")";
			}else{
				dom.style[attr] = current + speed + "px";
			}
		}

		if(isOk){
			clearInterval(dom.timer);
			if(fn){
				fn();
			}
			return;
		}
	},30)
}

function getStyle(dom,property){
	if(dom.currentStyle){
		return dom.currentStyle[property];
	}else{
		return getComputedStyle(dom)[property];
	}
}



