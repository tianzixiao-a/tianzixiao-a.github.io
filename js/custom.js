// 返回顶部 显示网页阅读进度
window.onscroll = percent; // 执行函数
// 页面百分比
function percent() {
  let a = document.documentElement.scrollTop || window.pageYOffset, // 卷去高度
    b =
      Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      ) - document.documentElement.clientHeight, // 整个网页高度 减去 可视高度
    result = Math.round((a / b) * 100), // 计算百分比
    btn = document.querySelector("#percent"); // 获取图标

  result <= 99 || (result = 99), (btn.innerHTML = result);
}

var tzx_musicPlaying = false;
var tzx_musicStretch = false;
var tzx_musicFirst = false;
var tzx = {
  //切换音乐播放状态
  musicToggle: function () {
    if (!tzx_musicFirst) {
      musicBindEvent();
      tzx_musicFirst = true;
    }
    let msgPlay = '<i class="fa-solid fa-play"></i><span>播放音乐</span>'; // 此處可以更改為你想要顯示的文字
    let msgPause = '<i class="fa-solid fa-pause"></i><span>暂停音乐</span>'; // 同上，但兩處均不建議更改
    if (tzx_musicPlaying) {
      document.querySelector("#nav-music").classList.remove("playing");
      document.getElementById("menu-music-toggle").innerHTML = msgPlay;
      document.getElementById("nav-music-hoverTips").innerHTML = "音乐已暂停";
      tzx_musicPlaying = false;
      document.querySelector("#nav-music").classList.remove("stretch");
      tzx_musicStretch = false;
    } else {
      document.querySelector("#nav-music").classList.add("playing");
      document.getElementById("menu-music-toggle").innerHTML = msgPause;
      tzx_musicPlaying = true;
      document.querySelector("#nav-music").classList.add("stretch");
      tzx_musicStretch = true;
    }
    document.querySelector("meting-js").aplayer.toggle();
  },
  // 音乐伸缩
  musicTelescopic: function () {
    if (tzx_musicStretch) {
      document.querySelector("#nav-music").classList.remove("stretch");
      tzx_musicStretch = false;
    } else {
      document.querySelector("#nav-music").classList.add("stretch");
      tzx_musicStretch = true;
    }
  },
  //音乐上一曲
  musicSkipBack: function () {
    document.querySelector("meting-js").aplayer.skipBack();
  },
  //音乐下一曲
  musicSkipForward: function () {
    document.querySelector("meting-js").aplayer.skipForward();
  },
  //获取音乐中的名称
  musicGetName: function () {
    var x = $(".aplayer-title");
    var arr = [];
    for (var i = x.length - 1; i >= 0; i--) {
      arr[i] = x[i].innerText;
    }
    return arr[0];
  },
};
addRightMenuClickEvent();