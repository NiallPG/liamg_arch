const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let interval = null;

document.querySelector("#title_card").onmouseover = event => {
    const titleCard = event.target;
    const originalImage = titleCard.querySelector('img');
    const originalText = titleCard.dataset.value;
    let iteration = 0;

    clearInterval(interval);

    interval = setInterval(() => {
        titleCard.innerHTML = '';
        titleCard.appendChild(originalImage);
        const randomizedText = originalText
            .split("")
            .map((letter, index) => {
                if (index < iteration) {
                    return originalText[index];
                }
                return letters[Math.floor(Math.random() * 26)];
            })
            .join("");

        const textNode = document.createTextNode(randomizedText);
        titleCard.appendChild(textNode);

        if (iteration >= originalText.length) {
            clearInterval(interval);
        }

        iteration += 1 / 3;
    }, 30);
};

document.querySelector("#title_card").onmouseout = event => {
    const titleCard = event.target;
    titleCard.innerHTML = `<img src="./images/house_logo.png">LIAM GAVIN`;
};