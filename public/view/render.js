const btnOpenForm = document.getElementById('btn__open__form');
const submitBacklog = document.getElementById('submit__backlog');
const submitReady = document.getElementById('submit__ready');
const submitProgress = document.getElementById('submit__progress');
const submitFinished = document.getElementById('submit__finished');
const formBacklog = document.getElementsByClassName('form__backlog');
const formReady = document.getElementsByClassName('form__ready');
const nameTask = document.getElementById('name__task');
const descriptionTask = document.getElementById('description__task');
const listBacklog = document.getElementById('list__backlog');
const listReady = document.getElementById('list__ready');
const listToReady = document.getElementById('list__to__ready');
const listProgress = document.getElementById('list__progress');
const listToProgress = document.getElementById('list__to__progress');
const listFinished = document.getElementById('list__finished');
const listToFinished = document.getElementById('list__to__finished');
const createListBtn = document.getElementsByClassName('header__button')[0];
const submitCreateList = document.getElementsByClassName('submit__create')[0];
const closeCreateList = document.getElementsByClassName('close__create')[0];
const closeEditList = document.getElementsByClassName('close__edit')[0];
const loader = document.getElementsByClassName('modal__loader')[0];
function render(data) {
    document.getElementsByClassName('kanban__tasks')[0].innerHTML = '';
    if (!data.length) {
        const h3 = document.createElement('h3');
        h3.innerText = 'You have no list yet. Click "Create new list" to add';
        h3.style.color = '#fff'
        document.getElementsByClassName('kanban__tasks')[0].appendChild(h3)
    }
    data.map((obj, i) => {

        const article = document.createElement('article');
        article.className = 'kanban__note__unit';
        const divHeader = document.createElement('div');
        divHeader.className = 'article__header';
        const pTitle = document.createElement('p');
        const contextArticle = document.createElement('i');
        const deleteArticle = document.createElement('div');
        deleteArticle.className = 'delete__article';
        const btnDelete = document.createElement('button');
        btnDelete.className = 'note__control btn__delete';
        const spanDeleteText = document.createElement('span')
        spanDeleteText.innerText = 'Delete';
        const iDeleteIcon = document.createElement('i');
        iDeleteIcon.className = 'material-icons';
        iDeleteIcon.innerText = 'delete';
        btnDelete.appendChild(spanDeleteText);
        btnDelete.appendChild(iDeleteIcon);

        const btnEdit = document.createElement('button');
        btnEdit.className = 'note__control btn__edit';
        const spanEditText = document.createElement('span')
        spanEditText.innerText = 'Edit';
        const iEditIcon = document.createElement('i');
        iEditIcon.className = 'material-icons';
        iEditIcon.innerText = 'edit';
        btnEdit.appendChild(spanEditText);
        btnEdit.appendChild(iEditIcon);

        deleteArticle.appendChild(btnEdit);
        deleteArticle.appendChild(btnDelete);
        contextArticle.className = 'material-icons context__article';
        contextArticle.innerText = 'more_horiz';
        pTitle.className = 'kanban__note__title';
        pTitle.innerText = obj.title;
        divHeader.appendChild(pTitle);
        divHeader.appendChild(contextArticle);
        divHeader.appendChild(deleteArticle);
        var pEmptyTaskList = document.createElement('p');
        pEmptyTaskList.className = 'list__empty';
        pEmptyTaskList.innerText = 'No tasks';
        const nav = document.createElement('nav');
        nav.className = 'kanban__note__nav nav__main';
        const ul = document.createElement('ul');
        ul.className = 'list list__main';
        const btnSubmit = document.createElement('button');
        btnSubmit.className = 'note__control submit';
        const iSubmit = document.createElement('i');
        iSubmit.className = 'material-icons';
        const spanSubmit = document.createElement('span');
        spanSubmit.innerText = 'Add card';
        if (i === 0) {
            const divForm = document.createElement('div');
            divForm.className = 'form__backlog';
            const labelName = document.createElement('label');
            labelName.setAttribute('for', 'name__task');
            labelName.className = 'lanel__name'
            labelName.innerText = 'Task name'
            const labelDescription = document.createElement('label');
            labelDescription.innerText = 'Description';
            labelDescription.setAttribute('for', 'description__task');
            const input = document.createElement('input');
            input.className = 'input__backlog'; input.setAttribute('type', 'text'); input.id = 'name__task';
            const textarea = document.createElement('textarea');
            textarea.className = 'textarea__backlog';
            textarea.id = 'description__task';
            textarea.setAttribute('cols', '30'); textarea.setAttribute('rows', '3')
            const btnOpen = document.createElement('button');
            btnOpen.className = 'note__control';
            btnOpen.id = 'btn__open__form';
            const iOpen = document.createElement('i');
            iOpen.className = 'material-icons'; iOpen.innerText = 'add';

            const spanOpen = document.createElement('span');
            spanOpen.innerText = 'Add card';
            iSubmit.innerText = 'add';
            btnSubmit.id = 'submit__backlog';
            obj.issues.map(item => {
                let a = document.createElement('a');
                a.className = 'list__item__link';
                a.setAttribute('href', `/api/tasks/${item.id}`);
                let li = document.createElement('li');
                li.className = 'list__item';
                li.innerText = item.name;
                a.appendChild(li);
                ul.appendChild(a)
            })
            btnOpen.appendChild(iOpen); btnOpen.appendChild(spanOpen);
            btnSubmit.appendChild(iSubmit); btnSubmit.appendChild(spanSubmit);
            divForm.appendChild(labelName);
            divForm.appendChild(input);
            divForm.appendChild(labelDescription);
            divForm.appendChild(textarea);
            nav.appendChild(ul);
            article.appendChild(divHeader);
            if (!obj.issues.length) {
                article.appendChild(pEmptyTaskList)
            }
            article.appendChild(nav);
            

            article.appendChild(divForm);
            article.appendChild(btnOpen);
            article.appendChild(btnSubmit);
            document.getElementsByClassName('kanban__tasks')[0].appendChild(article);

        } else {
            const navPrepare = document.createElement('nav');
            navPrepare.className = 'kanban__note__nav form__ready form__prepare';
            const hr = document.createElement('hr');
            const ulPrepare = document.createElement('ul');
            ulPrepare.className = 'list'
            obj.issues.map(item => {
                let a = document.createElement('a');
                a.className = 'list__item__link'
                a.setAttribute('href', `/api/tasks/${item.id}`);
                let li = document.createElement('li');
                li.className = 'list__item';
                li.innerText = item.name;
                a.appendChild(li);
                ul.appendChild(a)
            })
            console.log(data[i - 1].issues.length);

            if (data[i - 1].issues.length === 0) {
                btnSubmit.classList.add('deactivate');
                btnSubmit.setAttribute('disabled', true);
            } else {
                btnSubmit.classList.remove('deactivate')
                btnSubmit.removeAttribute('disabled', true);
            }
            //btnSubmit.className = 'deactivate';
            iSubmit.innerText = 'add'
            btnSubmit.appendChild(iSubmit);
            btnSubmit.appendChild(spanSubmit);
            nav.appendChild(ul);
            navPrepare.appendChild(hr);
            navPrepare.appendChild(ulPrepare);
            article.appendChild(divHeader);
            if (!obj.issues.length) {
                pEmptyTaskList.innerText = 'No tasks. Drag me below. Тo line'
                article.appendChild(pEmptyTaskList)
            }
            article.appendChild(nav);
            
            article.appendChild(navPrepare);
            article.appendChild(btnSubmit);
            document.getElementsByClassName('kanban__tasks')[0].appendChild(article);
        }
    })
    if (data.length === 1) {
        document.getElementsByClassName('active__num')[0].innerText = data[0].issues.length
        document.getElementsByClassName('finished__num')[0].innerText = '0'
    } else if (!data.length) {
        document.getElementsByClassName('active__num')[0].innerText = '0'
        document.getElementsByClassName('finished__num')[0].innerText = '0'
    } else {
        document.getElementsByClassName('active__num')[0].innerText = data[0].issues.length;
        document.getElementsByClassName('finished__num')[0].innerText = data[data.length - 1].issues.length;
    }

}