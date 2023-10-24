
(function (){
    const socket = io();

    const listContainer = document.getElementById('list-container');

    const form = document.getElementById('form');
    const title = document.getElementById('form-title');
    const description = document.getElementById('form-description');
    const code = document.getElementById('form-code');
    const price = document.getElementById('form-price');
    const stock = document.getElementById('form-stock');
    const category = document.getElementById('form-category');
    // const submit = document.getElementById('form-submit');

    const idDeleteForm = document.getElementById('form-delete');
    const idDelete = document.getElementById('form-id-delete');

    const list = document.getElementById('list-container');

    form.addEventListener('submit', async (event)=>{
        event.preventDefault();
        const body = {
            title: title.value,
            description: description.value,
            code: code.value,
            price: price.value,
            status: true,
            stock: stock.value,
            category: category.value,
            thumbnail: []
        }
        socket.emit('new-product', body);
    })

    idDeleteForm.addEventListener('submit', async (event)=>{
        event.preventDefault();
        const id = idDelete.value;
        socket.emit('delete-product', id);
    })

    socket.on('update-products', (data)=>{
        console.log(data);
        listContainer.innerText = '';
        const productsHTML = data.map((p)=>{
            return `
                <ul>
                    <li>id: ${p.id}</li>
                    <li>Nombre producto: ${p.title}</li>
                    <li>Descripcion: ${p.description}</li>
                    <li>Codigo: ${p.code}</li>
                    <li>Precio: $ ${p.price}</li>
                    <li>Stock: ${p.stock}</li>
                    <li>Categoria: ${p.category}</li>
                </ul>
            `
        }).join('');
        listContainer.innerHTML = productsHTML;
    })
})();