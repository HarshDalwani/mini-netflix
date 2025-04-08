<template>
    <input
      v-model="localQuery"
      @keyup.enter="emitSearch"
      type="text"
      placeholder="Search for movies and hit enter..."
      class="search-bar"
    />
  </template>
  
  <script setup>
  import { ref, watch } from 'vue'
  
  const props = defineProps({
    modelValue: String,
  })
  
  const emit = defineEmits(['update:modelValue', 'search'])
  
  const localQuery = ref(props.modelValue || '')
  
  watch(localQuery, (val) => {
    emit('update:modelValue', val)
  })
  
  function emitSearch() {
    emit('search', localQuery.value)
  }
  </script>
  
  <style scoped>
  .search-bar {
    width: 100%;
    max-width: 500px;
    padding: 12px 16px;
    font-size: 1rem;
    border-radius: 8px;
    border: none;
    outline: none;
    background-color: #1f1f1f;
    color: #fff;
    box-shadow: 0 0 0 2px #333;
    transition: box-shadow 0.2s;
  }
  
  .search-bar:focus {
    box-shadow: 0 0 0 2px #e50914;
  }
  </style>
  