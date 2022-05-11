import { useCallback, useState } from "react";

type UseModalFn = [
  isShowing: boolean,
  showModal: ()=> void,
  closeModal: ()=> void,
]

export function useModal(): UseModalFn{
  const [showModal, setShowModal] = useState<boolean>(false);

  const viewModal = useCallback( () => setShowModal(true), [] );
  const closeModal = useCallback( () => setShowModal(false), [] );


  return[
    showModal, viewModal, closeModal
  ]
}