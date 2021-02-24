import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { CoreModule } from './config/config.module';

@Module({
  controllers: [],
  providers: [UserService],
  exports: [UserService,UserModule],
  imports: [CoreModule]
})
export class UserModule {}
