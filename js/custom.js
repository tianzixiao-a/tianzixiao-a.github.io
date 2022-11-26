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

document.getElementById("page-name").innerText = document.title.split(" | 天子笑")[0];

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


const commentBarrageConfig = {
	//浅色模式和深色模式颜色，务必保持一致长度，前面是背景颜色，后面是字体，随机选择，默认这个颜色还好
	lightColors:[
		['var(--tzx-white-acrylic2)','var(--tzx-black)'],
	],
	darkColors:[
		['var(--tzx-black-acrylic2)','var(--tzx-white)'],
	],
	//同时最多显示弹幕数
	maxBarrage: 1,
	//弹幕显示间隔时间，单位ms
	barrageTime: 3000,
	//twikoo部署地址（Vercel、私有部署），腾讯云的为环境ID
	twikooUrl: "https://twikoo.tzxblog.eu.org",
	//token获取见前文
	accessToken: "3292ebc70781a7cfac64cc91a176d332",
	pageUrl: window.location.pathname,
	barrageTimer: [],
	barrageList: [],
	barrageIndex: 0,
	// 没有设置过头像时返回的默认头像，见cravatar文档 https://cravatar.cn/developers/api，可以不改以免出错
	noAvatarType: "retro",
	dom: document.querySelector('.comment-barrage'),
	//是否默认显示留言弹幕
	displayBarrage: true,
	//头像cdn，默认cravatar
	avatarCDN: "cravatar.cn",
}

function isInViewPortOfOne (el) {
    const viewPortHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight 
    const offsetTop = el.offsetTop
    const scrollTop = document.documentElement.scrollTop
    const top = offsetTop - scrollTop
    return top <= viewPortHeight
}
document.onscroll = function() {
	if(commentBarrageConfig.displayBarrage){
	if(isInViewPortOfOne(document.getElementById("post-comment"))){
		document.getElementsByClassName("comment-barrage")[0].setAttribute("style",`display:none;`)
	}
	else{
		document.getElementsByClassName("comment-barrage")[0].setAttribute("style","")
	}
}
  }
function initCommentBarrage(){
		var data = JSON.stringify({
		  "event": "COMMENT_GET",
		  "commentBarrageConfig.accessToken": commentBarrageConfig.accessToken,
		  "url": commentBarrageConfig.pageUrl
		});
		var xhr = new XMLHttpRequest();
		xhr.withCredentials = true;
		xhr.addEventListener("readystatechange", function() {
		  if(this.readyState === 4) {
			commentBarrageConfig.barrageList = commentLinkFilter(JSON.parse(this.responseText).data);
			commentBarrageConfig.dom.innerHTML = '';
		  }
		});
		xhr.open("POST", commentBarrageConfig.twikooUrl);
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.send(data);
		setInterval(()=>{
			if(commentBarrageConfig.barrageList.length){
				popCommentBarrage(commentBarrageConfig.barrageList[commentBarrageConfig.barrageIndex]);
				commentBarrageConfig.barrageIndex += 1;
				commentBarrageConfig.barrageIndex %= commentBarrageConfig.barrageList.length;
			}
			if(commentBarrageConfig.barrageTimer.length > (commentBarrageConfig.barrageList.length > commentBarrageConfig.maxBarrage?commentBarrageConfig.maxBarrage:commentBarrageConfig.barrageList.length)){
				removeCommentBarrage(commentBarrageConfig.barrageTimer.shift())
			}
		},commentBarrageConfig.barrageTime)

}
function commentLinkFilter(data){
	data.sort((a,b)=>{
		return a.created - b.created;
	})
	let newData = [];
	data.forEach(item=>{
		newData.push(...getCommentReplies(item));
	});
	return newData;
}
function getCommentReplies(item){
	if(item.replies){
		let replies = [item];
		item.replies.forEach(item=>{
			replies.push(...getCommentReplies(item));
		})
		return replies;
	}else{
		return [];
	}
}
function popCommentBarrage(data){
	let barrage = document.createElement('div');
	let width = commentBarrageConfig.dom.clientWidth;
	let height = commentBarrageConfig.dom.clientHeight;
	barrage.className = 'comment-barrage-item'
	let ran = Math.floor(Math.random()*commentBarrageConfig.lightColors.length)
	document.getElementById("barragesColor").innerHTML=`[data-theme='light'] .comment-barrage-item { background-color:${commentBarrageConfig.lightColors[ran][0]};color:${commentBarrageConfig.lightColors[ran][1]}}[data-theme='dark'] .comment-barrage-item{ background-color:${commentBarrageConfig.darkColors[ran][0]};color:${commentBarrageConfig.darkColors[ran][1]}}`;

	barrage.innerHTML = `
		<div class="barrageHead">
			<img class="barrageAvatar" src="https://${commentBarrageConfig.avatarCDN}/avatar/${data.mailMd5}?d=${commentBarrageConfig.noAvatarType}"/>
			<div class="barrageNick">${data.nick}</div>
			<a href="javascript:switchCommentBarrage()" style="font-size:20px">×</a>
		</div>
		<div class="barrageContent">${data.comment}</div>
	`
	commentBarrageConfig.barrageTimer.push(barrage);
	commentBarrageConfig.dom.append(barrage);
}
function removeCommentBarrage(barrage){
	barrage.className = 'comment-barrage-item out';

	if(commentBarrageConfig.maxBarrage!=1){
		setTimeout(()=>{
			commentBarrageConfig.dom.removeChild(barrage);
		},1000)
	}else{
		commentBarrageConfig.dom.removeChild(barrage);
	}
}
switchCommentBarrage = function () {
	localStorage.setItem("isBarrageToggle",Number(!Number(localStorage.getItem("isBarrageToggle"))))
	if(!isInViewPortOfOne(document.getElementById("post-comment"))){
	commentBarrageConfig.displayBarrage=!(commentBarrageConfig.displayBarrage);
    let commentBarrage = document.querySelector('.comment-barrage');
    if (commentBarrage) {
        $(commentBarrage).fadeToggle()
    }
}
}
$(".comment-barrage").hover(function(){
	clearInterval(timer);
},function () {
	timer=setInterval(()=>{
		if(commentBarrageConfig.barrageList.length){
			popCommentBarrage(commentBarrageConfig.barrageList[commentBarrageConfig.barrageIndex]);
			commentBarrageConfig.barrageIndex += 1;
			commentBarrageConfig.barrageIndex %= commentBarrageConfig.barrageList.length;
		}
		if(commentBarrageConfig.barrageTimer.length > (commentBarrageConfig.barrageList.length > commentBarrageConfig.maxBarrage?commentBarrageConfig.maxBarrage:commentBarrageConfig.barrageList.length)){
			removeCommentBarrage(commentBarrageConfig.barrageTimer.shift())
		}
	},commentBarrageConfig.barrageTime)
})
if(localStorage.getItem("isBarrageToggle")==undefined){
	localStorage.setItem("isBarrageToggle","0");
}else if(localStorage.getItem("isBarrageToggle")=="1"){
	localStorage.setItem("isBarrageToggle","0");
	switchCommentBarrage()
}
initCommentBarrage()