import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Query,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { QueueService } from './queue.service';
import { AddTokenDto } from './dto/queue.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Queue')
@Controller('queue')
export class QueueController {
  constructor(private queueService: QueueService) {}

  @Get(':doctorId/today')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get or create today\'s queue for a doctor' })
  @ApiQuery({ name: 'date', type: String, required: false, description: 'YYYY-MM-DD, defaults to today' })
  getTodayQueue(
    @Param('doctorId', ParseUUIDPipe) doctorId: string,
    @Query('date') date?: string,
  ) {
    const queueDate = date || new Date().toISOString().split('T')[0];
    return this.queueService.getOrCreateQueue(doctorId, queueDate);
  }

  @Post(':doctorId/token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Super Admin', 'Hospital Admin', 'Doctor', 'Receptionist', 'Nurse')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add a token to the doctor\'s queue' })
  async addToken(
    @Param('doctorId', ParseUUIDPipe) doctorId: string,
    @Body() dto: AddTokenDto,
    @Query('date') date?: string,
  ) {
    const queueDate = date || new Date().toISOString().split('T')[0];
    const queue = await this.queueService.getOrCreateQueue(doctorId, queueDate);
    return this.queueService.addToken(queue.id, dto);
  }

  @Put(':queueId/next')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Super Admin', 'Hospital Admin', 'Doctor', 'Nurse')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Call next token in queue' })
  callNext(@Param('queueId', ParseUUIDPipe) queueId: string) {
    return this.queueService.callNextToken(queueId);
  }

  @Put('token/:tokenId/complete')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Super Admin', 'Hospital Admin', 'Doctor', 'Nurse')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Complete current token' })
  completeToken(@Param('tokenId', ParseUUIDPipe) tokenId: string) {
    return this.queueService.completeToken(tokenId);
  }

  @Put('token/:tokenId/cancel')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Super Admin', 'Hospital Admin', 'Doctor', 'Receptionist', 'Nurse')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cancel a queue token' })
  cancelToken(@Param('tokenId', ParseUUIDPipe) tokenId: string) {
    return this.queueService.cancelToken(tokenId);
  }

  @Get(':queueId/status')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get queue status with waiting info' })
  getQueueStatus(@Param('queueId', ParseUUIDPipe) queueId: string) {
    return this.queueService.getQueueStatus(queueId);
  }

  @Put(':queueId/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Super Admin', 'Hospital Admin', 'Doctor')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update queue status (running/break/completed/emergency)' })
  updateQueueStatus(
    @Param('queueId', ParseUUIDPipe) queueId: string,
    @Body() body: { status: string },
  ) {
    return this.queueService.updateQueueStatus(queueId, body.status);
  }

  @Get(':queueId/my-token')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get patient\'s own token info in a queue' })
  @ApiQuery({ name: 'patientId', type: String, description: 'UUID of the patient' })
  getMyToken(
    @Param('queueId', ParseUUIDPipe) queueId: string,
    @Query('patientId') patientId: string,
  ) {
    return this.queueService.getMyToken(patientId, queueId);
  }
}
