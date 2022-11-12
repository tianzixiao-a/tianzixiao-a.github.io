"use strict";
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

var tzx_musicPlaying = !1,
tzx_musicStretch = !1,
tzx_musicFirst = !1,
tzx = {
    scrollTo: function(e) {
        e = document.querySelector(e).offsetTop;
        window.scrollTo(0, e - 80)
    },
    showLoading: function() {
        document.querySelector("#loading-box").classList.remove("loaded")
    },
    hideLoading: function() {
        document.querySelector("#loading-box").classList.add("loaded")
    },
    switchCommentBarrage: function() {
        document.querySelector(".comment-barrage") && ($(".comment-barrage").is(":visible") ? ($(".comment-barrage").hide(), $(".menu-commentBarrage-text").text("显示热评"), btf.snackbarShow("✨ 已关闭评论弹幕"), localStorage.setItem("commentBarrageSwitch", "false")) : $(".comment-barrage").is(":hidden") && ($(".comment-barrage").show(), $(".menu-commentBarrage-text").text("关闭热评"), btf.snackbarShow("✨ 已开启评论弹幕"), localStorage.removeItem("commentBarrageSwitch")))
    },
    initIndexEssay: function() {
        setTimeout(function() {
            var e = new Swiper(".essay_bar_swiper_container", {
                passiveListeners: !0,
                direction: "vertical",
                loop: !0,
                autoplay: {
                    disableOnInteraction: !0,
                    delay: 3e3
                },
                mousewheel: !0
            }),
            t = document.getElementById("bbtalk");
            null !== t && (t.onmouseenter = function() {
                e.autoplay.stop()
            },
            t.onmouseleave = function() {
                e.autoplay.start()
            })
        },
        100)
    },
    diffDate: function(e) {
        var t, n, a = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
        i = new Date,
        e = new Date(e),
        i = i.getTime() - e.getTime(),
        o = 864e5;
        return a ? (a = i / o, t = i / 36e5, n = i / 6e4, 1 <= i / 2592e6 ? e.toLocaleDateString().replace(/\//g, "-") : 1 <= a ? parseInt(a) + " " + GLOBAL_CONFIG.date_suffix.day: 1 <= t ? parseInt(t) + " " + GLOBAL_CONFIG.date_suffix.hour: 1 <= n ? parseInt(n) + " " + GLOBAL_CONFIG.date_suffix.min: GLOBAL_CONFIG.date_suffix.just) : parseInt(i / o)
    },
    changeTimeInEssay: function() {
        document.querySelector("#bber") && document.querySelectorAll("#bber time").forEach(function(e) {
            var t = e.getAttribute("datetime");
            e.innerText = tzx.diffDate(t, !0),
            e.style.display = "inline"
        })
    },
    changeTimeInAlbumDetail: function() {
        document.querySelector("#album_detail") && document.querySelectorAll("#album_detail time").forEach(function(e) {
            var t = e.getAttribute("datetime");
            e.innerText = tzx.diffDate(t, !0),
            e.style.display = "inline"
        })
    },
    reflashEssayWaterFall: function() {
        document.querySelector("#waterfall") && setTimeout(function() {
            waterfall("#waterfall"),
            document.getElementById("waterfall").classList.add("show")
        },
        500)
    },
    commentText: function(e) {
        "undefined" != e && "null" != e || (e = "好棒！");
        var t = document.getElementsByClassName("el-textarea__inner")[0],
        n = document.createEvent("HTMLEvents");
        t && (n.initEvent("input", !0, !0), e = replaceAll(e, "\n", "\n> "), t.value = "> " + e + "\n\n", t.dispatchEvent(n), e = document.querySelector("#post-comment").offsetTop, window.scrollTo(0, e - 80), t.focus(), t.setSelectionRange( - 1, -1), document.getElementById("comment-tips") && document.getElementById("comment-tips").classList.add("show"))
    },
    sayhi: function() {
        document.querySelector("#author-info__sayhi") && (document.getElementById("author-info__sayhi").innerHTML = getTimeState() + "！我是")
    },
    addFriendLink: function() {
        var e, t = document.getElementsByClassName("el-textarea__inner")[0];
        t && ((e = document.createEvent("HTMLEvents")).initEvent("input", !0, !0), t.value = "昵称（请勿包含博客等字样）：\n网站地址（要求博客地址，请勿提交个人主页）：\n头像图片url（请提供尽可能清晰的图片，我会上传到我自己的图床）：\n描述：\n站点截图（可选）：\n", t.dispatchEvent(e), t.focus(), t.setSelectionRange( - 1, -1))
    },
    musicToggle: function() {
        tzx_musicFirst || (musicBindEvent(), tzx_musicFirst = !0);
        tzx_musicStretch = tzx_musicPlaying ? (document.querySelector("#nav-music").classList.remove("playing"), document.getElementById("menu-music-toggle").innerHTML = '<i class="fa-solid fa-play"></i><span>播放音乐</span>', document.getElementById("nav-music-hoverTips").innerHTML = "音乐已暂停", tzx_musicPlaying = !1, document.querySelector("#nav-music").classList.remove("stretch"), !1) : (document.querySelector("#nav-music").classList.add("playing"), document.getElementById("menu-music-toggle").innerHTML = '<i class="fa-solid fa-pause"></i><span>暂停音乐</span>', tzx_musicPlaying = !0, document.querySelector("#nav-music").classList.add("stretch"), !0),
        document.querySelector("meting-js").aplayer.toggle()
    },
    musicTelescopic: function() {
        tzx_musicStretch = tzx_musicStretch ? (document.querySelector("#nav-music").classList.remove("stretch"), !1) : (document.querySelector("#nav-music").classList.add("stretch"), !0)
    },
    musicSkipBack: function() {
        document.querySelector("meting-js").aplayer.skipBack()
    },
    musicSkipForward: function() {
        document.querySelector("meting-js").aplayer.skipForward()
    },
    musicGetName: function() {
        for (var e = $(".aplayer-title"), t = [], n = e.length - 1; 0 <= n; n--) t[n] = e[n].innerText;
        return t[0]
    },
    darkModeStatus: function() {
        "light" == ("dark" === document.documentElement.getAttribute("data-theme") ? "dark": "light") ? $(".menu-darkmode-text").text("深色模式") : $(".menu-darkmode-text").text("浅色模式")
    }
},
getTimeState = function() {
    var e = (new Date).getHours(),
    t = "";
    return 0 <= e && e <= 5 ? t = "晚安😴": 5 < e && e <= 10 ? t = "早上好👋": 10 < e && e <= 14 ? t = "中午好👋": 14 < e && e <= 18 ? t = "下午好👋": 18 < e && e <= 24 && (t = "晚上好👋"),
    t
};
document.addEventListener("pjax:send",
function() {
    tzx.showLoading
}),
document.getElementById("page-name").innerText = document.title.split(" | 天子笑")[0],
tzx.initIndexEssay(),
tzx.changeTimeInEssay(),
tzx.changeTimeInAlbumDetail(),
tzx.reflashEssayWaterFall(),
tzx.sayhi(),
addRightMenuClickEvent();