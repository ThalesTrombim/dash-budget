import { forwardRef, InputHTMLAttributes, useState } from "react";
import { CurrencyInput } from "react-currency-mask";

type ExtendedInputTypes = InputHTMLAttributes<HTMLInputElement>["type"] | "monetary";

interface IProps extends InputHTMLAttributes<HTMLInputElement>{
  label: string;
  placeholder?: string;
  type?: ExtendedInputTypes;
  errors: any;
  value?: any;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputForm = forwardRef<HTMLInputElement, IProps>(function InputForm({
  label, 
  placeholder, 
  type = 'text',
  value,
  errors,
  handleChange,
  ...props
}: IProps, ref) {

  return (
    <div className="w-full min-w-[200px] flex flex-col text-start">
      <label className="block mb-2 text-sm text-slate-600">
        { label }
      </label>

      { type === 'monetary' ?
        <CurrencyInput
          onChangeValue={(event: any) => { if(handleChange) handleChange(event) }}
          placeholder="R$ 0,00"
          {...props} 
          ref={ref}
          value={value}
          // @ts-ignore
          className={`${errors && 'border-red-500'} w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow`}
        />
         :
          <input
            {...props} 
            ref={ref} 
            value={value} 
            onChange={(e) => { if(handleChange) handleChange(e) }} 
            type={type} 
            className={`${errors && 'border-red-500'} w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow`}
            placeholder={placeholder} 
          />
        }
      {errors && <span className="text-red-500 text-xs mt-2 text-start">{errors.message}</span>}
    </div>
  )
})

export { InputForm };