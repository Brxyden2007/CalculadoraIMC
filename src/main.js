document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const btnNuevo = document.getElementById('btnNuevo');
    const btnGuardar = document.getElementById('btnGuardar');
    const btnBorrar = document.getElementById('btnBorrar');
    const btnMostrar = document.getElementById('btnMostrar');
    const btnCalcular = document.getElementById('btnCalcular');
    const inputNombre = document.getElementById('nombre');
    const inputEdad = document.getElementById('edad');
    const inputPeso = document.getElementById('peso');
    const inputAltura = document.getElementById('altura');
    const divResultado = document.getElementById('resultado');
    const listadoUsuarios = document.getElementById('listadoUsuarios');

    // Array para almacenar los usuarios
    let usuarios = [];

    // Función para habilitar/deshabilitar inputs
    function toggleInputs(enabled) {
        inputNombre.disabled = !enabled;
        inputEdad.disabled = !enabled;
        inputPeso.disabled = !enabled;
        inputAltura.disabled = !enabled;
        btnCalcular.disabled = !enabled;
    }

    // Función para limpiar inputs
    function limpiarInputs() {
        inputNombre.value = '';
        inputEdad.value = '';
        inputPeso.value = '';
        inputAltura.value = '';
        divResultado.innerHTML = '';
        divResultado.className = '';
        listadoUsuarios.innerHTML = '';
    }

    function calcularIMC(peso, alturaCm) {
        // Convertir altura de cm a metros para el cálculo
        const alturaMetros = alturaCm / 100;
        // Calcular IMC y redondear a 2 decimales
        const imc = peso / (alturaMetros * alturaMetros);
        return Math.round(imc * 100) / 100;
    }

    // Función para obtener la clasificación del IMC con imágenes
    function getClasificacionIMC(imc) {
        if (imc < 18.5) return ['Bajo peso', 'resultado-bajo', 'src/img/underWeight.png'];
        if (imc < 25) return ['Peso normal', 'resultado-normal', 'src/img/normalWeight.png'];
        if (imc < 30) return ['Sobrepeso', 'resultado-sobrepeso', 'src/img/overWeight.png'];
        return ['Obesidad', 'resultado-obesidad', 'src/img/obese.png'];
    }

    // Event Listeners Agregados
    btnNuevo.addEventListener('click', () => {
        toggleInputs(true);
        limpiarInputs();
        btnGuardar.disabled = true;
    });

    btnCalcular.addEventListener('click', () => {
        const nombre = inputNombre.value.trim().replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
        const edad = parseInt(inputEdad.value);
        const peso = parseFloat(inputPeso.value);
        const altura = parseFloat(inputAltura.value); // Altura en cm

        if (!nombre || isNaN(edad) || isNaN(peso) || isNaN(altura)) { // Si estan vacios se dara el mensaje de alerta
            alert('Por favor, complete todos los campos correctamente');
            return;
        }

        if (altura <= 0 || peso <= 0) {
            alert('El peso y la altura deben ser valores positivos');
            return;
        }

        const imc = calcularIMC(peso, altura);
        const [clasificacion, clase, imagen] = getClasificacionIMC(imc);
        divResultado.innerHTML = `
            <p><strong>Total IMC: ${imc}</strong></p>
            <p>Su clasificación es de: ${clasificacion}</p>
            <img src="${imagen}" alt="${clasificacion}" style="width: 250px; margin-top: 20px;">
        `;
        divResultado.className = clase;
        btnGuardar.disabled = false;
    });

    btnGuardar.addEventListener('click', () => {
        const peso = parseFloat(inputPeso.value);
        const altura = parseFloat(inputAltura.value);
        const imc = calcularIMC(peso, altura);
        const [clasificacion, _, imagen] = getClasificacionIMC(imc);

        const usuario = {
            nombre: inputNombre.value.trim().replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, ''),
            edad: parseInt(inputEdad.value),
            peso: peso,
            altura: altura,
            imc: imc,
            clasificacion: clasificacion,
            imagen: imagen,
            fecha: new Date().toLocaleDateString()
        };
        
        usuarios.push(usuario);
    toggleInputs(false);
    btnGuardar.disabled = true;
        alert('El usuario ingresado ha sido guardado correctamente');
});

    btnBorrar.addEventListener('click', () => {
        limpiarInputs();
        toggleInputs(false);
        btnGuardar.disabled = true;
    });

    btnMostrar.addEventListener('click', () => {
        if (usuarios.length === 0) {
            listadoUsuarios.innerHTML = '<p><strong>No hay usuarios registrados</strong></p>';
            return;
        }

        let html = '<h2>Usuarios Registrados:</h2>';
        usuarios.forEach(usuario => {
            html += `
                <div class="usuario-item">
                    <p><strong>Nombre:</strong> ${usuario.nombre}</p>
                    <p><strong>Edad:</strong> ${usuario.edad} años</p>
                    <p><strong>Peso:</strong> ${usuario.peso} kg</p>
                    <p><strong>Altura:</strong> ${usuario.altura} cm</p>
                    <p><strong>IMC:</strong> ${usuario.imc} (${usuario.clasificacion})</p>
                    <p><strong>Fecha:</strong> ${usuario.fecha}</p>
                    <img src="${usuario.imagen}" alt="${usuario.clasificacion}" style="width: 100px;">
                </div>
            `;
        });

        listadoUsuarios.innerHTML = html;
    });

    // Empieza a inicializar el estado
    toggleInputs(false);
    btnGuardar.disabled = true;
});