import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { PrismaModule } from '@prisma/prisma.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      global: true,
      useFactory() {
        const base64PrivateKey = `${process.env.JWT_PRIVATE_KEY}`
        const base64PublicKey = `${process.env.JWT_PUBLIC_KEY}`
        return {
          signOptions: {
            algorithm: 'RS256',
          },
          privateKey: Buffer.from(base64PrivateKey, 'base64'),
          publicKey: Buffer.from(base64PublicKey, 'base64'),
        }
      },
    }),
    PrismaModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
