// 复制相关函数的实现
function isNationalDay(date) {
    const month = date.getMonth() + 1; // 月份从0开始
    const day = date.getDate();
    return month === 10 && day >= 1 && day <= 7;
}

// 模拟setThemeByDay函数的逻辑
simulation = {
    currentTheme: '',
    setDailyTheme: function() {
        const today = new Date();
        const isNational = isNationalDay(today);
        
        if (isNational) {
            this.currentTheme = 'theme-nationalday';
            console.log('国庆节期间，设置国庆主题');
        } else {
            const dayOfWeek = today.getDay();
            this.setThemeByDay(dayOfWeek);
        }
    },
    setThemeByDay: function(dayOfWeek) {
        const dayThemes = [
            'theme-sunday',    // 周日 - 宇宙星云风格
            'theme-monday',    // 周一 - 星空粒子风格
            'theme-tuesday',   // 周二 - 几何图形风格
            'theme-wednesday', // 周三 - 波浪动态风格
            'theme-thursday',  // 周四 - 温暖光斑风格
            'theme-friday',    // 周五 - 霓虹灯效果
            'theme-saturday'   // 周六 - 自然风景风格
        ];
        const dayNames = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
        
        this.currentTheme = dayThemes[dayOfWeek];
        console.log(`非国庆节期间，今天是${dayNames[dayOfWeek]}，设置${dayThemes[dayOfWeek]}主题`);
    }
};

// 运行测试
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const day = today.getDate();
const dayOfWeek = today.getDay();
const dayNames = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

console.log(`当前日期：${year}-${month}-${day} ${dayNames[dayOfWeek]}`);
console.log(`isNationalDay返回值：${isNationalDay(today)}`);

simulation.setDailyTheme();
console.log(`应该显示的主题：${simulation.currentTheme}`);

// 模拟日期变化测试
console.log('\n=== 模拟日期变化测试 ===');

// 模拟10月1日（国庆节）
const nationalDay = new Date(year, 9, 1); // 月份从0开始
console.log(`模拟10月1日：isNationalDay返回值=${isNationalDay(nationalDay)}`);

// 模拟10月8日（国庆节后）
const postNationalDay = new Date(year, 9, 8);
console.log(`模拟10月8日：isNationalDay返回值=${isNationalDay(postNationalDay)}`);