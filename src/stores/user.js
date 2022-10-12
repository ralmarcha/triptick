import { defineStore } from "pinia";
import { supabase } from "../supabase";
import Swal from "sweetalert2";
export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
  }),
  actions: {
    async fetchUser() {
      const user = await supabase.auth.user();
      this.user = user;
    },
    async signIn(email, password) {
      const { user, error } = await supabase.auth.signIn({
        email: email,
        password: password,
      });
      if (error) throw error;
      if (user) {
        this.user = user;
        //  console.log(this.user);
      }
    },
    async signUp(email, password) {
      const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) throw error;
      if (user) {
        this.user = user;
        // console.log(this.user);
      }
    },
    //Logout
    async signOut() {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      Swal.fire({
        title: "See you soon!",
        text: "Keep yoour dreams organized 🧡",
        imageUrl:
          "https://www.vanessatravels.net/wp-content/uploads/2020/11/viajar-en-furgoneta-camper-libertad-1024x724.jpg.webp",
        imageWidth: 400,
        imageHeight: 250,
        imageAlt: "Bye van",
        confirmButtonColor: "#63a1a5",
        background: "antiquewhite",
      });
    },

    persist: {
      enabled: true,
      strategies: [
        {
          key: "user",
          storage: localStorage,
        },
      ],
    },
  },
});
