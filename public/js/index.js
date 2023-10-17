
(function (){
    const socket = io();

    const form = document.getElementById('form');
    const title = document.getElementById('form-title');
    const description = document.getElementById('form-description');
    const code = document.getElementById('form-code');
    const price = document.getElementById('form-price');
    const stock = document.getElementById('form-stock');
    const category = document.getElementById('form-category');
    // const submit = document.getElementById('form-submit');

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

})();