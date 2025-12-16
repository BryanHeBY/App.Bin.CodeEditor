import { HOST } from '@/utils/env'

export default function getFullPath(path: string) {
  if (path.indexOf('http') === 0) {
    return path
  }

  return `${HOST}/?_api=read&path=${encodeURIComponent(path)}`
}
