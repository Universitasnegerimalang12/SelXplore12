// ==================== SPLASH SCREEN FUNCTIONS ====================

function closeSplashScreen() {
  const splashScreen = document.getElementById("splashScreen");
  const mainContent = document.getElementById("mainContent");

  if (splashScreen && mainContent) {
    // Hide splash screen
    splashScreen.style.display = "none";
    // Show main content
    mainContent.style.display = "block";
    // Mark that splash screen has been seen
    sessionStorage.setItem("splashClosed", "true");
  }
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", function () {
  const splashScreen = document.getElementById("splashScreen");
  const mainContent = document.getElementById("mainContent");

  // Check if splash screen was already closed in this session
  const splashClosed = sessionStorage.getItem("splashClosed");

  if (splashClosed) {
    // Splash already closed this session, hide it
    if (splashScreen) splashScreen.style.display = "none";
    if (mainContent) mainContent.style.display = "block";
  } else {
    // First time in this session, show splash
    if (splashScreen) splashScreen.style.display = "flex";
    if (mainContent) mainContent.style.display = "none";
  }

  // Add Enter key support to close splash
  document.addEventListener("keydown", function (event) {
    const splashScreen = document.getElementById("splashScreen");
    if (
      event.key === "Enter" &&
      splashScreen &&
      splashScreen.style.display !== "none"
    ) {
      closeSplashScreen();
    }
  });

  // Initialize scroll animations
  initializeScrollAnimations();
});

// ==================== MODAL FUNCTIONS ====================

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add("show");
    // Trigger animations for modal content
    animateModalContent(modal);
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("show");
    // Reset animation classes for next time
    resetModalAnimations(modal);
  }
}

function animateModalContent(modal) {
  if (!modal) return;

  const modalContent = modal.querySelector(".modal-content");
  if (modalContent) {
    // Reset close button animation if exists
    const closeBtn = modalContent.querySelector(".close");
    if (closeBtn) {
      closeBtn.style.animation = "";
      closeBtn.style.opacity = "1";
      closeBtn.style.animationDelay = "";
    }

    // Animate title
    const title = modalContent.querySelector("h2");
    if (title) {
      title.style.animation = "none";
      setTimeout(() => {
        title.style.animation = "";
        title.classList.add("animate-fade-in-down");
      }, 10);
    }

    // Animate all paragraphs, lists, and other content with stagger effect
    const contentElements = modalContent.querySelectorAll(
      "p, h3, h4, li, label, div.form-group, div.quiz-question, .competency-item, .glossary-item, .reference, .video-item, .profile-card, .progress-section",
    );

    contentElements.forEach((el, index) => {
      el.style.animation = "none";
      el.style.opacity = "0";
      setTimeout(() => {
        el.style.animation = "";
        el.classList.add("animate-fade-in-up");
        el.style.animationDelay = `${index * 0.1}s`;
      }, 10);
    });
  }
}

function resetModalAnimations(modal) {
  if (!modal) return;
  const modalContent = modal.querySelector(".modal-content");
  if (modalContent) {
    const elements = modalContent.querySelectorAll("*");
    elements.forEach((el) => {
      el.style.animation = "";
      el.style.animationDelay = "";
      el.classList.remove(
        "animate-fade-in-up",
        "animate-fade-in-down",
        "animate-fade-in-left",
        "animate-fade-in-right",
        "animate-zoom-in",
      );
    });
  }
}

// Close modal when clicking outside of it
window.onclick = function (event) {
  const modals = document.querySelectorAll(".modal.show");
  modals.forEach((modal) => {
    if (event.target === modal) {
      modal.classList.remove("show");
    }
  });
};

// ==================== SCROLL FUNCTIONS ====================

function scrollToSection(sectionId) {
  const element = document.querySelector(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}

// ==================== TAB FUNCTIONS ====================

function showTab(tabId) {
  // Hide all tabs
  const allTabs = document.querySelectorAll(".tab-content");
  allTabs.forEach((tab) => tab.classList.remove("active"));

  // Remove active class from all buttons
  const allButtons = document.querySelectorAll(".tab-button");
  allButtons.forEach((btn) => btn.classList.remove("active"));

  // Show selected tab
  const selectedTab = document.getElementById(tabId);
  if (selectedTab) {
    selectedTab.classList.add("active");
  }

  // Add active class to clicked button
  event.target.classList.add("active");
}

// ==================== MENU TOGGLE ====================

document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.querySelector(".nav-menu");

  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      navMenu.classList.toggle("show");
    });
  }
});

// ==================== GLOSSARY SEARCH ====================

