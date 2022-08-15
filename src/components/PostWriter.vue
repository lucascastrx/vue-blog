<script setup lang="ts">
import { marked } from 'marked'
import highlightjs from 'highlight.js'
import debounce from 'lodash/debounce'
import { ref, onMounted, watch, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { TimelinePost } from '../posts.js'
import { usePosts } from '../stores/posts.js'

const props = defineProps<{
  post: TimelinePost
}>()

const title = ref(props.post.title)
const content = ref(props.post.markdown)
const html = ref('')
const contentEditable = ref<HTMLDivElement>()

const posts = usePosts()
const router = useRouter()

// watchEffect(() => {
//   marked.parse(content.value, (err, parseResult) => {
//     html.value = parseResult
//     console.log(parseResult)
//   })
// })

function parseHtml(markdown: string){
  marked.parse(markdown, {
    gfm: true,
    breaks: true,
    highlight: (code) => {
      return highlightjs.highlightAuto(code).value
    }
   }, (err, parseResult) => {
    html.value = parseResult
    console.log(parseResult)
  })
}

watch(content, debounce((newContent) => {
   parseHtml(newContent)
}, 250), {
  immediate: true
})

onMounted(() =>{
  if(!contentEditable.value){
    throw Error('ContentEditable DOM node was not found')
  }
  contentEditable.value.innerText = content.value
})


const handleInput = () => {
  if(!contentEditable.value){
    throw Error('ContentEditable DOM node was not found')
  }
  content.value = contentEditable.value.innerText
}

 async function handleClick(){
  const newPost: TimelinePost = {
    ...props.post,
    title: title.value,
    markdown: content.value,
    html: html.value
  }
  console.log(newPost);
  
  await posts.createPost(newPost)
  router.push("/")
}
</script>


<template>
<div class="columns">
  <div class="column">
    <div class="field">
      <div class="label">Post Title: {{title}}</div>
      <input type="text" class="input" v-model="title">
      {{post}}
    </div>
  </div>
</div>

<div class="columns">
    <div class="column">
      <div
        ref="contentEditable"
        contenteditable
        @input="handleInput" />
    </div>
    <div class="column">
      <div v-html="html" />
    </div>
  </div>

  <div class="columns">
    <div class="column">
      <button class="button is-primary is-pulled-right" @click="handleClick">Save post</button>
    </div>
  </div>
</template>
