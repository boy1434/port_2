$(function() {
    addTask();
    modeClick();
});

let addBtn = $('.add_btn');
let taskList = [];
let underLine = $('.task_under_line');
let tabs = $('.task_tabs div');
let mode = 'all';
let filterList = [];

function modeClick() {
    tabs.each(function(index, menu) {
        if (index > 0) {
            $(menu).on('click', function(e) {
                filter(e);
                moveBar(e);
            });
        }
    });

    function moveBar(e) {
        let left = e.currentTarget.offsetLeft + "px";
        let width = e.currentTarget.offsetWidth + "px";
        let top = (e.currentTarget.offsetTop + e.currentTarget.offsetHeight +$('.task_tabs').offsetHeight) + "px";
        
        underLine.stop().animate({
            left: left,
            width: width,
            top: top
        }, 300, function() {
            tabs.each(function(index, menu) {
                if (index > 0) {
                    $(menu).on('click', function(e) {
                        tabs.off('click');
                        moveBar(e);
                        filter(e);
                    });
                }
            });
        });
    }
}

function addTask() {
    addBtn.on('click', function(e) {
        e.preventDefault();
        let userInput = $('.user_input').val();
        let task = {
            id: createRandomId(),
            taskContent: userInput,
            isComplete: false
        };
        if(userInput == '') {
            alert("할일을 입력해주세요.")
        } else {

            $('.user_input').val('');
            taskList.push(task);
            $('.container_bg').css('display', 'flex').fadeOut(500);
        }
        filter();
    });
}

function render() {
    let list = [];
    if (mode === "all") {
        list = taskList;
    } else {
        list = filterList;
    }
    let result = '';
    for (let i = 0; i < list.length; i++) {
        if (list[i].isComplete) {
            result += `<div class="task completed">
                    <p class="task_done">${list[i].taskContent}</p>
                    <div>
                        <button onclick="returnClick('${list[i].id}')"><i class="fa-solid fa-rotate-left"></i></button>
                        <button onclick="deleteClick('${list[i].id}')"><i class="fa-solid fa-delete-left"></i></button>
                    </div>
                </div>`;
        } else {
            result += `<div class="task">
                    <p>${list[i].taskContent}</p>
                    <div>
                        <button onclick="completeClick('${list[i].id}')"><i class="fa-solid fa-check"></i></button>
                        <button onclick="deleteClick('${list[i].id}')"><i class="fa-solid fa-delete-left"></i></button>
                    </div>
                </div>`;
        }
    }
    $('.task_board').html(result);
}

function completeClick(id) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id === id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    filter();
}

function deleteClick(id) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id === id) {
            taskList.splice(i, 1);
            break;
        }
    }
    filter();
}

function returnClick(id) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id === id) {
            taskList[i].isComplete = false;
            break;
        }
    }
    filter();
}

function filter(e) {
    if (e) {
        mode = e.target.id;
    }
    filterList = [];
    if (mode === 'all') {
        filterList = taskList;
    } else if (mode === 'ing') {
        for (let i = 0; i < taskList.length; i++) {
            if (!taskList[i].isComplete) {
                filterList.push(taskList[i]);
            }
        }
    } else if (mode === 'end') {
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].isComplete) {
                filterList.push(taskList[i]);
            }
        }
    }
    render();
}

function createRandomId() {
    return '_' + Math.random().toString(36).substring(2, 9);
}

