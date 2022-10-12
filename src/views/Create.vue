<template>
  <NewNav />

  <div class="listContainer">
    <div v-if="statusMessage || errorMessage">
      <p>{{ errorMessage }}</p>
      <p>{{ statusMessage }}</p>
    </div>

    <div class="form">
      <form class="formInputs">
        <h1>Add a New List</h1>

        <div class="listName">
          <input
            id="listName"
            v-model="listName"
            type="text"
            required
            placeholder="Enter a List Name"
          />
        </div>

        <div class="addTask" v-for="(item, index) in taskTitle" :key="index">
          <div class="task">
            <input
              id="task"
              required
              v-model="item.task"
              type="text"
              placeholder="Enter a title"
            />
          </div>
          <div class="description">
            <input
              id="description"
              v-model="item.description"
              type="text"
              placeholder="Enter a description"
            />
          </div>
          <div class="date">
            <input
              id="date"
              v-model="item.date"
              type="date"
              placeholder="Enter a date"
            />
          </div>
          <span class="delete" @click="deleteTask(item.id)"
            ><img src="../assets/images/delete.svg" alt="Done icon"
          /></span>
        </div>
        <button @click="addNEwTask" type="button">Add Task</button>

        <button @click.prevent="createList" type="submit">Save List</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import NewNav from "../components/NewNav.vue";
import { ref } from "vue";
import { uid } from "uid";
import { supabase } from "../supabase";

const listName = ref("");
const taskTitle = ref([]);
const statusMessage = ref(null);
const errorMessage = ref(null);

const addNEwTask = () => {
  taskTitle.value.push({
    id: uid(),
    task: "",
    descrpition: "",
    date: "",
  });
};

const deleteTask = (id) => {
  if (taskTitle.value.length > 1) {
    taskTitle.value = taskTitle.value.filter((task) => task.id !== id);
    return;
  }
  errorMessage.value = "Need to have one task minimum";
  setTimeout(() => {
    errorMessage.value = false;
  }, 3000);
};

const createList = async () => {
  try {
    const { error } = await supabase.from("lists").insert([
      {
        listName: listName.value,
        taskTitle: taskTitle.value,
      },
    ]);
    if (error) throw error;
    statusMessage.value = "List created!";
    listName.value = null;
    taskTitle.value = [""];
    setTimeout(() => {
      statusMessage.value = false;
    }, 3000);
  } catch (error) {
    errorMessage.value = `Error: ${error.message}`;
    setTimeout(() => {
      errorMessage.value = false;
    }, 3000);
  }
};
</script>

<style scoped>
* {
  font-family: "Roboto Mono", monospace;
  padding: 0;
  margin: 0;
  margin-left: 50px;
}
#homeContainer {
  display: flex;
  flex-direction: column;
  margin: 10px 10px 20px 200px;
}
.delete img {
  width: 50px;
}
#taskLogo {
  width: 150px;
  margin-top: 10px;
  transform: rotate(-15deg);
}
h1 {
  color: #203636;
  font-size: 24px;
  font-weight: 400;
  text-align: center;
  margin: 30px 0;
  padding-top: 20px;
}
.listContainer {
  outline: 1px solid #406c6c;
  outline-offset: -10px;
  width: 100%;
  margin-top: 20px;
  align-content: center;
  background-color: #63a1a5;
  width: 100%;
  margin-bottom: 20px;
}

#listName {
  font-size: 16px;
  display: block;
  width: 60%;
  height: 100%;
  padding: 5px 10px;
  background: none;
  background-image: none;
  border: 1px solid #406c6c;
  color: #406c6c;
  margin-bottom: 30px;
  transition: all 0.4s ease;
}
#listName:focus,
textarea:focus {
  outline: none;
  background-color: #74c8ae;
  opacity: 0.5;
  transition: ease-in-out, width 0.35s ease-in-out;
}
::placeholder {
  color: #406c6c;
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
  border: 1px solid #203636;
  background-color: #b2c4c4;
  color: #203636;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 1px;
}
button:hover {
  opacity: 0.8;
  -webkit-transform: translateY(-3px);
  -ms-transform: translateY(-3px);
  transform: translateY(-3px);
  box-shadow: 0 6px 6px 0 #74c8ae;
  transition: all 0.3s ease-in-out;
}
.listName {
  display: flex;
  flex-direction: column;
}
@media screen and (max-width: 768px) {
  .listContainer {
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
