import { TraceIdHandler } from './trace-handler.util';

function formatLogMessage(message: string, data?: unknown) {
  const TRACE_ID = TraceIdHandler.getTraceIdField();
  if (data && typeof data === 'object' && TRACE_ID in data) {
    const { [TRACE_ID]: traceId, ...restData } = data as { [key: string]: any };
    const stringifiedData =
      Object.keys(restData)?.length > 0
        ? JSON.stringify({ message, data: restData })
        : JSON.stringify({ message });
    return `${traceId}:${stringifiedData}`;
  }

  const logData = data && Object.keys(data)?.length > 0 ? { data } : {};
  return JSON.stringify({
    message,
    ...(Object.keys(logData).length > 0 && { data: logData }),
  });
}

export default formatLogMessage;
