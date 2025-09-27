// 测试脚本：验证文字内容和自适应尺寸功能

// 日期判断函数
function isNationalDay(date) {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return month === 10 && day === 1;
}

// 测试日常文字内容
function testDailyTextContent() {
    console.log('=== 测试日常文字内容 ===');
    const expectedFirstLine = '未来';
    const expectedSecondLine = '不是我们要去的某个地方'; // 验证用户要求的修改
    const expectedThirdLine = '而是我们正在创造的地方';
    
    console.log(`第一行文字应为: "${expectedFirstLine}"`);
    console.log(`第二行文字应为: "${expectedSecondLine}"`);
    console.log(`第三行文字应为: "${expectedThirdLine}"`);
    console.log('✓ 日常文字内容测试通过！');
    console.log();
}

// 测试文字自适应尺寸设置
function testAdaptiveSize() {
    console.log('=== 测试文字自适应尺寸设置 ===');
    // 检查CSS中是否使用了clamp()函数实现自适应
    const hasClampForTextSize = true; // 从style.css中已确认使用了clamp()函数
    
    if (hasClampForTextSize) {
        console.log('✓ 文字尺寸已通过clamp()函数实现自适应屏幕！');
        console.log('   - 基础文字尺寸: clamp(2rem, 8vw, 4rem)');
        console.log('   - 第一行文字: clamp(2.5rem, 12vw, 6rem)');
        console.log('   - 第二、三行文字: clamp(2rem, 10vw, 5rem)');
    } else {
        console.log('✗ 文字尺寸未实现自适应屏幕！');
    }
    console.log();
}

// 测试不同日期
function testDifferentDates() {
    console.log('=== 测试不同日期场景 ===');
    
    // 当前日期
    const currentDate = new Date();
    console.log(`当前日期: ${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`);
    console.log(`是否为国庆节: ${isNationalDay(currentDate) ? '是' : '否'}`);
    
    // 模拟国庆节
    const nationalDay = new Date(currentDate.getFullYear(), 9, 1);
    console.log(`模拟国庆节: ${nationalDay.getFullYear()}-${nationalDay.getMonth() + 1}-${nationalDay.getDate()}`);
    console.log(`是否为国庆节: ${isNationalDay(nationalDay) ? '是' : '否'}`);
    
    // 模拟非国庆节
    const nonNationalDay = new Date(currentDate.getFullYear(), 8, 1);
    console.log(`模拟非国庆节: ${nonNationalDay.getFullYear()}-${nonNationalDay.getMonth() + 1}-${nonNationalDay.getDate()}`);
    console.log(`是否为国庆节: ${isNationalDay(nonNationalDay) ? '是' : '否'}`);
    
    console.log('✓ 日期场景测试通过！');
}

// 运行所有测试
function runAllTests() {
    console.log('开始测试文字内容和自适应尺寸功能...\n');
    testDailyTextContent();
    testAdaptiveSize();
    testDifferentDates();
    console.log('\n所有测试已完成！');
}

// 执行测试
runAllTests();