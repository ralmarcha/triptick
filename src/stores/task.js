import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore } from "./user";

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: null,
  }),
  actions: {
    async fetchTasks() {
      const { data: tasks } = await supabase
        .from("tasks")
        .select("*")
        .order("id", { ascending: false });
      this.tasks = tasks;
      return this.tasks;
    },
    async fetchLists() {
      const { data: lists } = await supabase
        .from("lists")
        .select("*")
        .order("id", { ascending: false });
      this.lists = lists;
      return this.lists;
    },

    //  Add Tasks
    async addTask(title, description) {
      const { data, error } = await supabase.from("tasks").insert([
        {
          user_id: useUserStore().user.id,
          title: title,
          is_complete: false,
          description: description,
        },
      ]);
    },
    //  Status
    async checkStatus(check, id) {
      const { data, error } = await supabase
        .from("tasks")
        .update({ is_complete: check })
        .match({ id: id });
    },
    //  Delete
    async deleteTask(id) {
      const { data, error } = await supabase
        .from("tasks")
        .delete()
        .match({ id: id });
    },

    //  Edit
    async editTask(title, description, id) {
      const { data, error } = await supabase
        .from("tasks")
        .update({ title: title, description: description })
        .match({ id: id });
    },
  },
});
