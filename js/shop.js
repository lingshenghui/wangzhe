document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const categoryTabs = document.querySelectorAll('.category-tabs .tab');
    const sortSelect = document.querySelector('.sort-by');
    const searchInput = document.querySelector('.search-box input');
    const productsGrid = document.querySelector('.products-grid');
    const cartSidebar = document.getElementById('cartSidebar');
    const closeCart = document.querySelector('.close-cart');
    const buyButtons = document.querySelectorAll('.buy-btn');

    // 商品数据
    const products = [
        {
            id: 1,
            name: '李白-凤求凰',
            description: '传说品质 特效皮肤',
            price: 788,
            originalPrice: 888,
            discount: 11,
            image: './img/李白-凤求凰.webp',
            category: 'skins',
            tag: '新品'
        },
        {
            id: 2,
            name: '妲己-女仆咖啡',
            description: '史诗品质 特效皮肤',
            price: 468,
            originalPrice: 648,
            discount: 15,
            image: './img/妲己-女仆咖啡.webp',
            category: 'skins',
            tag: '热销'
        },
        // 英雄分类商品
        {
            id: 3,
            name: '云缨',
            description: '新英雄特惠',
            price: 5888,
            originalPrice: 6888,
            discount: 20,
            image: './img/云缨.webp',
            category: 'heroes',
            tag: '新英雄'
        },
        // 礼包分类商品
        {
            id: 4,
            name: '超值礼包',
            description: '含限定皮肤+英雄',
            price: 1288,
            originalPrice: 1688,
            discount: 25,
            image: './img/超值礼包.webp',
            category: 'gifts',
            tag: '限时'
        },
        {
            id: 5,
            name: '新手大礼包',
            description: '含多个热门英雄',
            price: 998,
            originalPrice: 1288,
            discount: 30,
            image: './img/新手大礼包.webp',
            category: 'gifts',
            tag: '特惠'
        },
        // 周边分类商品
        {
            id: 6,
            name: '王者荣耀手办',
            description: '李白凤求凰手办',
            price: 299,
            originalPrice: 399,
            discount: 10,
            image: './img/王者荣耀T恤.webp',
            category: 'merch',
            tag: '新品'
        },
        {
            id: 7,
            name: '王者荣耀T恤',
            description: '官方正版周边',
            price: 128,
            originalPrice: 168,
            discount: 15,
            image: './img/王者荣耀T恤.webp',
            category: 'merch',
            tag: '热卖'
        }
    ];

    // 购物车数据
    let cart = [];

    // 分类切换
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            categoryTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            filterProducts(this.dataset.category);
        });
    });

    // 排序功能
    sortSelect.addEventListener('change', function() {
        sortProducts(this.value);
    });

    // 搜索功能
    let searchTimeout;
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            searchProducts(this.value);
        }, 300);
    });

    // 购买按钮点击事件
    buyButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = this.closest('.product-card').dataset.id;
            addToCart(productId);
        });
    });

    // 关闭购物车
    closeCart.addEventListener('click', function() {
        cartSidebar.classList.remove('active');
    });

    // 筛选商品
    function filterProducts(category) {
        const filteredProducts = category === 'all' 
            ? products 
            : products.filter(product => product.category === category);
        
        displayProducts(filteredProducts);
    }

    // 排序商品
    function sortProducts(sortType) {
        let sortedProducts = [...products];
        switch(sortType) {
            case 'price-asc':
                sortedProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                sortedProducts.sort((a, b) => b.price - a.price);
                break;
            case 'new':
                sortedProducts.sort((a, b) => b.id - a.id);
                break;
            case 'popular':
                sortedProducts.sort((a, b) => b.sales - a.sales);
                break;
        }
        displayProducts(sortedProducts);
    }

    // 搜索商品
    function searchProducts(keyword) {
        const searchResults = products.filter(product => 
            product.name.toLowerCase().includes(keyword.toLowerCase()) ||
            product.description.toLowerCase().includes(keyword.toLowerCase())
        );
        displayProducts(searchResults);
    }

    // 显示商品
    function displayProducts(products) {
        productsGrid.innerHTML = products.map(product => `
            <div class="product-card" data-id="${product.id}" data-category="${product.category}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                    ${product.tag ? `<div class="product-tag">${product.tag}</div>` : ''}
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="product-desc">${product.description}</p>
                    <div class="product-price">
                        <span class="current-price">${product.price}</span>
                        <span class="original-price">¥${product.originalPrice}</span>
                        <span class="discount">-${product.discount}%</span>
                    </div>
                    <button class="buy-btn">购买</button>
                </div>
            </div>
        `).join('');

        // 重新绑定购买按钮事件
        bindBuyButtons();
    }

    // 添加到购物车
    function addToCart(productId) {
        const product = products.find(p => p.id === parseInt(productId));
        if (product) {
            const existingItem = cart.find(item => item.id === product.id);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({
                    ...product,
                    quantity: 1
                });
            }
            updateCart();
            showCartSidebar();
        }
    }

    // 更新购物车显示
    function updateCart() {
        const cartItems = document.querySelector('.cart-items');
        const total = document.querySelector('.total span');

        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="item-info">
                    <h4>${item.name}</h4>
                    <div class="item-price">¥${item.price}</div>
                </div>
                <div class="item-quantity">
                    <button class="quantity-btn minus">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn plus">+</button>
                </div>
                <button class="remove-item">&times;</button>
            </div>
        `).join('');

        // 计算总价
        const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        total.textContent = `¥${totalPrice}`;

        // 绑定购物车内按钮事件
        bindCartEvents();
    }

    // 显示购物车侧边栏
    function showCartSidebar() {
        cartSidebar.classList.add('active');
    }

    // 绑定购买按钮事件
    function bindBuyButtons() {
        document.querySelectorAll('.buy-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const productId = this.closest('.product-card').dataset.id;
                addToCart(productId);
            });
        });
    }

    // 绑定购物车内按钮事件
    function bindCartEvents() {
        // 数量增减按钮
        document.querySelectorAll('.quantity-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const itemId = this.closest('.cart-item').dataset.id;
                const item = cart.find(i => i.id === parseInt(itemId));
                if (this.classList.contains('plus')) {
                    item.quantity++;
                } else if (this.classList.contains('minus') && item.quantity > 1) {
                    item.quantity--;
                }
                updateCart();
            });
        });

        // 删除按钮
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', function() {
                const itemId = this.closest('.cart-item').dataset.id;
                cart = cart.filter(item => item.id !== parseInt(itemId));
                updateCart();
            });
        });
    }

    // 初始化显示
    displayProducts(products);

    // 倒计时功能
    function updateCountdown() {
        const countdowns = document.querySelectorAll('.countdown');
        countdowns.forEach(countdown => {
            // 实现倒计时逻辑
        });
    }

    // 定时更新倒计时
    setInterval(updateCountdown, 1000);
}); 