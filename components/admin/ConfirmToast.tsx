import React from 'react';
import toast, { Toast } from 'react-hot-toast';

interface ConfirmToastProps {
  t: Toast;
  title: string;
  message: string;
  onConfirm: () => Promise<void>;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
}

export const ConfirmToast = ({
  t,
  title,
  message,
  onConfirm,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  variant = 'danger'
}: ConfirmToastProps) => {
  
  const btnColor = variant === 'danger' ? 'bg-rose-500 hover:bg-rose-600 shadow-rose-200' : 
                   variant === 'warning' ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-200' : 
                   'bg-[var(--mv-sage)] hover:bg-[var(--mv-ink)] shadow-sage-200';

  return (
    <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-white shadow-2xl rounded-[24px] pointer-events-auto flex flex-col p-6 border border-black/5`}>
      <div className="flex-1">
        <p className="text-sm font-bold text-[var(--mv-ink)] uppercase tracking-tight">{title}</p>
        <p className="mt-1 text-xs text-black/40 leading-relaxed">
          {message}
        </p>
      </div>
      <div className="flex gap-3 mt-6">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="flex-1 px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest text-black/40 hover:bg-black/5 rounded-xl transition"
        >
          {cancelText}
        </button>
        <button
          onClick={async () => {
            toast.dismiss(t.id);
            await onConfirm();
          }}
          className={`flex-1 px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest text-white rounded-xl shadow-lg transition ${btnColor}`}
        >
          {confirmText}
        </button>
      </div>
    </div>
  );
};

export const showConfirmToast = (props: Omit<ConfirmToastProps, 't'>) => {
  toast.custom((t) => <ConfirmToast t={t} {...props} />, { duration: 6000 });
};
