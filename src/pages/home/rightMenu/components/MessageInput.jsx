/* eslint-disable react/prop-types */

const MessageInput = ({ 
  placeholder, 
  id, 
  type, 
  // required, 
  // register, 
  value,
  onChange
}) => {
  return (
    <div className="relative w-full">
      <input
        value={value}
        onChange={onChange}
        id={id}
        type={type}
        autoComplete={id}
        // {...register(id, { required })}
        placeholder={placeholder}
        className="
          text-black
          font-light
          py-2
          px-4
          bg-neutral-100 
          w-full 
          rounded-full
          focus:outline-none
        "
      />
    </div>
   );
}
 
export default MessageInput;