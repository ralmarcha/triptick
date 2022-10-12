<template>
  <div class="container">
    <div class="listItem">
      <!-- <RouterLink
        id="group"
        v-for="(group, index) in group"
        :Key="index"
        :to="`/list/${group}`"
      >
        {{ group }}</RouterLink
      > -->
      <RouterLink id="group" to="/list">{{ group }}</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps(["group"]);
</script>

<style scoped>
.container {
  margin-bottom: 20px;
}
.listItem {
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-transform: uppercase;
  text-align: center;
  font-size: 1.6rem;
  background-color: #fcbe6b;
  width: 150px;
  height: 100px;
  border-radius: 10px;
  outline: 1px solid #6c5a40;
  box-shadow: 3px 3px 10px#6c5a40;
  position: relative;
  overflow: hidden;
  margin: auto;
}
.listItem:hover {
  transform: scale(1.1);
  transition: 1s;
  transition-timing-function: ease;
}

#group {
  text-decoration: none;
  background-color: #fcbe6b;
  font-weight: 600;
  color: #6c5a40;
  text-align: center;
}

@media screen and (max-width: 768px) {
  .taskItem {
    width: 100%;
    margin: 10px;
  }
}
</style>
