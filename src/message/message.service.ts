import * as path from 'path';

export class MessageService {
  private readonly sourceFile: string;
  private readonly lineNumber: number;

  constructor() {
    const error = new Error();
    const stackTrace = error.stack;
    if (stackTrace) {
      const stackTraceLines = stackTrace.split('\n');
      const callerLine = stackTraceLines[3];
      const matchResult = callerLine.match(/\((.*):\d+:\d+\)/);
      this.sourceFile = matchResult ? path.basename(matchResult[1]) : 'Unknown';
      this.lineNumber = Number(callerLine.split(':')[1]);
    } else {
      this.sourceFile = 'Unknown';
      this.lineNumber = -1;
    }
  }

  public toString(message: string, data?: any): string {
    const output = {
      sourceFile: this.sourceFile,
      lineNumber: this.lineNumber,
      message: message,
      ...(data && {
        data: data,
      }),
    };

    return JSON.stringify(output);
  }
}
