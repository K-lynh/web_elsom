document.addEventListener("DOMContentLoaded", function () {
  // 1. Chức năng cho nút "Chỉnh sửa trang cá nhân"
  const editProfileButton = document.querySelector(".tcn_chinhsua");
  if (editProfileButton) {
    editProfileButton.addEventListener("click", function () {
      alert("Bạn đã click vào nút Chỉnh sửa trang cá nhân!");
      // Ở đây bạn có thể:
      // - Hiển thị một modal (popup) với form chỉnh sửa
      // - Chuyển hướng đến một trang chỉnh sửa hồ sơ riêng (ví dụ: window.location.href = "chinhsuatrangcanhan.html";)
      // - Thay đổi các phần tử trên trang để cho phép chỉnh sửa trực tiếp (inline editing)
    });
  }

  // 2. Chức năng cho nút "Tạo" (fa-plus)
  const createButton = document.querySelector(".tcn_tao");
  if (createButton) {
    createButton.addEventListener("click", function () {
      alert("Bạn đã click vào nút Tạo bài viết mới!");
      // Ở đây bạn có thể:
      // - Hiển thị một modal để đăng bài viết mới (ví dụ: upload ảnh, nhập caption)
      // - Chuyển hướng đến một trang tạo bài viết riêng
    });
  }

  // 3. Chức năng chuyển đổi tab bài viết (Bài viết, Đã lưu, Được gắn thẻ)
  const postsTab = document.querySelector(".main_top .fa-newspaper");
  const savedTab = document.querySelector(".main_top .fa-bookmark");
  const taggedTab = document.querySelector(".main_top .fa-user-tag");
  const postContainer = document.querySelector(".tcn_baidang");

  function displayPosts(type) {
    // Tạm thời, tôi sẽ chỉ thay đổi nội dung bằng text để minh họa.
    // Trong thực tế, bạn sẽ tải dữ liệu bài viết từ server và render chúng.
    if (postContainer) {
      let content = "";
      switch (type) {
        case "posts":
          content = `
                        <a href="#" class="tcn_anh"><img src="../asset/img/chinhsuabaiviet.png" alt=""></a>
                        <a href="#" class="tcn_anh"><img src="../asset/img/lala1.png" alt=""></a>
                        <a href="#" class="tcn_anh"><img src="../asset/img/hoahong.png" alt=""></a>
                        <a href="#" class="tcn_anh"><img src="../asset/img/lala2.png" alt=""></a>
                        <a href="#" class="tcn_anh"><img src="../asset/img/_ (20) 1.png" alt=""></a>
                    `; // Giữ nguyên các bài viết hiện tại
          break;
        case "saved":
          content = `
                        <p style="text-align: center; width: 100%; grid-column: 1 / -1; margin-top: 50px; font-size: 1.2em;">Chưa có bài viết nào được lưu.</p>
                        <!-- Trong thực tế, bạn sẽ tải ảnh/bài viết đã lưu -->
                    `;
          break;
        case "tagged":
          content = `
                        <p style="text-align: center; width: 100%; grid-column: 1 / -1; margin-top: 50px; font-size: 1.2em;">Chưa có bài viết nào được gắn thẻ.</p>
                        <!-- Trong thực tế, bạn sẽ tải ảnh/bài viết được gắn thẻ -->
                    `;
          break;
        default:
          content = `
                        <a href="#" class="tcn_anh"><img src="../asset/img/chinhsuabaiviet.png" alt=""></a>
                        <a href="#" class="tcn_anh"><img src="../asset/img/lala1.png" alt=""></a>
                        <a href="#" class="tcn_anh"><img src="../asset/img/hoahong.png" alt=""></a>
                        <a href="#" class="tcn_anh"><img src="../asset/img/lala2.png" alt=""></a>
                        <a href="#" class="tcn_anh"><img src="../asset/img/_ (20) 1.png" alt=""></a>
                    `;
      }
      postContainer.innerHTML = content;

      // Thêm/bỏ class 'active' cho icon để highlight tab đang chọn (cần CSS cho active state)
      [postsTab, savedTab, taggedTab].forEach((tab) =>
        tab.classList.remove("active")
      );
      if (type === "posts" && postsTab) postsTab.classList.add("active");
      if (type === "saved" && savedTab) savedTab.classList.add("active");
      if (type === "tagged" && taggedTab) taggedTab.classList.add("active");
    }
  }

  if (postsTab) {
    postsTab.addEventListener("click", () => displayPosts("posts"));
    postsTab.click(); // Hiển thị tab "Bài viết" mặc định khi tải trang
  }
  if (savedTab) {
    savedTab.addEventListener("click", () => displayPosts("saved"));
  }
  if (taggedTab) {
    taggedTab.addEventListener("click", () => displayPosts("tagged"));
  }

  // Tùy chọn: Để tab đang chọn có highlight rõ ràng hơn, bạn có thể thêm CSS như sau:
  // .main_top i.active {
  //     color: #007bff; /* Ví dụ: màu xanh */
  //     border-bottom: 2px solid #007bff;
  //     padding-bottom: 5px;
  // }
});
