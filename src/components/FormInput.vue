<script setup lang="ts">
import { Status } from '../validation.js';


defineProps<{
  name: string,
  status: Status,
  type: string,
  modelValue: string
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
}>()

function handleInput(e: Event){
  const value = (e.target as HTMLInputElement).value
  emit('update:modelValue', value)
}
</script>

<template>
<div class="field">
  <label :for="name" class="label is-pulled-left"> {{name}}</label>
  <div class="control">
    <input :type="type" :id="name" class="input" :value="modelValue" @input="handleInput">
  </div>
  <p class="is-danger help" v-if="!status.valid">
    {{status.message}}
  </p>
</div>
</template>
