document.querySelector('#generar-nombre').addEventListener('submit', (e) => {
    e.preventDefault();

    //leer variables

    let origen = document.getElementById('origen');
    let origenSelec = origen.options[origen.selectedIndex].value;

    let genero = document.getElementById('genero');
    let generoSelec = genero.options[genero.selectedIndex].value;

    let cantidad = document.getElementById('numero').value;

    console.log(origenSelec, generoSelec);



    let url = '';
    url += 'http://uinames.com/api/?';


    // si hay origen agrragarlo a la url
    if (origenSelec == '' && generoSelec == '') {
        mostrarMensaje();
        return;
    }
    if (origenSelec !== '') {
        url += `region=${origenSelec}&`;
    }
    // si hay genero agragarlo a la url
    if (generoSelec !== '') {
        url += `gender=${generoSelec}&`;
    }
    // si hay una cantidad agregarla a la url
    if (cantidad !== '') {
        url += `amount=${cantidad}&`;
    }

    // conectar ajax

    let xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);

    mostrarImg();


    xhr.onload = function() {
        if (this.status === 200) {

            setTimeout(() => {
                document.querySelector('.row').children[0].children[0].remove();
            }, 2000);

            setTimeout(() => {
                let nombres = JSON.parse(this.responseText);

                let htmlNombres = `<h2>Nombres Generados</h2>`;


                htmlNombres += `<ul class="lista">`;


                nombres.forEach(function(nombre, index) {
                    htmlNombres += `
                    <li>${nombre.name}</li>
                `;
                });

                htmlNombres += `</ul>`;
                document.getElementById('resultado').innerHTML = htmlNombres;
            }, 2100);


        }
    }

    xhr.send();
});

function mostrarImg() {
    let div = document.createElement('div');


    let img = document.createElement('img');


    img.src = '../spinner.gif';
    img.width = '100';
    img.height = '100';
    div.style.textAlign = 'center';

    div.appendChild(img);

    let row = document.querySelector('.row');

    row.children[0].insertBefore(div, row.children[0].children[0]);
}

function mostrarMensaje() {
    let div = document.createElement('div');
    div.innerHTML = 'Concrete la ';
    div.classList.add('alert', 'alert-danger', 'text-center');
    let row = document.querySelector('.row');

    row.children[0].insertBefore(div, row.children[0].children[0]);
    setTimeout(() => {
        document.location.reload();
    }, 2000)
}