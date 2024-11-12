// 添加滚动动画
function handleScroll() {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top <= window.innerHeight * 0.75;
        
        if (isVisible) {
            section.classList.add('visible');
        }
    });
}

// 修改爱心绽放效果函数
function createHeartBurst(x, y) {
    const colors = ['#ff69b4', '#ff1493', '#ff8da1', '#ffb6c1', '#ff69b4'];
    // 随机生成15-25个爱心
    const heartCount = Math.floor(Math.random() * 11) + 15;
    
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart-burst';
        heart.innerHTML = '❤️';
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        heart.style.color = colors[Math.floor(Math.random() * colors.length)];
        
        // 随机大小
        const scale = Math.random() * 0.3 + 0.7; // 0.7-1.0倍大小
        heart.style.fontSize = `${1.5 * scale}rem`;
        
        document.body.appendChild(heart);
        
        // 完全随机的角度
        const angle = Math.random() * Math.PI * 2;
        // 随机距离
        const distance = Math.random() * 100 + 100; // 100-200px
        
        // 创建向外扩散的动画
        const animation = heart.animate([
            {
                transform: 'translate(0, 0) scale(1)',
                opacity: 1
            },
            {
                transform: `translate(${Math.cos(angle) * distance * 0.4}px, 
                           ${Math.sin(angle) * distance * 0.4}px) scale(${scale * 1.2})`,
                opacity: 0.8,
                offset: 0.4
            },
            {
                transform: `translate(${Math.cos(angle) * distance}px, 
                           ${Math.sin(angle) * distance}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: Math.random() * 200 + 700, // 700-900ms随机时长
            easing: 'ease-out',
            fill: 'forwards'
        });
        
        animation.onfinish = () => heart.remove();
    }
}

// 修改音乐控制相关变量和函数
let musicPlaying = false;
let isMuted = false;
const bgMusic = document.getElementById('bgMusic');
const secondMusic = document.getElementById('secondMusic');
const musicToggle = document.getElementById('musicToggle');
const muteToggle = document.getElementById('muteToggle');
const volumeSlider = document.getElementById('volumeSlider');
const currentSongDisplay = document.getElementById('currentSong');
let currentMusic = bgMusic;

// 音乐控制函数
function toggleMusic() {
    if (musicPlaying) {
        currentMusic.pause();
        musicToggle.querySelector('.music-icon').textContent = '▶️';
        musicToggle.classList.remove('playing');
    } else {
        currentMusic.play().catch(error => {
            console.log("自动播放被阻止：", error);
        });
        musicToggle.querySelector('.music-icon').textContent = '⏸️';
        musicToggle.classList.add('playing');
    }
    musicPlaying = !musicPlaying;
}

// 音量控制函数
function updateVolume() {
    const volume = volumeSlider.value;
    bgMusic.volume = volume;
    secondMusic.volume = volume;
    
    // 更新音量图标
    const volumeIcon = muteToggle.querySelector('.volume-icon');
    if (volume === '0') {
        volumeIcon.textContent = '🔇';
    } else if (volume < 0.5) {
        volumeIcon.textContent = '🔉';
    } else {
        volumeIcon.textContent = '🔊';
    }
}

// 静音控制函数
function toggleMute() {
    isMuted = !isMuted;
    bgMusic.muted = isMuted;
    secondMusic.muted = isMuted;
    
    const volumeIcon = muteToggle.querySelector('.volume-icon');
    volumeIcon.textContent = isMuted ? '🔇' : '🔊';
}

// 切换音乐函数
function switchMusic(newMusic) {
    const wasPlaying = musicPlaying;
    if (wasPlaying) {
        currentMusic.pause();
    }
    currentMusic = newMusic;
    
    // 更新当前播放信息
    currentSongDisplay.textContent = `当前播放：${currentMusic === bgMusic ? '欢迎音乐' : '背景音乐'}`;
    
    // 保持音量设置
    currentMusic.volume = volumeSlider.value;
    currentMusic.muted = isMuted;
    
    if (wasPlaying) {
        currentMusic.play().catch(error => {
            console.log("自动播放被阻止：", error);
        });
    }
}

// 添加打字机效果函数
function typeWriter(element, text, speed = 100) {
    let i = 0;
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // 文字打完后显示按钮
            document.getElementById('enterButton').classList.remove('hidden');
            // 移除打字光标
            element.classList.add('typing-done');
        }
    }
    type();
}

// 添加祝福语打字机效果函数
function typeLoveMessage() {
    const messages = [
        "今天是属于你的特别日子，我想把所有美好的祝福都送给你。希望你的笑容像今天的阳光一样灿烂，温暖每一个瞬间；希望你的梦想都能成真，生活中永远充满快乐和幸福。",
        "认识你，是我生命中最幸运的事情；和你在一起的每一天，都是最美好的时光。谢谢你让我的生活充满爱和希望，我也会尽我所能，让你永远幸福。",
        "在未来的日子里，不管风雨或晴天，我都会陪在你身边，给你支持、爱和关怀。愿你的生日像你一样美丽，愿我们的未来像今天一样明亮。",
        "生日快乐，爱你的小石头❤️"
    ];

    const messageElement = document.querySelector('.typing-message');
    let currentParagraph = 0;
    let currentChar = 0;
    let currentP = document.createElement('p');
    messageElement.appendChild(currentP);

    function typeChar() {
        if (currentParagraph < messages.length) {
            if (currentChar < messages[currentParagraph].length) {
                currentP.textContent += messages[currentParagraph][currentChar];
                currentChar++;
                setTimeout(typeChar, 50); // 打字速度
            } else {
                currentParagraph++;
                currentChar = 0;
                if (currentParagraph < messages.length) {
                    currentP = document.createElement('p');
                    if (currentParagraph === messages.length - 1) {
                        currentP.className = 'signature';
                    }
                    messageElement.appendChild(currentP);
                    setTimeout(typeChar, 500); // 段落之间的延迟
                }
            }
        }
    }

    typeChar();
}

// 添加卡片点击效果
function initializeCardEffects() {
    const cardSections = document.querySelectorAll('.card-section');
    
    cardSections.forEach(section => {
        section.addEventListener('click', () => {
            // 移除其他卡片的放大效果
            cardSections.forEach(s => {
                if (s !== section) {
                    s.classList.remove('card-expanded');
                    s.classList.add('card-minimized');
                }
            });
            
            // 切换当前卡片的状态
            section.classList.remove('card-minimized');
            section.classList.add('card-expanded');
        });
    });
}

// ���加背景装饰元素
function createBackgroundDecorations() {
    const decorations = document.createElement('div');
    decorations.className = 'background-decorations';
    
    // 添加星星
    for (let i = 0; i < 20; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.innerHTML = '⭐';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 20}s`;
        decorations.appendChild(star);
    }
    
    // 添加气球
    for (let i = 0; i < 10; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.innerHTML = '🎈';
        balloon.style.left = `${Math.random() * 100}%`;
        balloon.style.top = `${Math.random() * 100}%`;
        balloon.style.animationDelay = `${Math.random() * 20}s`;
        decorations.appendChild(balloon);
    }
    
    document.body.appendChild(decorations);
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('scroll', handleScroll);
    
    // 添加音乐控制事件监听
    musicToggle.addEventListener('click', toggleMusic);
    volumeSlider.addEventListener('input', updateVolume);
    muteToggle.addEventListener('click', toggleMute);
    
    // 设置初始音量
    bgMusic.volume = volumeSlider.value;
    secondMusic.volume = volumeSlider.value;
    
    // 处理页面可见性变化
    document.addEventListener('visibilitychange', () => {
        if (document.hidden && musicPlaying) {
            currentMusic.pause();
        } else if (!document.hidden && musicPlaying) {
            currentMusic.play().catch(error => {
                console.log("自动播放被阻止：", error);
            });
        }
    });
    
    // 添加打字机效果
    const welcomeText = "蒲诗玲，祝你生日快乐 🎂";
    const typewriterElement = document.querySelector('.typewriter-text');
    typeWriter(typewriterElement, welcomeText, 150);
    
    // 修改进入按钮的点击事件，同时支持触摸
    const enterButton = document.getElementById('enterButton');
    enterButton.addEventListener('click', enterPage);
    enterButton.addEventListener('touchend', (e) => {
        e.preventDefault();
        enterPage();
    });
    
    // 统一处理欢迎界面的点击和触摸事件
    const welcomeScreen = document.getElementById('welcome-screen');
    const creatorInfo = document.querySelector('.creator-info');
    const secretHeart = document.getElementById('secretHeart');
    let clickCount = 0;
    
    // 点击事件处理函数
    function handleInteraction(x, y) {
        createHeartBurst(x, y);
        clickCount++;
        
        // 如果音乐没有播放，开始播放
        if (!musicPlaying) {
            currentMusic.play().catch(error => {
                console.log("自动播放被阻止：", error);
            });
            musicPlaying = true;
            musicToggle.querySelector('.music-icon').textContent = '⏸️';
            musicToggle.classList.add('playing');
        }
        
        // 当点击9次时显示彩蛋
        if (clickCount === 9) {
            creatorInfo.classList.remove('hidden');
            creatorInfo.classList.add('show');
            secretHeart.classList.add('shake');
        }
    }
    
    // 鼠标点击事件
    welcomeScreen.addEventListener('click', (e) => {
        handleInteraction(e.clientX, e.clientY);
    });
    
    // 触摸事件
    welcomeScreen.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        handleInteraction(touch.clientX, touch.clientY);
    });
    
    // 修改彩蛋爱心的点击事件，同时支持触摸
    secretHeart.addEventListener('click', (e) => {
        e.stopPropagation();
        createFloatingHearts();
    });
    
    secretHeart.addEventListener('touchend', (e) => {
        e.preventDefault();
        e.stopPropagation();
        createFloatingHearts();
    });
    
    // 添加背景装饰
    createBackgroundDecorations();
    
    // 添加标题动画类
    const title = document.querySelector('.typewriter-text');
    title.classList.add('welcome-title');
});

