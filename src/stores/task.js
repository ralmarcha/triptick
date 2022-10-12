import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore } from "./user";

export const useTaskStore = defineStore("lists", {
  state: () => ({
    tasks: null,
  }),
  actions: {
    async fetchLists() {
      const { data: lists } = await supabase
        .from("lists")
        .select("*")
        .order("id", { ascending: false });
      this.lists = tasks;
      return this.lists;
    },

    //  Add Tasks
    async addList(listName, taskTitle) {
      const { data, error } = await supabase.from("lists").insert([
        {
          user_id: useUserStore().user.id,
          listName: listName,
          taskTitle: taskTitle,
        },
      ]);
    },

    //  Delete
    async deleteList(id) {
      const { data, error } = await supabase
        .from("lists")
        .delete()
        .match({ id: id });
    },

    //  Edit
    async editList(listName, taskTitle, id) {
      const { data, error } = await supabase
        .from("lists")
        .update({ listName: listName, taskTitle: taskTitle })
        .match({ id: id });
    },
  },
});
