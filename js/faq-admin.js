const BASE_URL = 'https://localhost:5000/api/faq'; 

async function fetchFaqs() {
    try {
        const response = await fetch(`${BASE_URL}/admin`, { credentials: 'include' });
        const faqs = await response.json();

        const noShowcaseNoAnswer = faqs.filter(faq => !faq.showcased && !faq.answer);
        const noShowcaseWithAnswer = faqs.filter(faq => !faq.showcased && faq.answer);
        const showcasedFaqs = faqs.filter(faq => faq.showcased);

        displayFaqs(noShowcaseNoAnswer, 'faq-list-no-showcase-no-answer');
        displayFaqs(noShowcaseWithAnswer, 'faq-list-no-showcase-with-answer', true);
        displayFaqs(showcasedFaqs, 'faq-list-showcased', true, true);
    } catch (error) {
        console.error('Error fetching FAQs:', error);
    }
}

function displayFaqs(faqs, elementId, hasAnswer = false, isShowcased = false) {
    const list = document.getElementById(elementId);
    list.innerHTML = '';

    faqs.forEach(faq => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            ${faq.question}
            <ul>
                ${hasAnswer ? `<li>Answer: ${faq.answer}</li>` : ''}
                <li><button onclick="deleteFaq('${faq._id}')">Delete FAQ</button></li>
                ${!isShowcased ? `<li><button onclick="editAnswer('${faq._id}', '${faq.answer || ''}')">Edit Answer</button></li>
                <li><button onclick="toggleShowcase('${faq._id}', true)">Showcase FAQ</button></li>` : ''}
                ${isShowcased ? `<li><button onclick="editAnswer('${faq._id}', '${faq.answer}')">Edit Answer</button></li>
                <li><button onclick="toggleShowcase('${faq._id}', false)">Remove Showcase</button></li>` : ''}
            </ul>
        `;
        list.appendChild(listItem);
    });
}

async function deleteFaq(id) {
    try {
        await fetch(`${BASE_URL}/${id}`, { method: 'DELETE', credentials: 'include' });
        alert('FAQ deleted successfully.');
        fetchFaqs(); 
    } catch (error) {
        console.error('Error deleting FAQ:', error);
        alert('Failed to delete FAQ.');
    }
}

function editAnswer(id, currentAnswer) {
    const newAnswer = prompt('Enter new answer:', currentAnswer);
    if (newAnswer !== null) {
        updateFaqAnswer(id, newAnswer);
    }
}

async function updateFaqAnswer(id, answer) {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ answer }),
        });
        const data = await response.json();

        if (data.message === 'FAQ updated successfully.') {
            alert('Answer updated successfully.');
            fetchFaqs(); 
        } else {
            alert('Failed to update FAQ answer.');
        }
    } catch (error) {
        console.error('Error updating FAQ answer:', error);
    }
}

async function toggleShowcase(id, setShowcaseTo) {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ showcased: setShowcaseTo })
        });
        
        const data = await response.json();
        
        if (data.message === 'FAQ updated successfully.') {
            alert(`FAQ ${setShowcaseTo ? 'showcased' : 'removed from showcase'} successfully.`);
            fetchFaqs();
        } else if (data.message === 'Only 6 FAQs can be showcased at a time.') {
            alert('Error: You cannot showcase more than 6 FAQs.');
        } else {
            alert('Failed to update showcase status.');
        }
    } catch (error) {
        console.error('Error updating showcase status:', error);
        alert('Failed to update showcase status.');
    }
}

fetchFaqs();
