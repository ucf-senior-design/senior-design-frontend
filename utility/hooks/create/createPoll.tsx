import { useTrip } from "../trip"
import React from "react"
import { useScreen } from "../screen"

export default function useCreatePoll() {
  const { createPoll } = useTrip()
  const { updateErrorToast } = useScreen()
  const [title, updateTitle] = React.useState<string>()
  const [options, updateOptions] = React.useState<Array<string>>([])

  async function create(callback: (isSuccess: boolean) => void) {
    if (title === undefined) {
      updateErrorToast("poll must have title")
      return
    }

    if (options.length === 0) {
      updateErrorToast("poll must have options")
      return
    }

    await createPoll(title, options, (response) => {
      if (response.isSuccess) {
        callback(true)
      } else {
        updateErrorToast(response.errorMessage)
      }
    })
  }

  return { create, title, updateTitle, options, updateOptions }
}
