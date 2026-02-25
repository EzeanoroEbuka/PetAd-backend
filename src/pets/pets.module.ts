import { Module } from '@nestjs/common';
<<<<<<< HEAD
import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PetsController],
  providers: [PetsService],
  exports: [PetsService], // Export for use by other modules
=======
import { PetsController } from './pets.controller';

@Module({
  controllers: [PetsController],
>>>>>>> upstream/main
})
export class PetsModule {}
