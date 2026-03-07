import Link from "next/link";

interface NotFoundPageProps {
  title?: string;
  message?: string;
  linkHref?: string;
  linkText?: string;
}

export function NotFoundPage({
  title = "Page Not Found",
  message = "The page you're looking for doesn't exist or may have been removed.",
  linkHref = "/",
  linkText = "Return to Home",
}: NotFoundPageProps) {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="text-7xl font-extrabold tracking-tight bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
        404
      </h1>

      <h2 className="mt-4 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        {title}
      </h2>

      <p className="mt-3 max-w-md text-sm text-gray-500 dark:text-gray-400">
        {message}
      </p>

      <Link
        href={linkHref}
        className="mt-6 inline-flex items-center h-10 px-5 text-sm font-medium text-white bg-linear-to-r from-purple-500 to-pink-500 rounded-lg"
      >
        {linkText}
      </Link>
    </div>
  );
}
