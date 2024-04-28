// genreate input  type props
interface InputProps {
  type?: "text" | "password" | "email" | "number" | "file";
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

function Input({ value, onChange, placeholder, type }: InputProps) {
  return (
    <input
      value={value}
      onChange={onChange}
      className="w-full text-slate-300 rounded-md p-3  outline-none focus:outline-offset-0 bg-slate-800 focus:bg-slate-700 transition-[outline] focus:outline-2 focus:border-none focus:outline-sky-500"
      type={type}
      placeholder={placeholder}
    />
  );
}

export default Input;
