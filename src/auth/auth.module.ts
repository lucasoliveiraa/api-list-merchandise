import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'

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
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
