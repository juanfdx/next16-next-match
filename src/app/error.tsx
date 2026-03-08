"use client";

import { ErrorPage } from '@/components/system/ErrorPage';


export default function Error({ error }: { error: Error }) {

    return (
    <ErrorPage
      title="Internal Server Error"
      statusCode={500}
      message={error.message || "Something went wrong."}
    />
  );
}