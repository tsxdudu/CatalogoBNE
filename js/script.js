let itens = [
    { id: 1, nome: 'Growth', descricao: 'Creatina Monohidratada, suplemento alimentar em pó, 250g.', imagem: 'images/growth.png' },
    { id: 2, nome: 'Black Skull', descricao: 'Creatina Monohidratada, suplemento alimentar em pó, sem sabor, 300g.', imagem: 'images/black-skull.png' },
    { id: 3, nome: 'Dark Lab', descricao: 'Creatina + Beta Alanina.', imagem: 'images/dark-lab.png' },
    { id: 4, nome: 'Integralmedica', descricao: 'Creatina Integralmedica, 300g.', imagem: 'images/integral.png' },
    { id: 5, nome: 'Probiotica', descricao: 'Creatina Monohidrata, suplemento alimentar, 300g.', imagem: 'images/probiotica.png' },
];

// Função para renderizar um card na página
function renderItem(item) {
    const cardWrapper = document.querySelector('.card-wrapper');

    const card = document.createElement('div');
    card.classList.add('card-item');
    card.setAttribute('id', `card${item.id}`);

    card.innerHTML = `
        <div class="editor">
          <a href="#" onclick="openEditModal(${item.id})">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
</svg>
          </a>
        </div>
        <img src="${item.imagem}" alt="${item.nome}" />
        <div class="card-content">
          <h3>${item.nome}</h3>
          <p>${item.descricao}</p>  
        </div>
        <button type="button">Eu quero isso!</button>
    `;

    cardWrapper.appendChild(card);
}

// Função para renderizar todos os itens
function renderItems() {
    itens.forEach(renderItem);
}

function openAddPostModal() {
    document.getElementById('addPostModal').style.display = 'flex';
}


// Função para adicionar um novo item ao catálogo
function saveNewPost() {
    const title = document.getElementById('postTitle').value.trim();
    const description = document.getElementById('postDescription').value.trim();
    const image = document.getElementById('postImage').value.trim();

    if (title && description && image) {
        const newItem = {
            id: itens.length + 1,
            nome: title,
            descricao: description,
            imagem: image
        };

        itens.push(newItem);
        renderItem(newItem); // Renderiza o novo item

        closeAddPostModal();
        document.getElementById('addPostForm').reset(); // Limpa o formulário
    } else {
        showModalMessage('Por favor, preencha todos os campos.');
    }
}

// Função para abrir o modal de edição
function openEditModal(itemId) {
    const item = itens.find(i => i.id === itemId);
    if (!item) return;

    document.getElementById('editItemId').value = item.id;
    document.getElementById('editTitle').value = item.nome;
    document.getElementById('editDescription').value = item.descricao;
    document.getElementById('editImage').value = item.imagem;

    document.getElementById('editPostModal').style.display = 'flex';
}

// Função para salvar as alterações feitas no item
function saveEditPost() {
    const itemId = parseInt(document.getElementById('editItemId').value);
    const newTitle = document.getElementById('editTitle').value.trim();
    const newDescription = document.getElementById('editDescription').value.trim();
    const newImage = document.getElementById('editImage').value.trim();

    const itemIndex = itens.findIndex(i => i.id === itemId);
    if (itemIndex === -1) return;

    if (newTitle && newDescription && newImage) {
        itens[itemIndex].nome = newTitle;
        itens[itemIndex].descricao = newDescription;
        itens[itemIndex].imagem = newImage;

        atualizarCard(`card${itemId}`, itens[itemIndex]);
        closeEditPostModal();
    } else {
        showModalMessage('Por favor, preencha todos os campos.');
    }
}

// Função para deletar um item
function deleteItem() {
    const itemId = parseInt(document.getElementById('editItemId').value);
    const itemIndex = itens.findIndex(i => i.id === itemId);

    if (itemIndex !== -1) {
        itens.splice(itemIndex, 1);
        document.getElementById(`card${itemId}`).remove();
        closeEditPostModal();
    }
}

// Função para atualizar o card visualmente
function atualizarCard(cardID, item) {
    const card = document.getElementById(cardID);
    const content = card.querySelector('.card-content');

    content.querySelector('h3').textContent = item.nome;
    content.querySelector('p').textContent = item.descricao;

    const mainImage = card.querySelector('img:not(.editor img)');
    mainImage.src = item.imagem;
    mainImage.alt = item.nome;
}

// Função para filtrar o catálogo com base na busca do usuário
function filterCatalog() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const cardItems = document.querySelectorAll('.card-item');

    cardItems.forEach(item => {
        const title = item.querySelector('h3').textContent.toLowerCase();
        item.style.display = title.includes(searchInput) ? 'block' : 'none';
    });
}

// Função para abrir o modal de adicionar post
function adicionarPost() {
    document.getElementById('addPostModal').style.display = 'flex';
}

// Função para fechar o modal de adicionar post
function closeAddPostModal() {
    document.getElementById('addPostModal').style.display = 'none';
}

// Função para fechar o modal de edição
function closeEditPostModal() {
    document.getElementById('editPostModal').style.display = 'none';
}

// Função para mostrar mensagem em modal
function showModalMessage(message) {
    const modalMessage = document.getElementById('modalMessage');
    modalMessage.textContent = message;
    modalMessage.style.display = 'block';

    setTimeout(() => {
        modalMessage.style.display = 'none';
    }, 3000);
}

