function formatLogMessage(logmsg: string, data?: unknown) {
  if (data && typeof data === 'object' && 'traceId' in data) {
    const { traceId, ...restData } = data as { traceId: string };
    const stringifiedData = JSON.stringify({ logmsg, ...restData });

    return `[${traceId}]:${stringifiedData}`;
  }

  const logData = data ? { data } : {};
  return JSON.stringify({ logmsg, ...logData });
}

export default formatLogMessage;
