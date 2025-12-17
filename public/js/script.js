let notas = [];
var agregarNotaBtn = document.getElementById('agregarNotaBtn');
var aprobados = document.getElementById('aprobados');
var supletorio = document.getElementById('supletorio');
var reprobados = document.getElementById('reprobados');
var promedio = document.getElementById('promedio');
var estado = document.getElementById('estado');

agregarNotaBtn.addEventListener('click', function() {
    let notaInput = document.getElementById('notaInput').value;
    let nota = parseFloat(notaInput.trim()); //el trim hace que se quite los espacios que estan en blanco o vacios

    if (nota >= 0 && nota <= 10) {
        notas.push(nota);
        document.getElementById('notaInput').value = '';
        mostrarNotas();
    } else {
        alert("Por favor, ingrese una nota válida entre 0 y 10.");
    }
});

function mostrarNotas() {
    const notasList = document.getElementById('notasList');
    notasList.innerHTML = '';
    notas.forEach((nota, index) => {
        const notaLabel = document.createElement('div');
        notaLabel.className = 'nota-label';
        notaLabel.innerHTML = `
            <p class="text-white">Nota: ${nota}</p>
            <button class="btn btn-danger btn-sm text-white" onclick="eliminarNota(${index})">Eliminar</button>
        `;
        notasList.appendChild(notaLabel);
    });

    calcularResultados();
}

function eliminarNota(index) {
    notas.splice(index, 1); // se elimina la nota 
    mostrarNotas();
}

function calcularResultados() {
    let contAprobados = 0;
    let contSupletorio = 0;
    let contReprobados = 0;
    let sumaNotas = 0;

    notas.forEach(nota => {
        sumaNotas += nota;

        if (nota >= 7) {
            contAprobados++;
        } else if (nota >= 5) {
            contSupletorio++;
        } else {
            contReprobados++;
        }
    });

    let promedioFinal;
    if (notas.length > 0) {
        promedioFinal = sumaNotas / notas.length;
    } else {
        promedioFinal = 0;
    }

    let estadoCurso;
    if (promedioFinal >= 7) {
        estadoCurso = 'Aprobado';
    } else {
        estadoCurso = 'En riesgo';
    }

    aprobados.textContent = contAprobados;
    supletorio.textContent = contSupletorio;
    reprobados.textContent = contReprobados;
    promedio.textContent = promedioFinal.toFixed(2);
    estado.textContent = estadoCurso;
}
