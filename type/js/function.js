/*
* @Author: Administrator
* @Date:   2016-11-09 15:56:22
* @Last Modified by:   Administrator
* @Last Modified time: 2016-11-21 18:45:46
*/



//1.获取类名（兼容至IE6）
	function getClass(classname,obj) {
		var obj		= obj||document;
		if (document.getElementsByClassName) {
			return obj.getElementsByClassName(classname);
		} else {
			var arr	= [];
			var objs	= obj.getElementsByTagName('*');
			for (var i = 0; i < objs.length; i++) {
				if (check(objs[i].className,classname)) {
					arr.push(objs[i]);
				}
			}
			return arr;
		};
	}
	function check (lstr,str) {
		var arr	=	lstr.split(" ");
		for (var i = 0; i < arr.length; i++) {
			if (arr[i]==str) {
				return true;
			};
		};
		return false;
	};



//2.设置或者获取元素中的文本内容;兼容IE低版本
	function contentText(obj,value) {
		if (value!=undefined) {

			if (obj.textContent) {
				obj.textContent = value;
			} else {
				obj.innerText = value;
			};

		} else {

			if (obj.textContent) {
				return obj.textContent;
			} else {
				return obj.innerText;
			};

		};

	}



//3.获取元素的样式，注意 并不能设置样式哦/style传入的必须是个字符串

	function getStyle (ele,attr){

		return 	ele.currentStyle?
				ele.currentStyle[attr]
				:
				window.getComputedStyle(ele,null)[attr];

	}



//4.$函数
	function $ (val,obj) {

		var obj = obj || document;//参数初始化
		if (typeof val == "string") {//判断参数是不是字符串
			if (val.charAt(0) == "#") {//判断第一个字符是不是“#”
				return document.getElementById(val.slice(1))//获取ID
			} else if (val.charAt(0) == "."){//判断第一个字符为“.”
				return getClass(val.slice(1),obj)//获取相同类名的元素的集合
			} else if (/^[a-zA-Z0-9]{1,10}$/g.test(val)) {//正则判断是否为标签名
				return obj.getElementsByTagName(val)//获取相同标签的集合
			};
		} else if ( typeof val == "function") {//判断参数是不是传入一个函数
			addEvent(window,"load",val)
		};

	};


//关于节点的操作
  function getChildren(obj){
   var arr=obj.childNodes;
   var newarr=[]
     for (var i = 0; i < arr.length; i++) {
      if(arr[i].nodeType==1){
            newarr.push(arr[i])

      }
     }
     return newarr;

  }
// 获取第一个元素子节点
  function getFirst(obj){
       return getChildren(obj)[0]

  }
// 获取最后一个元素子节点
  function getLast(obj){
       var arr=getChildren(obj)
       return arr[arr.length-1]
       // return arr.pop()
  }

  function getNext(obj){
       var next=obj.nextSibling;
       if(next==null){

        return null
       }
       while(next.nodeType!=1){
        next=next.nextSibling;
        if(next==null){
          return null
        }
       }
        return next;
  }

  function getPrevious(obj){
       var previous=obj.previousSibling;
       if(previous==null){

        return null
       }
       while(previous.nodeType!=1){
        previous=previous.nextSibling;
        if(previous==null){
          return null
        }
       }
        return previous;
  }
// insertAfter、
// 把一个元素追加到一个元素之后
// a插入到b之前
  function insertAfter(a,b){
    var next=getNext(b);
    var parent=b.parentNode;
     if(next){
           parent.insertBefore(a,next)
       }else{
           parent.appendChild(a)
       }

  }


//添加事件
  function addEvent(obj,event,handler){
    if(obj.addEventListener){
      obj.addEventListener(event,handler,false)
    }else{
      obj.attachEvent("on"+event,handler)

    }
  }
//移除事件
  function removeEvent(obj,event,handler){
    if(obj.addEventListener){
      obj.removeEventListener(event,handler,false)
    }else{
      obj.detachEvent("on"+event,handler)

    }
  }

//鼠标事件
  function mousewheel(obj,upfun,downfun){
    if(obj.addEventListener){
      obj.addEventListener("mousewheel",scrollfun,false)//chrome
      obj.addEventListener("DOMMouseScroll",scrollfun,false)//FF
    }else{
      obj.attachEvent("onmousewheel",scrollfun)//IE8以下
    }
    function scrollfun(e){
      var ev=e||window.event;
      var dir=ev.detail||ev.wheelDelta;//FF:ev.detail;IE&chrome:ev.wheelDelta
      if(dir==-3||dir==120){
        upfun.call(obj)
      }else if(dir==3||dir==-120){
        downfun.call(obj)
      }
    }
  }
// 去空格
function trim(str,mode){
      mode=mode||" "
      if(mode=="s"){
        return str.replace(/^\s+|\s+&/g,"")
      }else if(mode=="l"){
        return str.replace(/^\s+/g,"")
      }else if(mode=="r"){
        return str.replace(/\s+$/g,"")
      }else if(mode=="a"){
        return str.replace(/\s+/g,"")
      }else if(mode=="m"){
        var lefts=/^\s+/g.exec(str)[0];
        var rights=/\s+$/g.exec(str)[0];
        str=str.replace(/\s+/g,"");
        // if(lefts){
        //  str=lefts[0]+str;
        // }
        // if(rights){
        //  str=rights[0]+str;
        // }

        str=(lefts?lefts[0]:"")+str+(rights?rights[0]:"");
        return str;
      }
    }




