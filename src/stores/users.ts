import { defineStore } from "pinia";
import { NewUser, User } from "../users";

interface UserState {
  currentUserId?: string
}
export const useUsers = defineStore('users', {
  state: (): UserState =>({
    currentUserId: undefined,

  }),

  actions: {
    // async fetchUsers(){
    //   const res = await window.fetch("/api/posts")
    //   const data = (await res.json()) as Post[]

    //   let ids: string[] = []
    //   let all = new Map<string, Post>()

    //   data.forEach(post => {
    //     ids.push(post.id)
    //     all.set(post.id, post)
    //   })
      
    //   this.ids = ids
    //   this.all = all
    //  },

    async authenticate(){
      try {
      const res = await window.fetch("api/current-user",{
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const result = await res.json()
      this.currentUserId = result.id
      } catch(e) {
        this.currentUserId = undefined
      }
    },

      async createUser (user: NewUser) {
        const body = JSON.stringify(user)
        console.log(body);
        
        await window.fetch("/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body
        }) 
        return this.authenticate()
      },

      async logout () {
        await window.fetch("/api/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
        }) 
        return this.authenticate()
      },

  }
})
