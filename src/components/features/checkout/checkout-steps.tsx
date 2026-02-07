import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CheckoutStepsProps {
  currentStep: 1 | 2 | 3;
}

const steps = [
  { number: 1, name: 'Contacto' },
  { number: 2, name: 'Revision' },
  { number: 3, name: 'Confirmacion' },
];

export function CheckoutSteps({ currentStep }: CheckoutStepsProps) {
  return (
    <nav aria-label="Progress" className="flex items-center justify-center">
      <ol className="flex items-center">
        {steps.map((step, index) => (
          <li key={step.number} className="flex items-center">
            <div
              className={cn(
                'flex items-center gap-2',
                step.number < currentStep && 'text-[var(--color-primary)]',
                step.number === currentStep && 'text-[var(--color-primary)]',
                step.number > currentStep && 'text-gray-400'
              )}
            >
              <span
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium',
                  step.number < currentStep && 'bg-[var(--color-primary)] text-white',
                  step.number === currentStep && 'border-2 border-[var(--color-primary)] text-[var(--color-primary)]',
                  step.number > currentStep && 'border-2 border-gray-300 text-gray-400'
                )}
              >
                {step.number < currentStep ? (
                  <Check className="h-4 w-4" />
                ) : (
                  step.number
                )}
              </span>
              <span
                className={cn(
                  'hidden sm:block text-sm font-medium',
                  step.number <= currentStep ? 'text-gray-900' : 'text-gray-400'
                )}
              >
                {step.name}
              </span>
            </div>
            
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'mx-3 h-0.5 w-8 sm:w-16',
                  step.number < currentStep ? 'bg-[var(--color-primary)]' : 'bg-gray-300'
                )}
              />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
