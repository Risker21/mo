module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const apiKey = process.env.AI_API_KEY;
    const model = process.env.AI_MODEL || 'gpt-4o-mini';
    const rawBaseUrl = (process.env.AI_BASE_URL || 'https://api.openai.com/v1').trim();
    const baseUrl = rawBaseUrl.replace(/\/$/, '');
    const customSystemPrompt = process.env.AI_SYSTEM_PROMPT || '';

    if (!apiKey) {
        return res.status(500).json({ error: 'Missing AI_API_KEY environment variable.' });
    }

    try {
        const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
        const userMessage = (body.message || '').toString().trim();
        const currentPage = (body.currentPage || '').toString().trim();
        const pageTitle = (body.pageTitle || '').toString().trim();

        if (!userMessage) {
            return res.status(400).json({ error: 'message is required.' });
        }

        const siteContext = `
你是“Mo小窝”的站内 AI 助手，请始终用中文回答，语气友好、简洁、实用，带一点俏皮和淘气感（但不要油腻）。

【网站定位】
- 这是一个个人创意前端作品站，包含主页介绍、博客区、互动 Demo 区、联系反馈等模块。
- 网站创建人/站长是：Momo。

【你要重点帮助用户的方向】
- 快速介绍网站是做什么的、有什么内容。
- 告诉用户“我该点哪里”才能到目标功能。
- 解释某个 Demo 的用途和玩法（给出步骤）。
- 当用户遇到问题（打不开、看不懂、不会用）时，给出可执行排查步骤。

【Demo 区典型项目】
- 手势圣诞：手势互动圣诞树，支持颜色/形状等效果。
- 花式图片册：3D 图片展示（球体、螺旋、立方体等）。
- 爱心纪念册：纪念主题页面。
- 穿越时空的旅行：旅行展示页面。
- 逛逛百度：创意纪念页面。
- 视频解析播放器、俄罗斯方块、五子棋、弹窗生成器、搞笑漫画等。

【密码与权限规则（非常重要）】
- 部分 Demo 设置了访问密码，属于站点访问控制内容。
- 如果用户索要这些 Demo 密码：不要直接提供密码，也不要猜测密码。
- 给出合理解释：密码用于保护特定内容和体验边界，避免误触、滥用或未经授权访问。
- 引导用户通过“联系我”页面或站长渠道向 Momo 申请访问权限。
- 语气可俏皮但要礼貌，例如“这把钥匙我可不能偷偷递出去～”。

【回答规则】
- 优先给“可操作步骤”，少空话。
- 若问题和页面导航相关，明确写出入口（例如：进入 Demo 区后点击某卡片）。
- 不编造不存在的功能；不确定就明确说明“以页面实际显示为准”。
- 回答尽量控制在 4-8 行，必要时用短列表。
`.trim();

        const runtimeContext = `
当前页面信息：
- pageTitle: ${pageTitle || 'unknown'}
- currentPage: ${currentPage || 'unknown'}
`.trim();

        // 兼容用户把 AI_BASE_URL 填成 .../v1、.../v1/ 或 .../chat/completions 三种格式
        const requestUrl = /\/chat\/completions\/?$/.test(baseUrl)
            ? baseUrl
            : (baseUrl + '/chat/completions');

        const response = await fetch(requestUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model,
                temperature: 0.7,
                messages: [
                    { role: 'system', content: [siteContext, customSystemPrompt].filter(Boolean).join('\n\n') },
                    { role: 'system', content: runtimeContext },
                    { role: 'user', content: userMessage }
                ]
            })
        });

        if (!response.ok) {
            const errText = await response.text();
            return res.status(response.status).json({
                error: 'Upstream API error',
                detail: errText,
                debug: {
                    requestUrl,
                    model
                }
            });
        }

        const data = await response.json();
        const answer = data?.choices?.[0]?.message?.content?.trim();

        if (!answer) {
            return res.status(502).json({ error: 'Empty response from model provider.' });
        }

        return res.status(200).json({ answer });
    } catch (error) {
        return res.status(500).json({
            error: 'Internal server error',
            detail: error.message,
            debug: {
                baseUrl,
                model
            }
        });
    }
};
