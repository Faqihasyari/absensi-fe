import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '@/views/auth/LoginView.vue'
import DashboardAdmin from '@/views/admin/DashboardAdmin.vue'
import DashboardHome from '@/views/admin/DashboardHome.vue'
import UserListView from '@/views/admin/users/UserListView.vue'
import UserCreateView from '@/views/admin/users/UserCreateView.vue'
import MeetingListView from '@/views/admin/meeting/MeetingListView.vue'
import MeetingCreateView from '@/views/admin/meeting/MeetingCreateView.vue'

const routes = [
  { path: '/', redirect: '/login' },

  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: { guest: true }
  },

  {
    path: '/admin',
    component: DashboardAdmin,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'AdminDashboard',
        component: DashboardHome
      },
      {
        path: 'users',
        name: 'UserList',
        component: UserListView
      },
      {
        path: 'users/create',
        name: 'UserCreate',
        component: UserCreateView
      },
      { path: 'meetings', component: MeetingListView },
      { path: 'meetings/create', component: MeetingCreateView },
    ]

  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
