// Temas simples e diretos para a dinâmica dos cartões (CREATE, ALTER, TRUNCATE, DROP)
const THEMES = [
  {
    name: "Games",
    tableName: "jogadores",
    column1: "nickname",
    column2: "nivel",
    rows: [
      ["Shadow", "12"],
      ["Pixel", "27"],
      ["Nova", "5"]
    ],
    missions: [
      {
        title: "Criar a tabela de Jogadores",
        getDescription: (theme) => `SITUAÇÃO: Precisamos criar a nova tabela '${theme.tableName}' no sistema do jogo. Qual comando usamos?`,
        template: (theme) => `[[CREATE]] TABLE ${theme.tableName} (\n  id INT PRIMARY KEY,\n  ${theme.column1} VARCHAR(100) NOT NULL\n);`,
        hints: [
          "Comando para CRIAR uma nova estrutura (Cartão Verde 🟢)."
        ],
        explanation: "CREATE cria uma nova tabela ou estrutura do zero!"
      },
      {
        title: "Adicionar coluna de Nível",
        getDescription: (theme) => `SITUAÇÃO: A tabela '${theme.tableName}' já existe, mas precisamos adicionar a coluna de '${theme.column2}'. Qual comando usamos?`,
        template: (theme) => `[[ALTER]] TABLE ${theme.tableName}\n  ADD ${theme.column2} INT;`,
        hints: [
          "Comando para ALTERAR/MODIFICAR uma tabela que já existe (Cartão Azul 🔵)."
        ],
        explanation: "ALTER modifica uma tabela existente para adicionar, alterar ou remover colunas!"
      },
      {
        title: "Resetar os Jogadores (Limpar Tabela)",
        getDescription: (theme) => `SITUAÇÃO: Queremos apagar todos os registros de jogadores para o novo campeonato, mas queremos MANTER a tabela. Qual comando usamos?`,
        template: (theme) => `[[TRUNCATE]] TABLE ${theme.tableName};`,
        hints: [
          "Comando para LIMPAR/ESVAZIAR todos os registros mantendo a tabela (Cartão Amarelo 🟡)."
        ],
        explanation: "TRUNCATE apaga todos os dados e registros, mas preserva a estrutura da tabela!"
      },
      {
        title: "Excluir a tabela do Jogo antigo",
        getDescription: (theme) => `SITUAÇÃO: O projeto do jogo foi descontinuado e precisamos EXCLUIR a tabela '${theme.tableName}' inteira. Qual comando usamos?`,
        template: (theme) => `[[DROP]] TABLE ${theme.tableName};`,
        hints: [
          "Comando para DELETAR/EXCLUIR a estrutura inteira sem volta (Cartão Vermelho 🔴)."
        ],
        explanation: "DROP exclui a tabela inteira do banco de dados definitivamente!"
      }
    ]
  },
  {
    name: "Loja",
    tableName: "produtos",
    column1: "nome",
    column2: "preco",
    rows: [
      ["Camiseta", "49.90"],
      ["Tênis", "199.90"],
      ["Boné", "29.90"]
    ],
    missions: [
      {
        title: "Criar o Catálogo de Produtos",
        getDescription: (theme) => `SITUAÇÃO: Precisamos criar a tabela '${theme.tableName}' para cadastrar nossos itens. Qual comando usamos?`,
        template: (theme) => `[[CREATE]] TABLE ${theme.tableName} (\n  id INT PRIMARY KEY,\n  ${theme.column1} VARCHAR(100) NOT NULL\n);`,
        hints: [
          "Comando para CRIAR a estrutura inicial (Cartão Verde 🟢)."
        ],
        explanation: "CREATE cria uma nova tabela!"
      },
      {
        title: "Adicionar coluna de Preço",
        getDescription: (theme) => `SITUAÇÃO: A tabela de produtos já existe, mas precisamos adicionar a coluna '${theme.column2}'. Qual comando usamos?`,
        template: (theme) => `[[ALTER]] TABLE ${theme.tableName}\n  ADD ${theme.column2} DECIMAL(10,2);`,
        hints: [
          "Comando para MODIFICAR/ALTERAR a tabela (Cartão Azul 🔵)."
        ],
        explanation: "ALTER é usado para modificar tabelas já existentes!"
      },
      {
        title: "Limpar o estoque de testes",
        getDescription: (theme) => `SITUAÇÃO: Queremos apagar todos os produtos cadastrados durante os testes, mas manter a tabela pronta para o uso real. Qual comando usamos?`,
        template: (theme) => `[[TRUNCATE]] TABLE ${theme.tableName};`,
        hints: [
          "Comando para LIMPAR a tabela sem apagá-la (Cartão Amarelo 🟡)."
        ],
        explanation: "TRUNCATE esvazia os dados mas mantém a estrutura!"
      },
      {
        title: "Excluir a tabela de Produtos",
        getDescription: (theme) => `SITUAÇÃO: A loja fechou e a tabela '${theme.tableName}' precisa ser removida do banco. Qual comando usamos?`,
        template: (theme) => `[[DROP]] TABLE ${theme.tableName};`,
        hints: [
          "Comando para EXCLUIR/DELETAR a tabela permanentemente (Cartão Vermelho 🔴)."
        ],
        explanation: "DROP remove a estrutura da tabela do banco de dados!"
      }
    ]
  },
  {
    name: "Escola",
    tableName: "alunos",
    column1: "nome",
    column2: "email",
    rows: [
      ["Ana", "ana@escola.com"],
      ["Bruno", "bruno@escola.com"],
      ["Carla", "carla@escola.com"]
    ],
    missions: [
      {
        title: "Criar o Cadastro de Alunos",
        getDescription: (theme) => `SITUAÇÃO: Precisamos criar a tabela '${theme.tableName}' na base da escola. Qual comando usamos?`,
        template: (theme) => `[[CREATE]] TABLE ${theme.tableName} (\n  id INT PRIMARY KEY,\n  ${theme.column1} VARCHAR(100) NOT NULL\n);`,
        hints: [
          "Comando para CRIAR uma estrutura (Cartão Verde 🟢)."
        ],
        explanation: "CREATE cria uma tabela do zero!"
      },
      {
        title: "Adicionar o Email do Aluno",
        getDescription: (theme) => `SITUAÇÃO: A tabela '${theme.tableName}' já existe. Agora precisamos incluir a coluna '${theme.column2}'. Qual comando usamos?`,
        template: (theme) => `[[ALTER]] TABLE ${theme.tableName}\n  ADD ${theme.column2} VARCHAR(100);`,
        hints: [
          "Comando para ALTERAR/MODIFICAR a estrutura existente (Cartão Azul 🔵)."
        ],
        explanation: "ALTER é o comando para alterar estruturas existentes!"
      },
      {
        title: "Reiniciar cadastros para o Novo Ano",
        getDescription: (theme) => `SITUAÇÃO: O ano letivo acabou. Queremos apagar todos os alunos cadastrados, mas manter a tabela pronta para os novos alunos. Qual comando usamos?`,
        template: (theme) => `[[TRUNCATE]] TABLE ${theme.tableName};`,
        hints: [
          "Comando para ESVAZIAR/LIMPAR a tabela (Cartão Amarelo 🟡)."
        ],
        explanation: "TRUNCATE limpa todos os dados da tabela mantendo sua estrutura!"
      },
      {
        title: "Excluir o banco do sistema antigo",
        getDescription: (theme) => `SITUAÇÃO: Mudamos de sistema acadêmico e a tabela '${theme.tableName}' não será mais usada. Queremos apagar a tabela inteira. Qual comando usamos?`,
        template: (theme) => `[[DROP]] TABLE ${theme.tableName};`,
        hints: [
          "Comando para EXCLUIR a tabela inteira (Cartão Vermelho 🔴)."
        ],
        explanation: "DROP destrói e exclui a tabela permanentemente!"
      }
    ]
  },
  {
    name: "Hospital",
    tableName: "pacientes",
    column1: "nome",
    column2: "telefone",
    rows: [
      ["Marta", "11 90000-0001"],
      ["João", "11 90000-0002"],
      ["Lia", "11 90000-0003"]
    ],
    missions: [
      {
        title: "Criar Prontuário de Pacientes",
        getDescription: (theme) => `SITUAÇÃO: Precisamos criar a tabela '${theme.tableName}' para a recepção do hospital. Qual comando usamos?`,
        template: (theme) => `[[CREATE]] TABLE ${theme.tableName} (\n  id INT PRIMARY KEY,\n  ${theme.column1} VARCHAR(100) NOT NULL\n);`,
        hints: [
          "Comando para CRIAR tabelas novas (Cartão Verde 🟢)."
        ],
        explanation: "CREATE cria novas estruturas de tabela!"
      },
      {
        title: "Adicionar campo de Telefone",
        getDescription: (theme) => `SITUAÇÃO: A tabela de pacientes já existe, mas precisamos adicionar o '${theme.column2}'. Qual comando usamos?`,
        template: (theme) => `[[ALTER]] TABLE ${theme.tableName}\n  ADD ${theme.column2} VARCHAR(15);`,
        hints: [
          "Comando para ALTERAR/MODIFICAR a estrutura (Cartão Azul 🔵)."
        ],
        explanation: "ALTER serve para ajustar e modificar tabelas existentes!"
      },
      {
        title: "Esvaziar lista do dia",
        getDescription: (theme) => `SITUAÇÃO: No fim do plantão, precisamos apagar todos os pacientes da fila, mantendo a tabela pronta para o dia seguinte. Qual comando usamos?`,
        template: (theme) => `[[TRUNCATE]] TABLE ${theme.tableName};`,
        hints: [
          "Comando para LIMPAR a tabela mantendo a estrutura (Cartão Amarelo 🟡)."
        ],
        explanation: "TRUNCATE zera os registros da tabela!"
      },
      {
        title: "Excluir tabela temporária",
        getDescription: (theme) => `SITUAÇÃO: A triagem de emergência temporária foi fechada. Queremos apagar a tabela '${theme.tableName}' inteira. Qual comando usamos?`,
        template: (theme) => `[[DROP]] TABLE ${theme.tableName};`,
        hints: [
          "Comando para EXCLUIR/DELETAR a tabela inteira (Cartão Vermelho 🔴)."
        ],
        explanation: "DROP exclui permanentemente a tabela!"
      }
    ]
  }
];

