document.addEventListener('DOMContentLoaded', () => {
    
    const gallery = document.getElementById('gallery');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const imageItems = document.querySelectorAll('.image-item');
    
    
    const getItemWidth = () => {
        const firstItem = imageItems[0];
        const itemStyle = window.getComputedStyle(firstItem);
        const itemWidth = firstItem.offsetWidth;
        const itemMarginRight = parseFloat(itemStyle.marginRight) || 0;
        
        return itemWidth + itemMarginRight;
    };
    
    
    const scrollToImage = (index) => {
        const itemWidth = getItemWidth();
        gallery.scrollTo({
            left: index * itemWidth,
            behavior: 'smooth'
        });
    };
    
    
    nextBtn.addEventListener('click', () => {
        const itemWidth = getItemWidth();
        const scrollPosition = gallery.scrollLeft;
        const visibleWidth = gallery.clientWidth;
        
        
        const nextPosition = scrollPosition + visibleWidth;
        
        
        if (scrollPosition + visibleWidth >= gallery.scrollWidth - 50) {
            gallery.scrollTo({
                left: 0,
                behavior: 'smooth'
            });
        } else {
            gallery.scrollTo({
                left: nextPosition,
                behavior: 'smooth'
            });
        }
    });
    
   
    prevBtn.addEventListener('click', () => {
        const itemWidth = getItemWidth();
        const scrollPosition = gallery.scrollLeft;
        const visibleWidth = gallery.clientWidth;
        
        
        const prevPosition = scrollPosition - visibleWidth;
        
        
        if (scrollPosition <= 50) {
            gallery.scrollTo({
                left: gallery.scrollWidth,
                behavior: 'smooth'
            });
        } else {
            gallery.scrollTo({
                left: prevPosition,
                behavior: 'smooth'
            });
        }
    });
    
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            nextBtn.click();
        } else if (e.key === 'ArrowLeft') {
            prevBtn.click();
        }
    });
    
    
    let touchStartX = 0;
    let touchEndX = 0;
    
    gallery.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    gallery.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    const handleSwipe = () => {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            
            nextBtn.click();
        } else if (touchEndX > touchStartX + swipeThreshold) {
            
            prevBtn.click();
        }
    };
    
    
    scrollToImage(0);
});