<template>
  <div id="homeContainer">
    <NewNav />
    <Date />
    <div class="noData" v-if="dataLoaded">
      <div class="noLists" v-if="data.length === 0">
        <h1>No lists created, let's create one!</h1>
        <RouterLink to="/create"> 🧡</RouterLink>
      </div>
      <div v-else class="data">
        <RouterLink
          class="routeList"
          v-for="(list, index) in data"
          :key="index"
          :to="{ name: 'List-View', params: { listId: list.id } }"
        >
          <h1>{{ list.listName }}</h1>
        </RouterLink>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { supabase } from "../supabase";
import { useTaskStore } from "../stores/task";
import NewNav from "../components/NewNav.vue";
import Date from "../components/Date.vue";
import Footer from "../components/Footer.vue";

const data = ref([]);
const dataLoaded = ref(null);

const getData = async () => {
  try {
    const { data: lists, error } = await supabase.from("lists").select("*");
    if (error) throw error;
    data.value = lists;
    dataLoaded.value = true;
  } catch (error) {
    console.warn(error.message);
  }
};
getData();
</script>

<style scoped>
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
