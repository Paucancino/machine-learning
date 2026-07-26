//Preguntas
const QUESTIONS = [
  
  {
  icon:"🎂",
  q:"¿Cuál es tu rango de edad?",
  opts:[
    "15 – 17 años",
    "18 – 24 años",
    "25 – 34 años",
    "35 – 44 años",
    "45 años o más"
  ],
  values:[16,21,29,39,50],
  field:"Age",
  factor:null
},

{
  icon:"⚧️",
  q:"¿Con qué género te identificas?",
  opts:["Mujer","Hombre","Otro"],
  values:["Female","Male","Other"],
  field:"Gender",
  factor:null
},

{
  icon:"🌎",
  q:"¿En qué país vives?",
  opts:[
    "México",
    "Estados Unidos",
    "Brasil",
    "Reino Unido",
    "Alemania",
    "India",
    "China",
    "Japón",
    "Rusia",
    "Nigeria"
  ],

  values:[
    "Mexico",
    "USA",
    "Brazil",
    "UK",
    "Germany",
    "India",
    "China",
    "Japan",
    "Russia",
    "Nigeria"
  ],

  field:"Country",
  factor:null
},

{
  icon:"💼",
  q:"¿Cuál es tu ocupación principal?",
  opts:[
    "Estudiante",
    "Docente",
    "Ingeniería",
    "Medicina",
    "Gerencia",
    "Ventas",
    "Arte",
    "Sin empleo"
  ],

  values:[
    "Student",
    "Teacher",
    "Engineer",
    "Doctor",
    "Manager",
    "Salesperson",
    "Artist",
    "Unemployed"
  ],

  field:"Occupation",
  factor:null
},

  {
  icon:"📱",
  q:"¿Cuántas horas utilizas dispositivos con pantalla diariamente?",
  opts:[
    "Menos de 2 horas",
    "Entre 2 y 4 horas",
    "Entre 4 y 6 horas",
    "Entre 6 y 8 horas",
    "Más de 8 horas"
  ],
  values:[1,3,5,7,9],
  risk:[10,30,55,80,100],
  field:"Daily_Screen_Time_Hours",
  factor:"pantalla"
},

  {
  icon:"🔓",
  q:"¿Cuántas veces desbloqueas tu teléfono durante un día normal?",
  opts:[
    "Menos de 20",
    "20 – 50",
    "50 – 100",
    "100 – 150",
    "Más de 150"
  ],
  values:[10,35,75,125,175],
  risk:[10,30,55,80,100],
  field:"Phone_Unlocks_Per_Day",
  factor:"pantalla"
},

  {
  icon:"🔔",
  q:"¿Cuántas notificaciones recibes diariamente?",
  opts:[
    "Menos de 20",
    "20 – 50",
    "50 – 100",
    "100 – 200",
    "Más de 200"
  ],
  values:[10,35,75,150,250],
  risk:[10,30,55,80,100],
  field:"Push_Notifications_Per_Day",
  factor:"interrupciones"
},

  {
     icon:"📲",
      q:"¿Cuánto tiempo utilizas redes sociales cada día?",
    opts:[
      "Nunca",
      "Menos de una hora",
      "1 – 3 horas",
      "3 – 5 horas",
      "Más de 5 horas" 
    ],
    risk:[0,20,50,75,100], 
    factor:"recreativo",
    values:[0,0.5,2,4,6],
    field:"Social_Media_Usage_Hours",
   }, 

  {
     icon:"🎮", 
     q:"¿Cuánto tiempo dedicas a videojuegos?",
    opts:[
      "Nunca",
      "Menos de una hora",
      "1 – 2 horas",
      "2 – 4 horas",
      "Más de 4 horas"
    ],
    risk:[0,20,45,70,100], 
    factor:"recreativo", 
    values:[0,0.5,1.5,3,5],
    field:"Gaming_Usage_Hours",
  },

  {
    icon:"🎬", 
    q:"¿Cuánto tiempo utilizas plataformas de streaming?",
    opts:[
      "Nunca",
      "Menos de una hora",
      "1 – 3 horas",
      "3 – 5 horas",
      "Más de 5 horas"
    ],
    risk:[0,20,50,75,100],
     factor:"recreativo",
    values:[0,0.5,2,4,6],
    field:"Streaming_Usage_Hours",
  },

  { 
    icon:"🛒",
     q:"¿Cuánto tiempo dedicas a compras o navegación en línea?",
    opts:[
      "Nunca",
      "Menos de 30 minutos",
      "30 – 60 minutos",
      "1 – 2 horas",
      "Más de 2 horas"
    ],
    risk:[0,15,35,60,90],
    factor:"recreativo",
    values:[0,0.25,0.75,1.5,3],
    field:"Online_Shopping_Hours",
     },

  {
     icon:"💻",
    q:"¿Cuántas horas utilizas dispositivos para trabajar o estudiar?",
    opts:[
      "Menos de una hora",
      "1 – 3 horas",
      "3 – 5 horas",
      "5 – 8 horas",
      "Más de 8 horas"
    ],
    risk:[10,25,45,70,95],
    factor:"productivo",
    values:[0.5,2,4,6.5,9],
    field:"Work_Related_Usage_Hours", 
  },

   {
  icon:"🧑‍💻",
  q:"¿Cómo calificarías tus habilidades tecnológicas?",
  opts:[
    "Muy bajas",
    "Básicas",
    "Intermedias",
    "Avanzadas",
    "Expertas"
  ],
  values:[1,3,5,7,9],
  risk:[70,50,30,15,5],
  field:"Tech_Savviness_Score",
  factor:"productivo"
},

  { 
    icon:"🌙", 
    q:"¿Cuántas horas duermes normalmente?",
    opts:[
      "Menos de 5 horas",
      "5 – 6 horas",
      "6 – 7 horas",
      "7 – 8 horas",
      "Más de 8 horas"
    ],
    risk:[90,55,20,10,35], 
    factor:"saludMental",
    values:[4.5,5.5,6.5,7.5,8.5],
    field:"Sleep_Hours", 
  },

  { 
    icon:"🏃",
     q:"¿Cuánto ejercicio realizas diariamente?",
    opts:[
      "Nada",
      "Menos de 30 minutos",
      "30 – 60 minutos",
      "1 – 2 horas",
      "Más de 2 horas"
    ],
    risk:[85,60,30,15,10],
    factor:"saludMental",
    values:[0,0.25,0.75,1.5,2.5],
    field:"Physical_Activity_Hours", 
  },

  { 
    icon:"😔",
     q:"Durante las últimas semanas, ¿con qué frecuencia te has sentido desanimado?",
    opts:[
      "Nunca",
      "Rara vez",
      "Algunas veces",
      "Frecuentemente",
      "Casi siempre"
    ],
    risk:[0,25,50,75,100],
     factor:"saludMental", 
    values:[0,2.5,5,7.5,10],
    field:"Depression_Score",
   },

  { 
    icon:"😟",
     q:"¿Con qué frecuencia has sentido ansiedad?",
    opts:[
      "Nunca",
      "Rara vez",
      "Algunas veces",
      "Frecuentemente",
      "Casi siempre"
    ],
    risk:[0,25,50,75,100], 
    factor:"saludMental", 
    values:[0,2.5,5,7.5,10],
    field:"Anxiety_Score", 
  },
  
 { 
  icon:"😣",
  q:"¿Cómo describirías tu nivel de estrés?",
  opts:[
    "Muy bajo",
    "Bajo",
    "Moderado",
    "Alto",
    "Muy alto"
  ],
  values:[0,2.5,5,7.5,10],
  risk:[0,25,50,75,100],
  field:"Stress_Level",
  factor:"saludMental"
},

{
  icon:"👀",
  q:"¿Con qué frecuencia revisas tu teléfono sin recibir una notificación?",
  opts:[
    "Nunca",
    "Rara vez",
    "Algunas veces",
    "Frecuentemente",
    "Siempre"
  ],
  risk:[0,25,50,75,100],
  field:null,
  factor:"interrupciones"
},

{ 
  icon:"⏰",
  q:"¿Sientes la necesidad de revisar el teléfono apenas despiertas?",
  opts:[
    "Nunca",
    "Rara vez",
    "Algunas veces",
    "Frecuentemente",
    "Siempre"
  ],
  risk:[0,25,50,75,100],
  field:null,
  factor:"interrupciones"
},

 { 
  icon:"🛌",
  q:"¿Utilizas dispositivos electrónicos antes de dormir?",
  opts:[
    "Nunca",
    "Menos de 30 minutos",
    "30 – 60 minutos",
    "1 – 2 horas",
    "Más de 2 horas"
  ],
  risk:[0,20,45,70,100],
  field:null,
  factor:"equilibrio"
},

  { 
  icon:"✋",
  q:"¿Te resulta difícil dejar de utilizar el teléfono cuando comienzas?",
  opts:[
    "Nunca",
    "Rara vez",
    "Algunas veces",
    "Frecuentemente",
    "Siempre"
  ],
  risk:[0,25,50,75,100],
  field:null,
  factor:"equilibrio"
},

 { 
  icon:"🔕",
  q:"¿Con qué frecuencia las notificaciones interrumpen tus actividades?",
  opts:[
    "Nunca",
    "Rara vez",
    "Algunas veces",
    "Frecuentemente",
    "Siempre"
  ],
  risk:[0,25,50,75,100],
  field:null,
  factor:"interrupciones"
},

 { 
  icon:"⚖️",
  q:"En general, ¿cómo consideras el equilibrio entre tu vida digital y tu vida personal?",
  opts:[
    "Muy bueno",
    "Bueno",
    "Regular",
    "Malo",
    "Muy malo"
  ],
  risk:[0,25,50,75,100],
  field:null,
  factor:"equilibrio"
},
];

