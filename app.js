function sendOrder() {
    // Siz taqdim etgan bot ma'lumotlari (Xavfsiz ma'lumotlar uchun foydalaniladi)
    const token = "8565651705:AAGcPkBIRk7mGd8OQgNzg-sOcZP2RMyIUfY";
    const chatId = "6198817749";

    const userName = document.getElementById("name").value;
    const selectedProduct = document.getElementById("product").value;

    if (!userName) {
        alert("Iltimos, ismingizni kiriting!");
        return;
    }

    // Telegram botga yuboriladigan matn formati
    const message = `🛍 Yangi Buyurtma!\n\n👤 Mijoz: ${userName}\n📦 Mahsulot: ${selectedProduct}\n📅 Vaqt: ${new Date().toLocaleString()}`;

    // Telegram API url manzili
    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    // So'rov yuborish obyekti
    const data = {
        chat_id: chatId,
        text: message
    };

    // Fetch orqali API ga so'rov jo'natish
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            alert("Buyurtmangiz muvaffaqiyatli qabul qilindi va botga yuborildi!");
        } else {
            alert("Xatolik yuz berdi. Bot token yoki Chat ID xato bo'lishi mumkin.");
        }
    })
    .catch(error => {
        console.error("Xatolik:", error);
    });
}
