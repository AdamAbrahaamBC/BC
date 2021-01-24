import { ref, useContext } from '@nuxtjs/composition-api'

export const useFetchUserData = () => {
  const { app: { $auth } } = useContext()
  const isFetching = ref<boolean>(false)

  const fetchUserData = async () => {
    isFetching.value = true
    await $auth.fetchUser()
    isFetching.value = false
  }

  return { fetchUserData, isFetching }
}
