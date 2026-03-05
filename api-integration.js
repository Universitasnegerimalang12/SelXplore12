/**
 * Biology Learning Platform - API Integration Examples
 * Contoh cara mengintegrasikan frontend dengan backend API
 */

// ==================== BASE CONFIGURATION ====================

const API_BASE_URL = "http://localhost:5000/api";

// Current user ID (dalam praktek, ini akan dari login)
let currentUserId = "user_" + Date.now(); // Generate unique ID

// ==================== HELPER FUNCTIONS ====================

/**
 * Generic API Call Function
 */
async function apiCall(endpoint, method = "GET", data = null) {
  try {
    const options = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (data && method !== "GET") {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("API Call Error:", error);
    throw error;
  }
}

/**
 * Safe API Call dengan error handling
 */
async function safeApiCall(endpoint, method = "GET", data = null) {
  try {
    return await apiCall(endpoint, method, data);
  } catch (error) {
    console.error(`Failed to ${method} ${endpoint}:`, error);
    return null;
  }
}

// ==================== USER MANAGEMENT ====================

/**
 * Create a new user
 */
async function createUser(userId, userName) {
  const userData = {
    user_id: userId,
    name: userName,
  };

  const result = await apiCall("/users", "POST", userData);
  console.log("User created:", result);
  return result;
}

/**
 * Get user profile
 */
async function getUserProfile(userId) {
  const result = await safeApiCall(`/users/${userId}`);
  if (result) {
    console.log("User Profile:", result);
    return result;
  }
}

/**
 * Get user profile with statistics
 */
async function getUserStats(userId) {
  const result = await safeApiCall(`/users/${userId}/profile`);
  if (result) {
    console.log("User Statistics:", result);
    return result;
  }
}

/**
 * Update UI dengan user data
 */
async function updateUserUI(userId) {
  const stats = await getUserStats(userId);
  if (stats) {
    document.getElementById("user-name").textContent = stats.name;
    document.getElementById("materials-completed").textContent =
      stats.materials_completed;
    document.getElementById("videos-watched").textContent =
      stats.videos_watched;
    document.getElementById("average-score").textContent =
      stats.average_score.toFixed(1);

    const percentage = (stats.materials_completed / 15) * 100; // Assuming 15 total materials
    document.getElementById("progress-fill").style.width = percentage + "%";
  }
}

// ==================== REFLECTIONS ====================

/**
 * Save reflection data
 */
async function saveReflection(
  userId,
  easyObj,
  difficultObj,
  applicationObj,
  level,
) {
  const reflectionData = {
    user_id: userId,
    easy_concept: easyObj,
    difficult_concept: difficultObj,
    application: applicationObj,
    understanding_level: level,
  };

  const result = await apiCall("/reflections", "POST", reflectionData);
  console.log("Reflection saved:", result);
  return result;
}

/**
 * Get user reflections
 */
async function getUserReflections(userId) {
  const result = await safeApiCall(`/reflections/${userId}`);
  if (result) {
    console.log("User Reflections:", result);
    return result;
  }
}

/**
 * Display reflections in UI
 */
async function displayReflections(userId) {
  const reflections = await getUserReflections(userId);
  if (reflections && reflections.length > 0) {
    const container = document.getElementById("reflections-container");
    container.innerHTML = "";

    reflections.forEach((reflection, index) => {
      const html = `
                <div class="reflection-card">
                    <h4>Refleksi ke-${index + 1}</h4>
                    <p><strong>Mudah:</strong> ${reflection.easy_concept}</p>
                    <p><strong>Sulit:</strong> ${reflection.difficult_concept}</p>
                    <p><strong>Aplikasi:</strong> ${reflection.application}</p>
                    <p><strong>Level:</strong> ${reflection.understanding_level}/5</p>
                    <p class="date">${new Date(reflection.created_at).toLocaleDateString()}</p>
                </div>
            `;
      container.innerHTML += html;
    });
  }
}

// ==================== LKPD ====================

/**
 * Submit LKPD
 */
async function submitLKPD(userId, userName, answers) {
  const lkpdData = {
    user_id: userId,
    name: userName,
    answers: answers,
  };

  const result = await apiCall("/lkpd", "POST", lkpdData);
  console.log("LKPD submitted:", result);
  return result;
}

/**
 * Get user LKPD submissions
 */
async function getUserLKPD(userId) {
  const result = await safeApiCall(`/lkpd/${userId}`);
  if (result) {
    console.log("User LKPD:", result);
    return result;
  }
}

/**
 * Handle LKPD form submission
 */
async function handleLKPDSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  const answers = {
    question_1: formData.get("question_1"),
    question_2: formData.get("question_2"),
  };

  const result = await submitLKPD(currentUserId, "Student Name", answers);
  if (result) {
    alert("LKPD successfully submitted!");
    form.reset();
  }
}

