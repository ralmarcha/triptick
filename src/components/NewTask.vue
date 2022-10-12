<template>
  <div class="container">
    <img id="taskLogo" src="../assets/images/task.png" alt="task image" />
    <h1>Add a New Task</h1>
    <div class="flex">
      <input
        id="title"
        v-model="title"
        type="text"
        placeholder="Enter a title"
      />
      <input
        id="description"
        v-model="description"
        type="text"
        placeholder="Enter a description"
      />
      <input
        id="group"
        v-model="group"
        type="text"
        placeholder="Enter a List Name"
      />
      <!-- <select name="" id="">
      <option value=""></option>
    </select> -->
      <button @click.prevent="addNewTask">Add</button>
    </div>
    <div>
      <h3 v-if="errorNoValue">{{ errorMessage }}</h3>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Swal from "sweetalert2";

// constant to save a variable that define the custom event that will be emitted to the homeView
const emit = defineEmits(["childNewTask"]);
// constant to save a variable that holds the value of the title input field of the new task
let title = ref("");
// constant to save a variable that holds the value of the description input field of the new task
let description = ref("");
let group = ref("");
// constant to save a variable that holds an initial false boolean value for the errorMessage container that is conditionally displayed depending if the input field is empty
const errorNoValue = ref(false);
// const constant to save a variable that holds the value of the error message
const errorMessage = ref("");
// arrow function to call the form holding the task title and task description that uses a conditional to first checks if the task title is empty, if true the error message is displayed through the errorMessage container and sets a timeOut method that hides the error after some time. Else, its emmits a custom event to the home view with the task title and task description; clears the task title and task description input fields.
const addNewTask = () => {
  if (title.value === "") {
    errorNoValue.value = true;
    let timerInterval;
    Swal.fire({
      title: "Title & List Name are required!",
      timer: 1500,
      timerProgressBar: false,
      background: "antiquewhite",
      width: 300,
      heigth: 100,
      customClass: {
        title: "swal2-title",
      },
      didOpen: () => {
        Swal.showLoading();
        const b = Swal.getHtmlContainer().querySelector("b");
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft();
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
      }
    });
  } else {
    const newTask = {
      title: title.value,
      description: description.value,
    };

    emit("childNewTask", newTask);
    title.value = "";
    description.value = "";
    group.value = "";
  }
};
</script>

<style scoped>
* {
  align-content: center;
  background-color: #fcbe6b;
  width: 100%;
  margin-bottom: 20px;
}
#taskLogo {
  width: 150px;
  margin-top: 10px;
  transform: rotate(-15deg);
}
h1 {
  color: #79351f;
  font-size: 24px;
  font-weight: 400;
  text-align: center;
  margin-bottom: 30px;
}
.container {
  outline: 1px solid #79351f;
  outline-offset: -10px;
  width: 100%;
  margin-top: 20px;
}

input {
  font-size: 16px;
  display: block;
  width: 80%;
  height: 100%;
  padding: 5px 10px;
  background: none;
  background-image: none;
  border: 1px solid #79351f;
  color: #79351f;
  margin-bottom: 30px;
  transition: all 0.4s ease;
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
  height: 40px;
  max-width: 100px;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #807d48;
  background-color: #d2864c;
  color: #79351f;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 1px;
}
button:hover {
  opacity: 0.8;
  -webkit-transform: translateY(-3px);
  -ms-transform: translateY(-3px);
  transform: translateY(-3px);
  box-shadow: 0 6px 6px 0 #5a3d2b;
  transition: all 0.3s ease-in-out;
}
.flex {
  display: flex;
  flex-direction: column;
}
@media screen and (max-width: 768px) {
  .container {
    width: 100%;
    margin: 10px;
  }
  #taskLogo {
    display: none;
  }
  h1 {
    margin-top: 30px;
  }
}
</style>
