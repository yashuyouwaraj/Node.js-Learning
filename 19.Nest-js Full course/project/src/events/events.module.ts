import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UserRegisteredListener } from './listeners/user-registered.listener';
import { UserEventService } from './user-events.service';

@Module({
    imports:[
        EventEmitterModule.forRoot({
            global:true,
            wildcard:false,
            maxListeners:20,
            verboseMemoryLeak:true
        })
    ],
    providers:[UserRegisteredListener,UserEventService],
    exports:[UserEventService]
})
export class EventsModule {}
