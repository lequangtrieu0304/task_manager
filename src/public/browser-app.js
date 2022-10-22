
const tasksDom = document.querySelector('.tasks');
const inputDom = document.querySelector('.task-input');
const loadingDom = document.querySelector('.loading-text');


const showTasks = async () => {
  loadingDom.style.visibility = 'visible';
  try {
    const { data: tasks } = await axios.get('http://localhost:3000/tasks/');
    // console.log(tasks);
    if (tasks.length < 1) {
      tasksDom.innerHTML = '<h5 class="empty-list">No Task in your list</h5>';
      loadingDom.style.visibility = 'hidden';
      return;
    }
    const allTasks = tasks.map((task) => {
      const { task_id, task_completed, task_name } = task
      return `
          <div class="single-task d-flex shadow-sm mb-2" data-status="${task_completed}">
              <h5 class=" me-4"> ${task_name}</h5>

              <div class="task-links">
                  <a href="task.html?id=${task_id}" type="button" class="edit-btn" data-id="${task_id}">
                      <i class="fa fa-edit me-1"></i>
                  </a>

                  <button type="button" class="delete-btn" data-id="${task_id}">
                       <i class="fa fa-trash-alt"></i>
                  </button>
              </div>
          </div>
      `
    }).join("");

    tasksDom.innerHTML = allTasks;
  }
  catch (err) {
    console.log(err);
    tasksDom.innerHTML = '<h5 class="empty-list">There are an Error, please try later...</h5>'
  }

  loadingDom.style.visibility = 'hidden';
}

showTasks();

const formInput = document.querySelector('.task__form');
const formAlert = document.querySelector('.form__alert');

formInput.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = inputDom.value;
  try {
    await axios.post('http://localhost:3000/tasks/', { name });
    showTasks();
    inputDom.value = '';
    formAlert.style.display = 'block';
    formAlert.textContent = 'success, task added';
    formAlert.classList.add('text-success');
  }
  catch (err) {
    formAlert.style.display = 'block'
    formAlert.innerHTML = `error, please try again`
  }
  setTimeout(() => {
    formAlert.style.display = 'none';
    formAlert.classList.remove('text-success');
  }, 1000);
})

const taskAlert = document.querySelector('.task__alert')

tasksDom.addEventListener('click', async (e) => {
  if (e.target.parentElement.classList.contains('delete-btn')) {
    const task_id = e.target.parentElement.dataset.id;
    // console.log(task_id);
    loadingDom.style.visibility = 'visible';

    try {
      await axios.get(`http://localhost:3000/tasks/delete/${task_id}`)
      showTasks();
      taskAlert.style.display = 'block';
      taskAlert.textContent = `success, deleted task`;
      taskAlert.classList.add('text-danger')
    }
    catch (err) {
      console.log(err);
      taskAlert.style.display = 'block'
      taskAlert.innerHTML = `error, please try again`
    }

    setTimeout(() => {
      taskAlert.style.display = 'none';
      taskAlert.classList.remove('text-danger');
    }, 1000);
  }
  loadingDom.style.visibility = 'hidden'
})




