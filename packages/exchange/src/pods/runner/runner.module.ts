import { Module } from '@nestjs/common';

import { RunnerService } from './runner.service';
import { MatchingEngineModule } from '../matching-engine/matching-engine.module';
import { OrderModule } from '../order/order.module';
import { DepositWatcherModule } from '../deposit-watcher/deposit-watcher.module';
import { WithdrawalProcessorModule } from '../withdrawal-processor/withdrawal-processor.module';

@Module({
    imports: [MatchingEngineModule, OrderModule, DepositWatcherModule, WithdrawalProcessorModule],
    providers: [RunnerService],
    exports: [RunnerService]
})
export class RunnerModule {}