const posts = [];

const TITLE_VALIDATION_LIMIT = 100;
const TEXT_VALIDATION_LIMIT = 200;

const postTitleInputNode = document.querySelector('.js-post-title-input');
const postTextInputNode = document.querySelector('.js-post-text-input');
const newPostBtnNode = document.querySelector('.js-new-post-btn');
const postsNode = document.querySelector('.js-posts');
const validationMessage = document.getElementById('validationMessage');
const counter = document.getElementById('counter');


newPostBtnNode.addEventListener('click', function() {

const postFromUser = getPostFromUser();

addPost(postFromUser);

renderPosts();

document.getElementById("userPostTitleInput").value = "";
document.getElementById("userPostTextInput").value = "";
newPostBtnNode.disabled = true;
   
});

postTitleInputNode.addEventListener('input', disabled);

postTextInputNode.addEventListener('input', disabled);

function disabled() {
	const titleLength = postTitleInputNode.value.length;
	const textLength = postTextInputNode.value.length;

	if (
		titleLength > TITLE_VALIDATION_LIMIT ||
		textLength > TEXT_VALIDATION_LIMIT
	) {
		newPostBtnNode.setAttribute('disabled', 'true');
		return;
	}
	newPostBtnNode.removeAttribute('disabled', 'true');
}


postTitleInputNode.addEventListener('input', validation);
postTextInputNode.addEventListener('input', validation);

function validation() {
    const titleLength = postTitleInputNode.value.length;
    const textLength = postTextInputNode.value.length;
    
 if (titleLength > TITLE_VALIDATION_LIMIT) {
        validationMessage.innerText = `Длинна заголовка не должна превышать ${TITLE_VALIDATION_LIMIT} символов`;
        validationMessage.classList.remove('validationMessage_hidden');
        return; 
    }

    if (textLength > TEXT_VALIDATION_LIMIT) {
        validationMessage.innerText = `Длинна текста не должна превышать ${TEXT_VALIDATION_LIMIT} символов`;
        validationMessage.classList.remove('validationMessage_hidden');
        return; 
    }

    if (titleLength === 0 || textLength === 0 ) {

        newPostBtnNode.disabled = true;
        return;
    }

    validationMessage.classList.add ('validationMessage_hidden');
    
}

function countCharacters()  {

    let userPostTitleInput = document.getElementById('userPostTitleInput').value;
    let userPostTextInput = document.getElementById('userPostTextInput').value;
    let titleCount = TITLE_VALIDATION_LIMIT - userPostTitleInput.length;
    let textCount = TEXT_VALIDATION_LIMIT - userPostTextInput.length;
    document.getElementById('titleCount').innerText = titleCount;
    document.getElementById('textCount').innerText = textCount;
}

function getPostFromUser() {
    const title = postTitleInputNode.value;
	const text = postTextInputNode.value;

return {
    title:title,
    text: text
};
}

function addPost({title, text }) {
    const currentDate = new Date ();
    const dt = `${currentDate.toLocaleDateString()} / ${currentDate.toLocaleTimeString()}`;
 posts.unshift({
    dt,
     title,
     text
});
}

function getPosts() {
    return posts;
}

function renderPosts() {
    const posts = getPosts();

   let postsHTML = '';

posts.forEach(post => {
    postsHTML += ` <div class='post'>
    <p class="post__date">${post.dt}</p>
    <p class="post__title">${post.title}</p>
    <p class='post__text'>${post.text}</p>
    </div>    `
});
   postsNode.innerHTML = postsHTML;      
}
