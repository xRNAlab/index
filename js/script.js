document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.createElement('button');
    menuBtn.innerHTML = '☰';
    menuBtn.className = 'mobile-menu-btn';
    document.querySelector('nav').prepend(menuBtn);

    menuBtn.addEventListener('click', function() {
        document.querySelector('nav ul').classList.toggle('show');
    });
});

// 添加点击卡片效果
document.querySelectorAll('.member-profile').forEach(card => {
    card.addEventListener('click', function() {
        // 切换激活状态
        this.classList.toggle('active');
        
        // 不需要同时展开多个卡片
        document.querySelectorAll('.member-profile').forEach(other => {
        if(other !== this) other.classList.remove('active')
     })
    });
});

//自动复制电话号码功能
function copyPhoneNumber(event) {
    // 阻止默认跳转行为
    event.preventDefault();
    
    // 复制电话号码
    const phoneNumber = '+86 0512-65886182';
    navigator.clipboard.writeText(phoneNumber)
        .then(() => {
            // 显示复制成功提示
            alert('电话号码已复制到剪贴板: ' + phoneNumber);
            // 跳转到拨号界面
            window.location.href = 'tel:+8651265886182';
        })
        .catch(err => {
            console.error('复制失败:', err);
            // 直接跳转作为备用方案
            window.location.href = 'tel:+8651265886182';
        });
        setTimeout(() => {
            window.location.href = 'tel:+8651265886182';
        }, 300);
}

//自动复制邮箱功能
function copyEmail(event) {
    // 阻止默认跳转行为
    event.preventDefault();
    
    // 复制邮箱地址
    const email = 'xucc@suda.edu.cn';
    navigator.clipboard.writeText(email)
        .then(() => {
            // 显示复制成功提示
            alert('邮箱地址已复制到剪贴板: ' + email);
            // 延迟跳转确保复制完成
            setTimeout(() => {
                window.location.href = 'https://mail.163.com/';
            }, 300);
        })
        .catch(err => {
            console.error('复制失败:', err);
            // 直接跳转作为备用方案
            window.location.href = 'https://mail.163.com/';
        });
        
}

//自动复制邮编功能
function copyZipCode(event) {
    // 阻止默认跳转行为
    event.preventDefault();

    // 邮编
    const zipCode = '215222';
    navigator.clipboard.writeText(zipCode)
      .then(() => {
            // 显示复制成功提示
            alert('邮编已复制到剪贴板: ' + zipCode);
            // 延迟跳转确保复制完成
            setTimeout(() => {
                window.location.href = 'https://www.ems.com.cn/';
            }, 300);
        })
      .catch(err => {
            console.error('复制失败:', err);
            // 直接跳转作为备用方案
            window.location.href = 'https://www.ems.com.cn/';
        });
}

//屏幕截图
document.addEventListener('DOMContentLoaded', function() {
    const takeScreenshotButton = document.getElementById('take-screenshot');
    if (takeScreenshotButton) {
        takeScreenshotButton.addEventListener('click', function(event) {
            event.preventDefault();

            // 获取背景图片元素
            const backgroundImage = document.getElementById('centered-background-image');
            // 隐藏背景图片
            if (backgroundImage) {
                backgroundImage.style.display = 'none';
            }

            // 获取页脚元素
            const footer = document.querySelector('footer');
            const originalStyle = {
                position: footer.style.position,
                bottom: footer.style.bottom,
                top: footer.style.top
            };

            // 临时修改页脚定位
            const docHeight = document.documentElement.scrollHeight;
            const footerHeight = footer.offsetHeight;
            footer.style.position = 'absolute';
            footer.style.bottom = 'auto';
            footer.style.top = (docHeight - footerHeight) + 'px';

            // 选择要截图的元素
            const elementToCapture = document.body;

            html2canvas(elementToCapture).then(function(canvas) {
                // 恢复原始样式
                footer.style.position = originalStyle.position;
                footer.style.bottom = originalStyle.bottom;
                footer.style.top = originalStyle.top;

                // 显示背景图片
                if (backgroundImage) {
                    backgroundImage.style.display = 'block';
                }

                // 创建下载链接
                const link = document.createElement('a');
                link.href = canvas.toDataURL('image/png');
                link.download = 'screenshot.png';
                link.click();
            });
        });
    }
});

// 搜索系统
// 在script.js中添加
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const searchButton = document.getElementById('searchButton');

    function performSearch() {
        const query = searchInput.value.toLowerCase();
        searchResults.innerHTML = '';
        
        if (!query) {
            searchResults.style.display = 'none';
            return;
        }

        const titles = document.querySelectorAll('.index-grid h2');
        let hasResults = false;

        titles.forEach(title => {
            if (title.textContent.toLowerCase().includes(query)) {
                const clone = title.cloneNode(true);
                const resultItem = document.createElement('div');
                resultItem.className = 'search-result-item';
                resultItem.appendChild(clone);
                resultItem.addEventListener('click', () => {
                    // 获取导航栏高度
                    const navHeight = document.querySelector('nav').offsetHeight;
                    
                    // 计算目标位置偏移
                    const targetPosition = title.getBoundingClientRect().top + window.pageYOffset;
                    
                    // 滚动到目标位置（带偏移）
                    window.scrollTo({
                        top: targetPosition - navHeight - 200, // 额外20px留空
                        behavior: 'smooth'
                    });
                
                    title.classList.add('highlight');
                    setTimeout(() => title.classList.remove('highlight'), 2000);
                });
                searchResults.appendChild(resultItem);
                hasResults = true;
            }
        });

        searchResults.style.display = hasResults ? 'block' : 'none';
    }

    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('input', performSearch);

    // 点击外部关闭搜索结果
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            searchResults.style.display = 'none';
        }
    });
});

