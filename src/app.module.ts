import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './user/auth/auth.module';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [UserModule, AuthModule, ProfileModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
