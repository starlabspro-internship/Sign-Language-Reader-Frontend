import "../admin.js";
import "./adminFaq.css";

const BASE_URL = 'https://localhost:5000/api/faq';

// Modal elements
const editModal = document.getElementById("editModal");
const editAnswerInput = document.getElementById("editAnswerInput");
const saveEditButton = document.getElementById("saveEditButton");
const cancelEditButton = document.getElementById("cancelEditButton");

const deleteModal = document.getElementById("deleteModal");
const confirmDeleteButton = document.getElementById("confirmDeleteButton");
const cancelDeleteButton = document.getElementById("cancelDeleteButton");

const showcaseModal = document.getElementById("showcaseModal");
const showcaseMessage = document.getElementById("showcaseMessage");
const confirmShowcaseButton = document.getElementById("confirmShowcaseButton");
const cancelShowcaseButton = document.getElementById("cancelShowcaseButton");

// Fetch FAQs and display them in appropriate lists
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

// Display FAQs in a given list element
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

// Open modal to edit FAQ answer
function editAnswer(id, currentAnswer) {
    editModal.style.display = "flex";
    editAnswerInput.value = currentAnswer;

    saveEditButton.onclick = () => {
        const newAnswer = editAnswerInput.value.trim();
        if (newAnswer) {
            updateFaqAnswer(id, newAnswer);
            editModal.style.display = "none";
        } else {
            alert("Answer cannot be empty.");
        }
    };

    cancelEditButton.onclick = () => {
        editModal.style.display = "none";
    };
}

// Update FAQ answer
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

// Open modal to confirm FAQ deletion
function deleteFaq(id) {
    deleteModal.style.display = "flex";

    confirmDeleteButton.onclick = async () => {
        try {
            await fetch(`${BASE_URL}/${id}`, { method: 'DELETE', credentials: 'include' });
            alert('FAQ deleted successfully.');
            fetchFaqs();
            deleteModal.style.display = "none";
        } catch (error) {
            console.error('Error deleting FAQ:', error);
            alert('Failed to delete FAQ.');
        }
    };

    cancelDeleteButton.onclick = () => {
        deleteModal.style.display = "none";
    };
}

// Open modal to confirm showcase toggle
function toggleShowcase(id, currentShowcaseStatus) {
    const newShowcaseStatus = !currentShowcaseStatus;
    showcaseMessage.textContent = newShowcaseStatus
        ? "Do you want to showcase this FAQ?"
        : "Remove this FAQ from showcase?";

    showcaseModal.style.display = "flex";

    confirmShowcaseButton.onclick = async () => {
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
            }
        } catch (error) {
            console.error('Error updating showcase status:', error);
            alert('Failed to update showcase status.');
        } finally {
            showcaseModal.style.display = "none";
        }
    };

    cancelShowcaseButton.onclick = () => {
        showcaseModal.style.display = "none";
    };
}

// Fetch FAQs on page load
fetchFaqs();
