(function () {
    const endpoint = '/api/chat';

    const style = document.createElement('style');
    style.textContent = `
        .mo-ai-entry {
            position: fixed;
            right: 18px;
            bottom: 86px;
            z-index: 2000;
            width: 64px;
            height: 64px;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            background: radial-gradient(circle at 30% 30%, #fff 0%, #d8e9ff 18%, #8ab2ff 48%, #5665ff 72%, #2b1e73 100%);
            box-shadow: 0 10px 26px rgba(0, 0, 0, 0.36), 0 0 0 1px rgba(255, 255, 255, 0.35) inset;
            animation: mo-ai-orbit-float 3.8s ease-in-out infinite;
            display: grid;
            place-items: center;
            overflow: visible;
            touch-action: none;
            user-select: none;
        }

        .mo-ai-entry:hover {
            transform: translateY(-2px) scale(1.04);
        }

        .mo-ai-entry.active {
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.42), 0 0 0 8px rgba(117, 142, 255, 0.2);
        }

        .mo-ai-core {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background: radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.95), rgba(201, 225, 255, 0.55) 42%, rgba(140, 170, 255, 0.3) 100%);
            border: 1px solid rgba(255, 255, 255, 0.7);
            position: relative;
            box-shadow: 0 0 16px rgba(158, 191, 255, 0.55);
        }

        .mo-ai-core::before {
            content: '';
            position: absolute;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.9);
            top: 6px;
            left: 7px;
        }

        .mo-ai-ring {
            position: absolute;
            inset: -6px;
            border-radius: 50%;
            border: 1px solid rgba(173, 193, 255, 0.75);
            animation: mo-ai-rotate 6s linear infinite;
        }

        .mo-ai-ring::before,
        .mo-ai-ring::after {
            content: '';
            position: absolute;
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background: #dff2ff;
            box-shadow: 0 0 8px rgba(223, 242, 255, 0.9);
        }

        .mo-ai-ring::before {
            top: -3px;
            left: 12px;
        }

        .mo-ai-ring::after {
            bottom: -3px;
            right: 10px;
        }

        .mo-ai-halo {
            position: absolute;
            width: 84px;
            height: 84px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(120, 155, 255, 0.35) 0%, rgba(120, 155, 255, 0) 70%);
            z-index: -1;
            animation: mo-ai-halo 2.8s ease-out infinite;
        }

        .mo-ai-panel {
            position: fixed;
            right: 18px;
            bottom: 150px;
            z-index: 2000;
            width: min(92vw, 360px);
            height: 480px;
            border-radius: 14px;
            overflow: hidden;
            border: 1px solid rgba(255, 255, 255, 0.15);
            background: rgba(14, 14, 23, 0.95);
            box-shadow: 0 16px 40px rgba(0, 0, 0, 0.45);
            display: none;
            flex-direction: column;
        }

        .mo-ai-panel.show {
            display: flex;
        }

        .mo-ai-header {
            padding: 12px 14px;
            font-size: 14px;
            color: #f6e9ff;
            background: linear-gradient(135deg, rgba(255, 111, 179, 0.25), rgba(154, 107, 255, 0.25));
            border-bottom: 1px solid rgba(255, 255, 255, 0.12);
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
        }

        .mo-ai-close {
            border: none;
            background: rgba(255, 255, 255, 0.14);
            color: #fff;
            width: 26px;
            height: 26px;
            border-radius: 50%;
            line-height: 1;
            font-size: 16px;
            cursor: pointer;
            display: grid;
            place-items: center;
        }

        .mo-ai-close:hover {
            background: rgba(255, 255, 255, 0.24);
        }

        .mo-ai-messages {
            flex: 1;
            overflow-y: auto;
            padding: 12px;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .mo-ai-msg {
            max-width: 88%;
            padding: 9px 11px;
            border-radius: 10px;
            font-size: 13px;
            line-height: 1.6;
            white-space: pre-wrap;
        }

        .mo-ai-msg.user {
            margin-left: auto;
            background: #7a5cff;
            color: #fff;
        }

        .mo-ai-msg.bot {
            margin-right: auto;
            background: rgba(255, 255, 255, 0.1);
            color: #f5e9ff;
        }

        .mo-ai-input-wrap {
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            padding: 10px;
            display: flex;
            gap: 8px;
        }

        .mo-ai-input {
            flex: 1;
            border: 1px solid rgba(255, 255, 255, 0.2);
            background: rgba(0, 0, 0, 0.25);
            color: #fff;
            border-radius: 8px;
            padding: 8px 10px;
            outline: none;
            font-size: 13px;
        }

        .mo-ai-send {
            border: none;
            border-radius: 8px;
            background: linear-gradient(135deg, #ff6fb3, #9a6bff);
            color: #fff;
            padding: 8px 12px;
            font-size: 13px;
            cursor: pointer;
        }

        @media (max-width: 768px) {
            .mo-ai-panel {
                width: min(94vw, 360px);
                height: min(70vh, 460px);
            }
        }

        @keyframes mo-ai-orbit-float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-4px); }
        }

        @keyframes mo-ai-rotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        @keyframes mo-ai-halo {
            0% { transform: scale(0.88); opacity: 0.56; }
            100% { transform: scale(1.22); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    const entry = document.createElement('button');
    entry.className = 'mo-ai-entry';
    entry.type = 'button';
    entry.title = '打开 AI 小助手';
    entry.setAttribute('aria-label', '打开 AI 小助手');
    entry.innerHTML = `
        <span class="mo-ai-halo" aria-hidden="true"></span>
        <span class="mo-ai-core" aria-hidden="true">
            <span class="mo-ai-ring"></span>
        </span>
    `;

    const panel = document.createElement('section');
    panel.className = 'mo-ai-panel';
    panel.innerHTML = `
        <div class="mo-ai-header">
            <span>Mo AI 小助手</span>
            <button class="mo-ai-close" id="mo-ai-close" type="button" aria-label="关闭 AI 面板">×</button>
        </div>
        <div class="mo-ai-messages" id="mo-ai-messages"></div>
        <div class="mo-ai-input-wrap">
            <input class="mo-ai-input" id="mo-ai-input" type="text" placeholder="输入你的问题..." />
            <button class="mo-ai-send" id="mo-ai-send" type="button">发送</button>
        </div>
    `;

    document.body.appendChild(entry);
    document.body.appendChild(panel);

    const messages = panel.querySelector('#mo-ai-messages');
    const input = panel.querySelector('#mo-ai-input');
    const send = panel.querySelector('#mo-ai-send');
    const closeBtn = panel.querySelector('#mo-ai-close');
    const positionKey = 'mo-ai-entry-position-v1';
    const edgePadding = 12;
    let hasDragged = false;
    let dragState = null;

    function clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }

    function setEntryPosition(left, top) {
        const maxLeft = window.innerWidth - entry.offsetWidth - edgePadding;
        const maxTop = window.innerHeight - entry.offsetHeight - edgePadding;
        const nextLeft = clamp(left, edgePadding, maxLeft);
        const nextTop = clamp(top, edgePadding, maxTop);
        entry.style.left = nextLeft + 'px';
        entry.style.top = nextTop + 'px';
        entry.style.right = 'auto';
        entry.style.bottom = 'auto';
    }

    function saveEntryPosition() {
        const left = parseFloat(entry.style.left);
        const top = parseFloat(entry.style.top);
        if (!Number.isNaN(left) && !Number.isNaN(top)) {
            localStorage.setItem(positionKey, JSON.stringify({ left, top }));
        }
    }

    function loadOrInitEntryPosition() {
        let position = null;
        try {
            position = JSON.parse(localStorage.getItem(positionKey) || 'null');
        } catch (e) {
            position = null;
        }

        if (position && typeof position.left === 'number' && typeof position.top === 'number') {
            setEntryPosition(position.left, position.top);
            return;
        }

        const defaultLeft = window.innerWidth - entry.offsetWidth - 18;
        const defaultTop = window.innerHeight - entry.offsetHeight - 86;
        setEntryPosition(defaultLeft, defaultTop);
        saveEntryPosition();
    }

    function updatePanelPosition() {
        const panelWidth = panel.offsetWidth || Math.min(window.innerWidth * 0.92, 360);
        const panelHeight = panel.offsetHeight || Math.min(window.innerHeight * 0.7, 460);
        const entryLeft = parseFloat(entry.style.left) || (window.innerWidth - entry.offsetWidth - 18);
        const entryTop = parseFloat(entry.style.top) || (window.innerHeight - entry.offsetHeight - 86);
        const gap = 10;

        let panelLeft = entryLeft + entry.offsetWidth - panelWidth;
        let panelTop = entryTop - panelHeight - gap;

        const minLeft = 8;
        const maxLeft = window.innerWidth - panelWidth - 8;
        panelLeft = clamp(panelLeft, minLeft, maxLeft);

        if (panelTop < 8) {
            panelTop = entryTop + entry.offsetHeight + gap;
        }
        const maxTop = window.innerHeight - panelHeight - 8;
        panelTop = clamp(panelTop, 8, maxTop);

        panel.style.left = panelLeft + 'px';
        panel.style.top = panelTop + 'px';
        panel.style.right = 'auto';
        panel.style.bottom = 'auto';
    }

    function startDrag(clientX, clientY) {
        const rect = entry.getBoundingClientRect();
        dragState = {
            pointerStartX: clientX,
            pointerStartY: clientY,
            startLeft: rect.left,
            startTop: rect.top
        };
        hasDragged = false;
    }

    function moveDrag(clientX, clientY) {
        if (!dragState) return;
        const deltaX = clientX - dragState.pointerStartX;
        const deltaY = clientY - dragState.pointerStartY;
        if (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3) {
            hasDragged = true;
        }
        setEntryPosition(dragState.startLeft + deltaX, dragState.startTop + deltaY);
        if (panel.classList.contains('show')) {
            updatePanelPosition();
        }
    }

    function endDrag() {
        if (!dragState) return;
        dragState = null;
        saveEntryPosition();
    }

    function appendMessage(role, text) {
        const div = document.createElement('div');
        div.className = `mo-ai-msg ${role}`;
        div.textContent = text;
        messages.appendChild(div);
        messages.scrollTop = messages.scrollHeight;
        return div;
    }

    function checkAndExecuteMusicCommands(message) {
        const lowerMessage = message.toLowerCase();
        let response = null;

        if (window.currentMusic) {
            // 切歌指令
            if (lowerMessage.includes('切歌') || lowerMessage.includes('下一首') || lowerMessage.includes('换一首')) {
                if (typeof window.currentMusic.nextSong === 'function') {
                    const newSong = window.currentMusic.nextSong();
                    response = `好的，已切到下一首《${newSong}》！`;
                }
            }
            // 单曲循环指令
            else if (lowerMessage.includes('单曲循环') || lowerMessage.includes('循环播放')) {
                if (typeof window.currentMusic.setLoop === 'function') {
                    window.currentMusic.setLoop(true);
                    response = '好的，已开启单曲循环模式！';
                }
            }
            // 关闭循环指令
            else if (lowerMessage.includes('关闭循环') || lowerMessage.includes('取消循环')) {
                if (typeof window.currentMusic.setLoop === 'function') {
                    window.currentMusic.setLoop(false);
                    response = '好的，已关闭单曲循环模式！';
                }
            }
        }

        return response;
    }

    async function askAI() {
        const message = input.value.trim();
        if (!message) return;

        appendMessage('user', message);
        input.value = '';
        send.disabled = true;
        send.textContent = '发送中...';

        // 先检查是否是音乐控制指令
        const musicResponse = checkAndExecuteMusicCommands(message);
        if (musicResponse) {
            const botMessageEl = appendMessage('bot', musicResponse);
            send.disabled = false;
            send.textContent = '发送';
            return;
        }

        const botMessageEl = appendMessage('bot', '思考中...');

        try {
            // 获取当前页面的音乐信息
            let musicInfo = null;
            if (window.currentMusic && typeof window.currentMusic.getInfo === 'function') {
                musicInfo = window.currentMusic.getInfo();
            }

            const resp = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message,
                    currentPage: window.location.pathname,
                    pageTitle: document.title,
                    musicInfo: musicInfo,
                    stream: true
                })
            });

            if (!resp.ok) {
                const data = await resp.json().catch(() => ({}));
                const detail = data && (data.detail || (data.debug && JSON.stringify(data.debug)));
                throw new Error((data && data.error ? data.error : '请求失败') + (detail ? `：${detail}` : ''));
            }

            if (!resp.body) {
                throw new Error('流式响应不可用');
            }

            botMessageEl.textContent = '';

            const reader = resp.body.getReader();
            const decoder = new TextDecoder('utf-8');
            let buffer = '';
            let fullText = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split('\n');
                buffer = lines.pop() || '';

                for (const line of lines) {
                    const trimmed = line.trim();
                    if (!trimmed.startsWith('data:')) continue;
                    const payload = trimmed.slice(5).trim();
                    if (!payload || payload === '[DONE]') continue;

                    try {
                        const json = JSON.parse(payload);
                        const delta = json?.choices?.[0]?.delta?.content;
                        if (delta) {
                            fullText += delta;
                            botMessageEl.textContent = fullText;
                            messages.scrollTop = messages.scrollHeight;
                        }
                    } catch (e) {
                        // 忽略解析失败的碎片行
                    }
                }
            }

            if (!fullText.trim()) {
                botMessageEl.textContent = '我暂时没有想到合适的回复。';
            }
        } catch (err) {
            botMessageEl.textContent = '连接 AI 服务失败：' + (err && err.message ? err.message : '请稍后再试。');
            console.error(err);
        } finally {
            send.disabled = false;
            send.textContent = '发送';
        }
    }

    appendMessage('bot', '你好，我是 Mo小窝 AI 小助手。我可以帮你快速找到功能入口、介绍每个 Demo 怎么玩、以及排查常见问题。');

    loadOrInitEntryPosition();
    updatePanelPosition();

    entry.addEventListener('click', function () {
        if (hasDragged) {
            hasDragged = false;
            return;
        }
        panel.classList.toggle('show');
        entry.classList.toggle('active', panel.classList.contains('show'));
        if (panel.classList.contains('show')) {
            updatePanelPosition();
            input.focus();
        }
    });

    closeBtn.addEventListener('click', function () {
        panel.classList.remove('show');
        entry.classList.remove('active');
    });

    entry.addEventListener('pointerdown', function (event) {
        startDrag(event.clientX, event.clientY);
        entry.setPointerCapture(event.pointerId);
    });

    entry.addEventListener('pointermove', function (event) {
        moveDrag(event.clientX, event.clientY);
    });

    entry.addEventListener('pointerup', function () {
        endDrag();
    });

    entry.addEventListener('pointercancel', function () {
        endDrag();
    });

    send.addEventListener('click', askAI);
    input.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            askAI();
        }
    });

    window.addEventListener('resize', function () {
        const currentLeft = parseFloat(entry.style.left) || (window.innerWidth - entry.offsetWidth - 18);
        const currentTop = parseFloat(entry.style.top) || (window.innerHeight - entry.offsetHeight - 86);
        setEntryPosition(currentLeft, currentTop);
        updatePanelPosition();
        saveEntryPosition();
    });

    document.addEventListener('pointerdown', function (event) {
        if (!panel.classList.contains('show')) return;
        const target = event.target;
        const clickedInsidePanel = panel.contains(target);
        const clickedEntry = entry.contains(target);
        if (!clickedInsidePanel && !clickedEntry) {
            panel.classList.remove('show');
            entry.classList.remove('active');
        }
    });
})();
