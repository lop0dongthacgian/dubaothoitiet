// ===============================================
// CẤU HÌNH CHỮ CHẠY (MARQUEE)
// ===============================================
// Bạn có thể dễ dàng cập nhật nội dung chữ chạy tại đây

const marqueeConfig = {
    // Chữ chạy phía trên (màu vàng)
    topMarquee: {
        text: "Khoảng chiều và đêm 24/11/2025, không khí lạnh sẽ ảnh hưởng đến khu vực Đông Bắc Bộ và Bắc Trung Bộ; sau đó ảnh hưởng đến khu vực Tây Bắc Bộ và Trung Trung Bộ",
        color: "#FFFF00",
        fontSize: "25px",
        speed: 15
    },
    
    // Chữ chạy phía dưới (màu đỏ)
    bottomMarquee: {
        text: "Hãy cùng nhau chủ động phòng chống bão, lũ giữ an toàn cho gia đình và cộng đồng!",
        color: "#FF0000",
        fontSize: "35px",
        speed: 15
    }
};

// ===============================================
// KHỞI TẠO CHỮ CHẠY
// ===============================================
function initMarquee() {
    // Tạo chữ chạy trên
    const topMarqueeHTML = `
        <marquee class="marquee-text1" behavior="scroll" direction="left" scrollamount="${marqueeConfig.topMarquee.speed}">
            ${marqueeConfig.topMarquee.text}
        </marquee>
    `;
    
    // Tạo chữ chạy dưới
    const bottomMarqueeHTML = `
        <marquee class="marquee-text" behavior="scroll" direction="left" scrollamount="${marqueeConfig.bottomMarquee.speed}">
            ${marqueeConfig.bottomMarquee.text}
        </marquee>
    `;
    
    // Chèn chữ chạy trên vào sau header
    const header = document.querySelector('.header');
    if (header) {
        header.insertAdjacentHTML('afterend', topMarqueeHTML);
    }
    
    // Chèn chữ chạy dưới vào trước footer
    const footer = document.querySelector('.footer');
    if (footer) {
        footer.insertAdjacentHTML('beforebegin', bottomMarqueeHTML);
    }
    
    // Áp dụng CSS động
    applyMarqueeStyles();
}

// ===============================================
// ÁP DỤNG CSS CHO CHỮ CHẠY
// ===============================================
function applyMarqueeStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* Chữ chạy phía dưới (màu đỏ) */
        .marquee-text {
            color: ${marqueeConfig.bottomMarquee.color};
            font-weight: bold;
            font-size: ${marqueeConfig.bottomMarquee.fontSize};
            text-shadow: 1px 1px 1px rgba(0,0,0,0.9);
            margin: 5px 0 8px 0;
            border-top: 1px solid red;
            border-bottom: 1px solid red;
            padding: 0px 0;
        }
        
        /* Chữ chạy phía trên (màu vàng) */
        .marquee-text1 {
            color: ${marqueeConfig.topMarquee.color};
            font-weight: bold;
            font-size: ${marqueeConfig.topMarquee.fontSize};
            text-shadow: 1px 1px 1px rgba(0,0,0,0.9);
            margin: 5px 0 8px 0;
        }
        
        /* Responsive cho điện thoại */
        @media (max-width: 768px) {
            .marquee-text {
                font-size: 26px;
                margin: 3px 0 6px 0;
                padding: 2px 0;
            }
            
            .marquee-text1 {
                font-size: 20px;
            }
        }
    `;
    document.head.appendChild(style);
}

// Khởi chạy khi trang đã load xong
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMarquee);
} else {
    initMarquee();
}
