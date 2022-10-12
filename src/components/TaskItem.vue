<template>
  <div class="container">
    <div class="taskItem">
      <!--v-if group-->
      <!-- <h2 class="list">{{ task.group }}</h2> -->
      <div class="taskContainer" @click="showDescription = !showDescription">
        <p id="title">{{ task.title }}</p>

        <p id="desc" v-if="showDescription">
          {{ task.description }}
        </p>
        <p id="group">
          {{ task.group }}
        </p>
      </div>

      <!-- CHANGE STATUS -->
      <div class="taskEdit">
        <span v-if="task.is_complete" @click="toggleStatus" class="done"
          ><img id="done" src="../assets/images/done.svg" alt="Done icon"
        /></span>
        <span v-if="!task.is_complete" @click="toggleStatus" class="notDone"
          ><img id="notDone" src="../assets/images/notdone.svg" alt="Done icon"
        /></span>
        <!-- EDIT TASK -->
        <span class="edit" @click="handleForm"
          ><img src="../assets/images/edit.svg" alt="Done icon"
        /></span>
        <!-- DELETE TASK -->
        <span class="delete" @click="removeTask"
          ><img src="../assets/images/delete.svg" alt="Done icon"
        /></span>
      </div>
    </div>
    <!-- EDIT FORM -->
    <form v-if="showForm" @submit.prevent="editTask" class="containerFormEdit">
      <div v-if="errorHandle" class="errorMsg">{{ error }}</div>
      <div class="inputEditTask">
        <div class="title">
          <label for="inputEditTask-title"><i>Title:</i></label>
          <input
            id="inputEditTask-title"
            type="text"
            placeholder="Edit Title"
            v-model="editTitle"
          />
        </div>
        <div class="description">
          <label for="inputEditTask-desc"><i>Description:</i></label>
          <input
            id="inputEditTask-desc"
            type="text"
            placeholder="Edit Description"
            v-model="editDescription"
          />
        </div>
      </div>

      <button id="editButton" type="submit">Save</button>
    </form>
  </div>
</template>

<script setup>
import Swal from "sweetalert2";
// 1. ref() or reactive() can be used here to store the following, think if you want to store them either individually or like an object, up to you.
import { ref } from "vue";

const props = defineProps(["task", "group"]);

//2. Data properties need here are the following: a boolean to store a false**Important variable, a string to store an error, a string to store the value of the task that the user can edit, an initial false boolean to hide the inputFIeld used to edit the new task detail or details[this is in reference of the task title and the task description].

const errorHandle = ref(false);
const error = ref("");
const showForm = ref(false);
const editTitle = ref("");
const editDescription = ref("");

//3. Store the custom emit events that will be used to call the functions of the homeView for editing, deleting and toggling the status[completed, not complted] of the taskItem.

const emit = defineEmits(["emitRemove", "emitStatus", "emitEdit", "emitGroup"]);

//5. Function to handle the edit dialogue where the inputField is displayed and the string used to store the value of the inputField will be used here to save the value as a prop on this function.
const handleForm = () => {
  showForm.value = !showForm.value;
  editTitle.value = props.task.title;
  editDescription.value = props.task.description;
};

//6. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be send via the prop to the parent component. This function can control the toggle completion of the task on the homeview.

const toggleStatus = () => {
  emit("emitStatus", props.task);
};

const editTask = () => {
  if (editTitle.value === "") {
    error.value = "Enter text for title";
    errorHandle.value = true;
  } else {
    error.value = "";
    const editValues = {
      oldValue: props.task,
      newTitle: editTitle.value,
      newDescription: editDescription.value,
    };
    emit("emitEdit", editValues);

    setTimeout(() => {
      showForm.value = false;
    }, 1000);
  }
  setTimeout(() => {
    error.value = "";
  }, 3000);
};

//8. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be send via the prop to the parent component. This function can control the removal of  the task on the homeview.

const removeTask = () => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#f3a127",
    cancelButtonColor: "#cf4e3e",
    confirmButtonText: "Yes, delete it!",
    customClass: "sweetAlert sweetAlert2",
    background: "antiquewhite",
    width: 300,
    heigth: 200,
  }).then((result) => {
    if (result.isConfirmed) {
      emit("emitRemove", props.task);
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        background: "antiquewhite",
        confirmButtonColor: "#f3a127",
      });
    }
  });
};

const showDescription = ref(false);
</script>

<style scoped>
* {
  width: 100%;
  background-color: #bcbb85;
}
.taskItem {
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  outline: 1px solid #79351f;
  outline-offset: -5px;
}
.container {
  margin-bottom: 20px;
}
img {
  width: 50px;
}
.taskEdit {
  display: flex;
  flex-direction: row;
  width: 45%;
  padding-right: 10px;
}
.taskEdit:hover {
  cursor: pointer;
}
.errorMsg {
  color: #c42727;
  text-align: center;
}

#desc {
  font-size: 14px;
  height: fit-content;
  margin-top: 10px;
  margin-bottom: 10px;
}
#title {
  height: fit-content;
  margin-top: 10px;
  margin-bottom: 10px;
}
.taskContainer {
  display: flex;
  flex-direction: row;
  padding-left: 10px;
}
.containerFormEdit {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: fit-content;
  margin-bottom: 20px;
  background-color: #bcbb85;
  width: 90%;
  align-content: center;
  align-items: center;
  padding: 5px 10px;
}
.title {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.description {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
input:focus,
textarea:focus {
  outline: none;
  background-color: #feecb7;
  opacity: 0.5;
  transition: ease-in-out, width 0.35s ease-in-out;
}
::placeholder {
  color: #79351f;
  font-size: 12px;
  opacity: 0.7;
  font-style: italic;
}
button {
  flex: 1;
  height: 30px;
  max-width: 60px;
  border-radius: 5px;
  padding: 8px;
  border: 1px solid #807d48;
  background-color: #d2864c;
  color: #79351f;
  font-size: 12px;
  letter-spacing: 1px;
  text-align: center;
}

.inputEditTask {
  display: flex;
  flex-direction: column;
  width: 60%;
  height: fit-content;

  color: black;
  font-size: 12px;
  background-color: #bcbb85;
  align-items: center;
  text-align: center;
  /* width: 50%; */
}
#inputEditTask-title {
  padding: 5px 10px;
  margin-bottom: 10px;
  border: 1px solid #79351f;
  font-style: italic;
}
#inputEditTask-desc {
  padding: 5px 10px;
  margin-bottom: 10px;
  border: 1px solid #79351f;
  font-style: italic;
}
label {
  width: 40%;
}

@media screen and (max-width: 768px) {
  .taskItem {
    width: 100%;
    margin: 10px;
  }
}
</style>
