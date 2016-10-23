var divWrap=document.querySelector("#root");
var deleteID;

var btnList=document.querySelectorAll("button");
function addEvent(element,type,handler){
	if(element.addEventListener){
		element.addEventListener(type,handler,false);
	}
	if(element.attachEvent){
		element.attachEvent("on"+type,handler);
	}else{
		element["on"+type]=handler;
	}

}

function Tree(root){
	this._root=root;
	this.nodes=[];
}
    /*
     --------------------------------------
     原型模式充当接口
     --------------------------------------
     */

     Tree.prototype={
     	constructor:Tree,
     /*
     --------------------------------------
     遍历所有的节点
     --------------------------------------
     */
     traseversal:function(callback){
     	(function recurse(currentNode){
     		callback(currentNode);
     		for (var i = 0; i < currentNode.children.length; i++) {
     			recurse(currentNode.children[i]);
     		}

     	})(this._root);
     },
     /*
     --------------------------------------
     判断是否包含某特定值的函数
     --------------------------------------
     */
     contains:function(callback,traseversal){
     	traseversal.call(this,callback);
     },
    /*
     --------------------------------------
     删除某个节点
     --------------------------------------
     */





     /*
     --------------------------------------
     渲染节点函数
     --------------------------------------
     */
     changeColor:function(){
     	var searchInput=document.querySelector("input").value;
     	var i=0;
     	var that=this;
     	that.nodes[i].style.backgroundColor="blue";
     	if(that.nodes[i].childNodes[0].nodeValue.trim()==searchInput.trim()){
     		that.nodes[i].style.backgroundColor="orange";

     		return;
     	}
     	var timer=setInterval(function(){
     		i++;
     		if(i<that.nodes.length){         
     			that.nodes[i].style.backgroundColor="blue";
     			that.nodes[i-1].style.backgroundColor="white";
     			if(that.nodes[i].children.length>=1){
     				if(that.nodes[i].childNodes[0].nodeValue.trim()==searchInput.trim()){
     					that.nodes[i].style.backgroundColor="orange";
     					
     					clearInterval(timer);
     				}
     			}else{
     				if(that.nodes[i].innerHTML==searchInput.trim()){
     					that.nodes[i].style.backgroundColor="orange";

     					clearInterval(timer);
     				}
     			}

     		}

     		if(i==that.nodes.length){
     			that.nodes[i-1].style.backgroundColor="white";
     			clearInterval(timer);
     		}


     	},50);
     	

     },
     /*
     --------------------------------------
     增加节点点击动作
     --------------------------------------
     */
     addClick:function(){
     	var that=this;

     	for (var i = 0; i < that.nodes.length; i++) {
     		(function(i){
     			addEvent(that.nodes[i],"click",
     				function(event){
     					that.init();
     					event.stopPropagation();     					
     					that.nodes[i].style.backgroundColor="pink";   
     					deleteID=i;          
                        console.log(deleteID);
     				});

     		})(i);
     	}
         
     },

     /*
     --------------------------------------
     初始化所有树节点的颜色
     --------------------------------------
     */

     init:function(){
     	var searchInput=document.querySelector("input").value;
     	searchInput="";
     	for (var i = 0; i < document.querySelectorAll("div").length; i++) {
     		document.querySelectorAll("div")[i].style.backgroundColor="white";
     	}
     }






 };


      /*
      -----------------------------------------
      初始化，并进行相关动作
      -----------------------------------------
      */
     


      /*
      -----------------------------------------
      初始化树并遍历各个节点及为各个节点添加功能
      -----------------------------------------
      */
      var tree=new Tree(divWrap);

      tree.traseversal(function(node){
      	
      	tree.nodes.push(node);
      	tree.addClick();
      });
     


      addEvent(btnList[0],"click",function(){
      		tree.nodes=[];
      	tree.traseversal(function(node){	
      	tree.nodes.push(node);
      	tree.addClick();
      	console.log(tree.nodes);
      });
      	tree.init();
      	tree.changeColor();
      });




  
      addEvent(btnList[1],"click",function(){
      	tree.nodes[deleteID].parentNode.removeChild(tree.nodes[deleteID]);
      });
      addEvent(btnList[2],"click",function(){
      	tree.traseversal(function(node){      
      	tree.nodes.push(node);
      	console.log(tree.nodes);      	
        });
      	var searchInput=document.querySelector("input").value.trim();      
      	var yyy=document.createElement("div");
      	yyy.innerHTML=searchInput;      	
      	tree.nodes[deleteID].appendChild(yyy);
        tree.nodes=[];
      	tree.traseversal(function(node){      
      	tree.nodes.push(node);
      	tree.addClick();
        });
      });

