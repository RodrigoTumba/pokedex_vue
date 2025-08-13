<template>
  <v-container>
    <v-btn class="mb-4" color="secondary" @click="$router.push('/')">
      ⬅ Volver a la lista
    </v-btn>

    <v-card class="pa-4">
      <v-row>
        <v-col cols="12" md="4" class="text-center">
          <v-img
            :src="pokemon.sprites?.other['official-artwork']?.front_default"
            height="250"
            contain
          ></v-img>
        </v-col>


        <v-col cols="12" md="8">
          <h1 class="text-h3">#{{ pokemon.id }} — {{ pokemon.name }}</h1>
          <div class="my-2">
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

          <p><strong>Altura:</strong> {{ pokemon.height / 10 }} m</p>
          <p><strong>Peso:</strong> {{ pokemon.weight / 10 }} kg</p>
          <p><strong>Experiencia Base:</strong> {{ pokemon.base_experience }}</p>
          <p><strong>Habilidades:</strong></p>
          <ul>
            <li v-for="a in pokemon.abilities" :key="a.ability.name">
              {{ a.ability.name }}
            </li>
          </ul>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>


<script>
import { getPokemonById } from '../utils/pokeApi'
import { typeColors } from '../data/typeColors'

export default {
  props: ['id'],
  data() {
    return {
      pokemon: {},
      typeColors
    }
  },
  async mounted() {
    this.pokemon = await getPokemonById(this.id)
  }
}
</script>