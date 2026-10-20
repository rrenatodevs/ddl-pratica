const THEMES = [
  {
    id: "loja",
    name: "Loja (E-Commerce)",
    tableName: "produtos",
    column1: "nome",
    column2: "preco",
    rows: [
      ["Camiseta Tech", "89.90"],
      ["Notebook i7", "4500.00"],
      ["Mouse Gamer", "150.00"]
    ],
    missions: [
      {
        title: "Modelagem da Tabela de Catálogo",
        getDescription: (theme) => `Crie a tabela '${theme.tableName}' garantindo que o preço seja positivo utilizando uma restrição CHECK.`,
        template: (theme) => `[[CREATE]] TABLE ${theme.tableName} (\n  id INT PRIMARY KEY,\n  ${theme.column1} VARCHAR(100) NOT NULL,\n  ${theme.column2} DECIMAL(10,2) [[CHECK]] (${theme.column2} > 0)\n);`,
        hints: [
          "Comando DDL para criar novas tabelas.",
          "Cláusula de validação e restrição de regras de negócio."
        ],
        explanation: "CREATE TABLE define a estrutura e o CHECK garante regras de integridade nos valores dos dados."
      },
      {
        title: "Otimização de Performance (Indexação)",
        getDescription: (theme) => `O time de infraestrutura solicitou um índice na coluna '${theme.column1}' para acelerar buscas no site.`,
        template: (theme) => `[[CREATE]] [[INDEX]] idx_prod_nome\nON ${theme.tableName} (${theme.column1});`,
        hints: [
          "Comando inicial para criar estruturas secundárias no banco.",
          "Palavra-chave para criar um índice de busca rápida."
        ],
        explanation: "CREATE INDEX otimiza a performance de consultas (SELECT) em colunas de alta busca."
      },
      {
        title: "Evolução do Schema: Código de Barras",
        getDescription: (theme) => `Adicione o campo 'codigo_barras' obrigatório do tipo VARCHAR(13).`,
        template: (theme) => `[[ALTER]] TABLE ${theme.tableName}\n  [[ADD]] codigo_barras VARCHAR(13) [[NOT]] NULL;`,
        hints: [
          "Comando para alterar estruturas de tabelas existentes.",
          "Instrução para acrescentar uma nova coluna.",
          "Palavra complementar de 'NULL' para tornar o campo obrigatório."
        ],
        explanation: "ALTER TABLE com ADD expande a estrutura da tabela no banco de dados."
      },
      {
        title: "Limpeza da Base de Testes",
        getDescription: (theme) => `Esvazie todos os registros da tabela '${theme.tableName}' mantendo a estrutura intacta para o ambiente de produção.`,
        template: (theme) => `[[TRUNCATE]] TABLE ${theme.tableName};`,
        hints: [
          "Comando rápido de DDL para remover todas as linhas sem apagar a tabela."
        ],
        explanation: "TRUNCATE remove todos os dados da tabela de forma muito mais performática que DELETE."
      },
      {
        title: "Descarte da Tabela",
        getDescription: (theme) => `A loja mudou de arquitetura. Remova a tabela '${theme.tableName}' definitivamente do banco de dados.`,
        template: (theme) => `[[DROP]] TABLE ${theme.tableName};`,
        hints: [
          "Comando DDL de destruição de estruturas de banco de dados."
        ],
        explanation: "DROP TABLE remove permanentemente a tabela e todos os seus índices e dados associados."
      }
    ]
  },
  {
    id: "escola",
    name: "Escola (Acadêmico)",
    tableName: "alunos",
    column1: "nome",
    column2: "email",
    rows: [
      ["Ana Silva", "ana@escola.com"],
      ["Bruno Lima", "bruno@escola.com"],
      ["Carla Souza", "carla@escola.com"]
    ],
    missions: [
      {
        title: "Criação de Alunos com Identificador Único",
        getDescription: (theme) => `Crie a tabela '${theme.tableName}' garantindo que a coluna '${theme.column2}' não aceite duplicadas.`,
        template: (theme) => `[[CREATE]] TABLE ${theme.tableName} (\n  id INT PRIMARY KEY,\n  ${theme.column1} VARCHAR(100) NOT NULL,\n  ${theme.column2} VARCHAR(100) [[UNIQUE]]\n);`,
        hints: [
          "Comando DDL para criar tabelas.",
          "Restrição que impede valores duplicados na mesma coluna."
        ],
        explanation: "A constraint UNIQUE garante que nenhum email cadastrado seja duplicado."
      },
      {
        title: "Refatoração: Padronização de Colunas",
        getDescription: (theme) => `A equipe solicitou renomear a coluna '${theme.column1}' para 'nome_completo'.`,
        template: (theme) => `[[ALTER]] TABLE ${theme.tableName}\n  [[RENAME]] COLUMN ${theme.column1} [[TO]] nome_completo;`,
        hints: [
          "Comando para alterar estrutura da tabela.",
          "Ação de renomear um elemento.",
          "Palavra de ligação ('para' em inglês)."
        ],
        explanation: "RENAME COLUMN permite alterar o nome de atributos sem perder os dados armazenados."
      },
      {
        title: "Adequação à LGPD (Remoção de Dado Sensível)",
        getDescription: () => "Por conformidade de privacidade, remova a coluna 'email' da tabela de alunos.",
        template: (theme) => `ALTER TABLE ${theme.tableName}\n  [[DROP]] [[COLUMN]] ${theme.column2};`,
        hints: [
          "Comando de remoção/exclusão.",
          "Identificador de que o alvo a ser removido é uma coluna."
        ],
        explanation: "DROP COLUMN apaga permanentemente a coluna especificada e seus dados armazenados."
      },
      {
        title: "Descarte de Estrutura Obsoleta",
        getDescription: (theme) => `Apague a tabela '${theme.tableName}' do sistema acadêmico antigo.`,
        template: (theme) => `[[DROP]] TABLE ${theme.tableName};`,
        hints: [
          "Comando DDL para remover completamente uma tabela."
        ],
        explanation: "DROP TABLE exclui o objeto do banco de dados definitivamente."
      }
    ]
  },
  {
    id: "games",
    name: "Games (Ranking e Logs)",
    tableName: "jogadores",
    column1: "nickname",
    column2: "nivel",
    rows: [
      ["ShadowHunter", "12"],
      ["PixelArt", "27"],
      ["NovaKing", "5"]
    ],
    missions: [
      {
        title: "Sistema de Perfil de Jogadores",
        getDescription: (theme) => `Crie a tabela '${theme.tableName}' definindo um valor padrão (DEFAULT 1) para o nível inicial do jogador.`,
        template: (theme) => `[[CREATE]] TABLE ${theme.tableName} (\n  id INT PRIMARY KEY,\n  ${theme.column1} VARCHAR(50) NOT NULL,\n  ${theme.column2} INT [[DEFAULT]] 1\n);`,
        hints: [
          "Comando para criar tabelas.",
          "Palavra-chave usada para valor padrão quando nenhum é informado no INSERT."
        ],
        explanation: "DEFAULT define o valor padrão que o banco atribui caso o campo não seja preenchido."
      },
      {
        title: "Modelagem de Relacionamento (Foreign Key)",
        getDescription: (theme) => `Crie uma tabela 'partidas' vinculada aos '${theme.tableName}' via Chave Estrangeira.`,
        template: (theme) => `CREATE TABLE partidas (\n  id INT PRIMARY KEY,\n  jogador_id INT,\n  [[FOREIGN]] KEY (jogador_id) [[REFERENCES]] ${theme.tableName}(id)\n);`,
        hints: [
          "Primeira palavra da restrição de chave estrangeira (Estrangeiro em inglês).",
          "Palavra que aponta para a tabela pai/origem."
        ],
        explanation: "FOREIGN KEY e REFERENCES criam a integridade referencial entre tabelas relacionais."
      },
      {
        title: "Adição de Restrição Positiva",
        getDescription: (theme) => `Garanta através de um ALTER TABLE que o '${theme.column2}' não possa ser menor que zero.`,
        template: (theme) => `[[ALTER]] TABLE ${theme.tableName}\n  [[ADD]] CONSTRAINT chk_nivel [[CHECK]] (${theme.column2} >= 0);`,
        hints: [
          "Modificar estrutura existente.",
          "Instrução para incluir uma nova restrição.",
          "Restrição que valida expressões lógicas."
        ],
        explanation: "Adicionar uma restrição CHECK via ALTER TABLE garante consistência em bases que já estão em execução."
      },
      {
        title: "Reset de Temporada",
        getDescription: (theme) => `Limpe todos os dados de jogadores para reiniciar o ranking da temporada.`,
        template: (theme) => `[[TRUNCATE]] TABLE ${theme.tableName};`,
        hints: [
          "Comando para esvaziar rapidamente a tabela."
        ],
        explanation: "TRUNCATE limpa a tabela para o início do novo ciclo mantendo as constraints."
      }
    ]
  },
  {
    id: "hospital",
    name: "Hospital (Prontuários)",
    tableName: "pacientes",
    column1: "nome",
    column2: "telefone",
    rows: [
      ["Marta Rocha", "11 98888-0001"],
      ["João Mendes", "11 98888-0002"],
      ["Lia Costa", "11 98888-0003"]
    ],
    missions: [
      {
        title: "Tabela de Cadastro Hospitalar",
        getDescription: (theme) => `Crie a tabela '${theme.tableName}' com campos obrigatórios para recepção de emergência.`,
        template: (theme) => `[[CREATE]] TABLE ${theme.tableName} (\n  id INT PRIMARY KEY,\n  ${theme.column1} VARCHAR(120) NOT [[NULL]],\n  ${theme.column2} VARCHAR(20)\n);`,
        hints: [
          "Instrução para criar a estrutura.",
          "Complemento de NOT para obrigar o preenchimento."
        ],
        explanation: "NOT NULL impede o armazenamento de dados ausentes em colunas críticas."
      },
      {
        title: "Inclusão do Registro Geral (CPF)",
        getDescription: (theme) => `Adicione a coluna 'cpf' do tipo CHAR(11) com restrição de unicidade na tabela '${theme.tableName}'.`,
        template: (theme) => `ALTER TABLE ${theme.tableName}\n  [[ADD]] cpf CHAR(11) [[UNIQUE]];`,
        hints: [
          "Instrução para acrescentar coluna.",
          "Garante que cada paciente tenha um CPF exclusivo."
        ],
        explanation: "Campos como CPF exigem restrição UNIQUE para evitar duplicidade de cadastros de pessoas."
      },
      {
        title: "Exclusão da Tabela",
        getDescription: (theme) => `Apague a tabela '${theme.tableName}' ao migrar para o novo sistema hospitalar.`,
        template: (theme) => `[[DROP]] TABLE ${theme.tableName};`,
        hints: [
          "Comando DDL para deletar estruturas completas."
        ],
        explanation: "DROP TABLE remove o objeto do catálogo do banco de dados."
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
    const text = currentStep >= (currentTheme ? currentTheme.missions.length : 1)
      ? `A tabela ${currentTheme ? currentTheme.tableName : ''} foi removida.`
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
      // Índices ímpares são as lacunas interativas ([[termo]])
      if (partIndex % 2 !== 0) {
        codeHtml += `<input data-answer="${part}" size="${part.length + 2}" aria-label="lacuna" autocomplete="off" spellcheck="false" ${index ? "disabled" : ""}>`;
      } else {
        codeHtml += part.replace(/</g, "&lt;");
      }
    });

    section.innerHTML = `
      <h3>Missão ${index + 1}: ${mission.title}</h3>
      <p>${mission.getDescription(currentTheme)}</p>
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
      <text transform="rotate(${i * 90 + 45} 150 150)" x="150" y="68" text-anchor="middle" font-size="20" font-weight="800" fill="${WHEEL_COLORS[i][1]}">
        ${theme.name.split(' ')[0]}
      </text>
    `;
  });

  svgContent += `<circle cx="150" cy="150" r="14" fill="#050505" stroke="#8DD3F0" stroke-width="4"/>`;
  wheelElement.innerHTML = svgContent;
}

function startGame() {
  currentStep = 0;
  dbState = { exists: false, hasColumn2: true, rows: [] };

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
    slotText.textContent = `Tema: ${currentTheme.name}`;
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

  feedback.textContent = `Dica para a lacuna ${firstWrongIndex + 1}: ${currentTheme.missions[missionIndex].hints[firstWrongIndex]}`;
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
    feedback.textContent = "Ainda não. Confira as lacunas em vermelho.";
    return;
  }

  feedback.className = "fb ok";
  feedback.textContent = `Correto! ${currentTheme.missions[missionIndex].explanation}`;

  inputs.forEach((input) => (input.disabled = true));
  section.querySelectorAll("button").forEach((btn) => (btn.disabled = true));
  section.className = "m done";

  // Lógica dinâmica de simulação do estado do banco
  const totalMissions = currentTheme.missions.length;
  if (missionIndex === 0) {
    dbState.exists = true;
    dbState.rows = currentTheme.rows.slice();
  } else if (missionIndex === totalMissions - 1) {
    dbState.exists = false;
  } else if (currentTheme.missions[missionIndex].title.includes("TRUNCATE") || currentTheme.missions[missionIndex].title.includes("Limpeza")) {
    dbState.rows = [];
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
