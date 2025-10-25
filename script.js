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
        // 直接根据星期几显示对应的主题
        const dayOfWeek = today.getDay();
        setThemeByDay(dayOfWeek);
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
            case 1: // 周一 - 数字雨科技风格
                body.classList.add('theme-monday');
                createDigitalRain();
                createTechParticles();
                break;
            case 2: // 周二 - 3D网格科技风格
                body.classList.add('theme-tuesday');
                createGridBackground();
                createTechCircles();
                break;
            case 3: // 周三 - 声波频率科技风格
                body.classList.add('theme-wednesday');
                createAudioWaves();
                createFrequencyBars();
                break;
            case 4: // 周四 - 全息投影科技风格
                body.classList.add('theme-thursday');
                createHolographicEffect();
                createScanLines();
                break;
            case 5: // 周五 - 霓虹电路科技风格
                body.classList.add('theme-friday');
                createCircuitLines();
                createGlowingNodes();
                break;
            case 6: // 周六 - 赛博朋克科技风格
                body.classList.add('theme-saturday');
                createCyberpunkBackground();
                createNeonSigns();
                break;
            case 0: // 周日 - 宇宙科技风格
                body.classList.add('theme-sunday');
                createSpaceTech();
                createPlanetOrbits();
                break;
        }
        
        // 重新启动文字动画
        startTextAnimation();
    }
    
    // 周一 - 数字雨科技风格（增强版）
function createDigitalRain() {
    if (!themeElementsContainer) return;
    
    // 创建多个数字雨列
    const columnCount = Math.floor(window.innerWidth / 20); // 自适应列数
    const containerWidth = window.innerWidth;
    const columnSpacing = containerWidth / columnCount;
    const fragment = document.createDocumentFragment();
    
    // 添加鼠标交互响应的数字雨效果
    const handleRainMouseMove = (e) => {
        const rainColumns = document.querySelectorAll('.digital-rain-column');
        rainColumns.forEach(column => {
            const rect = column.getBoundingClientRect();
            const distance = Math.sqrt(
                Math.pow(e.clientX - (rect.left + rect.width/2), 2) + 
                Math.pow(e.clientY - (rect.top + rect.height/2), 2)
            );
            
            // 鼠标附近的数字雨加速和颜色变化
            if (distance < 150) {
                const intensity = 1 - (distance / 150);
                column.style.animationDuration = `${10 - intensity * 7}s`;
                column.style.color = `rgba(0, 255, 157, ${0.7 + intensity * 0.3})`;
            } else {
                column.style.animationDuration = '10s';
                column.style.color = 'var(--primary-color)';
            }
        });
    };
    
    // 添加事件监听器（但避免重复添加）
    if (!document.hasRainMouseListener) {
        document.addEventListener('mousemove', handleRainMouseMove);
        document.hasRainMouseListener = true;
    }
    
    for (let i = 0; i < columnCount; i++) {
        const column = document.createElement('div');
        column.className = 'digital-rain-column';
        column.style.left = `${i * columnSpacing}px`;
        column.style.animationDelay = `${Math.random() * 5}s`;
        column.style.animationDuration = `${10 + Math.random() * 20}s`;
        column.style.fontSize = `${12 + Math.random() * 6}px`; // 随机字体大小增加变化
        
        // 填充随机字符
        const rainLength = 30 + Math.floor(Math.random() * 30);
        for (let j = 0; j < rainLength; j++) {
            // 混合使用中日韩字符、数字和符号
            const charSet = Math.random();
            let charCode;
            if (charSet < 0.3) {
                charCode = Math.floor(Math.random() * 94) + 33; // ASCII 可打印字符
            } else if (charSet < 0.7) {
                charCode = Math.floor(Math.random() * 20902) + 19968; // 中文字符
            } else {
                charCode = Math.floor(Math.random() * 1000) + 0x3040; // 日文字符
            }
            
            const charSpan = document.createElement('span');
            charSpan.textContent = String.fromCharCode(charCode);
            
            // 随机透明度和颜色变化
            const opacity = 0.3 + Math.random() * 0.7;
            const randomColor = Math.random() > 0.7 ? 
                'var(--secondary-color)' : 'var(--primary-color)';
            
            charSpan.style.opacity = opacity;
            charSpan.style.color = randomColor;
            charSpan.style.animationDelay = `${Math.random() * 2}s`;
            
            column.appendChild(charSpan);
        }
        
        fragment.appendChild(column);
    }
    
    themeElementsContainer.appendChild(fragment);
    
    // 添加额外的数字矩阵背景
    createDigitalMatrix();
}
    
    function createTechParticles() {
    if (!particlesContainer) return;
    
    // 创建粒子容器
    const particleCount = 50; // 增加粒子数量
    const fragment = document.createDocumentFragment();
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('tech-particle');
        
        // 随机位置和大小
        const size = Math.random() * 3 + 1;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 10 + 5;
        
        // 设置随机颜色
        const colors = ['var(--primary-color)', 'var(--secondary-color)', 'var(--accent-color)'];
        
        // 设置粒子样式
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${x}vw`;
        particle.style.top = `${y}vh`;
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        fragment.appendChild(particle);
        particles.push(particle);
    }
    
    particlesContainer.appendChild(fragment);
    
    // 添加粒子连线效果
    createParticleConnections(particles);
}

// 创建粒子之间的连线效果
function createParticleConnections(particles) {
    if (!themeElementsContainer) return;
    
    const connectionCanvas = document.createElement('canvas');
    connectionCanvas.className = 'particle-connection-canvas';
    connectionCanvas.width = window.innerWidth;
    connectionCanvas.height = window.innerHeight;
    themeElementsContainer.appendChild(connectionCanvas);
    
    const ctx = connectionCanvas.getContext('2d');
    
    // 绘制连接线的函数
    function drawConnections() {
        ctx.clearRect(0, 0, connectionCanvas.width, connectionCanvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const p1 = particles[i].getBoundingClientRect();
                const p2 = particles[j].getBoundingClientRect();
                
                const x1 = p1.left + p1.width / 2;
                const y1 = p1.top + p1.height / 2;
                const x2 = p2.left + p2.width / 2;
                const y2 = p2.top + p2.height / 2;
                
                // 计算两点之间的距离
                const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                
                // 只连接距离较近的粒子
                if (distance < 150) {
                    // 根据距离调整透明度
                    const opacity = 0.5 - (distance / 300);
                    
                    ctx.beginPath();
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x2, y2);
                    ctx.strokeStyle = `rgba(0, 255, 157, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(drawConnections);
    }
    
    // 开始绘制连接线
    drawConnections();
    
    // 监听窗口大小变化
    window.addEventListener('resize', () => {
        connectionCanvas.width = window.innerWidth;
        connectionCanvas.height = window.innerHeight;
    });
}

