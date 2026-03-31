module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const apiKey = process.env.AI_API_KEY;
    const model = process.env.AI_MODEL || 'gpt-4o-mini';
    const rawBaseUrl = (process.env.AI_BASE_URL || 'https://api.openai.com/v1').trim();
    const baseUrl = rawBaseUrl.replace(/\/$/, '');
    const systemPrompt = process.env.AI_SYSTEM_PROMPT || '你是网站里的中文 AI 小助手，回答简洁、友好、实用。';

    if (!apiKey) {
        return res.status(500).json({ error: 'Missing AI_API_KEY environment variable.' });
    }

    try {
        const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
        const userMessage = (body.message || '').toString().trim();

        if (!userMessage) {
            return res.status(400).json({ error: 'message is required.' });
        }

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
                    { role: 'system', content: systemPrompt },
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
