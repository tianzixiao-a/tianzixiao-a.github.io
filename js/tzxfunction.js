"use strict";
function totraveling() {
  setTimeout(function() {
      window.open("https://travellings.cn/")
  },
  "5000")
}
function musicBindEvent() {
  document.querySelector("#nav-music .aplayer-music").addEventListener("click", function () {
    tzx.musicTelescopic();
  });
}

document.getElementById("page-name").innerText = document.title.split(" | 天子笑")[0];