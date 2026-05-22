export function PageLoading({ message = "Loading products..." }) {
  return (
    <div className="page-status loading-state">
      <p>{message}</p>
    </div>
  );
}

export function PageError({ message, onRetry }) {
  return (
    <div className="page-status error-state section-card">
      <h2>Could not load data</h2>
      <p>{message}</p>
      {onRetry ? (
        <button type="button" className="primary-button" onClick={onRetry}>
          Try again
        </button>
      ) : null}
    </div>
  );
}
