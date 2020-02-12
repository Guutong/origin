import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Order } from './order.entity';
import { OrderService } from './order.service';
import { MatchingEngineModule } from '../matching-engine/matching-engine.module';
import { OrderController } from './order.controller';
import { ProductModule } from '../product/product.module';
import { AssetModule } from '../asset/asset.module';
import { AccountBalanceModule } from '../account-balance/account-balance.module';

@Module({
    providers: [OrderService],
    exports: [OrderService],
    imports: [
        TypeOrmModule.forFeature([Order]),
        MatchingEngineModule,
        forwardRef(() => AccountBalanceModule),
        ProductModule,
        AssetModule
    ],
    controllers: [OrderController]
})
export class OrderModule {}