// 修改 enterPage 函数，确保在移动端也能正常工作
function enterPage() {
    const welcomeScreen = document.getElementById('welcome-screen');
    const contentScreen = document.getElementById('content-screen');
    
    // 添加淡出动画
    welcomeScreen.classList.add('animate__fadeOut');
    
    setTimeout(() => {
        welcomeScreen.style.display = 'none';
        contentScreen.classList.remove('hidden');
        contentScreen.classList.add('page-transition');
        
        // 开始所有动画效果
        startTimeUpdate();
        handleScroll();
        typeLoveMessage();
        initializeCardEffects();
        
        // 切换音乐
        switchMusic(secondMusic);
        
        if (!musicPlaying) {
            currentMusic.play().catch(error => {
                console.log("自动播放被阻止：", error);
            });
            musicPlaying = true;
            musicToggle.classList.add('playing');
        }
        
        // 显示蜡烛部分
        document.getElementById('candle-section').classList.remove('hidden');
        
        // 滚动到顶部
        window.scrollTo(0, 0);
    }, 1000);
}

// 修改计算天数的函数
function calculateDaysTogether() {
    const startDate = new Date('2024-07-19');
    const now = new Date();
    
    // 设置时区为中国时区
    const chinaTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Shanghai' }));
    
    // 计算相差的毫秒数
    const diffTime = chinaTime - startDate;
    
    // 计算天数（向上取整，这样当天就显示为第1天）
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // 获取当前时间
    const hours = chinaTime.getHours().toString().padStart(2, '0');
    const minutes = chinaTime.getMinutes().toString().padStart(2, '0');
    const seconds = chinaTime.getSeconds().toString().padStart(2, '0');
    
    // 更新显示
    const daysElement = document.getElementById('days-together');
    daysElement.innerHTML = `
        <div class="days-number">${diffDays}</div>
        <div class="days-text">天</div>
        <div class="time-text">${hours}:${minutes}:${seconds}</div>
    `;
}

