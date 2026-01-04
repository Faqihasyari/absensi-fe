<script setup>
import { ref, onMounted } from 'vue'
import { getAllUsers } from '@/services/user.service'

const users = ref([])
const loading = ref(false)
const error = ref('')

const fetchUsers = async () => {
  loading.value = true
  try {
    const res = await getAllUsers()
    users.value = res.data.data
  } catch (error) {
    error.value = 'Gagal mengambil data user'
  } finally {
    loading.value = false
  }
}

onMounted(fetchUsers)
</script>

<template>
  <div>
    <h2>Daftar Anggota</h2>

    <p v-if="error" class="error">{{ error }}</p>

    <table v-if="!loading">
      <thead>
        <tr>
          <th>Nama</th>
          <th>NIM</th>
          <th>Jabatan</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="u in users" :key="u.id">
          <td>{{ u.nama }}</td>
          <td>{{ u.nim }}</td>
          <td>{{ u.jabatan }}</td>
          <td>{{ u.role }}</td>
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
