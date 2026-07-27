/* =========================================================
   EquilibrIA Digital — lógica de la aplicación
   Adaptado al nuevo modelo de Machine Learning (variable objetivo: NAT)
   Variables: age, Gender, Relationship_Status, Occupation_Status,
   Organization, Use_Social_Media, Social_media_platform,
   Daily_SocialMedia_Hours, Purposeless_use, SocialMedia_Distraction,
   Restlessness, Attention_Distraction, Worry_Level,
   Concentration_Difficulty, Social_Comparison, Comparison_Feeling,
   Validation_Seeking, Depression_Level, Interest_Fluctuation,
   Sleep_Problems
   ========================================================= */

// ---------- 1. BANCO DE PREGUNTAS ----------
// Cada pregunta incluye:
//   icon    -> emoji mostrado en la tarjeta
//   q       -> texto amigable de la pregunta
//   opts    -> opciones mostradas al usuario (A-E)
//   values  -> valor que se envía al modelo por cada opción (mismo índice que opts)
//   field   -> nombre exacto de la variable del modelo
//   factor  -> a qué uno de los 3 factores alimenta (si aplica; las preguntas
//              demográficas no tienen factor y solo viajan en el payload)
const QUESTIONS = [
  // --- Datos generales (no alimentan factores, solo van al payload del modelo) ---
  { icon:"🎂", q:"¿Cuál es tu rango de edad?",
    opts:["Menos de 18","18 - 24","25 - 34","35 - 44","45 o más"],
    values:[17,21,30,40,50], field:"age" },

  { icon:"🧑", q:"¿Con qué género te identificas?",
    opts:["Femenino","Masculino","No binario","Prefiero no decirlo"],
    values:["Female","Male","Nonbinary ","unsure "], field:"Gender" },

  { icon:"💞", q:"¿Cuál es tu estado civil o situación sentimental actual?",
    opts:["Soltero/a","En una relación","Casado/a","Divorciado/a o viudo/a"],
    values:["Single","In a relationship","Married","Divorced"], field:"Relationship_Status" },

  { icon:"💼", q:"¿Cuál es tu situación laboral u ocupación actual?",
    opts:["Estudiante universitario/a","Trabajador/a asalariado/a","Estudiante escolar","Retirado/a"],
    values:["University Student","Salaried Worker","School Student","Retired"], field:"Occupation_Status" },

  { icon:"🏢", q:"¿Formas parte de alguna organización o institución (escuela, empresa, asociación)?",
    opts:["Universidad","Institución privada","Escuela","Empresa","Gobierno","Otra / ninguna"],
    values:["University","Private","School","Company","Goverment","Unknown"], field:"Organization" },

  { icon:"📲", q:"¿Utilizas redes sociales de forma habitual?",
    opts:["Sí","No"],
    values:[1,0], field:"Use_Social_Media" },

  // --- Uso Compulsivo ---
  { icon:"⏱️", q:"¿Cuántas horas al día usas redes sociales aproximadamente?",
    opts:["Menos de 1 hora","1 - 2 horas","2 - 3 horas","3 - 4 horas","4 - 5 horas","Más de 5 horas"],
    values:[1,2,3,4,5,6], field:"Daily_SocialMedia_Hours", factor:"usoCompulsivo" },

  { icon:"🔄", q:"¿Con qué frecuencia utilizas redes sociales sin un propósito específico, solo por hacerlo?",
    opts:["Nunca","Rara vez","Algunas veces","Frecuentemente","Siempre"],
    values:[1,2,3,4,5], field:"Purposeless_use", factor:"usoCompulsivo" },

  { icon:"🎯", q:"¿Qué tan frecuentemente las redes sociales te distraen de tareas importantes?",
    opts:["Nunca","Rara vez","Algunas veces","Frecuentemente","Siempre"],
    values:[1,2,3,4,5], field:"SocialMedia_Distraction", factor:"usoCompulsivo" },

  { icon:"😣", q:"¿Te sientes inquieto/a o ansioso/a cuando no puedes revisar tus redes sociales?",
    opts:["Nunca","Rara vez","Algunas veces","Frecuentemente","Siempre"],
    values:[1,2,3,4,5], field:"Restlessness", factor:"usoCompulsivo" },

  { icon:"🧩", q:"¿Con qué frecuencia te cuesta mantener la atención en tus actividades por culpa de las redes sociales?",
    opts:["Nunca","Rara vez","Algunas veces","Frecuentemente","Siempre"],
    values:[1,2,3,4,5], field:"Attention_Distraction", factor:"usoCompulsivo" },

  // --- Salud Mental ---
  { icon:"😟", q:"En general, ¿qué tan preocupado/a te sientes por distintos aspectos de tu vida?",
    opts:["Muy bajo","Bajo","Moderado","Alto","Muy alto"],
    values:[1,2,3,4,5], field:"Worry_Level", factor:"saludMental" },

  { icon:"🧠", q:"¿Con qué frecuencia tienes dificultad para concentrarte en tus actividades diarias?",
    opts:["Nunca","Rara vez","Algunas veces","Frecuentemente","Siempre"],
    values:[1,2,3,4,5], field:"Concentration_Difficulty", factor:"saludMental" },

  // --- Comparación Social ---
  { icon:"🔍", q:"¿Con qué frecuencia te comparas con otras personas al ver contenido en redes sociales?",
    opts:["Nunca","Rara vez","Algunas veces","Frecuentemente","Siempre"],
    values:[1,2,3,4,5], field:"Social_Comparison", factor:"comparacionSocial" },

  { icon:"💭", q:"Cuando te comparas con otras personas en redes sociales, ¿cómo sueles sentirte después?",
    opts:["Muy bien","Bien","Neutral","Mal","Muy mal"],
    values:[1,2,3,4,5], field:"Comparison_Feeling", factor:"comparacionSocial" },

  { icon:"❤️", q:"¿Qué tan importante es para ti recibir \"me gusta\" o comentarios en lo que publicas?",
    opts:["Nada importante","Poco importante","Moderadamente importante","Importante","Muy importante"],
    values:[1,2,3,4,5], field:"Validation_Seeking", factor:"comparacionSocial" },

  // --- Salud Mental (continuación) ---
  { icon:"😔", q:"En las últimas semanas, ¿con qué frecuencia te has sentido triste o sin ánimo?",
    opts:["Nunca","Rara vez","Algunas veces","Frecuentemente","Siempre"],
    values:[1,2,3,4,5], field:"Depression_Level", factor:"saludMental" },

  { icon:"🌗", q:"¿Con qué frecuencia sientes que pierdes interés en actividades que antes disfrutabas?",
    opts:["Nunca","Rara vez","Algunas veces","Frecuentemente","Siempre"],
    values:[1,2,3,4,5], field:"Interest_Fluctuation", factor:"saludMental" },

  { icon:"🌙", q:"¿Con qué frecuencia tienes problemas para dormir o descansar bien?",
    opts:["Nunca","Rara vez","Algunas veces","Frecuentemente","Siempre"],
    values:[1,2,3,4,5], field:"Sleep_Problems", factor:"saludMental" },
];

