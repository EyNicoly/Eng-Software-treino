// Proteção da página
if(localStorage.getItem("logado") !== "true"){
  window.location.href = "index.html";
}

// Dados do usuário (simulando um banco de dados)
let userData = {
  treinos: JSON.parse(localStorage.getItem('treinos')) || [],
  refeicoes: JSON.parse(localStorage.getItem('refeicoes')) || [],
  perfil: JSON.parse(localStorage.getItem('perfil')) || {
    nome: '',
    email: '',
    idade: '',
    altura: '',
    peso: '',
    objetivo: ''
  },
  progresso: JSON.parse(localStorage.getItem('progresso')) || {
    pesos: [],
    treinosRealizados: 0
  }
};

// Navegação entre seções
document.addEventListener('DOMContentLoaded', function() {
  // Carregar dados iniciais
  loadTreinos();
  loadRefeicoes();
  loadPerfil();
  loadProgresso();
  
  // Event listeners para navegação
  document.getElementById('nav-treinos').addEventListener('click', () => showSection('treinos'));
  document.getElementById('nav-dieta').addEventListener('click', () => showSection('dieta'));
  document.getElementById('nav-progresso').addEventListener('click', () => showSection('progresso'));
  document.getElementById('nav-perfil').addEventListener('click', () => showSection('perfil'));
});

function showSection(sectionName) {
  // Esconder todas as seções
  const sections = document.querySelectorAll('.dashboard-section');
  sections.forEach(section => section.classList.add('hidden'));
  
  // Remover classe active de todos os links
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => link.classList.remove('active'));
  
  // Mostrar seção selecionada
  document.getElementById(`${sectionName}-section`).classList.remove('hidden');
  document.getElementById(`nav-${sectionName}`).classList.add('active');
}

function logout(){
  localStorage.removeItem("logado");
  window.location.href = "index.html";
}

// === TREINOS ===
function showAddTreinoForm() {
  document.getElementById('add-treino-form').classList.remove('hidden');
}

function hideAddTreinoForm() {
  document.getElementById('add-treino-form').classList.add('hidden');
  clearTreinoForm();
}

function clearTreinoForm() {
  document.getElementById('treino-nome').value = '';
  document.getElementById('treino-descricao').value = '';
}

function addTreino() {
  const nome = document.getElementById('treino-nome').value.trim();
  const descricao = document.getElementById('treino-descricao').value.trim();
  
  if (!nome) {
    alert('Por favor, insira o nome do treino.');
    return;
  }
  
  const novoTreino = {
    id: Date.now(),
    nome: nome,
    descricao: descricao,
    dataCriacao: new Date().toLocaleDateString('pt-BR')
  };
  
  userData.treinos.push(novoTreino);
  localStorage.setItem('treinos', JSON.stringify(userData.treinos));
  
  loadTreinos();
  hideAddTreinoForm();
}

function loadTreinos() {
  const treinosList = document.getElementById('treinos-list');
  
  if (userData.treinos.length === 0) {
    treinosList.innerHTML = `
      <div class="item-card">
        <h3>Nenhum treino cadastrado</h3>
        <p>Clique em "Adicionar Treino" para começar!</p>
      </div>
    `;
    return;
  }
  
  treinosList.innerHTML = userData.treinos.map(treino => `
    <div class="item-card">
      <h3>${treino.nome}</h3>
      <p><strong>Descrição:</strong> ${treino.descricao || 'Sem descrição'}</p>
      <p><strong>Criado em:</strong> ${treino.dataCriacao}</p>
      <div class="item-actions">
        <button class="btn-edit" onclick="editTreino(${treino.id})">Editar</button>
        <button class="btn-delete" onclick="deleteTreino(${treino.id})">Excluir</button>
      </div>
    </div>
  `).join('');
}

function editTreino(id) {
  const treino = userData.treinos.find(t => t.id === id);
  if (!treino) return;
  
  document.getElementById('treino-nome').value = treino.nome;
  document.getElementById('treino-descricao').value = treino.descricao;
  
  showAddTreinoForm();
  
  // Alterar o botão para "Atualizar"
  const saveBtn = document.querySelector('#add-treino-form .btn-primary');
  saveBtn.textContent = 'Atualizar';
  saveBtn.onclick = () => updateTreino(id);
}

