<script setup lang="ts">
import { DateTime } from 'luxon';
import { ref, computed } from 'vue';
import {TimelinePost, today, thisWeek, thisMonth} from '../posts'
import TimelineItem from './TimelineItem.vue'
import {usePosts} from '../stores/posts' 
import { periods, Period} from '../constants'

const postsStore = usePosts()
await postsStore.fetchPosts()


 
</script>

<template>
  {{}}
  <nav class="is-primary panel">
    {{postsStore.selectedPeriod}}
    <span class="panel-tabs">
      <a v-for="period of periods" :key="period" @click="postsStore.setSelectedPeriod(period)" :class="{ 'is-active': period === postsStore.selectedPeriod}">
        {{period}}
      </a>
    </span>
      <TimelineItem v-for="post of postsStore.filteredPosts" :key="post.id" :post="post"/>
  </nav>
</template>

<style scoped>

</style>
