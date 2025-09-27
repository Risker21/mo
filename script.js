// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // DOM元素引用
    const textLines = document.querySelectorAll('.text-line');
    const particlesContainer = document.querySelector('.particles-container');
    const starsContainer = document.getElementById('stars-container');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const body = document.body;
    const root = document.documentElement;
    
    // 状态管理
    let themeElementsContainer = null;
    let particleInterval = null;
    let stars = [];
    let particles = [];
    
    // 标题轮换功能 - 增强用户体验
    const titles = ['万事顺 长安宁', 'Momo祝你今天愉快', '钱包鼓鼓，胖了也酷'];
    let currentTitleIndex = 0;
    
    // 设置标题轮换定时器，每隔4秒更换一次
    const titleInterval = setInterval(() => {
        currentTitleIndex = (currentTitleIndex + 1) % titles.length;
        document.title = titles[currentTitleIndex];
    }, 4000);
    
    // 初始化主题元素容器 - 优化DOM结构
    function createThemeElementsContainer() {
        // 检查是否已存在容器
        themeElementsContainer = document.querySelector('.theme-elements');
        if (!themeElementsContainer) {
            themeElementsContainer = document.createElement('div');
            themeElementsContainer.className = 'theme-elements';
            body.appendChild(themeElementsContainer);
        }
    }
    
    // 清除现有主题元素 - 防止内存泄漏
    function clearThemeElements() {
        if (themeElementsContainer) {
            // 清空所有子元素
            while (themeElementsContainer.firstChild) {
                themeElementsContainer.removeChild(themeElementsContainer.firstChild);
            }
        }
        
        // 清空星空
        if (starsContainer) {
            starsContainer.innerHTML = '';
            stars = [];
        }
        
        // 清空粒子
        if (particlesContainer) {
            particlesContainer.innerHTML = '';
            particles = [];
        }
        
        // 清除粒子生成间隔
        if (particleInterval) {
            clearInterval(particleInterval);
            particleInterval = null;
        }
    }
    
    // 设置每日主题 - 核心功能
    function setDailyTheme() {
        const today = new Date();
        
        // 检查是否是国庆节期间 (10月1日-7日)
        if (isNationalDay(today)) {
            // 国庆节期间显示国庆主题
            setNationalDayTheme();
        } else {
            // 非国庆节期间根据星期几显示对应的主题
            const dayOfWeek = today.getDay();
            setThemeByDay(dayOfWeek);
        }
    }
    
    // 检查是否是国庆节期间 (10月1日-7日)
    function isNationalDay(date) {
        const month = date.getMonth() + 1; // 月份从0开始
        const day = date.getDate();
        return month === 10 && day >= 1 && day <= 7;
    }
    
    // 检查是否是中秋节
    function isMidAutumnDay(date) {
        // 这里简化处理，实际应该使用农历计算
        // 以下是未来几年中秋节的公历日期作为示例
        const midAutumnDates = [
            '2023-09-29', // 2023年中秋节
            '2024-09-17', // 2024年中秋节
            '2025-10-06', // 2025年中秋节（在国庆期间）
            '2026-09-25', // 2026年中秋节
            '2027-10-15', // 2027年中秋节
            '2028-10-03', // 2028年中秋节（在国庆期间）
        ];
        
        const dateStr = date.toISOString().split('T')[0];
        return midAutumnDates.includes(dateStr);
    }
    
    // 设置国庆节主题
    function setNationalDayTheme() {
        // 清除所有主题类
        body.className = '';
        
        // 清除现有主题元素
        clearThemeElements();
        
        // 添加国庆节主题类
        body.classList.add('theme-nationalday');
        
        // 设置国庆节文字（三行显示）
        if (textLines.length > 0) {
            textLines[0].textContent = '祖国母亲';
            textLines[0].removeAttribute('data-original-text');
        }
        if (textLines.length > 1) {
            textLines[1].textContent = '生日快乐';
            textLines[1].removeAttribute('data-original-text');
        }
        if (textLines.length > 2) {
            textLines[2].textContent = ''; // 第三行留空
            textLines[2].removeAttribute('data-original-text');
        }
        
        // 创建国庆节特定元素
        createNationalDayElements();
        
        // 重新启动文字动画
        startTextAnimation();
    }
    
    // 设置中秋节主题
    function setMidAutumnTheme() {
        // 清除所有主题类
        body.className = '';
        
        // 清除现有主题元素
        clearThemeElements();
        
        // 添加中秋节主题类
        body.classList.add('theme-midautumn');
        
        // 创建中秋节特定元素
        createMidAutumnElements();
        
        // 重新启动文字动画
        startTextAnimation();
    }
    
    // 根据星期几设置主题 - 确保主题正确应用
    function setThemeByDay(dayOfWeek) {
        // 清除所有主题类
        body.className = '';
        
        // 清除现有主题元素
        clearThemeElements();
        
        // 设置日常文字（三行显示，未来单独一行）
        if (textLines.length > 0) {
            textLines[0].textContent = '未来';
            textLines[0].removeAttribute('data-original-text');
        }
        if (textLines.length > 1) {
            textLines[1].textContent = '不是我们要去的某个地方';
            textLines[1].removeAttribute('data-original-text');
        }
        if (textLines.length > 2) {
            textLines[2].textContent = '而是我们正在创造的地方';
            textLines[2].removeAttribute('data-original-text');
        }
        
        // 根据星期几添加对应的主题类和效果
        switch(dayOfWeek) {
            case 1: // 周一 - 星空粒子风格
                body.classList.add('theme-monday');
                createStars();
                createParticles();
                break;
            case 2: // 周二 - 几何图形风格
                body.classList.add('theme-tuesday');
                createGeometricShapes();
                break;
            case 3: // 周三 - 波浪动态风格
                body.classList.add('theme-wednesday');
                createWaves();
                break;
            case 4: // 周四 - 温暖光斑风格
                body.classList.add('theme-thursday');
                createLightSpots();
                break;
            case 5: // 周五 - 霓虹灯效果
                body.classList.add('theme-friday');
                createNeonLines();
                break;
            case 6: // 周六 - 自然风景风格
                body.classList.add('theme-saturday');
                createClouds();
                break;
            case 0: // 周日 - 宇宙星云风格
                body.classList.add('theme-sunday');
                createStars();
                createNebula();
                break;
        }
        
        // 重新启动文字动画
        startTextAnimation();
    }
    
    // 创建星空效果（用于周一和周日主题）
    function createStars() {
        if (!starsContainer) return;
        
        const starCount = 300; // 星星数量
        
        // 获取当前主题颜色
        const primaryColor = getComputedStyle(root).getPropertyValue('--primary-color').trim();
        const secondaryColor = getComputedStyle(root).getPropertyValue('--secondary-color').trim();
        const accentColor = getComputedStyle(root).getPropertyValue('--accent-color').trim();
        
        // 使用主题颜色数组
        const colors = [primaryColor, secondaryColor, accentColor];
        
        // 优化：使用文档片段减少重绘重排
        const fragment = document.createDocumentFragment();
        
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            
            // 随机位置
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            
            // 随机大小和亮度
            const size = Math.random() * 3 + 1;
            const opacity = Math.random() * 0.8 + 0.2;
            
            // 从主题颜色中随机选择
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
            
            // 使用主题发光效果
            const glowSize = size * 2;
            star.style.boxShadow = `0 0 ${glowSize}px ${color}`;
            
            // 添加闪烁动画
            const blinkDuration = Math.random() * 5 + 3;
            star.style.animation = `twinkle ${blinkDuration}s infinite ease-in-out`;
            star.style.animationDelay = `${Math.random() * 2}s`;
            
            // 添加到文档片段
            fragment.appendChild(star);
            stars.push(star);
        }
        
        // 一次性添加到DOM
        starsContainer.appendChild(fragment);
    }
    
    // 创建粒子效果（用于周一主题）
    function createParticles() {
        if (!particlesContainer) return;
        
        // 根据屏幕大小调整粒子生成速度
        const screenSize = window.innerWidth * window.innerHeight;
        const spawnRate = Math.min(Math.max(screenSize / 100000, 1), 5); // 每秒1-5个粒子
        
        particleInterval = setInterval(() => {
            createSingleParticle();
        }, 1000 / spawnRate);
    }
    
    // 创建单个粒子
    function createSingleParticle() {
        if (!particlesContainer) return;
        
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // 随机大小和位置
        const size = Math.random() * 10 + 2;
        const x = Math.random() * 100;
        const duration = Math.random() * 15 + 10;
        const translateX = (Math.random() - 0.5) * 400;
        const rotate = Math.random() * 360;
        
        // 获取当前主题颜色
        const primaryColor = getComputedStyle(root).getPropertyValue('--primary-color').trim();
        const secondaryColor = getComputedStyle(root).getPropertyValue('--secondary-color').trim();
        const accentColor = getComputedStyle(root).getPropertyValue('--accent-color').trim();
        
        // 使用主题颜色数组
        const themeColors = [primaryColor, secondaryColor, accentColor];
        
        // 设置粒子样式
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${x}vw`;
        particle.style.setProperty('--translate-x', `${translateX}px`);
        particle.style.setProperty('--rotate', `${rotate}deg`);
        particle.style.animationDuration = `${duration}s`;
        
        // 从主题颜色中随机选择
        const randomColor = themeColors[Math.floor(Math.random() * themeColors.length)];
        particle.style.backgroundColor = randomColor;
        
        // 使用主题发光效果
        particle.style.boxShadow = `0 0 15px ${randomColor}`;
        
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
    
    // 创建几何图形（用于周二主题）
    function createGeometricShapes() {
        if (!themeElementsContainer) return;
        
        // 创建圆形
        const circle = document.createElement('div');
        circle.className = 'geometric-shape shape-1';
        themeElementsContainer.appendChild(circle);
        
        // 创建正方形
        const square = document.createElement('div');
        square.className = 'geometric-shape shape-2';
        themeElementsContainer.appendChild(square);
        
        // 创建三角形
        const triangle = document.createElement('div');
        triangle.className = 'geometric-shape shape-3';
        themeElementsContainer.appendChild(triangle);
    }
    
    // 创建波浪效果（用于周三主题）
    function createWaves() {
        if (!themeElementsContainer) return;
        
        // 创建三个波浪
        for (let i = 1; i <= 3; i++) {
            const wave = document.createElement('div');
            wave.className = `wave wave-${i}`;
            themeElementsContainer.appendChild(wave);
        }
    }
    
    // 创建光斑效果（用于周四主题）
    function createLightSpots() {
        if (!themeElementsContainer) return;
        
        // 创建三个光斑
        for (let i = 1; i <= 3; i++) {
            const spot = document.createElement('div');
            spot.className = `light-spot spot-${i}`;
            themeElementsContainer.appendChild(spot);
        }
    }
    
    // 创建霓虹灯线条（用于周五主题）
    function createNeonLines() {
        if (!themeElementsContainer) return;
        
        // 创建四条霓虹线
        for (let i = 1; i <= 4; i++) {
            const line = document.createElement('div');
            line.className = `neon-line line-${i}`;
            themeElementsContainer.appendChild(line);
        }
    }
    
    // 创建云朵效果（用于周六主题）
    function createClouds() {
        if (!themeElementsContainer) return;
        
        // 创建三个云朵
        for (let i = 1; i <= 3; i++) {
            const cloud = document.createElement('div');
            cloud.className = `cloud cloud-${i}`;
            themeElementsContainer.appendChild(cloud);
        }
    }
    
    // 创建星云效果（用于周日主题）
    function createNebula() {
        if (!themeElementsContainer) return;
        
        // 创建两个星云
        for (let i = 1; i <= 2; i++) {
            const nebula = document.createElement('div');
            nebula.className = `nebula nebula-${i}`;
            themeElementsContainer.appendChild(nebula);
        }
    }
    
    // 创建国庆节特定元素
    function createNationalDayElements() {
        if (!themeElementsContainer) return;
        
        // 创建国旗元素
        createFlags();
        
        // 创建烟花效果
        createFireworks();
        
        // 创建祥云效果
        createClouds();
    }
    
    // 创建中秋节特定元素
    function createMidAutumnElements() {
        if (!themeElementsContainer) return;
        
        // 创建月亮
        createMoon();
        
        // 创建月饼元素
        createMooncakes();
        
        // 创建灯笼元素
        createLanterns();
    }
    
    // 创建国旗元素
    function createFlags() {
        if (!themeElementsContainer) return;
        
        // 创建多个小国旗
        const flagCount = 20;
        for (let i = 1; i <= flagCount; i++) {
            const flag = document.createElement('div');
            flag.className = `national-flag flag-${i}`;
            themeElementsContainer.appendChild(flag);
        }
    }
    
    // 创建烟花效果
    function createFireworks() {
        if (!themeElementsContainer) return;
        
        // 创建烟花容器
        const fireworksContainer = document.createElement('div');
        fireworksContainer.className = 'fireworks-container';
        themeElementsContainer.appendChild(fireworksContainer);
        
        // 定时创建烟花
        setInterval(() => {
            const firework = document.createElement('div');
            firework.className = 'firework';
            
            // 随机位置
            const x = Math.random() * 100;
            const delay = Math.random() * 3;
            const size = 5 + Math.random() * 15;
            
            firework.style.left = `${x}vw`;
            firework.style.animationDelay = `${delay}s`;
            firework.style.width = `${size}px`;
            firework.style.height = `${size}px`;
            
            fireworksContainer.appendChild(firework);
            
            // 动画结束后移除
            setTimeout(() => {
                if (firework.parentNode) {
                    firework.parentNode.removeChild(firework);
                }
            }, 5000);
        }, 2000);
    }
    
    // 创建月亮
    function createMoon() {
        if (!themeElementsContainer) return;
        
        const moon = document.createElement('div');
        moon.className = 'moon';
        themeElementsContainer.appendChild(moon);
        
        // 创建月亮光晕
        const moonGlow = document.createElement('div');
        moonGlow.className = 'moon-glow';
        themeElementsContainer.appendChild(moonGlow);
    }
    
    // 创建月饼元素
    function createMooncakes() {
        if (!themeElementsContainer) return;
        
        // 创建3个月饼
        for (let i = 1; i <= 3; i++) {
            const mooncake = document.createElement('div');
            mooncake.className = `mooncake mooncake-${i}`;
            themeElementsContainer.appendChild(mooncake);
        }
    }
    
    // 创建灯笼元素
    function createLanterns() {
        if (!themeElementsContainer) return;
        
        // 创建4个灯笼
        for (let i = 1; i <= 4; i++) {
            const lantern = document.createElement('div');
            lantern.className = `lantern lantern-${i}`;
            themeElementsContainer.appendChild(lantern);
        }
    }
    
    // 尝试播放背景音乐 - 根据星期几加载对应的主题音乐
    function initBackgroundMusic() {
        if (!backgroundMusic) return;
        
        // 获取当前日期
        const today = new Date();
        
        let musicPath = '';
        let musicName = '';
        
        // 检查是否是国庆节期间或中秋节
        if (isNationalDay(today)) {
            if (isMidAutumnDay(today)) {
                // 中秋节音乐
                musicPath = 'music/MidAutumn.mp3';
                musicName = '中秋节';
            } else {
                // 国庆节音乐
                musicPath = 'music/NationalDay.mp3';
                musicName = '国庆节';
            }
        } else {
            // 正常工作日音乐
            const dayOfWeek = today.getDay();
            // 注意：周二的音乐文件名是Tuseday.mp3（拼写错误）
            const dayNames = ['Sunday', 'Monday', 'Tuseday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const dayName = dayNames[dayOfWeek];
            musicPath = `music/${dayName}.mp3`;
            // 但是显示给用户时使用正确的星期几名称
            const displayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            musicName = displayNames[dayOfWeek];
        }
        
        // 尝试设置音频源
        try {
            // 清除之前的所有source元素
            while (backgroundMusic.firstChild) {
                backgroundMusic.removeChild(backgroundMusic.firstChild);
            }
            
            // 创建新的source元素
            const source = document.createElement('source');
            source.src = musicPath;
            source.type = 'audio/mpeg';
            backgroundMusic.appendChild(source);
            
            console.log(`尝试加载今天(${musicName})的主题音乐: ${musicPath}`);
        } catch (error) {
            console.log('设置音乐源失败:', error);
        }
        
        // 为了自动播放，需要用户交互
        document.addEventListener('click', function startMusic() {
            try {
                backgroundMusic.volume = 0.8; // 设置音量为80%
                backgroundMusic.play().catch(error => {
                    console.log('音乐播放需要用户交互或文件不存在:', error);
                });
                document.removeEventListener('click', startMusic);
            } catch (error) {
                console.log('音乐播放失败:', error);
            }
        }, { once: true });
    }
    
    // 暂停背景音乐
    function pauseBackgroundMusic() {
        if (backgroundMusic) {
            backgroundMusic.pause();
        }
    }
    
    // 恢复背景音乐
    function resumeBackgroundMusic() {
        if (backgroundMusic && backgroundMusic.paused) {
            backgroundMusic.play().catch(error => {
                console.log('无法恢复音乐播放:', error);
            });
        }
    }
    
    // 启动文字动画 - 确保三行文字显示正确
    function startTextAnimation() {
        // 移除所有动画类
        textLines.forEach(line => {
            line.classList.remove('animate');
            line.classList.remove('logo-style');
            line.classList.remove('mouse-active');
            
            // 保存原始文本内容
            const originalText = line.getAttribute('data-original-text') || line.textContent;
            
            // 将文字拆分为单个字符并用span包裹，以实现像素抖动效果
            const textChars = originalText.split('');
            const wrappedText = textChars.map(char => {
                return char === ' ' ? ' ' : `<span>${char}</span>`;
            }).join('');
            
            // 保存原始文本并设置新内容
            if (!line.getAttribute('data-original-text')) {
                line.setAttribute('data-original-text', originalText);
            }
            line.innerHTML = wrappedText;
        });
        
        // 重置动画
        void document.body.offsetWidth; // 触发重排
        
        // 确保data-line属性正确设置
        textLines.forEach((line, index) => {
            if (!line.getAttribute('data-line')) {
                line.setAttribute('data-line', (index + 1).toString());
            }
        });
        
        // 检查是否是特定文本行，如果是则应用TRAE logo风格
        const logoTexts = ['未来探索'];
        
        // 添加动画类和logo风格（如果适用）
        setTimeout(() => {
            textLines.forEach(line => {
                // 检查是否是需要应用logo风格的文字
                if (logoTexts.includes(line.getAttribute('data-original-text').trim())) {
                    line.classList.add('logo-style');
                }
                line.classList.add('animate');
            });
        }, 100);
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
    
    // 响应式调整 - 确保在所有屏幕尺寸上都显示为三行
    function handleResize() {
        // 清除现有粒子
        if (particlesContainer) {
            particlesContainer.innerHTML = '';
            particles = [];
        }
        
        // 清除粒子生成间隔
        if (particleInterval) {
            clearInterval(particleInterval);
            particleInterval = null;
        }
        
        // 重新根据当前主题创建元素
        const currentTheme = body.className;
        if (currentTheme.includes('theme-monday')) {
            createParticles();
        }
        
        // 确保文字正确显示
        startTextAnimation();
    }
    
    // 使用节流优化resize事件
    const throttledResize = throttle(handleResize, 1000);
    
    // 创建角落装饰元素
    function createCornerDecorations() {
        // 检查是否已存在角落装饰元素
        if (document.querySelector('.corner-decoration')) {
            return;
        }
        
        const positions = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
        
        positions.forEach(position => {
            const decoration = document.createElement('div');
            decoration.className = `corner-decoration ${position}`;
            body.appendChild(decoration);
        });
    }
    
    // 处理点击波纹效果
    function handleClickRipple(event) {
        const ripple = document.createElement('div');
        ripple.classList.add('ripple-effect');
        
        // 计算波纹位置
        const x = event.clientX - ripple.offsetWidth / 2;
        const y = event.clientY - ripple.offsetHeight / 2;
        
        // 设置波纹位置
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        // 添加到body
        body.appendChild(ripple);
        
        // 动画结束后移除波纹
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 1000);
    }
    
    // 处理鼠标移动时的文字效果 - 优化为鼠标悬停在文字上时才有效果
    function handleMouseMove(event) {
        // 为每个文字行添加效果
        textLines.forEach(line => {
            // 获取文字元素的位置和尺寸
            const rect = line.getBoundingClientRect();
            
            // 检查鼠标是否直接在文字上（而不是范围内）
            const isMouseOver = event.clientX >= rect.left && 
                              event.clientX <= rect.right && 
                              event.clientY >= rect.top && 
                              event.clientY <= rect.bottom;
            
            if (isMouseOver) {
                line.classList.add('mouse-active');
                
                // 确保data-text属性存在
                if (!line.getAttribute('data-text')) {
                    line.setAttribute('data-text', line.textContent);
                }
                
                // 计算鼠标在文字上的相对位置（0-1范围）
                const relX = (event.clientX - rect.left) / rect.width;
                const relY = (event.clientY - rect.top) / rect.height;
                
                // 增强偏移效果，使破碎感更明显
                // 鼠标在文字左侧时向右偏移更大，右侧时向左偏移更大
                const moveX = (relX - 0.5) * 8; // 增大偏移量
                const moveY = (relY - 0.5) * 4; // 垂直方向也有一些偏移
                
                line.style.transform = `translate(${moveX}px, ${moveY}px)`;
            } else {
                // 移除效果
                line.classList.remove('mouse-active');
                line.style.transform = '';
            }
        });
    }
    
    // 计算两点之间的距离
    function getDistance(x1, y1, x2, y2) {
        const dx = x1 - x2;
        const dy = y1 - y2;
        return Math.sqrt(dx * dx + dy * dy);
    }
    
    // 初始化应用
    function initApp() {
        createThemeElementsContainer();
        createCornerDecorations(); // 创建角落装饰元素
        setDailyTheme(); // 设置每日主题
        initBackgroundMusic();
        
        // 添加事件监听
        setupEventListeners();
    }
    
    // 设置事件监听器
    function setupEventListeners() {
        // 添加点击波纹效果
        document.addEventListener('click', handleClickRipple, { passive: true });
        
        // 添加窗口调整事件监听
        window.addEventListener('resize', throttledResize);
        
        // 添加鼠标移动事件监听 - 实现文字效果
        document.addEventListener('mousemove', handleMouseMove, { passive: true });
        
        // 页面可见性变化时暂停/恢复动画和音乐，并检查日期变化
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                // 暂停粒子生成
                if (particleInterval) {
                    clearInterval(particleInterval);
                    particleInterval = null;
                }
                // 暂停音乐
                pauseBackgroundMusic();
            } else {
                // 检查日期变化，确保显示正确的主题
                const today = new Date();
                const isNational = isNationalDay(today);
                const currentTheme = body.className;
                
                // 如果当前显示的是国庆主题但今天不是国庆节期间，或者相反，就更新主题
                if ((currentTheme.includes('theme-nationalday') && !isNational) || 
                    (!currentTheme.includes('theme-nationalday') && isNational)) {
                    setDailyTheme();
                }
                
                // 恢复粒子生成（如果当前主题是周一）
                if (currentTheme.includes('theme-monday')) {
                    createParticles();
                }
                // 恢复音乐
                resumeBackgroundMusic();
                // 重新启动文字动画
                startTextAnimation();
            }
        });
        
        // 页面卸载时清理资源
        window.addEventListener('beforeunload', function() {
            if (particleInterval) {
                clearInterval(particleInterval);
            }
            if (titleInterval) {
                clearInterval(titleInterval);
            }
        });
    }
    
    // 启动应用
    initApp();
});