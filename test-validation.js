import assert from 'assert';
import { validateName, validateEmail, validatePassword } from './validation.js';

console.log('🧪 Running Validation Unit Tests...');

try {
    // 1. Name Validation Tests
    console.log('Testing Name Validation...');
    assert.deepStrictEqual(validateName(''), { isValid: false, message: 'Full name is required.' });
    assert.deepStrictEqual(validateName('A'), { isValid: false, message: 'Name must be at least 2 characters long.' });
    assert.deepStrictEqual(validateName('Arun123'), { isValid: false, message: 'Name can only contain letters and spaces.' });
    assert.deepStrictEqual(validateName('Arun Kumar'), { isValid: true, message: '' });

    // 2. Email Validation Tests
    console.log('Testing Email Validation...');
    assert.deepStrictEqual(validateEmail(''), { isValid: false, message: 'Email address is required.' });
    assert.deepStrictEqual(validateEmail('arun'), { isValid: false, message: 'Please enter a valid email address.' });
    assert.deepStrictEqual(validateEmail('arun@dsce'), { isValid: false, message: 'Please enter a valid email address.' });
    assert.deepStrictEqual(validateEmail('arun@dsce.edu'), { isValid: true, message: '' });

    // 3. Password Validation Tests
    console.log('Testing Password Validation...');
    assert.deepStrictEqual(validatePassword(''), { isValid: false, message: 'Password is required.' });
    assert.deepStrictEqual(validatePassword('Short1!'), { isValid: false, message: 'Password must be at least 8 characters long.' });
    assert.deepStrictEqual(validatePassword('NoSpecialPassword123'), { isValid: false, message: 'Password must contain at least one number and one special character.' });
    assert.deepStrictEqual(validatePassword('NoNumberPassword!'), { isValid: false, message: 'Password must contain at least one number and one special character.' });
    assert.deepStrictEqual(validatePassword('SecurePass123!'), { isValid: true, message: '' });

    console.log('✅ All validation unit tests passed successfully!');
} catch (error) {
    console.error('❌ Test suite failed!');
    console.error(error);
    process.exit(1);
}