// ---------- 2. FACTORES (los 3 nuevos) ----------
const FACTORS = [
  { key:"saludMental",       name:"Salud Mental",        icon:"🧠" },
  { key:"usoCompulsivo",     name:"Uso Compulsivo",      icon:"🔄" },
  { key:"comparacionSocial", name:"Comparación Social",  icon:"🔍" },
];

// número de preguntas que alimentan cada factor (para promedios ponderados)
const FACTOR_WEIGHTS = { saludMental:5, usoCompulsivo:5, comparacionSocial:3 };

const RECOMMENDATIONS = [
  { icon:"😴", title:"Cuida tu descanso", text:"Prioriza dormir bien y desconéctate de las pantallas antes de dormir. El descanso influye directamente en tu salud mental." },
  { icon:"🔄", title:"Reduce el uso sin propósito", text:"Antes de abrir una app, pregúntate para qué la vas a usar. Ese simple hábito reduce el uso compulsivo." },
  { icon:"🔔", title:"Define límites de tiempo", text:"Configura recordatorios o límites de uso diario en las redes sociales que más utilizas." },
  { icon:"🧘", title:"Practica pausas conscientes", text:"Cuando sientas la necesidad de revisar el teléfono sin motivo, haz una pausa de unos minutos antes de hacerlo." },
  { icon:"💬", title:"Modera la comparación social", text:"Recuerda que las redes muestran una versión editada de la vida de los demás. Silencia las cuentas que te generen comparación." },
  { icon:"🌱", title:"Cuida tu bienestar emocional", text:"Si notas tristeza, ansiedad o pérdida de interés de forma constante, considera hablar con un profesional de salud mental." },
];

