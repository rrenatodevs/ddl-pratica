// Temas totalmente heterogêneos com sequências, pontos de partida e lacunas variadas!
const THEMES = [
  {
    name: "Escola",
    tableName: "alunos_antigo",
    column1: "nome",
    column2: "turma",
    initialState: { exists: true, hasColumn2: true, rows: [["Carlos Silva", "3º A"], ["Mariana Souza", "2º B"]] },
    missions: [
      {
        title: "Remover Sistema Legado",
        getDescription: () => `SITUAÇÃO: A escola trocou de software e a tabela 'alunos_antigo' precisa ser EXCLUÍDA DEFINITIVAMENTE. Qual comando usamos?`,
        template: () => `[[DROP]] TABLE alunos_antigo;`,
        hints: [
          "Comando para deletar permanentemente uma estrutura."
        ],
        explanation: "DROP TABLE exclui o objeto do catálogo do banco de dados!",
        action: (state) => { state.exists = false; }
      },
      {
        title: "Criar Tabela do Novo Sistema",
        getDescription: () => `SITUAÇÃO: Agora precisamos CRIAR a nova tabela 'estudantes' no sistema atual. Qual comando usamos?`,
        template: () => `[[CREATE]] TABLE estudantes (\n  id INT PRIMARY KEY,\n  nome VARCHAR(100) NOT NULL\n);`,
        hints: [
          "Comando de criação de tabela."
        ],
        explanation: "CREATE TABLE cria uma nova tabela na base de dados!",
        action: (state) => { 
          state.exists = true; 
          state.tableName = "estudantes"; 
          state.column1 = "nome"; 
          state.hasColumn2 = false; 
          state.rows = [["Beatriz Lima"], ["Lucas Mendes"]]; 
        }
      },
      {
        title: "Inclusão do E-mail do Estudante",
        getDescription: () => `SITUAÇÃO: Precisamos ADICIONAR a coluna 'email' na tabela 'estudantes' recém-criada. Qual comando usamos para modificar a tabela?`,
        template: () => `[[ALTER]] TABLE estudantes\n  ADD email VARCHAR(100);`,
        hints: [
          "Comando para modificar tabelas existentes."
        ],
        explanation: "ALTER TABLE insere a nova coluna sem perder os estudantes já cadastrados!",
        action: (state) => { state.hasColumn2 = true; state.column2 = "email"; state.rows = [["Beatriz Lima", "beatriz@escola.com"], ["Lucas Mendes", "lucas@escola.com"]]; }
      },
      {
        title: "Remover Cadastros no Fim do Ano",
        getDescription: () => `SITUAÇÃO: Chegamos no fim do ano letivo! Como fazemos para APAGAR TODOS OS ESTUDANTES cadastrados sem apagar a tabela 'estudantes'?`,
        template: () => `[[TRUNCATE]] [[TABLE]] estudantes;`,
        hints: [
          "Comando para limpar registros mantendo a estrutura.",
          "Palavra em inglês para a estrutura que está sendo limpada (tabela)."
        ],
        explanation: "TRUNCATE limpa todo o conteúdo da tabela para o ano seguinte!",
        action: (state) => { state.rows = []; }
      }
    ]
  },
  {
    name: "Games",
    tableName: "jogadores",
    column1: "nickname",
    column2: "nivel",
    initialState: { exists: true, hasColumn2: true, rows: [["ShadowHunter", "85"], ["PixelArt", "42"], ["NovaKing", "99"]] },
    missions: [
      {
        title: "Reset de Fim de Temporada",
        getDescription: (theme) => `SITUAÇÃO: A temporada do jogo encerrou! Precisamos APAGAR TODOS OS REGISTROS dos jogadores para zerar o ranking, mas a tabela '${theme.tableName}' precisa continuar existindo. Qual comando usamos?`,
        template: (theme) => `[[TRUNCATE]] TABLE ${theme.tableName};`,
        hints: [
          "Comando DDL de limpeza rápida de registros mantendo a estrutura da tabela."
        ],
        explanation: "O TRUNCATE esvazia todas as linhas da tabela de uma só vez sem apagar a estrutura!",
        action: (state) => { state.rows = []; }
      },
      {
        title: "Ajuste na Estrutura de Nível",
        getDescription: (theme) => `SITUAÇÃO: O sistema de experiência foi reformulado e a coluna '${theme.column2}' não será mais usada. Qual comando remove essa coluna da tabela '${theme.tableName}'?`,
        template: (theme) => `[[ALTER]] TABLE ${theme.tableName}\n  DROP [[COLUMN]] ${theme.column2};`,
        hints: [
          "Comando que modifica a tabela.",
          "Palavra que especifica que estamos removendo uma coluna."
        ],
        explanation: "ALTER TABLE combinado com DROP COLUMN elimina apenas a coluna especificada!",
        action: (state) => { state.hasColumn2 = false; }
      },
      {
        title: "Desativar Servidor Antigo",
        getDescription: (theme) => `SITUAÇÃO: O servidor antigo de '${theme.tableName}' foi desligado. Precisamos EXCLUIR DEFINITIVAMENTE essa tabela do banco de dados. Qual comando usamos?`,
        template: (theme) => `[[DROP]] TABLE ${theme.tableName};`,
        hints: [
          "Comando DDL para deletar estruturas por completo."
        ],
        explanation: "O DROP TABLE remove a tabela inteira e todos os seus dados sem possibilidade de retorno!",
        action: (state) => { state.exists = false; }
      },
      {
        title: "Novo Servidor de Ranking",
        getDescription: () => `SITUAÇÃO: Agora precisamos CRIAR uma nova tabela chamada 'ranking_2026' para a nova temporada. Qual comando usamos?`,
        template: () => `[[CREATE]] [[TABLE]] ranking_2026 (\n  id INT PRIMARY KEY,\n  player_name VARCHAR(80)\n);`,
        hints: [
          "Comando para criar novas estruturas.",
          "Palavra em inglês para a estrutura de dados (tabela)."
        ],
        explanation: "CREATE TABLE gera a nova estrutura do zero no banco de dados!",
        action: (state) => { 
          state.exists = true; 
          state.tableName = "ranking_2026"; 
          state.column1 = "player_name"; 
          state.hasColumn2 = false; 
          state.rows = [["ProGamer_X"], ["Valkyrie"]]; 
        }
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
        title: "Lançamento do E-commerce",
        getDescription: (theme) => `SITUAÇÃO: O e-commerce está sendo criado do zero. Precisamos CRIAR a tabela '${theme.tableName}' com o campo '${theme.column1}'. Qual comando usamos?`,
        template: (theme) => `[[CREATE]] TABLE ${theme.tableName} (\n  id INT PRIMARY KEY,\n  ${theme.column1} VARCHAR(100) NOT NULL\n);`,
        hints: [
          "Comando DDL para criar objetos do zero."
        ],
        explanation: "CREATE TABLE inicializa o objeto de tabela no banco de dados!",
        action: (state) => { state.exists = true; state.rows = [["Camiseta Oversized"], ["Tênis Running"], ["Boné Aba Reta"]]; }
      },
      {
        title: "Inclusão de Preço no Catálogo",
        getDescription: (theme) => `SITUAÇÃO: A tabela '${theme.tableName}' já existe. Agora precisamos ADICIONAR a coluna de '${theme.column2}'. Qual comando usamos?`,
        template: (theme) => `ALTER [[TABLE]] ${theme.tableName}\n  [[ADD]] ${theme.column2} DECIMAL(10,2);`,
        hints: [
          "Estrutura que estamos modificando (tabela em inglês).",
          "Comando de inclusão (adicionar em inglês)."
        ],
        explanation: "ALTER TABLE com a instrução ADD insere novos atributos na tabela!",
        action: (state) => { state.hasColumn2 = true; state.rows = [["Camiseta Oversized", "89.90"], ["Tênis Running", "299.90"], ["Boné Aba Reta", "59.90"]]; }
      },
      {
        title: "Limpar Produtos de Teste",
        getDescription: (theme) => `SITUAÇÃO: Cadastramos itens fictícios durante os testes. Como fazemos para APAGAR TODOS OS DADOS dos produtos sem deletar a tabela?`,
        template: (theme) => `[[TRUNCATE]] TABLE ${theme.tableName};`,
        hints: [
          "Comando rápido para limpar registros mantendo a tabela pronta."
        ],
        explanation: "TRUNCATE limpa a tabela mantendo sua estrutura intacta para novos cadastros!",
        action: (state) => { state.rows = []; }
      },
      {
        title: "Renomear Coluna do Produto",
        getDescription: (theme) => `SITUAÇÃO: O setor de marketing solicitou alterar a coluna '${theme.column1}' para 'item_nome'. Qual comando DDL usaremos para alterar a tabela?`,
        template: (theme) => `[[ALTER]] TABLE ${theme.tableName}\n  RENAME COLUMN ${theme.column1} TO item_nome;`,
        hints: [
          "Comando para alterar estruturas já existentes no banco."
        ],
        explanation: "ALTER TABLE permite alterar definições de colunas, como seus nomes!",
        action: (state) => { state.column1 = "item_nome"; }
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
        title: "Prontuário Médico de Emergência",
        getDescription: (theme) => `SITUAÇÃO: Precisamos CRIAR a tabela '${theme.tableName}' no sistema do hospital com a coluna '${theme.column1}'. Qual comando usamos?`,
        template: (theme) => `[[CREATE]] TABLE ${theme.tableName} (\n  id INT PRIMARY KEY,\n  ${theme.column1} VARCHAR(100) NOT NULL,\n  ${theme.column2} VARCHAR(20)\n);`,
        hints: [
          "Comando DDL para criar novas tabelas."
        ],
        explanation: "CREATE TABLE inicializa o prontuário no banco de dados!",
        action: (state, theme) => { state.exists = true; state.hasColumn2 = true; state.rows = theme.rows.length ? theme.rows : [["Dr. Roberto"], ["Dra. Patricia"]]; }
      },
      {
        title: "Esvaziar Fila de Plantão",
        getDescription: (theme) => `SITUAÇÃO: No encerramento da troca de turno, precisamos LIMPAR todos os cadastros de atendimento mantendo a tabela '${theme.tableName}' pronta. Qual comando usamos?`,
        template: (theme) => `[[TRUNCATE]] TABLE ${theme.tableName};`,
        hints: [
          "Comando de esvaziamento de dados rápido."
        ],
        explanation: "TRUNCATE zera as linhas da tabela de forma muito mais eficiente!",
        action: (state) => { state.rows = []; }
      },
      {
        title: "Remoção de Coluna Sensível",
        getDescription: (theme) => `SITUAÇÃO: Para conformidade com a LGPD, precisamos REMOVER a coluna '${theme.column2}' da tabela de pacientes. Qual comando usaremos?`,
        template: (theme) => `[[ALTER]] TABLE ${theme.tableName}\n  DROP COLUMN ${theme.column2};`,
        hints: [
          "Comando DDL para modificar a estrutura de uma tabela."
        ],
        explanation: "ALTER TABLE permite aplicar mudanças de privacidade na estrutura da tabela!",
        action: (state) => { state.hasColumn2 = false; }
      },
      {
        title: "Encerrar Módulo de Emergência",
        getDescription: (theme) => `SITUAÇÃO: A ala temporária foi fechada e a tabela '${theme.tableName}' deve ser DELETADA DEFINITIVAMENTE. Qual comando usamos?`,
        template: (theme) => `[[DROP]] TABLE ${theme.tableName};`,
        hints: [
          "Comando DDL para deletar estruturas por completo."
        ],
        explanation: "DROP TABLE exclui o objeto e encerra a tabela no banco!",
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
  column2: "",
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
      ? `A tabela '${dbState.tableName || (currentTheme ? currentTheme.tableName : '')}' foi removida com DROP.`
      : "Nenhuma tabela criada ainda.";
    container.innerHTML = `<p class="n">${text}</p>`;
    return;
  }

  const tableName = dbState.tableName || currentTheme.tableName;
  const col1 = dbState.column1 || currentTheme.column1;
  const col2 = dbState.column2 || currentTheme.column2;

  let tableHtml = `
    <table>
      <caption class="mono" style="text-align:left; padding-bottom:4px">${tableName}</caption>
      <tr>
        <th>id</th>
        <th>${col1}</th>
        ${dbState.hasColumn2 ? `<th>${col2}</th>` : ""}
      </tr>
  `;

  dbState.rows.forEach((row, index) => {
    tableHtml += `
      <tr>
        <td>${index + 1}</td>
        <td>${row[0]}</td>
        ${dbState.hasColumn2 ? `<td>${row[1] || ''}</td>` : ""}
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
  
  // Inicializa o estado do banco conforme as configurações únicas de cada tema
  dbState = {
    exists: currentTheme.initialState.exists,
    hasColumn2: currentTheme.initialState.hasColumn2,
    tableName: currentTheme.tableName,
    column1: currentTheme.column1,
    column2: currentTheme.column2,
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
    feedback.textContent = "Ainda não! Confira os comandos preenchidos em vermelho.";
    return;
  }

  feedback.className = "fb ok";
  feedback.textContent = `✅ Correto! ${currentTheme.missions[missionIndex].explanation}`;

  inputs.forEach((input) => (input.disabled = true));
  section.querySelectorAll("button").forEach((btn) => (btn.disabled = true));
  section.className = "m done";

  // Executa a alteração no Banco de Dados em tempo real
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
