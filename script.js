const GITHUB_USERNAME = "JunCH163";
const REPO_NAME = "lotto-predictor";
const FILE_PATH = "lotto_predictions.json";
const API_URL = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${REPO_NAME}/main/${FILE_PATH}`;

// 🎯 회차 예측 번호 가져오기
async function fetchLottoNumbers() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("데이터를 불러오지 못했습니다.");

        const data = await response.json();
        displayLottoNumbers(data);
    } catch (error) {
        document.getElementById("lotto-predictions").innerHTML = "❌ 데이터를 불러올 수 없습니다.";
        console.error("에러 발생:", error);
    }
}

function displayLottoNumbers(data) {
    const resultsDiv = document.getElementById("lotto-predictions");
    resultsDiv.innerHTML = "";  

    const descriptions = [
        "🔮 머신러닝 모델이 직접 예측한 번호입니다.",
        "📊 가장 많이 나온 번호를 기반으로 변형한 조합입니다.",
        "🎲 완전 랜덤으로 생성된 번호입니다.",
        "⚖ 골고루 분포되도록 조정한 번호입니다.",
        "📌 특정 번호 대역(예: 1~9, 10~19 등)에 집중한 조합입니다."
    ];

    Object.keys(data).forEach((set, index) => {
        const numbers = data[set].join(" ");
        const lottoSetDiv = document.createElement("div");
        lottoSetDiv.classList.add("lotto-set");
        lottoSetDiv.innerHTML = `<strong>${set.toUpperCase()}:</strong> <span>${numbers}</span><p>${descriptions[index]}</p>`;
        resultsDiv.appendChild(lottoSetDiv);
    });
}

// 🎲 즉시 랜덤 번호 생성
document.getElementById("generate-random").addEventListener("click", function () {
    const excludedNumbers = Array.from(document.querySelectorAll(".exclude-number:checked"))
        .map(checkbox => parseInt(checkbox.value));

    const randomResultsDiv = document.getElementById("random-results");
    randomResultsDiv.innerHTML = "";  

    for (let i = 1; i <= 5; i++) {
        let randomNumbers = [];
        while (randomNumbers.length < 6) {
            let num = Math.floor(Math.random() * 45) + 1;
            if (!randomNumbers.includes(num) && !excludedNumbers.includes(num)) {
                randomNumbers.push(num);
            }
        }
        randomNumbers.sort((a, b) => a - b);

        const setDiv = document.createElement("div");
        setDiv.classList.add("lotto-set");
        setDiv.innerHTML = `<strong>랜덤 세트 ${i}:</strong> <span>${randomNumbers.join(" ")}</span>`;
        randomResultsDiv.appendChild(setDiv);
    }
});

// 🎯 페이지 로딩 시 예측 데이터 가져오기
fetchLottoNumbers();
