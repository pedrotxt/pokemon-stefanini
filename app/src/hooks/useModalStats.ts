import { useCallback, useState } from "react";

type UseModalStatsFn = [
  isShowingStats: boolean,
  showModalStats: ()=> void,
  closeModalStats: ()=> void,
]

export function useModalStats(): UseModalStatsFn{
  const [showModalStats, setShowModalStats] = useState<boolean>(false);

  const viewModalStats = useCallback( () => setShowModalStats(true), [] );
  const closeModalStats = useCallback( () => setShowModalStats(false), [] );

  return[
    showModalStats, viewModalStats, closeModalStats
  ]
}