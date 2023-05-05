
// Calcular un cantidad de números aleatorios en el rango del 1 al 1000 especificada por parámetros de consulta (query).
// Si dicho parámetro no se ingresa, calcular 100.000.000 números.
// El dato devuelto al frontend será un objeto que contendrá como claves los números random generados junto a la cantidad de veces que salió cada uno.

process.on('message', (message) => {
    const arrayNumeros = generateRandomNumbers(message);
    const filtrado = filtrarRepeticiones(arrayNumeros);
    process.send(filtrado);
});

function generateRandomNumbers(n) { //n numeros a generar.
    const numbers = [];
    for (let i = 0; i < n; i++) {
      const randomNumber = Math.floor(Math.random() * 1001); // entre el 1 y el 1000.
        numbers.push(randomNumber);
    }
    return numbers;
}

function filtrarRepeticiones(array){
    const counts = {};

    for (let i = 0; i < array.length; i++) {
        if (counts[array[i]]) {
            counts[array[i]] += 1;
        } else {
            counts[array[i]] = 1;
        }
    }
    return counts;
}