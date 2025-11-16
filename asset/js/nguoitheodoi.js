document.addEventListener("DOMContentLoaded", function () {
  // 1. Chức năng cho nút "Đóng" (`.dong`)
  const closeButton = document.querySelector(".noidung .dong");
  if (closeButton) {
    closeButton.addEventListener("click", function () {
      // Quay lại trang trước đó trong lịch sử trình duyệt
      // Hoặc chuyển hướng đến một trang cụ thể, ví dụ: trang cá nhân
      window.history.back(); // Quay lại trang trước đó
      // Hoặc: window.location.href = "trangcanhan.html";
    });
  }

  // 2. Chức năng cho các nút "Theo dõi" / "Đang theo dõi"
  // Lắng nghe sự kiện click trên toàn bộ container 'nguoitheodoi' để xử lý động
  const followerList = document.querySelector(".nguoitheodoi");

  if (followerList) {
    followerList.addEventListener("click", function (event) {
      const clickedButton = event.target.closest(".ntd_theodoi1, .ntd_theodoi");

      if (clickedButton) {
        if (clickedButton.classList.contains("ntd_theodoi1")) {
          // Nếu đang là "Theo dõi" (màu xanh) -> chuyển thành "Đang theo dõi" (màu xám)
          clickedButton.classList.remove("ntd_theodoi1");
          clickedButton.classList.add("ntd_theodoi");
          clickedButton.textContent = "Đang theo dõi";
          alert("Bạn đã theo dõi người này!");
          // Ở đây bạn có thể gửi AJAX request lên server để cập nhật trạng thái theo dõi
        } else if (clickedButton.classList.contains("ntd_theodoi")) {
          // Nếu đang là "Đang theo dõi" (màu xám) -> chuyển thành "Theo dõi" (màu xanh)
          const confirmUnfollow = confirm(
            "Bạn có chắc chắn muốn bỏ theo dõi người này?"
          );
          if (confirmUnfollow) {
            clickedButton.classList.remove("ntd_theodoi");
            clickedButton.classList.add("ntd_theodoi1");
            clickedButton.textContent = "Theo dõi";
            alert("Bạn đã bỏ theo dõi người này.");
            // Ở đây bạn có thể gửi AJAX request lên server để cập nhật trạng thái bỏ theo dõi
          }
        }
      }
    });
  }

  // 3. (Tùy chọn) Cuộn lên đầu trang khi tải
  // window.scrollTo(0, 0); // Đảm bảo trang luôn bắt đầu từ đầu
});
