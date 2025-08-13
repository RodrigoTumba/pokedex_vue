<template>
  <v-container class="py-4">
    <v-row align="center" justify="space-between">
      <v-col cols="12" md="3" class="d-flex align-center">
        <v-img
          src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
          max-width="150"
          class="me-4"
        />
      </v-col>

      <v-col cols="12" md="9" class="d-flex flex-wrap">
        <v-chip
          class="ma-1"
          color="grey"
          text-color="white"
          @click="$emit('filter-changed', 'all')"
        >
          Ver todos
        </v-chip>
        <v-chip
          v-for="(color, type) in typeColors"
          :key="type"
          class="ma-1"
          :color="color"
          text-color="white"
          @click="$emit('filter-changed', type)"
        >
          {{ type }}
        </v-chip>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { typeColors } from '../data/typeColors'

export default {
  name: 'HeaderFilters',
  data() {
    return {
      typeColors
    }
  }
}
</script>