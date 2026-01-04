<script setup>
import { ref } from 'vue'
import { createUser } from '@/services/user.service'

const form = ref({
  nama: '',
  nim: '',
  jabatan: '',
  role: 'anggota'
})

const loading = ref(false)
const error = ref('')
const qrCode = ref(null)

const submitUser = async () => {
  loading.value = true
  error.value = ''
  qrCode.value = null

  try {
    const res = await createUser(form.value)
    qrCode.value = res.data.qr_code

    form.value = {
      nama: '',
      nim: '',
      jabatan: '',
      role: 'anggota'
    }
  } catch (err) {
    error.value = err.response?.data?.message || 'Gagal membuat user'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <h2>Tambah Anggota</h2>

    <input v-model="form.nama" placeholder="Nama" />
    <input v-model="form.nim" placeholder="NIM" />
    <input v-model="form.jabatan" placeholder="Jabatan" />

    <select v-model="form.role">
      <option value="anggota">Anggota</option>
      <option value="admin">Admin</option>
    </select>

    <button @click="submitUser" :disabled="loading">
      {{ loading ? 'Menyimpan...' : 'Tambah' }}
    </button>

    <p v-if="error" class="error">{{ error }}</p>

    <div v-if="qrCode">
      <h3>QR Code</h3>
      <img :src="qrCode" />
    </div>
  </div>
</template>

<style scoped>
input, select {
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 6px;
}

.error {
  color: red;
}
</style>
