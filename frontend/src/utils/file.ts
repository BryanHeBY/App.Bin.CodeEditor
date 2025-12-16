import { HOST } from '@/utils/env'

export const getFileName = (v: string) => v.split('/').pop() || ''

export const getFileSuffix = (v: string) => v.split('.').pop() || ''

export const getFullPath = (path: string) => {
  if (path.indexOf('http') === 0) {
    return path
  }

  return `${HOST}/?_api=read&path=${encodeURIComponent(path)}`
}
