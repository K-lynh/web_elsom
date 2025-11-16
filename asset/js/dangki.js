// ======================== Ẩn / Hiện mật khẩu ========================
const eyeIcon = document.querySelector(".fa-eye");
const passwordInput = document.querySelector("#password");

if (eyeIcon && passwordInput) {
  eyeIcon.addEventListener("click", () => {
    const isHidden = passwordInput.getAttribute("type") === "password";
    passwordInput.setAttribute("type", isHidden ? "text" : "password");
    eyeIcon.classList.toggle("fa-eye-slash");
  });
}

// ======================== Xử lý khi người dùng nhấn nút "Đăng kí" ========================
const form = document.querySelector(".phong"); // Form có class 'phong'

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Ngăn form tải lại trang

    const username = document.querySelector("#tdn").value.trim(); // Tên đăng nhập
    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value.trim();

    // ========== Kiểm tra dữ liệu ==========
    if (!username || !email || !password) {
      alert("❗ Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    // Lấy danh sách người dùng đã đăng kí từ localStorage
    // hoặc khởi tạo mảng rỗng nếu chưa có
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Kiểm tra xem email đã tồn tại chưa
    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      alert("⚠️ Email này đã được đăng kí. Vui lòng sử dụng email khác!");
      return;
    }

    // Tạo đối tượng người dùng mới
    const newUser = {
      username: username,
      email: email,
      password: password,
      // Bạn có thể thêm các trường khác nếu cần, ví dụ: id, vai trò...
    };

    // Thêm người dùng mới vào danh sách
    users.push(newUser);

    // Lưu danh sách người dùng đã cập nhật vào localStorage
    localStorage.setItem("users", JSON.stringify(users));

    // Lưu thông tin người dùng vừa đăng ký thành công vào currentUser
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    alert(`🎉 Đăng kí thành công! Chào mừng ${username} đến với Elsom!`);

    // **ĐIỀU CHỈNH ĐƯỜNG DẪN ĐẾN TRANG CHỦ TẠI ĐÂY**
    // Vì dangki.html và trangchu.html nằm cùng cấp trong thư mục Giaodien,
    // chỉ cần dùng tên file là đủ.
    window.location.href = "trangchu.html"; // <= Đã sửa đổi
  });
}

// ======================== Xử lý nút "Đăng nhập" trên Header ========================
const loginButton = document.querySelector(".btn1.dn"); // Nút "Đăng nhập" trên header

if (loginButton) {
  loginButton.addEventListener("click", () => {
    // Từ dangki.html (trong Giaodien/) đến dangnhap.html (trong Giaodien/)
    window.location.href = "dangnhap.html";
  });
}

// ======================== Xử lý nút "Đăng kí" trên Header (nút này là chính trang hiện tại) ========================
const signupButton = document.querySelector(".btn1.dk"); // Nút "Đăng kí" trên header

if (signupButton) {
  signupButton.addEventListener("click", () => {
    console.log("Đã ở trang Đăng kí.");
    // Hoặc bạn có thể thêm: window.location.href = "dangki.html"; để tải lại trang
  });
}