// Cores da roleta
const WHEEL_COLORS = [
  ["#1B1B1B", "#8DD3F0"],
  ["#8DD3F0", "#050505"],
  ["#2C2C2C", "#F07167"],
  ["#F07167", "#050505"]
];

let currentTheme = null;
let currentStep = 0;
let isSpinning = false;
let currentRotation = 0;

let dbState = {
  exists: false,
  hasColumn2: false,
  rows: []
};

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const $ = (id) => document.getElementById(id);
const normalizeString = (str) => str.trim().toUpperCase().replace(/\s+/g, " ");

function renderDatabaseView() {
  const container = $("dbv");
  if (!container) return;

  if (!dbState.exists) {
    const text = currentStep >= 4
      ? `A tabela ${currentTheme ? currentTheme.tableName : ''} foi removida com DROP.`
      : "Nenhuma tabela criada ainda.";
    container.innerHTML = `<p class="n">${text}</p>`;
    return;
  }

  let tableHtml = `
    <table>
      <caption class="mono" style="text-align:left; padding-bottom:4px">${currentTheme.tableName}</caption>
      <tr>
        <th>id</th>
        <th>${currentTheme.column1}</th>
        ${dbState.hasColumn2 ? `<th>${currentTheme.column2}</th>` : ""}
      </tr>
  `;

  dbState.rows.forEach((row, index) => {
    tableHtml += `
      <tr>
        <td>${index + 1}</td>
        <td>${row[0]}</td>
        ${dbState.hasColumn2 ? `<td>${row[1]}</td>` : ""}
      </tr>
    `;
  });

  tableHtml += `</table><p class="n">${dbState.rows.length} registros</p>`;
  container.innerHTML = tableHtml;
}

