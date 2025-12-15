import { reactive, ref, toRaw } from 'vue'
import { defineStore } from 'pinia'

import localStorage from '@/utils/localStorage'

const key = 'PATH_HISTORY'

interface HistoryModel {
  path: string
}

export const useOpenStore = defineStore('open', () => {
  const show = ref(false)
  const input = ref('')
  const history = reactive<HistoryModel[]>(localStorage.get(key) || [])

  const add = (val: HistoryModel) => {
    if (!val) {
      return
    }

    remove(val)

    history.unshift(val)

    localStorage.set(key, toRaw(history))
  }
  const remove = (val: HistoryModel) => {
    if (!val) {
      return
    }

    const index = history.findIndex((i) => i.path === val.path)

    if (index > -1) {
      history.splice(index, 1)

      localStorage.set(key, toRaw(history))
    }
  }
  const clear = () => {
    history.splice(0, history.length)

    localStorage.set(key, toRaw(history))
  }

  return {
    show,

    input,

    history: { value: history, add, remove, clear },
  }
})
