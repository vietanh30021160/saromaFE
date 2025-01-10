const API_KEY = 'YOUR_GOOGLE_API_KEY'; // Thay thế bằng khóa API của bạn

// Handle genre selection
document.querySelectorAll(".genre-button").forEach(button => {
    button.addEventListener("click", function () {
        const selectedGenre = this.getAttribute("data-genre");
        console.log("Selected Genre: " + selectedGenre); // Xử lý thể loại đã chọn
        document.getElementById("genrePopup").style.display = "none";
        // Gọi gợi ý nhạc từ Google AI
        getMusicSuggestions(selectedGenre);
    });
});

document.getElementById("getSuggestionsButton").addEventListener("click", function () {
    const mood = document.getElementById("moodInput").value;
    analyzeMood(mood);
});

// Gọi API Google AI để phân tích cảm xúc
function analyzeMood(mood) {
    const body = {
        document: {
            content: mood,
            type: "PLAIN_TEXT",
        },
        encodingType: "UTF8",
    };

    fetch(`https://language.googleapis.com/v1/documents:analyzeSentiment?key=${API_KEY}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })
    .then(response => response.json())
    .then(data => {
        const sentimentScore = data.documentSentiment.score;
        console.log("Sentiment Score:", sentimentScore);
        // Gọi gợi ý nhạc dựa trên cảm xúc
        getMusicSuggestionsBasedOnMood(sentimentScore);
    })
    .catch(error => console.error('Error analyzing mood:', error));
}

// Lấy gợi ý nhạc dựa trên cảm xúc
function getMusicSuggestionsBasedOnMood(sentimentScore) {
    let suggestedGenre;
    if (sentimentScore > 0.5) {
        suggestedGenre = 'happy'; // Gợi ý thể loại vui vẻ
    } else if (sentimentScore < -0.5) {
        suggestedGenre = 'sad'; // Gợi ý thể loại buồn
    } else {
        suggestedGenre = 'neutral'; // Gợi ý thể loại trung tính
    }
    // Hiển thị gợi ý nhạc
    document.getElementById('suggestions').innerText = `Gợi ý nhạc cho tâm trạng '${suggestedGenre}': ...`;
}

// Hàm lấy gợi ý nhạc từ API (có thể sử dụng như đã hướng dẫn trước đó)
function getMusicSuggestions(selectedGenre) {
    // Giả sử bạn có một API để lấy gợi ý
    fetch(`https://api.example.com/music/suggestions?genre=${selectedGenre}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Hiển thị các gợi ý trên giao diện người dùng
        })
        .catch(error => console.error('Error fetching music suggestions:', error));
}
