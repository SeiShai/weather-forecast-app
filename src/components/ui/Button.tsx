// Button Component
// TODO: Create a reusable button component

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
}

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
}: ButtonProps) {
  // TODO: Add different styling based on variant

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="px-4 py-2 rounded-lg transition"
    >
      {children}
    </button>
  );
}
