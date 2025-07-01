
let mode = 'flashcards';
let current = 0;

function setMode(newMode) {
    mode = newMode;
    current = 0;
    render();
}

function render() {
    const app = document.getElementById('app');
    app.innerHTML = '';

    if (mode === 'flashcards') {
        const card = document.createElement('div');
        card.className = 'card';
        const front = document.createElement('h2');
        front.innerText = vocab[current].latin;
        const back = document.createElement('p');
        back.innerText = vocab[current].german;
        back.style.display = 'none';

        card.onclick = () => {
            back.style.display = back.style.display === 'none' ? 'block' : 'none';
        };

        card.appendChild(front);
        card.appendChild(back);
        app.appendChild(card);

        const next = document.createElement('button');
        next.innerText = 'Nächste';
        next.onclick = () => {
            current = (current + 1) % vocab.length;
            render();
        };
        app.appendChild(next);
    }

    if (mode === 'quiz') {
        const question = vocab[current];
        const options = [question];
        while (options.length < 4) {
            const candidate = vocab[Math.floor(Math.random() * vocab.length)];
            if (!options.includes(candidate)) options.push(candidate);
        }
        options.sort(() => Math.random() - 0.5);

        const quiz = document.createElement('div');
        quiz.className = 'quiz';
        const prompt = document.createElement('h2');
        prompt.innerText = `Was heißt: ${question.latin}?`;
        quiz.appendChild(prompt);

        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.innerText = opt.german;
            btn.onclick = () => {
                alert(opt === question ? '✅ Richtig!' : '❌ Falsch!');
                current = (current + 1) % vocab.length;
                render();
            };
            quiz.appendChild(btn);
        });

        app.appendChild(quiz);
    }
}
