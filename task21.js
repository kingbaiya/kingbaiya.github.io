window.onload = function () {
    var centerbg = document.querySelectorAll(".centerboxbg")//中间背景
    var left = document.querySelector(".leftarrow")//左箭头
    var right = document.querySelector(".rightarrow")//右箭头
    var dot = document.querySelectorAll(".dot")//小圆点
    var centerbox = document.querySelectorAll(".centerbox1bar")//中间盒子
    var centerboximg = document.querySelectorAll(".centerbox2img")//中间图片
    var topopen = document.querySelector(".topopen")//下拉菜单点击按钮
    var topopenbg = document.querySelector(".topopenbg")//下拉菜单背景
    var topopenp = document.querySelector(".topopenp")//下拉菜单文本
    var drop = document.querySelector(".drop")//下拉菜单栏
    var rebox = document.querySelectorAll(".rebox")//推荐栏
    var upbot = document.querySelector(".dropbottomli")//上拉点击按钮
    var gamelistall = document.querySelector(".gamelistall")//游戏菜单
    var gamelistbottom = document.querySelector(".gamelistbottom")//游戏菜单点击下拉按钮

    var site = 0//保存当前位于第几张背景
    var imgsite = 0//保存当前中间位于哪张图片
    var s = new Date().getTime()//时间戳
    var status = 0//保存下拉栏状态
    var status2 = 0//保存游戏菜单栏状态

    //移动
    function move (direction) {
        centerbg[site].style.opacity = "0"
        dot[site].className = "dot"
        site = site + direction
        if(site === 5){
            site = 0
        }
        if(site === -1){
            site = 4
        }
        centerbg[site].style.opacity = "1"
        dot[site].className = "dot doton"
    }
    //左箭头点击
    left.onclick = function () {
        if(new Date().getTime() - s>1500){
            move(-1);
            s = new Date().getTime()//重置时间戳
        }
    }
    //右左箭头点击
    right.onclick = function () {
        if(new Date().getTime() - s>1500){
            move(1);
            s = new Date().getTime()//重置时间戳
        }
    }

    for(var i = 0;i<dot.length;i++){
        (function (i) {
            dot[i].onclick = function () {//小圆点点击
                if(new Date().getTime() - s>1500){
                    dot[site].className = "dot"
                    centerbg[site].style.opacity = "0"
                    dot[i].className = "dot doton"
                    centerbg[i].style.opacity = "1"
                    site = i
                    s = new Date().getTime()//重置时间戳
                }
            }
        })(i)
    }
    //自动播放
    function qwer() {
        centerbg[site].style.opacity = "0"
        dot[site].className = "dot"
        site = site + 1
        if(site === 5){
            site = 0
        }
        if(site === -1){
            site = 4
        }
        centerbg[site].style.opacity = "1"
        dot[site].className = "dot doton"
    }
    function start() {
        var timer = setInterval(qwer,4000)
    }
    start()
    //中间盒子点击事件
    for(var i = 0;i<centerbox.length;i++){
        (function (i) {
            centerbox[i].onclick = function () {
                centerbox[imgsite].className = "centerbox1bar"
                centerboximg[imgsite].className = "centerbox2img"
                centerbox[i].className = "centerbox1bar centerbox1baron"
                centerboximg[i].className = "centerbox2img centerbox2imgon"
                imgsite = i;
            }
        }(i))
    }
    //下拉菜单点击事件
    topopen.onclick = function () {
        if(status === 0){
            down()
        }
        else if (status === 1){
            up()
        }
    }
    //收起下拉菜单
    upbot.onclick = function () {
        up()
    }
    function down() {
        drop.style.display = "block"
        topopen.style.background = "#282B2D"
        topopenbg.style.background = "url(\"./picture/一图多用.png\")52px 0"
        topopenp.innerHTML = ""
        status = 1
    }
    function up() {
        drop.style.display = "none"
        topopen.style.background = "#cf1132"
        topopenbg.style.background = "url(\"./picture/一图多用.png\")"
        topopenp.innerHTML = "游戏列表"
        status = 0
    }
    //推荐栏闪烁
    for(i = 0; i < rebox.length ;i++){
        (function (i) {
            rebox[i].onmouseenter = function () {
                rebox[i].style.opacity = "0.5"
                setTimeout(asd,300)
                function asd(){
                    rebox[i].style.opacity = "1"
                }
            }
        })(i)
    }
    //游戏菜单点击事件
    gamelistbottom.onclick = function () {
        if (status2 === 0){
            gamelistall.style.height = "100%"
            status2 = 1
        }
        else if(status2 = 1){
            gamelistall.style.height = "440px"
            status2 = 0
        }
    }
}