<script setup>
import { ref, onMounted } from 'vue'
import { getMeetings, updateMeetingStatus } from '@/services/meeting.service'

const meetings = ref([])
const loading = ref(false)
const error = ref('')

const fetchMeetings = async () => {
  loading.value = true
  try {
    const res = await getMeetings()
    meetings.value = res.data.data
  } catch (error) {
    error.value = 'Gagal mengambil data rapat'
  } finally {
    loading.value = false
  }
}

const changeStatus = async (id, status) => {
  try {
    await updateMeetingStatus(id, status)
    fetchMeetings()
  } catch (err) {
    alert(err.response?.data?.message || 'Gagal mengubah status')
  }
}

onMounted(fetchMeetings)
</script>

<template>
  <div>
    <h2>Daftar Rapat</h2>

    <p v-if="error" class="error">{{ error }}</p>

    <table v-if="!loading">
      <thead>
        <tr>
          <th>Nama Rapat</th>
          <th>Tanggal</th>
          <th>Pembuat</th>
          <th>Status</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="m in meetings" :key="m.id">
          <td>{{ m.nama_rapat }}</td>
          <td>{{ new Date(m.tanggal).toLocaleString() }}</td>
          <td>{{ m.creator?.nama }}</td>
          <td>{{ m.status }}</td>
          <td>
            <button
              v-if="m.status !== 'Selesai'"
              @click="changeStatus(m.id, 'Selesai')"
            >
              Selesaikan
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-if="loading">Loading...</p>
  </div>
</template>

<style scoped>
table {
  width: 100%;
  background: white;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.error {
  color: red;
}
</style>
