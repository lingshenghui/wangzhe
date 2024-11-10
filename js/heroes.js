document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const heroSearch = document.getElementById('heroSearch');
    const filterGroups = document.querySelectorAll('.filter-group');
    const heroGrid = document.querySelector('.hero-grid');
    const modal = document.getElementById('heroModal');
    const closeModal = document.querySelector('.close-modal');

    // 英雄数据
    const heroData = [
        // 坦克
        {
            name: '张飞',
            title: '浑身是胆',
            role: 'tank',
            difficulty: '★★',
            survival: 90,
            attack: 40,
            skill: 50,
            image: './img/张飞.webp'
        },
        {
            name: '程咬金',
            title: '热血斗士',
            role: 'tank',
            difficulty: '★★',
            survival: 85,
            attack: 45,
            skill: 45,
            image: './img/程咬金.webp'
        },
        // 战士
        {
            name: '曹操',
            title: '霸业之刃',
            role: 'warrior',
            difficulty: '★★★',
            survival: 70,
            attack: 80,
            skill: 60,
            image: './img/曹操.webp'
        },
        {
            name: '花木兰',
            title: '传说之刃',
            role: 'warrior',
            difficulty: '★★★',
            survival: 65,
            attack: 75,
            skill: 70,
            image: './img/花木兰.webp'
        },
        // 刺客
        {
            name: '李白',
            title: '青莲剑仙',
            role: 'assassin',
            difficulty: '★★★',
            survival: 40,
            attack: 90,
            skill: 70,
            image: './img/李白.webp'
        },
        {
            name: '韩信',
            title: '国士无双',
            role: 'assassin',
            difficulty: '★★★',
            survival: 35,
            attack: 95,
            skill: 65,
            image: './img/韩信.webp'
        },
        // 法师
        {
            name: '妲己',
            title: '魅惑之狐',
            role: 'mage',
            difficulty: '★★',
            survival: 35,
            attack: 85,
            skill: 95,
            image: './img/妲己.webp'
        },
        {
            name: '安琪拉',
            title: '暗夜萝莉',
            role: 'mage',
            difficulty: '★★',
            survival: 30,
            attack: 90,
            skill: 90,
            image: './img/安琪拉.webp'
        },
        // 射手
        {
            name: '后羿',
            title: '半神之弓',
            role: 'marksman',
            difficulty: '★★',
            survival: 40,
            attack: 95,
            skill: 60,
            image: './img/后羿.webp'
        },
        {
            name: '孙尚香',
            title: '千金重弩',
            role: 'marksman',
            difficulty: '★★★',
            survival: 45,
            attack: 90,
            skill: 65,
            image: './img/孙尚香.webp'
        },
        // 辅助
        {
            name: '蔡文姬',
            title: '天籁弦音',
            role: 'support',
            difficulty: '★★',
            survival: 60,
            attack: 35,
            skill: 85,
            image: './img/蔡文姬.webp'
        },
        {
            name: '孙膑',
            title: '逆流之时',
            role: 'support',
            difficulty: '★★★',
            survival: 55,
            attack: 40,
            skill: 90,
            image: './img/孙膑.webp'
        }
    ];

    // 初始化显示所有英雄
    displayHeroes('all');

    // 筛选按钮点击事件
    filterGroups.forEach(group => {
        group.addEventListener('click', function() {
            // 移除所有active类
            filterGroups.forEach(g => g.classList.remove('active'));
            // 添加active类到当前选中的筛选项
            this.classList.add('active');
            
            const role = this.dataset.role;
            displayHeroes(role);
        });
    });

    // 显示英雄函数
    function displayHeroes(role) {
        // 清空现有内容
        heroGrid.innerHTML = '';
        
        // 筛选英雄
        const filteredHeroes = role === 'all' 
            ? heroData 
            : heroData.filter(hero => hero.role === role);

        // 创建英雄卡片
        filteredHeroes.forEach(hero => {
            const heroCard = document.createElement('div');
            heroCard.className = 'hero-card';
            heroCard.dataset.role = hero.role;
            
            heroCard.innerHTML = `
                <div class="hero-avatar">
                    <img src="${hero.image}" alt="${hero.name}">
                    <div class="hero-difficulty">
                        <span class="difficulty-level">难度：</span>
                        <span class="stars">${hero.difficulty}</span>
                    </div>
                </div>
                <div class="hero-info">
                    <h3>${hero.name}</h3>
                    <p>${hero.title}</p>
                    <div class="hero-tags">
                        <span class="tag">${getRoleText(hero.role)}</span>
                    </div>
                </div>
                <div class="hero-stats">
                    <div class="stat">
                        <span>生存</span>
                        <div class="stat-bar">
                            <div class="stat-fill" style="width: ${hero.survival}%"></div>
                        </div>
                    </div>
                    <div class="stat">
                        <span>攻击</span>
                        <div class="stat-bar">
                            <div class="stat-fill" style="width: ${hero.attack}%"></div>
                        </div>
                    </div>
                    <div class="stat">
                        <span>技能</span>
                        <div class="stat-bar">
                            <div class="stat-fill" style="width: ${hero.skill}%"></div>
                        </div>
                    </div>
                </div>
            `;

            // 添加点击事件
            heroCard.addEventListener('click', () => showHeroDetail(hero));
            
            // 添加到网格中
            heroGrid.appendChild(heroCard);
        });
    }

    // 搜索功能
    heroSearch.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const filteredHeroes = heroData.filter(hero => 
            hero.name.toLowerCase().includes(searchTerm) || 
            hero.title.toLowerCase().includes(searchTerm)
        );
        
        heroGrid.innerHTML = '';
        filteredHeroes.forEach(hero => {
            // ... 创建并显示符合搜索条件的英雄卡片
            displayHeroes('all');
        });
    });

    // 获取角色中文名称
    function getRoleText(role) {
        const roleMap = {
            'tank': '坦克',
            'warrior': '战士',
            'assassin': '刺客',
            'mage': '法师',
            'marksman': '射手',
            'support': '辅助'
        };
        return roleMap[role] || role;
    }

    // 显示英雄详情
    function showHeroDetail(hero) {
        const modalTitle = modal.querySelector('.hero-title h2');
        const modalSubtitle = modal.querySelector('.hero-title p');
        const modalBanner = modal.querySelector('.hero-banner img');

        modalTitle.textContent = hero.name;
        modalSubtitle.textContent = hero.title;
        modalBanner.src = `img/heroes/${hero.image}`;

        modal.style.display = 'block';
    }

    // 关闭弹窗
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // 点击弹窗外部关闭
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});