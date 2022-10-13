<template>
  <div class="create-container">
    <NewNav />

    <div class="listContainer">
      <div class="form">
        <form class="formInputs">
          <h1>Add a New Travel List</h1>

          <div class="listName">
            <div>
              <input
                id="listName"
                v-model="listName"
                type="text"
                required
                placeholder="Enter a List Name"
              />
            </div>
            <div>
              <button class="addTaskButton" @click="addNEwTask" type="button">
                Add New Place
              </button>
            </div>
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
              <input id="date" v-model="item.date" type="date" />
            </div>
            <span class="delete" @click="deleteTask(item.id)"
              ><img
                class="icon"
                src="../assets/images/delete.png"
                alt="Done icon"
            /></span>
          </div>
        </form>
      </div>
    </div>
    <!-- <div v-if="statusMessage || errorMessage">
      <p>{{ errorMessage }}</p>
       <p>{{ statusMessage }}</p> 
    </div> -->
    <button class="addListButton" @click.prevent="createList" type="submit">
      Save List
    </button>
    <Footer />
  </div>
</template>

<script setup>
import NewNav from "../components/NewNav.vue";
import { ref } from "vue";
import { uid } from "uid";
import { supabase } from "../supabase";
import Footer from "../components/Footer.vue";
import Swal from "sweetalert2";

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
  if (listName.value === "") {
    statusMessage.value = true;
    let timerInterval;
    Swal.fire({
      title: "List Name is required!",
      timer: 1500,
      timerProgressBar: false,
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
  }
};
</script>

<style scoped>
* {
  font-family: "Roboto Mono", monospace;
  padding: 0;
  margin: 0;
}

.delete img {
  width: 40px;
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
.create-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.listContainer {
  display: flex;
  flex-direction: column;
  justify-items: center;
  margin-top: 40px;
  outline: 1px solid #406c6c;
  outline-offset: -10px;
  align-content: center;
  min-width: 600px;
  background-color: #63a1a5;
  text-align: center;
}

#listName {
  font-size: 16px;
  min-width: 300px;
  width: 100%;
  min-height: 40px;
  padding: 5px 10px;
  background: none;
  background-image: none;
  border: 1px solid #406c6c;
  color: #406c6c;

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
  font-size: 16px;
  opacity: 0.7;
  font-style: italic;
}
.addTaskButton {
  height: 50px;
  max-width: 80px;
  padding: 5px;
  border-radius: 10px;
  border: 1px solid #203636;
  background-color: indianred;
  color: #203636;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 1px;
}
.addListButton {
  margin-top: 40px;
  height: 60px;
  max-width: 100px;

  border-radius: 10px;
  border: 1px solid #203636;
  background-color: #74c8ae;
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
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 40px 10px;
  gap: 60px;
}
.addTask {
  display: flex;
  flex-direction: row;
  min-height: 80px;
  gap: 10px;
}
.task input {
  min-height: 30px;
}
.description input {
  min-height: 30px;
}
.date input {
  min-height: 30px;
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
