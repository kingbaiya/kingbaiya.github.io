window.onload = function (e) {
    var indexpage = document.querySelector(".index-page")//获取主界面
    var startpage = document.querySelector(".startpage")//获取开始界面
    var gamepage = document.querySelector(".gamepage")//获取开始界面
    var endpage = document.querySelector(".endpage")//获取结束界面
    var bottom = document.querySelectorAll(".bottom")//获取难度按钮
    var continuebottom = document.querySelector(".continuebottom")//获取继续按钮
    var score = document.querySelector(".score")//获取分数div
    var gamebgm = document.querySelector(".gamebgm")//
    console.log(gamebgm)
    var bullettimier = 0//生成子弹定时器
    var movebullettimer = 0//子弹移动定时器
    var enemytimier = 0//生成敌军飞机定时器
    var moveenemytimer = 0//敌军飞机移动定时器
    var moveenbtimer = 0//敌军飞机子弹移动定时器

    var bulletsp = 0//子弹生成速度
    var bulletmovesp = 0//子弹移动速度
    var enemysp = 0//敌军生成速度
    var enemymovesp = 0//敌军移动速度
    var mark = 0//击落飞机数
    var enbulletmovesp = 0//敌军子弹移动速度

    //获取飞机相对场景的位置
    var X = e.clientX - (parseFloat(sty(indexpage,'width'))-400)/2 - 60/2-5
    var Y = e.clientY - (parseFloat(sty(indexpage,'height'))-650)/2 - 30/2-5

    var bullets = []//储存子弹
    var enemys = []//储存敌军飞机
    var enbullets = []//储存敌军子弹
    var rans = 0//随机数

    //点击按钮选择难度
    for (var i = 0;i <bottom.length; i++){
        (function (i) {
            bottom[i].onclick = function (e) {
                gamebgm.currentTime = 0
                gamebgm.play()
                //获取飞机相对场景的位置
                X = e.clientX - (parseFloat(sty(indexpage,'width'))-400)/2 - 60/2-5
                Y = e.clientY - (parseFloat(sty(indexpage,'height'))-650)/2 - 30/2-5

                //切换场景
                startpage.style.display = "none"
                gamepage.style.display = "block"

                //难度
                bulletsp = 100 + 20 * i //子弹生成速度
                bulletmovesp = 10 + 2 * i //子弹移动速度
                enemysp = (5 - i)* 60//敌军生成速度
                enemymovesp = (5 - i)* 5//敌军移动速度
                enbulletmovesp = (5 - i)* 2//敌军子弹移动速度
                // bulletsp = 1
                // bulletmovesp = 10
                // enemysp = 10
                // enemymovesp = 100

                //生成玩家飞机
                var hero = new Image()
                hero.src = "./image/hero.png"
                hero.className = "hero"
                gamepage.appendChild(hero)
                hero.style.left = X + "px"
                hero.style.top = Y + "px"

                //玩家飞机跟随鼠标移动
                gamepage.onmousemove = function (e) {
                    //计算飞机坐标
                    X = e.clientX - (parseFloat(sty(indexpage,'width'))-400)/2 - 60/2-5
                    Y = e.clientY - (parseFloat(sty(indexpage,'height'))-650)/2 - 30/2-5
                    //限制飞机坐标
                    X = Math.max(X,-30)
                    X = Math.min(X,400-30-10)
                    Y = Math.max(Y,0)
                    Y = Math.min(Y,650-15-10)
                    //改变飞机坐标
                    hero.style.left = X + "px"
                    hero.style.top = Y + "px"
                }
                startgame()
            }
        })(i)
    }

    //点击继续
    continuebottom.onclick = function() {
        gamebgm.pause()
        gamepage.innerHTML = ""
        mark = 0
        bullets = []
        enemys = []
        enbullets = []
        endpage.style.display = "none"
        startpage.style.display = "block"
    }

    //获取某节点样式的值
    function sty (dom,style){
        return getComputedStyle(dom)[style]
    }

    //开始游戏
    function startgame() {
        createbullet()//生成子弹
        movebullet()//子弹移动
        createnemy()//生成敌军飞机
        moveenemy()//敌军飞机移动
        moveenbullet()//敌军子弹移动
    }

    //生成玩家子弹
    function createbullet() {
        bullettimier = setInterval(function () {
            var bullet = new Image()
            bullet.src = "./image/bullet.png"
            bullet.className = "bullet"
            bullet.style.left = X + 23 + "px"
            bullet.style.top = Y - 28 + "px"
            gamepage.appendChild(bullet)

            var bulletA = {
                dom: bullet,
                x: X + 23,
                y: Y - 28
            }

            bullets.push(bulletA)
        },bulletsp)
    }

    //玩家子弹移动
    function movebullet() {
        movebullettimer = setInterval(function () {
            for (var i = 0; i < bullets.length; i++){
                bullets[i].y -= 5
                bullets[i].dom.style.top = bullets[i].y + "px"
                //移除子弹
                if(bullets[i].y <= -30){
                    gamepage.removeChild(bullets[i].dom)
                    bullets.splice(i,1)
                }
            }
            ebhit()
        },bulletmovesp)
    }

    //生成敌军飞机
    function createnemy() {
        enemytimier = setInterval(function () {
            var enemy = new Image()
            enemy.src = "./image/enemy.png"
            enemy.className = "enemy"
            rans = Math.random()
            enemy.style.left = rans * 390 - 30 + "px"
            enemy.style.top = -30 + "px"
            gamepage.appendChild(enemy)
            var enemyA = {
                dom: enemy,
                x: rans * 390 - 30,
                y: -30
            }
            enemys.push(enemyA)

            var enbullet = new Image()
            enbullet.src = "./image/bullet2.png"
            enbullet.className = "enbullet"
            enbullet.style.left = rans * 390-10 + "px"
            enbullet.style.top = 0 + "px"
            gamepage.appendChild(enbullet)
            var enbulletA = {
                dom: enbullet,
                x: rans * 390-10,
                y: 0
            }
            enbullets.push(enbulletA)
        },enemysp)
    }

    //敌军飞机移动
    function moveenemy() {
        moveenemytimer = setInterval(function () {
            for (var i = 0; i < enemys.length; i++){
                enemys[i].y += 5
                enemys[i].dom.style.top = enemys[i].y + "px"
                if(enemys[i].y >= 650){
                    gamepage.removeChild(enemys[i].dom)
                    enemys.splice(i,1)
                }
            }
            ehhit()
        },enemymovesp)
    }

    //敌军子弹移动
    function moveenbullet() {
        moveenbtimer = setInterval(function () {
            for (var i = 0; i < enbullets.length; i++){
                enbullets[i].y += 5
                enbullets[i].dom.style.top = enbullets[i].y + "px"
                if(enbullets[i].y >= 650){
                    gamepage.removeChild(enbullets[i].dom)
                    enbullets.splice(i,1)
                }
            }
            ebhhit()
        },enbulletmovesp)
    }

    //敌军与子弹碰撞检测
    function ebhit() {
        for(var i = 0; i < enemys.length; i++){
            for(var j = 0; j < bullets.length; j++){
                if(enemys[i].y+ 30 >= bullets[j].y && enemys[i].y < bullets[j].y+30 && bullets[j].x + 16 > enemys[i].x && bullets[j].x < enemys[i].x + 60){
                    //敌军飞机爆炸
                    enemyboom()
                    //敌军飞机爆炸
                    function enemyboom() {
                        //爆炸音效
                        var audio = new Audio()
                        audio.src = "./image/boom.wav"
                        gamepage.appendChild(audio)
                        audio.play()
                        setTimeout(function () {
                            gamepage.removeChild(audio)
                        },500)
                        //生成敌军爆炸图片
                        var boom = new Image()
                        boom.src = "./image/explosion.gif"
                        boom.className = "boom"
                        boom.style.left = enemys[i].x +15 + "px"
                        boom.style.top = enemys[i].y+ 3 + "px"
                        gamepage.appendChild(boom)
                        //删除爆炸图片
                        setTimeout(function () {
                            gamepage.removeChild(boom)
                        },570)
                    }

                    //删除敌军飞机和子弹的节点
                    gamepage.removeChild(enemys[i].dom)
                    gamepage.removeChild(bullets[j].dom)

                    //删除数组中的对象
                    enemys.splice(i,1)
                    bullets.splice(j,1)

                    mark +=1
                    break;
                }
            }
        }
    }

    //敌军与我军碰撞检测
    function ehhit() {
        for (var i = 0; i < enemys.length; i++){
            if(enemys[i].y+ 30 >= Y && enemys[i].y < Y + 30 && X + 60 > enemys[i].x && X < enemys[i].x + 60){
                //删除敌军飞机图片
                gamepage.removeChild(enemys[i].dom)
                enemys.splice(i,1)
                console.log("飞机")
                //关闭所有计时器
                clearInterval(bullettimier)
                clearInterval(movebullettimer)
                clearInterval(enemytimier)
                clearInterval(moveenemytimer)
                clearInterval(moveenbtimer)

                //玩家爆炸音效
                var audio = new Audio()
                audio.src = "./image/boom.mp3"
                gamepage.appendChild(audio)
                audio.play()
                setTimeout(function () {
                    gamepage.removeChild(audio)
                },1000)

                //删除我军飞机图片
                var hero = document.querySelector(".hero")//获取玩家飞机
                gamepage.removeChild(hero)

                //生成我军飞机爆炸图片
                var heroboom = new Image()
                heroboom.src = "./image/explosion.gif"
                heroboom.className = "boom"
                heroboom.style.left = X +15 + "px"
                heroboom.style.top = Y + 3 + "px"
                gamepage.appendChild(heroboom)

                setTimeout(function () {
                    gamepage.removeChild(heroboom)
                },570)

                setTimeout(function () {
                    gamepage.style.display = "none"
                    endpage.style.display = "block"
                    score.innerHTML = "分数：" + mark
                },1000)
            }
        }
    }

    //敌军与我军子弹碰撞
    function ebhhit() {
        for (var i = 0; i < enbullets.length; i++){
            if(enbullets[i].y+ 30 >= Y && enbullets[i].y < Y + 30 && X + 60 > enbullets[i].x && X < enbullets[i].x + 16){
                //删除敌军飞机子弹图片
                gamepage.removeChild(enbullets[i].dom)
                enbullets.splice(i,1)
                console.log("子弹")
                //关闭所有计时器
                clearInterval(bullettimier)
                clearInterval(movebullettimer)
                clearInterval(enemytimier)
                clearInterval(moveenemytimer)
                clearInterval(moveenbtimer)

                //玩家爆炸音效
                var audio = new Audio()
                audio.src = "./image/boom.mp3"
                gamepage.appendChild(audio)
                audio.play()
                setTimeout(function () {
                    gamepage.removeChild(audio)
                },1000)

                //删除我军飞机图片
                var hero = document.querySelector(".hero")//获取玩家飞机
                gamepage.removeChild(hero)

                //生成我军飞机爆炸图片
                var heroboom = new Image()
                heroboom.src = "./image/explosion.gif"
                heroboom.className = "boom"
                heroboom.style.left = X +15 + "px"
                heroboom.style.top = Y + 3 + "px"
                gamepage.appendChild(heroboom)

                setTimeout(function () {
                    gamepage.removeChild(heroboom)
                },570)

                setTimeout(function () {
                    gamepage.style.display = "none"
                    endpage.style.display = "block"
                    score.innerHTML = "分数：" + mark
                },1000)
            }
        }
    }
    
}