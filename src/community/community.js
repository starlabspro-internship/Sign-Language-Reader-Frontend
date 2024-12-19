import './community.css';

document.addEventListener("DOMContentLoaded", () => {
    const singlePostSection = document.querySelector(".single-post-section");

    // Per mi ndrru panelet
    const postButton = document.querySelector(".post-button");
    const communitySection = document.querySelector(".community-content-section");
    const createPostSection = document.querySelector(".create-posting-section");
    const filterContainer = document.querySelector(".filter-section");
    const filterSelect = document.getElementById("post-block");

    // per mi ndru panelet filter (per renderPosts)
    const postsContainer = document.querySelector(".post-card-holder");
    const filterLinks = document.querySelectorAll(".filter-section div a");
    const loadMoreBtn = document.querySelector(".fetch-more-btn");
    const loader = document.querySelector(".loader"); 

    let currentFilter = 'most-active'; 
    let offset = 0;
    const limit = 10;

    const backButton = singlePostSection.querySelector(".sp-back");
        backButton.addEventListener("click", () => {
            window.location.href = "community.html";
    });

    filterSelect.addEventListener("change", (e) => {
        currentFilter = e.target.value;
        fetchPosts(true); 
    });

    const fetchSinglePost = async (postId) => {
        const loaderTwo = document.querySelector('.loader_single');
        const singlePostSection = document.querySelector('.single-post-section'); 
        const singlePost = document.querySelector('.single-post');

        try {
            singlePostSection.style.display = 'block'; 
            loaderTwo.style.display = 'block'; 
            singlePost.style.display = 'none';

            const response = await fetch(`https://localhost:5000/api/post/${postId}`);
            if (!response.ok) throw new Error('Failed to fetch post');

            const post = await response.json();
            renderSinglePost(post);

            loaderTwo.style.display = 'none';
            singlePost.style.display = 'block';
        } catch (error) {
            console.error("Error fetching single post:", error);
        } finally {
            loaderTwo.style.display = 'none';
        }
    };

    const renderSinglePost = async (post) => {
        const { postingTitle, postingComp, postingImages, postedByDetails, postedBy, datePosted, views, likes, likedBy, comments, _id } = post;
        const user = postedByDetails || postedBy;

        filterContainer.style.display = "none";
        communitySection.style.display = "none";
    
        const isLoggedIn = await checkLoginStatus();
        let currentUser = null;

        if (isLoggedIn) {
            currentUser = await getCurrentUser(); 
        }

        const hasLiked = currentUser && likedBy.some(id => id.toString() === currentUser.userId);

        const isAdmin = currentUser?.userIsAdmin || false;
        const isPostOwner = currentUser?.userId === post.postedBy;

        const sortedComments = comments.sort((a, b) => {
            if (a.pinned && b.pinned) {
                if (b.commentLikes !== a.commentLikes) {
                    return b.commentLikes - a.commentLikes;
                }
                return new Date(b.dateCommentPosted) - new Date(a.dateCommentPosted);
            }
        
            if (a.pinned && !b.pinned) return -1;
            if (!a.pinned && b.pinned) return 1;
        
            if (b.commentLikes !== a.commentLikes) {
                return b.commentLikes - a.commentLikes;
            }
        
            return new Date(b.dateCommentPosted) - new Date(a.dateCommentPosted);
        });
    
        singlePostSection.innerHTML = `
            <div class="single-post">
                <div class="sp-header">
                    <button class="sp-back">
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                        </svg>
                    </button>
    
                    <div class="sp-header-right">
                        <div class="sp-poster">
                            <img src="${user.userpicture}" alt="${user.userName}">
                            <h2>${user.userName} ${user.userSurname}</h2>
                        </div>
                        <p>${new Date(datePosted).toLocaleDateString()}</p>
                    </div>
                </div> 
    
                <div class="sp-main-content">
                    ${(isAdmin || isPostOwner)
                        ? `<button class="delete-post-button">
                            <i class="fa-solid fa-trash-can"></i> Fshij Postimin
                        </button>` : ``
                    }
                    <h1>${postingTitle}</h1>
                    <p>${postingComp}</p>
                
                    ${postingImages.length > 0 
                        ? `<div class="sp-image-containers">
                            <img class="main-img" src="${postingImages[0]}">
                            <div class="sp-secondaryImages">
                                ${postingImages.slice(1).map(img => `<img src="${img}">`).join('')}
                            </div>
                           </div>`
                        : ''
                    }                    
                </div>
    
                <div class="sp-user-activity">
                    <div class="sp-activity-div">
                        <a class="sp-views">
                            <i class="fa-regular fa-eye"></i>
                            ${views}
                        </a>
                        <a class="sp-likes ${hasLiked ? 'liked' : ''} ${isLoggedIn ? '' : 'disabled'}">
                            <i class="fa-solid fa-heart"></i>
                            <span class="likes-count">${likes}</span>
                        </a>
                        <a class="sp-comments ${isLoggedIn ? '' : 'disabled'}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-left" viewBox="0 0 16 16">
                                <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                            </svg>
                            ${comments.length}
                        </a>
                    </div>
                </div>
    
            <div class="sp-comment-main">
                ${isLoggedIn ? `
                <form class="sp-add-comment">
                    <input type="text" class="sp-ac-input" placeholder="Write your comment here...">
                    <div class="sp-comment-submit">
                        <label for="submit-comment" class="submit-comment">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-send-fill" viewBox="0 0 16 16">
                                <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z"/>
                            </svg>
                        </label>
                        <input type="submit" id="submit-comment" style="display: none;">
                    </div>
                </form>
                     <p class="comment-success" style="display: none">Komenti juaj është vendosur me sukses!</p>
                ` : `<p class="login-prompt">Ju lutem kyçuni për të vendosur një koment.</p>`}
            
                <div class="sp-comment-holder">
                ${sortedComments.map(comment => {
                    const isCommentOwner = currentUser?.userId === comment.postedBy._id; 
                    const hasLikedComment = currentUser && comment.commentLikedBy.some(id => id.toString() === currentUser.userId); 
                    return `
                        <div class="sp-comment-card">
                            <div class="comment-card-main">
                                <img src=${comment.postedBy.userpicture} alt="">
                                <div class="sp-comment-info">
                                    <h2>${comment.postedBy.userName} ${comment.postedBy.userSurname} ${comment.pinned ? '<i class="fa-solid fa-map-pin"></i>' : ''}</h2>
                                    <p>${comment.commentText}</p>
                                </div>
                            </div>
                            <div class="comment-actions">
                                <div class="sp-comment-action-buttons">
                                    <a class="like-comment ${hasLikedComment ? 'liked' : ''} ${isLoggedIn ? '' : 'disabled'}" 
                                    data-post-id="${_id}" 
                                    data-comment-id="${comment._id}">
                                        <i class="fa-solid fa-heart"></i>
                                        <span class="like-count">${comment.commentLikes}</span>
                                    </a>
                
                                    ${
                                        (isAdmin || isPostOwner)
                                            ? `<a class="pin-cmnt ${comment.pinned ? 'pinned' : ''}" data-post-id="${_id}" data-comment-id="${comment._id}">
                                                    <i class="fa-solid fa-map-pin"></i> pin
                                            </a>`
                                            : ''
                                    }

                                    ${
                                        (isAdmin || isPostOwner || isCommentOwner)
                                            ? `<a class="del-cmnt" data-post-id="${_id}" data-comment-id="${comment._id}">
                                                    <i class="fa-solid fa-trash"></i> Delete
                                               </a>`
                                            : ''
                                    }
                                </div>
                                <p class="sp-comment-date">${new Date(comment.dateCommentPosted).toLocaleDateString()}</p>
                            </div>
                        </div>
                        `;
                    }).join('')}
                </div>
                </div>
            </div>
        `;

        if (isLoggedIn) {
            const commentForm = singlePostSection.querySelector('.sp-add-comment');
            const commentInput = commentForm.querySelector('.sp-ac-input');
            const successMessage = singlePostSection.querySelector('.comment-success');
    
            commentForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const commentText = commentInput.value.trim();
    
                if (!commentText) {
                    alert('Comment cannot be empty.');
                    return;
                }
    
                try {
                    const response = await fetch(`https://localhost:5000/api/post/${_id}/comment`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ commentText }),
                        credentials: 'include', 
                    });
    
                    if (response.ok) {
                        const data = await response.json();
    
                        successMessage.style.display = 'block';
                        setTimeout(() => {
                            successMessage.style.display = 'none';
                        }, 3000);
    
                        commentInput.value = '';
    
                        const commentHolder = singlePostSection.querySelector('.sp-comment-holder');
                        const newCommentHTML = `
                            <div class="sp-comment-card">
                                <div class="comment-card-main">
                                    <img src=${currentUser.userpicture} alt="">
                                    <div class="sp-comment-info">
                                        <h2>${currentUser.userName} ${currentUser.userSurname}</h2>
                                        <p>${commentText}</p>
                                    </div>
                                </div>
                                <div class="comment-actions">
                                    <div class="sp-comment-action-buttons">
                                        <a class="like-comment ${isLoggedIn ? '' : 'disabled'}">
                                            <i class="fa-solid fa-heart"></i>
                                            0
                                        </a>
                                    </div>
                                    <p>${new Date().toLocaleDateString()}</p>
                                </div>
                            </div>
                        `;
                        commentHolder.insertAdjacentHTML('afterbegin', newCommentHTML);
                    } else {
                        const errorData = await response.json();
                        alert(`Error: ${errorData.message}`);
                    }
                } catch (error) {
                    console.error('Error posting comment:', error);
                    alert('An error occurred while posting the comment.');
                }
            });
        };

        const likeButton = singlePostSection.querySelector('.sp-likes');
        likeButton.addEventListener('click', async () => {
            if (isLoggedIn) {
            const updatedLikes = await toggleLikePost(_id); 
            if (updatedLikes !== null) {
                likeButton.classList.toggle('liked');
                const likesCountSpan = likeButton.querySelector('.likes-count');
                likesCountSpan.textContent = updatedLikes;
            }
            } else {
            alert('You must be logged in to like a post!');
            }
        });

        if (isAdmin || isPostOwner) {
        const deletePostButton = singlePostSection.querySelector('.delete-post-button');

        deletePostButton.addEventListener('click', async () => {
            const confirmDelete = confirm("Are you sure you want to delete this post?");
            if (!confirmDelete) return;
                try {
                    const response = await fetch(`https://localhost:5000/api/post/delete/${_id}`, {
                        method: 'DELETE',
                        credentials: 'include' 
                    });

                    if (response.ok) {
                        alert('Post successfully deleted.');
                        window.location.reload();
                    } else {
                        const errorData = await response.json();
                        alert(`Failed to delete post: ${errorData.message || 'Unknown error'}`);
                    }
                } catch (error) {
                    console.error('Error deleting post:', error);
                    alert('An error occurred while trying to delete the post.');
                }
            });
        }   


        document.addEventListener('click', async (event) => {
            if (event.target.closest('.del-cmnt')) {
                const delButton = event.target.closest('.del-cmnt');
                const postId = delButton.getAttribute('data-post-id');
                const commentId = delButton.getAttribute('data-comment-id');
        
                const deleteModal = document.querySelector('.delete-modal');
                const modalHeading = deleteModal.querySelector('h2');
                const modalParagraph = deleteModal.querySelector('p');
                const modalButtons = deleteModal.querySelector('.dmm-btns');
        
                resetModal(deleteModal);
        
                showModal(deleteModal);
        
                const deleteYesButton = deleteModal.querySelector('.del-cmnt-modal-yes');
                const deleteCloseButton = deleteModal.querySelector('.del-cmnt-modal-close');
        
                deleteYesButton.onclick = async () => {
                    try {
                        const response = await deleteComment(postId, commentId);
        
                        if (response.ok) {
                            modalHeading.textContent = 'Komenti u fshi me sukses!';
                            modalParagraph.innerHTML = '<i class="fa-solid fa-check"></i>';
                            modalButtons.innerHTML = ''; 
        
                            delButton.closest('.sp-comment-card').remove();
        
                            setTimeout(() => {
                                hideModal(deleteModal, () => resetModal(deleteModal));
                            }, 3000);
                        } else {
                            const errorData = await response.json();
                            modalHeading.textContent = 'Error';
                            modalParagraph.textContent = errorData.message;
                        }
                    } catch (error) {
                        console.error('Error deleting comment:', error);
                        modalHeading.textContent = 'Error';
                        modalParagraph.textContent = 'An unexpected error occurred.';
                    }
                };
        
                deleteCloseButton.onclick = () => {
                    hideModal(deleteModal, () => resetModal(deleteModal)); 
                };
            }
        });
        
        document.addEventListener('click', async (event) => {
            if (event.target.closest('.pin-cmnt')) {
                const pinButton = event.target.closest('.pin-cmnt');
                const postId = pinButton.getAttribute('data-post-id');
                const commentId = pinButton.getAttribute('data-comment-id');
        
                try {
                    const response = await pinComment(postId, commentId);
                    if (response.ok) {
                        const data = await response.json();
                        console.log(data.message);
                        
                        pinButton.classList.toggle('pinned', data.pinnedComment.pinned);
                    } else {
                        const errorData = await response.json();
                        console.error("Error pinning comment:", errorData.message);
                        alert(errorData.message);
                    }
                } catch (error) {
                    console.error("Error:", error);
                    alert("An unexpected error occurred while pinning the comment.");
                }
            }
        });

        singlePostSection.querySelectorAll('.like-comment').forEach((button) => {
            button.addEventListener('click', async (e) => {
                e.preventDefault();
                const postId = button.getAttribute('data-post-id');
                const commentId = button.getAttribute('data-comment-id');
                
                if (isLoggedIn) {
                    const updatedLikes = await toggleLikeComment(postId, commentId);
                    if (updatedLikes !== null) {
                        button.classList.toggle('liked');
                        const likeCountSpan = button.querySelector('.like-count');
                        likeCountSpan.textContent = updatedLikes;
                    }
                } else {
                    alert('You must be logged in to like a comment!');
                }
            });
        });    

        singlePostSection.style.display = 'flex';
        filterContainer.style.display = 'none';
        communitySection.style.display = 'none';
    
        const backButton = singlePostSection.querySelector(".sp-back");
        backButton.addEventListener("click", () => {
            window.location.href = "community.html";
        });
    };    

    const getCurrentUser = async () => {
        try {
            const response = await fetch('https://localhost:5000/api/users/me', { credentials: 'include' });
            if (response.ok) {
                return await response.json();
            }
            return null;
        } catch (error) {
            console.error("Error fetching current user:", error);
            return null;
        }
    };    

    const deleteComment = async (postId, commentId) => {
        const url = `https://localhost:5000/api/post/${postId}/comments/${commentId}`;
        const response = await fetch(url, {
            method: 'DELETE',
            credentials: 'include',
        });
        return response;
    };
    
    const showModal = (modal) => {
        modal.style.transform = 'translateY(0)';
        modal.style.zIndex = '10';
    };
    
    const hideModal = (modal, callback) => {
        modal.style.transform = 'translateY(9em)'; 
        setTimeout(() => {
            modal.style.zIndex = '-2'; 
            if (callback) callback(); 
        }, 500); 
    };
    
    
    const resetModal = (modal) => {
        const modalHeading = modal.querySelector('h2');
        const modalParagraph = modal.querySelector('p');
        const modalButtons = modal.querySelector('.dmm-btns');
    
        modalHeading.textContent = 'A jeni te sigurte?';
        modalParagraph.textContent = 'Komenti i fshire nuk mund te kthehet';
        modalButtons.innerHTML = `
            <button class="del-cmnt-modal-yes">Po, Fshije</button>
            <button class="del-cmnt-modal-close">Kthehu prapa</button>
        `;
    };
    
    const toggleLikeComment = async (postId, commentId) => {
        try {
            const response = await fetch(`https://localhost:5000/api/post/${postId}/comments/${commentId}/like`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', 
            });
    
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to toggle like');
            }
    
            const data = await response.json(); 
            return data.likesCount;
        } catch (error) {
            console.error('Error toggling like:', error.message);
            return null;
        }
    };   
    
    const pinComment = async (postId, commentId) => {
        const url = `https://localhost:5000/api/post/${postId}/comments/${commentId}/pin`;
        const response = await fetch(url, {
            method: 'PUT',
            credentials: 'include',
        });
        return response;
    };

    const toggleLikePost = async (postId) => {
        try {
          const response = await fetch(`https://localhost:5000/api/post/${postId}/like`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          });
      
          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to toggle like');
          }
      
          const data = await response.json();
          return data.likes;
        } catch (error) {
          console.error('Error toggling like:', error.message);
          return null;
        }
      };

    const showLoader = () => {
        loader.style.display = 'block';
        postsContainer.style.display = 'none'; 
    };

    const hideLoader = () => {
        loader.style.display = 'none';
        postsContainer.style.display = 'block'; 
    };

    // good
    const fetchPosts = async (reset = false) => {
        showLoader(); 

        if (reset) {
        postsContainer.innerHTML = ''; 
        offset = 0; 
        }

        try {
        const url = `https://localhost:5000/api/post/${currentFilter}?limit=${limit}&offset=${offset}`;
        const response = await fetch(url, {
            credentials: 'include',
        });
        if (!response.ok) throw new Error('Failed to fetch posts');

        const posts = await response.json();

        singlePostSection.style.display = 'none';
        communitySection.style.display = 'flex';

        renderPosts(posts); 
        offset += limit;

        loadMoreBtn.style.display = (posts.length < limit) ? 'none' : 'block';
        } catch (error) {
        console.error("Error fetching posts:", error);
        } finally {
        hideLoader(); 
        }
    };

    filterLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
    
            createPostSection.style.display = "none";
            communitySection.style.display = "flex";
    
            filterLinks.forEach(l => l.classList.remove('selected'));
            link.classList.add('selected');
    
            currentFilter = link.getAttribute('data-filter');
            filterSelect.value = currentFilter;
    
            fetchPosts(true); 
        });
    });
    
    // god
    const renderPosts = (posts) => {
        postsContainer.innerHTML = ''; 
        posts.forEach(post => {
            const { _id, postingImages, postedBy, postedByDetails, postingTitle, datePosted, views, likes, comments } = post;
            const user = postedByDetails || postedBy;

            const postCard = `
                <div class="post-card" data-id="${_id}">
                    <div class="post-header">
                        <div class="header-name">
                            <img src="${user.userpicture}" alt="${user.userName}">
                            <p>${user.userName} ${user.userSurname}</p>
                        </div>
                        <p>${new Date(datePosted).toLocaleDateString()}</p>
                    </div>
                    <div class="post-title">
                        <h1>${postingTitle}</h1>
                    </div>
                    ${renderPostImages(postingImages)}
                    <div class="post-activity">
                        <div class="post-views"><i class="fa-regular fa-eye"></i><p>${views}</p></div>
                        <div class="post-likes"><i class="fa-solid fa-heart"></i><p>${likes}</p></div>
                        <div class="post-comments">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-left" viewBox="0 0 16 16">
                                <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                            </svg>
                            <p>${comments.length}</p>
                        </div>
                    </div>
                </div>
                <hr class="card-hr">
            `;
            postsContainer.insertAdjacentHTML('beforeend', postCard);
        });

        document.querySelectorAll(".post-card").forEach(card => {
            card.addEventListener("click", () => {
                const postId = card.getAttribute("data-id");
                filterContainer.style.display = "none";
                communitySection.style.display = "none";
                fetchSinglePost(postId);
            });
        });
    };

    postButton.addEventListener("click", async () => {
        const isLoggedIn = await checkLoginStatus();
    
        if (isLoggedIn) {
          communitySection.style.display = "none";
          createPostSection.style.display = "block";
        } else {
          window.location.href = "auth.html";
        }
    });


    const renderPostImages = (images) => {
        if (!images || images.length === 0) return '';
        if (images.length === 1) {
        return `<div class="post-images"><img src="${images[0]}" alt="Post Image"></div>`;
        } else {
        return `
            <div class="post-images">
            <img src="${images[0]}" alt="Post Image">
            <div class="more-img"><p>+${images.length - 1}</p></div>
            </div>
        `;
        }
    };   

