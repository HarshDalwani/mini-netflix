<template>
    <NuxtLink :to="`/movie/details/${movie.imdbID}`" class="card" aria-label="View movie details">
      <img :src="movie.Poster" :alt="movie.Title" />
      <div class="card-title">{{ movie.Title }}</div>
    </NuxtLink>
  </template>
  
  <script setup>
  defineProps(['movie'])
  </script>
  