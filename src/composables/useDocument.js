import { ref } from 'vue'
import { db } from '@/firebase/config'
import { collection, doc, deleteDoc } from "firebase/firestore"

const useDocument = (col, id) => {
  const error = ref(null)
  const isPending = ref(false)

  let documentRef = doc(collection(db, col), id)

  const deleteDocument = async () => {
    error.value = null
    isPending.value = true
    try{
      const res = await deleteDoc(documentRef)
      isPending.value = false
      return res
    } catch(err){
      console.log(err.message)
      error.value = "Could not delete the document"
      isPending.value = false
    }
  }

  return { deleteDocument, error, isPending }
}

export default useDocument