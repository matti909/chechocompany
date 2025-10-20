"use client";

import { LoginModal } from "@/components/ui/login-modal";
import { useModalStore } from "@/store/modal-store";

export function LoginModalWrapper() {
  const isOpen = useModalStore((state) => state.isLoginModalOpen);
  const closeModal = useModalStore((state) => state.closeLoginModal);

  return <LoginModal isOpen={isOpen} onClose={closeModal} />;
}
