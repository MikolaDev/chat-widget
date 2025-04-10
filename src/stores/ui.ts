import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export enum ThemeType {
  DARK = 'DARK',
  LIGHT = 'LIGHT',
}

export const useUIStore = defineStore('ui', () => {
  const LOCAL_STORAGE_KEY = 'theme'

  const currentTheme = ref<ThemeType | null>(null)

  const initTheme = () => {
    const savedTheme = localStorage.getItem(LOCAL_STORAGE_KEY)
    const isPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    console.log(savedTheme)

    if (savedTheme !== null && Object.values(ThemeType).includes(savedTheme as ThemeType)) {
      currentTheme.value = savedTheme as ThemeType
    } else {
      currentTheme.value = isPrefersDark ? ThemeType.DARK : ThemeType.LIGHT
    }
  }

  watch(
    () => currentTheme.value,
    (value) => {
      if (value) localStorage.setItem(LOCAL_STORAGE_KEY, value)
    },
  )

  return {
    currentTheme,
    initTheme,
  }
})
