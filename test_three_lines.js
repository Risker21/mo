// 测试文字三行显示功能

// 模拟isNationalDay函数
function isNationalDay(date) {
    const month = date.getMonth() + 1; // 月份从0开始
    const day = date.getDate();
    return month === 10 && day >= 1 && day <= 7;
}

// 测试日常文字三行显示
function testDailyThreeLinesText() {
    console.log('测试日常文字三行显示：');
    console.log('第一行：未来');
    console.log('第二行：不是我们要去的地方');
    console.log('第三行：而是我们正在创造的地方');
}

// 测试国庆节文字显示
function testNationalDayText() {
    console.log('测试国庆节文字显示：');
    console.log('第一行：祖国母亲');
    console.log('第二行：生日快乐');
    console.log('第三行：(留空)');
}

// 测试当前日期
const today = new Date();
console.log(`当前日期: ${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`);
console.log(`是否为国庆节期间: ${isNationalDay(today)}`);

if (isNationalDay(today)) {
    testNationalDayText();
} else {
    testDailyThreeLinesText();
}

// 模拟测试国庆节期间
console.log('\n--- 模拟测试国庆节期间（10月1日）---');
const nationalDay = new Date(today.getFullYear(), 9, 1); // 10月1日
console.log(`日期: ${nationalDay.getFullYear()}-${nationalDay.getMonth() + 1}-${nationalDay.getDate()}`);
console.log(`是否为国庆节期间: ${isNationalDay(nationalDay)}`);
if (isNationalDay(nationalDay)) {
    console.log('国庆节文字应显示：');
    console.log('第一行：祖国母亲');
    console.log('第二行：生日快乐');
    console.log('第三行：(留空)');
}

// 模拟测试非国庆节期间
console.log('\n--- 模拟测试非国庆节期间（9月1日）---');
const nonNationalDay = new Date(today.getFullYear(), 8, 1); // 9月1日
console.log(`日期: ${nonNationalDay.getFullYear()}-${nonNationalDay.getMonth() + 1}-${nonNationalDay.getDate()}`);
console.log(`是否为国庆节期间: ${isNationalDay(nonNationalDay)}`);
if (!isNationalDay(nonNationalDay)) {
    console.log('日常文字应显示：');
    console.log('第一行：未来');
    console.log('第二行：不是我们要去的地方');
    console.log('第三行：而是我们正在创造的地方');
}

console.log('\n测试完成！请在浏览器中访问http://localhost:4173查看实际效果。');