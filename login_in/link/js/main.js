// 生成随机渐变函数
function getRandomGradient() {
  const colors = [
    '#2dd4bf', '#22c55e', '#60a5fa', '#38bdf8', '#fbbf24',
    '#a3e635', '#34d399', '#93c5fd', '#fde68a', '#5eead4'
  ];
  
  // 随机选择两种颜色
  const color1 = colors[Math.floor(Math.random() * colors.length)];
  const color2 = colors[Math.floor(Math.random() * colors.length)];
  
  // 随机选择渐变方向
  const directions = ['to right', 'to left', 'to top', 'to bottom', 
                     'to top right', 'to top left', 'to bottom right', 'to bottom left'];
  const direction = directions[Math.floor(Math.random() * directions.length)];
  
  return `linear-gradient(${direction}, ${color1}, ${color2})`;
}

// 为教育卡片设置随机渐变
function setupEducationCardGradients() {
  const educationCards = document.querySelectorAll('.education-card');
  educationCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const gradient = getRandomGradient();
      card.style.setProperty('--random-gradient', gradient);
    });
  });
}

// 页面加载完成后隐藏加载动画
window.addEventListener('load', function() {
  setupEducationCardGradients();
  setTimeout(function() {
    const loader = document.querySelector('.loader');
    if (loader) {
      loader.style.opacity = '0';
      loader.style.visibility = 'hidden';
    }
    
    // 显示页面内容
    const container = document.querySelector('.container');
    if (container) {
      container.style.opacity = '1';
    }
  }, 1500); // 1.5秒后隐藏加载动画
});

// 颜色切换功能
document.addEventListener('DOMContentLoaded', function() {
  // 颜色面板切换
  const colorToggle = document.querySelector('.color-toggle');
  const colorControls = document.querySelector('.color-controls');
  
  if (colorToggle && colorControls) {
    colorToggle.addEventListener('click', function() {
      colorControls.classList.toggle('active');
    });
  }

  // 颜色选择器
  const titleColorPicker = document.getElementById('title-color');
  const textColorPicker = document.getElementById('text-color');
  const bgColorPicker = document.getElementById('bg-color');
  const accentColorPicker = document.getElementById('accent-color');

  // 监听颜色选择器变化
  if (titleColorPicker) {
    titleColorPicker.addEventListener('input', function() {
      document.documentElement.style.setProperty('--title-color', this.value);
      document.querySelectorAll('section h2 i, .color-toggle i').forEach(icon => {
        icon.style.color = this.value;
      });
    });
  }

  if (textColorPicker) {
    textColorPicker.addEventListener('input', function() {
      document.documentElement.style.setProperty('--text-color', this.value);
    });
  }

  if (bgColorPicker) {
    bgColorPicker.addEventListener('input', function() {
      document.documentElement.style.setProperty('--primary-color', this.value);
    });
  }

  if (accentColorPicker) {
    accentColorPicker.addEventListener('input', function() {
      document.documentElement.style.setProperty('--accent-color', this.value);
    });
  }

  // 粒子效果初始化
  if (document.getElementById('particles-js') && typeof window.particlesJS === 'function') {
    particlesJS('particles-js', {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#2dd4bf" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: "#2dd4bf", opacity: 0.35, width: 1 },
        move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out" }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "repulse" },
          onclick: { enable: true, mode: "push" }
        }
      }
    });
  }
  
  // 初始化页面内容为透明
  const container = document.querySelector('.container');
  if (container) {
    container.style.opacity = '0';
    container.style.transition = 'opacity 0.5s ease';
  }

  // 鼠标移动背景色变化效果
  const sections = document.querySelectorAll('section');
  document.addEventListener('mousemove', (e) => {
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.sqrt(
        Math.pow(e.clientX - centerX, 2) + 
        Math.pow(e.clientY - centerY, 2)
      );
      
      // 根据距离计算透明度 (0.15-0.3范围)
      const maxDistance = Math.max(window.innerWidth, window.innerHeight) / 2;
      const opacity = 0.15 + (0.15 * (1 - Math.min(distance / maxDistance, 1)));
      
      section.style.setProperty('--glass-bg', `rgba(255, 255, 255, ${opacity})`);
    });
  });
});
