// ===== CẤU HÌNH =====
const SHEET_NAME = 'YeuCauHoTro';
const FOLDER_NAME = 'ThoiTiet';
const RECIPIENT_EMAIL = 'kysythacgian@gmail.com'; // Địa chỉ nhận thông báo

// ===== HÀM NHẬN DỮ LIỆU TỪ WEB APP =====
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    // Lấy hoặc tạo sheet trong thư mục "ThoiTiet"
    const folder = getOrCreateFolder(FOLDER_NAME);
    const spreadsheet = getOrCreateSpreadsheet(folder, SHEET_NAME);
    const sheet = spreadsheet.getActiveSheet();
    
    // Ghi dữ liệu
    const timestamp = data.timestamp || new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
    sheet.appendRow([
      timestamp,
      data.name,
      data.address,
      data.phone,
      data.content
    ]);
    
    // Gửi email thông báo (có bắt lỗi và ghi log)
    sendNotificationEmail(data, timestamp);
    
    return ContentService.createTextOutput(JSON.stringify({ success: true }))
                         .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    // Ghi lỗi vào log nếu cần
    logError('doPost', error);
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
                         .setMimeType(ContentService.MimeType.JSON);
  }
}

// ===== HÀM GỬI EMAIL (CÓ LOG) =====
function sendNotificationEmail(data, timestamp) {
  try {
    // Kiểm tra email người nhận
    if (!RECIPIENT_EMAIL || !RECIPIENT_EMAIL.includes('@')) {
      throw new Error('Email người nhận không hợp lệ: ' + RECIPIENT_EMAIL);
    }
    
    const subject = '📩 Yêu cầu hỗ trợ mới từ Trung Bình A3';
    const body = `
      Có một yêu cầu hỗ trợ/góp ý mới:

      👤 Họ tên: ${data.name || 'Không có'}
      📍 Địa chỉ: ${data.address || 'Không có'}
      📞 Số điện thoại: ${data.phone || 'Không có'}
      📝 Nội dung: ${data.content || 'Không có'}
      🕒 Thời gian: ${timestamp || 'Không xác định'}

      Vui lòng xử lý sớm.
    `;
    
    GmailApp.sendEmail(RECIPIENT_EMAIL, subject, body);
    
    // Ghi log thành công (tùy chọn)
    logEmailSuccess(data, timestamp);
  } catch (error) {
    // Ghi lỗi vào log để debug
    logError('sendNotificationEmail', error, data);
    // Ném lại lỗi để doPost biết (nhưng vẫn trả về success cho client)
  }
}

// ===== HÀM HỖ TRỢ: LẤY HOẶC TẠO THƯ MỤC =====
function getOrCreateFolder(folderName) {
  const folders = DriveApp.getFoldersByName(folderName);
  if (folders.hasNext()) return folders.next();
  return DriveApp.createFolder(folderName);
}

// ===== HÀM HỖ TRỢ: LẤY HOẶC TẠO BẢNG TÍNH =====
function getOrCreateSpreadsheet(folder, sheetName) {
  const files = folder.getFilesByName(sheetName);
  if (files.hasNext()) {
    return SpreadsheetApp.open(files.next());
  }
  const ss = SpreadsheetApp.create(sheetName);
  const file = DriveApp.getFileById(ss.getId());
  folder.addFile(file);
  DriveApp.getRootFolder().removeFile(file);
  // Tạo header
  const sheet = ss.getActiveSheet();
  sheet.appendRow(['Thời gian', 'Họ tên', 'Địa chỉ', 'Số điện thoại', 'Nội dung']);
  return ss;
}

// ===== HÀM GHI LOG LỖI =====
function logError(functionName, error, data) {
  try {
    const logSheet = getOrCreateLogSheet();
    logSheet.appendRow([
      new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }),
      functionName,
      error.toString(),
      data ? JSON.stringify(data) : ''
    ]);
  } catch (e) {
    // Không làm gì nếu không ghi log được
  }
}

// ===== HÀM GHI LOG THÀNH CÔNG (TÙY CHỌN) =====
function logEmailSuccess(data, timestamp) {
  try {
    const logSheet = getOrCreateLogSheet();
    logSheet.appendRow([
      new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }),
      'SUCCESS',
      'Email sent to ' + RECIPIENT_EMAIL,
      data ? data.name : ''
    ]);
  } catch (e) {}
}

// ===== TẠO SHEET LOG NẾU CHƯA CÓ =====
function getOrCreateLogSheet() {
  const folder = getOrCreateFolder(FOLDER_NAME);
  const files = folder.getFilesByName('EmailLog');
  let ss;
  if (files.hasNext()) {
    ss = SpreadsheetApp.open(files.next());
  } else {
    ss = SpreadsheetApp.create('EmailLog');
    const file = DriveApp.getFileById(ss.getId());
    folder.addFile(file);
    DriveApp.getRootFolder().removeFile(file);
    const sheet = ss.getActiveSheet();
    sheet.appendRow(['Thời gian', 'Trạng thái', 'Chi tiết', 'Dữ liệu']);
  }
  return ss.getActiveSheet();
}

// ===== HÀM KIỂM TRA =====
function doGet() {
  return ContentService.createTextOutput('Web App is running!');
}