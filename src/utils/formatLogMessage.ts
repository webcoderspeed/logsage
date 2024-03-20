function formatLogMessage(message: string, data?: unknown) {
  if (data && typeof data === 'object' && 'traceId' in data) {
    const { traceId, ...restData } = data as { traceId: string };
    const stringifiedData = JSON.stringify({ message, ...restData });

    return `[${traceId}] : ${stringifiedData}`;
  }

  const logData = data ? { data } : {};
  return JSON.stringify({ message, ...logData });
}

export default formatLogMessage;
