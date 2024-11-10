document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const categoryTabs = document.querySelectorAll('.category-tabs .tab');
    const searchInput = document.querySelector('.search-box input');
    const runesGrid = document.querySelector('.runes-grid');
    const currentLevel = document.getElementById('currentLevel');
    const targetLevel = document.getElementById('targetLevel');
    const upgradeCost = document.getElementById('upgradeCost');
    const upgradeBtn = document.querySelector('.upgrade-btn');

    // 铭文数据
    const runesData = [
        {
            id: 1,
            name: '暴击铭文',
            effect: '物理暴击率 +2%',
            type: 'red',
            level: 5,
            icon: 'images/runes/rune1.png'
        },
        {
            id: 2,
            name: '攻速铭文',
            effect: '攻击速度 +2.5%',
            type: 'blue',
            level: 4,
            icon: 'images/runes/rune2.png'
        },
        // 更多铭文数据...
    ];

    // 铭文升级费用表
    const upgradeCosts = {
        '1-2': 500,
        '2-3': 1000,
        '3-4': 2000,
        '4-5': 4000
    };

    // 分类切换
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            categoryTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            filterRunes(this.dataset.type);
        });
    });

    // 搜索功能
    let searchTimeout;
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            searchRunes(this.value);
        }, 300);
    });

    // 升级计算器
    currentLevel.addEventListener('change', calculateUpgradeCost);
    targetLevel.addEventListener('change', calculateUpgradeCost);

    // 升级按钮点击事件
    upgradeBtn.addEventListener('click', function() {
        const cost = calculateUpgradeCost();
        // 模拟升级操作
        showUpgradeConfirmation(cost);
    });

    // 筛选铭文
    function filterRunes(type) {
        const filteredRunes = type === 'all' 
            ? runesData 
            : runesData.filter(rune => rune.type === type);
        
        displayRunes(filteredRunes);
    }

    // 搜索铭文
    function searchRunes(keyword) {
        const searchResults = runesData.filter(rune => 
            rune.name.toLowerCase().includes(keyword.toLowerCase()) ||
            rune.effect.toLowerCase().includes(keyword.toLowerCase())
        );
        displayRunes(searchResults);
    }

    // 显示铭文
    function displayRunes(runes) {
        runesGrid.innerHTML = runes.map(rune => `
            <div class="rune-card" data-type="${rune.type}">
                <div class="rune-icon">
                    <img src="${rune.icon}" alt="${rune.name}">
                </div>
                <div class="rune-info">
                    <h3>${rune.name}</h3>
                    <p class="rune-effect">${rune.effect}</p>
                    <div class="rune-level">
                        <span>等级 ${rune.level}</span>
                        <div class="level-bar">
                            <div class="level-fill" style="width: ${rune.level * 20}%"></div>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // 计算升级费用
    function calculateUpgradeCost() {
        const current = parseInt(currentLevel.value);
        const target = parseInt(targetLevel.value);
        let totalCost = 0;

        for (let i = current; i < target; i++) {
            const costKey = `${i}-${i+1}`;
            totalCost += upgradeCosts[costKey] || 0;
        }

        upgradeCost.textContent = totalCost;
        return totalCost;
    }

    // 显示升级确认
    function showUpgradeConfirmation(cost) {
        const confirm = window.confirm(`确定要花费 ${cost} 金币升级铭文吗？`);
        if (confirm) {
            // 模拟升级过程
            showUpgradeAnimation();
        }
    }

    // 升级动画
    function showUpgradeAnimation() {
        upgradeBtn.disabled = true;
        upgradeBtn.textContent = '升级中...';

        setTimeout(() => {
            upgradeBtn.disabled = false;
            upgradeBtn.textContent = '升级';
            showSuccessMessage('铭文升级成功！');
        }, 1500);
    }

    // 显示成功消息
    function showSuccessMessage(message) {
        const toast = document.createElement('div');
        toast.className = 'toast-message';
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    // 添加铭文推荐搭配
    function initializeRuneCombinations() {
        const combinations = [
            {
                hero: '李白',
                role: '刺客',
                runes: {
                    red: ['暴击铭文', '暴击铭文', '暴击铭文'],
                    blue: ['攻速铭文', '攻速铭文', '攻速铭文'],
                    green: ['移速铭文', '移速铭文', '移速铭文']
                }
            },
            // 更多英雄铭文搭配...
        ];

        // 显示推荐搭配
        displayCombinations(combinations);
    }

    // 显示铭文搭配
    function displayCombinations(combinations) {
        const combinationsGrid = document.querySelector('.combinations-grid');
        if (combinationsGrid) {
            combinationsGrid.innerHTML = combinations.map(combo => `
                <div class="combination-card">
                    <div class="hero-info">
                        <img src="images/heroes/${combo.hero.toLowerCase()}.jpg" alt="${combo.hero}">
                        <div>
                            <h3>${combo.hero}</h3>
                            <p>${combo.role}型铭文搭配</p>
                        </div>
                    </div>
                    <div class="runes-setup">
                        ${Object.entries(combo.runes).map(([color, runes]) => `
                            <div class="setup-group">
                                <h4>${getColorName(color)}铭文</h4>
                                <div class="rune-slots">
                                    ${runes.map(rune => `
                                        <div class="rune-slot">
                                            <img src="images/runes/${rune.toLowerCase()}.png" alt="${rune}">
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join('');
        }
    }

    // 获取铭文颜色中文名
    function getColorName(color) {
        const colorMap = {
            red: '红色',
            blue: '蓝色',
            green: '绿色'
        };
        return colorMap[color] || color;
    }

    // 初始化页面
    displayRunes(runesData);
    initializeRuneCombinations();
}); 