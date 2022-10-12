<template>
  <div id="homeContainer">
    <NewNav />
    <Date />
    <div id="lists">
      <div id="listItem">
        <TransitionGroup name="listTran">
          <ListItem
            id="item"
            v-for="(item, index) in groupArray"
            :key="index"
            :group="item"
        /></TransitionGroup>
      </div>
      <NewList id="newList" @childNewGroup="addGroupTodo" />
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "../stores/task";
import NewNav from "../components/NewNav.vue";
import Date from "../components/Date.vue";
import Footer from "../components/Footer.vue";
import NewList from "../components/NewList.vue";
import ListItem from "../components/ListItem.vue";

const taskStore = useTaskStore();

const groupArray = ref([]);

async function readFromStore() {
  groupArray.value = await taskStore.fetchTasks();
  // console.log(groupArray.value[0].group);
  groupArray.value = extractGroups(groupArray);
}
readFromStore();

async function addGroupTodo(task) {
  await taskStore.addGroup(task.group);
  readFromStore();
}

function extractGroups(extract) {
  let arrayResult = [];
  for (let i = 0; i < extract.value.length; i++) {
    arrayResult[i] = extract.value[i].group;
  }
  //console.log(arrayResult);
  arrayResult = [...new Set(arrayResult)];
  //console.log(arrayResult);
  return arrayResult;
}
</script>

<style>
* {
  font-family: "Roboto Mono", monospace;
  padding: 0;
  margin: 0;
  /* background-color: antiquewhite; */
}
#newList {
  margin-bottom: 50px;
}
#homeContainer {
  display: flex;
  flex-direction: column;
}
#lists {
  width: 80%;
}
#item {
  text-align: center;
  margin-bottom: 40px;
  margin-top: 40px;
}
#listItem {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
}
.listTran-enter-active {
  transition: all 0.8s ease-out;
}
.listTran-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.listTran-enter-from,
.listTran-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
@media screen and (max-width: 768px) {
  #homeContainer {
    margin: 10px;
  }
}
</style>