function buildMissionsUI() {
  const box = $("missions");
  if (!box || !currentTheme) return;
  box.innerHTML = "";

  currentTheme.missions.forEach((mission, index) => {
    const section = document.createElement("section");
    section.className = `m ${index === 0 ? "on" : ""}`;
    section.id = `m${index}`;

    const parts = mission.template(currentTheme).split(/\[\[(.+?)\]\]/);
    let codeHtml = "";

    parts.forEach((part, partIndex) => {
      if (partIndex % 2 !== 0) {
        codeHtml += `<input data-answer="${part}" size="${part.length + 2}" aria-label="lacuna" autocomplete="off" spellcheck="false" ${index ? "disabled" : ""}>`;
      } else {
        codeHtml += part.replace(/</g, "&lt;");
      }
    });

    section.innerHTML = `
      <h3>Desafio ${index + 1}: ${mission.title}</h3>
      <p style="font-size: 1.1em; color: #fff;">${mission.getDescription(currentTheme)}</p>
      <pre class="code">${codeHtml}</pre>
      <div class="row">
        <button data-check="${index}" ${index ? "disabled" : ""}>Verificar</button>
        <button class="ghost" data-hint="${index}" ${index ? "disabled" : ""}>Dica</button>
      </div>
      <div class="fb" aria-live="polite"></div>
    `;

    box.appendChild(section);
  });
}

