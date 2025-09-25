// 等待DOM加载完成
 document.addEventListener('DOMContentLoaded', function() {
    const textLines = document.querySelectorAll('.text-line');
    const particlesContainer = document.querySelector('.particles-container');
    const starsContainer = document.getElementById('stars-container');
    const backgroundMusic = document.getElementById('backgroundMusic');
    
    // 标题轮换功能
    const titles = ['Hello 同学', 'Momo祝你今天愉快','万事顺 长安宁'];
    let currentTitleIndex = 0;
    
    // 设置标题轮换定时器，每隔4秒更换一次
    setInterval(() => {
        currentTitleIndex = (currentTitleIndex + 1) % titles.length;
        document.title = titles[currentTitleIndex];
    }, 4000);
    
    // 存储粒子数组
    let particles = [];
    let stars = [];
    
    // 尝试播放背景音乐
    function initBackgroundMusic() {
        // 为了自动播放，需要用户交互
        document.addEventListener('click', function startMusic() {
            try {
                backgroundMusic.volume = 0.8; // 设置音量为80%
                backgroundMusic.play().catch(error => {
                    console.log('音乐播放需要用户交互:', error);
                });
                document.removeEventListener('click', startMusic);
            } catch (error) {
                console.log('音乐播放失败:', error);
            }
        }, { once: true });
    }
    
    // 创建星空效果
    function createStars() {
        const starCount = 300; // 星星数量
        
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            
            // 随机位置
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            
            // 随机大小和亮度
            const size = Math.random() * 3 + 1;
            const opacity = Math.random() * 0.8 + 0.2;
            
            // 随机颜色
            const colors = ['#ffffff', '#00f7ff', '#ffea00'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            // 设置星星样式
            star.style.position = 'absolute';
            star.style.left = `${x}vw`;
            star.style.top = `${y}vh`;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.backgroundColor = color;
            star.style.borderRadius = '50%';
            star.style.opacity = opacity;
            star.style.boxShadow = `0 0 ${size * 2}px ${color}`;
            
            // 添加闪烁动画
            const blinkDuration = Math.random() * 5 + 3;
            star.style.animation = `twinkle ${blinkDuration}s infinite ease-in-out`;
            star.style.animationDelay = `${Math.random() * 2}s`;
            
            // 添加到容器
            starsContainer.appendChild(star);
            stars.push(star);
        }
    }
    
    // 性能优化：使用requestAnimationFrame进行动画
    const animate = window.requestAnimationFrame || 
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    window.oRequestAnimationFrame ||
                    window.msRequestAnimationFrame ||
                    function(callback) { window.setTimeout(callback, 1000 / 60); };
    
    // 启动文字动画
    function startTextAnimation() {
        // 设置data-line属性
        textLines.forEach((line, index) => {
            if (!line.getAttribute('data-line')) {
                line.setAttribute('data-line', (index + 1).toString());
            }
        });
        
        // 添加动画类
        setTimeout(() => {
            textLines.forEach(line => {
                line.classList.add('animate');
            });
        }, 100);
    }
    
    // 创建粒子
    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // 随机大小和位置
        const size = Math.random() * 10 + 2;
        const x = Math.random() * 100;
        const duration = Math.random() * 15 + 10;
        const translateX = (Math.random() - 0.5) * 400;
        const rotate = Math.random() * 360;
        
        // 设置粒子样式
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${x}vw`;
        particle.style.setProperty('--translate-x', `${translateX}px`);
        particle.style.setProperty('--rotate', `${rotate}deg`);
        particle.style.animationDuration = `${duration}s`;
        
        // 随机颜色
        const hue = Math.random() * 360;
        particle.style.backgroundColor = `hsl(${hue}, 100%, 70%)`;
        
        // 添加到容器
        particlesContainer.appendChild(particle);
        particles.push(particle);
        
        // 动画结束后移除粒子
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
                particles = particles.filter(p => p !== particle);
            }
        }, duration * 1000);
    }
    
    // 定期创建粒子
    function spawnParticles() {
        // 根据屏幕大小调整粒子生成速度
        const screenSize = window.innerWidth * window.innerHeight;
        const spawnRate = Math.min(Math.max(screenSize / 100000, 1), 5); // 每秒1-5个粒子
        
        const interval = setInterval(() => {
            createParticle();
        }, 1000 / spawnRate);
        
        return interval;
    }
    
    // 优化函数：节流
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    // 响应式调整
    function handleResize() {
        // 清空现有粒子
        particles.forEach(particle => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        });
        particles = [];
        
        // 重新创建粒子
        clearInterval(particleInterval);
        particleInterval = spawnParticles();
    }
    
    // 使用节流优化resize事件
    const throttledResize = throttle(handleResize, 1000);
    
    // 启动所有动画和效果
    createStars();
    initBackgroundMusic();
    startTextAnimation();
    let particleInterval = spawnParticles();
    
    // 添加窗口调整事件监听
    window.addEventListener('resize', throttledResize);
    
    // 页面可见性变化时暂停/恢复动画
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            clearInterval(particleInterval);
        } else {
            particleInterval = spawnParticles();
        }
    });
});