// 创建数字矩阵背景
function createDigitalMatrix() {
    if (!themeElementsContainer) return;
    
    const matrixOverlay = document.createElement('div');
    matrixOverlay.className = 'digital-matrix-overlay';
    themeElementsContainer.appendChild(matrixOverlay);
    
    // 添加网格线
    const gridSize = 30;
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    for (let x = 0; x < width; x += gridSize) {
        for (let y = 0; y < height; y += gridSize) {
            const dot = document.createElement('div');
            dot.className = 'matrix-dot';
            dot.style.left = `${x}px`;
            dot.style.top = `${y}px`;
            dot.style.animationDelay = `${Math.random() * 3}s`;
            matrixOverlay.appendChild(dot);
        }
    }
}
    
    // 周二 - 3D网格科技风格（增强版）
function createGridBackground() {
    if (!themeElementsContainer) return;
    
    const grid = document.createElement('div');
    grid.className = 'tech-grid';
    themeElementsContainer.appendChild(grid);
    
    // 创建网格线
    const gridLines = document.createElement('div');
    gridLines.className = 'grid-lines';
    themeElementsContainer.appendChild(gridLines);
    
    // 添加3D立体效果元素
    create3DLights();
    
    // 添加鼠标交互的网格变形效果
    addGridMouseInteraction(grid);
}

// 创建3D灯光效果
function create3DLights() {
    if (!themeElementsContainer) return;
    
    const lightCount = 5;
    for (let i = 0; i < lightCount; i++) {
        const light = document.createElement('div');
        light.className = 'grid-light';
        light.style.left = `${Math.random() * 100}%`;
        light.style.top = `${Math.random() * 100}%`;
        light.style.animationDelay = `${Math.random() * 3}s`;
        light.style.animationDuration = `${5 + Math.random() * 5}s`;
        themeElementsContainer.appendChild(light);
    }
}

// 添加网格鼠标交互效果
function addGridMouseInteraction(grid) {
    if (!grid) return;
    
    // 添加鼠标移动事件监听
    const handleGridMouseMove = (e) => {
        const rect = document.body.getBoundingClientRect();
        const x = (e.clientX / rect.width) - 0.5;
        const y = (e.clientY / rect.height) - 0.5;
        
        // 根据鼠标位置旋转网格
        grid.style.transform = `perspective(800px) rotateX(${60 + y * 15}deg) rotateY(${x * 15}deg) scale(2)`;
        
        // 调整网格线的不透明度
        const gridLines = document.querySelector('.grid-lines');
        if (gridLines) {
            const distance = Math.sqrt(x * x + y * y);
            gridLines.style.opacity = 0.3 + (0.5 - distance * 0.5);
        }
    };
    
    // 添加事件监听器（避免重复添加）
    if (!document.hasGridMouseListener) {
        document.addEventListener('mousemove', handleGridMouseMove);
        document.hasGridMouseListener = true;
    }
}
    
    function createTechCircles() {
    if (!themeElementsContainer) return;
    
    // 创建多个科技圆环，增加数量和变化
    const circleCount = 6;
    const radiusRange = [80, 200]; // 半径范围
    
    for (let i = 0; i < circleCount; i++) {
        const circle = document.createElement('div');
        circle.className = `tech-circle circle-${i % 3 + 1}`;
        
        // 随机半径和位置
        const radius = radiusRange[0] + Math.random() * (radiusRange[1] - radiusRange[0]);
        circle.style.width = `${radius * 2}px`;
        circle.style.height = `${radius * 2}px`;
        circle.style.left = `${Math.random() * 80}%`;
        circle.style.top = `${Math.random() * 80}%`;
        
        // 随机颜色和动画
        const colors = ['var(--primary-color)', 'var(--secondary-color)', 'var(--accent-color)'];
        circle.style.borderColor = colors[i % colors.length];
        circle.style.animationDelay = `${Math.random() * 2}s`;
        circle.style.animationDuration = `${5 + Math.random() * 5}s`;
        
        // 添加发光效果
        const glow = document.createElement('div');
        glow.className = 'circle-glow';
        circle.appendChild(glow);
        
        themeElementsContainer.appendChild(circle);
    }
    
    // 添加圆环之间的连接线
    createCircleConnections();
}

