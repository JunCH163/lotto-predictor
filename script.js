const GITHUB_USERNAME = "JunCH163";
const REPO_NAME = "lotto-predictor";
const FILE_PATH = "lotto_predictions.json";
const API_URL = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${REPO_NAME}/main/${FILE_PATH}`;

document.addEventListener("DOMContentLoaded", function () {
    const numberGrid = document.querySelector(".number-grid");
    const excludedCount = document.getElementById("excluded-count");

    // 🎯 체크박스 동적 생성
    for (let i = 1; i <= 45; i++) {
        const label = document.createElement("label");
        label.classList.add("checkbox-label");
        label.innerHTML = `
            <input type="checkbox" class="exclude-number" value="${i}">
            ${i.toString().padStart(2, '0')}
        `;
        numberGrid.appendChild(label);
    }

    // 🎯 체크박스 선택 제한 (최대 39개)
    const checkboxes = document.querySelectorAll(".exclude-number");
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", function () {
            const checkedCount = document.querySelectorAll(".exclude-number:checked").length;
            
            if (checkedCount > 39) {
                this.checked = false; // 🚨 초과 시 체크 해제
                alert("최대 39개의 번호만 제외할 수 있습니다!");
            }

            // ✔ 실시간 체크 개수 업데이트
            excludedCount.textContent = checkedCount;
        });
    });

    // 🎯 회차 예측 번호 가져오기
    fetchLottoNumbers();
});

// 🎯 예측된 로또 번호 표시
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
