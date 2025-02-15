// 🎯 GitHub에서 로또 예측 JSON 불러오기
const GITHUB_USERNAME = "JunCH163";
const REPO_NAME = "lotto-predictor";
const FILE_PATH = "lotto_predictions.json";
const API_URL = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${REPO_NAME}/main/${FILE_PATH}`;

async function fetchLottoNumbers() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("데이터를 불러오지 못했습니다.");
        
        const data = await response.json();
        displayLottoNumbers(data);
    } catch (error) {
        document.getElementById("lotto-results").innerHTML = "❌ 데이터를 불러올 수 없습니다.";
        console.error("에러 발생:", error);
    }
}

function displayLottoNumbers(data) {
    const resultsDiv = document.getElementById("lotto-results");
    resultsDiv.innerHTML = "";  // 기존 내용 제거

    Object.keys(data).forEach(set => {
        const numbers = data[set].join(" ");
        const lottoSetDiv = document.createElement("div");
        lottoSetDiv.classList.add("lotto-set");
        lottoSetDiv.innerHTML = `<strong>${set.toUpperCase()}:</strong> <span>${numbers}</span>`;
        resultsDiv.appendChild(lottoSetDiv);
    });
}

// 🎯 페이지 로딩 시 실행
fetchLottoNumbers();