const maxInputs = 3;
let currentInputs = 1;

document.getElementById("postingImage1").addEventListener("change", handleFileChange);
document.getElementById("removeAll").addEventListener("click", resetInputs);

function handleFileChange(event) {
    const input = event.target;
    const label = document.getElementById(`uploadLabel${currentInputs}`);

    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            label.style.backgroundImage = `url(${e.target.result})`;
            label.textContent = ""; 
        };
        reader.readAsDataURL(input.files[0]);

        if (currentInputs < maxInputs) {
            addNewInput();
        }
    }
}

function addNewInput() {
    currentInputs++;

    const fileInputsDiv = document.getElementById("fileInputs");
    const newInputDiv = document.createElement("div");
    newInputDiv.className = "file-input";

    const newInput = document.createElement("input");
    newInput.type = "file";
    newInput.id = `postingImage${currentInputs}`;
    newInput.name = "postingImages";
    newInput.style.display = "none";

    const newLabel = document.createElement("label");
    newLabel.htmlFor = `postingImage${currentInputs}`;
    newLabel.className = "upload-label";
    newLabel.id = `uploadLabel${currentInputs}`;
    newLabel.textContent = `+`;

    newInput.addEventListener("change", handleFileChange);

    newInputDiv.appendChild(newInput);
    newInputDiv.appendChild(newLabel);
    fileInputsDiv.appendChild(newInputDiv);
}

