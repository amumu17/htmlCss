var app = angular.module("app",[]);
app.controller("cer",function ($scope) {
  var s = $scope;
  //颜色数组
    s.colors = ["#04ACF6","#56D75E","#EFCB41","#A57D59","#FF2369","#FD7830","#CB7AD7"];
  //数据的集合
    s.datas = [];
  //右侧显示的索引值
    s.index = 0;
  //选项的状态参数
    s.option_status = false;
  //获取数据的最大id
    function get_max_id() {
      var maxId = -Infinity;
      var len = s.datas.length;
      for(var i=0;i<len;i++) {
        if (maxId<s.datas[i].id) {
          maxId = s.datas[i].id;
        }
      }
      return maxId==-Infinity?1:maxId+1;
    };
  //添加新的数据
    s.add = function () {
      s.datas.push({
        id: get_max_id(),
        title: "新列表"+get_max_id(),
        theme:s.colors[(get_max_id()-1)%7],
        items: []
      })
      s.index = get_max_id()-2;
    }
  //点击sidebar 右侧对应显示
    s.show = function (i) {
      s.index = i;
    }
  //打开选项盒子 option_box
    s.change_start = function () {
      if (s.datas.length == 0) {
        return
      }
      s.copy_title = s.datas[s.index].title;
      s.copy_theme = s.datas[s.index].theme;

      s.option_status = !s.option_status;
    }
  // change_color
    s.change_theme = function (v) {
      s.copy_theme = v;
    }
  //del_data 删除datas中的某项数据
    s.del = function (i) {
      s.datas.splice(i,1);//删除数据

      s.option_status = !s.option_status;//遮罩和盒子 隐藏

      s.index = 0;//最新显示datas中的第一条数据
    }
  //数据改变后 完成 complete
    s.complete = function () {
      s.datas[s.index].title = s.copy_title;
      s.datas[s.index].theme = s.copy_theme;

      s.option_status = false;
    }



  //当前列表添加新项目是否显示
    s.create_box_status = false;
  //当前列表添加新项目 create_box 打开 自动聚焦
    s.open_create_box = function () {
      if (s.datas.length == 0) {
        return
      }
      s.create_box_status = true;
    }
  // 当前列表添加新项目
    s.add_new_item = function (ev) {
      var val = $(ev.target).siblings("input").val();
      s.datas[s.index].items.push({
        item_title: val,
        done :false
      })
      $(ev.target).siblings("input").val("");
      s.create_box_status = false;
    }



  // 编辑状态的开关
    s.edit_status = false;
  //未完成==>已完成
    s.change_down = function (v) {
      v.done = true;
    }

  // 删除当前列表所有完成的项目
    s.del_all = function () {
      for (var i = 0; i < s.datas[s.index].items.length; i++) {
        if (s.datas[s.index].items[i].done == true) {
          s.datas[s.index].items.splice(i,1);
          i--;
        }
      }
    }
  // 删除当前列表的某个项目
    s.del_someone = function (i) {
      s.datas[s.index].items.splice(i,1);
    }
});
