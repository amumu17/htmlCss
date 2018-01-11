/*
* @Author: Administrator
* @Date:   2016-10-31 11:13:07
* @Last Modified by:   Administrator
* @Last Modified time: 2016-12-22 10:50:29
*/

// alert(document.documentElement.clientHeight)
$(function(){

  function LetterGame (area,score,life,state,stop,over){
    this.area = area;
    this.score = score;
    this.score_num = 0;
    this._stop = stop,
    this.flag = true;
    this.over = over,
    this.life = {num:5,ele:life};
    this.state = {num:1,ele:state,geshu:3};
    this.letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    this.obj = {};
    this.speed = 2;
    this.t = null;
  };
  LetterGame.prototype = {
    begin:function(){
      var that = this;
      for (var i = 0; i < this.state.geshu; i++) {
        this._createLetter();
      };
      this.move();
      this.keyDown();
    },//begin
    _createLetter:function(){
      var letter = document.createElement("div");
      letter.className = "letter";
      do{
        var random_num = Math.floor(Math.random()*26),
            random_letter = this.letters[random_num];
      }while(this.obj[random_letter]);
      do{
        var _left = Math.round(Math.random()*720);
      }while(this.check(_left))
      var _top = -Math.round(Math.random()*60);
      this.obj[random_letter] = {left:_left,top:_top,ele:letter}
      letter.innerHTML = random_letter;
      letter.style.cssText = "top:"+_top+"px;left:"+_left+"px";
      this.area.appendChild(letter);
    },//createLetter
    check:function(left){
      for( var i in this.obj){
        if (left > this.obj[i].left - 80 && left < this.obj[i].left + 80) {
          return true;
        }
      }
    },
    move:function(){
      var that = this;
      this.t = setInterval(move,60);
      function move(){
        for(var i in that.obj){
          var old_t = that.obj[i].top;
          old_t += that.speed;
          if (old_t>600) {
            that.area.removeChild(that.obj[i].ele);
            delete that.obj[i];
            that._createLetter();
            that.life.num --;
            console.log(that.life.num);
            that.life.ele.innerHTML = that.life.num;
            if (that.life.num == 0) {
              that.end();
              break;
            }
          }else{
            that.obj[i].top = old_t;
            that.obj[i].ele.style.top = old_t + "px";
          };
        };
      };//move

    },
    keyDown:function(){
      var that = this;
      document.onkeydown = function(e){
        var ev = e || window.event,
            code = ev.keyCode,
            key = String.fromCharCode(code);
        // console.log(key)
        if(that.obj[key]){
          that.area.removeChild(that.obj[key].ele);
          delete that.obj[key];
          that._createLetter();
          that.score_num += 10;
          that.score.innerHTML = that.score_num;
          if (that.score_num % 100 == 0) {
            that.next_state();
          };
        };
      };
    },
    next_state:function(){
      this.area.innerHTML = "";
      clearInterval(this.t)
            this.state.num ++;
            if (this.state.num < 4) {
              this.state.geshu ++;
              console.log(this.state.geshu)
            }else{
              this.speed++;
            }

            this.state.ele.innerHTML = this.state.num;
            this.obj = {};
      this.begin();

    },
    stop:function(){
      if (this.flag) {
        this.flag =!this.flag;
        clearInterval(this.t);
        this._stop.value = "继续";
      }
        alert("点击确定，继续游戏")
      if(!this.flag){
        this.flag =!this.flag;
        this._stop.value = "暂停";
        this.move();
      }

    },
    end:function(){
      var that = this;
      var lose_jp = document.createElement("div");
      lose_jp.className = "lose"
      var div = document.createElement("div");
      div.innerHTML="You Are Lose!!!得分"+this.score_num;
      lose_jp.appendChild(div);
      var body = document.getElementsByTagName('body')[0];
      body.appendChild(lose_jp);
      this.area.innerHTML = "";
      this.obj = {};
      this.life = {num:5,ele:that.life.ele};
      this.life.ele.innerHTML = 5;
      this.state = {num:1,ele:that.state.ele,geshu:3};
      this.state.ele.innerHTML = 1;
      this.score_num = 0;
      this.score.innerHTML = this.score_num;
      this.speed = 2;
      clearInterval(that.t);
      this.t = null;
    }
  }//prototype


  var body = $("#body"),
      _area = $("._area")[0],
      _score = $(".score")[0],
      _state = $(".state")[0],
      _life = $(".life")[0],
      _start = $(".start")[0],
      _stop = $(".stop")[0],
      _over = $(".over")[0];

  var game = new LetterGame(_area,_score,_life,_state,_stop,_over);
  _start.onclick = function(){
    // _start.disabled = true;
    game.begin();
    _stop.onclick = function(){
      game.stop();
    };
  };
  _over.onclick = function(){
    game.end();
  };

















})