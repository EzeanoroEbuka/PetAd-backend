
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { LoggingService } from '../../logging/logging.service';



@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly loggingService: LoggingService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, user } = request;
    const now = Date.now();

    return next.handle().pipe(
      tap(async () => {
        console.log(
          `${method} ${url} - ${Date.now() - now}ms`,
        ),
        await this.loggingService.log({
          level: 'INFO',
          action: `${method} ${url}`,
          message: 'Request completed successfully',
          userId: user?.sub,
      });
      }),
    );
  }
}

