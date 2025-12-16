let notas = [];

// Agregar evento al botón de agregar nota
document.getElementById('agregarNotaBtn').addEventListener('click', function() {
    let input = document.getElementById('notaInput').value;
    let nota = parseFloat(input.trim());

    if (!isNaN(nota) && nota >= 0 && nota <= 10) {
        notas.push(nota); // Agregar la nota al arreglo
        document.getElementById('notaInput').value = ''; // Limpiar el campo de entrada
        mostrarNotas(); // Actualizar la lista de notas
    } else {
        alert("Por favor, ingrese una nota válida entre 0 y 10.");
    }
});

function mostrarNotas() {
    const notasList = document.getElementById('notasList');
    notasList.innerHTML = ''; // Limpiar la lista antes de mostrar las notas

    // Mostrar cada nota en un label con un botón para eliminar
    notas.forEach((nota, index) => {
        const notaLabel = document.createElement('div');
        notaLabel.className = 'nota-label';
        notaLabel.innerHTML = `
            <span>Nota: ${nota}</span>
            <button class="btn btn-danger btn-sm" onclick="eliminarNota(${index})">Eliminar</button>
        `;
        notasList.appendChild(notaLabel);
    });

    calcularResultados(); // Calcular y mostrar resultados
}

function eliminarNota(index) {
    notas.splice(index, 1); // Eliminar la nota del arreglo
    mostrarNotas(); // Actualizar la lista de notas
}

function calcularResultados() {
    let contAprobados = 0;
    let contSupletorio = 0;
    let contReprobados = 0;
    let sumaNotas = 0;

    // Recorrer el arreglo de notas
    notas.forEach(nota => {
        sumaNotas += nota; // Sumar todas las notas

        // Clasificar las notas
        if (nota >= 7) {
            contAprobados++;
        } else if (nota >= 5) {
            contSupletorio++;
        } else {
            contReprobados++;
        }
    });

    // Calcular el promedio general
    let promedio;
    if (notas.length > 0) {
        promedio = sumaNotas / notas.length;
    } else {
        promedio = 0;
    }

    // Determinar el estado del curso
    let estadoCurso;
    if (promedio >= 7) {
        estadoCurso = 'Aprobado';
    } else {
        estadoCurso = 'En riesgo';
    }

    // Mostrar los resultados en el HTML
    document.getElementById('aprobados').textContent = contAprobados;
    document.getElementById('supletorio').textContent = contSupletorio;
    document.getElementById('reprobados').textContent = contReprobados;
    document.getElementById('promedio').textContent = promedio.toFixed(2);
    document.getElementById('estado').textContent = estadoCurso;
}
