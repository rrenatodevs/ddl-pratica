// Cada tema tem um ponto de partida e um fluxo de DDL totalmente diferente!
const THEMES = [
  {
    name: "Games",
    tableName: "jogadores",
    column1: "nickname",
    column2: "nivel",
    initialState: { exists: true, hasColumn2: true, rows: [["Shadow", "12"], ["Pixel", "27"], ["Nova", "5"]] },
    missions: [
      {
        title: "Remover coluna obsoleta",
        getDescription: (theme) => `SITUAÇÃO: A tabela '${theme.tableName}' já existe no banco. O sistema mudou e a coluna '${theme.column2}' não é mais necessária. Qual comando usamos para remover apenas essa coluna?`,
        template: (theme) => `[[ALTER]] TABLE ${theme.tableName}\n  [[DROP]] COLUMN ${theme.column2};`,
        hints: [
          "Qual comando modifica uma tabela existente?",
          "Qual instrução remove um elemento da estrutura?"
        ],
        explanation: "ALTER TABLE com DROP COLUMN remove a coluna especificada da tabela!",
        action: (state) => { state.hasColumn2 = false; }
      },
      {
        title: "Reset de Temporada",
        getDescription: (theme) => `SITUAÇÃO: A temporada acabou! Precisamos apagar TODOS os dados de jogadores para reiniciar o ranking, mas a estrutura da tabela deve continuar. Qual comando usamos?`,
        template: (theme) => `[[TRUNCATE]] TABLE ${theme.tableName};`,
        hints: [
          "Comando DDL que apaga todos os registros rapidamente sem deletar a tabela."
        ],
        explanation: "TRUNCATE remove todos os registros mantendo a estrutura intacta para novos cadastros!",
        action: (state) => { state.rows = []; }
      },
      {
        title: "Descontinuar o Jogo Antigo",
        getDescription: (theme) => `SITUAÇÃO: O jogo antigo foi desativado. Queremos apagar a tabela '${theme.tableName}' e toda sua estrutura definitivamente. Qual comando usamos?`,
        template: (theme) => `[[DROP]] TABLE ${theme.tableName};`,
        hints: [
          "Comando DDL de destruição permanente de tabelas."
        ],
        explanation: "DROP TABLE exclui permanentemente a tabela e todos os seus dados do banco!",
        action: (state) => { state.exists = false; }
      },
      {
        title: "Criar Nova Versão do Jogo",
        getDescription: () => `SITUAÇÃO: Lançamos o jogo 'jogadores_v2'! Precisamos criar do zero essa nova tabela no banco de dados. Qual comando usamos?`,
        template: () => `[[CREATE]] TABLE jogadores_v2 (\n  id INT PRIMARY KEY,\n  nickname VARCHAR(100) NOT NULL\n);`,
        hints: [
          "Comando DDL para criar uma nova tabela no banco de dados."
        ],
        explanation: "CREATE TABLE inicializa uma nova tabela na base de dados!",
        action: (state) => { state.exists = true; state.tableName = "jogadores_v2"; state.hasColumn2 = false; state.rows = []; }
      }
    ]
  },
  {
    name: "Loja",
    tableName: "produtos",
    column1: "nome",
    column2: "preco",
    initialState: { exists: false, hasColumn2: false, rows: [] },
    missions: [
      {
        title: "Criar Tabela de Catálogo",
        getDescription: (theme) => `SITUAÇÃO: O e-commerce está sendo construído do zero. Crie a tabela '${theme.tableName}' com id e a coluna '${theme.column1}'. Qual comando usamos?`,
        template: (theme) => `[[CREATE]] TABLE ${theme.tableName} (\n  id INT PRIMARY KEY,\n  ${theme.column1} VARCHAR(100) NOT NULL\n);`,
        hints: [
          "Comando DDL para criar objetos no banco."
        ],
        explanation: "CREATE TABLE cria a tabela do zero no banco de dados!",
        action: (state) => { state.exists = true; state.rows = [["Camiseta"], ["Tênis"], ["Boné"]]; }
      },
      {
        title: "Adicionar o Preço dos Produtos",
        getDescription: (theme) => `SITUAÇÃO: A tabela '${theme.tableName}' já está criada. Agora adicione a coluna '${theme.column2}' do tipo DECIMAL. Qual comando usamos?`,
        template: (theme) => `[[ALTER]] TABLE ${theme.tableName}\n  [[ADD]] ${theme.column2} DECIMAL(10,2);`,
        hints: [
          "Comando para modificar tabelas existentes.",
          "Instrução para acrescentar algo novo."
        ],
        explanation: "ALTER TABLE com ADD adiciona uma nova coluna à tabela existente!",
        action: (state, theme) => { state.hasColumn2 = true; state.rows = theme.rows.slice(); }
      },
      {
        title: "Renomear Coluna",
        getDescription: (theme) => `SITUAÇÃO: O time de produto pediu para alterar o nome da coluna '${theme.column1}' para 'item_nome'. Qual comando usamos para modificar a estrutura?`,
        template: (theme) => `[[ALTER]] TABLE ${theme.tableName}\n  RENAME COLUMN ${theme.column1} TO item_nome;`,
        hints: [
          "Comando DDL para modificar a estrutura de uma tabela existente."
        ],
        explanation: "ALTER TABLE permite renomear atributos já existentes!",
        action: (state) => { state.column1 = "item_nome"; }
      },
      {
        title: "Esvaziar Estoque de Testes",
        getDescription: (theme) => `SITUAÇÃO: Finalizamos os testes! Remova todos os produtos cadastrados, mantendo a tabela pronta para o uso em produção. Qual comando usamos?`,
        template: (theme) => `[[TRUNCATE]] TABLE ${theme.tableName};`,
        hints: [
          "Comando DDL para esvaziar os dados de uma tabela."
        ],
        explanation: "TRUNCATE apaga todos os registros rapidamente preservando a tabela!",
        action: (state) => { state.rows = []; }
      }
    ]
  },
  {
    name: "Escola",
    tableName: "alunos",
    column1: "nome",
    column2: "email",
    initialState: { exists: true, hasColumn2: false, rows: [["Ana"], ["Bruno"], ["Carla"]] },
    missions: [
      {
        title: "Atualizar Tabela Existente",
        getDescription: (theme) => `SITUAÇÃO: A tabela de '${theme.tableName}' já está em uso na escola, mas precisamos incluir a coluna de '${theme.column2}'. Qual comando usamos?`,
        template: (theme) => `[[ALTER]] TABLE ${theme.tableName}\n  [[ADD]] ${theme.column2} VARCHAR(100);`,
        hints: [
          "Comando DDL para alterar a estrutura da tabela.",
          "Instrução para incluir uma nova coluna."
        ],
        explanation: "ALTER TABLE ADD insere novas colunas em uma tabela já existente!",
        action: (state, theme) => { state.hasColumn2 = true; state.rows = theme.rows.slice(); }
      },
      {
        title: "Reiniciar Ano Letivo",
        getDescription: (theme) => `SITUAÇÃO: Fim do ano letivo! Precisamos apagar o cadastro de todos os alunos, mas manter a estrutura para as próximas matrículas. Qual comando usamos?`,
        template: (theme) => `[[TRUNCATE]] TABLE ${theme.tableName};`,
        hints: [
          "Comando que limpa todos os dados da tabela."
        ],
        explanation: "TRUNCATE limpa o conteúdo de todas as linhas sem excluir a tabela!",
        action: (state) => { state.rows = []; }
      },
      {
        title: "Excluir Sistema Antigo",
        getDescription: (theme) => `SITUAÇÃO: A escola comprou um software novo. Apague a tabela '${theme.tableName}' antiga definitivamente. Qual comando usamos?`,
        template: (theme) => `[[DROP]] TABLE ${theme.tableName};`,
        hints: [
          "Comando para apagar permanentemente a estrutura do banco."
        ],
        explanation: "DROP TABLE exclui o objeto e seus dados da base!",
        action: (state) => { state.exists = false; }
      },
      {
        title: "Criar Tabela de Matrículas",
        getDescription: () => `SITUAÇÃO: Crie a nova tabela 'matriculas' com id e codigo_matricula no novo sistema. Qual comando usamos?`,
        template: () => `[[CREATE]] TABLE matriculas (\n  id INT PRIMARY KEY,\n  codigo_matricula VARCHAR(50) NOT NULL\n);`,
        hints: [
          "Comando para criar novas estruturas."
        ],
        explanation: "CREATE TABLE gera novas tabelas no banco de dados!",
        action: (state) => { state.exists = true; state.tableName = "matriculas"; state.column1 = "codigo_matricula"; state.hasColumn2 = false; state.rows = [["MAT-2026-01"], ["MAT-2026-02"]]; }
      }
    ]
  },
  {
    name: "Hospital",
    tableName: "pacientes",
    column1: "nome",
    column2: "telefone",
    initialState: { exists: false, hasColumn2: false, rows: [] },
    missions: [
      {
        title: "Criar Recepção do Hospital",
        getDescription: (theme) => `SITUAÇÃO: Precisamos criar a tabela '${theme.tableName}' para o sistema de emergência. Qual comando usamos?`,
        template: (theme) => `[[CREATE]] TABLE ${theme.tableName} (\n  id INT PRIMARY KEY,\n  ${theme.column1} VARCHAR(100) NOT NULL,\n  ${theme.column2} VARCHAR(20)\n);`,
        hints: [
          "Comando para criar uma tabela."
        ],
        explanation: "CREATE TABLE cria a tabela de pacientes!",
        action: (state, theme) => { state.exists = true; state.hasColumn2 = true; state.rows = theme.rows.slice(); }
      },
      {
        title: "Ajuste de Privacidade LGPD",
        getDescription: (theme) => `SITUAÇÃO: Por regras de privacidade, precisamos remover a coluna '${theme.column2}' da tabela '${theme.tableName}'. Qual comando usamos?`,
        template: (theme) => `[[ALTER]] TABLE ${theme.tableName}\n  [[DROP]] COLUMN ${theme.column2};`,
        hints: [
          "Comando para modificar tabela.",
          "Instrução para remover a coluna."
        ],
        explanation: "ALTER TABLE com DROP COLUMN deleta colunas indesejadas!",
        action: (state) => { state.hasColumn2 = false; }
      },
      {
        title: "Limpar Fila de Atendimento",
        getDescription: (theme) => `SITUAÇÃO: No fim do plantão, limpe a lista de todos os pacientes atendidos, mantendo a tabela pronta para o próximo dia. Qual comando usamos?`,
        template: (theme) => `[[TRUNCATE]] TABLE ${theme.tableName};`,
        hints: [
          "Comando para esvaziar os dados da tabela."
        ],
        explanation: "TRUNCATE limpa as linhas preservando a tabela!",
        action: (state) => { state.rows = []; }
      },
      {
        title: "Excluir Tabela Temporária",
        getDescription: (theme) => `SITUAÇÃO: A triagem temporária foi encerrada. Apague a tabela '${theme.tableName}' do banco de dados. Qual comando usamos?`,
        template: (theme) => `[[DROP]] TABLE ${theme.tableName};`,
        hints: [
          "Comando DDL para deletar estruturas."
        ],
        explanation: "DROP TABLE exclui completamente a tabela!",
        action: (state) => { state.exists = false; }
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
  tableName: "",
  column1: "",
  rows: []
};

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const $ = (id) => document.getElementById(id);
const normalizeString = (str) => str.trim().toUpperCase().replace(/\s+/g, " ");

function renderDatabaseView() {
  const container = $("dbv");
  if (!container) return;

  if (!dbState.exists) {
    const text = currentStep > 0
      ? `A tabela '${dbState.tableName || (currentTheme ? currentTheme.tableName : '')}' foi removida do banco com DROP.`
      : "Nenhuma tabela criada ainda.";
    container.innerHTML = `<p class="n">${text}</p>`;
    return;
  }

  const tableName = dbState.tableName || currentTheme.tableName;
  const col1 = dbState.column1 || currentTheme.column1;

  let tableHtml = `
    <table>
      <caption class="mono" style="text-align:left; padding-bottom:4px">${tableName}</caption>
      <tr>
        <th>id</th>
        <th>${col1}</th>
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
  
  // Inicializa o estado do banco conforme as configurações do tema sorteado
  dbState = {
    exists: currentTheme.initialState.exists,
    hasColumn2: currentTheme.initialState.hasColumn2,
    tableName: currentTheme.tableName,
    column1: currentTheme.column1,
    rows: currentTheme.initialState.rows.slice()
  };

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
    feedback.textContent = "Ainda não! Confira os comandos em vermelho.";
    return;
  }

  feedback.className = "fb ok";
  feedback.textContent = `✅ Correto! ${currentTheme.missions[missionIndex].explanation}`;

  inputs.forEach((input) => (input.disabled = true));
  section.querySelectorAll("button").forEach((btn) => (btn.disabled = true));
  section.className = "m done";

  // Executa a ação do banco de dados configurada para esta missão
  if (currentTheme.missions[missionIndex].action) {
    currentTheme.missions[missionIndex].action(dbState, currentTheme);
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
