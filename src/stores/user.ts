import { defineStore } from 'pinia';
import { ref } from 'vue';

export const UserStore = defineStore('user', () => {
  const loggedIn = ref(localStorage.getItem('loggedIn') === 'true' ? true : false || false);
  const accessToken = ref(localStorage.getItem('accessToken') || null);
  const refreshToken = ref(localStorage.getItem('refreshToken') || null);
  const userId = ref(localStorage.getItem('userId') || null);
  const username = ref(localStorage.getItem('username') || null);

  const login = (data: { accessToken: string; refreshToken: string; userId: string; username: string }) => {
    loggedIn.value = true;
    localStorage.setItem('loggedIn', 'true');

    accessToken.value = data.accessToken;
    refreshToken.value = data.refreshToken;
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);

    userId.value = data.userId;
    username.value = data.username;
    localStorage.setItem('userId', data.userId);
    localStorage.setItem('username', data.username);
  };

  const logout = () => {
    loggedIn.value = false;
    localStorage.removeItem('loggedIn');

    accessToken.value = null;
    refreshToken.value = null;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    userId.value = null;
    username.value = null;
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
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
});