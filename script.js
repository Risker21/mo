document.addEventListener('DOMContentLoaded', function() {
    // 性能优化：缓存DOM元素
    const domElements = {
        quoteLines: document.querySelectorAll('.quote-line'),
        halo: document.getElementById('halo'),
        particles: document.getElementById('particles'),
        stars: document.getElementById('stars'),
        body: document.body
    };
    
    // 主题颜色设置
    const themes = {
        default: {
            primary: '#8080ff',
            secondary: '#ff8080',
            accent: '#80ff80',
            bg1: '#050510',
            bg2: '#101020',
            bg3: '#0a1530'
        },
        cyberpunk: {
            primary: '#00ff00',
            secondary: '#ff00ff',
            accent: '#ffff00',
            bg1: '#000000',
            bg2: '#1a001a',
            bg3: '#001a1a'
        },
        ocean: {
            primary: '#00bfff',
            secondary: '#4169e1',
            accent: '#87ceeb',
            bg1: '#000033',
            bg2: '#000066',
            bg3: '#003366'
        }
    };
    
    let currentTheme = 'default';
    let isAnimating = true;
    
    // 显示文字动画
    setTimeout(function() {
        domElements.quoteLines.forEach((line, index) => {
            // 交错动画效果
            setTimeout(() => {
                line.classList.add('visible');
            }, index * 400);
        });
    }, 500);
    
    // 创建粒子效果
    createParticles();
    
    // 添加星空背景
    createStars();
    
    // 处理背景音乐
    const backgroundMusic = document.getElementById('backgroundMusic');
    
    // 尝试自动播放背景音乐（可能受浏览器策略限制）
    function tryPlayMusic() {
        if (backgroundMusic) {
            backgroundMusic.volume = 0.3; // 设置音量为30%
            backgroundMusic.play().catch(error => {
                console.log('自动播放失败，等待用户交互:', error);
            });
        }
    }
    
    // 立即尝试播放
    tryPlayMusic();
    
    // 添加用户交互事件以触发播放
    document.addEventListener('click', tryPlayMusic, { once: true });
    document.addEventListener('keydown', tryPlayMusic, { once: true });
    document.addEventListener('touchstart', tryPlayMusic, { once: true });
    
    // 添加鼠标光晕效果
    document.addEventListener('mousemove', throttle(function(e) {
        if (isAnimating) {
            domElements.halo.style.left = `${e.clientX - 200}px`;
            domElements.halo.style.top = `${e.clientY - 200}px`;
        }
    }, 16)); // 约60fps
    
    // 添加更多的发光圆圈
    createMoreGlowCircles();
    
    // 添加点击波纹效果
    document.addEventListener('click', function(e) {
        createRipple(e.clientX, e.clientY);
        // 点击时切换主题
        if (e.target === domElements.body || 
            e.target.classList.contains('grid-background') || 
            e.target.classList.contains('stars')) {
            cycleTheme();
        }
    });
    
    // 添加视差效果
    document.addEventListener('mousemove', throttle(function(e) {
        if (isAnimating) {
            const x = e.clientX / window.innerWidth - 0.5;
            const y = e.clientY / window.innerHeight - 0.5;
            applyParallax(x, y);
        }
    }, 16));
    
    // 添加粒子轨迹效果
    createParticleTrails();
    
    // 添加动态光束效果
    createBeams();
    
    // 添加文字悬停交互
    addTextHoverEffects();
    
    // 添加主题切换功能
    function cycleTheme() {
        const themeKeys = Object.keys(themes);
        const currentIndex = themeKeys.indexOf(currentTheme);
        const nextIndex = (currentIndex + 1) % themeKeys.length;
        currentTheme = themeKeys[nextIndex];
        applyTheme(currentTheme);
    }
    
    // 应用主题
    function applyTheme(themeName) {
        const theme = themes[themeName];
        const root = document.documentElement;
        
        // 平滑过渡背景色
        root.style.setProperty('--primary-color', theme.primary);
        root.style.setProperty('--secondary-color', theme.secondary);
        root.style.setProperty('--accent-color', theme.accent);
        
        // 创建渐变背景
        domElements.body.style.background = `linear-gradient(135deg, ${theme.bg1}, ${theme.bg2}, ${theme.bg3})`;
        
        // 更新粒子颜色
        updateParticleColors(theme.primary);
    }
    
    // 更新粒子颜色
    function updateParticleColors(color) {
        const particles = document.querySelectorAll('.particle');
        particles.forEach(particle => {
            particle.style.background = color;
        });
    }
    
    // 性能优化：节流函数
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
});

