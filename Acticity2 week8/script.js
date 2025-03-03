document.addEventListener('DOMContentLoaded', function() {
    
    const quizConfig = {
        correctAnswers: {
            q1: 'b', 
            q2: 'c', 
            q3: 'c', 
            q4: 'a', 
            q5: 'b'  
        },
        questionTexts: {
            q1: 'Which planet is known as the Red Planet?',
            q2: 'Who was the first person to walk on the Moon?',
            q3: 'What is the largest planet in our solar system?',
            q4: 'Which spacecraft carried the first humans to the Moon?',
            q5: 'What is the name of our galaxy?'
        },
        answerOptions: {
            q1: { a: 'Venus', b: 'Mars', c: 'Jupiter', d: 'Mercury' },
            q2: { a: 'Buzz Aldrin', b: 'Yuri Gagarin', c: 'Neil Armstrong', d: 'John Glenn' },
            q3: { a: 'Earth', b: 'Saturn', c: 'Jupiter', d: 'Neptune' },
            q4: { a: 'Apollo 11', b: 'Voyager 1', c: 'Sputnik 1', d: 'Space Shuttle Columbia' },
            q5: { a: 'Andromeda', b: 'Milky Way', c: 'Triangulum', d: 'Sombrero' }
        }
    };

    
    const submitButton = document.getElementById('submit-btn');
    const retryButton = document.getElementById('retry-btn');
    const quizContainer = document.querySelector('.quiz-container');
    const resultsContainer = document.getElementById('results');
    const scoreElement = document.getElementById('score');
    const feedbackContainer = document.getElementById('feedback');

    
    submitButton.addEventListener('click', calculateScore);
    
    
    retryButton.addEventListener('click', resetQuiz);

    
    function calculateScore() {
        let score = 0;
        const userAnswers = {};
        const feedback = [];

        
        const questionNames = Object.keys(quizConfig.correctAnswers);
        
        
        questionNames.forEach(questionName => {
            
            const radioButtons = document.querySelectorAll(`input[name="${questionName}"]`);
            
            
            let selectedAnswer = null;
            radioButtons.forEach(radioButton => {
                if (radioButton.checked) {
                    selectedAnswer = radioButton.value;
                    userAnswers[questionName] = selectedAnswer;
                }
            });
            
            
            const feedbackItem = document.createElement('div');
            feedbackItem.classList.add('feedback-item');
            
            
            const questionText = quizConfig.questionTexts[questionName];
            
            
            if (selectedAnswer === quizConfig.correctAnswers[questionName]) {
                score++;
                feedbackItem.classList.add('correct');
                feedbackItem.innerHTML = `
                    <p><strong>Question:</strong> ${questionText}</p>
                    <p><strong>Your answer:</strong> ${quizConfig.answerOptions[questionName][selectedAnswer]} ✓</p>
                `;
            } else {
                feedbackItem.classList.add('incorrect');
                const correctAnswerLetter = quizConfig.correctAnswers[questionName];
                const correctAnswerText = quizConfig.answerOptions[questionName][correctAnswerLetter];
                
                feedbackItem.innerHTML = `
                    <p><strong>Question:</strong> ${questionText}</p>
                    <p><strong>Your answer:</strong> ${selectedAnswer ? quizConfig.answerOptions[questionName][selectedAnswer] : 'No answer'} ✗</p>
                    <p><strong>Correct answer:</strong> ${correctAnswerText}</p>
                `;
            }
            
            feedback.push(feedbackItem);
        });
        
        
        scoreElement.textContent = score;
        
        
        feedbackContainer.innerHTML = '';
        
        
        feedback.forEach(item => {
            feedbackContainer.appendChild(item);
        });
        
        
        quizContainer.classList.add('hidden');
        resultsContainer.classList.remove('hidden');
    }

    
    function resetQuiz() {
        
        const radioButtons = document.querySelectorAll('input[type="radio"]');
        radioButtons.forEach(radioButton => {
            radioButton.checked = false;
        });
        
        
        resultsContainer.classList.add('hidden');
        quizContainer.classList.remove('hidden');
        
        
        window.scrollTo(0, 0);
    }
});