import { Combobox, Transition, Listbox } from "@headlessui/react"
import {
  CheckIcon,
  ChevronUpDownIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline"
import clsx from "clsx"
import React, { Fragment, useState } from "react"

interface Option {
  value: string
  label: string
}

type FormInputPropsBase = {
  label: string
  name: string
  type: string
  required?: boolean
  disabled?: boolean
  placeholder?: string
  options?: Option[]
  className?: string
  pattern?: string
  min?: string
}

type SingleValueProps = {
  multiple?: false
  value: string
  onChange: (value: string) => void
}

type MultiValueProps = {
  multiple: true
  value: string[]
  onChange: (value: string[]) => void
}

type FormInputProps = FormInputPropsBase & (SingleValueProps | MultiValueProps)

export const FormInput: React.FC<FormInputProps> = (props) => {
  const {
    label,
    name,
    type,
    value,
    onChange,
    required = false,
    disabled = false,
    placeholder = "",
    options = [],
    multiple = false,
    className = "",
    pattern,
    min,
  } = props

  const [query, setQuery] = useState("")

  // Filtered options for combobox
  const filteredOptions =
    query === ""
      ? options
      : options.filter((option) =>
          option.label.toLowerCase().includes(query.toLowerCase()),
        )

  if (type === "combobox") {
    return (
      <div className={clsx("sm:col-span-3", className)}>
        <Combobox
          value={value}
          onChange={onChange}
          // @ts-ignore: TypeScript infers this incorrectly, so we manually override it
          multiple={multiple} // Support multiple selection
          disabled={disabled}
        >
          <Combobox.Label className="block text-sm font-medium text-gray-700">
            {label} {required && <span className="text-red-500">*</span>}
          </Combobox.Label>
          <div className="relative mt-2">
            <Combobox.Input
              className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
              onChange={(event) => setQuery(event.target.value)}
              displayValue={(selected: string | string[]) => {
                // Handle multiple selection display
                if (multiple && Array.isArray(selected)) {
                  return selected
                    .map(
                      (val) => options.find((opt) => opt.value === val)?.label,
                    )
                    .join(", ")
                } else if (typeof selected === "string") {
                  return (
                    options.find((opt) => opt.value === selected)?.label || ""
                  )
                }
                return ""
              }}
              placeholder={placeholder}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>

            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setQuery("")}
            >
              <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {filteredOptions.length === 0 && query !== "" ? (
                  <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                    검색 결과가 없습니다.
                  </div>
                ) : (
                  filteredOptions.map((option) => (
                    <Combobox.Option
                      key={option.value}
                      value={option.value}
                      className={({ active }) =>
                        clsx(
                          "relative cursor-default select-none py-2 pl-3 pr-9",
                          active ? "bg-indigo-600 text-white" : "text-gray-900",
                        )
                      }
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={clsx(
                              "block truncate",
                              selected && "font-semibold",
                            )}
                          >
                            {option.label}
                          </span>
                          {selected && (
                            <span
                              className={clsx(
                                "absolute inset-y-0 right-0 flex items-center pr-4",
                                active ? "text-white" : "text-indigo-600",
                              )}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          )}
                        </>
                      )}
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </Transition>
          </div>
        </Combobox>
      </div>
    )
  }

  if (type === "select" && options.length > 0) {
    const selectedOption = options.find((option) => option.value === value)

    return (
      <div className={clsx("sm:col-span-3", className)}>
        <Listbox value={value} onChange={onChange} disabled={disabled}>
          {({ open }) => (
            <>
              <Listbox.Label className="block text-sm font-medium text-gray-700">
                {label} {required && <span className="text-red-500">*</span>}
              </Listbox.Label>
              <div className="relative mt-2">
                <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                  <span className="block truncate">
                    {selectedOption?.label || placeholder || "선택해 주세요"}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>

                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {options.map((option) => (
                      <Listbox.Option
                        key={option.value}
                        className={({ active }) =>
                          clsx(
                            active
                              ? "bg-indigo-600 text-white"
                              : "text-gray-900",
                            "relative cursor-default select-none py-2 pl-3 pr-9",
                          )
                        }
                        value={option.value}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={clsx(
                                selected ? "font-semibold" : "font-normal",
                                "block truncate",
                              )}
                            >
                              {option.label}
                            </span>

                            {selected ? (
                              <span
                                className={clsx(
                                  active ? "text-white" : "text-indigo-600",
                                  "absolute inset-y-0 right-0 flex items-center pr-4",
                                )}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </>
          )}
        </Listbox>
      </div>
    )
  }

  if (type === "datetime-local") {
    return (
      <div className={clsx("sm:col-span-3", className)}>
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <input
            type="datetime-local"
            name={name}
            id={name}
            value={value as string} // Ensure value is string
            onChange={(e) => onChange(e.target.value as any)} // Type assertion
            min={min} // Accept min prop
            disabled={disabled}
            required={required}
            className={clsx(
              "block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm",
              { "bg-gray-50 text-gray-500": disabled },
            )}
          />
        </div>
      </div>
    )
  }

  if (type === "textarea") {
    return (
      <div className={clsx("sm:col-span-6", className)}>
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="mt-2">
          <textarea
            id={name}
            name={name}
            rows={4}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-btl-primary-500 focus:ring-btl-primary-500 sm:text-sm"
            value={value}
            onChange={(e) => onChange(e.target.value as any)}
            disabled={disabled}
            placeholder={placeholder}
          />
        </div>
      </div>
    )
  }

  const inputProps = {
    type: type === "date" ? "text" : type,
    name,
    id: name,
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      onChange(e.target.value as any),
    required,
    disabled,
    placeholder: type === "date" ? "YYYY/MM/DD" : placeholder,
    className: clsx(
      "block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm",
      { "pl-10": type === "date", "bg-gray-50 text-gray-500": disabled },
    ),
  }

  if (type === "date") {
    inputProps["pattern"] = "\\d{4}/\\d{2}/\\d{2}"
  } else if (pattern) {
    inputProps["pattern"] = pattern
  }

  return (
    <div className={clsx("sm:col-span-3", className)}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative mt-2 rounded-md shadow-sm">
        <input {...inputProps} />
        {type === "date" && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <CalendarIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
    </div>
  )
}