// 创建圆环之间的连接线
function createCircleConnections() {
    if (!themeElementsContainer) return;
    
    const connectionCanvas = document.createElement('canvas');
    connectionCanvas.className = 'circle-connection-canvas';
    connectionCanvas.width = window.innerWidth;
    connectionCanvas.height = window.innerHeight;
    themeElementsContainer.appendChild(connectionCanvas);
    
    const ctx = connectionCanvas.getContext('2d');
    
    function drawConnections() {
        ctx.clearRect(0, 0, connectionCanvas.width, connectionCanvas.height);
        
        const circles = document.querySelectorAll('.tech-circle');
        
        for (let i = 0; i < circles.length; i++) {
            for (let j = i + 1; j < circles.length; j++) {
                const rect1 = circles[i].getBoundingClientRect();
                const rect2 = circles[j].getBoundingClientRect();
                
                const x1 = rect1.left + rect1.width / 2;
                const y1 = rect1.top + rect1.height / 2;
                const x2 = rect2.left + rect2.width / 2;
                const y2 = rect2.top + rect2.height / 2;
                
                const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                
                // 只连接距离适中的圆环
                if (distance > 200 && distance < 500) {
                    ctx.beginPath();
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x2, y2);
                    ctx.strokeStyle = 'rgba(0, 176, 255, 0.3)';
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(drawConnections);
    }
    
    drawConnections();
    
    // 监听窗口大小变化
    window.addEventListener('resize', () => {
        connectionCanvas.width = window.innerWidth;
        connectionCanvas.height = window.innerHeight;
    });
}
    
    // 周三 - 声波频率科技风格（增强版）
function createAudioWaves() {
    if (!themeElementsContainer) return;
    
    const waveContainer = document.createElement('div');
    waveContainer.className = 'audio-wave-container';
    
    // 创建多个波形条，增加数量和变化
    const barCount = 80;
    const fragment = document.createDocumentFragment();
    
    for (let i = 0; i < barCount; i++) {
        const waveBar = document.createElement('div');
        waveBar.className = 'audio-wave-bar';
        waveBar.style.animationDelay = `${i * 0.02}s`;
        waveBar.style.animationDuration = `${0.5 + Math.random() * 1.5}s`;
        waveBar.style.width = `${4 + Math.random() * 4}px`;
        
        // 随机颜色渐变
        const colors = [
            'linear-gradient(to top, var(--primary-color), var(--secondary-color))',
            'linear-gradient(to top, var(--secondary-color), var(--accent-color))',
            'linear-gradient(to top, var(--accent-color), var(--primary-color))'
        ];
        waveBar.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        fragment.appendChild(waveBar);
    }
    
    waveContainer.appendChild(fragment);
    themeElementsContainer.appendChild(waveContainer);
    
    // 添加音频可视化效果（模拟）
    simulateAudioVisualization(waveContainer);
}

// 模拟音频可视化效果
function simulateAudioVisualization(container) {
    const bars = container.querySelectorAll('.audio-wave-bar');
    
    function updateVisualization() {
        bars.forEach(bar => {
            // 随机高度变化模拟音频响应
            const height = Math.random() * 80 + 20; // 20-100%
            bar.style.height = `${height}%`;
            
            // 亮度随高度变化
            const brightness = 0.5 + (height / 200);
            bar.style.opacity = brightness;
        });
        
        // 每100ms更新一次
        setTimeout(updateVisualization, 100);
    }
    
    updateVisualization();
}
    
    function createFrequencyBars() {
    if (!themeElementsContainer) return;
    
    // 创建多个频率条区域，增加视觉丰富度
    const containerCount = 3;
    const positions = [
        { top: '20%', left: '5%', orientation: 'vertical' },
        { top: '60%', left: '75%', orientation: 'horizontal' },
        { top: '40%', left: '40%', orientation: 'vertical' }
    ];
    
    positions.forEach((pos, containerIndex) => {
        const freqContainer = document.createElement('div');
        freqContainer.className = `frequency-container freq-container-${containerIndex + 1}`;
        freqContainer.style.top = pos.top;
        freqContainer.style.left = pos.left;
        
        if (pos.orientation === 'horizontal') {
            freqContainer.classList.add('horizontal');
        }
        
        // 创建频率条
        const barCount = containerIndex === 2 ? 15 : 20;
        for (let i = 0; i < barCount; i++) {
            const freqBar = document.createElement('div');
            freqBar.className = 'frequency-bar';
            freqBar.style.animationDelay = `${i * 0.1}s`;
            freqBar.style.animationDuration = `${1.5 + Math.random() * 2}s`;
            
            // 根据位置设置不同的颜色
            const colors = [
                'linear-gradient(to top, var(--accent-color), var(--primary-color))',
                'linear-gradient(to top, var(--primary-color), var(--secondary-color))',
                'linear-gradient(to top, var(--secondary-color), var(--accent-color))'
            ];
            freqBar.style.background = colors[containerIndex];
            
            freqContainer.appendChild(freqBar);
        }
        
        themeElementsContainer.appendChild(freqContainer);
    });
    
    // 添加频谱分析效果
    createSpectrumAnalyzer();
}

// 创建频谱分析效果
function createSpectrumAnalyzer() {
    if (!themeElementsContainer) return;
    
    const analyzerContainer = document.createElement('div');
    analyzerContainer.className = 'spectrum-analyzer';
    themeElementsContainer.appendChild(analyzerContainer);
    
    // 创建频谱线
    const lineCount = 30;
    for (let i = 0; i < lineCount; i++) {
        const line = document.createElement('div');
        line.className = 'spectrum-line';
        line.style.left = `${i * (100 / lineCount)}%`;
        line.style.animationDelay = `${i * 0.05}s`;
        analyzerContainer.appendChild(line);
    }
}
    
    // 周四 - 全息投影科技风格（增强版）
function createHolographicEffect() {
    if (!themeElementsContainer) return;
    
    // 创建全息投影底座
    const holoBase = document.createElement('div');
    holoBase.className = 'holographic-base';
    themeElementsContainer.appendChild(holoBase);
    
    // 创建全息投影内容
    const holoContent = document.createElement('div');
    holoContent.className = 'holographic-content';
    themeElementsContainer.appendChild(holoContent);
    
    // 创建更多投影线，增加密度
    const lineCount = 12;
    for (let i = 0; i < lineCount; i++) {
        const holoLine = document.createElement('div');
        holoLine.className = `holographic-line line-${i}`;
        holoLine.style.left = `${25 + (i * 5)}%`;
        holoLine.style.top = `${15 + Math.random() * 10}%`;
        holoLine.style.height = `${250 + Math.random() * 100}px`;
        holoLine.style.animationDelay = `${i * 0.3}s`;
        holoLine.style.animationDuration = `${7 + Math.random() * 3}s`;
        themeElementsContainer.appendChild(holoLine);
    }
    
    // 添加全息网格效果
    createHolographicGrid();
    
    // 添加全息粒子效果
    createHolographicParticles();
    
    // 添加鼠标交互
    addHolographicInteraction(holoContent);
}

// 创建全息网格效果
function createHolographicGrid() {
    if (!themeElementsContainer) return;
    
    const gridContainer = document.createElement('div');
    gridContainer.className = 'holographic-grid';
    themeElementsContainer.appendChild(gridContainer);
    
    // 创建垂直和水平线
    const lineCount = 15;
    
    // 垂直线
    for (let i = 0; i < lineCount; i++) {
        const vLine = document.createElement('div');
        vLine.className = 'holographic-grid-line vertical';
        vLine.style.left = `${(i / (lineCount - 1)) * 100}%`;
        gridContainer.appendChild(vLine);
    }
    
    // 水平线
    for (let i = 0; i < lineCount; i++) {
        const hLine = document.createElement('div');
        hLine.className = 'holographic-grid-line horizontal';
        hLine.style.top = `${(i / (lineCount - 1)) * 100}%`;
        gridContainer.appendChild(hLine);
    }
}

// 创建全息粒子效果
function createHolographicParticles() {
    if (!themeElementsContainer) return;
    
    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'holographic-particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        particle.style.animationDuration = `${3 + Math.random() * 7}s`;
        themeElementsContainer.appendChild(particle);
    }
}

// 添加全息投影交互效果
function addHolographicInteraction(content) {
    if (!content) return;
    
    const handleHoloMouseMove = (e) => {
        const rect = document.body.getBoundingClientRect();
        const x = (e.clientX / rect.width) - 0.5;
        const y = (e.clientY / rect.height) - 0.5;
        
        // 根据鼠标位置移动全息投影
        content.style.transform = `translateX(-50%) translateY(${y * 20}px) rotateX(${y * 10}deg) rotateY(${x * 10}deg)`;
        
        // 调整透明度
        const distance = Math.sqrt(x * x + y * y);
        content.style.opacity = 0.2 + (0.3 - distance * 0.2);
    };
    
    // 添加事件监听器
    if (!document.hasHoloMouseListener) {
        document.addEventListener('mousemove', handleHoloMouseMove);
        document.hasHoloMouseListener = true;
    }
}
    
    function createScanLines() {
    if (!themeElementsContainer) return;
    
    const scanLines = document.createElement('div');
    scanLines.className = 'scan-lines';
    themeElementsContainer.appendChild(scanLines);
    
    // 添加动态扫描线效果
    createDynamicScanLines();
}

// 创建动态扫描线效果
function createDynamicScanLines() {
    if (!themeElementsContainer) return;
    
    const dynamicLines = document.createElement('div');
    dynamicLines.className = 'dynamic-scan-lines';
    themeElementsContainer.appendChild(dynamicLines);
    
    // 创建多条动态扫描线
    const lineCount = 5;
    for (let i = 0; i < lineCount; i++) {
        const line = document.createElement('div');
        line.className = 'dynamic-scan-line';
        line.style.animationDelay = `${i * 2}s`;
        dynamicLines.appendChild(line);
    }
}
    
    // 周五 - 量子波动科技风格（增强版）
function createCircuitLines() {
    if (!themeElementsContainer) return;
    
    // 创建主电路线
    const mainCircuit = document.createElement('div');
    mainCircuit.className = 'circuit-main';
    themeElementsContainer.appendChild(mainCircuit);
    
    // 创建更复杂的分支电路
    const branchCount = 12;
    const directions = ['top', 'right', 'bottom', 'left'];
    
    for (let i = 1; i <= branchCount; i++) {
        const branch = document.createElement('div');
        branch.className = `circuit-branch branch-${i}`;
        branch.dataset.direction = directions[i % directions.length];
        themeElementsContainer.appendChild(branch);
    }
    
    // 添加电路动画效果
    animateCircuits();
    
    // 添加鼠标交互
    addCircuitInteraction();
}

// 为电路添加动画效果
function animateCircuits() {
    // 创建脉冲效果
    setInterval(() => {
        const mainCircuit = document.querySelector('.circuit-main');
        if (mainCircuit) {
            const pulse = document.createElement('div');
            pulse.className = 'circuit-pulse';
            mainCircuit.appendChild(pulse);
            
            // 动画结束后移除
            setTimeout(() => {
                if (pulse.parentNode) {
                    pulse.parentNode.removeChild(pulse);
                }
            }, 1000);
        }
    }, 2000);
}

// 添加电路交互效果
function addCircuitInteraction() {
    const handleCircuitMouseMove = (e) => {
        const branches = document.querySelectorAll('.circuit-branch');
        branches.forEach(branch => {
            const rect = branch.getBoundingClientRect();
            const distance = Math.sqrt(
                Math.pow(e.clientX - (rect.left + rect.width/2), 2) + 
                Math.pow(e.clientY - (rect.top + rect.height/2), 2)
            );
            
            // 鼠标附近的电路变亮
            if (distance < 100) {
                const intensity = 1 - (distance / 100);
                branch.style.opacity = 0.5 + intensity * 0.5;
                branch.style.transform = `scale(${1 + intensity * 0.1})`;
            } else {
                branch.style.opacity = 0.5;
                branch.style.transform = 'scale(1)';
            }
        });
    };
    
    if (!document.hasCircuitMouseListener) {
        document.addEventListener('mousemove', handleCircuitMouseMove);
        document.hasCircuitMouseListener = true;
    }
}
    
    function createGlowingNodes() {
    if (!themeElementsContainer) return;
    
    // 增加节点数量并创建连接
    const nodeCount = 30;
    const nodes = [];
    
    for (let i = 0; i < nodeCount; i++) {
        const node = document.createElement('div');
        node.className = 'circuit-node';
        node.style.left = `${Math.random() * 100}vw`;
        node.style.top = `${Math.random() * 100}vh`;
        node.style.animationDelay = `${Math.random() * 2}s`;
        node.style.animationDuration = `${2 + Math.random() * 3}s`;
        
        // 随机颜色
        const colors = ['var(--primary-color)', 'var(--secondary-color)', 'var(--accent-color)'];
        node.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        themeElementsContainer.appendChild(node);
        nodes.push(node);
    }
    
    // 连接相近的节点
    connectNodes(nodes);
}

// 连接相近的节点
function connectNodes(nodes) {
    if (!themeElementsContainer) return;
    
    const connectionCanvas = document.createElement('canvas');
    connectionCanvas.className = 'node-connection-canvas';
    connectionCanvas.width = window.innerWidth;
    connectionCanvas.height = window.innerHeight;
    themeElementsContainer.appendChild(connectionCanvas);
    
    const ctx = connectionCanvas.getContext('2d');
    
    function drawConnections() {
        ctx.clearRect(0, 0, connectionCanvas.width, connectionCanvas.height);
        
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                if (nodes[i] && nodes[j]) {
                    const rect1 = nodes[i].getBoundingClientRect();
                    const rect2 = nodes[j].getBoundingClientRect();
                    
                    const x1 = rect1.left + rect1.width / 2;
                    const y1 = rect1.top + rect1.height / 2;
                    const x2 = rect2.left + rect2.width / 2;
                    const y2 = rect2.top + rect2.height / 2;
                    
                    const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                    
                    // 只连接距离适中的节点
                    if (distance < 200) {
                        // 脉冲效果
                        const time = Date.now() / 1000;
                        const pulsePosition = (time % 1) * distance;
                        const pulseX = x1 + (x2 - x1) * (pulsePosition / distance);
                        const pulseY = y1 + (y2 - y1) * (pulsePosition / distance);
                        
                        // 绘制连接线
                        ctx.beginPath();
                        ctx.moveTo(x1, y1);
                        ctx.lineTo(x2, y2);
                        ctx.strokeStyle = 'rgba(0, 255, 255, 0.2)';
                        ctx.lineWidth = 1;
                        ctx.stroke();
                        
                        // 绘制脉冲点
                        ctx.beginPath();
                        ctx.arc(pulseX, pulseY, 3, 0, Math.PI * 2);
                        ctx.fillStyle = 'rgba(0, 255, 255, 0.8)';
                        ctx.fill();
                    }
                }
            }
        }
        
        requestAnimationFrame(drawConnections);
    }
    
    drawConnections();
    
    window.addEventListener('resize', () => {
        connectionCanvas.width = window.innerWidth;
        connectionCanvas.height = window.innerHeight;
    });
}
    
    // 周六 - 赛博朋克科技风格（增强版）
    function createCyberpunkBackground() {
        if (!themeElementsContainer) return;
        
        // 创建城市剪影
        const citySkyline = document.createElement('div');
        citySkyline.className = 'cyberpunk-skyline';
        themeElementsContainer.appendChild(citySkyline);
        
        // 创建故障艺术效果
        const glitchEffect = document.createElement('div');
        glitchEffect.className = 'glitch-effect';
        themeElementsContainer.appendChild(glitchEffect);
        
        // 添加动态噪点效果
        createCyberpunkNoise();
        
        // 添加动态雨效果
        createCyberpunkRain();
        
        // 添加电子流效果
        createCyberpunkElectrons();
    }
    
    // 创建赛博朋克噪点效果
    function createCyberpunkNoise() {
        if (!themeElementsContainer) return;
        
        const noiseCanvas = document.createElement('canvas');
        noiseCanvas.className = 'cyberpunk-noise';
        noiseCanvas.width = window.innerWidth;
        noiseCanvas.height = window.innerHeight;
        themeElementsContainer.appendChild(noiseCanvas);
        
        const ctx = noiseCanvas.getContext('2d');
        
        function renderNoise() {
            const imageData = ctx.createImageData(noiseCanvas.width, noiseCanvas.height);
            const data = imageData.data;
            
            for (let i = 0; i < data.length; i += 4) {
                const value = Math.random() * 10;
                data[i] = value;     // R
                data[i + 1] = value; // G
                data[i + 2] = value; // B
                data[i + 3] = 20;    // A
            }
            
            ctx.putImageData(imageData, 0, 0);
            requestAnimationFrame(renderNoise);
        }
        
        renderNoise();
        
        window.addEventListener('resize', () => {
            noiseCanvas.width = window.innerWidth;
            noiseCanvas.height = window.innerHeight;
        });
    }
    
    // 创建赛博朋克雨效果
    function createCyberpunkRain() {
        if (!themeElementsContainer) return;
        
        const rainContainer = document.createElement('div');
        rainContainer.className = 'cyberpunk-rain';
        themeElementsContainer.appendChild(rainContainer);
        
        const rainCount = 100;
        for (let i = 0; i < rainCount; i++) {
            const drop = document.createElement('div');
            drop.className = 'rain-drop';
            drop.style.left = `${Math.random() * 100}vw`;
            drop.style.animationDuration = `${0.5 + Math.random() * 1.5}s`;
            drop.style.animationDelay = `${Math.random() * 5}s`;
            drop.style.opacity = 0.2 + Math.random() * 0.3;
            drop.style.height = `${5 + Math.random() * 20}px`;
            
            rainContainer.appendChild(drop);
        }
    }
    
    // 创建电子流效果
    function createCyberpunkElectrons() {
        if (!themeElementsContainer) return;
        
        const electronContainer = document.createElement('div');
        electronContainer.className = 'cyberpunk-electrons';
        themeElementsContainer.appendChild(electronContainer);
        
        const electronCount = 30;
        for (let i = 0; i < electronCount; i++) {
            const electron = document.createElement('div');
            electron.className = 'cyber-electron';
            electron.style.left = `${Math.random() * 100}vw`;
            electron.style.top = `${Math.random() * 100}vh`;
            electron.style.animationDuration = `${3 + Math.random() * 5}s`;
            electron.style.animationDelay = `${Math.random() * 5}s`;
            
            electronContainer.appendChild(electron);
        }
    }
    
    function createNeonSigns() {
        if (!themeElementsContainer) return;
        
        const signs = [
            { text: 'FUTURE', className: 'neon-sign sign-1' },
            { text: 'TECH', className: 'neon-sign sign-2' },
            { text: 'CYBER', className: 'neon-sign sign-3' },
            { text: '2025', className: 'neon-sign sign-4' },
            { text: 'NEON', className: 'neon-sign sign-5' }
        ];
        
        signs.forEach(sign => {
            const signEl = document.createElement('div');
            signEl.className = sign.className;
            signEl.textContent = sign.text;
            
            // 添加随机闪烁效果
            signEl.style.animationDuration = `${2 + Math.random() * 3}s`;
            signEl.style.animationDelay = `${Math.random() * 2}s`;
            
            themeElementsContainer.appendChild(signEl);
        });
        
        // 添加动态文字霓虹灯效果
        createNeonText();
        
        // 添加交互式霓虹效果
        addNeonInteraction();
    }
    
    // 创建霓虹灯文字效果
    function createNeonText() {
        if (!themeElementsContainer) return;
        
        const neonTexts = ['WORLD','HEllo','Momo同学','2025','RISKER21'];
        
        for (let i = 0; i < neonTexts.length; i++) {
            const textEl = document.createElement('div');
            textEl.className = `cyberpunk-text text-${i + 1}`;
            textEl.textContent = neonTexts[i];
            textEl.style.animationDelay = `${Math.random() * 3}s`;
            
            themeElementsContainer.appendChild(textEl);
        }
    }
    
    // 添加霓虹交互效果
    function addNeonInteraction() {
        const handleNeonMouseMove = (e) => {
            const neonSigns = document.querySelectorAll('.neon-sign');
            neonSigns.forEach(sign => {
                const rect = sign.getBoundingClientRect();
                const distance = Math.sqrt(
                    Math.pow(e.clientX - (rect.left + rect.width/2), 2) + 
                    Math.pow(e.clientY - (rect.top + rect.height/2), 2)
                );
                
                // 鼠标靠近时增强霓虹灯效果
                if (distance < 150) {
                    const intensity = 1 - (distance / 150);
                    sign.style.transform = `scale(${1 + intensity * 0.1})`;
                    sign.style.filter = `brightness(${1 + intensity})`;
                } else {
                    sign.style.transform = 'scale(1)';
                    sign.style.filter = 'brightness(1)';
                }
            });
        };
        
        if (!document.hasNeonMouseListener) {
            document.addEventListener('mousemove', handleNeonMouseMove);
            document.hasNeonMouseListener = true;
        }
    }
    
    // 周日 - 宇宙科技风格（增强版）
    function createSpaceTech() {
        if (!themeElementsContainer) return;
        
        // 创建更丰富的科技星星
        createEnhancedStars(300);
        
        // 创建银河效果
        const galaxy = document.createElement('div');
        galaxy.className = 'space-tech-galaxy';
        themeElementsContainer.appendChild(galaxy);
        
        // 添加星云效果
        createNebulas();
        
        // 添加宇宙射线效果
        createCosmicRays();
    }
    
    // 创建增强的星星效果
    function createEnhancedStars(count) {
        if (!themeElementsContainer) return;
        
        for (let i = 0; i < count; i++) {
            const star = document.createElement('div');
            star.className = 'space-tech-star';
            star.style.left = `${Math.random() * 100}vw`;
            star.style.top = `${Math.random() * 100}vh`;
            star.style.animationDelay = `${Math.random() * 5}s`;
            star.style.animationDuration = `${1 + Math.random() * 4}s`;
            
            // 随机大小和亮度
            const size = 1 + Math.random() * 3;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.opacity = 0.3 + Math.random() * 0.7;
            
            // 随机颜色
            const colors = ['#ffffff', '#a8d8ff', '#ffd8d8', '#d8ffd8'];
            star.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            themeElementsContainer.appendChild(star);
        }
        
        // 创建流星效果
        createMeteors(8);
    }
    
    // 创建流星效果
    function createMeteors(count) {
        if (!themeElementsContainer) return;
        
        function createMeteor() {
            const meteor = document.createElement('div');
            meteor.className = 'space-meteor';
            meteor.style.left = `${-100}px`;
            meteor.style.top = `${Math.random() * 50}vh`;
            meteor.style.transform = `rotate(${30 + Math.random() * 20}deg)`;
            meteor.style.animationDuration = `${2 + Math.random() * 3}s`;
            
            themeElementsContainer.appendChild(meteor);
            
            // 流星动画结束后移除
            setTimeout(() => {
                if (meteor.parentNode) {
                    meteor.parentNode.removeChild(meteor);
                }
            }, 5000);
            
            // 定时创建新流星
            setTimeout(createMeteor, 2000 + Math.random() * 4000);
        }
        
        // 初始创建多个流星
        for (let i = 0; i < count; i++) {
            setTimeout(createMeteor, i * 1500);
        }
    }
    
    // 创建星云效果
    function createNebulas() {
        if (!themeElementsContainer) return;
        
        const nebulaColors = ['#3a0ca3', '#4361ee', '#7209b7', '#f72585'];
        
        for (let i = 0; i < 4; i++) {
            const nebula = document.createElement('div');
            nebula.className = `space-nebula nebula-${i + 1}`;
            nebula.style.backgroundColor = nebulaColors[i];
            nebula.style.opacity = 0.05 + Math.random() * 0.05;
            themeElementsContainer.appendChild(nebula);
        }
    }
    
    // 创建宇宙射线效果
    function createCosmicRays() {
        if (!themeElementsContainer) return;
        
        const rayCount = 10;
        
        for (let i = 0; i < rayCount; i++) {
            const ray = document.createElement('div');
            ray.className = 'cosmic-ray';
            ray.style.transform = `rotate(${Math.random() * 360}deg)`;
            ray.style.animationDuration = `${5 + Math.random() * 10}s`;
            ray.style.animationDelay = `${Math.random() * 5}s`;
            themeElementsContainer.appendChild(ray);
        }
    }
    
    function createPlanetOrbits() {
        if (!themeElementsContainer) return;
        
        // 创建太阳
        const sun = document.createElement('div');
        sun.className = 'space-sun';
        themeElementsContainer.appendChild(sun);
        
        // 创建更复杂的轨道系统
        const orbitCount = 5;
        const orbitColors = [
            'rgba(0, 150, 255, 0.3)',
            'rgba(255, 150, 0, 0.3)',
            'rgba(150, 255, 0, 0.3)',
            'rgba(255, 0, 150, 0.3)',
            'rgba(150, 0, 255, 0.3)'
        ];
        
        for (let i = 1; i <= orbitCount; i++) {
            const orbit = document.createElement('div');
            orbit.className = `planet-orbit orbit-${i}`;
            orbit.style.borderColor = orbitColors[i % orbitColors.length];
            orbit.style.animationDuration = `${60 + i * 20}s`;
            orbit.style.transform = `rotate(${i * 15}deg)`;
            themeElementsContainer.appendChild(orbit);
            
            // 创建行星
            const planet = document.createElement('div');
            planet.className = `planet planet-${i}`;
            
            // 为不同轨道的行星设置不同大小
            planet.style.width = `${10 + i * 5}px`;
            planet.style.height = `${10 + i * 5}px`;
            
            // 添加行星动画
            planet.style.animationDuration = `${10 + i * 5}s`;
            planet.style.animationDelay = `${Math.random() * 2}s`;
            
            orbit.appendChild(planet);
            
            // 为某些行星添加卫星
            if (i === 2 || i === 4) {
                const moonCount = i === 2 ? 1 : 2;
                for (let j = 0; j < moonCount; j++) {
                    const moon = document.createElement('div');
                    moon.className = `moon moon-${j + 1}`;
                    moon.style.animationDelay = `${Math.random() * 2}s`;
                    planet.appendChild(moon);
                }
            }
        }
        
        // 添加交互式星空效果
        addInteractiveStars();
    }
    
    // 添加交互式星空效果
    function addInteractiveStars() {
        const handleStarMouseMove = (e) => {
            const stars = document.querySelectorAll('.space-tech-star');
            stars.forEach(star => {
                const rect = star.getBoundingClientRect();
                const distance = Math.sqrt(
                    Math.pow(e.clientX - (rect.left + rect.width/2), 2) + 
                    Math.pow(e.clientY - (rect.top + rect.height/2), 2)
                );
                
                // 鼠标附近的星星闪烁
                if (distance < 80) {
                    star.style.animationDuration = '0.5s';
                    star.style.opacity = 1;
                    star.style.transform = 'scale(1.5)';
                } else {
                    star.style.animationDuration = `${1 + Math.random() * 4}s`;
                    star.style.opacity = 0.3 + Math.random() * 0.7;
                    star.style.transform = 'scale(1)';
                }
            });
        };
        
        if (!document.hasStarMouseListener) {
            document.addEventListener('mousemove', handleStarMouseMove);
            document.hasStarMouseListener = true;
        }
    }
    

    
    // 尝试播放背景音乐 - 根据星期几加载对应的主题音乐
    function initBackgroundMusic() {
        if (!backgroundMusic) return;
        
        // 获取当前日期
        const today = new Date();
        
        // 正常工作日音乐
        const dayOfWeek = today.getDay();
        // 注意：周二的音乐文件名是Tuseday.mp3（拼写错误）
        const dayNames = ['Sunday', 'Monday', 'Tuseday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayName = dayNames[dayOfWeek];
        const musicPath = `music/${dayName}.mp3`;
        // 显示给用户时使用正确的星期几名称
        const displayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const musicName = displayNames[dayOfWeek];
        
        // 添加错误处理事件监听器
        backgroundMusic.onerror = function(error) {
            console.log(`音乐文件加载失败: ${musicPath}`, error);
            // 可以在这里添加回退逻辑或完全跳过音频
            backgroundMusic.pause();
            backgroundMusic.src = ''; // 清除错误的源
        };
        
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
                backgroundMusic.volume = 0.3; // 降低音量为30%以避免过大声音
                
                // 监听loadedmetadata事件确保音频可以播放
                backgroundMusic.onloadedmetadata = function() {
                    backgroundMusic.play().catch(error => {
                        console.log('音乐播放需要用户交互或文件不存在:', error);
                    });
                };
                
                // 如果音频已经加载完成，直接尝试播放
                if (backgroundMusic.readyState >= 1) {
                    backgroundMusic.play().catch(error => {
                        console.log('音乐播放需要用户交互或文件不存在:', error);
                    });
                }
                
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
        
        // 页面可见性变化时暂停/恢复动画和音乐
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
                // 恢复粒子生成（如果当前主题是周一）
                const currentTheme = body.className;
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
