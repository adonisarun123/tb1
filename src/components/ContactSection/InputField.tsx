interface InputFieldProps {
  label: string;
  type?: string;
  placeholder: string;
  name: string;
  isTextArea?: boolean;
}

const InputField = ({ label, type = 'text', placeholder, name, isTextArea = false }: InputFieldProps) => {
  return (
    <div className="relative w-full group">
      <label 
        htmlFor={name}
        className="block text-lg font-medium font-outfit text-neutral-600 mb-3"
      >
        {label}
      </label>
      
      {/* Border Gradient */}
      <div className="absolute -inset-[1px] rounded-[10px] bg-gradient-to-b from-[#FF4C39] to-[#FFB573] opacity-0 transition-opacity duration-300 group-focus-within:opacity-100" />
      
      {isTextArea ? (
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          className="w-full h-[180px] px-6 py-4 bg-white rounded-[10px] text-xl font-medium font-['DM Sans'] text-neutral-900 placeholder-neutral-400 border-2 border-neutral-300 focus:border-transparent relative z-10 focus:outline-none resize-none"
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          className="w-full h-[65px] px-6 bg-white rounded-[10px] text-xl font-medium font-['DM Sans'] text-neutral-900 placeholder-neutral-400 border-2 border-neutral-300 focus:border-transparent relative z-10 focus:outline-none"
        />
      )}
    </div>
  );
};

export default InputField;