document.addEventListener('DOMContentLoaded', function () {
    // Função de busca no catálogo
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');
    const cardItems = document.querySelectorAll('.card-item');

    searchButton.addEventListener('click', function () {
        const searchTerm = searchInput.value.toLowerCase();
        cardItems.forEach((item) => {
            const itemName = item.querySelector('h3').textContent.toLowerCase();
            if (itemName.includes(searchTerm)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    });

    // Função ao clicar no botão "Eu quero isso!"
    const wantButtons = document.querySelectorAll('.card-item button');
    wantButtons.forEach((button) => {
        button.addEventListener('click', function () {
            alert('Você escolheu: ' + this.parentElement.querySelector('h3').textContent);
        });
    });
});

//dudu69

let currentEditType = '';
let isEditing = false;
let users = [];
let clients = [];
function loadUsers() {

    currentEditType = 'user';
    document.getElementById('content').innerHTML = `
        <h2>Usuários</h2>
        <div class="mb-3">
            <button class="btn btn-primary" onclick="addUser()">Adicionar Usuário</button>
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody id="userTable"></tbody>
        </table>
    `;
    loadUserData();
}

function loadClients() {
    currentEditType = 'client';
    document.getElementById('content').innerHTML = `
        <h2>Clientes</h2>
        <div class="mb-3">
            <button class="btn btn-primary" onclick="addClient()">Adicionar Cliente</button>
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Empresa</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody id="clientTable"></tbody>
        </table>
    `;
    loadClientData();
}

function loadUserData() {
    let userTable = document.getElementById('userTable');
    userTable.innerHTML = '';
    users.forEach(user => {
        userTable.innerHTML += `
            <tr>
                <td>${user.id}</td>
                <td>${user.nome}</td>
                <td>${user.email}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editItem(${user.id})">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteUser(${user.id})">Deletar</button>
                </td>
            </tr>
        `;
    });
}

function loadClientData() {
    let clientTable = document.getElementById('clientTable');
    clientTable.innerHTML = '';
    clients.forEach(client => {
        clientTable.innerHTML += `
            <tr>
                <td>${client.id}</td>
                <td>${client.nome}</td>
                <td>${client.empresa}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editItem(${client.id})">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteClient(${client.id})">Deletar</button>
                </td>
            </tr>
        `;
    });
}


function addUser() {
    isEditing = false;
    document.getElementById('editId').value = '';
    document.getElementById('editName').value = '';
    document.getElementById('editEmail').value = '';
    document.getElementById('emailField').style.display = 'block';
    document.getElementById('companyField').style.display = 'none';
    let modal = new bootstrap.Modal(document.getElementById('editModal'));
    modal.show();
}


function addClient() {
    isEditing = false;
    document.getElementById('editId').value = '';
    document.getElementById('editName').value = '';
    document.getElementById('editCompany').value = '';
    document.getElementById('emailField').style.display = 'none';
    document.getElementById('companyField').style.display = 'block';
    let modal = new bootstrap.Modal(document.getElementById('editModal'));
    modal.show();
}

function editItem(id) {
    isEditing = true;
    let item;
    if (currentEditType === 'user') {
        item = users.find(u => u.id === id);
        document.getElementById('emailField').style.display = 'block';
        document.getElementById('companyField').style.display = 'none';
        document.getElementById('editName').value = item.nome;
        document.getElementById('editEmail').value = item.email;
    } else {
        item = clients.find(c => c.id === id);
        document.getElementById('emailField').style.display = 'none';
        document.getElementById('companyField').style.display = 'block';
        document.getElementById('editName').value = item.nome;
        document.getElementById('editCompany').value = item.empresa;
    }
    document.getElementById('editId').value = id;
    let modal = new bootstrap.Modal(document.getElementById('editModal'));
    modal.show();
}

document.getElementById('editForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const id = document.getElementById('editId').value;
    const nome = document.getElementById('editName').value;

    if (currentEditType === 'user') {
        if (isEditing) {
            const email = document.getElementById('editEmail').value;
            const user = users.find(u => u.id == id);
            user.nome = nome;
            user.email = email;
        } else {
            const email = document.getElementById('editEmail').value;
            users.push({ id: users.length + 1, nome: nome, email: email });
        }
        loadUserData();
    } else {
        if (isEditing) {
            const empresa = document.getElementById('editCompany').value;
            const client = clients.find(c => c.id == id);
            client.nome = nome;
            client.empresa = empresa;
        } else {
            const empresa = document.getElementById('editCompany').value;
            clients.push({ id: clients.length + 1, nome: nome, empresa: empresa });
        }
        loadClientData();
    }

    let modal = bootstrap.Modal.getInstance(document.getElementById('editModal'));
    modal.hide();
});

function deleteUser(id) {
    const index = users.findIndex(u => u.id === id);
    if (index !== -1) {
        users.splice(index, 1);
        loadUserData();
    }
}

function deleteClient(id) {
    const index = clients.findIndex(c => c.id === id);
    if (index !== -1) {
        clients.splice(index, 1);
        loadClientData();
    }
}


// Inicializa o catálogo renderizando os itens
renderItems();

