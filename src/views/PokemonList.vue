<template>
  <v-container fluid>
    <HeaderFilters @filter-changed="setFilter" />

    <v-row justify="center" class="mt-4">
      <v-btn :disabled="page === 0" @click="prevPage">Anterior</v-btn>
      <v-btn class="ml-2" :disabled="!canNext" @click="nextPage">Siguiente</v-btn>
    </v-row>


    
    <v-text-field
      v-model="searchTerm"
      label="Buscar Pokémon"
      prepend-inner-icon="mdi-magnify"
      hide-details
      clearable
      class="mt-4"
    />

    <v-row v-if="loading" justify="center" align="center" class="mt-8">
      <v-progress-circular indeterminate color="primary" size="64" />
    </v-row>

    <v-row v-else-if="filteredPokemons.length === 0" justify="center" class="mt-8">
      <v-col cols="12" class="text-center">
        <p>No hay Pokémones encontrados</p>
      </v-col>
    </v-row>

    <v-row v-else justify="center">
      <v-col
        v-for="p in filteredPokemons"
        :key="p.id"
        cols="12" sm="6" md="4" lg="3"
      >
        <PokemonCard :pokemon="p" />
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
import HeaderFilters from '../components/HeaderFilters.vue'
import PokemonCard from '../components/PokemonCard.vue'
import { getPokemonList, getPokemonById, getPokemonsByType } from '../utils/pokeApi'

export default {
  components: { HeaderFilters, PokemonCard },
  data() {
    return {
      selectedType: 'all',
      pokemons: [],
      loading: false,
      page: 0,
      pageSize: 20,
      typePokemonList: [],
      typePokemonListType: null,
      hasMore: true,
      searchTerm: '' 
    }
  },
  computed: {
    isTypeMode() {
      return this.selectedType !== 'all'
    },
    totalTypePages() {
      if (!this.isTypeMode) return null
      return Math.ceil(this.typePokemonList.length / this.pageSize)
    },
    canNext() {
      if (this.isTypeMode) {
        return this.page < (this.totalTypePages - 1)
      }
      return this.hasMore
    },
    filteredPokemons() {
      const term = this.searchTerm.trim().toLowerCase()
      return this.pokemons
        .filter(p => {
          if (this.selectedType === 'all') return true
          return p.types?.some(t => t.type.name === this.selectedType)
        })
        .filter(p => {
          if (!term) return true
          return p.name.toLowerCase().includes(term)
        })
    }
  },
  methods: {
    async loadPokemons() {
      this.loading = true
      try {
        const offset = this.page * this.pageSize
        const list = await getPokemonList(this.pageSize, offset)
        const details = await Promise.all(
          list.map(p => getPokemonById(p.name))
        )
        this.pokemons = details
        this.hasMore = list.length === this.pageSize
      } catch (e) {
        console.error(e)
        this.pokemons = []
      } finally {
        this.loading = false
      }
    },
    async loadPokemonsByType(typeName) {
      this.loading = true
      try {
        if (!this.typePokemonList.length || this.typePokemonListType !== typeName) {
          this.typePokemonList = await getPokemonsByType(typeName)
          this.typePokemonListType = typeName
        }
        const start = this.page * this.pageSize
        const slice = this.typePokemonList.slice(start, start + this.pageSize)
        const details = await Promise.all(
          slice.map(p => getPokemonById(p.name))
        )
        this.pokemons = details
      } catch (e) {
        console.error(e)
        this.pokemons = []
      } finally {
        this.loading = false
      }
    },
    setFilter(type) {
      this.selectedType = type
      this.page = 0
      if (type === 'all') {
        this.loadPokemons()
      } else {
        this.loadPokemonsByType(type)
      }
    },
    nextPage() {
      if (!this.canNext) return
      this.page++
      if (this.isTypeMode) {
        this.loadPokemonsByType(this.selectedType)
      } else {
        this.loadPokemons()
      }
    },
    prevPage() {
      if (this.page === 0) return
      this.page--
      if (this.isTypeMode) {
        this.loadPokemonsByType(this.selectedType)
      } else {
        this.loadPokemons()
      }
    }
  },
  mounted() {
    this.loadPokemons()
  }
}
</script>