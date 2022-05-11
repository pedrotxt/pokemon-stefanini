import { useCallback, useState } from "react";

type UseModalCaptureFn = [
  isShowingCapture: boolean,
  showModalCapture: ()=> void,
  closeModalCapture: ()=> void,
]

export function useModalCapture(): UseModalCaptureFn{
  const [showModalCapture, setShowModalCapture] = useState<boolean>(false);

  const viewModalCapture = useCallback( () => setShowModalCapture(true), [] );
  const closeModalCapture = useCallback( () => setShowModalCapture(false), [] );

  return[
    showModalCapture, viewModalCapture, closeModalCapture
  ]
}