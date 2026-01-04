<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'

const router = useRouter()
const authStore = useAuthStore()

const nama = ref('')
const nim = ref('')
const loading = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
  errorMessage.value = ''

  if (!nama.value || !nim.value) {
    errorMessage.value = 'Nama dan NIM wajib diisi'
    return
  }

  try {
    loading.value = true

    await authStore.login({
      nama: nama.value,
      nim: nim.value
    })

    // redirect setelah login
    router.push('/admin')
  } catch (error) {
    errorMessage.value =
      error.response?.data?.message || 'Login gagal'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <h2>Login Absensi HIMASANTIKA</h2>

      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label>Nama</label>
          <input
            type="text"
            v-model="nama"
            placeholder="Masukkan nama"
          />
        </div>

        <div class="form-group">
          <label>NIM</label>
          <input
            type="text"
            v-model="nim"
            placeholder="Masukkan NIM"
          />
        </div>

        <p v-if="errorMessage" class="error">
          {{ errorMessage }}
        </p>

        <button type="submit" :disabled="loading">
          {{ loading ? 'Login...' : 'Login' }}
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f4f6f8;
}

.login-card {
  width: 100%;
  max-width: 380px;
  background: white;
  padding: 24px;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.login-card h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 14px;
}

label {
  display: block;
  font-size: 14px;
  margin-bottom: 6px;
}

input {
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ddd;
}

button {
  width: 100%;
  padding: 10px;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

button:disabled {
  background: #94a3b8;
}

.error {
  color: red;
  font-size: 14px;
  margin-bottom: 10px;
}
</style>
