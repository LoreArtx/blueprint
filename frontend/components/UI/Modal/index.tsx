"use client";

import { useState } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean,
  onClose: () => void
}

const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose }: ModalProps) => {

  return isOpen ? createPortal(<div onClick={onClose} className="fixed z-30 top-0 left-0 right-0 bottom-0 bg-black bg-opacity-30 flex justify-center items-center"><div onClick={(e) => e.stopPropagation()}>{children}</div></div>, document.body) : null;
}

export default Modal