function drawWheel() {
  const wheelElement = $("wheel");
  if (!wheelElement) return;

  let svgContent = "";
  THEMES.forEach((theme, i) => {
    const startAngle = (i * Math.PI) / 2;
    const endAngle = ((i + 1) * Math.PI) / 2;

    const x1 = 150 + 140 * Math.sin(startAngle);
    const y1 = 150 - 140 * Math.cos(startAngle);
    const x2 = 150 + 140 * Math.sin(endAngle);
    const y2 = 150 - 140 * Math.cos(endAngle);

    svgContent += `
      <path d="M150 150L${x1} ${y1}A140 140 0 0 1 ${x2} ${y2}Z" fill="${WHEEL_COLORS[i][0]}" stroke="#050505" stroke-width="3"/>
      <text transform="rotate(${i * 90 + 45} 150 150)" x="150" y="68" text-anchor="middle" font-size="22" font-weight="800" fill="${WHEEL_COLORS[i][1]}">
        ${theme.name}
      </text>
    `;
  });

  svgContent += `<circle cx="150" cy="150" r="14" fill="#050505" stroke="#8DD3F0" stroke-width="4"/>`;
  wheelElement.innerHTML = svgContent;
}

function startGame() {
  currentStep = 0;
  dbState = { exists: false, hasColumn2: false, rows: [] };

  buildMissionsUI();
  renderDatabaseView();

  $("end").hidden = true;
  $("game").style.display = "block";

  setTimeout(() => {
    $("game").scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
  }, 60);
}

