import React from "react";

type Props = {
  error: any;
  resetErrorBoundary: any;
};

const ErrorFallback = ({ error, resetErrorBoundary }: Props) => {
  return (
    <div>
      <h1>Something went wrong</h1>
      <p>{error.message}</p>
      <button onClick={resetErrorBoundary}>Try Again</button>
    </div>
  );
};

export default ErrorFallback;
