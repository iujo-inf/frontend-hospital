import { Vue } from 'vue-class-component'
import router from '@/router'

export default class AuthGuard extends Vue {
  created() {
    if (!sessionStorage.getItem('user_id')) {
      router.push('/')
    }
  }
};