
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

