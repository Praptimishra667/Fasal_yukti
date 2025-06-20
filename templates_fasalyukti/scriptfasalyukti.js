const translations = {
  en: {
    formTitle: "Smart Crop Recommendation",
    labels: ["Nitrogen", "Phosphorus", "Potassium", "Soil pH", "Rainfall (mm)"],
    recommend: "🌱 Recommend",
    reset: "🔄 Reset",
    resultPrefix: "Recommended crop is: 🌾",
    goBack: "🔁 Go Back",
    crops: ["Rice", "Wheat", "Chickpea", "Maize", "Barley", "Mustard"]
  },
  hi: {
    formTitle: "स्मार्ट फसल सिफारिश",
    labels: ["नाइट्रोजन", "फॉस्फोरस", "पोटैशियम", "मिट्टी का पीएच", "वर्षा (मिमी)"],
    recommend: "🌱 सिफारिश करें",
    reset: "🔄 रीसेट",
    resultPrefix: "अनुशंसित फसल है: 🌾",
    goBack: "🔁 वापिस जाएं",
    crops: ["चावल", "गेहूं", "चना", "मक्का", "जौ", "सरसों"]
  },
  or: {
    formTitle: "ସ୍ମାର୍ଟ ଫସଲ ସୁପାରିଶ",
    labels: ["ନାଇଟ୍ରୋଜେନ୍", "ଫସ୍ଫୋରସ୍", "ପଟାସିଅମ୍", "ମାଟିର pH", "ବର୍ଷା (ମି.ମି)"],
    recommend: "🌱 ସୁପାରିଶ କରନ୍ତୁ",
    reset: "🔄 ପୁନଃସେଟ୍",
    resultPrefix: "ଅନୁଶଂସିତ ଫସଲ: 🌾",
    goBack: "🔁 ପଛକୁ ଯିବେ",
    crops: ["ଧାନ", "ଗହମ", "ଛୋଲା", "ମକା", "ଯଉ", "ସରିସପ"]
  }
};

function changeLanguage(lang) {
  const t = translations[lang];
  document.getElementById('formTitle').textContent = t.formTitle;
  document.getElementById('labelN').textContent = t.labels[0];
  document.getElementById('labelP').textContent = t.labels[1];
  document.getElementById('labelK').textContent = t.labels[2];
  document.getElementById('labelPH').textContent = t.labels[3];
  document.getElementById('labelRain').textContent = t.labels[4];
  document.querySelector(".form-box button").textContent = t.recommend;
  document.querySelectorAll(".form-box button")[1].textContent = t.reset;
  document.querySelector(".card-back button").textContent = t.goBack;
}

function recommendCrop() {
  const lang = document.querySelector('.language-select').value;
  const t = translations[lang];

  const crop = t.crops[Math.floor(Math.random() * t.crops.length)];
  document.getElementById('resultText').textContent = `${t.resultPrefix} ${crop}`;

  const n = parseFloat(document.getElementById('inputN').value) || 0;
  const p = parseFloat(document.getElementById('inputP').value) || 0;
  const k = parseFloat(document.getElementById('inputK').value) || 0;
  const ph = parseFloat(document.getElementById('inputPH').value) || 0;
  const rain = parseFloat(document.getElementById('inputRain').value) || 0;

  if (window.resultChartInstance) {
    window.resultChartInstance.destroy();
  }

  const ctx = document.getElementById('resultChart').getContext('2d');
  window.resultChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: t.labels,
      datasets: [{
        label: 'Input Values',
        data: [n, p, k, ph, rain],
        backgroundColor: ['#4caf50', '#2196f3', '#ffc107', '#9c27b0', '#ff5722'],
        borderRadius: 8
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true } }
    }
  });

  document.getElementById('flipCard').classList.add('flipped');
}

function flipBack() {
  document.getElementById('flipCard').classList.remove('flipped');
}

function resetForm() {
  document.querySelectorAll("input").forEach(el => el.value = "");
  flipBack();
}

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}
