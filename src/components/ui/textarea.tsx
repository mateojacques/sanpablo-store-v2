import { forwardRef, type TextareaHTMLAttributes, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, id, value, defaultValue, onChange, ...props }, ref) => {
    const textareaId = id || props.name;
    const internalRef = useRef<HTMLTextAreaElement>(null);
    
    // Use the provided ref or fall back to internal ref
    const finalRef = ref || internalRef;

    // Sync value to textarea element directly to ensure it's always in sync
    // This fixes issues where the textarea value can get out of sync in production builds
    useEffect(() => {
      if (finalRef && 'current' in finalRef && finalRef.current) {
        const textareaElement = finalRef.current;
        if (value !== undefined && textareaElement.value !== String(value)) {
          textareaElement.value = String(value);
        }
      }
    }, [value, finalRef]);

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={finalRef}
          defaultValue={defaultValue}
          className={cn(
            'flex min-h-[100px] w-full rounded-lg border bg-white px-3 py-2 text-sm transition-colors resize-y',
            'placeholder:text-gray-400',
            'focus:outline-none focus:ring-2 focus:ring-offset-0',
            error
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
              : 'border-gray-300 focus:border-[var(--color-primary)] focus:ring-[var(--color-primary-50)]',
            'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50',
            className
          )}
          onChange={onChange}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined}
          {...props}
        />
        {error && (
          <p id={`${textareaId}-error`} className="mt-1 text-sm text-red-600">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${textareaId}-helper`} className="mt-1 text-sm text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea };
