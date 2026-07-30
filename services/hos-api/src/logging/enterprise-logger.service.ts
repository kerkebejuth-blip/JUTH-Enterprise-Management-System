import { Injectable, Logger, type LoggerService } from '@nestjs/common';

/** Enterprise log severity levels supported by the logging platform. */
export type EnterpriseLogLevel =
  'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';

/** Structured log metadata accepted by enterprise logging categories. */
export type LogMetadata = Record<string, unknown>;

/** Enterprise logging service backed by Nest's logger abstraction. */
@Injectable()
export class EnterpriseLoggerService implements LoggerService {
  private readonly logger = new Logger('JuthHos');

  /** Logs general operational information. */
  log(message: string, context?: string): void {
    this.logger.log(message, context);
  }

  /** Logs application errors with optional stack trace. */
  error(message: string, trace?: string, context?: string): void {
    this.logger.error(message, trace, context);
  }

  /** Logs warning conditions that do not stop processing. */
  warn(message: string, context?: string): void {
    this.logger.warn(message, context);
  }

  /** Logs verbose diagnostic messages. */
  verbose(message: string, context?: string): void {
    this.logger.verbose(message, context);
  }

  /** Logs debug diagnostic messages. */
  debug(message: string, context?: string): void {
    this.logger.debug(message, context);
  }

  /** Logs trace-level diagnostics through Nest verbose logging. */
  trace(message: string, context?: string): void {
    this.logger.verbose(message, context ?? 'Trace');
  }

  /** Logs fatal errors through the Nest error channel. */
  fatal(message: string, trace?: string, context?: string): void {
    this.logger.error(message, trace, context ?? 'Fatal');
  }

  /** Logs an application event with optional metadata. */
  application(message: string, metadata?: LogMetadata): void {
    this.log(this.format(message, metadata), 'Application');
  }

  /** Logs application startup metadata. */
  startup(message: string): void {
    this.log(message, 'Startup');
  }

  /** Logs audit events with optional metadata. */
  audit(message: string, metadata?: LogMetadata): void {
    this.log(this.format(message, metadata), 'Audit');
  }

  /** Logs security events with optional metadata. */
  security(message: string, metadata?: LogMetadata): void {
    this.warn(this.format(message, metadata), 'Security');
  }

  /** Logs database events with optional metadata. */
  database(message: string, metadata?: LogMetadata): void {
    this.debug(this.format(message, metadata), 'Database');
  }

  /** Logs request timing and throughput metadata. */
  performance(message: string): void {
    this.log(message, 'Performance');
  }

  /** Logs a message at the requested enterprise severity level. */
  write(level: EnterpriseLogLevel, message: string, context?: string): void {
    const writers: Record<EnterpriseLogLevel, () => void> = {
      trace: () => this.trace(message, context),
      debug: () => this.debug(message, context),
      info: () => this.log(message, context),
      warn: () => this.warn(message, context),
      error: () => this.error(message, undefined, context),
      fatal: () => this.fatal(message, undefined, context),
    };
    writers[level]();
  }

  private format(message: string, metadata?: LogMetadata): string {
    if (!metadata || Object.keys(metadata).length === 0) {
      return message;
    }

    return `${message} ${JSON.stringify(metadata)}`;
  }
}
