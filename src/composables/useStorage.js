import { getStorage, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { ref as storageRef } from '@firebase/storage'
import getUser from './getUser'
import { ref } from 'vue'

const { user } = getUser()
const storage = getStorage()

const useStorage = () => {
  const error = ref(null)
  const url = ref(null)
  const filePath = ref(null)

  const uploadImage = async (file) => {
      filePath.value = `covers/${user.value.uid}/${file.name}`
      const sref = storageRef(storage, filePath.value)

      try {
          const res = await uploadBytes(sref, file)
          url.value = await getDownloadURL(res.ref)
      } catch (err) {
          console.log(err.message)
          error.value = err.message
      }
  }

  const deleteImage = async (path) => {
    const sref = storageRef(storage, path)

    try {
      await deleteObject(sref)
    } catch (err) {
      console.log(err.message)
      error.value = err.message
    }
  }

  return {url, filePath, error, uploadImage, deleteImage}
}

export default useStorage