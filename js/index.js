document.addEventListener('DOMContentLoaded', function() {
    // 初始化轮播图
    const swiper = new Swiper('.swiper-container', {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        }
    });

    // 导航栏滚动效果
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        const currentScroll = window.pageYOffset;

        if (currentScroll > lastScroll) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        if (currentScroll === 0) {
            navbar.style.background = 'rgba(0, 0, 0, 0.8)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        }

        lastScroll = currentScroll;
    });

    // 新闻标签页切换
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // 移除所有标签的active类
            tabs.forEach(t => t.classList.remove('active'));
            // 为当前标签添加active类
            this.classList.add('active');
            
            // 这里可以添加加载对应内容的逻辑
            const tabType = this.dataset.tab;
            loadTabContent(tabType);
        });
    });

    // 加载标签页内容
    function loadTabContent(tabType) {
        // 模拟加载不同类型的内容
        const newsContent = document.getElementById('news');
        const loadingHTML = '<div class="loading">加载中...</div>';
        newsContent.innerHTML = loadingHTML;

        // 模拟API请求延迟
        setTimeout(() => {
            let content = '';
            switch(tabType) {
                case 'news':
                    content = `
                        <ul class="news-list">
                            <li>
                                <span class="news-type">[新闻]</span>
                                <a href="#">最新版本更新内容一览</a>
                                <span class="news-date">04-10</span>
                            </li>
                            <li>
                                <span class="news-type">[赛事]</span>
                                <a href="#">KPL春季赛赛程公布</a>
                                <span class="news-date">04-09</span>
                            </li>
                            <li>
                                <span class="news-type">[新闻]</span>
                                <a href="#">新英雄背景故事揭秘</a>
                                <span class="news-date">04-08</span>
                            </li>
                        </ul>`;
                    break;
                case 'notice':
                    content = `
                        <ul class="news-list">
                            <li>
                                <span class="news-type">[公告]</span>
                                <a href="#">服务器维护通知</a>
                                <span class="news-date">04-10</span>
                            </li>
                            <li>
                                <span class="news-type">[公告]</span>
                                <a href="#">游戏优化更新公告</a>
                                <span class="news-date">04-09</span>
                            </li>
                        </ul>`;
                    break;
                case 'activity':
                    content = `
                        <ul class="news-list">
                            <li>
                                <span class="news-type">[活动]</span>
                                <a href="#">五五开黑节活动开启</a>
                                <span class="news-date">04-10</span>
                            </li>
                            <li>
                                <span class="news-type">[活动]</span>
                                <a href="#">春季主题活动</a>
                                <span class="news-date">04-09</span>
                            </li>
                        </ul>`;
                    break;
            }
            newsContent.innerHTML = content;
        }, 500);
    }

    // 英雄卡片悬停效果
    const heroCards = document.querySelectorAll('.hero-card');
    heroCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // 检查登录状态
    checkLoginStatus();
});

// 检查登录状态
function checkLoginStatus() {
    const username = localStorage.getItem('username');
    if (username) {
        document.querySelector('.username').textContent = username;
        // 这里可以添加已登录用户的头像
    }
} 