import React from "react";

function Input({ text, value, onChange, className, type, placeholder,style , onKeyDown}) {
  return (
    <>
      <input
        text={text}
        type={type}
        value={value}
        onChange={onChange}
        className={className}
        placeholder={placeholder}
        style={style}
        onKeyDown={onKeyDown}
      />
    </>
  );
}

export default Input;
