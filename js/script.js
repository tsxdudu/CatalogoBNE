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
// Dados em JSON para armazenar usuários, clientes e produtos
let users = [];
let clients = [];
let products = [];
let currentProductIndex = null;
let currentUserIndex = null;
let currentClientIndex = null;

// Função para renderizar as tabelas
function renderTables() {
    // Renderiza a tabela de usuários
    const userTableBody = document.getElementById('userTableBody');
    userTableBody.innerHTML = '';
    users.forEach((user, index) => {
        userTableBody.innerHTML += `
            <tr>
                <td>${user.id}</td> <!-- Exibe o ID do usuário -->
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.phone}</td>
                <td>${user.registration_date}</td>
                <td>${user.address}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editUser(${index})">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteUser(${index})">Deletar</button>
                </td>
            </tr>
        `;
    });

    // Renderiza a tabela de clientes
    const clientTableBody = document.getElementById('clientTableBody');
    clientTableBody.innerHTML = '';
    clients.forEach((client, index) => {
        clientTableBody.innerHTML += `
            <tr>
                <td>${client.id}</td>
                <td>${client.name}</td>
                <td>${client.email}</td>
                <td>${client.phone}</td>
                <td>${client.cpf_cnpj}</td>
                <td>${client.registration}</td>
                <td>${client.avaliation_id}</td>
                <td>${client.address}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editClient(${index})">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteClient(${index})">Deletar</button>
                </td>
            </tr>
        `;
    });

    // Renderiza a tabela de produtos
    const productTableBody = document.getElementById('productTableBody');
    productTableBody.innerHTML = '';
    products.forEach((product, index) => {
        productTableBody.innerHTML += `
            <tr>
                <td>${product.id}</td>
                <td>${product.title}</td>
                <td>${product.description}</td>
                <td><img src="${product.url_image}" alt="${product.title}" style="width: 50px; height: 50px;"></td>
                <td>${product.price}</td>
                <td>${product.discount}%</td>
                <td>${product.sales_count}</td>
                <td>${product.registration_date}</td>
                <td>${product.stock}</td>
                <td>${product.avaliation}</td>
                <td>${product.saller_id}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editProduct(${index})">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteProduct(${index})">Deletar</button>
                </td>
            </tr>
        `;
    });
}

// Funções CRUD para Usuários
document.getElementById('userForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const name = document.getElementById('userName').value;
    const email = document.getElementById('userEmail').value;
    const phone = document.getElementById('userPhone').value;
    const registration_date = document.getElementById('userRegistrationDate').value;
    const address = document.getElementById('userAddress').value;

    const userData = {
        id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
        name,
        email,
        phone,
        registration_date,
        address,
    };

    if (currentUserIndex === null) {
        users.push(userData);
    } else {
        userData.id = users[currentUserIndex].id; 
        users[currentUserIndex] = userData;
        currentUserIndex = null;
        document.querySelector('#userForm button').innerText = 'Adicionar Usuário';
    }

    renderTables();
    this.reset();
});

function editUser(index) {
    const user = users[index];
    document.getElementById('userName').value = user.name;
    document.getElementById('userEmail').value = user.email;
    document.getElementById('userPhone').value = user.phone;
    document.getElementById('userRegistrationDate').value = user.registration_date;
    document.getElementById('userAddress').value = user.address;
    currentUserIndex = index;
    document.querySelector('#userForm button').innerText = 'Atualizar Usuário';
}

function deleteUser(index) {
    users.splice(index, 1);
    renderTables();
}

// Funções CRUD para Clientes
document.getElementById('clientForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const name = document.getElementById('clientName').value;
    const email = document.getElementById('clientEmail').value;
    const phone = document.getElementById('clientPhone').value;
    const cpf_cnpj = document.getElementById('clientCpfCnpj').value;
    const registration = document.getElementById('clientRegistration').value;
    const avaliation_id = document.getElementById('clientAvaliationId').value;
    const address = document.getElementById('clientAddress').value;

    const clientData = {
        id: clients.length > 0 ? clients[clients.length - 1].id + 1 : 1,
        name,
        email,
        phone,
        cpf_cnpj,
        registration,
        avaliation_id,
        address,
    };

    if (currentClientIndex === null) {
        clients.push(clientData);
    } else {
        clientData.id = clients[currentClientIndex].id;
        clients[currentClientIndex] = clientData;
        currentClientIndex = null;
        document.querySelector('#clientForm button').innerText = 'Adicionar Cliente';
    }

    renderTables();
    this.reset();
});

function editClient(index) {
    const client = clients[index];
    document.getElementById('clientName').value = client.name;
    document.getElementById('clientEmail').value = client.email;
    document.getElementById('clientPhone').value = client.phone;
    document.getElementById('clientCpfCnpj').value = client.cpf_cnpj;
    document.getElementById('clientRegistration').value = client.registration;
    document.getElementById('clientAvaliationId').value = client.avaliation_id;
    document.getElementById('clientAddress').value = client.address;
    currentClientIndex = index;
    document.querySelector('#clientForm button').innerText = 'Atualizar Cliente';
}

function deleteClient(index) {
    clients.splice(index, 1);
    renderTables();
}

// Funções CRUD para Produtos
document.getElementById('productForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const title = document.getElementById('productTitle').value;
    const description = document.getElementById('productDescription').value;
    const url_image = document.getElementById('productImage').value;
    const price = document.getElementById('productPrice').value;
    const discount = document.getElementById('productDiscount').value;
    const sales_count = document.getElementById('productSalesCount').value;
    const registration_date = document.getElementById('productRegistrationDate').value;
    const stock = document.getElementById('productStock').value;
    const avaliation = document.getElementById('productAvaliation').value;
    const saller_id = document.getElementById('productSallerId').value;

    const productData = {
        id: products.length > 0 ? products[products.length - 1].id + 1 : 1, // Gera o ID automaticamente
        title,
        description,
        url_image,
        price,
        discount,
        sales_count,
        registration_date,
        stock,
        avaliation,
        saller_id,
    };

    if (currentProductIndex === null) {
        products.push(productData);
    } else {
        productData.id = products[currentProductIndex].id;
        products[currentProductIndex] = productData;
        currentProductIndex = null;
        document.querySelector('#productForm button').innerText = 'Adicionar Produto';
    }

    renderTables();
    this.reset();
});

function editProduct(index) {
    const product = products[index];
    document.getElementById('productTitle').value = product.title;
    document.getElementById('productDescription').value = product.description;
    document.getElementById('productImage').value = product.url_image;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productDiscount').value = product.discount;
    document.getElementById('productSalesCount').value = product.sales_count;
    document.getElementById('productRegistrationDate').value = product.registration_date;
    document.getElementById('productStock').value = product.stock;
    document.getElementById('productAvaliation').value = product.avaliation;
    document.getElementById('productSallerId').value = product.saller_id;
    currentProductIndex = index;
    document.querySelector('#productForm button').innerText = 'Atualizar Produto';
}

function deleteProduct(index) {
    products.splice(index, 1);
    renderTables();
}

// Inicializa a tabela ao carregar a página
renderTables();



// Inicializa o catálogo renderizando os itens
renderItems();

