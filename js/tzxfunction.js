"use strict";
function toRandomPage() {
    btf.snackbarShow("即将随机穿越一个项目~", !1, 5e3),
    setTimeout(function() {
        window.open("https://travellings.link/")
    },
    "5000")
};
document.getElementById("page-name").innerText = document.title.split(" | 天子笑")[0];
