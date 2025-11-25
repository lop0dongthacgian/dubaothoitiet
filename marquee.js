
// ============================
//  MARQUEE TRÊN
// ============================

const marqueeTop = document.getElementById("marqueeTop");

// Tạm dừng chạy để tránh giật lúc đầu
marqueeTop.stop();

marqueeTop.textContent =
    "Ngày 24/11/2025 Ban Chỉ đạo Phòng thủ dân sự quốc gia vừa ban hành công điện số 33/CĐ-BCĐ-BNNMT về việc ứng phó áp thấp nhiệt đới gần Biển Đông (xem nội dung phía dưới)";


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
// Tốc độ chạy
marqueeBottom.setAttribute("scrollamount", "10");
marqueeBottom.setAttribute("direction", "left");
