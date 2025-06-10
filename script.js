// Tab switching functionality
const tabBtns = document.querySelectorAll('.tab-btn');
const calculators = document.querySelectorAll('.calculator');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');
        
        // Update active tab button
        tabBtns.forEach(btn => btn.classList.remove('active'));
        btn.classList.add('active');
        
        // Update active calculator
        calculators.forEach(calc => calc.classList.remove('active'));
        document.getElementById(tabId).classList.add('active');
    });
});

// Standard Calculator Functions
function appendToDisplay(value) {
    document.getElementById('result').value += value;
}

function clearDisplay() {
    document.getElementById('result').value = '';
}

function backspace() {
    let currentValue = document.getElementById('result').value;
    document.getElementById('result').value = currentValue.slice(0, -1);
}

function calculate() {
    try {
        let expression = document.getElementById('result').value;
        // Replace × with * for evaluation
        expression = expression.replace(/×/g, '*');
        // Handle percentage calculations
        expression = expression.replace(/(\d+)%/g, '(($1)/100)');
        const result = eval(expression);
        document.getElementById('result').value = result;
    } catch (error) {
        document.getElementById('result').value = 'Error';
    }
}

// Scientific Calculator Functions
function sciAppendToDisplay(value) {
    document.getElementById('sci-result').value += value;
}

function sciClearDisplay() {
    document.getElementById('sci-result').value = '';
}

function sciBackspace() {
    let currentValue = document.getElementById('sci-result').value;
    document.getElementById('sci-result').value = currentValue.slice(0, -1);
}

function sciCalculate() {
    try {
        let expression = document.getElementById('sci-result').value;
        // Replace special functions and constants
        expression = expression.replace(/sin\(/g, 'Math.sin(');
        expression = expression.replace(/cos\(/g, 'Math.cos(');
        expression = expression.replace(/tan\(/g, 'Math.tan(');
        expression = expression.replace(/log\(/g, 'Math.log10(');
        expression = expression.replace(/ln\(/g, 'Math.log(');
        expression = expression.replace(/sqrt\(/g, 'Math.sqrt(');
        expression = expression.replace(/×/g, '*');
        expression = expression.replace(/%/g, '/100');
        
        // Handle factorial
        expression = expression.replace(/(\d+)!/g, 'factorial($1)');
        
        const result = eval(expression);
        document.getElementById('sci-result').value = result;
    } catch (error) {
        document.getElementById('sci-result').value = 'Error';
    }
}

function scientificFunction(func) {
    if (func === 'factorial(') {
        sciAppendToDisplay('!');
    } else {
        sciAppendToDisplay(func);
    }
}

// Factorial function
function factorial(n) {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

// Age Calculator Functions
function calculateAge() {
    const birthdateInput = document.getElementById('birthdate').value;
    
    if (!birthdateInput) {
        alert('Please enter your birthdate');
        return;
    }
    
    const birthdate = new Date(birthdateInput);
    const today = new Date();
    
    if (birthdate > today) {
        alert('Birthdate cannot be in the future');
        return;
    }
    
    let age = today.getFullYear() - birthdate.getFullYear();
    const monthDiff = today.getMonth() - birthdate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) {
        age--;
    }
    
    // Calculate months
    let months = (today.getFullYear() - birthdate.getFullYear()) * 12;
    months -= birthdate.getMonth();
    months += today.getMonth();
    
    // Calculate days
    const timeDiff = today.getTime() - birthdate.getTime();
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    
    // Calculate hours
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    
    // Next birthday
    const nextBirthday = new Date(today.getFullYear(), birthdate.getMonth(), birthdate.getDate());
    if (today > nextBirthday) {
        nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
    }
    const daysUntilNextBirthday = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    // Zodiac sign
    const zodiacSign = getZodiacSign(birthdate);
    
    // Display results
    document.getElementById('age-result').innerHTML = `
        <p>You are <strong>${age}</strong> years old</p>
    `;
    
    document.getElementById('months-lived').textContent = `Months lived: ${months}`;
    document.getElementById('days-lived').textContent = `Days lived: ${days.toLocaleString()}`;
    document.getElementById('hours-lived').textContent = `Hours lived: ${hours.toLocaleString()}`;
    document.getElementById('next-birthday').textContent = `Days until next birthday: ${daysUntilNextBirthday}`;
    document.getElementById('zodiac-sign').textContent = `Zodiac sign: ${zodiacSign}`;
    
    document.getElementById('age-facts').classList.remove('hidden');
}

function getZodiacSign(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius";
    if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "Pisces";
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries";
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus";
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini";
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer";
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo";
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra";
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio";
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittarius";
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricorn";
    
    return "Unknown";
}

// Keyboard support for standard calculator
document.addEventListener('keydown', function(event) {
    const key = event.key;
    const resultInput = document.getElementById('result');
    
    if (resultInput && document.getElementById('standard').classList.contains('active')) {
        if (/[0-9+\-*/.%]/.test(key)) {
            event.preventDefault();
            appendToDisplay(key);
        } else if (key === 'Enter') {
            event.preventDefault();
            calculate();
        } else if (key === 'Escape') {
            event.preventDefault();
            clearDisplay();
        } else if (key === 'Backspace') {
            event.preventDefault();
            backspace();
        }
    }
});