//============ Contact us page ============
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

            nameInput.style.borderColor = "";
            emailInput.style.borderColor = "";
            messageInput.style.borderColor = "";

            if (name === "" || email === "" || message === "") {
                alert("Please fill in all fields.");
                event.preventDefault();
                return;
            }

            if (name.indexOf(" ") === -1) {
                alert("Please enter your Full Name (First and Last name).");
                nameInput.style.borderColor = "red";
                event.preventDefault();
                return;
            }

            const digitRegex = /^\d/; 
            if (digitRegex.test(name)) {
                alert("Name should not start with a number.");
                nameInput.style.borderColor = "red";
                event.preventDefault();
                return;
            }

            alert("Thank you, " + name + "! Your message has been sent successfully.");
            form.reset();
            event.preventDefault(); 
        });
    }
});


function showTime() {
    const clock = document.getElementById('real-time-clock');
    if (clock) { 
        const now = new Date();
        clock.innerText = now.toLocaleTimeString();
    }
}
setInterval(showTime, 1000);

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

// ================ Home Page ===================
// (Theme Switcher)
const themeBtn = document.getElementById("theme-toggle");
if (localStorage.getItem("theme") === "dark") {
    applyDarkMode();
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

//Dark Theme
function applyDarkMode() {
    document.body.classList.add("dark-mode");
    document.body.style.backgroundColor = "#161b22"; 
    document.body.style.color = "#ffffff";

    const cards = document.querySelectorAll(".course-card, .feedback-card");
    for (let i = 0; i < cards.length; i++) {
        cards[i].style.backgroundColor = "#21262d"; 
        cards[i].style.color = "#ffffff";
        cards[i].style.borderColor = "#30363d";
    }
}

//light Theme
function applyLightMode() {
    document.body.classList.remove("dark-mode");
    document.body.style.backgroundColor = "#d5e8ea";
    document.body.style.color = "#000";
    
    const cards = document.querySelectorAll(".course-card, .feedback-card");
    for (let i = 0; i < cards.length; i++) {
        cards[i].style.backgroundColor = "#ffffff"; 
        cards[i].style.color = "#000";
        cards[i].style.borderColor = "#0f3d3a";
    }
}

const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const container = document.getElementById("coursesContainer");

if (nextBtn && prevBtn && container) {
    nextBtn.onclick = function() {
        container.scrollBy({ left: 320, behavior: 'smooth' });
    };

    prevBtn.onclick = function() {
        container.scrollBy({ left: -320, behavior: 'smooth' });
    };
}

// ============= Lesson Page 1 ==================
document.addEventListener("DOMContentLoaded", function() {
    const myLessons = [
        "lesson1_p1.html", "lesson4_p1.html", 
        "lesson2_p1.html", "lesson5_p1.html",
        "lesson3_p1.html", "lesson6_p1.html"
    ];   
    const currentPage = window.location.pathname.split("/").pop();
    if (myLessons.indexOf(currentPage) !== -1) {
        const lessonTitle = document.querySelector("h1") ? document.querySelector("h1").innerText : "this lesson";

        setTimeout(function() {
            alert("Goal: Master the fundamentals of " + lessonTitle + ".\nReminder: Complete the quiz after finishing the lesson!");
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
// ============================================================
// الجزء التكميلي الخاص بمتطلبات المشروع (RegEx, Timers, LocalStorage)
// ============================================================


    // 2. التحقق المتقدم من الأسماء (RegEx - محاضرة 12)
    // هذا الجزء يضيف حماية إضافية للفورم الموجود مسبقاً دون حذفه
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function(event) {
            const nameField = document.getElementById("name");
            if (nameField) {
                const nameValue = nameField.value.trim();
                
                // القاعدة 1: منع البدء بأرقام (تطبيق مباشر لـ RegEx)
                const startsWithNumber = /^\d/; 
                if (startsWithNumber.test(nameValue)) {
                    alert("عذراً: يجب ألا يبدأ الاسم برقم (متطلب RegEx)");
                    nameField.style.border = "2px solid red";
                    event.preventDefault(); // إيقاف الإرسال
                    return;
                }

                // القاعدة 2: التأكد من وجود مسافة (اسم أول وأخير) باستخدام indexOf (محاضرة 9)
                if (nameValue.indexOf(" ") === -1) {
                    alert("الرجاء إدخال الاسم كاملاً (الأول والأخير)");
                    nameField.style.border = "2px solid red";
                    event.preventDefault();
                    return;
                }
            }
        });
    }

    // 3. حفظ آخر وقت زيارة للمستخدم (LocalStorage - محاضرة 10)
    // هذا يثبت للدكتورة فهمك لكيفية تخزين البيانات واسترجاعها
    const lastVisit = localStorage.getItem("lastVisitDate");
    if (lastVisit) {
        console.log("Last visit was on: " + lastVisit);
        // يمكنك إظهارها في الـ console أو في نص صغير بأسفل الصفحة
    }
    localStorage.setItem("lastVisitDate", new Date().toLocaleString());

});
