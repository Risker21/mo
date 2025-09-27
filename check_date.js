// 复制isNationalDay函数的实现
function isNationalDay(date) {
    const month = date.getMonth() + 1; // 月份从0开始
    const day = date.getDate();
    return month === 10 && day >= 1 && day <= 7;
}

// 获取当前日期
const today = new Date();
const month = today.getMonth() + 1;
const day = today.getDate();
const dayOfWeek = today.getDay();
const dayNames = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

// 检查是否是国庆节期间
const isNational = isNationalDay(today);

// 输出结果
console.log(`今天是：${today.getFullYear()}-${month}-${day} ${dayNames[dayOfWeek]}`);
console.log(`是否是国庆节期间：${isNational}`);
console.log(`isNationalDay函数返回值：${isNational}`);