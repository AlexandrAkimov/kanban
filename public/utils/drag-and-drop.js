var idxTarget;
var idxTargetList;
var hrefId
const DragManager = new function () {
    var dragObject = {};
    var self = this;
    const onMouseDown = e => {
        if (e.target.parentNode.hasAttribute('href')) {
            const href = e.target.parentNode.getAttribute('href')
            hrefId = href.split('/').reverse()[0];
            if (e.which != 1) return;
            var elem = e.target.parentNode
            var nav = e.target.parentNode.parentNode.parentNode;
            const navs = document.querySelectorAll('.nav__main');
            navs.forEach((el, i) => {
                if (el === nav) {
                    idxTarget = i
                }
            });
            if (!elem) return;
            dragObject.elem = elem;
            dragObject.downX = e.pageX;
            dragObject.downY = e.pageY;
            return false;
        }

    }
    const onMouseMove = e => {
        if (!dragObject.elem) return;
        if (!dragObject.avatar) {
            var moveX = e.pageX - dragObject.downX;
            var moveY = e.pageY - dragObject.downY;
            if (Math.abs(moveX) < 3 && Math.abs(moveY) < 3) {
                return;
            }
            dragObject.avatar = createAvatar(e);
            if (!dragObject.avatar) {
                dragObject = {};
                return;
            }
            var coords = getCoords(dragObject.avatar);
            dragObject.shiftX = dragObject.downX - coords.left;
            dragObject.shiftY = dragObject.downY - coords.top;
            startDrag(e);
        }
        dragObject.avatar.style.left = e.pageX - dragObject.shiftX + 'px';
        dragObject.avatar.style.top = e.pageY - dragObject.shiftY + 'px';
        return false;
    }
    const onMouseUp = async e => {
        if (e.target.parentNode.parentNode.classList.contains('list__main') || e.target.parentNode.parentNode.classList.contains('kanban__note__unit')) {
                console.log(e.target.parentNode.parentNode.classList);
                
                const targetList = e.target.parentNode.parentNode;
                const lists = document.querySelectorAll('.list__main');
                const articles = document.querySelectorAll('.kanban__note__unit');
                lists.forEach((el, i) => {
                    if (el === targetList) {
                        idxTargetList = i;
                    }
                });
                if (!idxTargetList) {
                    articles.forEach((el, i) => {
                        if (el === targetList) {
                            idxTargetList = i;
                        }
                    });
                }
                if (idxTargetList - idxTarget === 1) {

                    const data = await request('/api/tasks');
                    const targetTask = data[idxTarget].issues.find(item => item.id === hrefId)
                    await request('/api/tasks/update-progress', 'POST', {
                        id: targetTask.id,
                        name: targetTask.name,
                        description: targetTask.description,
                        idx: idxTargetList
                    });
                    await request('/api/tasks/update-progress', 'DELETE', {
                        id: targetTask.id,
                        name: targetTask.name,
                        description: targetTask.description,
                        idx: idxTarget
                    })
                    const updateData = await request('/api/tasks');
                    render(updateData);

                }
            


        }
        if (dragObject.avatar) {
            finishDrag(e);
        }
        dragObject = {};

    }
    const finishDrag = e => {
        var dropElem = findDroppable(e);
        if (!dropElem) {
            self.onDragCancel(dragObject);
        } else {
            self.onDragEnd(dragObject, dropElem);
        }
    }
    const createAvatar = e => {
        const avatar = dragObject.elem;
        const old = {
            parent: avatar.parentNode,
            nextSibling: avatar.nextSibling,
            position: avatar.position || '',
            left: avatar.left || '',
            top: avatar.top || '',
            zIndex: avatar.zIndex || ''
        };
        avatar.rollback = function () {
            old.parent.insertBefore(avatar, old.nextSibling);
            avatar.style.position = old.position;
            avatar.style.left = old.left;
            avatar.style.top = old.top;
            avatar.style.zIndex = old.zIndex
        };
        return avatar;
    }
    const startDrag = e => {
        const avatar = dragObject.avatar;
        document.body.appendChild(avatar);
        avatar.style.zIndex = 9999;
        avatar.style.position = 'absolute';
    }
    const findDroppable = event => {
        dragObject.avatar.hidden = true;
        const elem = document.elementFromPoint(event.clientX, event.clientY);
        dragObject.avatar.hidden = false;
        if (elem == null) {
            return null;
        }
        const lists = document.querySelectorAll('.list__main')
        lists.forEach(el => {
            el.classList.remove('target');
        })
        const targetEl = lists[idxTarget + 1];
        targetEl.classList.add('target');
        return elem.closest('.target');
    }
    document.onmousemove = onMouseMove;
    document.onmouseup = onMouseUp;
    document.onmousedown = onMouseDown;
    this.onDragEnd = function (dragObject, dropElem) { };
    this.onDragCancel = function (dragObject) { };
};
const getCoords = elem => {
    const box = elem.getBoundingClientRect();

    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };
}
DragManager.onDragCancel = function (dragObject) {
    dragObject.avatar.rollback();
};
DragManager.onDragEnd = function (dragObject, dropElem) {
    dragObject.elem.style.display = 'none';
    dropElem.classList.add('list__item');
    setTimeout(function () {
        dropElem.classList.remove('list__item');
    }, 200);
};