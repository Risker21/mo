// 默认的温暖文字内容
const defaultMessages = [
    "你已经做得很好了", "未来可期", "你是独一无二的", "今天也要加油呀",
    "坚持就是胜利", "别忘了为自己骄傲", "小小的进步也是进步", "相信自己，你可以的",
    "保持积极的心态", "你今天真好看！", "一切都会好起来的", "慢慢来，一切都来得及",
    "生活也在偷偷犒劳温柔的人", "你值得所有的美好", "阳光总在风雨后",
    "你一定可以成为更好的自己", "别怕慢，只怕停", "心怀浪漫宇宙，脚踏实地生活",
    "此刻的努力，都是为了更好的未来", "累了就休息一下没关系", "你的笑容真治愈",
    "世界很大，也会有属于你的温柔", "你正在悄悄变优秀", "所有的坚持都不会被辜负",
    "相信生活会慢慢变甜", "认真生活的你，闪闪发光", "每一天都是新的开始",
    "遇见美好的事情吧！", "你值得被温柔以待", "别急，好事正在路上",
    "如果运气不好那就试试勇气", "太担心未来会看不清脚下的路", "前路漫漫，星光灿烂", "风雨过后总会天晴",
    "愿你眼里有光，心中有爱", "无论怎样，你都值得幸福"
];

// 存储自定义消息的数组
let customMessages = [];
const MAX_CUSTOM_MESSAGES = 20;
const MAX_POPUPS = 300;
const popupElements = [];
let isPopupRainActive = false;

// DOM元素
const startButton = document.getElementById('startButton');
const customInput = document.getElementById('customInput');
const addButton = document.getElementById('addButton');
const customList = document.getElementById('customList');
const backgroundMusic = document.getElementById('backgroundMusic');

// 音乐状态
let isMusicPlaying = false;

// 初始化
function init() {
    // 设置初始背景图片
    document.body.style.backgroundImage = 'url("image/background.jpg")';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
    
    // 事件监听
    startButton.addEventListener('click', startPopupRain);
    addButton.addEventListener('click', addCustomMessage);
    customInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addCustomMessage();
        }
    });
    
    // 创建音乐控制按钮
    createMusicControlButton();
    
    // 检查是否可以添加更多自定义消息
    updateAddButtonState();
}

// 添加自定义消息
function addCustomMessage() {
    const message = customInput.value.trim();
    
    if (message && customMessages.length < MAX_CUSTOM_MESSAGES) {
        customMessages.push(message);
        renderCustomList();
        customInput.value = '';
        updateAddButtonState();
    }
}

// 移除自定义消息
function removeCustomMessage(index) {
    customMessages.splice(index, 1);
    renderCustomList();
    updateAddButtonState();
}

// 渲染自定义消息列表
function renderCustomList() {
    customList.innerHTML = '';
    
    customMessages.forEach((message, index) => {
        const item = document.createElement('div');
        item.className = 'custom-item';
        
        const textSpan = document.createElement('span');
        textSpan.className = 'custom-text';
        textSpan.textContent = message;
        
        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-btn';
        removeBtn.textContent = '删除';
        removeBtn.addEventListener('click', () => removeCustomMessage(index));
        
        item.appendChild(textSpan);
        item.appendChild(removeBtn);
        customList.appendChild(item);
    });
}

// 更新添加按钮状态
function updateAddButtonState() {
    addButton.disabled = customMessages.length >= MAX_CUSTOM_MESSAGES;
}

