import "../admin.js"
import "./adminFaq.css"

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
        listItem.classList.add('faq-item');

        const question = document.createElement('p');
        question.className = 'faq-question';
        question.textContent = faq.question;

        const actions = document.createElement('ul');
        actions.className = 'faq-actions';

        if (hasAnswer) {
            const answerItem = document.createElement('li');
            answerItem.textContent = `Answer: ${faq.answer}`;
            actions.appendChild(answerItem);
        }

        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn-delete';
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteFaq(faq._id);
        actions.appendChild(deleteButton);

        const editButton = document.createElement('button');
        editButton.className = 'btn-edit';
        editButton.textContent = 'Edit Answer';
        editButton.onclick = () => editAnswer(faq._id, faq.answer || '');
        actions.appendChild(editButton);

        const showcaseButton = document.createElement('button');
        showcaseButton.className = isShowcased ? 'btn-remove-showcase' : 'btn-showcase';
        showcaseButton.textContent = isShowcased ? 'Remove Showcase' : 'Showcase';
        showcaseButton.onclick = () => toggleShowcase(faq._id, faq.showcased);
        actions.appendChild(showcaseButton);

        listItem.appendChild(question);
        listItem.appendChild(actions);

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

async function toggleShowcase(id, currentShowcaseStatus) {
    const newShowcaseStatus = !currentShowcaseStatus; 

    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ showcased: newShowcaseStatus }),
        });
        const data = await response.json();

        if (data.message === 'FAQ updated successfully.') {
            alert(`FAQ ${newShowcaseStatus ? 'showcased' : 'removed from showcase'} successfully.`);
            fetchFaqs();
        } else if (data.message === 'Cannot showcase more than 6 FAQs.') {
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
