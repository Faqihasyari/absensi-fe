<script setup>
import { ref, onMounted } from 'vue'
import axios from '@/services/api'

const meeting_id = ref('')
const attendances = ref([])
const loading = ref(false)
const error = ref('')

const fetchAttendance = async () => {
  error.value = ''
  attendances.value = []

  if (!meeting_id.value) {
    error.value = 'Meeting ID wajib diisi'
    return
  }

  try {
    loading.value = true
    const res = await axios.get('/attendance', {
      params: { meeting_id: meeting_id.value },
    })

    attendances.value = res.data.data
  } catch (err) {
    error.value =
      err.response?.data?.message || 'Gagal mengambil data absensi'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="page">
    <h1>Rekap Absensi</h1>

    <div class="filter">
      <input
        v-model="meeting_id"
        type="number"
        placeholder="Masukkan ID rapat"
      />
      <button @click="fetchAttendance">
        Lihat Rekap
      </button>
    </div>

    <p v-if="error" class="error">{{ error }}</p>

    <table v-if="attendances.length">
      <thead>
        <tr>
          <th>Nama</th>
          <th>NIM</th>
          <th>Status</th>
          <th>Waktu Scan</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="a in attendances" :key="a.id">
          <td>{{ a.user.nama }}</td>
          <td>{{ a.user.nim }}</td>
          <td>{{ a.status }}</td>
          <td>{{ a.waktu_scan }}</td>
        </tr>
      </tbody>
    </table>

    <p v-if="!loading && attendances.length === 0">
      Belum ada data absensi
    </p>
  </div>
</template>

<style scoped>
.page {
  padding: 24px;
}

.filter {
  margin-bottom: 16px;
}

input {
  padding: 8px;
  margin-right: 8px;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

th,
td {
  padding: 10px;
  border: 1px solid #ddd;
}

.error {
  color: red;
}
</style>
