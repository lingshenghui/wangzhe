document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const rememberCheckbox = document.querySelector('input[type="checkbox"]');

    // 页面加载时检查是否有保存的登录信息
    checkSavedCredentials();

    // 表单提交处理
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 获取输入值
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        
        // 表单验证
        if (!validateForm(username, password)) {
            return;
        }

        // 保存登录信息（如果选中"记住密码"）
        if (rememberCheckbox.checked) {
            saveCredentials(username, password);
        } else {
            clearSavedCredentials();
        }

        // 模拟登录请求
        simulateLogin(username, password);
    });

    // 表单验证函数
    function validateForm(username, password) {
        // 重置错误样式
        usernameInput.style.borderColor = '';
        passwordInput.style.borderColor = '';

        let isValid = true;

        if (username === '') {
            showError(usernameInput, '请输入用户名');
            isValid = false;
        } else if (username.length < 3) {
            showError(usernameInput, '用户名至少3个字符');
            isValid = false;
        }

        if (password === '') {
            showError(passwordInput, '请输入密码');
            isValid = false;
        } else if (password.length < 6) {
            showError(passwordInput, '密码至少6个字符');
            isValid = false;
        }

        return isValid;
    }

    // 显示错误提示
    function showError(input, message) {
        input.style.borderColor = '#ff4d4d';
        
        // 创建或更新错误提示
        let errorDiv = input.parentElement.querySelector('.error-message');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            input.parentElement.appendChild(errorDiv);
        }
        errorDiv.textContent = message;
        errorDiv.style.color = '#ff4d4d';
        errorDiv.style.fontSize = '12px';
        errorDiv.style.marginTop = '5px';
        errorDiv.style.marginLeft = '20px';
    }

    // 保存登录信息
    function saveCredentials(username, password) {
        localStorage.setItem('savedUsername', username);
        localStorage.setItem('savedPassword', btoa(password)); // 简单加密
    }

    // 清除保存的登录信息
    function clearSavedCredentials() {
        localStorage.removeItem('savedUsername');
        localStorage.removeItem('savedPassword');
    }

    // 检查是否有保存的登录信息
    function checkSavedCredentials() {
        const savedUsername = localStorage.getItem('savedUsername');
        const savedPassword = localStorage.getItem('savedPassword');

        if (savedUsername && savedPassword) {
            usernameInput.value = savedUsername;
            passwordInput.value = atob(savedPassword); // 简单解密
            rememberCheckbox.checked = true;
        }
    }

    // 模拟登录请求
    function simulateLogin(username, password) {
        // 添加加载动画
        const button = loginForm.querySelector('button');
        const originalText = button.textContent;
        button.disabled = true;
        button.innerHTML = '<span class="loading">登录中...</span>';

        // 模拟API请求延迟
        setTimeout(() => {
            // 这里应该是真实的API请求
            // 现在只是模拟登录成功
            if (username === "admin" && password === "123456") {
                showSuccessMessage('登录成功！正在跳转...');
                setTimeout(() => {
                    window.location.href = 'index.html'; // 跳转到主页
                }, 1500);
            } else {
                showError(passwordInput, '用户名或密码错误');
                button.disabled = false;
                button.textContent = originalText;
            }
        }, 1500);
    }

    // 显示成功消息
    function showSuccessMessage(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        successDiv.style.color = '#4CAF50';
        successDiv.style.textAlign = 'center';
        successDiv.style.marginTop = '10px';
        
        const registerLink = document.querySelector('.register-link');
        registerLink.parentElement.insertBefore(successDiv, registerLink);
    }

    // 输入框获得焦点时清除错误提示
    [usernameInput, passwordInput].forEach(input => {
        input.addEventListener('focus', function() {
            this.style.borderColor = '';
            const errorDiv = this.parentElement.querySelector('.error-message');
            if (errorDiv) {
                errorDiv.remove();
            }
        });
    });
});

// 添加必要的CSS
const style = document.createElement('style');
style.textContent = `
    .loading {
        display: inline-block;
        position: relative;
    }
    .loading:after {
        content: '...';
        position: absolute;
        animation: dots 1.5s steps(4, end) infinite;
    }
    @keyframes dots {
        0%, 20% { content: ''; }
        40% { content: '.'; }
        60% { content: '..'; }
        80% { content: '...'; }
    }
`;
document.head.appendChild(style); 