function resetInputs() {
    currentInputs = 1;

    const fileInputsDiv = document.getElementById("fileInputs");
    fileInputsDiv.innerHTML = `
        <div class="file-input">
            <input type="file" id="postingImage1" name="postingImages" style="display:none;" />
            <label for="postingImage1" class="upload-label" id="uploadLabel1">
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-image" viewBox="0 0 16 16">
                    <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                    <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1z"/>
                </svg>
            </label>
        </div>
    `;

    document.getElementById("postingImage1").addEventListener("change", handleFileChange);
}

document.getElementById("postForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData();
    const postingTitle = document.getElementById("postingTitle").value;
    const postingComp = document.getElementById("postingComp").value;

    formData.append("postingTitle", postingTitle);
    formData.append("postingComp", postingComp);

    for (let i = 1; i <= currentInputs; i++) {
        const fileInput = document.getElementById(`postingImage${i}`);
        if (fileInput.files[0]) {
            formData.append("postingImages", fileInput.files[0]);
        }
    }

    try {
        const response = await fetch("https://localhost:5000/api/post/create", {
            method: "POST",
            body: formData,
            credentials: "include",
        });

        const data = await response.json();
        if (response.ok) {
            alert("Post created successfully!");
            console.log(data);
        } else {
            alert("Error creating post: " + data.message);
            console.error(data);
        }
    } catch (error) {
        console.error("Error submitting post:", error);
    }
});
    fetchPosts();  
    loadMoreBtn.addEventListener('click', () => fetchPosts()); 
});

document.addEventListener("DOMContentLoaded", async () => {
    const isLoggedIn = await checkLoginStatus();

    const filterUserDiv = document.querySelector(".filter-user");
    if (isLoggedIn) {
        const userOptions = ["user-posts", "user-commented", "user-liked"];
        filterUserDiv.style.display = "block"; 

        userOptions.forEach(optionValue => {
            const optionElement = document.querySelector(`#post-block option[value="${optionValue}"]`);
            if (optionElement) {
                optionElement.hidden = false; 
            }
        });
    } else {
        filterUserDiv.style.display = "none"; 
    }
});

async function checkLoginStatus() {
    const cookies = document.cookie.split(";").reduce((acc, cookie) => {
        const [name, value] = cookie.split("=");
        acc[name.trim()] = value;
        return acc;
    }, {});

    if (cookies.token) {
        return true;
    }
        try {
            const response = await fetch("https://localhost:5000/api/users/me", {
            method: "GET",
            credentials: "include", 
            });
            if (response.ok) {
            return true;
            }
        } catch (error) {
            console.error("Error checking login status:", error);
        }

    return false;
}