function updateTreino(id) {
  const nome = document.getElementById('treino-nome').value.trim();
  const descricao = document.getElementById('treino-descricao').value.trim();
  
  if (!nome) {
    alert('Por favor, insira o nome do treino.');
    return;
  }
  
  const treinoIndex = userData.treinos.findIndex(t => t.id === id);
  if (treinoIndex !== -1) {
    userData.treinos[treinoIndex].nome = nome;
    userData.treinos[treinoIndex].descricao = descricao;
    
    localStorage.setItem('treinos', JSON.stringify(userData.treinos));
    loadTreinos();
    hideAddTreinoForm();
    
    // Restaurar o botão para "Salvar"
    const saveBtn = document.querySelector('#add-treino-form .btn-primary');
    saveBtn.textContent = 'Salvar';
    saveBtn.onclick = addTreino;
  }
}

function deleteTreino(id) {
  if (confirm('Tem certeza que deseja excluir este treino?')) {
    userData.treinos = userData.treinos.filter(t => t.id !== id);
    localStorage.setItem('treinos', JSON.stringify(userData.treinos));
    loadTreinos();
  }
}

// === DIETA ===
function showAddRefeicaoForm() {
  document.getElementById('add-refeicao-form').classList.remove('hidden');
}

function hideAddRefeicaoForm() {
  document.getElementById('add-refeicao-form').classList.add('hidden');
  clearRefeicaoForm();
}

function clearRefeicaoForm() {
  document.getElementById('refeicao-nome').value = '';
  document.getElementById('refeicao-horario').value = '';
  document.getElementById('refeicao-alimentos').value = '';
}

function addRefeicao() {
  const nome = document.getElementById('refeicao-nome').value.trim();
  const horario = document.getElementById('refeicao-horario').value;
  const alimentos = document.getElementById('refeicao-alimentos').value.trim();
  
  if (!nome || !horario) {
    alert('Por favor, preencha o nome e horário da refeição.');
    return;
  }
  
  const novaRefeicao = {
    id: Date.now(),
    nome: nome,
    horario: horario,
    alimentos: alimentos,
    dataCriacao: new Date().toLocaleDateString('pt-BR')
  };
  
  userData.refeicoes.push(novaRefeicao);
  localStorage.setItem('refeicoes', JSON.stringify(userData.refeicoes));
  
  loadRefeicoes();
  hideAddRefeicaoForm();
}

function loadRefeicoes() {
  const refeicoesList = document.getElementById('refeicoes-list');
  
  if (userData.refeicoes.length === 0) {
    refeicoesList.innerHTML = `
      <div class="item-card">
        <h3>Nenhuma refeição cadastrada</h3>
        <p>Clique em "Adicionar Refeição" para começar!</p>
      </div>
    `;
    return;
  }
  
  // Ordenar refeições por horário
  const refeicoesSorted = userData.refeicoes.sort((a, b) => a.horario.localeCompare(b.horario));
  
  refeicoesList.innerHTML = refeicoesSorted.map(refeicao => `
    <div class="item-card">
      <h3>${refeicao.nome}</h3>
      <p><strong>Horário:</strong> ${refeicao.horario}</p>
      <p><strong>Alimentos:</strong> ${refeicao.alimentos || 'Não especificado'}</p>
      <p><strong>Criado em:</strong> ${refeicao.dataCriacao}</p>
      <div class="item-actions">
        <button class="btn-edit" onclick="editRefeicao(${refeicao.id})">Editar</button>
        <button class="btn-delete" onclick="deleteRefeicao(${refeicao.id})">Excluir</button>
      </div>
    </div>
  `).join('');
}

function editRefeicao(id) {
  const refeicao = userData.refeicoes.find(r => r.id === id);
  if (!refeicao) return;
  
  document.getElementById('refeicao-nome').value = refeicao.nome;
  document.getElementById('refeicao-horario').value = refeicao.horario;
  document.getElementById('refeicao-alimentos').value = refeicao.alimentos;
  
  showAddRefeicaoForm();
  
  // Alterar o botão para "Atualizar"
  const saveBtn = document.querySelector('#add-refeicao-form .btn-primary');
  saveBtn.textContent = 'Atualizar';
  saveBtn.onclick = () => updateRefeicao(id);
}

function updateRefeicao(id) {
  const nome = document.getElementById('refeicao-nome').value.trim();
  const horario = document.getElementById('refeicao-horario').value;
  const alimentos = document.getElementById('refeicao-alimentos').value.trim();
  
  if (!nome || !horario) {
    alert('Por favor, preencha o nome e horário da refeição.');
    return;
  }
  
  const refeicaoIndex = userData.refeicoes.findIndex(r => r.id === id);
  if (refeicaoIndex !== -1) {
    userData.refeicoes[refeicaoIndex].nome = nome;
    userData.refeicoes[refeicaoIndex].horario = horario;
    userData.refeicoes[refeicaoIndex].alimentos = alimentos;
    
    localStorage.setItem('refeicoes', JSON.stringify(userData.refeicoes));
    loadRefeicoes();
    hideAddRefeicaoForm();
    
    // Restaurar o botão para "Salvar"
    const saveBtn = document.querySelector('#add-refeicao-form .btn-primary');
    saveBtn.textContent = 'Salvar';
    saveBtn.onclick = addRefeicao;
  }
}

