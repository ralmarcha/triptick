<template>
  <div id="homeContainer">
    <NewNav />

    <div class="taskList">
      <div v-if="statusMessage || errorMessage">
        <p>{{ errorMessage }}</p>
        <p>{{ statusMessage }}</p>
      </div>
    </div>

    <div v-if="dataLoaded" class="dataLoaded">
      <div class="titleList">
        <div class="newInputs">
          <input v-if="edit" type="text" v-model="data.listName" />
          <h1 v-else>{{ data.listName }}</h1>
        </div>

        <div class="edit" @click="editMode">
          <img class="icon" src="../assets/images/edit.png" alt="edit icon" />
          <img
            @click="deleteList"
            class="icon"
            src="../assets/images/delete.png"
            alt="delete icon"
          />
        </div>
      </div>

      <div class="editMode">
        <div
          class="tasksView"
          v-for="(item, index) in data.taskTitle"
          :key="index"
        >
          <div class="name">
            <label for="task-name">Place</label>
            <input
              v-if="edit"
              id="task"
              v-model="item.task"
              type="text"
              placeholder="Enter a title"
            />
            <h3 v-else>{{ item.task }}</h3>
          </div>
          <div class="name">
            <label for="description">Description</label>
            <input
              v-if="edit"
              id="description"
              v-model="item.description"
              type="text"
              placeholder="Enter a description"
            />
            <h3 v-else>{{ item.description }}</h3>
          </div>
          <div class="name">
            <label for="date">Date</label>
            <input v-if="edit" id="date" v-model="item.date" type="date" />
            <h3 v-else>{{ item.date }}</h3>
          </div>
          <img
            @click="deleteTask(item.id)"
            v-if="edit"
            class="icon"
            src="../assets/images/delete.png"
            alt="delete icon"
          />
        </div>

        <button
          @click="addNEwTask"
          v-if="edit"
          type="button"
          class="addTaskButton"
        >
          Add New Place
        </button>
      </div>
    </div>
    <button class="addListButton" @click="updateList" v-if="edit" type="button">
      Update List
    </button>
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { supabase } from "../supabase";
import { useRoute, useRouter } from "vue-router";
import { useTaskStore } from "../stores/task";
import { useUserStore } from "../stores/user";
import NewNav from "../components/NewNav.vue";
import Date from "../components/Date.vue";
import Footer from "../components/Footer.vue";
import { uid } from "uid";

const data = ref(null);
const dataLoaded = ref(null);
const statusMessage = ref(null);
const errorMessage = ref(null);
const route = useRoute();
const router = useRouter();
const currentId = route.params.listId;
const getData = async () => {
  try {
    const { data: lists, error } = await supabase
      .from("lists")
      .select("*")
      .eq("id", currentId);
    if (error) throw error;
    data.value = lists[0];
    dataLoaded.value = true;
  } catch (error) {
    errorMessage.value = error.message;
    setTimeout(() => {
      errorMessage.value = false;
    }, 3000);
  }
};
getData();

const edit = ref(null);
const editMode = () => {
  edit.value = !edit.value;
};

const deleteList = async () => {
  try {
    const { error } = await supabase.from("lists").delete().eq("id", currentId);
    if (error) throw error;
    router.push({ name: "Home" });
  } catch (error) {
    errorMessage.value = `Error: ${error.message}`;
    setTimeout(() => {
      errorMessage.value = false;
    }, 3000);
  }
};

const addNEwTask = () => {
  data.value.taskTitle.push({
    id: uid(),
    task: "",
    descrpition: "",
    date: "",
  });
};

const deleteTask = (id) => {
  if (data.value.taskTitle.length > 1) {
    data.value.taskTitle = data.value.taskTitle.filter(
      (task) => task.id !== id
    );
    return;
  }
  errorMessage.value = "Need to have one task minimum";
  setTimeout(() => {
    errorMessage.value = false;
  }, 3000);
};

const updateList = async () => {
  try {
    const { error } = await supabase
      .from("lists")
      .update({
        listName: data.value.listName,
        taskTitle: data.value.taskTitle,
      })
      .eq("id", currentId);

    if (error) throw error;
    edit.value = false;
    statusMessage.value = "List updated!";

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
}
.editMode {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.dataLoaded {
  border: 1px solid grey;
}
.addTaskButton {
  height: 50px;
  margin: 10px 0;
  max-width: 90px;
  padding: 5px;
  border-radius: 10px;
  border: 1px solid #203636;
  background-color: lightsteelblue;
  color: #203636;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 1px;
}

.addListButton {
  margin-top: 40px;
  height: 60px;
  max-width: 100px;
  padding: 5px;
  border-radius: 10px;
  border: 1px solid #203636;
  background-color: darkgrey;
  color: #203636;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 1px;
}
.icon {
  width: 40px;
  cursor: pointer;
}
.taskList {
  margin-top: 40px;
}
.titleList {
  display: flex;
  flex-direction: row;
  min-width: 500px;
  justify-content: space-between;
  height: 100px;
  background-color: darkgrey;
}
.newInputs h1 {
  text-transform: uppercase;
}
.edit {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;
}

.tasksView {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
  background-color: lightsteelblue;
  width: 100%;
  min-height: 60px;
}
label {
  vertical-align: top;
  font-size: small;
  font-style: italic;
}
.name {
  display: flex;
  flex-direction: column;
}
footer {
  margin-top: 150px;
}
#homeContainer {
  display: flex;
  flex-direction: column;
  margin: 20px 100px;
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