// ---------- 2. FACTORES ----------
const FACTORS = [
  { key:"saludMental",    name:"Salud mental",            icon:"🧠" },
  { key:"pantalla",       name:"Tiempo frente a pantalla", icon:"📱" },
  { key:"recreativo",     name:"Uso recreativo",          icon:"🎮" },
  { key:"productivo",     name:"Uso productivo",          icon:"💻" },
  { key:"equilibrio",     name:"Equilibrio digital",      icon:"⚖️" },
  { key:"interrupciones", name:"Interrupciones digitales", icon:"🔔" },
];

const RECOMMENDATIONS = [
  { icon:"😴", title:"Mejora tu descanso", text:"Intenta dormir entre 7 y 8 horas cada noche. El buen descanso reduce el estrés y mejora tu rendimiento cognitivo." },
  { icon:"📵", title:"Reduce el tiempo de pantalla", text:"Establece límites diarios de uso en tus apps más consumidas y crea zonas libres de dispositivo." },
  { icon:"🔔", title:"Gestiona tus notificaciones", text:"Silencia aplicaciones no esenciales y define horarios específicos para revisar mensajes. Recupera el control de tu atención." },
  { icon:"🏃", title:"Incrementa la actividad física", text:"Realiza al menos 30 minutos de ejercicio diario. El movimiento reduce el estrés, mejora el estado de ánimo y contrarresta el sedentarismo digital." },
  { icon:"🧘", title:"Realiza pausas digitales", text:"Dedica momentos del día a desconectarte completamente. Comienza con 20-30 minutos sin dispositivos y ve aumentando progresivamente." },
  { icon:"⚖️", title:"Equilibra ocio y productividad", text:"Diversifica tus actividades fuera de la pantalla: lectura, naturaleza, socialización presencial. Un buen balance digital transforma tu calidad de vida." },
];

