<template>
  <footer>
    <div class="logo">
      <img id="logo" src="../assets/images/triptick.png" alt="triptick" />
    </div>
    <div class="socialMedia">
      <p>Connect With Us!</p>
      <ul class="list">
        <li>
          <a href="https://www.instagram.com/" target="”_blank”"
            ><img
              class="icon"
              src="../assets/images/instagram.png"
              alt="instagram logo"
          /></a>
        </li>
        <li>
          <a href="https://www.youtube.com/" target="”_blank”"
            ><img
              class="icon"
              src="../assets/images/youtube.png"
              alt="youtube logo"
          /></a>
        </li>
      </ul>
    </div>
    <div class="copyright">
      <p>COPYRIGHT</p>
      <img class="copy" src="../assets/images/COPY.svg" alt="copyright" />
      <p>TRIPTICK, {{ currentYear() }} .</p>
    </div>
  </footer>
</template>

<script setup>
import moment from "moment";

function currentYear() {
  return moment().format("YYYY");
}
</script>

<style scoped>
footer {
  margin-top: 40px;
  bottom: 0;
  width: 100%;
  height: 150px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
#logo {
  width: 150px;
}
.icon {
  width: 60px;
}
.copy {
  width: 20px;
}
.copyright {
  display: flex;
  flex-direction: row;
  font-size: 14px;
}
.socialMedia {
  display: flex;
  flex-direction: column;
  font-size: 14px;
}
.list {
  display: flex;
  flex-direction: row;
}
ul {
  margin: 10px;
}
ul li {
  list-style-type: none;
  margin: 0 10px;
}
@media screen and (max-width: 768px) {
  footer {
    height: 250px;
    display: flex;
    flex-direction: column;
  }
}
</style>