// ---------- 3. ESTADO ----------
const state = {
  current: 0,
  answers: new Array(QUESTIONS.length).fill(null),
  factorScores: {},   // valores calculados tras el cuestionario (0-100, para UI)
  simScores: {},       // valores modificables por el simulador
  natScore: null,       // resultado devuelto por el modelo (/predict) si está disponible
};

// ---------- 4. NAVEGACIÓN DE PANTALLAS ----------
const screens = {
  home: document.getElementById("screen-home"),
  quiz: document.getElementById("screen-quiz"),
  results: document.getElementById("screen-results"),
};
const headerCta = document.getElementById("headerCta");
const headerCtaText = document.getElementById("headerCtaText");

function showScreen(name){
  Object.values(screens).forEach(s => s.classList.remove("active"));
  screens[name].classList.add("active");
  window.scrollTo({top:0, behavior:"smooth"});

  if(name === "home"){
    headerCta.classList.remove("visible");
  } else if(name === "quiz"){
    headerCta.classList.remove("visible");
  } else if(name === "results"){
    headerCtaText.textContent = "Nueva evaluación";
    headerCta.classList.add("visible");
  }
}

document.getElementById("startBtn").addEventListener("click", startQuiz);
headerCta.addEventListener("click", () => {
  if(screens.results.classList.contains("active")) startQuiz();
});
document.getElementById("restartBtn").addEventListener("click", startQuiz);

function startQuiz(){
  state.current = 0;
  state.answers = new Array(QUESTIONS.length).fill(null);
  state.natScore = null;
  showScreen("quiz");
  renderQuestion();
}

// ---------- 5. RENDER DEL CUESTIONARIO ----------
const quizIcon = document.getElementById("quizIcon");
const quizStep = document.getElementById("quizStep");
const quizQuestion = document.getElementById("quizQuestion");
const quizOptions = document.getElementById("quizOptions");
const progressFill = document.getElementById("progressFill");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

