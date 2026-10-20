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
