// ===== CẤU HÌNH =====
const SHEET_NAME = 'YeuCauHoTro';        // Tên sheet (tab) trong bảng tính
const FOLDER_NAME = 'ThoiTiet';          // Tên thư mục chứa bảng tính (không bắt buộc, có thể dùng ID)

// ===== HÀM NHẬN DỮ LIỆU TỪ WEB APP =====
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    // Lấy hoặc tạo sheet trong thư mục "ThoiTiet"
    const folder = DriveApp.getFoldersByName(FOLDER_NAME).next();
    const files = folder.getFilesByName(SHEET_NAME);
    let spreadsheet;
    if (files.hasNext()) {
      spreadsheet = SpreadsheetApp.open(files.next());
    } else {
      // Tạo mới nếu chưa tồn tại
      spreadsheet = SpreadsheetApp.create(SHEET_NAME);
      // Di chuyển vào thư mục
      const file = DriveApp.getFileById(spreadsheet.getId());
      folder.addFile(file);
      DriveApp.getRootFolder().removeFile(file);
      // Khởi tạo tiêu đề cột
      const sheet = spreadsheet.getActiveSheet();
      sheet.appendRow(['Thời gian', 'Họ tên', 'Địa chỉ', 'Số điện thoại', 'Nội dung']);
    }
    
    const sheet = spreadsheet.getActiveSheet();
    // Ghi dữ liệu
    sheet.appendRow([
      data.timestamp || new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }),
      data.name,
      data.address,
      data.phone,
      data.content
    ]);
    
    // Gửi email thông báo (tùy chọn)
    sendNotificationEmail(data);
    
    return ContentService.createTextOutput(JSON.stringify({ success: true }))
                         .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
                         .setMimeType(ContentService.MimeType.JSON);
  }
}

// ===== HÀM GỬI EMAIL THÔNG BÁO =====
function sendNotificationEmail(data) {
  const recipient = 'kysythacgian@gmail.com'; // Thay bằng email nhận thông báo
  const subject = '📩 Yêu cầu hỗ trợ mới từ Trung Bình A3';
  const body = `
    Có một yêu cầu hỗ trợ/góp ý mới:

    👤 Họ tên: ${data.name}
    📍 Địa chỉ: ${data.address}
    📞 Số điện thoại: ${data.phone}
    📝 Nội dung: ${data.content}
    🕒 Thời gian: ${data.timestamp || new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}

    Vui lòng xử lý sớm.
  `;
  MailApp.sendEmail(recipient, subject, body);
}

// ===== (TÙY CHỌN) HÀM KIỂM TRA KẾT NỐI =====
function doGet() {
  return ContentService.createTextOutput('Web App is running!');
}