function renderQuestion(){
  const idx = state.current;
  const data = QUESTIONS[idx];

  quizIcon.textContent = data.icon;
  quizStep.textContent = `PREGUNTA ${idx + 1}`;
  quizQuestion.textContent = data.q;
  progressFill.style.width = `${((idx + 1) / QUESTIONS.length) * 100}%`;

  quizOptions.innerHTML = "";
  const letters = ["A","B","C","D","E"];
  data.opts.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "option-btn" + (state.answers[idx] === i ? " selected" : "");
    btn.innerHTML = `
      <span class="option-letter">${letters[i]}</span>
      <span>${opt}</span>
      <span class="option-check">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </span>`;
    btn.addEventListener("click", () => selectOption(i));
    quizOptions.appendChild(btn);
  });

  prevBtn.disabled = idx === 0;
  nextBtn.disabled = state.answers[idx] === null;

  const isLast = idx === QUESTIONS.length - 1;
  nextBtn.innerHTML = isLast
    ? `Analizar resultados <span style="font-size:15px">✨</span>`
    : `Siguiente <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  nextBtn.classList.toggle("btn-success", isLast);
  nextBtn.classList.toggle("btn-primary", !isLast);
}

function selectOption(i){
  state.answers[state.current] = i;
  nextBtn.disabled = false;
  renderQuestion();
}

prevBtn.addEventListener("click", () => {
  if(state.current > 0){
    state.current -= 1;
    renderQuestion();
  }
});

nextBtn.addEventListener("click", () => {
  const isLast = state.current === QUESTIONS.length - 1;
  if(isLast){
    runProcessing();
  } else {
    state.current += 1;
    renderQuestion();
  }
});

// ---------- 6. MODAL "ANALIZANDO..." ----------
const processingModal = document.getElementById("processingModal");
const processingFill = document.getElementById("processingFill");
const processingPct = document.getElementById("processingPct");
const processingItems = document.querySelectorAll("#processingChecklist li");
const processingDone = document.getElementById("processingDone");

function runProcessing(){
  processingModal.classList.add("active");
  processingFill.style.width = "0%";
  processingPct.textContent = "0%";
  processingDone.classList.remove("show");
  processingItems.forEach(li => li.classList.remove("done"));

  // Disparamos la petición real al modelo en paralelo a la animación
  const predictionPromise = getPrediction(buildModelPayload());

  let pct = 0;
  const totalSteps = processingItems.length;
  const stepEvery = Math.floor(100 / totalSteps);

  const interval = setInterval(() => {
    pct += 4;
    if(pct > 100) pct = 100;
    processingFill.style.width = pct + "%";
    processingPct.textContent = pct + "%";

    const doneCount = Math.min(totalSteps, Math.floor(pct / stepEvery));
    processingItems.forEach((li, i) => {
      if(i < doneCount) li.classList.add("done");
    });

    if(pct >= 100){
      clearInterval(interval);
      processingItems.forEach(li => li.classList.add("done"));
      processingDone.classList.add("show");

      predictionPromise.then((nat) => {
        state.natScore = nat; // null si /predict no está disponible
        setTimeout(() => {
          processingModal.classList.remove("active");
          computeResults();
          showScreen("results");
        }, 700);
      });
    }
  }, 90);
}

// ---------- 7. FEATURE ENGINEERING + PAYLOAD PARA EL MODELO ----------
// Promedia el valor (1-5) de las preguntas asociadas a cada índice.
function averageOfFields(payload, fields){
  const vals = fields.map(f => payload[f]).filter(v => typeof v === "number");
  if(vals.length === 0) return null;
  const sum = vals.reduce((a,b) => a + b, 0);
  return Math.round((sum / vals.length) * 100) / 100;
}

// Arma el objeto exacto que espera el backend / modelo (fetch a /predict)
function buildModelPayload(){
  const payload = {};

  QUESTIONS.forEach((q, i) => {
    const optIdx = state.answers[i];
    payload[q.field] = q.values[optIdx];
  });

  return payload;
}

// Llama al endpoint real del modelo. Si no está disponible (por ejemplo en
// esta vista previa estática sin backend), se recurre a la estimación local
// basada en los 3 factores para que la experiencia nunca se rompa.
async function getPrediction(payload){
  try{
    const res = await fetch("/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if(!res.ok) throw new Error("Respuesta no válida del servidor");

    const data = await res.json();
    if(data.error) throw new Error(data.error);
    let nat = data.porcentaje ?? data.NAT ?? data.nat ?? data.prediction ?? data.score;
    if(typeof nat !== "number" || Number.isNaN(nat)) throw new Error("Porcentaje de riesgo no numérico");

    // si el modelo devuelve una probabilidad (0-1), la llevamos a escala 0-100
    if(nat <= 1) nat = nat * 100;
    return Math.round(Math.max(0, Math.min(100, nat)));
  } catch (err){
    console.warn("No se pudo obtener predicción de /predict, se usa estimación local:", err.message);
    return null;
  }
}

// ---------- 8. CÁLCULO LOCAL DE FACTORES (para tarjetas, velocímetro base y simulador) ----------
function computeResults(){
  const sums = {}, counts = {};
  FACTORS.forEach(f => { sums[f.key] = 0; counts[f.key] = 0; });

  QUESTIONS.forEach((q, i) => {
    if(!q.factor) return; // preguntas demográficas no alimentan factores
    const optIdx = state.answers[i];
    const value = q.values[optIdx];      // 1-5
    const risk = (value - 1) * 25;       // 0-100 para visualización
    sums[q.factor] += risk;
    counts[q.factor] += 1;
  });

  FACTORS.forEach(f => {
    state.factorScores[f.key] = Math.round(sums[f.key] / counts[f.key]);
  });
  // el simulador arranca en los valores calculados
  state.simScores = { ...state.factorScores };

  renderResults(state.simScores);
}

function overallFromFactors(scores){
  // media ponderada por número de preguntas de cada factor
  let sum = 0, total = 0;
  FACTORS.forEach(f => {
    sum += scores[f.key] * FACTOR_WEIGHTS[f.key];
    total += FACTOR_WEIGHTS[f.key];
  });
  return Math.round(sum / total);
}

function riskLevel(pct){
  if(pct < 30) return { label:"RIESGO BAJO", raw:"#10B981",
    text:"Tu relación con las redes sociales muestra un equilibrio saludable. Sigue así y mantén tus buenas prácticas." };
  if(pct < 55) return { label:"RIESGO MODERADO", raw:"#F59E0B",
    text:"Se observan algunos patrones que conviene vigilar. Pequeños ajustes pueden mejorar tu bienestar digital." };
  if(pct < 80) return { label:"RIESGO ALTO", raw:"#F97316",
    text:"Se detectan patrones de uso compulsivo y comparación social que pueden afectar tu bienestar. Es recomendable ajustar tus hábitos pronto." };
  return { label:"RIESGO MUY ALTO", raw:"#EF4444",
    text:"Tus respuestas muestran señales de alerta importantes en tu relación con las redes sociales. Considera aplicar cambios cuanto antes y buscar apoyo si lo necesitas." };
}

function factorStatus(score){
  if(score < 34) return { label:"Bajo", color:"#10B981" };
  if(score < 67) return { label:"Medio", color:"#F59E0B" };
  return { label:"Alto", color:"#EF4444" };
}

// ---------- 9. RENDER DE RESULTADOS ----------
const gaugePercent = document.getElementById("gaugePercent");
const riskPill = document.getElementById("riskPill");
const gaugeExplain = document.getElementById("gaugeExplain");
const gaugeCard = document.getElementById("gaugeCard");
const needleGroup = document.getElementById("needleGroup");
const gaugeArc = document.getElementById("gaugeArc");
const factorsGrid = document.getElementById("factorsGrid");
const recsGrid = document.getElementById("recsGrid");
const simBody = document.getElementById("simBody");

// longitud total del arco (radio 120, semicírculo) = PI * r
const ARC_LENGTH = Math.PI * 120;
gaugeArc.style.strokeDasharray = `${ARC_LENGTH} ${ARC_LENGTH}`;

function renderResults(scores){
  // si el backend respondió con NAT, usamos ese valor para el velocímetro;
  // si no, usamos la estimación local calculada a partir de los 3 factores.
  const overall = state.natScore !== null ? state.natScore : overallFromFactors(scores);
  const risk = riskLevel(overall);

  gaugePercent.textContent = overall + "%";
  gaugePercent.style.color = risk.raw;
  riskPill.textContent = risk.label;
  riskPill.style.color = risk.raw;
  riskPill.style.background = risk.raw + "1A";
  gaugeExplain.textContent = risk.text;
  gaugeCardTopColor(risk.raw);

  // aguja: -90deg (0%) a +90deg (100%)
  const angle = -90 + (overall / 100) * 180;
  needleGroup.setAttribute("transform", `rotate(${angle} 150 150)`);
  needleGroup.querySelector("line").setAttribute("stroke", risk.raw);

  // arco relleno proporcional al %
  const dash = (overall / 100) * ARC_LENGTH;
  gaugeArc.style.strokeDasharray = `${dash} ${ARC_LENGTH}`;
  gaugeArc.setAttribute("stroke", risk.raw);

  renderFactors(scores);
  renderSimulator(scores);
  renderRecommendations();
}

function gaugeCardTopColor(color){
  const style = document.getElementById("dynamic-gauge-style") || (() => {
    const s = document.createElement("style");
    s.id = "dynamic-gauge-style";
    document.head.appendChild(s);
    return s;
  })();
  style.textContent = `.gauge-card::before{ background:${color}; }`;
}

function renderFactors(scores){
  factorsGrid.innerHTML = "";
  FACTORS.forEach(f => {
    const score = scores[f.key];
    const st = factorStatus(score);
    const card = document.createElement("div");
    card.className = "factor-card";
    card.innerHTML = `
      <div class="factor-top">
        <span class="factor-icon">${f.icon}</span>
        <span class="factor-name">${f.name}</span>
        <span class="factor-status" style="color:${st.color}">
          <span class="status-dot" style="background:${st.color}"></span>${st.label}
        </span>
      </div>
      <div class="factor-bar-track">
        <div class="factor-bar-fill" style="width:${score}%; background:${st.color}"></div>
      </div>`;
    factorsGrid.appendChild(card);
  });
}

function renderRecommendations(){
  recsGrid.innerHTML = "";
  RECOMMENDATIONS.forEach(r => {
    const card = document.createElement("div");
    card.className = "rec-card";
    card.innerHTML = `
      <div class="rec-icon">${r.icon}</div>
      <div>
        <h4>${r.title}</h4>
        <p>${r.text}</p>
      </div>`;
    recsGrid.appendChild(card);
  });
}

// ---------- 10. SIMULADOR INTERACTIVO ----------
const simToggle = document.getElementById("simToggle");
const simChevron = document.getElementById("simChevron");

simToggle.addEventListener("click", () => {
  simBody.classList.toggle("open");
  simToggle.classList.toggle("open");
});

function renderSimulator(scores){
  simBody.innerHTML = "";
  const grid = document.createElement("div");
  grid.className = "sim-grid";

  FACTORS.forEach(f => {
    const score = scores[f.key];
    const st = factorStatus(score);
    const item = document.createElement("div");
    item.className = "sim-item";
    item.innerHTML = `
      <div class="sim-item-top">
        <span class="factor-icon">${f.icon}</span>
        <span class="sim-item-name">${f.name}</span>
        <span class="sim-item-status" data-status style="color:${st.color}">
          <span class="status-dot" style="background:${st.color}"></span>${st.label}
        </span>
      </div>
      <div class="sim-slider-row">
        <span>Bajo</span>
        <input type="range" min="0" max="100" value="${score}" data-key="${f.key}">
        <span>Alto</span>
      </div>`;
    grid.appendChild(item);
  });

  simBody.appendChild(grid);

  simBody.querySelectorAll('input[type=range]').forEach(input => {
    input.addEventListener("input", (e) => {
      const key = e.target.dataset.key;
      const val = Number(e.target.value);
      state.simScores[key] = val;

      // al mover un slider, el simulador toma el control del velocímetro
      // (deja de usar el valor NAT original del backend)
      state.natScore = null;

      const item = e.target.closest(".sim-item");
      const st = factorStatus(val);
      const statusEl = item.querySelector("[data-status]");
      statusEl.style.color = st.color;
      statusEl.innerHTML = `<span class="status-dot" style="background:${st.color}"></span>${st.label}`;

      updateGlobalFromSim();
    });
  });
}

function updateGlobalFromSim(){
  const overall = overallFromFactors(state.simScores);
  const risk = riskLevel(overall);

  gaugePercent.textContent = overall + "%";
  gaugePercent.style.color = risk.raw;
  riskPill.textContent = risk.label;
  riskPill.style.color = risk.raw;
  riskPill.style.background = risk.raw + "1A";
  gaugeExplain.textContent = risk.text;
  gaugeCardTopColor(risk.raw);

  const angle = -90 + (overall / 100) * 180;
  needleGroup.setAttribute("transform", `rotate(${angle} 150 150)`);
  needleGroup.querySelector("line").setAttribute("stroke", risk.raw);

  const dash = (overall / 100) * ARC_LENGTH;
  gaugeArc.style.strokeDasharray = `${dash} ${ARC_LENGTH}`;
  gaugeArc.setAttribute("stroke", risk.raw);

  renderFactors(state.simScores);
}

// ---------- INICIO ----------
showScreen("home");