const glossarySearch = document.getElementById("glossarySearch");
if (glossarySearch) {
  glossarySearch.addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase();
    const glossaryItems = document.querySelectorAll(".glossary-item");

    glossaryItems.forEach((item) => {
      const text = item.textContent.toLowerCase();
      if (text.includes(searchTerm)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
}

// ==================== QUIZ/GAME QUESTIONS ====================

const quizQuestions = [
  {
    question: "Organel sel yang berfungsi sebagai pusat energi adalah?",
    options: ["Inti sel", "Mitokondria", "Ribosom", "Golgi apparatus"],
    correct: 1,
  },
  {
    question: "Proses pembuatan makanan menggunakan cahaya matahari disebut?",
    options: ["Respirasi", "Fotosintesis", "Fermentasi", "Transpirasi"],
    correct: 1,
  },
  {
    question: "Membran sel berfungsi untuk?",
    options: [
      "Menyimpan energi",
      "Mengontrol masuk keluarnya zat",
      "Tempat sintesis protein",
      "Memproduksi energi",
    ],
    correct: 1,
  },
  {
    question:
      "Tumbuhan hijau dapat membuat makanannya sendiri karena memiliki?",
    options: ["Akar", "Kloroplas", "Vakuola", "Dinding sel"],
    correct: 1,
  },
  {
    question: "Proses respirasi menghasilkan energi dalam bentuk?",
    options: ["ATP", "Glukosa", "Oksigen", "Karbohidrat"],
    correct: 0,
  },
];

let currentQuestion = 0;
let score = 0;
let answeredQuestions = [];

function initializeGame() {
  currentQuestion = 0;
  score = 0;
  answeredQuestions = [];
  displayQuestion();
}

function displayQuestion() {
  if (currentQuestion < quizQuestions.length) {
    const questionObj = quizQuestions[currentQuestion];
    const questionDisplay = document.getElementById("question");
    const optionsDisplay = document.getElementById("options");

    if (questionDisplay && optionsDisplay) {
      questionDisplay.textContent = `Soal ${currentQuestion + 1}: ${questionObj.question}`;
      optionsDisplay.innerHTML = "";

      questionObj.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.className = "option-button";
        button.textContent = option;
        button.onclick = () => selectAnswer(index);
        optionsDisplay.appendChild(button);
      });
    }
  }
}

function selectAnswer(selectedIndex) {
  if (currentQuestion < quizQuestions.length) {
    const questionObj = quizQuestions[currentQuestion];
    const buttons = document.querySelectorAll(".option-button");

    buttons.forEach((button) => {
      button.disabled = true;
    });

    if (selectedIndex === questionObj.correct) {
      buttons[selectedIndex].classList.add("correct");
      score++;
    } else {
      buttons[selectedIndex].classList.add("incorrect");
      buttons[questionObj.correct].classList.add("correct");
    }

    answeredQuestions.push({
      question: questionObj.question,
      selected: selectedIndex,
      correct: questionObj.correct,
      isCorrect: selectedIndex === questionObj.correct,
    });
  }
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < quizQuestions.length) {
    displayQuestion();
  } else {
    showGameResult();
  }
}

function showGameResult() {
  const gameArea = document.getElementById("gameArea");
  const percentage = (score / quizQuestions.length) * 100;

  if (gameArea) {
    gameArea.innerHTML = `
            <div class="evaluation-result">
                <h3>Hasil Kuis Anda</h3>
                <p>Skor: ${score}/${quizQuestions.length}</p>
                <p>Persentase: ${percentage.toFixed(1)}%</p>
                <p>${getMotivationalMessage(percentage)}</p>
                <button class="btn-primary" onclick="resetGame()">Kerjakan Ulang</button>
            </div>
        `;
  }
}

function resetGame() {
  initializeGame();
}

function getMotivationalMessage(percentage) {
  if (percentage === 100) {
    return "🌟 Sempurna! Anda menguasai semua materi!";
  } else if (percentage >= 80) {
    return "🎉 Luar biasa! Anda hampir menguasai semua materi!";
  } else if (percentage >= 60) {
    return "👍 Bagus! Anda memahami sebagian besar materi. Terus belajar!";
  } else if (percentage >= 40) {
    return "📚 Anda sudah mulai memahami. Mari belajar lebih banyak!";
  } else {
    return "💪 Jangan menyerah! Pelajari kembali materi yang belum dipahami.";
  }
}

// ==================== EVALUATION FORM ====================

