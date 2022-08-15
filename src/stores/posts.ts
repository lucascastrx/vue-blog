import { DateTime } from 'luxon'
import {defineStore} from 'pinia'
import { Period } from '../constants'
import { Post, TimelinePost } from '../posts'

interface PostsState {
  ids: string[],
  all: Map<string, Post>
  selectedPeriod: Period
}

export const usePosts = defineStore('posts',{
  state: (): PostsState => ({
    ids: [],
    all: new Map(),
    selectedPeriod: "Today"
  }),

  actions: {
    setSelectedPeriod (period: Period) {
      this.selectedPeriod = period
     },

     async fetchPosts(){
      const res = await window.fetch("/api/posts")
      const data = (await res.json()) as Post[]

      let ids: string[] = []
      let all = new Map<string, Post>()

      data.forEach(post => {
        ids.push(post.id)
        all.set(post.id, post)
      })
      
      this.ids = ids
      this.all = all
     },

      createPost (post: TimelinePost) {
        const body = JSON.stringify({...post, created: post.created.toISO() })
        console.log(body);
        
        return window.fetch("/api/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body
        }) 
      }
  },

  getters: {
    filteredPosts: (state): TimelinePost[] => {
       
        return state.ids.map(id =>{
         const post = state.all.get(id)
       
         if(!post){
           throw Error(`Post with ${id} was expected but not found`)
         }
         
         return {
           ...post,
           created: DateTime.fromISO(post.created)
         }
       }).filter(post =>{
         if(state.selectedPeriod === 'Today'){
           return post.created >= DateTime.now().minus({day:1})
         }
       
         if(state.selectedPeriod === 'This week'){
           return post.created >= DateTime.now().minus({week:1})
         }
       
         return post
       })
    }
  }
})