// 添加定时器，每秒更新一次
function startTimeUpdate() {
    // 立即执行一次
    calculateDaysTogether();
    
    // 设置定时器，每秒更新一次
    setInterval(calculateDaysTogether, 1000);
}

// 添加 CSS 类控制样式
function addTypingDoneStyle() {
    const style = document.createElement('style');
    style.textContent = `
        .typing-done::after {
            display: none;
        }
    `;
    document.head.appendChild(style);
}

// 在文档加载时添加样式
addTypingDoneStyle();

// 修改漂浮爱心函数，添加消失效果
function createFloatingHearts() {
    const colors = ['#ff69b4', '#ff1493', '#ff8da1', '#ffb6c1', '#ff69b4'];
    const heartCount = 60;
    
    // 获取屏幕尺寸
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const centerX = screenWidth / 2;
    const centerY = screenHeight / 2;
    
    // 创建一个数组来存储所有爱心元素
    const hearts = [];
    
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = '❤️';
        heart.style.left = `${centerX}px`;
        heart.style.top = `${centerY}px`;
        heart.style.color = colors[Math.floor(Math.random() * colors.length)];
        
        // 随机大小
        const scale = Math.random() * 0.5 + 0.8;
        heart.style.fontSize = `${1.5 * scale}rem`;
        
        document.body.appendChild(heart);
        hearts.push(heart);
        
        // 创建无规则随机运动
        function moveHeart() {
            const endX = Math.random() * (screenWidth - 100) + 50;
            const endY = Math.random() * (screenHeight - 100) + 50;
            
            // 当前位置
            const startX = parseFloat(heart.style.left);
            const startY = parseFloat(heart.style.top);
            
            // 简化动画，使用简单的线性移动
            const animation = heart.animate([
                {
                    transform: `translate(${startX - centerX}px, ${startY - centerY}px) 
                               scale(${scale})`,
                    opacity: 1
                },
                {
                    transform: `translate(${endX - centerX}px, ${endY - centerY}px) 
                               scale(${scale})`,
                    opacity: 1
                }
            ], {
                duration: Math.random() * 2000 + 3000, // 3-5秒
                easing: 'ease-in-out',
                fill: 'forwards'
            });
            
            animation.onfinish = () => {
                heart.style.left = `${endX}px`;
                heart.style.top = `${endY}px`;
                setTimeout(moveHeart, Math.random() * 200);
            };
        }
        
        // 初始扩散动画
        const initialAngle = (i / heartCount) * Math.PI * 2;
        const initialDistance = Math.random() * 50 + 100;
        
        const initialAnimation = heart.animate([
            {
                transform: 'translate(0, 0) scale(0)',
                opacity: 0
            },
            {
                transform: `translate(${Math.cos(initialAngle) * initialDistance}px, 
                           ${Math.sin(initialAngle) * initialDistance}px) scale(${scale})`,
                opacity: 1
            }
        ], {
            duration: 1000,
            easing: 'ease-out',
            fill: 'forwards'
        });
        
        initialAnimation.onfinish = () => {
            heart.style.left = `${centerX + Math.cos(initialAngle) * initialDistance}px`;
            heart.style.top = `${centerY + Math.sin(initialAngle) * initialDistance}px`;
            moveHeart();
        };
    }
    
    // 5秒后开始逐渐消失
    setTimeout(() => {
        hearts.forEach((heart, index) => {
            setTimeout(() => {
                const fadeOutAnimation = heart.animate([
                    {
                        opacity: 1,
                        transform: heart.style.transform || 'translate(0, 0)'
                    },
                    {
                        opacity: 0,
                        transform: `${heart.style.transform || 'translate(0, 0)'} scale(0)`
                    }
                ], {
                    duration: 1000,
                    easing: 'ease-out',
                    fill: 'forwards'
                });
                
                fadeOutAnimation.onfinish = () => {
                    heart.remove();
                };
            }, index * 50); // 每个爱心间隔50ms消失，创造连续消失的效果
        });
    }, 5000); // 5秒后开始消失
}
