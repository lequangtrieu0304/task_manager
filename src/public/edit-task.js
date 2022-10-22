
const editId = document.querySelector('.edit__id');
const editName = document.querySelector('.edit__name');
const editCompleted = document.querySelector('.edit__completed');

const params = window.location.search;
const id = new URLSearchParams(params).get('id');

const showTaskEdit = async () => {
  try {
    const { data: task } = await axios.get(`http://localhost:3000/tasks/${id}`)
    // console.log(await axios.get(`http://localhost:3000/tasks/${id}`));
    // console.log(task);

    const { task_id, task_completed, task_name } = task[0];
    editId.textContent = task_id
    editName.value = task_name
    if (task_completed) {
      editCompleted.checked = true;
    }
  }
  catch (err) {
    console.log(err);
  }
}

showTaskEdit();

const editForm = document.querySelector('.task__form');
const editBtn = document.querySelector('.edit__btn');
const formAlert = document.querySelector('.form__alert')

editForm.addEventListener('submit', async (e) => {
  editBtn.textContent = 'Loading....'
  e.preventDefault();

  try {
    const taskNameEdit = editName.value
    const taskCompletedEdit = editCompleted.checked

      await axios.post(`http://localhost:3000/tasks/edit-task/${id}`, {
      name: taskNameEdit,
      completed: taskCompletedEdit
    });

    formAlert.style.display = 'block';
    formAlert.textContent = `success, edited task`;
    formAlert.classList.add('text-success')
  }
 
  catch (err) {
    console.log(err);
  }
  editBtn.textContent = 'Edited';
  setTimeout(() => {
    formAlert.style.display = 'none';
    formAlert.classList.remove('text-success')
  }, 3000)
})
