// start loader------------
window.onload = () => {
    $('.loader').fadeOut(1500);
}


// catch switchs-------
let wrapper1 = document.querySelector('.wrapper1'),
wrapper2 = document.querySelector('.wrapper2'),
shape = document.querySelector('.wrapper2 .shape'),
show_delall = document.querySelector('.show_delall'),
delete_all = document.querySelector('.delete_all'),
add_btn = document.getElementById('add-btn'),
add_list = document.querySelector('.add_list');

// add btn----
add_btn.addEventListener('click' , function () {
    add_list.classList.toggle('addlist-toogle');
    this.classList.toggle('add-btn-toogle');
});


// backarrow------
function backArrow() {
    wrapper1.style.cssText = `
        transform: translateX(0);
        `;
    wrapper2.style.cssText = `
        transform: translateX(100%);
        `;
}


// show_delall----
show_delall.addEventListener('click' , () => delete_all.classList.toggle('toogle_delete_all'));
// delete_all-----
delete_all.addEventListener('click' , () => {
    localStorage.clear();
    window.location.reload();
});



// choose img------
let imgOptions = document.querySelectorAll('.img-options img');
imgOptions.forEach(img => {
    img.addEventListener('click' , (e) => {
        imgOptions.forEach(img => img.classList.remove('active-img'));
        e.target.classList.add('active-img');
    });
});







// lets_go_btn , adding user data-----------------------------------------
let lets_go_btn = document.getElementById('lets_go_btn');
let usernameInput = document.getElementById('username');
let user_name = document.querySelector('.user-info h1');
let user_image = document.querySelector('.user-icon img');
let pop_con = document.querySelector('.pop-con');
let popupMessage = document.querySelector('.popup h4');
// get personal option---
let personalOption = document.querySelector('[value = "personal"]');

// userdata condition
if(localStorage.username && localStorage.userimage) {
    user_name.innerHTML = `Hello ${localStorage.username}`;
    user_image.src = localStorage.userimage;
    pop_con.style.display = 'none';
    add_btn.style.visibility = 'visible';
    personalOption.dataset.img = `${localStorage.userimage}`;
}



lets_go_btn.addEventListener('click' , () => {
    let imgDone = false;
    imgOptions.forEach(img => {
        if(img.classList.contains('active-img') && usernameInput.value !== '') {
            localStorage.userimage = img.src;
            user_image.src = localStorage.userimage;
            imgDone = true;
        }
    });
    if(usernameInput.value !== '' && imgDone) {
        popupMessage.remove();
        localStorage.username = usernameInput.value.trim(' ');
        user_name.innerHTML = `Hello ${localStorage.username}`;
        pop_con.style.display = 'none';
        add_btn.style.visibility = 'visible';
        personalOption.dataset.img = `${localStorage.userimage}`;
    }
    else {
        popupMessage.innerHTML = ``;
        popupMessage.innerHTML = 'you should choose an icon and fill the input';
    }
});




// get inputs values-----
let cancel_task_btn = document.getElementById('cancel_task_btn');
let add_task_btn = document.getElementById('add_task_btn');
let taskInput = document.getElementById('task_name');
let categoryInput = document.getElementById('category');
let category_list = document.querySelector(".category_list");
let options = document.querySelectorAll('option');
let caregory_head = document.querySelector('.caregory-head');
let tasks_list = document.querySelector('.tasks_list');


// cancel task----------
cancel_task_btn.addEventListener('click', () => {
    taskInput.value = '';
    categoryInput.value = '';
});



// conditon to show category data----------
if(localStorage.categories) {
    // get loac category data---
    let loaclCategory = JSON.parse(localStorage.categories);
    // loop through category------
    for(let i = 0; i < loaclCategory.length; i++) {
        category_list.innerHTML += `
        <li onclick = "showTasks(this);">
            <div class="img">
                <img src="${loaclCategory[i].img}" alt="icon">
            </div>
            <div class="category-name">
                <h3>${loaclCategory[i].title}</h3>
            </div>
            <i class="fa-solid fa-ellipsis-vertical dots"></i>
        </li>
        `;
    }
}