// 创建关闭按钮
function createCloseButton() {
    const closeButton = document.createElement('button');
    closeButton.id = 'closeButton';
    closeButton.innerHTML = '⛔ 关闭弹窗雨';
    closeButton.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1001;
        background-color: #ff4d4d;
        color: white;
        border: none;
        padding: 12px 20px;
        font-size: 16px;
        font-weight: bold;
        border-radius: 25px;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(255, 77, 77, 0.3);
        transition: all 0.3s ease;
    `;
    
    closeButton.addEventListener('mouseenter', () => {
        closeButton.style.backgroundColor = '#ff3333';
        closeButton.style.transform = 'translateY(-2px)';
    });
    
    closeButton.addEventListener('mouseleave', () => {
        closeButton.style.backgroundColor = '#ff4d4d';
        closeButton.style.transform = 'translateY(0)';
    });
    
    closeButton.addEventListener('click', stopPopupRain);
    document.body.appendChild(closeButton);
}

// 创建音乐控制按钮
function createMusicControlButton() {
    const musicButton = document.createElement('button');
    musicButton.id = 'musicButton';
    musicButton.innerHTML = '🎶 播放音乐';
    musicButton.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 10px 15px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 25px;
        cursor: pointer;
        font-size: 14px;
        font-weight: bold;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    musicButton.addEventListener('mouseenter', () => {
        musicButton.style.transform = 'translateY(-2px)';
        musicButton.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
    });
    
    musicButton.addEventListener('mouseleave', () => {
        musicButton.style.transform = 'translateY(0)';
        musicButton.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
    });
    
    musicButton.addEventListener('click', toggleMusic);
    
    document.body.appendChild(musicButton);
}

// 切换音乐播放状态
function toggleMusic() {
    const musicButton = document.getElementById('musicButton');
    
    if (!isMusicPlaying) {
        // 播放音乐
        backgroundMusic.play().then(() => {
            isMusicPlaying = true;
            musicButton.innerHTML = '⏸️ 暂停音乐';
            musicButton.style.background = 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)';
        }).catch(error => {
            console.error('播放音乐失败:', error);
            musicButton.innerHTML = '❌ 播放失败';
            musicButton.style.background = 'linear-gradient(135deg, #95a5a6 0%, #7f8c8d 100%)';
        });
    } else {
        // 暂停音乐
        backgroundMusic.pause();
        isMusicPlaying = false;
        musicButton.innerHTML = '🎶 播放音乐';
        musicButton.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }
}

// 停止弹窗雨
function stopPopupRain() {
    if (!isPopupRainActive) return;
    
    isPopupRainActive = false;
    
    // 清除弹窗生成间隔
    if (window.popupInterval) {
        clearInterval(window.popupInterval);
    }
    
    // 移除所有弹窗
    popupElements.forEach(popup => {
        if (document.body.contains(popup)) {
            document.body.removeChild(popup);
        }
    });
    popupElements.length = 0;
    
    // 移除关闭按钮
    const closeButton = document.getElementById('closeButton');
    if (closeButton) {
        document.body.removeChild(closeButton);
    }
    
    // 恢复初始背景图片（保持背景图片显示）
    document.body.style.backgroundImage = 'url("image/background.jpg")';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
    
    // 显示主界面
    document.querySelector('.container').style.display = 'block';
}

// 开始弹窗雨
function startPopupRain() {
    if (isPopupRainActive) return;
    
    isPopupRainActive = true;
    
    // 隐藏主界面
    document.querySelector('.container').style.display = 'none';
    
    // 创建关闭按钮
    createCloseButton();
    
    // 设置弹窗雨背景图片（保持与初始页面一致）
    document.body.style.backgroundImage = 'url("image/background.jpg")';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
    
    // 如果用户使用了自定义内容，则只显示自定义内容；否则显示默认内容
    const allMessages = customMessages.length > 0 ? customMessages : defaultMessages;
    
    // 开始生成弹窗
    const popupInterval = setInterval(() => {
        if (popupElements.length < MAX_POPUPS) {
            createPopup(allMessages);
        }
    }, 100);
    
    // 存储间隔ID以便关闭时清除
    window.popupInterval = popupInterval;
}

// 创建单个弹窗
function createPopup(messages) {
    const popup = document.createElement('div');
    popup.className = 'popup';
    
    // 设置随机位置
    const popupWidth = 380;
    const popupHeight = 100;
    const x = Math.random() * (window.innerWidth - popupWidth);
    const y = Math.random() * (window.innerHeight - popupHeight);
    
    popup.style.left = `${x}px`;
    popup.style.top = `${y}px`;
    popup.style.width = `${popupWidth}px`;
    popup.style.height = `${popupHeight}px`;
    
    // 设置随机背景色
    const startColor = randomColor();
    popup.style.backgroundColor = startColor;
    
    // 设置随机消息
    const message = messages[Math.floor(Math.random() * messages.length)];
    popup.textContent = message;
    
    // 添加到页面
    document.body.appendChild(popup);
    popupElements.push(popup);
    
    // 开始颜色渐变动画
    startColorAnimation(popup);
    
    // 设置定时器，移除旧弹窗（可选功能）
    setTimeout(() => {
        if (document.body.contains(popup)) {
            document.body.removeChild(popup);
            const index = popupElements.indexOf(popup);
            if (index > -1) {
                popupElements.splice(index, 1);
            }
        }
    }, 30000); // 30秒后移除
}

// 颜色渐变动画
function startColorAnimation(element) {
    let currentColor = element.style.backgroundColor;
    
    function animateColor() {
        if (!document.body.contains(element)) return;
        
        const targetColor = randomColor();
        const duration = 2400; // 40步 * 60ms
        const steps = 40;
        const stepDuration = duration / steps;
        let step = 0;
        
        function updateColor() {
            if (!document.body.contains(element)) return;
            
            step++;
            const ratio = step / steps;
            const newColor = blendColors(currentColor, targetColor, ratio);
            element.style.backgroundColor = newColor;
            
            if (step < steps) {
                setTimeout(updateColor, stepDuration);
            } else {
                currentColor = targetColor;
                // 开始下一次渐变
                setTimeout(animateColor, 0);
            }
        }
        
        updateColor();
    }
    
    animateColor();
}

// 生成随机颜色（增加对比度）
function randomColor() {
    const hue = Math.random();
    // 增加饱和度范围：0.6-1.0，使颜色更鲜艳
    const saturation = 0.6 + Math.random() * 0.4;
    // 调整亮度范围：0.5-0.8，避免过亮导致文字看不清
    const brightness = 0.5 + Math.random() * 0.3;
    
    // HSL转RGB
    return hslToRgb(hue, saturation, brightness);
}

// HSL到RGB的转换
function hslToRgb(h, s, l) {
    let r, g, b;
    
    if (s === 0) {
        r = g = b = l; // 灰度
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };
        
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }
    
    return `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`;
}

// 混合两种颜色
function blendColors(color1, color2, ratio) {
    // 提取RGB值
    const rgb1 = color1.match(/\d+/g).map(Number);
    const rgb2 = color2.match(/\d+/g).map(Number);
    
    // 混合颜色
    const r = Math.round(rgb1[0] * (1 - ratio) + rgb2[0] * ratio);
    const g = Math.round(rgb1[1] * (1 - ratio) + rgb2[1] * ratio);
    const b = Math.round(rgb1[2] * (1 - ratio) + rgb2[2] * ratio);
    
    return `rgb(${r}, ${g}, ${b})`;
}

// 当页面加载完成时初始化
window.addEventListener('DOMContentLoaded', init);
