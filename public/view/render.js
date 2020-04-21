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
function render(data) {
    listBacklog.innerHTML = '';
    listReady.innerHTML = '';
    listProgress.innerHTML = '';
    listFinished.innerHTML = '';
    console.log(data);
    data.map(o => {
        switch (o.title) {
            case 'Backlog':
                document.getElementsByClassName('kanban__note__title')[0].innerText = o.title
                if (o.issues.length) {
                    submitReady.classList.add('note__control');
                    submitReady.removeAttribute('disabled');
                    o.issues.map(item => {
                        let a = document.createElement('a');
                        a.setAttribute('href', `/api/tasks/${item.id}`)
                        let li = document.createElement('li');
                        li.className = 'list__item';
                        li.innerText = item.name;
                        a.appendChild(li);
                        listBacklog.appendChild(a)
                    })
                } else {
                    let li = document.createElement('li');
                    li.className = 'list__empty';
                    li.innerText = 'no tasks on this topic';
                    listBacklog.appendChild(li);
                    submitReady.classList.remove('note__control');
                    submitReady.setAttribute('disabled', true);
                }

                break;
            case 'Ready':
                document.getElementsByClassName('kanban__note__title')[1].innerText = o.title
                if (o.issues.length) {
                    submitProgress.classList.add('note__control');
                    submitProgress.removeAttribute('disabled');
                    o.issues.map(item => {
                        let a = document.createElement('a');
                        a.setAttribute('href', `/api/tasks/${item.id}`)
                        let li = document.createElement('li');
                        li.className = 'list__item';
                        li.innerText = item.name;
                        a.appendChild(li);
                        listReady.appendChild(a)
                    })
                } else {
                    let li = document.createElement('li');
                    li.className = 'list__empty';
                    li.innerText = 'no tasks on this topic';
                    listReady.appendChild(li);
                    submitProgress.classList.remove('note__control');
                    submitProgress.setAttribute('disabled', true);
                }
                
                break;
            case 'In progress':
                document.getElementsByClassName('kanban__note__title')[2].innerText = o.title
                if (o.issues.length) {
                    submitFinished.classList.add('note__control');
                    submitFinished.removeAttribute('disabled');
                    o.issues.map(item => {
                        let a = document.createElement('a');
                        a.setAttribute('href', `/api/tasks/${item.id}`)
                        let li = document.createElement('li');
                        li.className = 'list__item';
                        li.innerText = item.name;
                        a.appendChild(li);
                        listProgress.appendChild(a)
                    })
                } else {
                    let li = document.createElement('li');
                    li.className = 'list__empty';
                    li.innerText = 'no tasks on this topic';
                    listProgress.appendChild(li);
                    submitFinished.classList.remove('note__control');
                    submitFinished.setAttribute('disabled', true);
                }
                
                break;
            case 'Finished':
                document.getElementsByClassName('kanban__note__title')[3].innerText = o.title
                if (o.issues.length) {
                    o.issues.map(item => {
                        let a = document.createElement('a');
                        a.setAttribute('href', `/api/tasks/${item.id}`)
                        let li = document.createElement('li');
                        li.className = 'list__item';
                        li.innerText = item.name;
                        a.appendChild(li);
                        listFinished.appendChild(a)
                    })
                } else {
                    let li = document.createElement('li');
                    li.className = 'list__empty';
                    li.innerText = 'no tasks on this topic';
                    listFinished.appendChild(li)
                }
                
                break;
            default:
                break;
        }
    })
    if (data.length) {
        document.getElementsByClassName('active__num')[0].innerHTML = data[0].issues.length
    } else {
        document.getElementsByClassName('active__num')[0].innerHTML = '0'
    }
    if (data.length === 4) {
        document.getElementsByClassName('finished__num')[0].innerHTML = data[3].issues.length
    } else {
        document.getElementsByClassName('finished__num')[0].innerHTML = '0'
    }
}