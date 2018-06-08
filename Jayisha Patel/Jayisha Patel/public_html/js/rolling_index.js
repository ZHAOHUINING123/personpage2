window.onload=function() {
  var texts = ['This is first', 'This is second', 'This is third',
  'This is fourth', 'This is fifth'];
  var textcount = 0;
  // body...
  var prev=document.getElementById("prev");
  var next=document.getElementById("next");
  var list=document.getElementById("list");
  var container=document.getElementById("rolling_container");
  var index=1;
  var timer;
  var animated=false;
  function animate(offset){
    var time = 300;
    var inteval = 10;
    var speed = offset/(time/inteval);
    animated=true;
    var newLeft=parseInt(list.style.left) +offset;
    function go(){
      if ( (speed > 0 && parseInt(list.style.left) < newLeft) || (speed < 0 && parseInt(list.style.left) > newLeft)) {
        list.style.left = parseInt(list.style.left) + speed + 'px';
        setTimeout(go, inteval);
      }
      else
      {
        textcount++;
        if(textcount >= texts.length){
          textcount = 0;
        }
        document.getElementById('textblock').innerHTML = texts[textcount];
        animated=false;
        // list.style.left=newLeft+"px";
        if (newLeft >-600) {
          list.style.left=-3000+"px";
        };
        if (newLeft <-3000) {
          list.style.left=-600+"px";
        };
      }
    }
    go();
  };







  prev.onclick=function(){
    /*添加一个if判断index为1时，如果继续往前滚的话就让index返回第五个span
    但是当快速点击arrow时会出现一种span点亮延迟的情况。可以尝试把判断index是否大于1或小于5的情况放进
    判断是否animated的if语句中，先判断能不能点击，再点亮。
    */

    if (!animated) {
      if (index==1) {
        index=5;
      }else {
        index -=1;
      }

      shownButton();
      animate(600);
    }





  };
  next.onclick=function(){



    if (!animated) {
      if (index==5) {
        index=1;
      }else {
        index +=1;
      }
      animate(-600);
    }
  };

  function play(){
    timer=setInterval(function(){
      next.onclick();
    },2000);
  }
  function stop(){
    clearInterval(timer);
  }
  play();
  container.onmouseover=stop;
  container.onmouseout=play;
}