// 测试文字内容根据主题动态切换

// 模拟isNationalDay函数
function isNationalDay(date) {
    const month = date.getMonth() + 1; // 月份从0开始
    const day = date.getDate();
    return month === 10 && day >= 1 && day <= 7;
}

// 模拟setNationalDayTheme函数的文字设置逻辑
function testNationalDayText() {
    console.log('测试国庆节文字内容：');
    console.log('应该显示：祖国母亲 生日快乐');
}

// 模拟setThemeByDay函数的文字设置逻辑
function testDailyText() {
    console.log('测试日常文字内容：');
    console.log('应该显示：未来，不是我们要去的地方 而是我们正在创造的地方');
}

// 测试当前日期
const today = new Date();
console.log(`当前日期: ${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`);
console.log(`是否为国庆节期间: ${isNationalDay(today)}`);

if (isNationalDay(today)) {
    testNationalDayText();
} else {
    testDailyText();
}

// 模拟测试国庆节期间
console.log('\n--- 模拟测试国庆节期间（10月1日）---');
const nationalDay = new Date(today.getFullYear(), 9, 1); // 10月1日
console.log(`日期: ${nationalDay.getFullYear()}-${nationalDay.getMonth() + 1}-${nationalDay.getDate()}`);
console.log(`是否为国庆节期间: ${isNationalDay(nationalDay)}`);
if (isNationalDay(nationalDay)) {
    console.log('应该显示：祖国母亲 生日快乐');
}

// 模拟测试非国庆节期间
console.log('\n--- 模拟测试非国庆节期间（9月1日）---');
const nonNationalDay = new Date(today.getFullYear(), 8, 1); // 9月1日
console.log(`日期: ${nonNationalDay.getFullYear()}-${nonNationalDay.getMonth() + 1}-${nonNationalDay.getDate()}`);
console.log(`是否为国庆节期间: ${isNationalDay(nonNationalDay)}`);
if (!isNationalDay(nonNationalDay)) {
    console.log('应该显示：未来，不是我们要去的地方 而是我们正在创造的地方');
}

console.log('\n测试完成！请在浏览器中访问http://localhost:4173查看实际效果。');