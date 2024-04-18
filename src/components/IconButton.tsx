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
        flex min-h-7 min-w-7 items-center justify-center rounded-md
        ${disabled ? "cursor-default opacity-50" : "cursor-pointer"}
        ${!disabled && "hover:text-foreground-400 focus:text-foreground-400"}
        ${!disabled && "active:text-foreground-600"}
        ${isActive && !disabled ? "bg-surface-subtle text-primary hover:text-primary focus:text-primary active:text-primary" : "text-foreground-200"}
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
