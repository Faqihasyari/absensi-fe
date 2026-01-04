<script setup>
import { ref } from 'vue'
import { createMeeting } from '@/services/meeting.service'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref({
  nama_rapat: '',
  tanggal: ''
})

const loading = ref(false)
const error = ref('')

const submitMeeting = async () => {
  loading.value = true
  error.value = ''

  try {
    await createMeeting(form.value)
    router.push('/admin/meetings')
  } catch (err) {
    error.value = err.response?.data?.message || 'Gagal membuat rapat'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <h2>Buat Rapat</h2>

    <input
      v-model="form.nama_rapat"
      placeholder="Nama Rapat"
    />

    <input
      type="datetime-local"
      v-model="form.tanggal"
    />

    <button @click="submitMeeting" :disabled="loading">
      {{ loading ? 'Menyimpan...' : 'Buat Rapat' }}
    </button>

    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<style scoped>
input {
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 6px;
}

button {
  padding: 8px 12px;
}

.error {
  color: red;
}
</style>