// 创建粒子效果
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 150;
    const batchSize = 30;
    let createdCount = 0;
    
    // 使用requestAnimationFrame批量创建粒子，提高性能
    function createParticleBatch() {
        const batchEnd = Math.min(createdCount + batchSize, particleCount);
        
        for (let i = createdCount; i < batchEnd; i++) {
            createSingleParticle();
        }
        
        createdCount = batchEnd;
        
        if (createdCount < particleCount) {
            requestAnimationFrame(createParticleBatch);
        }
    }
    
    createParticleBatch();
}

// 创建单个粒子
function createSingleParticle() {
    const particlesContainer = document.getElementById('particles');
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // 随机大小和位置
    const size = Math.random() * 6 + 1;
    const left = Math.random() * 100;
    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * 10;
    const translateX = (Math.random() - 0.5) * 300;
    
    // 从CSS变量获取主色调
    const root = document.documentElement;
    const primaryColor = getComputedStyle(root).getPropertyValue('--primary-color').trim();
    
    // 设置样式
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${left}%`;
    particle.style.setProperty('--translate-x', `${translateX}px`);
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;
    particle.style.background = primaryColor;
    
    particlesContainer.appendChild(particle);
    
    // 动画结束后重新创建粒子
    particle.addEventListener('animationend', function() {
        particle.remove();
        createSingleParticle();
    });
}

// 创建更多发光圆圈
function createMoreGlowCircles() {
    const circleCount = 6;
    
    for (let i = 0; i < circleCount; i++) {
        const circle = document.createElement('div');
        circle.classList.add('glow-circle');
        
        // 随机大小和位置
        const size = Math.random() * 200 + 100;
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        const duration = Math.random() * 20 + 15;
        const delay = Math.random() * 5;
        
        // 从CSS变量获取颜色
        const root = document.documentElement;
        const primaryColor = getComputedStyle(root).getPropertyValue('--primary-color').trim();
        const secondaryColor = getComputedStyle(root).getPropertyValue('--secondary-color').trim();
        
        // 随机选择主色或辅助色
        const color = Math.random() > 0.5 ? primaryColor : secondaryColor;
        const opacity = Math.random() * 0.15 + 0.05;
        
        // 设置样式
        circle.style.width = `${size}px`;
        circle.style.height = `${size}px`;
        circle.style.top = `${top}%`;
        circle.style.left = `${left}%`;
        circle.style.background = `${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`;
        circle.style.animationDuration = `${duration}s`;
        circle.style.animationDelay = `${delay}s`;
        
        // 随机方向
        if (Math.random() > 0.5) {
            circle.style.animationDirection = 'reverse';
        }
        
        document.body.appendChild(circle);
    }
}

// 创建星空背景
function createStars() {
    const starsContainer = document.getElementById('stars');
    const starCount = 400;
    const batchSize = 50;
    let createdCount = 0;
    
    // 批量创建星星以提高性能
    function createStarBatch() {
        const fragment = document.createDocumentFragment();
        const batchEnd = Math.min(createdCount + batchSize, starCount);
        
        for (let i = createdCount; i < batchEnd; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            
            // 随机大小和位置
            const size = Math.random() * 2 + 1;
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const duration = Math.random() * 5 + 2;
            const delay = Math.random() * 5;
            
            // 随机亮度
            const opacity = Math.random() * 0.7 + 0.3;
            
            // 设置样式
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.left = `${left}%`;
            star.style.top = `${top}%`;
            star.style.opacity = opacity;
            star.style.setProperty('--twinkle-duration', `${duration}s`);
            star.style.animationDelay = `${delay}s`;
            
            // 根据大小设置不同的Z轴深度，增加3D效果
            const zIndex = Math.floor(size * 3);
            star.style.zIndex = zIndex;
            
            fragment.appendChild(star);
        }
        
        starsContainer.appendChild(fragment);
        createdCount = batchEnd;
        
        if (createdCount < starCount) {
            requestAnimationFrame(createStarBatch);
        }
    }
    
    createStarBatch();
}

// 创建点击波纹效果
function createRipple(x, y) {
    const ripple = document.createElement('div');
    ripple.classList.add('ripple');
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    
    // 随机大小
    const size = Math.random() * 200 + 100;
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.marginLeft = `-${size / 2}px`;
    ripple.style.marginTop = `-${size / 2}px`;
    
    // 从CSS变量获取颜色
    const root = document.documentElement;
    const accentColor = getComputedStyle(root).getPropertyValue('--accent-color').trim();
    
    // 设置渐变颜色
    const gradient = `radial-gradient(circle, ${accentColor}40 0%, transparent 70%)`;
    ripple.style.background = gradient;
    
    document.body.appendChild(ripple);
    
    // 添加动画
    setTimeout(() => {
        ripple.classList.add('ripple-animation');
    }, 10);
    
    // 动画结束后移除
    setTimeout(() => {
        ripple.remove();
    }, 1000);
}

// 应用视差效果
function applyParallax(x, y) {
    const elements = [
        { selector: '.stars', factor: 5 },
        { selector: '.grid-background', factor: 10 },
        { selector: '.light-rays', factor: 15 },
        { selector: '.particles', factor: 20 },
        { selector: '.glow-circle', factor: 25 },
        { selector: '.quote-line', factor: 8 },
        { selector: '.beam', factor: 12 }
    ];
    
    elements.forEach(({ selector, factor }) => {
        const items = document.querySelectorAll(selector);
        items.forEach(item => {
            const translateX = x * factor;
            const translateY = y * factor;
            
            // 保存原始transform值
            if (!item.dataset.originalTransform) {
                item.dataset.originalTransform = item.style.transform || 'none';
            }
            
            // 应用视差效果
            item.style.transform = `${item.dataset.originalTransform} translate(${translateX}px, ${translateY}px)`;
        });
    });
}

// 添加鼠标交互效果
let lastMouseMoveTime = 0;
const mouseMoveThrottle = 16; // 约60fps

// 使用requestAnimationFrame和距离阈值优化鼠标交互
let mousePos = { x: 0, y: 0 };

function updateMousePos(e) {
    mousePos.x = e.clientX;
    mousePos.y = e.clientY;
}

document.addEventListener('mousemove', updateMousePos);

// 每16ms更新一次粒子交互
function updateParticleInteractions() {
    requestAnimationFrame(updateParticleInteractions);
    
    const currentTime = performance.now();
    if (currentTime - lastMouseMoveTime < mouseMoveThrottle) {
        return;
    }
    lastMouseMoveTime = currentTime;
    
    const particles = document.querySelectorAll('.particle');
    
    // 限制同时更新的粒子数量，提高性能
    const maxUpdates = 30;
    const particlesToUpdate = Array.from(particles).slice(0, maxUpdates);
    
    particlesToUpdate.forEach(particle => {
        const rect = particle.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.sqrt(
            Math.pow(mousePos.x - centerX, 2) + 
            Math.pow(mousePos.y - centerY, 2)
        );
        
        // 如果粒子离鼠标很近，让它远离鼠标
        if (distance < 150) {
            const force = 150 - distance;
            const angle = Math.atan2(mousePos.y - centerY, mousePos.x - centerX);
            const moveX = Math.cos(angle + Math.PI) * force * 0.1;
            const moveY = Math.sin(angle + Math.PI) * force * 0.1;
            
            particle.style.transform = `translate(${moveX}px, ${moveY}px)`;
            particle.style.opacity = '0.8';
            particle.style.filter = 'blur(2px)';
            
            // 粒子发光效果
            const glowSize = Math.max(10, force / 5);
            const primaryColor = getComputedStyle(document.documentElement)
                .getPropertyValue('--primary-color').trim();
            particle.style.boxShadow = `0 0 ${glowSize}px ${glowSize/3}px ${primaryColor}80`;
        } else {
            // 恢复正常状态
            particle.style.transform = 'translate(0, 0)';
            particle.style.opacity = '0.5';
            particle.style.filter = 'blur(0px)';
            particle.style.boxShadow = 'none';
        }
    });
}

// 启动粒子交互更新
updateParticleInteractions();

// 创建粒子轨迹效果 - 高性能版本
function createParticleTrails() {
    let lastParticlePositions = new Map();
    let trailsActive = true;
    
    // 使用requestAnimationFrame优化性能
    function updateTrails() {
        if (!trailsActive) return;
        
        requestAnimationFrame(updateTrails);
        
        const particles = document.querySelectorAll('.particle');
        const fragment = document.createDocumentFragment();
        
        // 限制同时更新的粒子数量，提高性能
        const maxUpdates = 20;
        const particlesToUpdate = Array.from(particles).slice(0, maxUpdates);
        
        particlesToUpdate.forEach((particle, index) => {
            const rect = particle.getBoundingClientRect();
            const currentX = rect.left + rect.width / 2;
            const currentY = rect.top + rect.height / 2;
            
            // 存储上一帧的位置
            const particleId = particle.dataset.id || index;
            particle.dataset.id = particleId;
            
            if (lastParticlePositions.has(particleId)) {
                const { x, y } = lastParticlePositions.get(particleId);
                
                // 只有当粒子移动了足够距离时才创建轨迹
                const distance = Math.sqrt((currentX - x) ** 2 + (currentY - y) ** 2);
                if (distance > 3 && Math.random() < 0.5) { // 降低创建频率
                    createTrailPoint(x, y, particle.style.background, fragment);
                }
            }
            
            lastParticlePositions.set(particleId, { x: currentX, y: currentY });
        });
        
        document.body.appendChild(fragment);
        
        // 清理旧的位置数据
        if (lastParticlePositions.size > particles.length * 2) {
            lastParticlePositions.clear();
        }
    }
    
    function createTrailPoint(x, y, color, fragment) {
        const trailPoint = document.createElement('div');
        trailPoint.classList.add('particle-trail');
        trailPoint.style.left = `${x}px`;
        trailPoint.style.top = `${y}px`;
        trailPoint.style.background = color;
        trailPoint.style.opacity = '0.3';
        
        fragment.appendChild(trailPoint);
        
        // 200ms后移除轨迹点
        setTimeout(() => {
            if (trailPoint.parentNode) {
                trailPoint.parentNode.removeChild(trailPoint);
            }
        }, 200);
    }
    
    // 开始更新轨迹
    updateTrails();
}

// 创建动态光束效果
function createBeams() {
    const beamCount = 10;
    const fragment = document.createDocumentFragment();
    
    for (let i = 0; i < beamCount; i++) {
        const beam = document.createElement('div');
        beam.classList.add('beam');
        
        // 设置光束样式
        const width = Math.random() * 300 + 100;
        const height = Math.random() * 3 + 1;
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        const angle = Math.random() * 360;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        // 从CSS变量获取颜色
        const root = document.documentElement;
        const primaryColor = getComputedStyle(root).getPropertyValue('--primary-color').trim();
        const secondaryColor = getComputedStyle(root).getPropertyValue('--secondary-color').trim();
        
        // 随机选择颜色
        const color = Math.random() > 0.7 ? secondaryColor : primaryColor;
        const opacity = Math.random() * 0.1 + 0.05;
        
        // 应用样式
        beam.style.position = 'absolute';
        beam.style.width = `${width}px`;
        beam.style.height = `${height}px`;
        beam.style.top = `${top}%`;
        beam.style.left = `${left}%`;
        beam.style.background = `linear-gradient(90deg, transparent, ${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}, transparent)`;
        beam.style.transform = `rotate(${angle}deg)`;
        beam.style.transformOrigin = 'left center';
        beam.style.filter = 'blur(2px)';
        beam.style.animation = `beamGlow ${duration}s infinite ease-in-out`;
        beam.style.animationDelay = `${delay}s`;
        beam.style.zIndex = '1';
        beam.style.mixBlendMode = 'screen';
        
        fragment.appendChild(beam);
    }
    
    document.body.appendChild(fragment);
}

// 添加文字悬停交互效果
function addTextHoverEffects() {
    const quoteLines = document.querySelectorAll('.quote-line');
    
    quoteLines.forEach((line, index) => {
        line.addEventListener('mouseenter', function() {
            // 创建额外的发光效果
            const glowEffect = document.createElement('div');
            glowEffect.classList.add('text-glow');
            glowEffect.style.position = 'absolute';
            glowEffect.style.top = '50%';
            glowEffect.style.left = '50%';
            glowEffect.style.transform = 'translate(-50%, -50%)';
            glowEffect.style.width = '120%';
            glowEffect.style.height = '120%';
            
            // 从CSS变量获取颜色
            const primaryColor = getComputedStyle(document.documentElement)
                .getPropertyValue('--primary-color').trim();
            
            glowEffect.style.background = `radial-gradient(circle, ${primaryColor}40 0%, transparent 70%)`;
            glowEffect.style.zIndex = '2';
            glowEffect.style.pointerEvents = 'none';
            glowEffect.style.animation = 'pulse 2s infinite ease-in-out';
            
            // 将发光效果添加到父容器
            line.parentElement.appendChild(glowEffect);
            
            // 鼠标离开时移除
            line.addEventListener('mouseleave', function cleanup() {
                setTimeout(() => {
                    if (glowEffect.parentNode) {
                        glowEffect.parentNode.removeChild(glowEffect);
                    }
                }, 500);
                line.removeEventListener('mouseleave', cleanup);
            });
            
            // 播放额外的粒子效果
            createTextHoverParticles(line, index);
        });
    });
}

// 创建文字悬停时的粒子效果
function createTextHoverParticles(element, lineIndex) {
    const particleCount = 20;
    const rect = element.getBoundingClientRect();
    const fragment = document.createDocumentFragment();
    
    // 批量创建粒子以提高性能
    let createdCount = 0;
    const batchSize = 5;
    
    function createParticleBatch() {
        const batchEnd = Math.min(createdCount + batchSize, particleCount);
        
        for (let i = createdCount; i < batchEnd; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // 随机大小和位置
            const size = Math.random() * 4 + 2;
            const left = Math.random() * rect.width + rect.left;
            const top = rect.top;
            
            // 从CSS变量获取主题颜色
            const root = document.documentElement;
            const themeColors = [
                getComputedStyle(root).getPropertyValue('--primary-color').trim(),
                getComputedStyle(root).getPropertyValue('--secondary-color').trim(),
                getComputedStyle(root).getPropertyValue('--accent-color').trim()
            ];
            
            // 随机选择一个颜色
            const color = themeColors[Math.floor(Math.random() * themeColors.length)];
            
            // 设置样式
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${left}px`;
            particle.style.top = `${top}px`;
            particle.style.background = color;
            particle.style.position = 'fixed';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '4';
            
            fragment.appendChild(particle);
            
            // 设置动画
            const duration = Math.random() * 2 + 1;
            const angle = Math.random() * Math.PI * 2; // 随机方向
            const distance = Math.random() * 50 + 30;
            
            particle.style.transition = `all ${duration}s ease-out`;
            
            // 使用requestAnimationFrame确保DOM已更新
            requestAnimationFrame(() => {
                const finalX = left + Math.cos(angle) * distance;
                const finalY = top + Math.sin(angle) * distance;
                
                particle.style.left = `${finalX}px`;
                particle.style.top = `${finalY}px`;
                particle.style.opacity = '0';
                particle.style.transform = 'scale(0.5)';
                
                // 动画结束后移除
                setTimeout(() => {
                    if (particle.parentNode) {
                        particle.parentNode.removeChild(particle);
                    }
                }, duration * 1000);
            });
        }
        
        createdCount = batchEnd;
        
        if (createdCount < particleCount) {
            setTimeout(createParticleBatch, 50); // 延迟创建下一批
        } else {
            document.body.appendChild(fragment);
        }
    }
    
    createParticleBatch();
}

// 性能优化：节流函数
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

// 窗口大小变化时重新计算布局
window.addEventListener('resize', throttle(function() {
    // 移除所有动态创建的元素
    document.querySelectorAll('.glow-circle:not(.circle-1):not(.circle-2)').forEach(el => el.remove());
    document.querySelectorAll('.beam').forEach(el => el.remove());
    
    // 重新创建元素
    setTimeout(() => {
        createMoreGlowCircles();
        createBeams();
    }, 100);
}, 200));