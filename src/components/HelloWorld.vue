<template>
  <div class="hello">
    <h2>¡Hola, deb!</h2>
    <button @click="changeGreeting">Cambiar Saludo</button>
    <p>{{ greeting }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface Greeting {
  text: string;
}

export default defineComponent({
  name: 'HelloWorld',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      greeting: 'Pagina arrechisima lita'
    }
  },
  methods: {
    changeGreeting(): void {
      const greetings: Greeting[] = [
        { text: 'Lito' },
        { text: 'hOla deb' },
        { text: ':3' }
      ];
      const randomIndex = Math.floor(Math.random() * greetings.length);
      this.greeting = greetings[randomIndex].text;
    }
  }
});
</script>

<style scoped>
.hello {
  margin: 20px;
}

button {
  padding: 10px 20px;
  margin: 10px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #3aa876;
}

p {
  color: #666;
  margin-top: 20px;
}
</style>