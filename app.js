import { validateName, validateEmail, validatePassword } from './validation.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('settingsForm');
    const fields = {
        name: {
            input: document.getElementById('name'),
            errorSpan: document.getElementById('name-error'),
            validate: validateName
        },
        email: {
            input: document.getElementById('email'),
            errorSpan: document.getElementById('email-error'),
            validate: validateEmail
        },
        password: {
            input: document.getElementById('password'),
            errorSpan: document.getElementById('password-error'),
            validate: validatePassword
        }
    };
    const formFeedback = document.getElementById('form-feedback');

    // Run field validation and update DOM
    function validateField(fieldName, showSuccessState = false) {
        const field = fields[fieldName];
        const result = field.validate(field.input.value);
        const group = field.input.closest('.form-group');

        if (!result.isValid) {
            group.classList.add('has-error');
            field.input.setAttribute('aria-invalid', 'true');
            field.errorSpan.textContent = result.message;
            return false;
        } else {
            group.classList.remove('has-error');
            field.input.removeAttribute('aria-invalid');
            field.errorSpan.textContent = '';
            return true;
        }
    }

    // Attach real-time validation on blur
    Object.keys(fields).forEach(fieldName => {
        const field = fields[fieldName];
        field.input.addEventListener('blur', () => {
            validateField(fieldName);
        });

        // Clear error as user types to reduce frustration
        field.input.addEventListener('input', () => {
            const group = field.input.closest('.form-group');
            if (group.classList.contains('has-error')) {
                validateField(fieldName);
            }
        });
    });

    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Validate all fields
        let isFormValid = true;
        let firstInvalidInput = null;

        Object.keys(fields).forEach(fieldName => {
            const isValid = validateField(fieldName);
            if (!isValid) {
                isFormValid = false;
                if (!firstInvalidInput) {
                    firstInvalidInput = fields[fieldName].input;
                }
            }
        });

        // Update feedback and focus
        formFeedback.className = 'feedback-container';
        formFeedback.innerHTML = '';

        if (!isFormValid) {
            formFeedback.classList.add('feedback-error', 'show');
            formFeedback.textContent = 'Please correct the highlighted errors before saving.';
            
            // Focus the first invalid field for keyboard accessibility
            if (firstInvalidInput) {
                firstInvalidInput.focus();
            }
        } else {
            formFeedback.classList.add('feedback-success', 'show');
            formFeedback.textContent = 'Success! Your account settings have been updated.';
            
            // Reset password field for security
            fields.password.input.value = '';
        }
    });
});
