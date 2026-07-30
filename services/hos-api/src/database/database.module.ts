import { Global, Module } from '@nestjs/common';

import { DatabaseService } from './database.service';

/** Global database foundation module for future Prisma integration. */
@Global()
@Module({
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
