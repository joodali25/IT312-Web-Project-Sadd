//========= Contact us page ==========
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
// ======= Home Page ===========
// 3. تبديل السيم (Theme Switcher)
// --- 3. تبديل الثيم وحفظه (Theme Switcher with Local Storage) ---
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

// ======= Lesson Page 1 =========
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
//------------------- Jood ----------------------
//========= Quiz Page ==========
window.onload = function () {

    //========= Quiz Page ==========
    var quizForm = document.getElementById("quizForm");

    if (quizForm) {
        quizForm.onsubmit = function () {

            var lessonName = quizForm.getAttribute("data-lesson");
            var questions = ["q1", "q2", "q3"];
            var score = 0;

            for (var i = 0; i < questions.length; i++) {
                var answers = document.getElementsByName(questions[i]);
                var selectedAnswer = null;

                for (var j = 0; j < answers.length; j++) {
                    if (answers[j].checked) {
                        selectedAnswer = answers[j];
                    }
                }

                if (selectedAnswer == null) {
                    alert("Please answer all questions.");
                    return false;
                }

                if (selectedAnswer.value == "correct") {
                    score++;
                }
            }

            var percentage = Math.round((score / questions.length) * 100);

            var bestKey = lessonName + "_bestScore";
            var oldScore = localStorage.getItem(bestKey);

            if (oldScore == null || percentage > Number(oldScore)) {
                localStorage.setItem(bestKey, percentage);
            }

            localStorage.setItem("currentScore", percentage);
            localStorage.setItem("currentLesson", lessonName);

            window.location.href = "../result.html";

            return false;
        };
    }


    //========= Result Page ==========
    var resultPercentage = document.getElementById("resultPercentage");
    var currentScoreText = document.getElementById("currentScore");
    var bestScoreText = document.getElementById("bestScore");
    var resultCircle = document.getElementById("resultCircle");

    if (resultPercentage && currentScoreText && bestScoreText && resultCircle) {
        var currentScore = localStorage.getItem("currentScore") || 0;
        var currentLesson = localStorage.getItem("currentLesson");
        var bestScore = localStorage.getItem(currentLesson + "_bestScore") || 0;

        resultPercentage.innerHTML = currentScore + "%";
        currentScoreText.innerHTML = currentScore + "%";
        bestScoreText.innerHTML = bestScore + "%";

        resultCircle.style.background =
            "conic-gradient(#0f3d3a 0% " + currentScore + "%, #d9d9d9 " + currentScore + "% 100%)";
    }


    //========= Course Content More Button ==========
    var moreBtn = document.getElementById("moreLessonsBtn");
    var firstLessons = document.getElementsByClassName("first-lesson");
    var extraLessons = document.getElementsByClassName("extra-lesson");

    if (moreBtn) {
        moreBtn.onclick = function () {
            for (var k = 0; k < firstLessons.length; k++) {
                firstLessons[k].className += " hide-lesson";
            }

            for (var l = 0; l < extraLessons.length; l++) {
                extraLessons[l].className += " show-lesson";
            }

            moreBtn.style.display = "none";
        };
    }


    //========= Dashboard Quiz Scores ==========
    var scoresContainer = document.getElementById("quizScoresContainer");
    var scoresBody = document.getElementById("quizScoresBody");

    if (scoresContainer && scoresBody) {
        var lessons = [
            { key: "lesson6_bestScore", name: "Risk Management" },
            { key: "lesson2_bestScore", name: "Common Cyber Attacks" },
            { key: "lesson3_bestScore", name: "Encryption" },
            { key: "lesson4_bestScore", name: "Mobile Security Basics" },
            { key: "lesson1_bestScore", name: "Introduction to Cybersecurity" },
            { key: "lesson5_bestScore", name: "Common Vulnerability Types" }
        ];

        scoresBody.innerHTML = "";

        for (var m = 0; m < lessons.length; m++) {
            var scoreValue = localStorage.getItem(lessons[m].key);

            var row = document.createElement("tr");

            row.innerHTML =
                "<td>" + lessons[m].name + "</td>" +
                "<td>" + (scoreValue == null ? "None" : scoreValue + "%") + "</td>";

            scoresBody.appendChild(row);
        }
    }
};
//------------------- Dalia ----------------------

//------------------- Aryam ----------------------

