<template>
    <div v-if="isLoading" class="loader-overlay">
      <div class="loader-spinner"></div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  
  const isLoading = ref(false)
  const router = useRouter()
  
  onMounted(() => {
    router.beforeEach((to, from, next) => {
      isLoading.value = true
      next()
    })
  
    router.afterEach(() => {
      setTimeout(() => {
        isLoading.value = false
      }, 400) // delay for smoother UX
    })
  })
  </script>
  
  <style scoped>
  .loader-overlay {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  }
  
  .loader-spinner {
    width: 50px;
    height: 50px;
    border: 5px solid #e50914;
    border-top-color: transparent;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  </style>
  