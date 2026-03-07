import Link from "next/link";

interface ErrorPageProps {
  title?: string;
  message?: string;
  statusCode?: number;
  linkHref?: string;
  linkText?: string;
}

export function ErrorPage({
  title = "Internal Server Error",
  message = "Something went wrong.",
  statusCode = 500,
  linkHref = "/",
  linkText = "← Return to Home",
}: ErrorPageProps) {
  
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="text-9xl font-bold tracking-tight text-primary">
        {statusCode}
      </h1>

      <h2 className="mt-4 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        {title}
      </h2>

      <p className="mt-3 max-w-md text-sm text-gray-500 dark:text-gray-400">
        {message}
      </p>

      <Link
        href={linkHref}
        className="mt-6 inline-flex items-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-primary/90"
      >
        {linkText}
      </Link>
    </div>
  );
}