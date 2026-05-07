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
document.addEventListener("DOMContentLoaded", function () {

    var aboutPage = document.querySelector(".about-page");

    if (!aboutPage) {
        return;
    }

    var teamGrid = document.querySelector(".team-grid");
    var sortSelect = document.getElementById("sort-teachers");

    if (!teamGrid || !sortSelect) {
        return;
    }

    var teacherCards = Array.from(teamGrid.querySelectorAll(".team-card"));

    function fixSelectValues() {
        var options = Array.from(sortSelect.options);

        for (var i = 0; i < options.length; i++) {
            var text = options[i].textContent.trim();

            if (text === "Random Order") {
                options[i].remove();
            }
            else if (text === "Name (A-Z)") {
                options[i].value = "name-az";
            }
            else if (text === "Name (Z-A)") {
                options[i].value = "name-za";
            }
            else if (text === "Experience (low - high)") {
                options[i].value = "exp-low-high";
            }
            else if (text === "Experience (high - low)") {
                options[i].value = "exp-high-low";
            }
        }

        if (!sortSelect.querySelector('option[value=""]')) {
            var defaultOption = document.createElement("option");
            defaultOption.value = "";
            defaultOption.textContent = "Choose Sorting";
            defaultOption.disabled = true;
            defaultOption.selected = true;

            sortSelect.insertBefore(defaultOption, sortSelect.firstChild);
        }

        sortSelect.value = "";
    }

    function getTeacherName(card) {
        var name = card.querySelector(".team-name").textContent.trim();

        name = name.replace("Prof. ", "");
        name = name.replace("Dr. ", "");
        name = name.replace("Ms. ", "");

        return name.toLowerCase();
    }

    function getTeacherExperience(card) {
        var experienceText = card.querySelector(".team-exp").textContent;
        var number = experienceText.match(/\d+/);

        return number ? parseInt(number[0]) : 0;
    }

    function displayTeachers(cards) {
        teamGrid.innerHTML = "";

        for (var i = 0; i < cards.length; i++) {
            teamGrid.appendChild(cards[i]);
        }
    }

    function shuffleTeachers(cards) {
        var shuffled = cards.slice();

        for (var i = shuffled.length - 1; i > 0; i--) {
            var randomIndex = Math.floor(Math.random() * (i + 1));

            var temp = shuffled[i];
            shuffled[i] = shuffled[randomIndex];
            shuffled[randomIndex] = temp;
        }

        return shuffled;
    }

    function sortTeachers() {
        var selectedValue = sortSelect.value;
        var sortedCards = teacherCards.slice();

        if (selectedValue === "name-az") {
            sortedCards.sort(function (a, b) {
                return getTeacherName(a).localeCompare(getTeacherName(b));
            });
        }
        else if (selectedValue === "name-za") {
            sortedCards.sort(function (a, b) {
                return getTeacherName(b).localeCompare(getTeacherName(a));
            });
        }
        else if (selectedValue === "exp-low-high") {
            sortedCards.sort(function (a, b) {
                return getTeacherExperience(a) - getTeacherExperience(b);
            });
        }
        else if (selectedValue === "exp-high-low") {
            sortedCards.sort(function (a, b) {
                return getTeacherExperience(b) - getTeacherExperience(a);
            });
        }

        displayTeachers(sortedCards);
    }

    fixSelectValues();

    displayTeachers(shuffleTeachers(teacherCards));

    sortSelect.addEventListener("change", sortTeachers);

});







//----------------------------------teacher evaallll------------------------------------------//
document.addEventListener("DOMContentLoaded", function () {

    var teacherPage = document.querySelector(".teacher-page");

    if (!teacherPage) {
        return;
    }

    var form = teacherPage.querySelector("form");
    var teacherSelect = document.getElementById("teacher-name");
    var ratingWrapper = document.querySelector(".rating-wrapper");
    var feedback = document.getElementById("teacher-feedback");

    if (!form  ||!teacherSelect   ||!ratingWrapper || !feedback) {
        return;
    }

    var firstOption = teacherSelect.options[0];

    if (firstOption && firstOption.value !== "") {
        var defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = "Select Teacher";
        defaultOption.selected = true;
        defaultOption.disabled = true;

        teacherSelect.insertBefore(defaultOption, teacherSelect.firstChild);
    }

    var message = document.createElement("p");
    message.id = "evaluation-message";
    message.style.fontWeight = "bold";
    message.style.marginTop = "10px";
    message.style.textAlign = "center";

    form.insertBefore(message, form.querySelector(".teacher-btn"));

    function clearHighlight() {
        teacherSelect.style.border = "1px solid #777";
        teacherSelect.style.backgroundColor = "#fff";

        ratingWrapper.style.border = "1px solid #777";
        ratingWrapper.style.backgroundColor = "#fff";

        feedback.style.border = "1px solid #777";
        feedback.style.backgroundColor = "#fff";

        message.textContent = "";
        message.style.color = "";
    }

    function highlight(element) {
        element.style.border = "2px solid red";
        element.style.backgroundColor = "#fff5f5";
    }

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        clearHighlight();

        var selectedTeacher = teacherSelect.value;
        var selectedRating = document.querySelector('input[name="rating"]:checked');
        var feedbackText = feedback.value.trim();

        var valid = true;

        if (selectedTeacher === "") {
            highlight(teacherSelect);
            valid = false;
        }

        if (!selectedRating) {
            highlight(ratingWrapper);
            valid = false;
        }

        if (feedbackText === "") {
            highlight(feedback);
            valid = false;
        }

        if (valid === false) {
            message.textContent = "Please select a teacher, choose a rating, and write your feedback.";
            message.style.color = "red";
            return;
        }

        var ratingValue = parseInt(selectedRating.value);

        if (ratingValue >= 4) {
            message.textContent = "Thank you for your evaluation!";
            message.style.color = "green";
            alert("Thank you for your evaluation!");
        } else {
            message.textContent = "We are sorry for your experience. Thank you for your feedback.";
            message.style.color = "red";
            alert("We are sorry for your experience. Thank you for your feedback.");
        }

        window.location.href = "Student-dashboard.html";
    });

});




