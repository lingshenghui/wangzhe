document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const tabs = document.querySelectorAll('.tab');
    const filterButtons = document.querySelectorAll('.filter-buttons button');
    const loadMoreBtn = document.querySelector('.load-more button');
    const heroSearch = document.querySelector('.hero-search input');
    const strategyGrid = document.querySelector('.strategy-grid');

    // 攻略数据
    const strategyData = [
        {
            title: '新手必看：基础操作教学',
            description: '手把手教你快速上手王者荣耀',
            image: 'images/strategy/guide1.jpg',
            author: '官方教学组',
            authorAvatar: 'images/avatars/author1.jpg',
            views: '8.5万',
            comments: '2.3万',
            duration: '12:30',
            type: 'video'
        },
        // 更多攻略数据...
    ];

    // 标签切换功能
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            loadStrategiesByType(this.dataset.type);
        });
    });

    // 筛选按钮功能
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filterStrategies(this.textContent.toLowerCase());
        });
    });

    // 加载更多功能
    let currentPage = 1;
    loadMoreBtn.addEventListener('click', function() {
        currentPage++;
        loadMoreStrategies(currentPage);
        // 模拟加载状态
        this.textContent = '加载中...';
        this.disabled = true;
        setTimeout(() => {
            this.textContent = '加载更多';
            this.disabled = false;
        }, 1000);
    });

    // 英雄搜索功能
    let searchTimeout;
    heroSearch.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            searchHeroGuides(this.value);
        }, 300);
    });

    // 根据类型加载攻略
    function loadStrategiesByType(type) {
        // 模拟加载中状态
        strategyGrid.innerHTML = '<div class="loading">加载中...</div>';
        
        // 模拟API请求延迟
        setTimeout(() => {
            const filteredStrategies = strategyData.filter(strategy => 
                type === 'newest' || strategy.category === type
            );
            displayStrategies(filteredStrategies);
        }, 500);
    }

    // 筛选攻略
    function filterStrategies(filter) {
        const strategies = document.querySelectorAll('.strategy-card');
        strategies.forEach(strategy => {
            const shouldShow = filter === '全部' || 
                             strategy.dataset.type === filter;
            strategy.style.display = shouldShow ? 'block' : 'none';
        });
    }

    // 加载更多攻略
    function loadMoreStrategies(page) {
        // 模拟API请求获取更多数据
        setTimeout(() => {
            const newStrategies = getMoreStrategies(page);
            appendStrategies(newStrategies);
        }, 1000);
    }

    // 搜索英雄攻略
    function searchHeroGuides(keyword) {
        const heroCards = document.querySelectorAll('.hero-guide-card');
        heroCards.forEach(card => {
            const heroName = card.querySelector('h3').textContent.toLowerCase();
            const shouldShow = heroName.includes(keyword.toLowerCase());
            card.style.display = shouldShow ? 'block' : 'none';
        });
    }

    // 显示攻略列表
    function displayStrategies(strategies) {
        strategyGrid.innerHTML = strategies.map(strategy => `
            <div class="strategy-card" data-type="${strategy.type}">
                <div class="card-image">
                    <img src="${strategy.image}" alt="${strategy.title}">
                    ${strategy.type === 'video' ? 
                        `<span class="video-duration">${strategy.duration}</span>` : ''}
                </div>
                <div class="card-content">
                    <h3>${strategy.title}</h3>
                    <p>${strategy.description}</p>
                    <div class="card-meta">
                        <div class="author">
                            <img src="${strategy.authorAvatar}" alt="${strategy.author}">
                            <span>${strategy.author}</span>
                        </div>
                        <div class="stats">
                            <span><i class="fas fa-eye"></i> ${strategy.views}</span>
                            <span><i class="fas fa-comment"></i> ${strategy.comments}</span>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // 添加新攻略到列表
    function appendStrategies(strategies) {
        const fragment = document.createDocumentFragment();
        strategies.forEach(strategy => {
            const card = createStrategyCard(strategy);
            fragment.appendChild(card);
        });
        strategyGrid.appendChild(fragment);
    }

    // 创建攻略卡片
    function createStrategyCard(strategy) {
        const card = document.createElement('div');
        card.className = 'strategy-card';
        card.dataset.type = strategy.type;
        // 设置卡片内容...
        return card;
    }

    // 初始化页面
    loadStrategiesByType('newest');
}); 