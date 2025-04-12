import { ref } from 'vue'

export function useEhMobile(){
  const ehMobile = ref(false)

  const check = () => {
    ehMobile.value = window.matchMedia("(max-width: 767px)").matches
  }

  onMounted(() => {
    check()
    window.addEventListener('resize', check)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', check)
  })

  return { ehMobile}
}