// ---------- 3. ESTADO ----------
const state = {
  current: 0,
  answers: new Array(QUESTIONS.length).fill(null),
  factorScores: {},
  simScores: {},
  prediction: null
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
  state.factorScores = {};
  state.simScores = {};
  state.prediction = null;

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
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
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

async function runProcessing(){
  processingModal.classList.add("active");
  processingFill.style.width = "0%";
  processingPct.textContent = "0%";
  processingDone.classList.remove("show");

  processingItems.forEach(li => {
    li.classList.remove("done");
  });

  const predictionPromise = requestPrediction();

  let pct = 0;
  const totalSteps = processingItems.length;
  const stepEvery = Math.floor(100 / totalSteps);

  const interval = setInterval(async () => {
    pct += 4;

    if(pct > 100){
      pct = 100;
    }

    processingFill.style.width = pct + "%";
    processingPct.textContent = pct + "%";

    const doneCount = Math.min(
      totalSteps,
      Math.floor(pct / stepEvery)
    );

    processingItems.forEach((li, i) => {
      if(i < doneCount){
        li.classList.add("done");
      }
    });

    if(pct >= 100){
      clearInterval(interval);

      try{
        state.prediction = await predictionPromise;

        processingItems.forEach(li => {
          li.classList.add("done");
        });

        processingDone.classList.add("show");

        setTimeout(() => {
          processingModal.classList.remove("active");
          computeResults();
          showScreen("results");
        }, 700);

      }catch(error){
        processingModal.classList.remove("active");

        console.error(error);

        alert(
          "No se pudo obtener la predicción. " +
          "Verifica que app.py esté ejecutándose."
        );
      }
    }
  }, 90);
}

function buildModelPayload(){
  const payload = {};

  QUESTIONS.forEach((question, index) => {
    if(!question.field){
      return;
    }

    const selectedOption = state.answers[index];

    if(selectedOption === null){
      return;
    }

    payload[question.field] = question.values[selectedOption];
  });

  return payload;
}

async function requestPrediction(){
  const response = await fetch("/predict", {
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(buildModelPayload())
  });

  const data = await response.json();

  if(!response.ok){
    throw new Error(data.error || "No se pudo realizar la predicción");
  }

  return data;
}

// ---------- 7. CÁLCULO DEL MODELO ----------
function computeResults(){
  const sums = {};
  const counts = {};

  FACTORS.forEach(f => {
    sums[f.key] = 0;
    counts[f.key] = 0;
  });

  QUESTIONS.forEach((q, i) => {
    if(!q.factor || !q.risk){
      return;
    }

    const selectedOption = state.answers[i];

    if(selectedOption === null){
      return;
    }

    const riskValue = q.risk[selectedOption];

    sums[q.factor] += riskValue;
    counts[q.factor] += 1;
  });

  FACTORS.forEach(f => {
    state.factorScores[f.key] =
      counts[f.key] > 0
        ? Math.round(sums[f.key] / counts[f.key])
        : 0;
  });

  state.simScores = {
    ...state.factorScores
  };

  renderResults(state.simScores, state.prediction);
}

function overallFromFactors(scores){
  // media ponderada por número de preguntas de cada factor (igual al promedio simple original)
  const weights = { saludMental:5, pantalla:2, recreativo:4, productivo:2, interrupciones:4, equilibrio:3 };
  let sum = 0, total = 0;
  FACTORS.forEach(f => {
    sum += scores[f.key] * weights[f.key];
    total += weights[f.key];
  });
  return Math.round(sum / total);
}

function riskLevel(pct){
  if(pct < 30) return { label:"RIESGO BAJO", color:"var(--green)", raw:"#10B981",
    text:"Tus hábitos digitales muestran un equilibrio saludable. Sigue así y mantén tus buenas prácticas." };
  if(pct < 55) return { label:"RIESGO MODERADO", color:"var(--yellow)", raw:"#F59E0B",
    text:"Se observan algunos patrones que conviene vigilar. Pequeños ajustes pueden mejorar tu bienestar digital." };
  if(pct < 80) return { label:"RIESGO ALTO", color:"var(--orange)", raw:"#F97316",
    text:"Se detectan patrones de uso que pueden afectar tu bienestar. Es recomendable revisar y ajustar tus hábitos tecnológicos pronto." };
  return { label:"RIESGO MUY ALTO", color:"var(--red)", raw:"#EF4444",
    text:"Tus hábitos digitales muestran señales de alerta importantes. Considera aplicar cambios cuanto antes y buscar apoyo si lo necesitas." };
}

function factorStatus(score){
  if(score < 34) return { label:"Bajo", color:"#10B981" };
  if(score < 67) return { label:"Medio", color:"#F59E0B" };
  return { label:"Alto", color:"#EF4444" };
}

// ---------- 8. RENDER DE RESULTADOS ----------
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

function renderResults(scores, prediction = null){
  const overall = prediction
    ? prediction.porcentaje
    : overallFromFactors(scores);

 const risk = riskLevel(overall);

if(prediction){
    risk.label = prediction.etiqueta;
    risk.text = prediction.mensaje;
}

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

// ---------- 9. SIMULADOR INTERACTIVO ----------
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

      // actualizar estado visual de esa tarjeta
      const item = e.target.closest(".sim-item");
      const st = factorStatus(val);
      const statusEl = item.querySelector("[data-status]");
      statusEl.style.color = st.color;
      statusEl.innerHTML = `<span class="status-dot" style="background:${st.color}"></span>${st.label}`;

      // recalcular todo el resultado global
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
