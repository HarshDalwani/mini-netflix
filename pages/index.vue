<template>
    <div class="container">
        <header>
            <h1 class="title">🎬 Mini Netflix</h1>
            <SearchBar v-model="searchQuery" @search="fetchMovies" />
        </header>

        <div v-if="pending" class="spinner-container">
            <div class="spinner"></div>
        </div>

        <div v-else-if="error" class="info-text error">No results found.</div>

        <div v-else class="grid fade-in">
            <NuxtLink v-for="movie in movies" :key="movie.imdbID" :to="`/movie/details/${movie.imdbID}`" class="card">
                <img :src="movie.Poster" :alt="movie.Title" />
                <div class="card-title">{{ movie.Title }}</div>
            </NuxtLink>
        </div>
    </div>
</template>
  
  <script setup>
  import { ref } from 'vue'
  import SearchBar from '@/components/SearchBar.vue'

  const DEFAULT_MOVIE = 'harry potter'
  
  const searchQuery = ref('')
  const movies = ref([])
  const pending = ref(false)
  const error = ref(false)
  
  const fetchMovies = async () => {
    pending.value = true
    error.value = false

    try {
      const res = await $fetch(`/api/movies?s=${searchQuery.value ? searchQuery.value : DEFAULT_MOVIE}`)
      if (res.Response === 'True') {
        movies.value = res.Search
      } else {
        movies.value = []
        error.value = true
      }
    } catch {
      error.value = true
    } finally {
      pending.value = false
    }
  }
  
  fetchMovies()
  </script>
  
  <style scoped>
  body {
    background-color: #0d0d0d;
    margin: 0;
    font-family: 'Segoe UI', sans-serif;
    color: #fff;
  }
  
  .container {
    max-width: 1200px;
    padding: 2rem;
    margin: 0 auto;
  }
  
  header {
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .title {
    font-size: 2.5rem;
    color: #e50914;
    margin-bottom: 1rem;
  }
  
  .grid {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  }
  
  .card {
    background-color: #1a1a1a;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    text-decoration: none;
    color: inherit;
  }
  
  .card:hover {
    transform: scale(1.03);
    box-shadow: 0 6px 18px rgba(0,0,0,0.4);
  }
  
  .card img {
    width: 100%;
    display: block;
    object-fit: cover;
  }
  
  .card-title {
    padding: 0.75rem;
    font-weight: bold;
    font-size: 1rem;
    text-align: center;
    color: #fff;
  }
  
  .info-text {
    text-align: center;
    color: #bbb;
    font-size: 1.2rem;
    margin-top: 2rem;
  }
  
  .error {
    color: #e50914;
  }
  
  /* Mobile optimization */
  @media (max-width: 480px) {
    .title {
      font-size: 1.8rem;
    }
  
    .card-title {
      font-size: 0.9rem;
    }
  
    .container {
      padding: 1rem;
    }
  }

  .fade-in {
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.spinner-container {
  display: flex;
  justify-content: center;
  margin-top: 3rem;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e50914;
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
  