function spinWheel() {
  if (isSpinning) return;
  isSpinning = true;

  const drawButton = $("btnDraw");
  const slotText = $("slot");

  drawButton.disabled = true;
  slotText.textContent = "Girando...";

  const themeIndex = Math.floor(Math.random() * THEMES.length);
  const jitter = Math.random() * 50 - 25;

  currentRotation = (Math.floor(currentRotation / 360) + 4) * 360 + (360 - (themeIndex * 90 + 45) + jitter);

  const wheel = $("wheel");
  const durationSec = prefersReducedMotion ? 2.2 : 4.2;

  wheel.style.transition = `transform ${durationSec}s cubic-bezier(.12,.7,.1,1)`;
  void wheel.offsetWidth;
  wheel.style.transform = `rotate(${currentRotation}deg)`;

  setTimeout(() => {
    currentTheme = THEMES[themeIndex];
    slotText.textContent = `Tema sorteado: ${currentTheme.name}`;
    drawButton.disabled = false;
    drawButton.textContent = "Girar de novo";
    isSpinning = false;
    startGame();
  }, (durationSec + 0.2) * 1000);
}

function handleHint(missionIndex) {
  const missionSection = $(`m${missionIndex}`);
  const feedback = missionSection.querySelector(".fb");
  const inputs = missionSection.querySelectorAll("input");

  let firstWrongIndex = -1;
  inputs.forEach((input, i) => {
    if (firstWrongIndex < 0 && normalizeString(input.value) !== normalizeString(input.getAttribute("data-answer"))) {
      firstWrongIndex = i;
    }
  });

  feedback.className = "fb hint";

  if (firstWrongIndex < 0) {
    feedback.textContent = "Todas as lacunas estão certas. Clique em Verificar.";
    return;
  }

  feedback.textContent = `💡 Dica: ${currentTheme.missions[missionIndex].hints[firstWrongIndex]}`;
  inputs[firstWrongIndex].focus();
}

function handleCheck(missionIndex) {
  const section = $(`m${missionIndex}`);
  const inputs = section.querySelectorAll("input");
  const feedback = section.querySelector(".fb");

  let isAllCorrect = true;

  inputs.forEach((input) => {
    const isCorrect = normalizeString(input.value) === normalizeString(input.getAttribute("data-answer"));
    input.className = isCorrect ? "ok" : "no";
    if (!isCorrect) isAllCorrect = false;
  });

  if (!isAllCorrect) {
    feedback.className = "fb no";
    feedback.textContent = "Ainda não! Veja qual cartão corresponde à ação solicitada.";
    return;
  }

  feedback.className = "fb ok";
  feedback.textContent = `✅ Correto! ${currentTheme.missions[missionIndex].explanation}`;

  inputs.forEach((input) => (input.disabled = true));
  section.querySelectorAll("button").forEach((btn) => (btn.disabled = true));
  section.className = "m done";

  // Atualização simples da visualização do Banco de Dados
  if (missionIndex === 0) {
    dbState.exists = true;
    dbState.hasColumn2 = false;
    dbState.rows = currentTheme.rows.map(r => [r[0]]);
  } else if (missionIndex === 1) {
    dbState.hasColumn2 = true;
    dbState.rows = currentTheme.rows.slice();
  } else if (missionIndex === 2) {
    dbState.rows = [];
  } else if (missionIndex === 3) {
    dbState.exists = false;
  }

  currentStep = missionIndex + 1;
  renderDatabaseView();

  const nextSection = $(`m${currentStep}`);
  if (nextSection) {
    nextSection.className = "m on";
    nextSection.querySelectorAll("input, button").forEach((el) => (el.disabled = false));
    setTimeout(() => {
      nextSection.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "center" });
    }, 700);
  } else {
    $("end").hidden = false;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  drawWheel();

  $("btnDraw")?.addEventListener("click", spinWheel);

  $("again")?.addEventListener("click", () => {
    window.scrollTo({ top: 0 });
    spinWheel();
  });

  $("missions")?.addEventListener("click", (e) => {
    const checkAttr = e.target.getAttribute("data-check");
    const hintAttr = e.target.getAttribute("data-hint");

    if (hintAttr !== null) {
      handleHint(Number(hintAttr));
    } else if (checkAttr !== null) {
      handleCheck(Number(checkAttr));
    }
  });
});
