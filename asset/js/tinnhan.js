document.addEventListener("DOMContentLoaded", function () {
  // ======================== Kiểm tra trạng thái đăng nhập ========================
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser) {
    alert("Bạn cần đăng nhập để truy cập trang này!");
    window.location.href = "/Giaodien/dangnhap.html"; // Đường dẫn tuyệt đối
    return;
  } else {
    const usernameElement = document.querySelector(".btn_trangcanhan p.tc");
    if (usernameElement) {
      usernameElement.textContent = currentUser.username;
    }
    console.log(`Chào mừng ${currentUser.username} đến trang Tin nhắn!`);
  }

  // ======================== Điều hướng các nút trong Sidebar (Giống trang chủ) ========================

  const logoHeader = document.querySelector(".logo_header .home");
  if (logoHeader) {
    logoHeader.addEventListener("click", () => {
      window.location.href = "/Giaodien/trangchu.html";
    });
  }

  const btnTrangChu = document.querySelector(".btn_trangchu");
  if (btnTrangChu) {
    btnTrangChu.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "/Giaodien/trangchu.html";
    });
  }

  const btnTinNhan = document.querySelector(".btn_tinnhan");
  if (btnTinNhan) {
    btnTinNhan.addEventListener("click", (e) => {
      e.preventDefault();
      // Đã ở trang tin nhắn, có thể không làm gì hoặc tải lại trang
      window.location.href = "/Giaodien/tinnhan.html";
    });
  }

  const btnThongBao = document.querySelector(".btn_thongbao");
  if (btnThongBao) {
    btnThongBao.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "/Giaodien/thongbao.html";
    });
  }

  const btnTrangCaNhan = document.querySelector(".btn_trangcanhan");
  if (btnTrangCaNhan) {
    btnTrangCaNhan.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "/Giaodien/trangcanhan.html";
    });
  }

  const btnDangXuat = document.querySelector(".btn_dangxuat");
  if (btnDangXuat) {
    btnDangXuat.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("currentUser");
      alert("Bạn đã đăng xuất thành công!");
      window.location.href = "/Giaodien/dangnhap.html";
    });
  }

  // ======================== Xử lý chuyển đổi cuộc trò chuyện ========================
  const chatItems = document.querySelectorAll(".chat-item");
  const chatWindowHeaderImg = document.querySelector(
    ".chat-header .user-info img"
  );
  const chatWindowHeaderName = document.querySelector(
    ".chat-header .user-info h3"
  );
  const chatContent = document.querySelector(".chat-window .chat-content");

  // Giả định dữ liệu cuộc trò chuyện (có thể lấy từ API thực tế)
  const chatData = {
    "🎵LOOK AT ME🎵": {
      avatar: "https://i.pravatar.cc/50?img=4",
      messages: [
        { sender: "received", type: "text", content: "Mình gửi bạn ảnh nhé" },
        { sender: "received", type: "image", content: "../asset/img/nhan.png" },
        {
          sender: "sent",
          type: "text",
          content: "Oke b nha mình muốn mua cái nhẫn này",
        },
        {
          sender: "received",
          type: "text",
          content: "Dạ okie bae, qua tết ngày mai, ngày mốt mình gửi ship nha",
        },
      ],
    },
    "Hoàng Lan": {
      avatar: "https://i.pravatar.cc/50?img=2",
      messages: [
        {
          sender: "received",
          type: "text",
          content: "Chào bạn, bạn khỏe không?",
        },
        { sender: "sent", type: "text", content: "Mình khỏe, cảm ơn bạn!" },
        { sender: "received", type: "text", content: "Oke nhé" },
      ],
    },
    "Ngọc Quân": {
      avatar: "https://i.pravatar.cc/50?img=3",
      messages: [
        {
          sender: "received",
          type: "text",
          content: "Bạn đã nhận được tài liệu chưa?",
        },
        { sender: "sent", type: "text", content: "Chưa" },
      ],
    },
    "Dứa Concept 🍍": {
      avatar: "https://i.pravatar.cc/50?img=1",
      messages: [
        {
          sender: "received",
          type: "text",
          content: "Cảm ơn bạn đã mua hàng của chúng tôi!",
        },
        { sender: "sent", type: "text", content: "Cảm ơn ạ🥰" },
      ],
    },
  };

  function displayChatMessages(chatName) {
    const data = chatData[chatName];
    if (!data) return;

    chatWindowHeaderImg.src = data.avatar;
    chatWindowHeaderName.textContent = chatName;
    chatContent.innerHTML = ""; // Xóa tin nhắn cũ

    data.messages.forEach((msg) => {
      const messageDiv = document.createElement("div");
      messageDiv.classList.add("message", msg.sender);
      if (msg.type === "text") {
        const p = document.createElement("p");
        p.textContent = msg.content;
        messageDiv.appendChild(p);
      } else if (msg.type === "image") {
        messageDiv.classList.remove("message"); // Remove default message styling for images
        messageDiv.classList.add("image-message");
        const img = document.createElement("img");
        img.src = msg.content;
        img.alt = "Image message"; // Add alt text for accessibility
        messageDiv.appendChild(img);
      }
      chatContent.appendChild(messageDiv);
    });
    chatContent.scrollTop = chatContent.scrollHeight; // Cuộn xuống cuối
  }

  // Khởi tạo cuộc trò chuyện đầu tiên khi tải trang
  // Lấy tên chat từ chat-item đang active hoặc chat-item đầu tiên
  const initialChatItem =
    document.querySelector(".chat-item.active") ||
    document.querySelector(".chat-item");
  if (initialChatItem) {
    const initialChatName = initialChatItem.querySelector("h4").textContent;
    displayChatMessages(initialChatName);
  }

  chatItems.forEach((item) => {
    item.addEventListener("click", function () {
      // Loại bỏ active từ tất cả các item
      chatItems.forEach((ci) => ci.classList.remove("active"));
      // Thêm active vào item được click
      this.classList.add("active");

      const chatName = this.querySelector("h4").textContent;
      displayChatMessages(chatName);
    });
  });

  // ======================== Gửi tin nhắn mới ========================
  const messageInput = document.querySelector(".chat-input input");
  const sendButton = document.querySelector(".chat-input .fa-paper-plane");

  function sendMessage() {
    const messageText = messageInput.value.trim();
    if (messageText === "") return;

    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", "sent");
    const p = document.createElement("p");
    p.textContent = messageText;
    messageDiv.appendChild(p);
    chatContent.appendChild(messageDiv);

    // Cuộn xuống cuối
    chatContent.scrollTop = chatContent.scrollHeight;
    messageInput.value = ""; // Xóa nội dung input

    // (Tùy chọn) Lưu tin nhắn vào chatData hoặc gửi đến server
    const currentChatName = chatWindowHeaderName.textContent;
    if (chatData[currentChatName]) {
      chatData[currentChatName].messages.push({
        sender: "sent",
        type: "text",
        content: messageText,
      });
    }
  }

  if (sendButton) {
    sendButton.addEventListener("click", sendMessage);
  }
  if (messageInput) {
    messageInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        sendMessage();
      }
    });
  }

  // ======================== Tìm kiếm tin nhắn ========================
  const searchMessageBox = document.querySelector(
    ".message-list .search-box input"
  );
  if (searchMessageBox) {
    searchMessageBox.addEventListener("keyup", function () {
      const searchTerm = this.value.toLowerCase();
      chatItems.forEach((item) => {
        const chatName = item.querySelector("h4").textContent.toLowerCase();
        const lastMessage = item.querySelector("p")
          ? item.querySelector("p").textContent.toLowerCase()
          : "";

        if (chatName.includes(searchTerm) || lastMessage.includes(searchTerm)) {
          item.style.display = "flex"; // Hiện item
        } else {
          item.style.display = "none"; // Ẩn item
        }
      });
    });
  }
});
