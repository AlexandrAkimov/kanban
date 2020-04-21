
nameTask.addEventListener('focus', () => {
    nameTask.style.borderBottom = '2px solid #007ac0'
})
descriptionTask.addEventListener('focus', () => {
    descriptionTask.style.borderBottom = '2px solid #007ac0'
})
nameTask.addEventListener('blur', () => {
    nameTask.style.borderBottom = '1px solid #454545'
})
descriptionTask.addEventListener('blur', () => {
    descriptionTask.style.borderBottom = '1px solid #454545'
})
btnOpenForm.addEventListener('click', () => {
    btnOpenForm.style.display = 'none'
    submitBacklog.style.display = 'flex'
    formBacklog[0].style.display = 'flex'
})
submitBacklog.addEventListener('click', async () => {
    const body = {
        title: 'Backlog',
        issues: [
            {
                id: Date.now().toString(),
                name: nameTask.value,
                description: descriptionTask.value
            }
        ]
    }

    const data = await request('/api/tasks')
    const candidate = data.length
 
    if (!candidate) {
        await request('/api/tasks', 'POST', body)
        const dataNew = await request('/api/tasks');
        render(dataNew);
    } else {
        await request('/api/tasks/update', 'POST', {
            id: Date.now().toString(),
            name: nameTask.value,
            description: descriptionTask.value
        })
        const dataUp = await request('/api/tasks');
        render(dataUp);
    }
    btnOpenForm.style.display = 'flex'
    submitBacklog.style.display = 'none'
    formBacklog[0].style.display = 'none'
    nameTask.value = ''
    descriptionTask.value = ''
})
submitReady.addEventListener('click', async () => {
    listToReady.innerHTML = ''
    document.getElementsByClassName('form__ready')[0].style.display = 'block'
    const data = await request('/api/tasks')
    console.log(data);
    data[0].issues.map(item => {
        const li = document.createElement('li');
        li.classList.add("list__item", "list__item__prepare");
        li.id = item.id;
        li.innerText = item.name
        listToReady.appendChild(li)
    })
})
listToReady.addEventListener('click', async (e) => {
    document.getElementsByClassName('form__ready')[0].style.display = 'none'
    const targetId = e.target.id;
    const data = await request('/api/tasks');
    const targetTask = data[0].issues.find(item => item.id === targetId)
    const body = {
        title: 'Ready',
        issues: [
            {
                id: targetTask.id,
                name: targetTask.name,
                description: targetTask.description
            }
        ]
    }
    const candidate = data.length;
    if (candidate < 2) {
        await request('/api/tasks', 'POST', body);
        await request('/api/tasks/update', 'DELETE', {
            id: targetTask.id,
            name: targetTask.name,
            description: targetTask.description
        })
        const dataNew = await request('/api/tasks');
        render(dataNew)
    } else {
        await request('/api/tasks/update-ready', 'POST', {
            id: targetTask.id,
            name: targetTask.name,
            description: targetTask.description
        });
        await request('/api/tasks/update', 'DELETE', {
            id: targetTask.id,
            name: targetTask.name,
            description: targetTask.description
        })
        const updateData = await request('/api/tasks');
        
        render(updateData);
    }
})
submitProgress.addEventListener('click', async () => {
    listToProgress.innerHTML = ''
    document.getElementsByClassName('form__progress')[0].style.display = 'block'
    const data = await request('/api/tasks')
    console.log(data);
    data[1].issues.map(item => {
        const li = document.createElement('li');
        li.classList.add("list__item", "list__item__prepare");
        li.id = item.id;
        li.innerText = item.name
        listToProgress.appendChild(li)
    })
})
listToProgress.addEventListener('click', async (e) => {
    document.getElementsByClassName('form__progress')[0].style.display = 'none'
    const targetId = e.target.id;
    const data = await request('/api/tasks');
    const targetTask = data[1].issues.find(item => item.id === targetId)
    const body = {
        title: 'In progress',
        issues: [
            {
                id: targetTask.id,
                name: targetTask.name,
                description: targetTask.description
            }
        ]
    }
    const candidate = data.length;
    if (candidate < 3) {
        await request('/api/tasks', 'POST', body);
        await request('/api/tasks/update-ready', 'DELETE', {
            id: targetTask.id,
            name: targetTask.name,
            description: targetTask.description
        })
        const dataNew = await request('/api/tasks');
        render(dataNew)
    } else {
        await request('/api/tasks/update-progress', 'POST', {
            id: targetTask.id,
            name: targetTask.name,
            description: targetTask.description
        });
        await request('/api/tasks/update-ready', 'DELETE', {
            id: targetTask.id,
            name: targetTask.name,
            description: targetTask.description
        })
        const updateData = await request('/api/tasks');
        
        render(updateData);
    }
})
submitFinished.addEventListener('click', async () => {
    listToFinished.innerHTML = ''
    document.getElementsByClassName('form__finished')[0].style.display = 'block'
    const data = await request('/api/tasks')
    console.log(data);
    data[2].issues.map(item => {
        const li = document.createElement('li');
        li.classList.add("list__item", "list__item__prepare");
        li.id = item.id;
        li.innerText = item.name
        listToFinished.appendChild(li)
    })
})
listToFinished.addEventListener('click', async (e) => {
    document.getElementsByClassName('form__finished')[0].style.display = 'none'
    const targetId = e.target.id;
    const data = await request('/api/tasks');
    const targetTask = data[2].issues.find(item => item.id === targetId)
    const body = {
        title: 'Finished',
        issues: [
            {
                id: targetTask.id,
                name: targetTask.name,
                description: targetTask.description
            }
        ]
    }
    const candidate = data.length;
    if (candidate < 4) {
        await request('/api/tasks', 'POST', body);
        await request('/api/tasks/update-progress', 'DELETE', {
            id: targetTask.id,
            name: targetTask.name,
            description: targetTask.description
        })
        const dataNew = await request('/api/tasks');
        render(dataNew)
    } else {
        await request('/api/tasks/update-finished', 'POST', {
            id: targetTask.id,
            name: targetTask.name,
            description: targetTask.description
        });
        await request('/api/tasks/update-progress', 'DELETE', {
            id: targetTask.id,
            name: targetTask.name,
            description: targetTask.description
        })
        const updateData = await request('/api/tasks');
        
        render(updateData);
    }
})
window.addEventListener('load', async () => {
    const data = await request('/api/tasks');
    render(data);
})
