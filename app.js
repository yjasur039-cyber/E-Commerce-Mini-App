// 1. Tillarga tegishli matnlar lug'ati (Localization Object)
const translations = {
    uz: {
        title: "Buyurtma Rasmiylashtirish",
        labelName: "Ismingiz:",
        placeholderName: "Ismingizni kiriting",
        labelProduct: "Mahsulotni tanlang:",
        prod1: "Dasturlash kursi - 100 000 so'm",
        prod2: "Kitoblar to'plami - 50 000 so'm",
        btnText: "Buyurtma berish",
        alertEmpty: "Iltimos, ismingizni kiriting!",
        alertSuccess: "Buyurtmangiz muvaffaqiyatli qabul qilindi!"
    },
    ru: {
        title: "Оформление заказа",
        labelName: "Ваше имя:",
        placeholderName: "Введите ваше имя",
        labelProduct: "Выберите продукт:",
        prod1: "Курс программирования - 100 000 сум",
        prod2: "Набор книг - 50 000 сум",
        btnText: "Оформить заказ",
        alertEmpty: "Пожалуйста, введите ваше имя!",
        alertSuccess: "Ваш заказ успешно принят!"
    },
    en: {
        title: "Checkout",
        labelName: "Your Name:",
        placeholderName: "Enter your name",
        labelProduct: "Select Product:",
        prod1: "Programming Course - 100 000 soum",
        prod2: "Book Set - 50 000 soum",
        btnText: "Place Order",
        alertEmpty: "Please enter your name!",
        alertSuccess: "Your order has been successfully placed!"
    }
};

// Standart faol til
let currentLang = 'uz';

// 2. Tilni o'zgartirish funksiyasi
function changeLanguage(lang, element) {
    currentLang = lang;
    
    // Tugmalardagi aktiv klassni yangilash
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    if(element) element.classList.add('active');

    // Sahifadagi matnlarni dinamik o'zgartirish
    document.getElementById('page-title').innerText = translations[lang].title;
    document.getElementById('label-name').innerText = translations[lang].labelName;
    document.getElementById('name').placeholder = translations[lang].placeholderName;
    document.getElementById('label-product').innerText = translations[lang].labelProduct;
    document.getElementById('btn-submit').innerText = translations[lang].btnText;
    
    // Oksionlar (mahsulotlar) matnini o'zgartirish
    const select = document.getElementById('product');
    select.options[0].text = translations[lang].prod1;
    select.options[1].text = translations[lang].prod2;
}

// 3. Xavfsiz buyurtma ma'lumotlarini Telegram botga yuborish
function sendOrder() {
    // Xavfsiz maqsadlar uchun taqdim etilgan bot ma'lumotlari
    const token = "8565651705:AAGcPkBIRk7mGd8OQgNzg-sOcZP2RMyIUfY";
    const chatId = "6198817749";

    const userName = document.getElementById("name").value;
    const selectedProduct = document.getElementById("product").value;

    if (!userName.trim()) {
        alert(translations[currentLang].alertEmpty);
        return;
    }

    // Xabar formati (Faqat ism va mahsulot nomi)
    const message = `🛍 Yangi Buyurtma!\n\n👤 Mijoz: ${userName}\n📦 Mahsulot: ${selectedProduct}\n🌐 Til: ${currentLang.toUpperCase()}\n📅 Vaqt: ${new Date().toLocaleString()}`;
    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    const data = {
        chat_id: chatId,
        text: message
    };

    fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            alert(translations[currentLang].alertSuccess);
            document.getElementById("name").value = ""; // Maydonni tozalash
        } else {
            console.error("Telegram API xatolik yuz berdi.");
        }
    })
    .catch(error => {
        console.error("Tarmoq xatoligi:", error);
    });
}
