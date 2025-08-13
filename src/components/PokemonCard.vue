<template>
  <v-card class="ma-2" elevation="4" max-width="250">
    <v-img
      :src="pokemon.sprites?.front_default"
      height="150"
      contain
      class="mt-2"
    ></v-img>

    <v-card-title class="text-h6 text-center">
      #{{ pokemon.id }} — {{ pokemon.name }}
    </v-card-title>

    <v-card-text class="text-center">
      <div>
        <v-chip
          v-for="t in pokemon.types"
          :key="t.type.name"
          :color="typeColors[t.type.name]"
          text-color="white"
          class="ma-1"
        >
          {{ t.type.name }}
        </v-chip>
      </div>
      <div class="mt-2">
        <small>Altura: {{ pokemon.height / 10 }} m</small><br />
        <small>Peso: {{ pokemon.weight / 10 }} kg</small>
      </div>
    </v-card-text>

    <v-card-actions class="justify-center">
      <v-btn color="primary" @click="$router.push(`/pokemon/${pokemon.id}`)">
        Ver detalles
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { typeColors } from '../data/typeColors'

export default {
  name: 'PokemonCard',
  props: {
    pokemon: {
      type: Object,
      required: true
    }
  },
  data() {
    return { typeColors }
  }
}
</script>