// ==================== SCORES ====================

/**
 * Save quiz score
 */
async function saveQuizScore(
  userId,
  score,
  totalQuestions,
  quizType = "unit_1",
) {
  const scoreData = {
    user_id: userId,
    score: score,
    total_questions: totalQuestions,
    quiz_type: quizType,
  };

  const result = await apiCall("/scores", "POST", scoreData);
  console.log("Score saved:", result);
  return result;
}

/**
 * Get user scores with statistics
 */
async function getUserScores(userId) {
  const result = await safeApiCall(`/scores/${userId}`);
  if (result) {
    console.log("User Scores:", result);
    return result;
  }
}

/**
 * Display score statistics
 */
async function displayScoreStats(userId) {
  const scoresData = await getUserScores(userId);
  if (scoresData && scoresData.statistics) {
    const stats = scoresData.statistics;

    document.getElementById("total-quizzes").textContent = stats.total_quizzes;
    document.getElementById("average-score").textContent =
      stats.average_score.toFixed(2);
    document.getElementById("highest-score").textContent = stats.highest_score;
    document.getElementById("average-percentage").textContent =
      stats.average_percentage.toFixed(1);

    // Display all scores
    const scoresList = document.getElementById("scores-list");
    scoresList.innerHTML = "";

    scoresData.scores.forEach((score, index) => {
      const html = `
                <div class="score-item">
                    <p><strong>Quiz ${index + 1}:</strong> ${score.score}/${score.total_questions} (${score.percentage.toFixed(1)}%)</p>
                    <p class="date">${new Date(score.created_at).toLocaleDateString()}</p>
                </div>
            `;
      scoresList.innerHTML += html;
    });
  }
}

// ==================== LEARNING PROGRESS ====================

/**
 * Mark material as completed
 */
async function markMaterialComplete(userId, materialId) {
  const result = await safeApiCall(
    `/materials/${userId}/complete/${materialId}`,
    "POST",
  );
  console.log("Material marked complete:", result);
  return result;
}

/**
 * Mark video as watched
 */
async function markVideoWatched(userId, videoId) {
  const result = await safeApiCall(
    `/videos/${userId}/watched/${videoId}`,
    "POST",
  );
  console.log("Video marked as watched:", result);
  return result;
}

/**
 * Update progress display
 */
async function updateProgressUI(userId) {
  const profile = await getUserStats(userId);
  if (profile) {
    // Update material progress
    const materialProgress = (profile.materials_completed / 15) * 100;
    document.getElementById("material-progress").style.width =
      materialProgress + "%";
    document.getElementById("material-count").textContent =
      `${profile.materials_completed}/15`;

    // Update video progress
    const videoProgress = (profile.videos_watched / 10) * 100;
    document.getElementById("video-progress").style.width = videoProgress + "%";
    document.getElementById("video-count").textContent =
      `${profile.videos_watched}/10`;
  }
}

// ==================== DATA EXPORT ====================

/**
 * Export all user data
 */