const quizForm = document.getElementById("quizForm");
if (quizForm) {
  quizForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let quizScore = 0;
    const answers = {
      q1: "b", // Mitokondria
      q2: "b", // Fotosintesis
      q3: "b", // Mengontrol masuk keluarnya zat
      q4: "b", // Badan Golgi
      q5: "c", // Sel prokariotik
      q6: "c", // Energi ATP
      q7: "c", // Sel tumbuhan
      q8: "b", // Mitosis
      q9: "b", // RE kasar
      q10: "c", // Lisosom
    };

    const detailedResults = [];
    for (let key in answers) {
      const selectedAnswer = document.querySelector(
        `input[name="${key}"]:checked`,
      );
      const isCorrect = selectedAnswer && selectedAnswer.value === answers[key];
      if (isCorrect) {
        quizScore++;
      }
      detailedResults.push({
        question: key,
        selected: selectedAnswer ? selectedAnswer.value : "Tidak dijawab",
        correct: answers[key],
        isCorrect: isCorrect,
      });
    }

    const totalQuestions = Object.keys(answers).length;
    const percentage = (quizScore / totalQuestions) * 100;

    // Determine achievement based on percentage
    let achievement = "";
    let emoji = "😐";
    if (percentage === 100) {
      achievement = "🏆 SEMPURNA!";
      emoji = "🏆";
    } else if (percentage >= 80) {
      achievement = "⭐ Luar Biasa!";
      emoji = "⭐";
    } else if (percentage >= 60) {
      achievement = "👍 Bagus!";
      emoji = "👍";
    } else if (percentage >= 40) {
      achievement = "📚 Cukup, terus belajar!";
      emoji = "📚";
    } else {
      achievement = "💪 Jangan putus asa, coba lagi!";
      emoji = "💪";
    }

    const resultDiv = document.getElementById("evaluationResult");
    resultDiv.innerHTML = `
      <div style="text-align: center; padding: 20px;">
        <div style="font-size: 60px; margin-bottom: 10px;">${emoji}</div>
        <h2 style="color: #333; margin: 10px 0;">${achievement}</h2>
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 10px; padding: 20px; margin: 20px 0; color: white;">
          <div style="font-size: 24px; font-weight: bold;">${quizScore}/${totalQuestions}</div>
          <div style="font-size: 16px;">Jawaban Benar</div>
        </div>
        <div style="background: #f0f4ff; border-left: 4px solid #667eea; padding: 15px; margin: 15px 0; border-radius: 5px;">
          <div style="font-size: 28px; font-weight: bold; color: #667eea;">${percentage.toFixed(1)}%</div>
          <div style="color: #666;">Persentase Keberhasilan</div>
        </div>
        <div style="margin-top: 20px; text-align: left; background: #fff9e6; padding: 15px; border-radius: 8px; border-left: 4px solid #ffc107;">
          <h4 style="margin-top: 0; color: #ff9800;">📝 Analisis Jawaban:</h4>
          <div style="max-height: 200px; overflow-y: auto;">`;

    // Add detailed answer breakdown
    detailedResults.forEach((result) => {
      const icon = result.isCorrect ? "✅" : "❌";
      const style = result.isCorrect ? "color: #4CAF50" : "color: #f44336";
      resultDiv.innerHTML += `<div style="padding: 8px 0; border-bottom: 1px solid #ffe0b2; ${style}"><strong>${icon} ${result.question}:</strong> ${result.selected} ${!result.isCorrect ? `(Jawaban: ${result.correct})` : ""}</div>`;
    });

    resultDiv.innerHTML += `
          </div>
        </div>
        <div style="margin-top: 20px;">
          <p style="color: #666; font-size: 14px;">${getMotivationalMessage(percentage)}</p>
          <button class="btn-primary" onclick="resetEvaluation();" style="margin-top: 10px;">
            🔄 Coba Lagi
          </button>
        </div>
      </div>
    `;
    document.getElementById("quizForm").style.display = "none";
    resultDiv.style.display = "block";
  });
}

function resetEvaluation() {
  const quizForm = document.getElementById("quizForm");
  const resultDiv = document.getElementById("evaluationResult");

  if (quizForm) {
    quizForm.reset();
    quizForm.style.display = "block";
  }
  if (resultDiv) {
    resultDiv.style.display = "none";
  }
}

// ==================== LKPD FORM ====================

const lkpdForm = document.getElementById("lkpdForm");
if (lkpdForm) {
  lkpdForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const nama = this.querySelector('input[type="text"]').value;
    alert(`Terima kasih ${nama}! LKPD Anda telah berhasil dikirim.`);
    this.reset();
  });
}

// ==================== REFLECTION FORM ====================

const reflectionForm = document.getElementById("reflectionForm");
if (reflectionForm) {
  reflectionForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const textareas = this.querySelectorAll("textarea");
    const responses = Array.from(textareas).map((ta) => ta.value);

    // Save to localStorage for demonstration
    localStorage.setItem("reflections", JSON.stringify(responses));

    alert(
      "Refleksi Anda telah berhasil disimpan. Terima kasih telah merefleksikan pembelajaran Anda!",
    );
    this.reset();
  });
}

// ==================== PAGE LOAD INITIALIZATION ====================

document.addEventListener("DOMContentLoaded", function () {
  // Initialize game on page load if in game modal
  const gameArea = document.getElementById("gameArea");
  if (gameArea) {
    // Game will be initialized when modal opens
  }

  // Add smooth scroll behavior
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href !== "#") {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    });
  });

  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll(".nav-link");
  const navMenu = document.querySelector(".nav-menu");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (navMenu) {
        navMenu.classList.remove("show");
      }
    });
  });
});

// ==================== UTILITY FUNCTIONS ====================

// Load reflections from localStorage
function loadReflections() {
  const saved = localStorage.getItem("reflections");
  if (saved) {
    return JSON.parse(saved);
  }
  return null;
}

