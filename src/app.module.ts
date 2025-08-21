// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TrekModule } from 'src/treks/trek/trek.module'; // Ensure the path is correct
import { FaqModule } from './faq/faq.module';
import { AboutModule } from './about/about.module';
import { PrivacyPolicyModule } from './privacy-policy/privacy-policy.module';
import { UpcomingTreksModule } from './treks/upcoming-treks/upcoming-treks.module';
import { SpecialTreksModule } from './treks/special-treks/special-treks.module';
import { InquiryModule } from './inquiry/inquiry.module';
import { BlogModule } from './blog/blog.module';
import { CategoryModule } from './category/category.module';
import { SearchModule } from './search/search.module';
import { StoryModule } from './story/story.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { Faq } from './entities/faq.entity';
import { BannerModule } from './banner/banner.module';


@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'uploads'),  // Points to the correct folder
      serveRoot: '/uploads',  // URL prefix for serving files
    }),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      migrations: ['src/migrations/*.ts'],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    TrekModule,
    FaqModule,
    AboutModule,
    PrivacyPolicyModule,
    UpcomingTreksModule,
    SpecialTreksModule,
    InquiryModule,
    BlogModule,
    CategoryModule,
    SearchModule,
    StoryModule,
    BannerModule,
  ],
  controllers: [],
  providers: [],


})


export class AppModule { }
