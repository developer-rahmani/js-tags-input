const container = document.querySelector('.container-tag');
const input = container.querySelector('input');

let data = [];

const initialDom = () => {
    container.insertAdjacentHTML(
        'beforeend',
        `
            <div class="error"></div>
            <div class="tags"></div>
        `
    );
};
initialDom();

const createDomTags = () => {
    const tags = document.querySelector('.tags');
    let result = '';
    for (let item of data) {
        result += `<div class="tag" target=${item.id}><span>${item.text}</span><span class="rmvItem">&times</span></div>`;
    }
    tags.innerHTML = result;
    removeItem();
};

const removeItem = () => {
    const rmvItem = document.querySelectorAll('.rmvItem');
    for (let item of [...rmvItem]) {
        item.addEventListener('click', () => {
            data = data.filter((checkItem) => checkItem.id !== +item.parentElement.getAttribute('target'));
            createDomTags();
        });
    }
};

input.addEventListener('keypress', (e) => {
    document.querySelector('.error').innerHTML = '';
    if (e.key === 'Enter' || e.key === ';') {
        showError();

        data.forEach((item) => {
            if (item.text.includes(input.value.trim())) {
                data = data.filter((item) => item.text !== input.value.trim());
            }
        });

        if (input.value.trim() !== '') {
            data.push({
                text: input.value.trim(),
                id: Date.now(),
            });
        }

        createDomTags();

        input.value = '';
    }
});

const showError = () => {
    for (let item of data) {
        if (item.text.includes(input.value.trim())) {
            document.querySelector('.error').innerHTML = 'There is this word';
        }
    }
};
