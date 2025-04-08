<template>
  <div class="container">
    <button class="back-button" @click="$router.back()">← Back</button>

    <div v-if="movie">
      <div class="movie-details">
        <img :src="movie.Poster" :alt="movie.Title" class="poster" />

        <div class="info">
          <h1>{{ movie.Title }}</h1>
          <p class="plot">{{ movie.Plot }}</p>
          <p class="rating">⭐ {{ movie.imdbRating }}</p>
          <p><strong>🎭 Genre:</strong> {{ movie.Genre }}</p>
          <p><strong>📅 Released:</strong> {{ movie.Released }}</p>
          <p><strong>🎬 Director:</strong> {{ movie.Director }}</p>
        </div>
      </div>
    </div>

    <div v-else>
      <p class="error">Movie not found or failed to load.</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const route = useRoute()
const movie = ref(null)

const movieId = route.params.id

try {
  const res = await $fetch(`/api/movies?i=${route.params.id}`)
  if (res.Response === 'True') {
    movie.value = res
  }
} catch (e) {
  console.error('Failed to load movie:', e)
}
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: 5rem auto;    /* top/bottom spacing */
  padding: 2rem 1rem;
  color: #fff;
  background-color: #141414;
}


.back-button {
  background-color: #e50914;
  color: #fff;
  border: none;
  padding: 10px 18px;
  font-size: 1rem;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 1.5rem;
  transition: background 0.2s ease;
}

.back-button:hover {
  background-color: #bf0812;
}

.movie-details {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: flex-start;
}

.poster {
  width: 100%;
  max-width: 300px;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.6);
}

.info {
  flex: 1;
  min-width: 250px;
}

h1 {
  margin-top: 0;
  font-size: 2rem;
  color: #fff;
}

.plot {
  margin: 1rem 0;
  font-size: 1.1rem;
  color: #ccc;
}

.rating {
  font-weight: bold;
  font-size: 1.2rem;
  color: #f5c518;
  margin-bottom: 1rem;
}

.error {
  color: #f87171;
  text-align: center;
  font-size: 1.2rem;
}
</style>
