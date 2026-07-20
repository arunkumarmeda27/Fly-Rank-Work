/**
 * Validation rules for the Settings Form.
 * Written as pure functions for testability and modularity.
 */

export function validateName(name) {
    if (!name || typeof name !== 'string') {
        return { isValid: false, message: 'Full name is required.' };
    }
    const trimmed = name.trim();
    if (trimmed.length < 2) {
        return { isValid: false, message: 'Name must be at least 2 characters long.' };
    }
    // Only letters and spaces allowed
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(trimmed)) {
        return { isValid: false, message: 'Name can only contain letters and spaces.' };
    }
    return { isValid: true, message: '' };
}

export function validateEmail(email) {
    if (!email || typeof email !== 'string') {
        return { isValid: false, message: 'Email address is required.' };
    }
    const trimmed = email.trim();
    // Standard robust email regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(trimmed)) {
        return { isValid: false, message: 'Please enter a valid email address.' };
    }
    return { isValid: true, message: '' };
}

export function validatePassword(password) {
    if (!password || typeof password !== 'string') {
        return { isValid: false, message: 'Password is required.' };
    }
    if (password.length < 8) {
        return { isValid: false, message: 'Password must be at least 8 characters long.' };
    }
    // Must contain a number and a special character
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    if (!hasNumber || !hasSpecial) {
        return { isValid: false, message: 'Password must contain at least one number and one special character.' };
    }
    return { isValid: true, message: '' };
}
