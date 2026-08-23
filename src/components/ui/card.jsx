import * as React from 'react';
import { cn } from '../../utils/cn';

const Card = React.forwardRef(({ className, style, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'rounded-lg border shadow-xs transition-all duration-200 ease-out hover:border-stone-400/60 hover:shadow-xs',
      className
    )}
    style={{
      backgroundColor: 'var(--bg-card, #faf9f5)',
      borderColor: 'var(--border-subtle, #d5cfc2)',
      color: 'var(--text-main, #1a1d1a)',
      ...style,
    }}
    {...props}
  />
));
Card.displayName = 'Card';

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-4 sm:p-5', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef(({ className, style, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'font-semibold leading-tight tracking-tight text-base sm:text-lg',
      className
    )}
    style={{ color: 'var(--text-main, #1a1d1a)', ...style }}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef(({ className, style, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-xs sm:text-sm leading-relaxed', className)}
    style={{ color: 'var(--text-muted, #5e625a)', ...style }}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-4 sm:p-5 pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-4 sm:p-5 pt-0', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