// add task---------------------------------------------
let tasksObj; // task objectData...
add_task_btn.addEventListener('click',() => {
    // get category icons----
    let icon;
    options.forEach(op => op.value === categoryInput.value ? icon = op.getAttribute("data-img") : '');

    // condetion to check values is not empty------
    if(taskInput.value && categoryInput.value) {
        // delete message---
        if (document.querySelector('.error')) document.querySelector('.error').remove(); 

        // get values as array of objects----
        let categoryObj = {
            'title' : categoryInput.value,
            'img' : icon
        };
        tasksObj = {
            'task' : taskInput.value.trim(''),
            'category' : categoryInput.value
        };

        // pass values------
        showCategory(categoryObj);
        // loop to active tasks ------
        let liLists = category_list.children;
        for(let i = 0; i < liLists.length; i++) {
            // condition to click on wanted category
            if(liLists[i].children[1].firstElementChild.innerHTML === tasksObj.category){
                liLists[i].click();
            }
        }

        // empty inputs---
        taskInput.value = '';
        categoryInput.value = '';
    }
    else {
        let h4 = document.createElement('h4');
        h4.textContent = 'Please fill all fields';
        h4.style.color = '#fff';
        h4.classList.add('error');
        add_list.prepend(h4);
    }
});




// show catgories from loacl storage------
function showCategory(categoryObj) {
    // clear innerHTML----
    category_list.innerHTML = ``;

    // check if there is loaclstorage or not----
    if(localStorage.categories) {
        // get localstorage category data-----
        let categoryArray = JSON.parse(localStorage.categories);
        // filter data first -----
        if(!localStorage.categories.includes(JSON.stringify(categoryObj))){
            categoryArray.push(categoryObj);
            // assign new data to loaclstorage category--
            localStorage.categories = JSON.stringify(categoryArray);
        }

        // loop to show categories---
        let localStorageCategory = JSON.parse(localStorage.categories);
        for(let i = 0; i < localStorageCategory.length; i++) {
            category_list.innerHTML += `
            <li onclick = "showTasks(this);">
                <div class="img">
                    <img src="${localStorageCategory[i].img}" alt="icon">
                </div>
                <div class="category-name">
                    <h3>${localStorageCategory[i].title}</h3>
                </div>
                <i class="fa-solid fa-ellipsis-vertical dots"></i>
            </li>
            `;
        }
    }
    else {
        // pass array of categories to loacl storage--------
        localStorage.categories = JSON.stringify([categoryObj]);
        categoryArray = JSON.parse(localStorage.categories);
        category_list.innerHTML = `
        <li onclick = "showTasks(this)">
            <div class="img">
                <img src="${categoryArray[0].img}" alt="icon">
            </div>
            <div class="category-name">
                <h3>${categoryArray[0].title}</h3>
            </div>
            <i class="fa-solid fa-ellipsis-vertical dots"></i>
        </li>
        `;
    }
}


