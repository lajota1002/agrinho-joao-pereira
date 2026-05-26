/* ==========================================================================
   1. GERENCIAMENTO DO MODO ESCURO (Acessibilidade)
   ========================================================================== */
const btnDarkMode = document.getElementById('toggle-dark-mode');

// Escuta o clique do botão para alternar a classe no body
btnDarkMode.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    // Altera o texto do botão dinamicamente para dar feedback ao usuário
    if (document.body.classList.contains('dark-mode')) {
        btnDarkMode.textContent = '☀️ Modo Claro';
    } else {
        btnDarkMode.textContent = '🌙 Modo Escuro';
    }
});


/* ==========================================================================
   2. LÓGICA DO SIMULADOR INTERATIVO (Manipulação do DOM)
   ========================================================================== */
// Banco de dados dinâmico de perguntas para o simulador
const perguntasSimulador = [
    {
        pergunta: "Qual fonte de energia você vai priorizar na sua propriedade?",
        opcoes: [
            { texto: "Combustíveis fósseis (Geradores a Diesel)", impacto: -30, feedback: "Poxa, o diesel emite muitos gases poluentes!" },
            { texto: "Energia Solar Fotovoltaica", impacto: 20, feedback: "Excelente! Energia limpa reduz custos e protege o planeta." }
        ]
    },
    {
        pergunta: "O que fazer com os restos de colheita e esterco dos animais?",
        opcoes: [
            { texto: "Descartar perto de rios locais", impacto: -40, feedback: "Cuidado! Isso causa poluição da água (eutrofização)." },
            { texto: "Montar uma usina de Compostagem", impacto: 20, feedback: "Incrível! Você gerou adubo orgânico de alta qualidade." }
        ]
    }
];

let faseAtual = 0;
let pontuacaoSustentavel = 100;

const questionText = document.getElementById('question-text');
const quizOptionsContainer = document.querySelector('.quiz-options');
const scoreText = document.getElementById('score-text');
const feedbackMessage = document.getElementById('feedback-message');
const btnReset = document.getElementById('reset-simulator');

// Função para renderizar as perguntas e opções na tela
function carregarFase() {
    feedbackMessage.classList.add('hidden'); // Esconde o feedback anterior
    
    if (faseAtual < perguntasSimulador.length) {
        const dadosFase = perguntasSimulador[faseAtual];
        questionText.textContent = dadosFase.pergunta;
        quizOptionsContainer.innerHTML = ''; // Limpa botões antigos

        // Cria os novos botões dinamicamente via JS
        dadosFase.opcoes.forEach(opcao => {
            const botao = document.createElement('button');
            botao.classList.add('quiz-btn');
            botao.textContent = opcao.texto;
            
            // Evento ao clicar na resposta
            botao.addEventListener('click', () => processarDecisao(opcao.impacto, opcao.feedback));
            quizOptionsContainer.appendChild(botao);
        });
    } else {
        // Fim do simulador
        questionText.textContent = "Simulação concluída!";
        quizOptionsContainer.innerHTML = '';
        btnReset.classList.remove('hidden');
        
        if (pontuacaoSustentavel >= 70) {
            feedbackMessage.textContent = "Parabéns! Sua fazenda é um modelo de sustentabilidade! 🌾🌱";
            feedbackMessage.className = "sucesso";
        } else {
            feedbackMessage.textContent = "Sua fazenda precisa de melhorias ecológicas. Tente novamente!";
            feedbackMessage.className = "erro";
        }
        feedbackMessage.classList.remove('hidden');
    }
}

// Processa o impacto da decisão no medidor
function processarDecisao(impacto, feedback) {
    pontuacaoSustentavel += impacto;
    
    // Garante que a nota fique entre 0 e 100
    if (pontuacaoSustentavel > 100) pontuacaoSustentavel = 100;
    if (pontuacaoSustentavel < 0) pontuacaoSustentavel = 0;

    // Atualiza o DOM
    scoreText.textContent = pontuacaoSustentavel + "%";
    feedbackMessage.textContent = feedback;
    
    // Define a cor do feedback baseado no impacto
    if (impacto > 0) {
        feedbackMessage.className = "sucesso";
    } else {
        feedbackMessage.className = "erro";
    }
    feedbackMessage.classList.remove('hidden');

    // Avança para a próxima fase após 2.5 segundos para o usuário ler o feedback
    setTimeout(() => {
        faseAtual++;
        carregarFase();
    }, 2500);
}

// Reinicia o simulador
btnReset.addEventListener('click', () => {
    faseAtual = 0;
    pontuacaoSustentavel = 100;
    scoreText.textContent = "100%";
    btnReset.classList.add('hidden');
    carregarFase();
});

// Inicializa o simulador assim que a página abre
carregarFase();


/* ==========================================================================
   3. VALIDAÇÃO DO FORMULÁRIO DE CONTATO (Segurança e UX)
   ========================================================================== */
const form = document.getElementById('contact-form');
const inputNome = document.getElementById('nome');
const inputEmail = document.getElementById('email');
const errorNome = document.getElementById('error-nome');
const errorEmail = document.getElementById('error-email');
const msgSucesso = document.getElementById('form-success');

form.addEventListener('submit', (evento) => {
    evento.preventDefault(); // Evita que a página recarregue
    
    let formularioValido = true;

    // Validação do campo Nome
    if (inputNome.value.trim() === "") {
        errorNome.textContent = "Por favor, digite seu nome.";
        formularioValido = false;
    } else {
        errorNome.textContent = "";
    }

    // Validação do campo E-mail
    if (inputEmail.value.trim() === "") {
        errorEmail.textContent = "Por favor, insira um e-mail.";
        formularioValido = false;
    } else if (!inputEmail.value.includes('@')) {
        errorEmail.textContent = "O e-mail digitado não é válido (falta o @).";
        formularioValido = false;
    } else {
        errorEmail.textContent = "";
    }

    // Se tudo estiver certo, exibe mensagem de sucesso dinamicamente
    if (formularioValido) {
        msgSucesso.style.display = "block";
        form.reset(); // Limpa os campos preenchidos
        
        // Esconde a mensagem de sucesso depois de 4 segundos
        setTimeout(() => {
            msgSucesso.style.display = "none";
        }, 4000);
    }
});