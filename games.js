document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.more-btn');

  buttons.forEach(btn => {
    // 找到包含更多內容的元素
    const moreContent = btn.nextElementSibling;
    
    btn.addEventListener('click', () => {
      if (moreContent.style.display === 'none' || moreContent.style.display === '') {
        moreContent.style.display = 'block';
        btn.textContent = '收起內容';
      } else {
        moreContent.style.display = 'none';
        btn.textContent = '顯示更多';
      }
    });
  });
});

// 回到最上方按鈕功能
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (document.documentElement.scrollTop > 300) {
    backToTopBtn.style.display = 'block';
  } else {
    backToTopBtn.style.display = 'none';
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});