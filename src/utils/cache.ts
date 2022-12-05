class LocalCache {
  setCache(key: string, value: any, isLocalStorage = true) {
    if (isLocalStorage) {
      localStorage.setItem(key, JSON.stringify(value))
    } else {
      sessionStorage.setItem(key, JSON.stringify(value))
    }
  }

  getCache(key: string, isLocalStorage = true) {
    if (isLocalStorage) {
      const value = localStorage.getItem(key)
      if (value) {
        return JSON.parse(value)
      }
    } else {
      const value = sessionStorage.getItem(key)
      if (value) {
        return JSON.parse(value)
      }
    }
  }

  removeCache(key: string, isLocalStorage = true) {
    if (isLocalStorage) {
      localStorage.removeItem(key)
    } else {
      sessionStorage.removeItem(key)
    }
  }

  clearCache() {
    localStorage.clear()
    sessionStorage.clear()
  }
}

export default new LocalCache()
