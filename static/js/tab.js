


function doClick(o){
	 o.className="snav_current";
	 var j;
	 var id;
	 var e;
	 for(var i=1;i<=4;i++){ //这里3 需要你修改 你多少条分类 就是多少
	   id ="snav"+i;	   
	   j = document.getElementById(id);
	   e = document.getElementById("ssub"+i);
	   if(id != o.id){
	   	 j.className="snav_link";
	   	 e.style.display = "none";
	   }else{
			e.style.display = "block";
	   }
	 }
	 }

function doClick2(o){
	 o.className="s2nav_current";
	 var j;
	 var id;
	 var e;
	 for(var i=1;i<=4;i++){ //这里3 需要你修改 你多少条分类 就是多少
	   id ="s2nav"+i;	   
	   j = document.getElementById(id);
	   e = document.getElementById("s2sub"+i);
	   if(id != o.id){
	   	 j.className="s2nav_link";
	   	 e.style.display = "none";
	   }else{
			e.style.display = "block";
	   }
	 }
	 }
