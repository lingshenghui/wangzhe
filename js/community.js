document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const tabs = document.querySelectorAll('.tab');
    const sortSelect = document.querySelector('.sort-by');
    const postBtn = document.querySelector('.post-btn');
    const modal = document.querySelector('.post-modal');
    const closeModal = document.querySelector('.close-modal');
    const postForm = document.getElementById('postForm');
    const followBtns = document.querySelectorAll('.follow-btn');
    const contentGrid = document.querySelector('.content-grid');

    // 模拟内容数据
    const contentData = [
        {
            id: 1,
            user: {
                name: '王者玩家',
                avatar: './img/后羿.webp'
            },
            time: '2小时前',
            content: '分享一波五杀操作，这波团战配合太完美了！',
            media: './img/进阶.webp',
            tags: ['精彩操作', '团战'],
            likes: 2500,
            comments: 328,
            type: 'video'
        },
        // 更多内容数据...
    ];

    // 标签切换功能
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            filterContent(this.dataset.type);
        });
    });

    // 排序功能
    sortSelect.addEventListener('change', function() {
        sortContent(this.value);
    });

    // 发布按钮点击事件
    postBtn.addEventListener('click', function() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });

    // 关闭弹窗
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // 点击弹窗外部关闭
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // 发布表单提交
    postForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // 获取表单数据
        const formData = new FormData(this);
        // 模拟发布请求
        submitPost(formData);
    });

    // 关注按钮点击事件
    followBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            toggleFollow(this);
        });
    });

    // 筛选内容
    function filterContent(type) {
        const filteredContent = type === 'all' 
            ? contentData 
            : contentData.filter(item => item.type === type);
        
        displayContent(filteredContent);
    }

    // 排序内容
    function sortContent(sortType) {
        let sortedContent = [...contentData];
        switch(sortType) {
            case 'hot':
                sortedContent.sort((a, b) => b.likes - a.likes);
                break;
            case 'new':
                sortedContent.sort((a, b) => new Date(b.time) - new Date(a.time));
                break;
            case 'trending':
                sortedContent.sort((a, b) => (b.likes / b.time) - (a.likes / a.time));
                break;
        }
        displayContent(sortedContent);
    }

    // 显示内容
    function displayContent(content) {
        contentGrid.innerHTML = content.map(item => `
            <div class="content-card" data-type="${item.type}">
                <div class="card-header">
                    <div class="user">
                        <img src="${item.user.avatar}" alt="${item.user.name}">
                        <div class="user-info">
                            <h4>${item.user.name}</h4>
                            <span>${item.time}</span>
                        </div>
                    </div>
                    <button class="follow-btn">关注</button>
                </div>
                <div class="card-content">
                    <p>${item.content}</p>
                    <div class="media-grid">
                        <img src="${item.media}" alt="内容图片">
                    </div>
                    <div class="tags">
                        ${item.tags.map(tag => `<span>#${tag}</span>`).join('')}
                    </div>
                </div>
                <div class="card-actions">
                    <button class="like-btn">
                        <i class="far fa-heart"></i> ${item.likes}
                    </button>
                    <button>
                        <i class="far fa-comment"></i> ${item.comments}
                    </button>
                    <button>
                        <i class="far fa-share-square"></i> 分享
                    </button>
                </div>
            </div>
        `).join('');

        // 重新绑定事件
        bindEvents();
    }

    // 提交发布
    function submitPost(formData) {
        // 模拟发布请求
        console.log('发布内容:', formData);
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        postForm.reset();
        // 显示成功提示
        showToast('发布成功！');
    }

    // 切换关注状态
    function toggleFollow(btn) {
        btn.classList.toggle('following');
        btn.textContent = btn.classList.contains('following') ? '已关注' : '关注';
    }

    // 绑定事件
    function bindEvents() {
        // 重新绑定关注按钮事件
        document.querySelectorAll('.follow-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                toggleFollow(this);
            });
        });

        // 绑定点赞事件
        document.querySelectorAll('.like-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                toggleLike(this);
            });
        });
    }

    // 切换点赞状态
    function toggleLike(btn) {
        const icon = btn.querySelector('i');
        icon.classList.toggle('fas');
        icon.classList.toggle('far');
        const count = parseInt(btn.textContent.trim());
        btn.innerHTML = `
            <i class="${icon.className}"></i> ${icon.classList.contains('fas') ? count + 1 : count - 1}
        `;
    }

    // 显示提示信息
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    // 初始化页面
    displayContent(contentData);
}); 