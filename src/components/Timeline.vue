<script setup lang="ts">
import { DateTime } from 'luxon';
import { ref, computed } from 'vue';
import {Post, today, thisWeek, thisMonth} from '../posts'

const periods = ['Today', 'This week', 'This month'] as const

type Period = typeof periods[number]


const selectedPeriod = ref<Period>('Today')

function selectPeriod(period: Period) {
  selectedPeriod.value = period
}

const posts = computed(() =>{ 
 return [today, thisWeek, thisMonth].map(post =>{
  return {
    ...post,
    created: DateTime.fromISO(post.created)
  }
}).filter(post =>{
  if(selectedPeriod.value === 'Today'){
    return post.created >= DateTime.now().minus({day:1})
  }

  if(selectedPeriod.value === 'This week'){
    return post.created >= DateTime.now().minus({week:1})
  }

  return post
})
})
 
</script>

<template>
  <nav class="is-primary panel">
    {{selectedPeriod}}
    <span class="panel-tabs">
      <a v-for="period of periods" :key="period" @click="selectPeriod(period)" :class="{ 'is-active': period === selectedPeriod}">
        {{period}}
      </a>
      
    </span>
  </nav>
</template>

