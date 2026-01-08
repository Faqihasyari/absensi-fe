<script setup>
import { ref, onMounted } from 'vue'
import axios from '@/services/api'

const permissions = ref([])
const loading = ref(false)
const error = ref('')

const fetchPermissions = async () => {
  error.value = ''
  loading.value = true

  try {
    const res = await axios.get('/permissions')
    permissions.value = res.data.data
  } catch (err) {
    error.value =
      err.response?.data?.message || 'Gagal mengambil data izin'
  } finally {
    loading.value = false
  }
}

const approvePermission = async (id) => {
  try {
    await axios.put(`/permissions/${id}/approve`)
    fetchPermissions()
  } catch (err) {
    alert('Gagal menyetujui izin')
  }
}

const rejectPermission = async (id) => {
  try {
    await axios.put(`/permissions/${id}/reject`)
    fetchPermissions()
  } catch (err) {
    alert('Gagal menolak izin')
  }
}

onMounted(fetchPermissions)
</script>

<template>
  <div class="page">
    <h1>Kelola Izin Anggota</h1>

    <p v-if="loading">Memuat data...</p>
    <p v-if="error" class="error">{{ error }}</p>

    <table v-if="permissions.length">
      <thead>
        <tr>
          <th>Nama</th>
          <th>NIM</th>
          <th>Rapat</th>
          <th>Alasan</th>
          <th>Status</th>
          <th>Aksi</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="p in permissions" :key="p.id">
          <td>{{ p.user.nama }}</td>
          <td>{{ p.user.nim }}</td>
          <td>{{ p.meeting.nama_rapat }}</td>
          <td>{{ p.alasan }}</td>

          <td>
            <span
              :class="['status', p.status]"
            >
              {{ p.status }}
            </span>
          </td>

          <td>
            <button
              v-if="p.status === 'menunggu'"
              @click="approvePermission(p.id)"
              class="approve"
            >
              Setujui
            </button>

            <button
              v-if="p.status === 'menunggu'"
              @click="rejectPermission(p.id)"
              class="reject"
            >
              Tolak
            </button>

            <span v-if="p.status !== 'menunggu'">
              -
            </span>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-if="!loading && permissions.length === 0">
      Belum ada permintaan izin
    </p>
  </div>
</template>

<style scoped>
.page {
  padding: 24px;
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

.status {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  text-transform: capitalize;
}

.status.menunggu {
  background: #fff3cd;
  color: #856404;
}

.status.disetujui {
  background: #d4edda;
  color: #155724;
}

.status.ditolak {
  background: #f8d7da;
  color: #721c24;
}

button {
  padding: 6px 10px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

.approve {
  background: #28a745;
  color: white;
  margin-right: 6px;
}

.reject {
  background: #dc3545;
  color: white;
}

.error {
  color: red;
  margin-bottom: 10px;
}
</style>
