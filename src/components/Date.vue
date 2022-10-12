<template>
  <div>
    <h3>
      Let the Adventure <br />Begin Today<br />
      {{ currentDate() }}
    </h3>
  </div>
</template>

<script setup>
import moment from "moment";

function currentDate() {
  return moment().format("MMM Do YY");
}
</script>

<style scoped>
* {
  align-items: center;
  width: 100%;
  height: 300px;
  padding-top: 50px;
  background-color: transparent;
}
div {
  display: flex;
  justify-content: center;
  z-index: 5;
  padding: 20px;
  position: relative;
  width: 90%;
  margin: 20px 0;
  filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.7));
}
div::before {
  content: "";
  position: absolute;
  z-index: -1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: url(../assets/images/carretera.png) center center;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  opacity: 0.7;
  border-radius: 40px;
}

h3 {
  position: relative;
  text-align: center;
  margin-top: 130px;
  color: white;
  font-size: 28px;
  font-weight: 300;
}
@media screen and (max-width: 768px) {
  h3 {
    font-size: 24px;
    height: 150px;
    margin-top: 40px;
  }
}
</style>
