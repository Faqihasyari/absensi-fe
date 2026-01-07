<script setup>
import { ref } from 'vue'
import axios from '@/services/api' // axios instance
import { useRouter } from 'vue-router'

const router = useRouter()

const qr_token = ref('')
const meeting_id = ref('')
const loading = ref(false)
const message = ref('')
const error = ref('')

const scanAttendance = async () => {
  message.value = ''
  error.value = ''

  if (!qr_token.value || !meeting_id.value) {
    error.value = 'QR Token dan Meeting ID wajib diisi'
    return
  }

  try {
    loading.value = true

    const res = await axios.post('/attendance/scan', {
      qr_token: qr_token.value,
      meeting_id: meeting_id.value,
    })

    message.value = res.data.message

    // reset input setelah sukses
    qr_token.value = ''
  } catch (err) {
    error.value =
      err.response?.data?.message || 'Gagal melakukan absensi'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="page">
    <h1>Scan Absensi</h1>

    <div class="card">
      <label>Meeting ID</label>
      <input
        v-model="meeting_id"
        type="number"
        placeholder="Masukkan ID rapat"
      />

      <label>QR Token</label>
      <input
        v-model="qr_token"
        placeholder="Scan / masukkan QR token"
      />

      <button @click="scanAttendance" :disabled="loading">
        {{ loading ? 'Memproses...' : 'Scan Absensi' }}
      </button>

      <p v-if="message" class="success">{{ message }}</p>
      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </div>
</template>

<style scoped>
.page {
  padding: 24px;
}

.card {
  max-width: 400px;
  background: white;
  padding: 20px;
  border-radius: 8px;
}

input {
  width: 100%;
  padding: 8px;
  margin-bottom: 12px;
}

button {
  width: 100%;
  padding: 10px;
}

.success {
  color: green;
  margin-top: 10px;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>
