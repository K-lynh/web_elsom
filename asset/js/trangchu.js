document.addEventListener("DOMContentLoaded", function () {
  // ======================== Kiểm tra trạng thái đăng nhập ========================
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser) {
    // Nếu không có người dùng nào đăng nhập, chuyển hướng về trang đăng nhập
    alert("Bạn cần đăng nhập để truy cập trang này!");
    window.location.href = "/Giaodien/dangnhap.html"; // Sử dụng đường dẫn tuyệt đối
    return; // Dừng việc thực thi script nếu chưa đăng nhập
  } else {
    // Hiển thị tên người dùng trên trang cá nhân hoặc các vị trí khác (nếu có)
    const usernameElement = document.querySelector(".btn_trangcanhan p.tc"); // Chỉnh sửa selector nếu cần
    if (usernameElement) {
      usernameElement.textContent = currentUser.username;
    }
    console.log(`Chào mừng ${currentUser.username} đã đăng nhập!`);
  }

  // ======================== Điều hướng các nút trong Sidebar ========================

  const logoHeader = document.querySelector(".logo_header .home"); // Nút Logo Header
  if (logoHeader) {
    logoHeader.addEventListener("click", () => {
      window.location.href = "/Giaodien/trangchu.html"; // Về trang chủ
    });
  }

  const btnTrangChu = document.querySelector(".btn_trangchu");
  if (btnTrangChu) {
    btnTrangChu.addEventListener("click", (e) => {
      e.preventDefault(); // Ngăn hành vi mặc định của thẻ <a>
      // Đã ở trang chủ, có thể không làm gì hoặc tải lại trang
      window.location.href = "/Giaodien/trangchu.html";
    });
  }

  const btnTinNhan = document.querySelector(".btn_tinnhan");
  if (btnTinNhan) {
    btnTinNhan.addEventListener("click", (e) => {
      e.preventDefault();
      // Chuyển đến trang Tin nhắn (giả định là tinnhan.html trong Giaodien/)
      window.location.href = "/Giaodien/tinnhan.html";
    });
  }

  const btnThongBao = document.querySelector(".btn_thongbao");
  if (btnThongBao) {
    btnThongBao.addEventListener("click", (e) => {
      e.preventDefault();
      // Chuyển đến trang Thông báo (giả định là thongbao.html trong Giaodien/)
      window.location.href = "/Giaodien/thongbao.html";
    });
  }

  const btnTrangCaNhan = document.querySelector(".btn_trangcanhan");
  if (btnTrangCaNhan) {
    btnTrangCaNhan.addEventListener("click", (e) => {
      e.preventDefault();
      // Chuyển đến trang Trang cá nhân (giả định là trangcanhan.html trong Giaodien/)
      window.location.href = "/Giaodien/trangcanhan.html";
    });
  }

  const btnDangXuat = document.querySelector(".btn_dangxuat");
  if (btnDangXuat) {
    btnDangXuat.addEventListener("click", (e) => {
      e.preventDefault();
      // Xóa thông tin người dùng đang đăng nhập khỏi localStorage
      localStorage.removeItem("currentUser");
      alert("Bạn đã đăng xuất thành công!");
      // Chuyển hướng về trang đăng nhập
      window.location.href = "/Giaodien/dangnhap.html";
    });
  }

  // ======================== Xử lý click vào các bài đăng ========================
  const postLinks = document.querySelectorAll(".post_trangchu a");

  postLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault(); // Ngăn thẻ <a> chuyển hướng mặc định

      // Lấy đường dẫn ảnh từ thẻ <img> bên trong thẻ <a>
      const imgElement = link.querySelector("img");
      const imageUrl = imgElement ? imgElement.src : null;

      if (imageUrl) {
        // Đây là nơi bạn sẽ điều hướng đến trang chi tiết bài viết
        // Giả định bạn có một trang "baiviet.html" để hiển thị chi tiết
        // và bạn truyền ID hoặc URL ảnh để trang đó tải nội dung
        console.log("Clicked post with image:", imageUrl);
        // Ví dụ: Lưu URL ảnh vào localStorage và chuyển hướng
        localStorage.setItem("currentPostImage", imageUrl);
        window.location.href = "/Giaodien/baivietnguoidung.html"; // Giả định baiviet.html cũng trong Giaodien/
      } else {
        console.log("Clicked a post link without an image source.");
      }
    });
  });

  // ======================== Chức năng tìm kiếm (Placeholder) ========================
  const searchInput = document.getElementById("tk");
  const searchIcon = document.querySelector(".tk .fa-magnifying-glass");

  if (searchInput && searchIcon) {
    searchIcon.addEventListener("click", () => {
      const searchTerm = searchInput.value.trim();
      if (searchTerm) {
        alert(`Bạn đang tìm kiếm: "${searchTerm}"`);
        // Thực hiện logic tìm kiếm ở đây (ví dụ: lọc các bài post, gửi request đến API, ...)
        console.log("Tìm kiếm:", searchTerm);
      } else {
        alert("Vui lòng nhập từ khóa tìm kiếm.");
      }
    });

    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        searchIcon.click(); // Kích hoạt sự kiện click của icon khi nhấn Enter
      }
    });
  }
});
