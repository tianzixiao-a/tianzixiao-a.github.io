"use strict";
function _typeof(t) {
    return (_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ?
    function(t) {
        return typeof t
    }: function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol": typeof t
    })(t)
}
function owoBig() {
    var e = 1,
    o = "",
    i = document.createElement("div"),
    l = (i.id = "owo-big", document.querySelector("body"));
    l.appendChild(i),
    document.getElementById("post-comment").addEventListener("DOMNodeInserted",
    function(t) {
        t.target.classList && "OwO-body" == t.target.classList.value && ((t = t.target).addEventListener("contextmenu",
        function(t) {
            return t.preventDefault()
        }), t.addEventListener("mouseover",
        function(c) {
            "IMG" == c.target.tagName && e && (e = 0, o = setTimeout(function() {
                var t = 3 * c.path[0].clientHeight,
                e = 3 * c.path[0].clientWidth,
                o = c.x - c.offsetX - (e - c.path[0].clientWidth) / 2,
                n = (o + e > l.clientWidth && (o -= o + e - l.clientWidth + 10), o < 0 && (o = 10), c.y - c.offsetY);
                i.style.height = t + "px",
                i.style.width = e + "px",
                i.style.left = o + "px",
                i.style.top = n + "px",
                i.style.display = "flex",
                i.innerHTML = '<img src="'.concat(c.target.src, '">')
            },
            300))
        }), t.addEventListener("mouseout",
        function(t) {
            i.style.display = "none",
            e = 1,
            clearTimeout(o)
        }))
    })
}
function isInViewPortOfOne(t) {
    var e;
    if (t) return e = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
    t.offsetTop - document.documentElement.scrollTop <= e
}
document.getElementById("post-comment") && owoBig(),
window.onscroll = btf.throttle(percent, 50);
var percentFlag = !1;
function percent() {
    window.scrollY;
    var t = document.querySelector("#nav-music"),
    e = document.getElementById("footer"),
    t = (e && t && 768 < document.body.clientWidth && (t.style.bottom = isInViewPortOfOne(e) ? "-10px": "20px", t.style.opacity = isInViewPortOfOne(e) ? "0": "1"), document.documentElement.scrollTop || window.pageYOffset),
    e = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight) - document.documentElement.clientHeight,
    e = Math.round(t / e * 100),
    o = document.querySelector("#percent"),
    t = t % document.documentElement.clientHeight,
    t = (e <= 99 || (e = 99), !percentFlag && 100 + t >= document.documentElement.clientHeight && document.querySelector("#waterfall") ? (console.info(t, document.documentElement.clientHeight), setTimeout(function() {
        waterfall("#waterfall")
    },
    500)) : setTimeout(function() {
        document.querySelector("#waterfall") && waterfall("#waterfall")
    },
    500), window.scrollY + document.documentElement.clientHeight),
    n = document.getElementById("post-comment") || document.getElementById("footer");
    n.offsetTop + n.offsetHeight / 2 < t || 90 < e ? (document.querySelector("#nav-totop").classList.add("long"), o.innerHTML = "返回顶部", percentFlag = !0) : (document.querySelector("#nav-totop").classList.remove("long"), o.innerHTML = e)
}
function ScrollBarElongation() {
    var t = document.documentElement.scrollTop || window.pageYOffset,
    e = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight) - document.documentElement.clientHeight,
    o = t / e,
    n = document.querySelector(".as-indicator");.1 <= o && (n.style.transform = "scale3d(1, ".concat(t / e, ", 1)"))
}
function toRandomPage() {
    btf.snackbarShow("即将随机穿越项目~", !1, 5e3),
    setTimeout(function() {
        window.open("https://travellings.link/")
    },
    "5000")
}
function replaceAll(t, e, o) {
    return t.split(e).join(o)
}
/Mobi|Android|iPhone/i.test(navigator.userAgent) || document.addEventListener("scroll", ScrollBarElongation),
window.onkeydown = function(t) {
    123 === t.keyCode && btf.snackbarShow("开发者模式已打开,请遵循GPL协议", !1)
};
var navFn = {
    switchDarkMode: function() {
        "light" == ("dark" === document.documentElement.getAttribute("data-theme") ? "dark": "light") ? (activateDarkMode(), saveToLocal.set("theme", "dark", 2), void 0 !== GLOBAL_CONFIG.Snackbar && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night, !1, 2e3)) : (activateLightMode(), saveToLocal.set("theme", "light", 2), void 0 !== GLOBAL_CONFIG.Snackbar && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.night_to_day, !1, 2e3)),
        "function" == typeof utterancesTheme && utterancesTheme(),
        "object" === ("undefined" == typeof FB ? "undefined": _typeof(FB)) && window.loadFBComment(),
        window.DISQUS && document.getElementById("disqus_thread").children.length && setTimeout(function() {
            return window.disqusReset()
        },
        200);
        var t, e = "light" === document.documentElement.getAttribute("data-theme") ? "#363636": "#F7F7FA";
        document.getElementById("posts-chart") && ((t = postsOption).textStyle.color = e, t.title.textStyle.color = e, t.xAxis.axisLine.lineStyle.color = e, t.yAxis.axisLine.lineStyle.color = e, postsChart.setOption(t)),
        document.getElementById("tags-chart") && ((t = tagsOption).textStyle.color = e, t.title.textStyle.color = e, t.xAxis.axisLine.lineStyle.color = e, t.yAxis.axisLine.lineStyle.color = e, tagsChart.setOption(t)),
        document.getElementById("categories-chart") && ((t = categoriesOption).textStyle.color = e, t.title.textStyle.color = e, t.legend.textStyle.color = e, categoriesChart.setOption(t))
    }
};
function musicBindEvent() {
    $("#nav-music .aplayer-music").on("click",
    function(t) {
        anzhiyu.musicTelescopic(),
        t.stopPropagation()
    })
}