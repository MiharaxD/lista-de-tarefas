const form = document.getElementById('todo-form')
const input = document.getElementById('todo-input')
const list = document.getElementById('todo-list')
const counter = document.getElementById('task-counter')

let tasks = []

// Carregar tarefas do localStorage
function loadTasks() {
    const data = localStorage.getItem('tasks')
    if (data) {
        tasks = JSON.parse(data)
    }
    renderTasks()
}
// Salvar tarefas no localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}
// Atualiza o contador
function updateCounter() {
    counter.textContent = tasks.length
}
// Renderizar a lista de tarefas
function renderTasks() {
    list.innerHTML = ''
    tasks.forEach((task) => {
        const li = document.createElement('li')
        li.classList.add('task')

        const checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.checked = task.complete

        const label = document.createElement('label')
        label.textContent = task.desc

        const button = document.createElement('button')
        button.type = 'button'
        button.innerHTML = '<i class="ph ph-trash"></i>'
        //Marcar como concluido
        checkbox.addEventListener('change', () => {
            task.complete = checkbox.checked
            saveTasks()
        })
        // Excluir tarefas
        button.addEventListener('click', () => {
            tasks = tasks.filter(item => item.id !== task.id)
            saveTasks()
            renderTasks()
        })

        li.appendChild(checkbox)
        li.appendChild(label)
        li.appendChild(button)
        list.appendChild(li)
    })
    updateCounter()
}

// Adicionar uma tarefa
form.addEventListener('submit', (event) => {
    event.preventDefault()
    const desc = input.value.trim()
    if (!desc) return
    tasks.push({
        id: Date.now(),
        desc,
        complete: false
    })
    saveTasks()
    renderTasks()

    input.value = ''
    input.focus()
})
function updateDateTime() {
    const currentDate = document.getElementById('current-date')
    const newDate = new Date()

    currentDate.textContent = newDate.toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
}
updateDateTime()
loadTasks()
