import { ref, watchEffect } from 'vue'
import { db } from '@/firebase/config'
import { collection, onSnapshot, doc } from "firebase/firestore"

const getDocument = (col, id) => {
  const document = ref(null)
  const error = ref(null)

  let documentRef = doc(collection(db, col), id)

  const unsub = onSnapshot(documentRef, doc => {
    if (doc) {
      document.value = {...doc.data(), id: doc.id}
      error.value = null
    } else {
      document.value = null
      error.value = "Could not find document"
    }
  }, err => {
    console.log(err.message)
    document.value = null
    error.value = "Could not fetch data"
  })

  watchEffect((onInvalidate) => {
    // unsub from prev collection when watcher is stopped (component unmounted)
    onInvalidate(() => unsub())
  })

  return { document, error }
}

export default getDocument