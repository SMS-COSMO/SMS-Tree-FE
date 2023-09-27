import { defineStore } from 'pinia';
import { ref } from 'vue';

export const testStore = defineStore('test', () => {
  const count = ref(localStorage.getItem('test') || '0');

  const update = (data: string) => {
    count.value = data;
    localStorage.setItem('test', data);
  };

  return { count, update };
});
