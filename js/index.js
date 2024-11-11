document.addEventListener('DOMContentLoaded', function() {
    // 获取所有新闻标签和内容区域
    const newsTabs = document.querySelectorAll('.news-tabs .tab');
    const newsContents = document.querySelectorAll('.news-content');

    // 初始化显示第一个标签的内容
    newsContents[0].style.display = 'block';
    newsTabs[0].classList.add('active');

    // 为每个标签添加点击事件
    newsTabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            // 移除所有标签和内容的active类
            newsTabs.forEach(t => t.classList.remove('active'));
            newsContents.forEach(content => {
                content.style.display = 'none';
                content.classList.remove('active');
            });

            // 激活当前标签和内容
            tab.classList.add('active');
            newsContents[index].style.display = 'block';
            newsContents[index].classList.add('active');
        });
    });

    // 添加CSS样式
    const style = document.createElement('style');
    style.textContent = `
        .news-content {
            display: none;
        }
        .news-content.active {
            display: block;
            animation: fadeIn 0.3s ease;
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}); 