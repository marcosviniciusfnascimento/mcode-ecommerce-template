"use client";

import { useEffect, useState } from "react";
import ModalDefault from "./modal";
import { Button } from "@nextui-org/react";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}
export default function AlertModal(props: AlertModalProps) {
  const { isOpen, onClose, onConfirm, loading } = props;

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <ModalDefault
      isOpen={isOpen}
      onClose={onClose}
      title="Tem certeza que deseja excluir?"
      description="Essa ação não pode ser desfeita."
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button
          variant="bordered"
          disabled={loading}
          onClick={onClose}
          className="rounded-lg"
        >
          Cancel
        </Button>
        <Button
          className="bg-[#F05656] text-white rounded-lg"
          isLoading={loading}
          disabled={loading}
          onClick={onConfirm}
        >
          Continuar
        </Button>
      </div>
    </ModalDefault>
  );
}
