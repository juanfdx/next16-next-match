import { LinkButton } from '../ui/LinkButton';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
}

export function EmptyState({
  title = "Nothing here yet",
  description = "There is no data to display at the moment.",
  actionLabel,
  actionHref = "/",
}: EmptyStateProps) {
  
  return (
    <div className="flex flex-col items-center justify-center text-center py-16">
      <h2 className="text-2xl font-semibold text-black">
        {title}
      </h2>

      <p className="mt-2 max-w-md text-sm text-gray-500">
        {description}
      </p>

      {actionLabel && (
        <div className='mt-5'>
          <LinkButton href={actionHref} label={actionLabel} />
        </div>
      )}
    </div>
  );
}