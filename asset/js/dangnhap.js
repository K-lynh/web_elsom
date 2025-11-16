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

// ======================== Xử lý khi người dùng nhấn nút "Đăng nhập" ========================
const form = document.querySelector(".phong"); // Form có class 'phong'

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Ngăn form tải lại trang

    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value.trim();

    // ========== Kiểm tra dữ liệu ==========
    if (!email || !password) {
      alert("❗ Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    // Lấy danh sách người dùng đã đăng kí từ localStorage
    // (Đây là dữ liệu từ trang đăng ký)
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Tìm người dùng có email và mật khẩu khớp
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!foundUser) {
      alert("⚠️ Email hoặc mật khẩu không đúng!");
      return;
    }

    // Lưu thông tin người dùng vừa đăng nhập vào localStorage
    // để các trang khác có thể biết ai đang đăng nhập
    localStorage.setItem("currentUser", JSON.stringify(foundUser));

    alert(`🎉 Đăng nhập thành công! Xin chào ${foundUser.username || "bạn"}!`);

    // **ĐIỀU HƯỚNG SANG TRANG CHỦ**
    // Từ dangnhap.html (trong Giaodien/) đến trangchu.html (cũng trong Giaodien/)
    window.location.href = "trangchu.html"; // <= Đã sửa đổi
  });
}

// ======================== Xử lý nút "Đăng kí" trên Header ========================
const signupButton = document.querySelector(".btn1.dk"); // Nút "Đăng kí" trên header

if (signupButton) {
  signupButton.addEventListener("click", () => {
    // Từ dangnhap.html (trong Giaodien/) đến dangki.html (cũng trong Giaodien/)
    window.location.href = "dangki.html"; // <= Đã sửa đổi
  });
}
