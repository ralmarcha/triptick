<template>
  <div class="container">
    <div class="rigth">
      <div class="div1">
        <img class="icon" src="../assets/images/ttlogo.svg" alt="tt logo" />
      </div>
      <img class="world" src="../assets/images/world.png" alt="world" />
      <div class="div4">
        <img
          id="travel"
          src="../assets/images/travel.svg"
          alt="time to travel"
        />
      </div>
    </div>

    <div class="left">
      <div class="div2">
        <img
          class="logo"
          src="../assets/images/triptick.png"
          alt="triptick logo"
        />
        <h2>Your Trip Begins Here!</h2>
        <h2 id="subTitle">Sign Up</h2>
      </div>

      <div class="div3">
        <form @submit.prevent="signUp" class="div3">
          <input
            class="inputEmail"
            type="email"
            placeholder="E-mail"
            v-model="email"
            id="email"
          />

          <input
            class="passwordInputType"
            type="password"
            placeholder="Password"
            v-model="password"
            id="password"
          />

          <input
            class="passwordInputType"
            type="password"
            placeholder="Confirm Password"
            v-model="confirmPassword"
            id="confirmPassword"
          />
          <p v-if="errorMsg" class="errorInput">
            {{ errorMsg }}
          </p>
          <button class="signUp" type="submit">Sign Up</button>
          <p class="signUp">
            <span class="">Have an account? </span>
            <PersonalRouter
              id="signIn"
              :route="route"
              :buttonText="buttonText"
            />
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import PersonalRouter from "./PersonalRouter.vue";
import { useUserStore } from "../stores/user";
import Swal from "sweetalert2";
// Route Variables
const route = "/auth/login";
const buttonText = "Sign In";
// Input Fields
const email = ref(null);
const password = ref(null);
const confirmPassword = ref(null);
const errorMsg = ref(null);
// Error Message
// Show hide password variable
// Show hide confrimPassword variable
// Router to push user once SignedUp to Log In
const redirect = useRouter();
// function to SignUp user to supaBase with a timeOut() method for showing the error
async function signUp() {
  if (password.value === confirmPassword.value) {
    try {
      await useUserStore().signUp(email.value, password.value);
      Swal.fire({
        title: "Thank You for signing up!🧡",
        text: "Please, check your inbox",
        showConfirmButton: false,
        timer: 3500,
        background: "antiquewhite",
      });

      redirect.push({ path: "/auth/login" });
    } catch (error) {
      errorMsg.value = "E-mail & Password required";
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    }
    return;
  }
  errorMsg.value = "Passwords do not match";
  setTimeout(() => {
    errorMsg.value = null;
  }, 5000);
}
</script>

<style scoped>
.container {
  max-width: 100vh;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: stretch;
}
.left {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
  margin-left: 80px;
}

.icon {
  width: 100px;
  align-self: flex-start;
  margin-bottom: 20px;
}

#travel {
  width: 200px;
}
.rigth {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  right: 0;
}

.world {
  margin: 40px 60px 40px 60px;
  width: 500px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  filter: blur(1px);
  filter: drop-shadow(5px 5px 15px black);
  transform: rotate(-15deg);
}

.div2 {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.logo {
  width: 350px;
}

.errorInput {
  color: #c42727;
}
.div3 {
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 350px;
  height: 300px;

  overflow: hidden;
  z-index: 1;
}
h2 {
  text-align: center;
  padding: 10px;
  text-transform: uppercase;
  color: #5a3d2b;
}
#subTitle {
  text-align: center;
  font-weight: lighter;
  padding-right: 100px;
}

input {
  display: block;
  height: 50px;
  width: 80%;
  margin: 0 auto;
  border: none;
}

input::placeholder {
  -webkit-transform: translateY(0px);
  transform: translateY(0px);
  -webkit-transition: 0.5s;
  transition: 0.5s;
}

input:hover,
input:focus,
input:active:focus {
  color: #cf4e3e;
  outline: none;
  border-bottom: 1px solid #cf4e3e;
  background-color: #e4e3ce;
  height: 70px;
}

input:focus::placeholder {
  color: #cf4e3e;
  -webkit-transform: translateY(-20px);
  transform: translateY(-20px);
}

.passwordInputType,
.inputEmail {
  position: relative;
  z-index: 1;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding-left: 20px;
  font-weight: lighter;
  -webkit-transition: 0.5s;
  transition: 0.5s;
}
.signIn {
  margin-top: 10px;
  text-decoration: none;
  display: inline-block;
  color: #5a3d2b;
  -webkit-transition: 0.5s;
  transition: 0.5s;
}
#signIn {
  color: #5a3d2b;
  font-weight: 600;
}
#signIn:hover {
  text-decoration: underline;
}
button {
  margin: 30px;
  align-items: center;
  border: none;
  background: #807d48;
  cursor: pointer;
  border-radius: 3px;
  padding: 10px;
  width: 100px;
  color: #5a3d2d;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.2);
  text-align: center;
}

button:hover {
  -webkit-transform: translateY(-3px);
  -ms-transform: translateY(-3px);
  transform: translateY(-3px);
  box-shadow: 0 6px 6px 0 rgba(0, 0, 0, 0.2);
}
@media screen and (max-width: 768px) {
  .rigth {
    display: none;
  }
  * {
    margin: 0;
    padding: 0;
  }
  .left {
    margin-left: 20px;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  .container {
    margin: 0;
    padding: 0;
    width: 90%;
    align-items: center;
    font-size: 0.8rem;
  }
  .icon {
    width: 80px;
  }
  .logo {
    width: 250px;
  }
  #travel {
    width: 150px;
    align-items: center;
  }
  input {
    width: 70%;
  }
  .div3 {
    margin-bottom: 0;
  }
}
@media screen and (max-width: 1024px) and (min-width: 769px) {
  * {
    font-size: 1rem;
  }
  .logo {
    width: 300px;
  }
  #travel {
    width: 250px;
    align-items: center;
  }
  input {
    width: 90%;
  }
  .rigth {
    display: none;
  }
}
</style>