//获取任意一个元素到文档顶部或左边的值：文档坐标

  function getElePosition(obj){
    var ot = obj.offsetTop;
    var _parent = obj.parentNode;
    while(_parent.nodeName != "BODY" ){
      var _pos = getStyle(_parent,"position")
      var _width = parseInt(getStyle(_parent,"borderTopWidth"))
      if (_pos=="absolute"||_pos=="relative") {
        ot = ot +_parent.offsetTop;
        ot += _width;
      }
      _parent = _parent.parentNode
    }
    return ot;
  }


// //按需加载图片的源码，仅供参考
//   //当img的文档坐标top小于当前的浏览器窗口高度时，加载图片
//     var _imgs = $("img")
//     document.documentElement.scrollTop = 1;
//     var obj = document.documentElement.scrollTop == 0 ? document.body:document.documentElement;
//     var _bh = document.documentElement.clientHeight;
//     for (var i = 0; i < _imgs.length; i++) {
//       if(getElePosition(_imgs[i])<_bh){
//         _imgs[i].src = _imgs[i].getAttribute("data-src")
//       }
//     }

//   //window的onscroll事件
//     window.onscroll = function () {

//       //根据onscroll事件,按需加载图片
//         for (var i = 0; i < _imgs.length; i++) {
//           if (getElePosition(_imgs[i])<obj.scrollTop+_bh) {
//             _imgs[i].src = _imgs[i].getAttribute("data-src")
//           }
//         }



//     }//onscroll事件结束

















//闪式轮播=====================================
	//ofbanner:banner的Id名称
	//ofTab：tab的类名
	//ofCard：card的类名
	//ofPreBtn：pre按钮的类名
	//ofNextBtn：next按钮的类名


	function lunbo_flash (ofbanner,ofTab,ofCard,ofPreBtn,ofNextBtn) {
		var _banner       = $(ofbanner)[0],
      _tabs         = $(ofTab,_banner),
        classname10 = _tabs[0].className,
        classname11 = _tabs[1].className,
      _cards        = $(ofCard,_banner),
        classname20 = _cards[0].className,
        classname21 = _cards[1].className,
      _preBtn       = $(ofPreBtn,_banner)[0],
      _nextBtn      = $(ofNextBtn,_banner)[0],
      num           = 0,
      t;

      function bannerMove (type) {
        var type = type || 1;
        if (type == -1) {
          num--;
        }else{
          num++;
        }
        if (num >= _tabs.length) {
          num = 0;
        };
        if ( num < 0 ) {
          num =_tabs.length-1;
        }
        for (var i = 0; i < _tabs.length; i++) {
          _tabs[i].className = classname11;
          _cards[i].className = classname21;
        }
        _tabs[num].className = classname10;
        _cards[num].className = classname20;





      };//banner_move

        //移入暂停，移出继续效果
        _banner.onmouseover = function () {
          clearInterval(t);
        }
        _banner.onmouseout = function () {
          t = setInterval(bannerMove,2000);
        }
      //时间函数，不停轮播
      t = setInterval(bannerMove,2000);

      //底部tab的移入效果，未解决bug-----------------------------------------------------------------------
      var _tabs_t = setTimeout( function(){
        for (var i = 0; i < _tabs.length; i++) {
          _tabs[i].index = i;
          _tabs[i].onmouseover = function () {
            num = this.index-1;
            bannerMove();
          }
        };
      },1000);


      //左右按钮
      if (_preBtn) {
        _preBtn.onclick = function () {
          bannerMove(-1);
        }
      };

      if (_nextBtn) {
        _nextBtn.onclick = function () {
            bannerMove();

        }
      };
	}//lunbo_flash

















// //轮播对象
//     function Lunbo (box,) {
//         this._box        = $(box);
//    	    this._tabs       = $(tab,_box);
//    	    this._cards      = $(card,_box);
//    	    this._preBtn     = $(preBtn,_box);
//    	    this._nextBtn    = $(nextBtn,_box);
//     }













// 、、、、、、选项卡未分装好的
	// //0000型选项卡
	// var _haha				=	document.getElementById('haha'),
	// 					_items			=	getClass("item",_haha),
	// 					_notes 			= getClass("note",_haha);
	// 					classname 	= _notes[0].className;
	// 			for (var i = 0; i < _items.length; i++) {

	// 				_items[i].index = i;


	// 				_items[i].onmouseover = function () {
	// 						_notes[this.index].className += " now";
	// 				};

	// 				_items[i].onmouseout = function () {
	// 						_notes[this.index].className = classname;
	// 				};

	// 			}







	//1010选项卡实例二
			// function tab1010 (ofBox,OfTab,OfCard) {
			// 	var	_box					= $(ofBox),
			// 			_tabs					= $(OfTab,_box),
			// 			_cards				=	$(OfCard,_box),
			// 			classname_10	= _tabs[0].className,
			// 			classname_11	= _tabs[1].className,
			// 			classname_20	= _cards[0].className,
			// 			classname_21	= _cards[1].className,
			// 			tab1010_index;

			// 	for (var i = 0; i < _tabs.length; i++) {
			// 		_tabs[i].index = i;
			// 		_tabs[i].onclick = function () {
			// 			for (var i = 0; i < _tabs.length; i++) {
			// 				_tabs[i].className = classname_11;
			// 			}
			// 			for (var i = 0; i < _cards.length; i++) {
			// 				_cards[i].className = classname_21;
			// 			}
			// 			_tabs[this.index].className = classname_10;
			// 			_cards[this.index].className = classname_20;
			// 			tab1010_index = this.index;
			// 		}
			// 	}
			// 	return tab1010_index;

			// }











