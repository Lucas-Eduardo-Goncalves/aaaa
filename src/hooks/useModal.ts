import { useMemo, useState } from 'react';

export type ModalType<T = boolean> = {
  isOpen: boolean;
  params: T;
  open: T extends boolean ? () => void : (params?: T) => void;
  close: () => void;
};

type UseModal = <T = boolean>(initialState?: T) => ModalType<T>;

export const useModal: UseModal = (initialState: any = undefined) => {
  const [params, setParams] = useState(initialState);

  const isOpen = useMemo(() => !!params, [params]);

  const open = (customParams?: any) => setParams(customParams);
  const close = () => setParams(undefined);

  return {
    params,
    isOpen,
    open: open as any,
    close,
  };
};
