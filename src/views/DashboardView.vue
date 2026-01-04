<script setup>
import { ref, onMounted } from 'vue'
import { createUser, getAllUsers } from '@/services/user.service'

const users = ref([])

// form state
const form = ref({
  nama: '',
  nim: '',
  jabatan: '',
  role: 'anggota'
})

const qrCode = ref(null)
const loading = ref(false)
const error = ref('')

// ambil semua user
const fetchUsers = async () => {
  const res = await getAllUsers()
  users.value = res.data.data
}

onMounted(fetchUsers)

// submit create user
const submitUser = async () => {
  error.value = ''
  qrCode.value = null
  loading.value = true

  try {
    const res = await createUser(form.value)
    qrCode.value = res.data.qr_code

    // reset form
    form.value = {
      nama: '',
      nim: '',
      jabatan: '',
      role: 'anggota'
    }

    fetchUsers()
  } catch (err) {
    error.value = err.response?.data?.message || 'Gagal membuat user'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="dashboard">
    <h1>Dashboard Admin</h1>

    <!-- FORM TAMBAH USER -->
    <section class="card">
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
    </section>

    <!-- QR CODE -->
    <section v-if="qrCode" class="card">
      <h3>QR Code Anggota</h3>
      <img :src="qrCode" alt="QR Code" />
      <a :href="qrCode" download="qr-code.png">Download QR</a>
    </section>

    <!-- LIST USER -->
    <section class="card">
      <h2>Daftar Anggota</h2>

      <table>
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
    </section>
  </div>
</template>

<style scoped>
.dashboard {
  padding: 20px;
}

.card {
  background: white;
  padding: 16px;
  margin-bottom: 20px;
  border-radius: 8px;
}

input, select {
  display: block;
  margin-bottom: 10px;
  padding: 6px;
  width: 100%;
}

button {
  padding: 8px 12px;
}

.error {
  color: red;
}

img {
  width: 200px;
}
</style>
