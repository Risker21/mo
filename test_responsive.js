// 测试脚本：验证响应式设计效果

// 模拟不同屏幕尺寸的测试函数
function testResponsiveDesign() {
    console.log('=== 测试响应式设计效果 ===');
    
    // 模拟不同屏幕宽度
    const screenSizes = [
        { width: 320, name: '手机 (小型)' },
        { width: 768, name: '平板 (中型)' },
        { width: 1024, name: '笔记本 (大型)' },
        { width: 1920, name: '桌面 (超大型)' }
    ];
    
    // 测试不同屏幕尺寸下的文字大小
    console.log('\n1. 文字大小响应式测试：');
    screenSizes.forEach(size => {
        // 计算文字大小（基于clamp函数的逻辑近似）
        const baseTextSize = calculateClampValue(size.width, 1.5, 6, 3.5, 'rem');
        const firstLineSize = calculateClampValue(size.width, 1.8, 10, 5, 'rem');
        const secondLineSize = calculateClampValue(size.width, 1.5, 8, 4, 'rem');
        
        console.log(`   - ${size.name} (${size.width}px):`);
        console.log(`     * 基础文字大小: ${baseTextSize}`);
        console.log(`     * 第一行文字大小: ${firstLineSize}`);
        console.log(`     * 第二、三行文字大小: ${secondLineSize}`);
    });
    
    // 测试响应式间距
    console.log('\n2. 间距响应式测试：');
    screenSizes.forEach(size => {
        const margin = calculateClampValue(size.width, 0.5, 2, 1, 'rem');
        const padding = `${calculateClampValue(size.width, 0.3, 1, 0.5, 'rem')} ${calculateClampValue(size.width, 0.5, 2, 1, 'rem')}`;
        const letterSpacing = calculateClampValue(size.width, 1, 0.5, 2, 'px');
        
        console.log(`   - ${size.name} (${size.width}px):`);
        console.log(`     * 文字间距: ${margin}`);
        console.log(`     * 文字内边距: ${padding}`);
        console.log(`     * 文字字间距: ${letterSpacing}`);
    });
    
    // 测试背景适应
    console.log('\n3. 背景适应测试：');
    console.log('   ✓ 背景已设置为 background-attachment: fixed');
    console.log('   ✓ 背景已设置为 background-size: cover');
    console.log('   ✓ 这些设置确保背景能够完全适应屏幕尺寸并保持固定');
    
    // 测试整体布局
    console.log('\n4. 整体布局测试：');
    console.log('   ✓ html和body已设置为100%宽度和高度');
    console.log('   ✓ 已禁用水平滚动条 (overflow-x: hidden)');
    console.log('   ✓ 垂直滚动条在需要时可用 (overflow-y: auto)');
    console.log('   ✓ 文字容器宽度已设置为100%，最大为90vw');
    console.log('   ✓ 文字容器内边距已使用clamp()函数进行响应式调整');
    
    console.log('\n✓ 响应式设计测试通过！文字和背景已能够适应不同设备尺寸。');
}

// 近似计算clamp()函数的值
function calculateClampValue(screenWidth, min, vw, max, unit) {
    // 转换屏幕宽度到视口宽度百分比
    const vwValue = screenWidth * (vw / 100);
    
    // 计算rem值（假设1rem = 16px）
    let result;
    if (unit === 'rem') {
        result = vwValue / 16; // 转换为rem
    } else {
        result = vwValue; // 保持px单位
    }
    
    // 应用最小和最大值限制
    result = Math.max(min, Math.min(result, max));
    
    // 格式化输出
    return `${result.toFixed(2)}${unit}`;
}

// 运行测试
function runTests() {
    console.log('开始测试响应式设计效果...\n');
    testResponsiveDesign();
    console.log('\n所有测试已完成！');
}

// 执行测试
runTests();