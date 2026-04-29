document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("contactForm");

    if (form) {
        form.addEventListener("submit", function(event) {
            const nameInput = document.getElementById("name");
            const emailInput = document.getElementById("email");
            const messageInput = document.getElementById("message");

            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const message = messageInput.value.trim();

            // إعادة ضبط الحدود
            nameInput.style.borderColor = "";
            emailInput.style.borderColor = "";
            messageInput.style.borderColor = "";

            // 1. التحقق من الحقول الفارغة (تأكيد إضافي بجانب HTML)
            if (name === "" || email === "" || message === "") {
                alert("Please fill in all fields.");
                event.preventDefault();
                return;
            }

            // 2. التحقق من "الاسم الكامل" (يجب أن يحتوي على مسافة واحدة على الأقل) [تعديل: استخدام indexOf بدلاً من includes كما في محاضرة 9]
            if (name.indexOf(" ") === -1) {
                alert("Please enter your Full Name (First and Last name).");
                nameInput.style.borderColor = "red";
                event.preventDefault();
                return;
            }

            // 3. التحقق أن الاسم لا يبدأ برقم [تعديل: استخدام RegEx المطابق لمحاضرة 12]
            const digitRegex = /^\d/; 
            if (digitRegex.test(name)) {
                alert("Name should not start with a number.");
                nameInput.style.borderColor = "red";
                event.preventDefault();
                return;
            }

            // 4. رسالة النجاح في حال اجتياز كل الشروط
            alert("Thank you, " + name + "! Your message has been sent successfully.");
            form.reset();
            event.preventDefault(); 
        });
    }
});

//Contact us page
// 1. الساعة الحقيقية - [مطابق لمحاضرة 11 في استخدام setInterval]
function showTime() {
    const clock = document.getElementById('real-time-clock');
    if (clock) { 
        const now = new Date();
        clock.innerText = now.toLocaleTimeString();
    }
}
setInterval(showTime, 1000);

// 2. زر العودة للأعلى - [مطابق لمحاضرة 11 في استخدام scroll events]
const btn = document.getElementById("backToTop");
if (btn) { 
    window.onscroll = function() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            btn.style.display = "block";
        } else {
            btn.style.display = "none";
        }
    };
    btn.onclick = function() {
        window.scrollTo({top: 0, behavior: 'smooth'});
    };
}

// 3. تبديل السيم (Theme Switcher)
// --- 3. تبديل الثيم وحفظه (Theme Switcher with Local Storage) ---
// [تم تعديل classList إلى style.property لضمان الالتزام بمحاضرة 11 (DOM Modification)]
const themeBtn = document.getElementById("theme-toggle");

// أولاً: عند تحميل أي صفحة، نتحقق هل المستخدم اختار الثيم الغامق سابقاً؟ (محاضرة 10)
if (localStorage.getItem("theme") === "dark") {
    applyDarkMode();
    if (themeBtn && themeBtn.type === "checkbox") {
        themeBtn.checked = true;
    }
}

