<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="admin-layout">
    <!-- SIDEBAR -->
    <aside class="sidebar">
      <h2>Admin</h2>

<nav>
  <RouterLink to="/admin">Dashboard</RouterLink>
  <RouterLink to="/admin/users">Daftar User</RouterLink>
  <RouterLink to="/admin/users/create">Tambah User</RouterLink>
  <RouterLink to="/admin/meetings">Daftar Rapat</RouterLink>
  <RouterLink to="/admin/meetings/create">Buat Rapat</RouterLink>
  <RouterLink to="/admin/attendance/scan">Scan Absensi</RouterLink>
</nav>
    </aside>

    <!-- MAIN CONTENT -->
    <main class="content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 220px;
  background: #1e293b;
  color: white;
  padding: 20px;
}

.sidebar a {
  display: block;
  color: white;
  margin-bottom: 10px;
  text-decoration: none;
}

.content {
  flex: 1;
  padding: 20px;
  background: #f1f5f9;
}
</style>
