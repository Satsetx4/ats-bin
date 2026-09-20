import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { modalVariants, tapScale } from '@/lib/motion';
import { X, AlertCircle, CheckCircle2, HelpCircle, Sparkles } from 'lucide-react';
import { sound } from '@/lib/audio';

export interface ModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  type?: 'info' | 'confirm' | 'success' | 'alert';
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

export const DetectiveModal: React.FC<ModalProps> = ({
  isOpen,
  title,
  message,
  type = 'info',
  confirmText = 'Mengerti 👍',
  cancelText = 'Batal',
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'confirm':
        return <HelpCircle className="w-10 h-10 text-amber-500" />;
      case 'success':
        return <CheckCircle2 className="w-10 h-10 text-emerald-500" />;
      case 'alert':
        return <AlertCircle className="w-10 h-10 text-rose-500" />;
      default:
        return <Sparkles className="w-10 h-10 text-sky-500" />;
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="bg-white dark:bg-slate-900 border-2 border-amber-300 dark:border-amber-500/40 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative text-center"
        >
          {/* Close button */}
          {onCancel && (
            <button
              onClick={() => {
                sound.playTap();
                onCancel();
              }}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Tutup modal"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          {/* Icon Badge */}
          <div className="mx-auto w-16 h-16 rounded-2xl bg-amber-50 dark:bg-slate-800 flex items-center justify-center mb-4 shadow-inner border border-amber-200 dark:border-slate-700">
            {getIcon()}
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-2">
            {title}
          </h3>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
            {message}
          </p>

          <div className="flex items-center justify-center gap-3">
            {onCancel && (
              <motion.button
                whileTap={tapScale}
                onClick={() => {
                  sound.playTap();
                  onCancel();
                }}
                className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                {cancelText}
              </motion.button>
            )}

            <motion.button
              whileTap={tapScale}
              onClick={() => {
                sound.playTap();
                onConfirm();
              }}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-amber-950 font-black text-sm shadow-md transition-all"
            >
              {confirmText}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
