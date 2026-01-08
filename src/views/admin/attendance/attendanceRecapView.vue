<script setup>
import { ref } from 'vue'
import axios from '@/services/api'

const nama_rapat = ref('')
const attendances = ref([])
const loading = ref(false)
const error = ref('')

const fetchAttendance = async () => {
  error.value = ''
  attendances.value = []

  if (!nama_rapat.value) {
    error.value = 'Nama rapat wajib diisi'
    return
  }

  try {
    loading.value = true
    const res = await axios.get('/attendance/search', {
      params: {
        nama_rapat: nama_rapat.value
      }
    })

    attendances.value = res.data.data
  } catch (err) {
    console.log(err.response)
    error.value =
      err.response?.data?.message || 'Gagal mengambil rekap absensi'
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
        v-model="nama_rapat"
        placeholder="Cari nama rapat"
      />
      <button @click="fetchAttendance">
        Cari
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
      Tidak ada data absensi
    </p>
  </div>
</template>
