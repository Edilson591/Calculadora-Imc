import React from 'react';
import InputMask from 'react-input-mask';

interface TypeInput {
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  value?: string | number;
  id: string;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  mask?: string | (string | RegExp)[]; 
}

export const Input =  ({...props}: TypeInput) => {
  return (
    <div className="p-2 max-w-md">
      <label htmlFor={props.id} className="block mb-1 font-bold">{props.label}</label>
      <InputMask
        className="p-2 outline-none rounded-md max-w-28 w-full"
        type={props.type}
        placeholder={props.placeholder}
        value={props.value as string} 
        id={props.id}
        onChange={props.onChange}
        mask={props.mask || ''}  
      />
    </div>
  );
};
