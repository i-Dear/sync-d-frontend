type Props = {
  onClick: () => void;
  children: React.ReactNode;
  isActive?: boolean;
  disabled?: boolean;
};

export default function IconButton({
  onClick,
  children,
  isActive,
  disabled,
}: Props) {
  return (
    <button
      className={`
        min-w-7 min-h-7 rounded-md flex items-center justify-center
        ${disabled ? "opacity-50 cursor-default" : "cursor-pointer"}
        ${!disabled && "hover:text-foreground-400 focus:text-foreground-400"}
        ${!disabled && "active:text-foreground-600"}
        ${
          isActive && !disabled
            ? "text-primary bg-surface-subtle hover:text-primary focus:text-primary active:text-primary"
            : "text-foreground-200"
        }
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
