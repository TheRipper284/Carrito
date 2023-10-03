const listaCursos =  document.querySelector('#lista-cursos');
const tabla = document.querySelector('#lista-carrito tbody');

let carrito = [];

function getCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const item ={}
        item.id = e.target.getAttribute('data-id');
        const padre = e.target.parentElement;
        item.name = padre.querySelector('h4').innerText;
        item.price = padre.querySelector('p span').innerText;
        item.image = padre
                            .parentElement
                            .querySelector('img').src;
        item.catity = 1;
        addItem(item);
        //LLenar la tabla
        showTable();
    }
}

function addItem(item){
        // Verificar si el objeto existe en el carrito
        if(carrito.some(itemCarrito => item.id === itemCarrito.id)){
            carrito.forEach(itemCarrito =>{
                if(itemCarrito.id == item.id){
                    itemCarrito.cantity ++;
                }
            })
        } else{
            carrito.push(item)
    }
}

function showTable(){
    //Limpiar tabla
    tabla.innerHTML = ""
    //Iterar el carrita a la tabla
    carrito.forEach(item => {
        tabla.appendChild(createRow(item));
    });
}

function createRow(item){
    const row = document.createElement('tr');
    let rowHtml = ``;
    rowHtml += `<td><img src="${ item.image }"></td>`;
    rowHtml += `<td>${ item.name }</td>`;
    rowHtml += `<td>${ item.price }</td>`;
    rowHtml += `<td>${ item.cantity }</td>`;
    const button = document.createElement('button');
    button.setAttribute('data-id', item.id);
    button.classList.add('btn');
    button.innerHTML = 'X';
    const td = document.createElement('td');
    td.appendChild(button);
    row.innerHTML = rowHtml;
    row.appendChild(td);
    return row;
}

function btnDelItem(e){
    if(e.target.classList.contains('btn')){
        const id = e.target.getAttribute('data-id');
        console.log('Le diste al boton' + id);
        //Eliminar de carrito
        carrito = carrito.filter(itemCarrito => itemCarrito.id !== id);
        showTable();
    }
}

listaCursos.addEventListener('click', getCurso);
tabla.addEventListener('click', btnDelItem);