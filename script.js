document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    let currentInput = '0';
    let operator = '';
    let firstValue = '';
    let secondValue = '';
    let shouldResetDisplay = false;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const action = button.getAttribute('data-action');
            const value = button.textContent;

            switch(action) {
                case 'number':
                    handleNumber(value);
                    break;
                case 'operator':
                    handleOperator(value);
                    break;
                case 'decimal':
                    handleDecimal();
                    break;
                case 'clear':
                    handleClear();
                    break;
                case 'delete':
                    handleDelete();
                    break;
                case 'equals':
                    handleEquals();
                    break;
                default:
                    break;
            }
            updateDisplay();
        });
    });

    function handleNumber(value) {
        if (currentInput === '0' || shouldResetDisplay) {
            currentInput = value;
            shouldResetDisplay = false;
        } else {
            currentInput += value;
        }
    }

    function handleOperator(value) {
        if (firstValue && operator && !shouldResetDisplay) {
            handleEquals();
        }
        operator = value;
        firstValue = currentInput;
        shouldResetDisplay = true;
    }

    function handleDecimal() {
        if (!currentInput.includes('.')) {
            currentInput += '.';
        }
    }

    function handleClear() {
        currentInput = '0';
        operator = '';
        firstValue = '';
        secondValue = '';
    }

    function handleDelete() {
        currentInput = currentInput.slice(0, -1) || '0';
    }

    function handleEquals() {
        secondValue = currentInput;
        switch(operator) {
            case '+':
                currentInput = (parseFloat(firstValue) + parseFloat(secondValue)).toString();
                break;
            case '-':
                currentInput = (parseFloat(firstValue) - parseFloat(secondValue)).toString();
                break;
            case '*':
                currentInput = (parseFloat(firstValue) * parseFloat(secondValue)).toString();
                break;
            case '/':
                currentInput = (parseFloat(firstValue) / parseFloat(secondValue)).toString();
                break;
            default:
                break;
        }
        operator = '';
        firstValue = '';
        shouldResetDisplay = true;
    }

    function updateDisplay() {
        display.textContent = currentInput;
    }
});
