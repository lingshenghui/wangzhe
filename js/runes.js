document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const categoryTabs = document.querySelectorAll('.category-tabs .tab');
    const searchInput = document.querySelector('.search-box input');
    const runesGrid = document.querySelector('.runes-grid');

    // 铭文数据
    const runesData = [
        // 红色铭文
        {
            id: 1,
            name: '暴击铭文',
            effect: '物理暴击率 +2%',
            type: 'red',
            level: 5,
            icon: 'https://game.gtimg.cn/images/yxzj/img201606/mingwen/1501.png'
        },
        {
            id: 2,
            name: '穿透铭文',
            effect: '物理穿透 +10',
            type: 'red',
            level: 5,
            icon: 'https://game.gtimg.cn/images/yxzj/img201606/mingwen/1501.png'
        },
        // 蓝色铭文
        {
            id: 3,
            name: '攻速铭文',
            effect: '攻击速度 +2.5%',
            type: 'blue',
            level: 4,
            icon: 'https://game.gtimg.cn/images/yxzj/img201606/mingwen/1501.png'
        },
        {
            id: 4,
            name: '冷却铭文',
            effect: '冷却缩减 +1%',
            type: 'blue',
            level: 4,
            icon: 'https://game.gtimg.cn/images/yxzj/img201606/mingwen/1503.png'
        },
        // 绿色铭文
        {
            id: 5,
            name: '生命铭文',
            effect: '最大生命值 +200',
            type: 'green',
            level: 5,
            icon: 'https://game.gtimg.cn/images/yxzj/img201606/mingwen/1503.png'
        },
        {
            id: 6,
            name: '移速铭文',
            effect: '移动速度 +1%',
            type: 'green',
            level: 4,
            icon: 'https://game.gtimg.cn/images/yxzj/img201606/mingwen/1504.png'
        }
    ];

    // 分类切换功能
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            categoryTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const type = this.dataset.type;
            filterRunes(type);
        });
    });

    // 筛选铭文函数
    function filterRunes(type) {
        const filteredRunes = type === 'all' 
            ? runesData 
            : runesData.filter(rune => rune.type === type);
        
        displayRunes(filteredRunes);
    }

    // 显示铭文函数
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

    // 搜索功能
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const filteredRunes = runesData.filter(rune => 
            rune.name.toLowerCase().includes(searchTerm) ||
            rune.effect.toLowerCase().includes(searchTerm)
        );
        displayRunes(filteredRunes);
    });

    // 初始化显示所有铭文
    displayRunes(runesData);
}); 