// Contact Form JavaScript
// Add this script to enhance the contact form functionality

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const submitBtn = document.querySelector('.submit-btn');

    // Store original button text
    const originalBtnText = submitBtn.textContent;

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Real-time validation functions
    function validateName() {
        const name = nameInput.value.trim();
        if (name.length < 2) {
            showFieldError(nameInput, 'Name must be at least 2 characters long');
            return false;
        }
        clearFieldError(nameInput);
        return true;
    }

    function validateEmail() {
        const email = emailInput.value.trim();
        if (!email) {
            showFieldError(emailInput, 'Email is required');
            return false;
        }
        if (!emailRegex.test(email)) {
            showFieldError(emailInput, 'Please enter a valid email address');
            return false;
        }
        clearFieldError(emailInput);
        return true;
    }

    function validateMessage() {
        const message = messageInput.value.trim();
        if (message.length < 10) {
            showFieldError(messageInput, 'Message must be at least 10 characters long');
            return false;
        }
        clearFieldError(messageInput);
        return true;
    }

    // Show field error
    function showFieldError(field, message) {
        clearFieldError(field);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            color: #e74c3c;
            font-size: 0.85rem;
            margin-top: 5px;
            animation: slideIn 0.3s ease-out;
        `;
        
        field.parentNode.appendChild(errorDiv);
        field.style.borderColor = '#e74c3c';
        field.style.boxShadow = '0 0 0 3px rgba(231, 76, 60, 0.1)';
    }

    // Clear field error
    function clearFieldError(field) {
        const errorMessage = field.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
        field.style.borderColor = '#e1e5e9';
        field.style.boxShadow = 'none';
    }

    // Show success message
    function showSuccessMessage() {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = `
            <div style="
                background: linear-gradient(135deg, #27ae60, #2ecc71);
                color: white;
                padding: 15px 20px;
                border-radius: 10px;
                margin-bottom: 20px;
                text-align: center;
                font-weight: 600;
                animation: slideIn 0.5s ease-out;
            ">
                ✓ Thank you! Your message has been sent successfully.
            </div>
        `;
        
        form.parentNode.insertBefore(successDiv, form);
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .form-control:invalid:not(:placeholder-shown) {
            border-color: #e74c3c;
            box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1);
        }
        
        .form-control:valid:not(:placeholder-shown) {
            border-color: #27ae60;
            box-shadow: 0 0 0 3px rgba(39, 174, 96, 0.1);
        }
        
        .submit-btn:disabled {
            opacity: 0.7;
            cursor: not-allowed;
            transform: none !important;
        }
        
        .loading {
            position: relative;
            color: transparent;
        }
        
        .loading::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 20px;
            height: 20px;
            margin: -10px 0 0 -10px;
            border: 2px solid transparent;
            border-top-color: #ffffff;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            to {
                transform: rotate(360deg);
            }
        }
    `;
    document.head.appendChild(style);

    // Real-time validation event listeners
    nameInput.addEventListener('blur', validateName);
    emailInput.addEventListener('blur', validateEmail);
    messageInput.addEventListener('blur', validateMessage);

    // Input event listeners for immediate feedback
    nameInput.addEventListener('input', function() {
        if (this.value.trim().length >= 2) {
            clearFieldError(this);
        }
    });

    emailInput.addEventListener('input', function() {
        if (emailRegex.test(this.value.trim())) {
            clearFieldError(this);
        }
    });

    messageInput.addEventListener('input', function() {
        if (this.value.trim().length >= 10) {
            clearFieldError(this);
        }
        
        // Character counter
        updateCharacterCounter(this);
    });

    // Character counter for message field
    function updateCharacterCounter(textarea) {
        let counter = textarea.parentNode.querySelector('.char-counter');
        if (!counter) {
            counter = document.createElement('div');
            counter.className = 'char-counter';
            counter.style.cssText = `
                text-align: right;
                font-size: 0.8rem;
                color: #888;
                margin-top: 5px;
            `;
            textarea.parentNode.appendChild(counter);
        }
        
        const length = textarea.value.length;
        const maxLength = 500;
        counter.textContent = `${length}/${maxLength} characters`;
        
        if (length > maxLength * 0.9) {
            counter.style.color = '#e74c3c';
        } else {
            counter.style.color = '#888';
        }
    }

    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();
        
        if (!isNameValid || !isEmailValid || !isMessageValid) {
            // Scroll to first error
            const firstError = form.querySelector('.error-message');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        
        // Simulate form submission (replace with actual form submission)
        setTimeout(() => {
            // Reset form
            form.reset();
            
            // Show success message
            showSuccessMessage();
            
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
            
            // Clear any remaining error states
            [nameInput, emailInput, messageInput].forEach(field => {
                clearFieldError(field);
            });
            
            // Remove character counter
            const counter = messageInput.parentNode.querySelector('.char-counter');
            if (counter) {
                counter.remove();
            }
            
        }, 2000); // 2 second delay to simulate server response
        
        // For actual form submission, replace the setTimeout with:
        /*
        const formData = new FormData(form);
        
        fetch(form.action, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                form.reset();
                showSuccessMessage();
            } else {
                throw new Error('Network response was not ok');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error sending your message. Please try again.');
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
        });
        */
    });

    // Smooth scroll for mobile keyboards
    const inputs = [nameInput, emailInput, messageInput];
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            setTimeout(() => {
                this.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        });
    });

    // Prevent double submission
    let isSubmitting = false;
    form.addEventListener('submit', function(e) {
        if (isSubmitting) {
            e.preventDefault();
            return;
        }
        isSubmitting = true;
        
        setTimeout(() => {
            isSubmitting = false;
        }, 3000);
    });
});

// Optional: Add form analytics
function trackFormInteraction(action, field = null) {
    // Replace with your analytics service
    console.log(`Form ${action}${field ? ` - ${field}` : ''}`);
    
    // Example Google Analytics event tracking:
    // gtag('event', action, {
    //     event_category: 'Contact Form',
    //     event_label: field
    // });
}

// Track form interactions
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            trackFormInteraction('field_focus', input.name);
        });
        
        input.addEventListener('blur', () => {
            if (input.value.trim()) {
                trackFormInteraction('field_complete', input.name);
            }
        });
    });
    
    form.addEventListener('submit', () => {
        trackFormInteraction('form_submit');
    });
});