async function exportUserData(userId) {
  const result = await safeApiCall(`/export/${userId}`);
  if (result) {
    console.log("User data exported:", result);

    // Download as JSON file
    const dataStr = JSON.stringify(result, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `biology_platform_data_${userId}_${new Date().toISOString().slice(0, 10)}.json`;
    link.click();

    return result;
  }
}

/**
 * Get platform statistics
 */
async function getPlatformStats() {
  const result = await safeApiCall("/statistics");
  if (result) {
    console.log("Platform Statistics:", result);
    return result;
  }
}

/**
 * Display platform statistics
 */
async function displayPlatformStats() {
  const stats = await getPlatformStats();
  if (stats) {
    document.getElementById("total-users").textContent = stats.total_users;
    document.getElementById("total-reflections").textContent =
      stats.total_reflections;
    document.getElementById("total-submissions").textContent =
      stats.total_lkpd_submissions;
    document.getElementById("total-attempts").textContent =
      stats.total_quiz_attempts;
    document.getElementById("avg-platform-score").textContent =
      stats.average_score.toFixed(2);
  }
}

// ==================== INITIALIZATION ====================

/**
 * Initialize user session
 */
async function initializeUser(userName = "Pelajar Biologi") {
  try {
    // Create user first
    const user = await createUser(currentUserId, userName);
    console.log("User initialized:", currentUserId);

    // Load user profile
    await updateUserUI(currentUserId);

    return user;
  } catch (error) {
    console.error("Error initializing user:", error);
  }
}

/**
 * Load all user data
 */
async function loadAllUserData(userId) {
  try {
    await Promise.all([
      updateUserUI(userId),
      displayReflections(userId),
      displayScoreStats(userId),
      updateProgressUI(userId),
    ]);
    console.log("All user data loaded");
  } catch (error) {
    console.error("Error loading user data:", error);
  }
}

// ==================== EVENT LISTENERS ====================

/**
 * Setup form event listeners
 */
function setupEventListeners() {
  // LKPD Form
  const lkpdForm = document.getElementById("lkpdForm");
  if (lkpdForm) {
    lkpdForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(lkpdForm);
      const answers = Object.fromEntries(formData);

      const result = await submitLKPD(currentUserId, "Student", answers);
      if (result) {
        alert("LKPD berhasil dikirim!");
      }
    });
  }

  // Export Data Button
  const exportBtn = document.getElementById("exportBtn");
  if (exportBtn) {
    exportBtn.addEventListener("click", () => {
      exportUserData(currentUserId);
    });
  }

  // Quiz Form
  const quizForm = document.getElementById("quizForm");
  if (quizForm) {
    quizForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Count correct answers
      let score = 0;
      const correctAnswers = {
        q1: "b",
        q2: "b",
        q3: "b",
      };

      for (let key in correctAnswers) {
        const selected = document.querySelector(`input[name="${key}"]:checked`);
        if (selected && selected.value === correctAnswers[key]) {
          score++;
        }
      }

      // Save score
      await saveQuizScore(currentUserId, score, 3, "evaluation");

      // Update display
      await displayScoreStats(currentUserId);
      alert(`Score: ${score}/3`);
    });
  }
}

// ==================== UTILITY FUNCTIONS ====================

/**
 * Test API connection
 */
async function testAPIConnection() {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    const data = await response.json();
    console.log("API Connection Test:", data);
    return data.status === "healthy";
  } catch (error) {
    console.error("API Connection Failed:", error);
    return false;
  }
}

/**
 * Initialize on page load
 */
document.addEventListener("DOMContentLoaded", async function () {
  console.log("Initializing Biology Learning Platform...");

  // Test API
  const isConnected = await testAPIConnection();
  console.log("API Connected:", isConnected);

  // Initialize user
  await initializeUser("Pelajar Biologi");

  // Setup event listeners
  setupEventListeners();

  console.log("Platform initialized successfully!");
});

// ==================== EXPORT FOR USE IN OTHER FILES ====================

// Buat global access
window.BiologyAPI = {
  createUser,
  getUserProfile,
  getUserStats,
  saveReflection,
  getUserReflections,
  submitLKPD,
  getUserLKPD,
  saveQuizScore,
  getUserScores,
  markMaterialComplete,
  markVideoWatched,
  exportUserData,
  getPlatformStats,
  testAPIConnection,
  initializeUser,
  loadAllUserData,
};

console.log("Biology API available at window.BiologyAPI");
