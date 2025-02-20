import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const router = useRouter()

    const checkAuth = () => {
      if (!sessionStorage.getItem('user_id')) {
        router.push('/')
      }
    }

    return {
      checkAuth
    }
  },
  created() {
    this.checkAuth()
  }
}) 