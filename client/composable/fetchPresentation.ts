import { useFetch } from '@nuxtjs/composition-api'
import { usePresentationRepository } from '~/composable/presentationRepository'

export const usePresentationFetch = (id: string, version: number) => {
  const { loadPresentation, presentation } = usePresentationRepository()

  useFetch(async () => {
    await loadPresentation(id, version)
  })

  return { presentation }
}
