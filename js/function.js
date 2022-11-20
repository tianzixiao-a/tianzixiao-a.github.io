"use strict";

function totraveling() {
  setTimeout(function() {
      window.open("https://travellings.cn/")
  },
  "5000")
}

// 音乐绑定事件
function musicBindEvent() {
  document.querySelector("#nav-music .aplayer-music").addEventListener("click", function () {
    tzx.musicTelescopic();
  });
}