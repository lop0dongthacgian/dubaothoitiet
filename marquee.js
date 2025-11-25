// ============================
//  MARQUEE CHỮ + CSS TỐI ƯU
// ============================

// Tạo hàm áp dụng CSS vào marquee
function applyMarqueeStyle(el, { color, maxSize, minSize, vw, border }) {
    Object.assign(el.style, {
        display: "block",
        color: color,
        fontWeight: "bold",
        fontSize: `clamp(${minSize}px, ${vw}vw, ${maxSize}px)`,
        textShadow: "1px 1px 1px rgba(0,0,0,0.9)",
        margin: "5px 0 8px 0",
        whiteSpace: "nowrap",
        padding: border ? "2px 0" : "0",
        borderTop: border ? "1px solid red" : "none",
        borderBottom: border ? "1px solid red" : "none"
    });
}

// ============================
//  MARQUEE TRÊN
// ============================

const marqueeTop = document.getElementById("marqueeTop");

// Tạm dừng chạy để tránh giật lúc đầu
marqueeTop.stop();

marqueeTop.textContent =
    "Ngày 24/11/2025 Ban Chỉ đạo Phòng thủ dân sự quốc gia vừa ban hành công điện số 33/CĐ-BCĐ-BNNMT về việc ứng phó áp thấp nhiệt đới gần Biển Đông (xem nội dung phía dưới)";

// Áp dụng CSS
applyMarqueeStyle(marqueeTop, {
    color: "#FFFF00",
    minSize: 16,
    maxSize: 26,
    vw: 3.5,
    border: false
});

// Tốc độ chạy
marqueeTop.setAttribute("scrollamount", "15");
marqueeTop.setAttribute("direction", "left");

// Khởi động lại sau khi đã set nội dung + CSS
setTimeout(() => marqueeTop.start(), 50);
// ============================
//  MARQUEE DƯỚI
// ============================

const marqueeBottom = document.getElementById("marqueeBottom");

marqueeBottom.textContent =
    "Hãy cùng nhau chủ động phòng chống bão, lũ — giữ an toàn cho gia đình và cộng đồng!";

// Áp dụng CSS
applyMarqueeStyle(marqueeBottom, {
    color: "#FF0000",
    minSize: 18,
    maxSize: 35,
    vw: 4.5,
    border: true
});

// Tốc độ chạy
marqueeBottom.setAttribute("scrollamount", "15");
marqueeBottom.setAttribute("direction", "left");