// Export user data (for demonstration)
function exportUserData() {
  const userData = {
    timestamp: new Date().toISOString(),
    reflections: loadReflections(),
    gameScore: score,
    totalQuestions: quizQuestions.length,
  };

  const dataStr = JSON.stringify(userData, null, 2);
  const dataBlob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `learning_data_${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
}

// ==================== MODERN GAME SYSTEM ====================

const gameQuestions = [
  // ========== MUDAH (10 SOAL) ==========
  {
    question: "Organel sel yang berfungsi sebagai pusat energi adalah?",
    options: ["Inti sel", "Mitokondria", "Ribosom", "Badan Golgi"],
    correct: 1,
    difficulty: "easy",
    explanation:
      "Mitokondria dikenal sebagai 'powerhouse sel' karena menghasilkan ATP",
  },
  {
    question:
      "Proses pembuatan makanan pada tumbuhan menggunakan cahaya disebut?",
    options: ["Respirasi", "Fotosintesis", "Fermentasi", "Transpirasi"],
    correct: 1,
    difficulty: "easy",
    explanation:
      "Fotosintesis adalah proses mengubah cahaya matahari menjadi energi kimia",
  },
  {
    question: "Membran sel berfungsi untuk?",
    options: [
      "Menyimpan energi",
      "Mengontrol masuk keluarnya zat",
      "Tempat sintesis protein",
      "Memproduksi energi",
    ],
    correct: 1,
    difficulty: "easy",
    explanation:
      "Membran sel adalah barrier selektif yang mengontrol transportasi zat",
  },
  {
    question: "Perbedaan utama sel hewan dan tumbuhan adalah?",
    options: [
      "Tidak ada perbedaan",
      "Sel tumbuhan memiliki dinding sel",
      "Sel hewan lebih besar",
      "Sel tumbuhan tidak punya nukleus",
    ],
    correct: 1,
    difficulty: "easy",
    explanation: "Sel tumbuhan memiliki dinding sel yang kaku, sel hewan tidak",
  },
  {
    question: "Organel yang mengandung informasi genetik adalah?",
    options: ["Mitokondria", "Nukleus", "Ribosom", "Vakuola"],
    correct: 1,
    difficulty: "easy",
    explanation: "Nukleus menyimpan DNA dan mengontrol semua aktivitas sel",
  },
  {
    question: "Ribosom berfungsi untuk?",
    options: [
      "Menyimpan energi",
      "Sintesis protein",
      "Respirasi seluler",
      "Fotosintesis",
    ],
    correct: 1,
    difficulty: "easy",
    explanation:
      "Ribosom adalah tempat di mana mRNA diterjemahkan menjadi protein",
  },
  {
    question: "Organel yang mengandung enzim pencerna adalah?",
    options: ["Vakuola", "Lisosom", "Plastida", "Sentriol"],
    correct: 1,
    difficulty: "easy",
    explanation:
      "Lisosom mengandung enzim hidrolitik yang memecah zat-zat dalam sel",
  },
  {
    question: "Kloroplas ditemukan pada?",
    options: ["Sel hewan", "Sel tumbuhan", "Bakteri", "Semua sel"],
    correct: 1,
    difficulty: "easy",
    explanation:
      "Kloroplas adalah organel sel tumbuhan yang melakukan fotosintesis",
  },
  {
    question: "Sel yang tidak memiliki membran inti adalah?",
    options: ["Sel eukariotik", "Sel prokariotik", "Sel tumbuhan", "Sel hewan"],
    correct: 1,
    difficulty: "easy",
    explanation:
      "Sel prokariotik seperti bakteri tidak memiliki inti sel yang terbungkus membran",
  },
  {
    question: "Proses pembelahan sel yang menghasilkan 2 sel identik disebut?",
    options: ["Meiosis", "Mitosis", "Amitosis", "Cytokinesis"],
    correct: 1,
    difficulty: "easy",
    explanation:
      "Mitosis adalah pembelahan sel yang menghasilkan dua sel anak identik secara genetik",
  },

  // ========== SEDANG (15 SOAL) ==========
  {
    question:
      "Organel yang berfungsi untuk sekresi dan pengemasan protein adalah?",
    options: ["Ribosom", "Mitokondria", "Badan Golgi", "Lisosom"],
    correct: 2,
    difficulty: "medium",
    explanation:
      "Badan Golgi memodifikasi, mengurutkan, dan membungkus protein untuk dikirim keluar sel",
  },
  {
    question: "Difusi yang dibantu oleh protein transpor tanpa energi disebut?",
    options: [
      "Osmosis",
      "Difusi biasa",
      "Difusi terfasilitasi",
      "Transpor aktif",
    ],
    correct: 2,
    difficulty: "medium",
    explanation:
      "Difusi terfasilitasi memerlukan protein transpor tapi tidak memerlukan energi ATP",
  },
  {
    question: "Transpor yang memerlukan energi ATP adalah?",
    options: ["Difusi", "Osmosis", "Transpor aktif", "Difusi terfasilitasi"],
    correct: 2,
    difficulty: "medium",
    explanation:
      "Transpor aktif melawan gradien konsentrasi dan memerlukan energi ATP",
  },
  {
    question: "Tahap pembelahan sel ketika kromosom berjajar di tengah adalah?",
    options: ["Profase", "Metafase", "Anafase", "Telofase"],
    correct: 1,
    difficulty: "medium",
    explanation:
      "Metafase adalah tahap di mana kromosom teralignasi di plat ekuator sel",
  },
  {
    question: "Retikulum endoplasma yang ditempeli ribosom disebut?",
    options: ["RE halus", "RE kasar", "Badan Golgi", "Mitokondria"],
    correct: 1,
    difficulty: "medium",
    explanation:
      "RE kasar berfungsi dalam sintesis protein karena kehadiran ribosom",
  },
  {
    question: "Tahap pembelahan mitosis di mana kromatid terpisah adalah?",
    options: ["Profase", "Metafase", "Anafase", "Telofase"],
    correct: 2,
    difficulty: "medium",
    explanation:
      "Anafase adalah tahap ketika kromatid saudara berpisah dan bergerak ke kutub berlawanan",
  },
  {
    question:
      "Organel yang berfungsi menyimpan zat cadangan pada tumbuhan adalah?",
    options: ["Vakuola", "Lisosom", "Mitokondria", "Sentriol"],
    correct: 0,
    difficulty: "medium",
    explanation:
      "Vakuola sel tumbuhan besar dan berfungsi menyimpan air, nutrisi, dan zat cadangan",
  },
  {
    question:
      "Proses pemasukan zat ke dalam sel dengan cara membentuk vesikel disebut?",
    options: ["Eksositosis", "Endositosis", "Fagositosis", "Pinositosis"],
    correct: 1,
    difficulty: "medium",
    explanation:
      "Endositosis adalah proses pemasukan zat dengan pembentukan vesikel dari membran",
  },
  {
    question: "Saluran komunikasi antar sel tumbuhan disebut?",
    options: ["Gap junction", "Plasmodesmata", "Desmosom", "Tight junction"],
    correct: 1,
    difficulty: "medium",
    explanation:
      "Plasmodesmata adalah pori-pori kecil yang menghubungkan sitoplasma sel tumbuhan",
  },
  {
    question: "Lapisan karbohidrat pada permukaan luar membran sel disebut?",
    options: ["Glikolipid", "Glikoprotein", "Glikokaliks", "Fosfolipid"],
    correct: 2,
    difficulty: "medium",
    explanation: "Glikokaliks berfungsi dalam pengenalan sel dan perlindungan",
  },
  {
    question: "Kompleks DNA dan protein yang membentuk kromosom disebut?",
    options: ["Gen", "Allel", "Kromatin", "Sentromer"],
    correct: 2,
    difficulty: "medium",
    explanation:
      "Kromatin adalah struktur DNA dan histone protein yang membentuk kromosom",
  },
  {
    question:
      "Dumbbell-shaped structure di pole sel yang membantu pembelahan adalah?",
    options: ["Sentriol", "Sentromer", "Nukleus", "Peroksisom"],
    correct: 0,
    difficulty: "medium",
    explanation:
      "Sentriol berfungsi dalam pembentukan benang spindle selama pembelahan sel",
  },
  {
    question: "Proses pemecahan glukosa menjadi piruvat di sitoplasma disebut?",
    options: ["Fotosintesis", "Glikolisis", "Siklus Krebs", "Oksidasi"],
    correct: 1,
    difficulty: "medium",
    explanation:
      "Glikolisis adalah tahap pertama respirasi seluler yang terjadi di sitoplasma",
  },
  {
    question: "Pigmen hijau pada kloroplas yang menangkap cahaya adalah?",
    options: ["Karotenoid", "Klorofil", "Antosianin", "Xantofil"],
    correct: 1,
    difficulty: "medium",
    explanation:
      "Klorofil adalah pigmen utama yang menyerap cahaya untuk fotosintesis",
  },
  {
    question:
      "Teori yang menjelaskan asal-usul mitokondria dari bakteri adalah?",
    options: [
      "Teori evolusi",
      "Endosimbiosis",
      "Teori sel",
      "Teori generasi spontan",
    ],
    correct: 1,
    difficulty: "medium",
    explanation:
      "Teori endosimbiosis menyatakan mitokondria berasal dari bakteri yang hidup dalam sel",
  },

  // ========== SULIT (20 SOAL) ==========
  {
    question: "Protein integral yang menembus seluruh membran sel disebut?",
    options: ["Glikoprotein", "Peptida", "Transmembran", "Lipoprotein"],
    correct: 2,
    difficulty: "hard",
    explanation:
      "Protein transmembran melalui seluruh lapisan lipid ganda membran sel",
  },
  {
    question:
      "Proses pengecilan sel ketika berada dalam larutan hipertonik disebut?",
    options: ["Lisis", "Plasmolisis", "Turgor", "Osmosis"],
    correct: 1,
    difficulty: "hard",
    explanation:
      "Plasmolisis adalah pengecilan protoplasma saat sel berada dalam larutan hipertonik",
  },
  {
    question:
      "Daerah penyempitan pada kromosom yang menghubungkan kromatid saudara adalah?",
    options: ["Telomere", "Sentromer", "Lokus", "Alel"],
    correct: 1,
    difficulty: "hard",
    explanation:
      "Sentromer adalah daerah penyempitan di mana kromatid saudara terikat bersama",
  },
  {
    question:
      "Struktur membran di dalam kloroplas yang mengandung klorofil disebut?",
    options: ["Granum", "Stroma", "Tilakoid", "Matrix"],
    correct: 2,
    difficulty: "hard",
    explanation:
      "Tilakoid adalah membran lempeng di dalam kloroplas di mana fotosintesis berlangsung",
  },
  {
    question: "Tumpukan tilakoid di dalam kloroplas disebut?",
    options: ["Stroma", "Granum", "Lumen", "Matriks"],
    correct: 1,
    difficulty: "hard",
    explanation:
      "Granum adalah tumpukan tilakoid yang merupakan tempat reaksi terang fotosintesis",
  },
  {
    question:
      "Proses pembentukan senyawa kompleks dari senyawa sederhana di dalam sel disebut?",
    options: ["Katabolisme", "Biosintesis", "Homeostasis", "Replikasi"],
    correct: 1,
    difficulty: "hard",
    explanation:
      "Biosintesis adalah proses anabolik pembentukan molekul kompleks dari yang lebih sederhana",
  },
  {
    question: "Jenis sel haploid yang dihasilkan dari meiosis disebut?",
    options: ["Sel somatis", "Gamet", "Sel mitokondria", "Sel tunas"],
    correct: 1,
    difficulty: "hard",
    explanation:
      "Gamet adalah sel reproduksi dengan jumlah kromosom n yang dihasilkan meiosis",
  },
  {
    question: "Pembelahan sel yang menghasilkan 4 sel haploid disebut?",
    options: ["Mitosis", "Meiosis", "Amitosis", "Cytokinesis"],
    correct: 1,
    difficulty: "hard",
    explanation:
      "Meiosis menghasilkan 4 sel anak dengan setengah jumlah kromosom (haploid)",
  },
  {
    question: "Organel tempat produksi ATP dalam respirasi seluler adalah?",
    options: ["Ribosom", "Nukleus", "Mitokondria", "RE halus"],
    correct: 2,
    difficulty: "hard",
    explanation:
      "Mitokondria menghasilkan ATP melalui proses respirasi seluler aerobik",
  },
  {
    question: "Fase interfase di mana DNA direplikasi disebut?",
    options: ["Fase G1", "Fase S", "Fase G2", "Fase M"],
    correct: 1,
    difficulty: "hard",
    explanation:
      "Fase S (synthesis) adalah saat DNA direplikasi dalam interfase",
  },
  {
    question: "Kematian sel yang terprogram dalam organisme normal disebut?",
    options: ["Nekrosis", "Apoptosis", "Autolisis", "Lisis"],
    correct: 1,
    difficulty: "hard",
    explanation:
      "Apoptosis adalah kematian sel terprogram yang penting untuk perkembangan normal",
  },
  {
    question:
      "Efek osmotik ketika sel mempertahankan volume tetap dalam larutan isotonik adalah?",
    options: ["Turgor", "Plasmolisis", "Hemolisis", "Lisis"],
    correct: 0,
    difficulty: "hard",
    explanation:
      "Turgor adalah tekanan positif dalam sel akibat osmosis dalam larutan isotonik",
  },
  {
    question:
      "Protein yang berperan sebagai katalisator dalam reaksi biokimia sel adalah?",
    options: ["Hormon", "Enzim", "Antibodi", "Hemoglobin"],
    correct: 1,
    difficulty: "hard",
    explanation:
      "Enzim adalah protein yang mempercepat reaksi kimia tanpa diubah sendiri",
  },
  {
    question:
      "Jaringan serat yang memberikan struktur dan dukungan pada sel disebut?",
    options: ["Membran sel", "Sitoplasma", "Sitoskeleton", "Matriks"],
    correct: 2,
    difficulty: "hard",
    explanation:
      "Sitoskeleton tersusun dari mikrotubulus, mikrofilamen, dan filamen menengah",
  },
  {
    question:
      "Organel yang melakukan autophagy atau pencernaan internal diri disebut?",
    options: ["Vakuola", "Peroksisom", "Lisosom", "Glioksisom"],
    correct: 2,
    difficulty: "hard",
    explanation:
      "Lisosom dapat memecah organel sel yang sudah rusak atau sel yang akan mati",
  },
  {
    question: "Proses metabolisme yang memerlukan oksigen disebut?",
    options: [
      "Fermentasi",
      "Respirasi anaerob",
      "Respirasi aerob",
      "Glikolisis",
    ],
    correct: 2,
    difficulty: "hard",
    explanation:
      "Respirasi aerob menggunakan oksigen sebagai penerima elektron akhir untuk produksi ATP",
  },
  {
    question: "Membrane potential yang terjaga oleh pompa Na-K adalah?",
    options: ["+60mV", "-70mV", "+100mV", "-30mV"],
    correct: 1,
    difficulty: "hard",
    explanation:
      "Potensial membran istirahat sekitar -70mV dijaga oleh pompa Na-K yang aktif",
  },
  {
    question:
      "Proses sel menelan partikel padat besar seperti bakteri disebut?",
    options: ["Pinositosis", "Endositosis", "Fagositosis", "Eksositosis"],
    correct: 2,
    difficulty: "hard",
    explanation:
      "Fagositosis adalah jenis endositosis untuk partikel besar oleh sel fagosit",
  },
  {
    question:
      "Struktur pembentukan tubulus dalam sel berkas mikrotubulus disebut?",
    options: ["Ribosom", "Sentriol", "MTOC", "Flagel"],
    correct: 2,
    difficulty: "hard",
    explanation:
      "MTOC (Microtubule Organizing Center) atau aster merupakan sumber mikrotubulus sel",
  },
  {
    question:
      "Teori fundamental yang menyatakan semua makhluk hidup tersusun dari sel adalah?",
    options: ["Teori evolusi", "Teori sel", "Teori atom", "Teori keturunan"],
    correct: 1,
    difficulty: "hard",
    explanation:
      "Teori sel menyatakan sel adalah unit dasar kehidupan dan semua sel berasal dari sel lain",
  },
];

let gameState = {
  currentQuestion: 0,
  score: 0,
  streak: 0,
  level: "easy",
  questions: [],
  answered: [],
  startTime: null,
};

function startGame(level) {
  gameState.level = level;

  // Set number of questions based on level
  const numberOfQuestions =
    level === "easy" ? 10 : level === "medium" ? 15 : 20;

  // Filter questions by difficulty level
  const questionsByDifficulty = gameQuestions.filter(
    (q) => q.difficulty === level,
  );

  // Shuffle dan ambil questions
  gameState.questions = questionsByDifficulty
    .sort(() => Math.random() - 0.5)
    .slice(0, numberOfQuestions);
  gameState.currentQuestion = 0;
  gameState.score = 0;
  gameState.streak = 0;
  gameState.answered = [];
  gameState.startTime = Date.now();

  // Hide welcome screen
  document.getElementById("gameWelcome").style.display = "none";
  document.getElementById("gamePlayArea").style.display = "block";

  // Update UI
  document.getElementById("totalQuestion").textContent = numberOfQuestions;

  // Load first question
  loadQuestion();
}

function loadQuestion() {
  const question = gameState.questions[gameState.currentQuestion];

  // Update progress bar
  const progress =
    ((gameState.currentQuestion + 1) / gameState.questions.length) * 100;
  document.getElementById("progressBar").style.width = progress + "%";

  // Update question number
  document.getElementById("currentQuestion").textContent =
    gameState.currentQuestion + 1;
  document.getElementById("questionNum").textContent =
    gameState.currentQuestion + 1;

  // Display question
  document.getElementById("gameQuestionText").textContent = question.question;

  // Display options
  const optionsContainer = document.getElementById("gameOptionsDisplay");
  optionsContainer.innerHTML = "";

  question.options.forEach((option, index) => {
    const optionBtn = document.createElement("div");
    optionBtn.className = "game-option";
    optionBtn.textContent = option;
    optionBtn.onclick = () => answerQuestion(index, optionBtn);
    optionsContainer.appendChild(optionBtn);
  });

  // Reset feedback
  document.getElementById("answerFeedback").innerHTML = "";
}

function answerQuestion(selectedIndex, element) {
  const question = gameState.questions[gameState.currentQuestion];
  const isCorrect = selectedIndex === question.correct;

  // Disable all options
  document.querySelectorAll(".game-option").forEach((btn) => {
    btn.classList.add("disabled");
  });

  if (isCorrect) {
    element.classList.add("correct");
    gameState.score +=
      gameState.level === "hard" ? 15 : gameState.level === "medium" ? 10 : 5;
    gameState.streak++;

    document.getElementById("gameScore").textContent = gameState.score;
    document.getElementById("gameStreak").textContent = gameState.streak;
    document.getElementById("answerFeedback").innerHTML =
      "✅ Benar! " + question.explanation;
    document.getElementById("answerFeedback").style.color = "#4CAF50";

    // Play success sound effect (using emoji)
    playSound("correct");
  } else {
    element.classList.add("incorrect");
    gameState.streak = 0;
    document.getElementById("gameStreak").textContent = "0";

    // Show correct answer
    const options = document.querySelectorAll(".game-option");
    options[question.correct].classList.add("correct");

    document.getElementById("answerFeedback").innerHTML =
      "❌ Salah! <br>" + question.explanation;
    document.getElementById("answerFeedback").style.color = "#f44336";

    playSound("incorrect");
  }

  gameState.answered.push({
    question: question.question,
    selected: selectedIndex,
    correct: question.correct,
    isCorrect: isCorrect,
  });

  // Auto move to next question after 3 seconds
  setTimeout(() => {
    if (gameState.currentQuestion < gameState.questions.length - 1) {
      gameState.currentQuestion++;
      loadQuestion();
    } else {
      endGame();
    }
  }, 3000);
}

function skipQuestion() {
  if (gameState.currentQuestion < gameState.questions.length - 1) {
    gameState.currentQuestion++;
    loadQuestion();
  } else {
    endGame();
  }
}

function endGame() {
  const totalQuestions = gameState.questions.length;
  const correctAnswers = gameState.answered.filter((a) => a.isCorrect).length;
  const accuracy = Math.round((correctAnswers / totalQuestions) * 100);

  // Determine achievement
  let achievement = "";
  let emoji = "😐";
  let title = "Cukup";

  if (accuracy === 100) {
    achievement = "🏆 SEMPURNA! Anda menguasai semua soal!";
    emoji = "🏆";
    title = "GEMILANG!";
  } else if (accuracy >= 80) {
    achievement = "⭐ Luar biasa! Anda sangat memahami materi!";
    emoji = "⭐";
    title = "Luar Biasa!";
  } else if (accuracy >= 60) {
    achievement = "👍 Bagus! Terus tingkatkan pemahaman Anda!";
    emoji = "👍";
    title = "Bagus";
  } else if (accuracy >= 40) {
    achievement = "📚 Cukup baik. Pelajari materi lebih dalam!";
    emoji = "📚";
    title = "Cukup";
  } else {
    achievement = "💪 Jangan putus asa! Terus belajar dan coba lagi!";
    emoji = "💪";
    title = "Perlu Belajar Lagi";
  }

  // Hide game play, show result
  document.getElementById("gamePlayArea").style.display = "none";
  document.getElementById("gameResultArea").style.display = "block";

  // Update result display
  document.getElementById("resultEmoji").textContent = emoji;
  document.getElementById("resultTitle").textContent = title;
  document.getElementById("finalScore").textContent = gameState.score;
  document.getElementById("correctAnswers").textContent =
    correctAnswers + "/" + totalQuestions;
  document.getElementById("accuracy").textContent = accuracy + "%";
  document.getElementById("achievementText").textContent = achievement;
}

function resetGame() {
  // Reset to welcome screen
  document.getElementById("gameWelcome").style.display = "block";
  document.getElementById("gamePlayArea").style.display = "none";
  document.getElementById("gameResultArea").style.display = "none";

  // Reset game state
  gameState = {
    currentQuestion: 0,
    score: 0,
    streak: 0,
    level: "easy",
    questions: [],
    answered: [],
    startTime: null,
  };
}

function playSound(type) {
  // Simple sound effects using Web Audio API or emoji reactions
  if (type === "correct") {
    // Visual feedback is enough
    console.log("✅ Correct!");
  } else if (type === "incorrect") {
    console.log("❌ Incorrect!");
  }
}

// ==================== KEYBOARD SHORTCUTS ====================

document.addEventListener("keydown", function (event) {
  // ESC to close modal
  if (event.key === "Escape") {
    const modals = document.querySelectorAll(".modal.show");
    modals.forEach((modal) => {
      modal.classList.remove("show");
    });
  }
});

// ==================== SCROLL ANIMATIONS ====================

function initializeScrollAnimations() {
  // Create Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px", // Trigger animation 50px before bottom of viewport
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Get the animation class from data attribute or apply default
        const animationType =
          entry.target.dataset.animation || "animate-fade-in-up";
        entry.target.classList.add(animationType);
        // Stop observing this element after animation is applied
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Select all elements that should be animated
  const elementsToAnimate = document.querySelectorAll(
    ".hero, .guide-section, .features-section, .guide-card, .feature-box, .guide-grid, .features-grid, .hero-content, .hero-image, h2, h3, p, .btn-primary, .btn-secondary",
  );

  elementsToAnimate.forEach((element, index) => {
    // Skip if element is not in main content or is a modal or is in footer
    if (
      element.closest(".modal") ||
      element.closest(".splash-screen") ||
      element.closest(".footer")
    ) {
      return;
    }

    // Determine animation based on element type
    let animationType = "animate-fade-in-up";

    if (element.classList.contains("hero-content")) {
      animationType = "animate-fade-in-left";
    } else if (element.classList.contains("hero-image")) {
      animationType = "animate-fade-in-right";
    } else if (
      element.classList.contains("feature-box") ||
      element.classList.contains("guide-card")
    ) {
      animationType = "animate-zoom-in";
    }

    element.dataset.animation = animationType;
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.willChange = "opacity, transform";

    observer.observe(element);
  });

  // Add staggered animation to grid containers
  const gridContainers = document.querySelectorAll(
    ".features-grid, .guide-grid, .videos-grid",
  );
  gridContainers.forEach((container) => {
    container.classList.add("animate-stagger");
  });
}
