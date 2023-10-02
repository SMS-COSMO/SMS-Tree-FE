import { defineStore } from 'pinia';
import { ref } from 'vue';

export const UserStore = defineStore('user', () => {
  const loggedIn = ref(false);
  const accessToken = ref('');
  const refreshToken = ref('');
  const userId = ref('');
  const username = ref('');

  const login = (data: { accessToken: string; refreshToken: string; userId: string; username: string }) => {
    loggedIn.value = true;

    accessToken.value = data.accessToken;
    refreshToken.value = data.refreshToken;

    userId.value = data.userId;
    username.value = data.username;
  };

  const logout = () => {
    loggedIn.value = false;

    accessToken.value = '';
    refreshToken.value = '';

    userId.value = '';
    username.value = '';
  };

  return {
    loggedIn,
    accessToken,
    refreshToken,
    userId,
    username,
    login,
    logout,
  };
}, {
  persist: true,
});
