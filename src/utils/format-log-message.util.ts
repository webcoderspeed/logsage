import { TraceIdHandler } from './trace-handler.util';

function formatLogMessage(message: string, data?: unknown) {
  const TRACE_ID = TraceIdHandler.getTraceIdField();
  if (data && typeof data === 'object' && TRACE_ID in data) {
    const { [TRACE_ID]: traceId, ...restData } = data as { [key: string]: any };
    const stringifiedData = JSON.stringify({ message, data: restData });
    return `${traceId}:${stringifiedData}`;
  }

  const logData = data ? { data } : {};
  return JSON.stringify({ message, data: logData });
}

export default formatLogMessage;