// show caregory_head data (switch to tasks)(show tasks)-----------------------
function showTasks(li) {
    // change view--------
    wrapper1.style.cssText = `
        transform: translateX(-100%);
    `;
    wrapper2.style.cssText = `
        transform: translateX(0);
    `;
    // get shape div from wrapper2-----
    wrapper2.firstElementChild.style.height = "20%";    
    // ----------------------------------------------------------
    let categoryName = li.children[1].firstElementChild.innerHTML;
    let icon = li.children[0].firstElementChild.src; 
    caregory_head.innerHTML = `
        <div class="user-icon">
            <img src="${icon}" alt="icon">
        </div>
        <div>
            <h3>${categoryName}</h3>
        </div>
        <button onclick="deleteCategory(this)">
            Delete
        </button>
    `;
    //-------------------------------------------------------------
    // clear tasks_list------------
    tasks_list.innerHTML = '';
    // tasksdata------------------
    let tasksData = tasksObj;
    // check if there is loaclstorage or not and tasksObject is not empty----
    if(localStorage.tasks && tasksData) {
        // get localstorage category data-----
        let tasksArray = JSON.parse(localStorage.tasks);
        // filter data first -----
        if(!localStorage.tasks.includes(JSON.stringify(tasksData))){
            tasksArray.push(tasksData);
            // assign new data to loaclstorage category--
            localStorage.tasks = JSON.stringify(tasksArray);
        }
        // loop to show categories---
        let localStorageTasks = JSON.parse(localStorage.tasks);
        for(let i = 0; i < localStorageTasks.length; i++) {
            // get related tasks data-----
            if(localStorageTasks[i].category === categoryName) {
                tasks_list.innerHTML += `
                <div class="task">
                    <label for= task-${i + 1}>
                        <input id="task-${i + 1}" type="checkbox">
                        <svg viewBox="0 0 64 64" height="1em" width="1em">
                            <path d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16" pathLength="575.0541381835938" class="path"></path>
                        </svg>
                        <span>${localStorageTasks[i].task}</span>
                    </label>
                    <i onclick="deleteTask(this);" class="fa-solid fa-trash-can delete-task"></i>
                </div>
            `;
            }
        }
    }
    // if there are tasks and user want to see--
    else if (localStorage.tasks) {
        // loop to show categories---
        let localStorageTasks = JSON.parse(localStorage.tasks);
        for(let i = 0; i < localStorageTasks.length; i++) {
            // get related tasks data-----
            if(localStorageTasks[i].category === categoryName) {
                tasks_list.innerHTML += `
                <div class="task">
                    <label for= task-${i + 1}>
                        <input id="task-${i + 1}" type="checkbox">
                        <svg viewBox="0 0 64 64" height="1em" width="1em">
                            <path d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16" pathLength="575.0541381835938" class="path"></path>
                        </svg>
                        <span>${localStorageTasks[i].task}</span>
                    </label>
                    <i onclick="deleteTask(this);" class="fa-solid fa-trash-can delete-task"></i>
                </div>
            `;
            }
        }
    }
    else {
        // pass array of categories to loacl storage--------
        localStorage.tasks = JSON.stringify([tasksData]);
        tasksArray = JSON.parse(localStorage.tasks);
        tasks_list.innerHTML = `
        <div class="task">
            <label for= task-${i + 1}>
                <input id="task-${i + 1}" type="checkbox">
                <svg viewBox="0 0 64 64" height="1em" width="1em">
                    <path d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16" pathLength="575.0541381835938" class="path"></path>
                </svg>
                <span>${localStorageTasks[i].task}</span>
            </label>
            <i onclick="deleteTask(this);" class="fa-solid fa-trash-can delete-task"></i>
        </div>
        `;
    }
}


// deleteCategory------------
function deleteCategory(btn) {
    // get category name-----
    let categoryName = btn.previousElementSibling.children[0].innerHTML;
    // get localstorage category data----
    let categoryData = JSON.parse(localStorage.categories);
    // filter data----
    let filterdCategory = categoryData.filter(cate => cate.title !== categoryName);
    // assing the new category data to local storage----
    localStorage.categories = JSON.stringify(filterdCategory);

    // delete realted tasks ----
    // get loaclstorage tasks data----
    let localTasks = JSON.parse(localStorage.tasks);
    let newTaskData = localTasks.filter(ta => ta.category !== categoryName);
    // assing the new task data to local storage----
    localStorage.tasks = JSON.stringify(newTaskData);

    // back to category---
    backArrow();
    // refresh to show changes----
    window.location.reload();
}


// deleteTask---------
function deleteTask(li) {
    // get loaclstorage tasks data----
    let localTasks = JSON.parse(localStorage.tasks);
    // get task element----
    let task = li.parentElement;
    let taskName = task.firstElementChild.lastElementChild.innerHTML;
    // return a new array of tasks without the task name
    let newTasks = localTasks.filter(ta => ta.task !== taskName);
    // assgin newTasks to localStorage.tasks
    localStorage.tasks = JSON.stringify(newTasks);
    task.remove();
}


// checkedTask---------
// function checkedTask(label) {
//     let checkInput = label.firstElementChild;
//     let taskName = label.lastElementChild.innerHTML;

//     if(checkInput.checked) {
//         // check if there is checked task or not
//         if(localStorage.checkedTask) {
//             // get checkedtasks-----
//             let checkedTasksArray = JSON.parse(localStorage.checkedTask);
//             checkedTasksArray.push(taskName);
//             localStorage.checkedTask = JSON.stringify(checkedTasksArray);
//         }
//         else localStorage.checkedTask = JSON.stringify([taskName]);
//     }
//     else {
//         console.log('not checked');
//     }
// }




// delete all -------
delete_all.addEventListener('click' , () => localStorage.clear());