//-----------------------------------------my noooteeeee----------------------------//
document.addEventListener("DOMContentLoaded", function () {

    var notesPage = document.querySelector(".notes-page");

    if (!notesPage) {
        return;
    }

    var savedNotesForm = document.querySelector(".saved-notes-form");
    var addNoteForm = document.querySelector(".note-box form");
    var prioritySelect = document.querySelector(".priority-select");
    var noteText = document.querySelector(".note-text");
    var noteButtons = document.querySelectorAll(".note-btn");

    if (!savedNotesForm || !addNoteForm  || !prioritySelect || !noteText || noteButtons.length === 0) {
        return;
    }

    var storageKey = "studentNotes";
    var notesList = [];
    var clickedButton = "";
    var lastAddedNoteId = null;

    function getPriorityColor(priority) {
        if (priority === 1) {
            return "#ffb3b3"; // Red
        }
        else if (priority === 2) {
            return "#fff3a3"; // Yellow
        }
        else if (priority === 3) {
            return "#b9f6b9"; // Green
        }

        return "#ffffff";
    }

    function loadNotes() {
        var storedNotes = localStorage.getItem(storageKey);

        if (storedNotes) {
            notesList = JSON.parse(storedNotes);
        }
        else {
            notesList = [
                {
                    id: 1,
                    description: "learn a sec lecture exam and solve it",
                    priority: 1
                },
                {
                    id: 2,
                    description: "resolve assi network tomorrow",
                    priority: 2
                }
            ];

            localStorage.setItem(storageKey, JSON.stringify(notesList));
        }
    }

    function saveNotes() {
        localStorage.setItem(storageKey, JSON.stringify(notesList));
    }

    function displayNotes() {
        savedNotesForm.innerHTML = "";

        for (var i = 0; i < notesList.length; i++) {
            var note = notesList[i];

            var label = document.createElement("label");
            label.className = "saved-note-item";
            label.style.backgroundColor = getPriorityColor(note.priority);
            label.style.padding = "8px";
            label.style.borderRadius = "6px";
            label.style.marginBottom = "12px";

            var checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.value = note.id;

            var image = document.createElement("img");
            image.src = "images/note1.png";
            image.className = "saved-note-icon";
            image.alt = "note icon";

            var span = document.createElement("span");
            span.textContent = note.description;

            label.appendChild(checkbox);
            label.appendChild(image);
            label.appendChild(span);

            savedNotesForm.appendChild(label);
        }

        var deleteButton = document.createElement("button");
        deleteButton.type = "submit";
        deleteButton.className = "notes-small-btn";
        deleteButton.textContent = "Delete";

        savedNotesForm.appendChild(deleteButton);
    }

    function clearForm() {
        prioritySelect.selectedIndex = 0;
        noteText.value = "";
        lastAddedNoteId = null;
    }

    function validateForm() {
        var description = noteText.value.trim();
        var priority = prioritySelect.value;
        var errorMessage = "";

        if (description === "") {
            errorMessage += "Note description is empty.\n";
        }
        else if (description.length < 30) {
            errorMessage += "Note description is very short. It must be at least 30 characters.\n";
        }

        if (priority === "" || priority === "Priority") {
            errorMessage += "No priority selected.\n";
        }

        if (errorMessage !== "") {
            alert(errorMessage);
            return false;
        }

        return true;
    }

    function addNoteToList() {
        var newNote = {
            id: Date.now(),
            description: noteText.value.trim(),priority: parseInt(prioritySelect.value)
        };

        notesList.push(newNote);
        lastAddedNoteId = newNote.id;

        displayNotes();
    }

    function isLastAddedNoteSameAsForm() {
        if (lastAddedNoteId === null) {
            return false;
        }

        var lastNote = null;

        for (var i = 0; i < notesList.length; i++) {
            if (notesList[i].id === lastAddedNoteId) {
                lastNote = notesList[i];
                break;
            }
        }

        if (!lastNote) {
            return false;
        }

        return lastNote.description === noteText.value.trim() &&
               lastNote.priority === parseInt(prioritySelect.value);
    }

    for (var i = 0; i < noteButtons.length; i++) {
        noteButtons[i].addEventListener("click", function () {
            clickedButton = this.textContent.trim();
        });
    }

    addNoteForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        if (clickedButton === "Add") {
            addNoteToList();
        }

        else if (clickedButton === "Save") {

            if (!isLastAddedNoteSameAsForm()) {
                addNoteToList();
            }

            saveNotes();
            clearForm();
        }
    });

    savedNotesForm.addEventListener("submit", function (event) {
        event.preventDefault();

        var selectedNotes = savedNotesForm.querySelectorAll("input[type='checkbox']:checked");

        if (selectedNotes.length === 0) {
            alert("Please select at least one note");
            return;
        }

        var confirmDelete = confirm("Are you sure you want to delete the selected notes?");

        if (confirmDelete) {
            for (var i = 0; i < selectedNotes.length; i++) {
                var selectedId = parseInt(selectedNotes[i].value);

                notesList = notesList.filter(function (note) {
                    return note.id !== selectedId;
                });
            }

            saveNotes();
            displayNotes();
        }
    });

    loadNotes();
    displayNotes();

});
