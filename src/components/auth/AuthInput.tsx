interface AuthInputProps {
  label: string;
  value: any;
  required?: boolean;
  type?: 'text' | 'email' | 'password'
  onChangeValue: (newValue: any) => void
}

function AuthInput({label, value, type, required, onChangeValue}: AuthInputProps) {
  return (
    <div className="flex flex-col mt-4">
      <label>{label}</label>
      <input 
        type={type ?? 'text'}
        value={value}
        required={required}
        onChange={e => onChangeValue(e.target.value)}
        className="px-4 py-6 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:outline-none focus:bg-white" />
    </div>
  )
}

export { AuthInput }