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
            // 移除所有active��
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
        
        // 更新英雄名称和标题
        modalTitle.textContent = hero.name; // 显示英雄名称
        modalSubtitle.textContent = hero.title; // 显示英雄标题
        modalBanner.src = hero.image; // 确保使用正确的图片路径

        // 更新技能介绍（假设您有一个技能介绍的映射）
        const skillDescription = getSkillDescription(hero.name); // 获取技能描述
        const skillInfoContainer = modal.querySelector('.hero-abilities .abilities-list');
        skillInfoContainer.innerHTML = skillDescription; // 更新技能介绍内容

        modal.style.display = 'block';
    }

    // 假设您有一个函数来获取技能描述
    function getSkillDescription(heroName) {
        const skills = {
            '李白': `<div class="ability">
                        <img src="./img/李白.webp" alt="技能1">
                        <div class="ability-info">
                            <h4>青莲剑歌</h4>
                            <p>李白化为剑光冲向指定方向，对路径上的敌人造成物理伤害...</p>
                        </div>
                    </div>`,
            '妲己': `<div class="ability">
                        <img src="./img/妲己.webp" alt="技能1">
                        <div class="ability-info">
                            <h4>魅惑之狐</h4>
                            <p>妲己施放魅惑技能，控制敌人...</p>
                        </div>
                    </div>`,
            '亚瑟': `<div class="ability">
                        <img src="./img/亚瑟.webp" alt="技能1">
                        <div class="ability-info">
                            <h4>圣骑之力</h4>
                            <p>亚瑟释放圣光，增强自身能力...</p>
                        </div>
                    </div>`,
            '张飞': `<div class="ability">
                        <img src="./img/张飞.webp" alt="技能1">
                        <div class="ability-info">
                            <h4>浑身是胆</h4>
                            <p>张飞的技能描述...</p>
                        </div>
                    </div>`,
            '程咬金': `<div class="ability">
                        <img src="./img/程咬金.webp" alt="技能1">
                        <div class="ability-info">
                            <h4>热血斗士</h4>
                            <p>程咬金的技能描述...</p>
                        </div>
                    </div>`,
            '花木兰': `<div class="ability">
                        <img src="./img/花木兰.webp" alt="技能1">
                        <div class="ability-info">
                            <h4>传说之刃</h4>
                            <p>花木兰的技能描述...</p>
                        </div>
                    </div>`,
            '后羿': `<div class="ability">
                        <img src="./img/后羿.webp" alt="技能1">
                        <div class="ability-info">
                            <h4>半神之弓</h4>
                            <p>后羿的技能描述...</p>
                        </div>
                    </div>`,
            '韩信': `<div class="ability">
                        <img src="./img/韩信.webp" alt="技能1">
                        <div class="ability-info">
                            <h4>国士无双</h4>
                            <p>韩信的技能描述...</p>
                        </div>
                    </div>`,
            '安琪拉': `<div class="ability">
                        <img src="./img/安琪拉.webp" alt="技能1">
                        <div class="ability-info">
                            <h4>暗夜萝莉</h4>
                            <p>安琪拉的技能描述...</p>
                        </div>
                    </div>`,
            '孙尚香': `<div class="ability">
                        <img src="./img/孙尚香.webp" alt="技能1">
                        <div class="ability-info">
                            <h4>千金重弩</h4>
                            <p>孙尚香的技能描述...</p>
                        </div>
                    </div>`,
            '蔡文姬': `<div class="ability">
                        <img src="./img/蔡文姬.webp" alt="技能1">
                        <div class="ability-info">
                            <h4>天籁弦音</h4>
                            <p>蔡文姬的技能描述...</p>
                        </div>
                    </div>`,
            // 继续添加其他英雄...
            '刘备': `<div class="ability">
                        <img src="./img/刘备.webp" alt="技能1">
                        <div class="ability-info">
                            <h4>仁德之心</h4>
                            <p>刘备的技能描述...</p>
                        </div>
                    </div>`,
            '貂蝉': `<div class="ability">
                        <img src="./img/貂蝉技能1.webp" alt="技能1">
                        <div class="ability-info">
                            <h4>倾国倾城</h4>
                            <p>貂蝉的技能描述...</p>
                        </div>
                    </div>`,
            // 添加更多英雄...
        };
        return skills[heroName] || ''; // 返回对应英雄的技能描述
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

    // 为每个英雄卡片添加点击事件
    document.querySelectorAll('.hero-card').forEach(card => {
        card.addEventListener('click', () => {
            const heroName = card.querySelector('h3').innerText;
            const heroImage = card.querySelector('.hero-avatar img').src;
            
            // 更新弹窗内容
            document.querySelector('#heroModal .hero-banner img').src = heroImage;
            document.querySelector('#heroModal .hero-title h2').innerText = heroName;

            // 显示弹窗
            document.getElementById('heroModal').style.display = 'block';
        });
    });

    // 关闭弹窗的事件
    document.querySelector('.close-modal').addEventListener('click', () => {
        document.getElementById('heroModal').style.display = 'none';
    });
});