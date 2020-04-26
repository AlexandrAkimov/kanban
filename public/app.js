
window.addEventListener('load', async () => {
    const data = await request('/api/tasks');
    render(data);
})
createListBtn.addEventListener('click', () => {
    document.getElementsByClassName('modal')[0].style.display = 'flex';

})
submitCreateList.addEventListener('click', async () => {
    const body = {
        title: document.getElementsByClassName('new__name__list')[0].value,
        issues: [

        ]
    }
    await request('/api/tasks', 'POST', body);
    const data = await request('/api/tasks');
    document.getElementsByClassName('modal')[0].style.display = 'none';
    document.getElementsByClassName('new__name__list')[0].value = '';
    render(data);
})
closeCreateList.addEventListener('click', async () => {
    document.getElementsByClassName('modal')[0].style.display = 'none';
    document.getElementsByClassName('new__name__list')[0].value = '';
})
closeEditList.addEventListener('click', async () => {
    document.getElementsByClassName('modal__edit')[0].style.display = 'none';
    document.getElementsByClassName('edit__name__list')[0].value = '';

})
var isProfile = false;
document.getElementsByClassName('icon__avatar')[0]
    .addEventListener('click', () => {
        isProfile = !isProfile;
        if (isProfile) {
            document.getElementsByClassName('header__profile')[0].style.display = 'block';
            document.getElementsByClassName('kanban__tasks')[0].style.marginTop = '100px';
            document.getElementsByClassName('icon__avatar')[0].innerText = 'expand_less';
        } else {
            document.getElementsByClassName('header__profile')[0].style.display = 'none';
            document.getElementsByClassName('kanban__tasks')[0].style.marginTop = '20px';
            document.getElementsByClassName('icon__avatar')[0].innerText = 'expand_more';
        }
    })
var idx
document.getElementsByClassName('kanban__tasks')[0].addEventListener('click', async e => {
    if (e.target.classList.contains('list__item__prepare')) {
        document.getElementsByClassName('form__prepare')[idx - 1].style.display = 'none'
        const targetId = e.target.id;
        const data = await request('/api/tasks');
        const targetTask = data[idx - 1].issues.find(item => item.id === targetId)
        const previous = idx - 1;
        await request('/api/tasks/update-progress', 'POST', {
            id: targetTask.id,
            name: targetTask.name,
            description: targetTask.description,
            idx
        });
        await request('/api/tasks/update-progress', 'DELETE', {
            id: targetTask.id,
            name: targetTask.name,
            description: targetTask.description,
            idx: previous
        })
        const updateData = await request('/api/tasks');
        render(updateData);

    } else if (e.target.parentNode.children[1].textContent === 'Add card') {
        if (e.target.parentNode.id === 'btn__open__form') {
            //openForm();
            document.getElementById('btn__open__form').style.display = 'none'
            document.getElementById('submit__backlog').style.display = 'flex'
            formBacklog[0].style.display = 'flex'
        } else {
            const btns = document.querySelectorAll('.submit');
            btns.forEach((item, i) => {
                if (item === e.target.parentNode) {
                    idx = i
                }
            })
            if (idx === 0) {
                //add NEW task from form
                await request('/api/tasks/update', 'POST', {
                    id: Date.now().toString(),
                    name: document.getElementsByClassName('input__backlog')[0].value,
                    description: document.getElementsByClassName('textarea__backlog')[0].value
                })
                const dataUp = await request('/api/tasks');
                render(dataUp);
                btnOpenForm.style.display = 'flex';
                submitBacklog.style.display = 'none';
                formBacklog[0].style.display = 'none'
                nameTask.value = '';
                descriptionTask.value = '';
            } else {
                //create list prepare for moving task
                document.getElementsByClassName('form__prepare')[idx - 1].style.display = 'block';
                document.getElementsByClassName('form__prepare')[idx - 1].innerHTML = '';
                const data = await request('/api/tasks')
                data[idx - 1].issues.map(item => {
                    const li = document.createElement('li');
                    li.classList.add("list__item", "list__item__prepare");
                    li.id = item.id;
                    li.innerText = item.name
                    document.getElementsByClassName('form__prepare')[idx - 1].appendChild(li)
                })

            }
        }
    } else if (e.target.textContent === 'more_horiz') {
        const triplePoints = document.querySelectorAll('.context__article');
        triplePoints.forEach((item, i) => {
            if (item === e.target) {
                idx = i
            }
        })
        const deleteArticle = document.querySelectorAll('.delete__article');
        deleteArticle.forEach((item, i) => {
            if (idx === i) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        })
    } else if (e.target.parentNode.children[0].textContent === 'Delete') {
        const btnsDelete = document.querySelectorAll('.btn__delete');
        btnsDelete.forEach((item, i) => {
            if (item === e.target.parentNode) {
                idx = i
            }
        })
        await request('/api/tasks/remove', 'POST', {
            idx
        });
        const dataAfterRemove = await request('/api/tasks');
        render(dataAfterRemove);
    } else if (e.target.parentNode.children[0].textContent === 'Edit') {
        const btnsEdit = document.querySelectorAll('.btn__edit');
        btnsEdit.forEach((item, i) => {
            if (item === e.target.parentNode) {
                idx = i
            }
        })
        const currentNameList = document.getElementsByClassName('kanban__note__title')[idx].textContent;
        document.getElementsByClassName('edit__name__list')[0].value = currentNameList;
        document.getElementsByClassName('modal__edit')[0].style.display = 'flex';
        document.querySelectorAll('.delete__article').forEach(item => {
            item.style.display = 'none'
        })
    } else {
        document.querySelectorAll('.delete__article').forEach(item => {
            item.style.display = 'none'
        })
        return
    }
})
document.getElementsByClassName('submit__edit')[0]
.addEventListener('click', async () => {
    await request('/api/tasks/edit', 'POST', {
        title: document.getElementsByClassName('edit__name__list')[0].value,
        idx
    })
    const dataAfterEdit = await request('/api/tasks');
    document.getElementsByClassName('modal__edit')[0].style.display = 'none';
    render(dataAfterEdit);
})