function deleteRefeicao(id) {
  if (confirm('Tem certeza que deseja excluir esta refeição?')) {
    userData.refeicoes = userData.refeicoes.filter(r => r.id !== id);
    localStorage.setItem('refeicoes', JSON.stringify(userData.refeicoes));
    loadRefeicoes();
  }
}

// === PROGRESSO ===
function loadProgresso() {
  const pesoAtual = document.getElementById('peso-atual');
  const imcAtual = document.getElementById('imc-atual');
  const treinosRealizados = document.getElementById('treinos-realizados');
  
  if (userData.progresso.pesos.length > 0) {
    const ultimoPeso = userData.progresso.pesos[userData.progresso.pesos.length - 1];
    pesoAtual.textContent = `${ultimoPeso.peso} kg`;
    
    // Calcular IMC se tiver altura no perfil
    if (userData.perfil.altura) {
      const alturaM = userData.perfil.altura / 100;
      const imc = (ultimoPeso.peso / (alturaM * alturaM)).toFixed(1);
      imcAtual.textContent = imc;
    }
  }
  
  treinosRealizados.textContent = userData.progresso.treinosRealizados;
}

function registrarPeso() {
  const novoPeso = parseFloat(document.getElementById('novo-peso').value);
  
  if (!novoPeso || novoPeso <= 0) {
    alert('Por favor, insira um peso válido.');
    return;
  }
  
  const registroPeso = {
    peso: novoPeso,
    data: new Date().toLocaleDateString('pt-BR'),
    timestamp: Date.now()
  };
  
  userData.progresso.pesos.push(registroPeso);
  localStorage.setItem('progresso', JSON.stringify(userData.progresso));
  
  document.getElementById('novo-peso').value = '';
  loadProgresso();
  
  alert('Peso registrado com sucesso!');
}

// === PERFIL ===
function loadPerfil() {
  document.getElementById('perfil-nome').value = userData.perfil.nome || '';
  document.getElementById('perfil-email').value = userData.perfil.email || '';
  document.getElementById('perfil-idade').value = userData.perfil.idade || '';
  document.getElementById('perfil-altura').value = userData.perfil.altura || '';
  document.getElementById('perfil-peso').value = userData.perfil.peso || '';
  document.getElementById('perfil-objetivo').value = userData.perfil.objetivo || '';
}

function salvarPerfil() {
  const nome = document.getElementById('perfil-nome').value.trim();
  const email = document.getElementById('perfil-email').value.trim();
  const idade = document.getElementById('perfil-idade').value;
  const altura = document.getElementById('perfil-altura').value;
  const peso = document.getElementById('perfil-peso').value;
  const objetivo = document.getElementById('perfil-objetivo').value;
  
  userData.perfil = {
    nome: nome,
    email: email,
    idade: idade,
    altura: altura,
    peso: peso,
    objetivo: objetivo
  };
  
  localStorage.setItem('perfil', JSON.stringify(userData.perfil));
  
  // Atualizar progresso se necessário
  loadProgresso();
  
  alert('Perfil salvo com sucesso!');
}

function alterarSenha() {
  const senhaAtual = document.getElementById('senha-atual').value;
  const novaSenha = document.getElementById('nova-senha').value;
  const confirmarSenha = document.getElementById('confirmar-senha').value;
  
  if (!senhaAtual || !novaSenha || !confirmarSenha) {
    alert('Por favor, preencha todos os campos.');
    return;
  }
  
  if (novaSenha !== confirmarSenha) {
    alert('A nova senha e a confirmação não coincidem.');
    return;
  }
  
  if (novaSenha.length < 6) {
    alert('A nova senha deve ter pelo menos 6 caracteres.');
    return;
  }
  
  // Aqui você implementaria a verificação da senha atual
  // Por simplicidade, vamos apenas simular
  alert('Senha alterada com sucesso!');
  
  // Limpar campos
  document.getElementById('senha-atual').value = '';
  document.getElementById('nova-senha').value = '';
  document.getElementById('confirmar-senha').value = '';
}