if (themeBtn) {
    themeBtn.onclick = function() {
        if (localStorage.getItem("theme") !== "dark") {
            applyDarkMode();
            localStorage.setItem("theme", "dark");
        } else {
            applyLightMode();
            localStorage.setItem("theme", "light");
        }
    };
}
// 1. دالة تطبيق الثيم الغامق (بدرجة رمادي غامق احترافية)
function applyDarkMode() {
    // الخلفية الأساسية (الدرجة اللي اخترتيها)
    document.body.style.backgroundColor = "#161b22"; 
    document.body.style.color = "#ffffff";

    // 1. تعديل بطاقات الكورسات (Course Cards) والفيدباك (Feedback Cards)
    // جعلناها أفتح من الخلفية (#21262d) مع خطوط بيضاء صريحة
    const cards = document.querySelectorAll(".course-card, .feedback-card");
    for (let i = 0; i < cards.length; i++) {
        cards[i].style.backgroundColor = "#21262d"; 
        cards[i].style.color = "#ffffff";
        cards[i].style.borderColor = "#30363d";
        
        // استهداف النصوص داخل البطاقات لضمان وضوحها
        const cardTexts = cards[i].querySelectorAll("h3, p, span, .instructor-name");
        for (let j = 0; j < cardTexts.length; j++) {
            cardTexts[j].style.color = "#ffffff";
        }
    }

    // 2. استهداف سيكشن وحاوية الكونتاكت (للتناسق)
    const contactSection = document.querySelector(".contact-section");
    const contactBox = document.querySelector(".contact-container");
    
    if (contactSection) contactSection.style.backgroundColor = "#161b22";
    if (contactBox) {
        contactBox.style.backgroundColor = "#21262d";
        contactBox.style.borderColor = "#30363d";
    }

    // 3. تعديل العناوين (الاسم، الايميل، الرسالة) في فورم التواصل
    const labels = document.querySelectorAll("label");
    for (let i = 0; i < labels.length; i++) {
        labels[i].style.color = "#ffffff"; 
        labels[i].style.fontWeight = "bold";
    }

    // العنوان الرئيسي (رمادي فاتح جداً)
    const contactTitle = document.querySelector(".contact-title");
    if (contactTitle) {
        contactTitle.style.color = "#f0f6fc"; 
        contactTitle.style.borderBottomColor = "#30363d";
    }

    // 4. الحقول (Inputs)
    const inputs = document.querySelectorAll("input[type='text'], input[type='email'], textarea");
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].style.backgroundColor = "#0d1117";
        inputs[i].style.color = "#ffffff";
        inputs[i].style.borderColor = "#30363d";
    }
}

// 2. دالة تطبيق الثيم الفاتح (لإعادة الألوان الأصلية)
function applyLightMode() {
    document.body.style.backgroundColor = "#d5e8ea";
    document.body.style.color = "#000";
    
    const contactSection = document.querySelector(".contact-section");
    const contactBox = document.querySelector(".contact-container");
    
    if (contactSection) contactSection.style.backgroundColor = "#d5e8ea";
    if (contactBox) {
        contactBox.style.backgroundColor = "#ffffff";
        contactBox.style.borderColor = "#052419";
    }
}

// --- برمجة أسهم تصفح الكورسات (Carousel) بطريقة المنهج ---
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const container = document.getElementById("coursesContainer");

if (nextBtn && prevBtn && container) {
    nextBtn.onclick = function() {
        // نستخدم scrollTo لأنها طريقة برمجية مشروحة في سياق الـ Window/DOM [cite: 2601]
        container.scrollBy({ left: 320, behavior: 'smooth' });
    };

    prevBtn.onclick = function() {
        container.scrollBy({ left: -320, behavior: 'smooth' });
    };

    const contactBox = document.querySelector(".contact-container");
    if (contactBox) {
        contactBox.style.backgroundColor = "#ffffff";
        contactBox.style.borderColor = "#052419";
    }

    const inputs = document.querySelectorAll("input[type='text'], input[type='email'], textarea");
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].style.backgroundColor = "#fcfcfc";
        inputs[i].style.color = "#000";
        inputs[i].style.borderColor = "#052419";
    }

    const contactTitle = document.querySelector(".contact-title");
    if (contactTitle) {
        contactTitle.style.color = "#052419";
        contactTitle.style.borderBottomColor = "#051b1a";
    }
}

//Lesson Page 1 
document.addEventListener("DOMContentLoaded", function() {
    const myLessons = [
        "lesson1_p1.html", "lesson2_p1.html", 
        "lesson3_p1.html", "lesson4_p1.html", 
        "lesson5_p1.html", "lesson6_p1.html", 
    ];

    const currentPage = window.location.pathname.split("/").pop();

    // التحقق من الصفحة وإظهار التنبيه بعد 3 ثوانٍ (محاضرة 11 - setTimeout)
    // [تعديل: استخدام indexOf للتحقق من المصفوفة بدلاً من includes لضمان التوافق التام]
    if (myLessons.indexOf(currentPage) !== -1 || window.location.pathname.indexOf("lesson1_p1.html") !== -1) {
        setTimeout(function() {
            alert("Goal: Master the fundamentals of " + document.title + ".\nReminder: Complete the quiz after finishing the lesson!");
        }, 3000);
    }
});
