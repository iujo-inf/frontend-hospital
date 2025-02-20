import { Vue } from 'vue-class-component'
import router from '@/router'

export default class AuthGuard extends Vue {
  created() {
    if (!sessionStorage.getItem('user_id')) {
      router.push('/')
    }
  }
}

export const authGuard = {
  beforeRouteEnter(to: any, from: any, next: any) {
    // Lógica del guard
    next()
  }
}