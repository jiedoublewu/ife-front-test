var divWrap=document.querySelector("#root");
// divWrap.className="active";
// var clas=divWrap.setAttribute("class","active");
// console.log(divWrap.getAttribute("class"));
var deleteID;

var btnList=document.querySelectorAll("button");
function addEvent(element,type,handler){
  if(element.addEventListener){
   element.addEventListener(type,handler,false);
 }
 else if(element.attachEvent){
   element.attachEvent("on"+type,handler);
 }else{
   element["on"+type]=handler;
 }

}


var tag=true;
function Tree(root){
  this._root=root;
  this.nodes=[];
  this.search=[];
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
   contains:function(node,content){
    var equal=(node.innerHTML.split("<")[0].replace(/(^\s+)|(\s+$)/g,"")===content);
    if(!equal&&tag){
     this.search.push(node);
     for(var i=0;i<node.children.length;i++){
       this.contains(node.children[i],content);
     }
       }else if(equal){
       this.search.push(node);
       tag=false;
       // console.log(tree.search);
       return ;
     }
     this.init();
    this.changeColor(tree.search,1);
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
   changeColor:function(result,traseversal){
   	var i=0;
   	result[0].setAttribute("class","default");
   	var timer=setInterval(function(){
        i++;
        if(i<result.length){
               result[i].setAttribute("class","active");
               result[i-1].setAttribute("class","default");
        }
        if(i==result.length){
             if(traseversal===1){
                result[i-1].setAttribute("class","found");
             }else if(traseversal===2){
                result[i-1].setAttribute("class","default");
             }
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
   					that.nodes[i].setAttribute("class","active"); 
   					deleteID=i;          
            // console.log(deleteID);

          })
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
   		document.querySelectorAll("div")[i].setAttribute("class","default");
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
     });
      tree.init();
      tree.changeColor(tree.nodes,2);
    });





    addEvent(btnList[1],"click",function(){
    	tree.nodes[deleteID].parentNode.removeChild(tree.nodes[deleteID]);
    });
    


    var handler=function(e){
      if(deleteID){
     var searchInput=document.querySelector("input").value.trim(); 
     if(searchInput){
      var yyy=document.createElement("div");
     yyy.innerHTML=searchInput;       
     tree.nodes[deleteID].appendChild(yyy);
     e.stopPropagation();
     tree.nodes=[];
     tree.traseversal(function(node){      
       tree.nodes.push(node);
       tree.addClick();
     });
     }else{
      alert("请输入要添加的值");
     }    
     
      }else{
        alert("请选择一个模块进行添加");
      }
    
     
   }
   addEvent(btnList[2],"click",handler);

  addEvent(btnList[3],"click",function(){
    
var input=document.querySelector("input").value;
     tree.contains(tree._root,input.trim());
     input="";
    });


