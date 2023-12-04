import { ref, watchEffect } from 'vue'
import { db } from '@/firebase/config'
import { collection, onSnapshot, query, where, orderBy } from "firebase/firestore"

const getCollection = (col, q) => {
  const documents = ref(null)
  const error = ref(null)

  let collectionRef = query(collection(db, col), orderBy("createdAt"))

  if (q) {
    collectionRef = query(collectionRef, where(...q))
  }

  const unsub = onSnapshot(collectionRef, snap => {
    let results = []
    snap.docs.forEach(doc => {
      doc.data().createdAt && results.push({...doc.data(), id: doc.id})
    })
    documents.value = results
    error.value = null
  }, err => {
    console.log(err.message)
    documents.value = null
    error.value = "Could not fetch data"
  })

  watchEffect((onInvalidate) => {
    // unsub from prev collection when watcher is stopped (component unmounted)
    onInvalidate(() => unsub())
  })

  return {documents, error}
}

export default getCollection