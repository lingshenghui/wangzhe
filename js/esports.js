document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const scheduleTabs = document.querySelectorAll('.schedule-tabs .tab');
    const watchBtn = document.querySelector('.watch-btn');
    const highlightCards = document.querySelectorAll('.highlight-card');

    // 赛事数据
    const matchData = [
        {
            date: '4月10日 星期三',
            matches: [
                {
                    time: '19:30',
                    team1: 'ag',
                    team2: '亚瑟',
                    status: '未开始'
                },
                // 更多比赛数据
            ]
        },
        // 更多日期数据
    ];

    // 战队排名数据
    const rankingsData = [
        {
            rank: 1,
            team: 'ag',
            matches: 10,
            wins: 8,
            losses: 2,
            points: 24
        },
        // 更多排名数据
    ];

    // 初始化页面
    initializeSchedule();
    initializeRankings();

    // 赛事日程标签切换
    scheduleTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            scheduleTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            filterSchedule(this.textContent);
        });
    });

    // 观看直播按钮点击事件
    watchBtn.addEventListener('click', function() {
        // 实现直播跳转逻辑
        window.location.href = '#live-stream';
    });

    // 集锦视频点击事件
    highlightCards.forEach(card => {
        card.addEventListener('click', function() {
            playHighlight(this.dataset.videoId);
        });
    });

    // 初始化赛事日程
    function initializeSchedule() {
        const scheduleList = document.querySelector('.schedule-list');
        scheduleList.innerHTML = matchData.map(dateGroup => `
            <div class="date-group">
                <div class="date">${dateGroup.date}</div>
                <div class="matches">
                    ${dateGroup.matches.map(match => `
                        <div class="match-item">
                            <div class="match-time">${match.time}</div>
                            <div class="match-teams">
                                <span>${match.team1}</span>
                                <img src="./img/${match.team1.toLowerCase()}.webp" alt="${match.team1}">
                                <div class="score">VS</div>
                                <img src="./img/${match.team2.toLowerCase()}.webp" alt="${match.team2}">
                                <span>${match.team2}</span>
                            </div>
                            <div class="match-status">${match.status}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }

    // 初始化战队排名
    function initializeRankings() {
        const tableBody = document.querySelector('.table-body');
        tableBody.innerHTML = rankingsData.map(team => `
            <div class="row">
                <div class="rank">${team.rank}</div>
                <div class="team">
                    <img src="./img/${team.team.toLowerCase()}.webp" alt="${team.team}">
                    ${team.team}
                </div>
                <div class="matches">${team.matches}</div>
                <div class="wins">${team.wins}</div>
                <div class="losses">${team.losses}</div>
                <div class="points">${team.points}</div>
            </div>
        `).join('');
    }

    // 筛选赛事日程
    function filterSchedule(type) {
        // 实现赛事筛选逻辑
        const filteredData = type === '全部赛事' 
            ? matchData 
            : matchData.filter(date => {
                return date.matches.some(match => match.tournament === type);
            });
        
        // 更新显示
        initializeSchedule(filteredData);
    }

    // 播放集锦视频
    function playHighlight(videoId) {
        // 实现视频播放逻辑
        console.log(`Playing highlight video: ${videoId}`);
    }

    // 实时更新比赛状态
    function updateMatchStatus() {
        const matches = document.querySelectorAll('.match-item');
        matches.forEach(match => {
            const timeElement = match.querySelector('.match-time');
            const statusElement = match.querySelector('.match-status');
            const matchTime = timeElement.textContent;
            
            // 检查比赛时间并更新状态
            updateStatus(matchTime, statusElement);
        });
    }

    // 更新比赛状态
    function updateStatus(matchTime, statusElement) {
        const now = new Date();
        const matchDateTime = new Date();
        const [hours, minutes] = matchTime.split(':');
        matchDateTime.setHours(hours, minutes, 0);

        if (now > matchDateTime) {
            statusElement.textContent = '进行中';
            statusElement.style.background = '#ff6b00';
            statusElement.style.color = '#fff';
        }
    }

    // 定期更新比赛状态
    setInterval(updateMatchStatus, 60000);

    // 添加页面滚动效果
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.8)';
        }
    });

    // 初始化页面时执行一次状态更新
    updateMatchStatus();
}); 