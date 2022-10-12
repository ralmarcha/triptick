<template>
  <div id="homeContainer">
    <!-- 2. (NewTask, TaskItem, Footer, Nav) components are used here!  -->
    <NewNav />
    <Date />
    <!-- 5. NewTask component will receive a customEvent on this instance of the homeView that will fire the add-to-do function -->
    <div id="tasks">
      <NewTask @childNewTask="addTaskTodo" />
      <!-- 
  7. TaskItem component will loop through the tasks-array that will print an individual instance of an individual TaskItem component. TaskItem will receive 3 customEvents on this instance of the homeView. 1 customEvent for toggling the task to show either a text or an icon to display if the task is completed or not completed. 1 customEevent for removing/deleting the task out of the array. 1 customEvent for editing the task title and description. -->
      <div id="taskItem">
        <TransitionGroup name="taskTran">
          <TaskItem
            v-for="(item, index) in taskArray"
            :key="index"
            :task="item"
            @emitRemove="deleteTask"
            @emitEdit="editTask"
            @emitStatus="checkTask"
          />
        </TransitionGroup>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
//1. ref() is used here!
import NewTask from "../components/NewTask.vue";
import TaskItem from "../components/TaskItem.vue";
import { ref } from "vue";
import { useTaskStore } from "../stores/task";
import NewNav from "../components/NewNav.vue";
import Date from "../components/Date.vue";
import Footer from "../components/Footer.vue";

//lists
async function groupList(task) {
  const taskId = task.id;
  const group = task.group;
  await taskStore.groupList(group, taskId);
  readFromStore();
}

// nos definimos la tienda del usuario dentro de una constante
const taskStore = useTaskStore();
// 3. Tasks are going to be contained in an array here!
let taskArray = ref([]);

// 4. An async function is needed to get all of the tasks stored within the supabase database, this async function's body will contain the tasks value which be use to store the fetchTasks method which lives inside the userTaskStore. This function needs to be called within the setUp script in order to run within the first instance of this component lifecycle.
async function readFromStore() {
  taskArray.value = await taskStore.fetchTasks();
}
readFromStore();

// 6. add-to-do function will receive 2 params/arguments that will tak a taskTitle and a taskDescription and the body of this async function will call the taskStore that calls the addTask function from the store that pushes the info of the task to the backEnd. This is possible by passing the 2 param/arguments that will be passed by the user from the inputs within the NewTask Component.
async function addTaskTodo(task) {
  await taskStore.addTask(task.title, task.description, task.group);
  readFromStore();
}

//7.1-customEvent will fire an async function that will take in 1 param/argument. On the body of this function the param/argument will be used to define 2 constants. 1 of this constants will take care of setting the boolean value to the opposite of the value that checks wether this task is_complete. 1 of this constants will take of calling the id of this specific task in order to call the right id.
async function checkTask(task) {
  const saveBoolean = !task.is_complete;
  const saveId = task.id;
  await taskStore.checkStatus(saveBoolean, saveId);
  readFromStore();
}

//7.2-customEvent will fire an asynf function that will take in 1 param/argument. This async function's body will be used to call the deleteTaskmethod which will take the param/argument's id in order to delete the task. This function needs to call the function mentioned on hint4.
async function deleteTask(task) {
  const taskId = task.id;
  await taskStore.deleteTask(taskId);
  readFromStore();
}

//7.3-customEvent will fire an async function that will take in 1 param/argument. this async function's body will be used to take in 2 constants. 1 constant will take in the param/argument newValue. 1 constant will be used to get the param/argument oldValue id. These 2 constants will be sent to the backend via the useTaskStore which holds an editTask method. This function needs to call the function mentioned on hint4.

async function editTask(task) {
  const newTitle = task.newTitle;
  const newDescription = task.newDescription;
  const id = task.oldValue.id;
  await taskStore.editTask(newTitle, newDescription, id);
  readFromStore();
}
</script>

<style scoped>
* {
  font-family: "Roboto Mono", monospace;
  padding: 0;
  margin: 0;
  background-color: antiquewhite;
}
#homeContainer {
  display: flex;
  flex-direction: column;
  margin: 10px 10px 20px 200px;
}
#tasks {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
.taskTran-enter-active {
  transition: all 0.8s ease-out;
}
.taskTran-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.taskTran-enter-from,
.taskTran-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
@media screen and (max-width: 768px) {
  #tasks {
    display: flex;
    flex-direction: column;
  }
  #homeContainer {
    margin: 10px;
  }
}
</style>
