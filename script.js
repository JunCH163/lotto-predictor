function generateLottoNumbers() {
    let numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }
    return [...numbers].sort((a, b) => a - b);
}

function predictLotto() {
    let results = [];
    for (let i = 0; i < 5; i++) {
        results.push(generateLottoNumbers());
    }

    document.getElementById("result").innerHTML = results.map(
        (set, index) => `<p><strong>세트 ${index + 1}:</strong> ${set}</p>`
    ).join('');
}
