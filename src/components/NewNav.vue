<template>
  <header>
    <div id="displayFlex">
      <div class="branding">
        <RouterLink to="/"
          ><img id="logo" src="../assets/images/ttlogo.svg" alt="tt logo"
        /></RouterLink>
        <RouterView />
      </div>
      <div class="displayOnMobile" id="userIcon" @click="openUserMenu">
        <span class="bar" :class="{ 'icon-active': mobileNav }"></span>
        <span class="bar" :class="{ 'icon-active': mobileNav }"></span>
        <span class="bar" :class="{ 'icon-active': mobileNav }"></span>
      </div>

      <div class="dontDisplayOnMobile" id="navigation">
        <div class="link">
          <RouterLink class="rout" to="/"> Home</RouterLink>
          <RouterLink class="rout" to="/create"> NewList</RouterLink>
          <RouterLink class="rout" to="/list"> Lists </RouterLink>
          <p>
            Nice to see you <span>{{ name }}</span>
          </p>
        </div>

        <button type="submit" @click="logOut">LogOut</button>
      </div>
    </div>
    <Transition name="mobile-nav">
      <nav
        v-show="mobileNav"
        class="displayOnMobile displayNone"
        id="mobileUserMenu"
      >
        <RouterLink class="rout-drop" to="/"> Home</RouterLink>
        <RouterLink class="rout-drop" to="/create"> Create</RouterLink>
        <RouterLink class="rout-drop" to="/list"> List</RouterLink>
        <p class="link-drop" @click="logOut">LogOut</p>
      </nav>
    </Transition>
    <hr />
  </header>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { RouterLink, RouterView } from "vue-router";
import { useUserStore } from "../stores/user";

const mobileNav = ref(false);
//constant to save a variable that will hold the use router method
const userStore = useUserStore();
// constant to save a variable that will get the user from store with a computed function imported from vue
const user = userStore.user;

// constant that calls user email from the useUSerStore
const userEmail = user.email;
// constant that saves the user email and cleans out the @client from the user
const name = userEmail.replace(/@.*$/, "");
// async function that calls the signOut method from the useUserStore and pushes the user back to the Auth view.
const redirect = useRouter();
const logOut = async () => {
  try {
    await userStore.signOut();
    // Swal.fire("Hello Vue world!!!");
    redirect.push({ path: "/auth/login" });
  } catch (error) {
    errorMsg.value = `Error: ${error.message}`;
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
  }
};

function openUserMenu() {
  let userMenu = document.getElementById("mobileUserMenu");
  userMenu.classList.toggle("displayNone");
  mobileNav.value = !mobileNav.value;
}
</script>

<style scoped>
img {
  width: 80px;
}
header {
  z-index: 99;
  width: 100%;
  transition: 0.5s ease all;
}
#displayFlex {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  margin: 0 auto;
  height: 80px;
  padding: 12px 0;
  transition: 0.5s ease all;
  @media (min-width: 1140px) {
    max-width: 1140px;
  }
}
.link {
  display: flex;
  flex-direction: row;
  text-decoration: none;
  gap: 40px;
  transition: 0.5s ease all;
  font-size: 0.8rem;
}
.rout {
  color: #6c4040;
  font-size: 1rem;
  text-decoration-line: none;
}
.rout:hover {
  text-decoration-line: underline;
}

* {
  margin: 0;
}

button {
  padding: 5px 20px;
  background: #c25649;
  border: 1px solid #6c4040;
  color: #6c4040;
  border-radius: 10px;
  text-align: center;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 400;
  cursor: pointer;
  transition: 0.5s;
  box-shadow: 2px 2px 5px #6c5a40;
}
button:hover {
  background-color: #c16a1b;
  border: 1px solid #6c4040;
  color: #6c4040;
  box-shadow: 2px 2px 5px #6c5a40;
}
hr {
  box-shadow: 2px 2px 5px #999;
}
.displayOnMobile {
  cursor: pointer;
}

@media screen and (min-width: 601px) {
  .displayOnMobile {
    display: none;
  }

  #navigation {
    display: flex;
    gap: 20px;
    align-items: center;
  }
}
@media screen and (max-width: 600px) {
  .dontDisplayOnMobile {
    display: none;
  }
  .displayOnMobile {
    display: block;
  }
  #userIcon {
    display: flex;
    flex-direction: column;
    position: absolute;
    align-items: center;
    right: 24px;
    cursor: pointer;
  }
  .bar {
    width: 30px;
    height: 3px;
    background-color: #dd7210;
    transition: 0.8s ease all;
    margin: 5px auto;
  }
  .icon-active {
    transform: rotate(180deg);
  }
  .link {
    transition: 0.5s ease all;
  }
  #mobileUserMenu {
    position: fixed;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 100px;
    height: 100%;
    background-color: antiquewhite;
    padding: 60px 20px 0 20px;
    top: 0;
  }
  .rout-drop {
    color: #6c4040;
    font-size: 1rem;
    text-decoration-line: none;
    margin-bottom: 30px;
  }
  .rout-drop:hover {
    text-decoration-line: underline;
  }
  .link-drop {
    margin-left: 0;
    padding: 5px 15px;
    background: #c25649;
    border: 1px solid #6c4040;
    color: #6c4040;
    border-radius: 10px;
    text-align: center;
    text-decoration: none;
    font-size: 1rem;
    font-weight: 400;
    cursor: pointer;
    transition: 0.5s;
    box-shadow: 2px 2px 5px #6c5a40;
  }

  .mobile-nav-enter-active {
    transition: 1s ease all;
  }
  .mobile-nav-leave-active {
    transition: 1s ease all;
  }
  .mobile-nav-enter-from {
    transform: translateX(-100px);
  }
  .mobile-nav-leave-to {
    transform: translateX(-100px);
  }
  .mobile-nav-enter-to {
    transform: translateX(0);
  }
}
.displayNone {
  display: none;
}
</style>
