let $todoInput; // miejsce, gdzie użytkownik wpisuje treść zadania
let $alertInfo; // info o braku zadań / koniecznośćdodania tekstu
let $addBtn; // przycisk ADD - dodaje nowe elementy do listy
let $ulList; // nasza lista zadań, tagi <ul></ul>
let $newTask; // Nowo dodane li, nowe zadanie
let $popup; // pobrany popup
let $popupInfo; // alert w poputpie, jak się doda pusty tekst
let $editedTodo; // edytowany Todo
let $popupInput; // tekst wpisywany w inputa w popup'ie
let $addPopupBtn; // przycisk "zatwierdź" w popup'ie
let $closeTodoBtn; // przycisk od zamykania popup'a
let $idNumber = 0; //
let $allTasks;

const main = () => {
    prepareDOMElemts();
    prepareDOMEvents();
};


// Pobieramy nasze elementy
const prepareDOMElemts = () => {
    $todoInput = document.querySelector('.todoInput');
    $alertInfo = document.querySelector('.alertInfo');
    $addBtn = document.querySelector('.addBtn');
    $ulList = document.querySelector('.todoList ul');
    $popup = document.querySelector('.popup');
    $popupInfo = document.querySelector('.popupInfo');
    $popupInput = document.querySelector('.popupInput');
    $addPopupBtn = document.querySelector('.accept');
    $closeTodoBtn = document.querySelector('.cancel');
    $allTasks = $ulList.getElementsByTagName('li');
};


// Nadajemy nasłuchiwanie
const prepareDOMEvents = () => {
    $addBtn.addEventListener('click', addNewTask);
    $ulList.addEventListener('click', checkClick);
    $closeTodoBtn.addEventListener('click', closePopup);
    $addPopupBtn.addEventListener('click', changeTodo);
    $todoInput.addEventListener('keyup', enterCheck)
};

// Dodaje zadania do listy (tworzy li)
const addNewTask = () => {
    if($todoInput.value !== ''){
        $idNumber++;
        $newTask = document.createElement(`li`);
        $newTask.textContent=`${$todoInput.value}`;
        $newTask.setAttribute('id', `todo-${$idNumber}`)
        $ulList.appendChild($newTask);
        $todoInput.value = '';
        $alertInfo.innerHTML= '';
        createToolsArea();
    }else{
        $alertInfo.innerHTML= 'Wpisz treść zadania!'
    }
}

// keycode.info
const enterCheck = (event) =>{
    if(event.code === 'Enter'){
        addNewTask();
    };
}

// Dodaje narzędzia do zadań
const createToolsArea = () =>{  
        const toolsPanel = document.createElement(`div`);
        toolsPanel.classList = 'tools';
        $newTask.appendChild(toolsPanel);
    
        const completeBtn = document.createElement(`button`);
        completeBtn.classList = 'complete';
        completeBtn.innerHTML = `<i class="fas fa-check"></i>`;
    
        const editBtn = document.createElement(`button`);
        editBtn.classList = 'edit';
        editBtn.innerText= `EDIT`;
    
        const deleteBtn = document.createElement(`button`);
        deleteBtn.classList = 'delete';
        deleteBtn.innerHTML = `<i class="fas fa-times"></i>`;
    
        toolsPanel.appendChild(completeBtn);
        toolsPanel.appendChild(editBtn);
        toolsPanel.appendChild(deleteBtn);
};

// Sprawdza czy narzędzie w zadadaniu jest kliknięte
    const checkClick = (event) => {

        if (event.target.closest('button').classList.contains('complete'))
        {
            event.target.closest('li').classList.toggle('completed');
            event.target.closest('button').classList.toggle('completed');
        } else if(event.target.closest('button').className === 'edit'){
            editTask(event);
        } else if (event.target.closest('button').className === 'delete'){
            deleteTask(event);
        };
    };

    // Edycja zadania
    const editTask = (e) => {
        const oldTodo = e.target.closest('li').id;
        $editedTodo = document.getElementById(oldTodo)
        $popup.style.display = 'flex';
        $popupInput.value = $editedTodo.firstChild.textContent;
    };

// Sprawdza czy popup nie jest pusty i zmienia treść zadania
    const changeTodo = () => {
        if($popupInput.value !== ''){
            $editedTodo.firstChild.textContent = $popupInput.value;
            $popup.style.display = 'none';
            $popupInfo.innerText ='';
        } else{
            $popupInfo.innerText = 'Musisz podać jakąś treść';
        };
    }

    // Zamykanie popupa
    const closePopup = () => {
        $popup.style.display = 'none';
        $popupInfo.innerText ='';
    };

    //Usuwanie zadania
    const deleteTask = (e) => {
        const deleteTodo = e.target.closest('li');
        deleteTodo.remove();
        if($allTasks.length === 0){
            $alertInfo.innerText = 'Brak zadań na liście'
        };
    };

// DOMContentLoaded sprawia że wczyta sie tylko jedna funkcja z 
//automatu a całą reszte tylko wtedy kiedy użytkownik wywoła
document.addEventListener('DOMContentLoaded', main);