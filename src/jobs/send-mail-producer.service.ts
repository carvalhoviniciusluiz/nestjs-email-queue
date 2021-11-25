import { InjectQueue } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { Queue } from "bull";
import { SENDMAIL_JOB, SENDMAIL_QUEUE } from "src/constants";
import { CreateUserDto } from "src/users/dto/create-user.dto";

@Injectable()
export class SendMailProducerService {
  constructor(@InjectQueue(SENDMAIL_QUEUE) private queue: Queue) {}

  async sendEmail(createUserDto: CreateUserDto) {
    await this.queue.add(SENDMAIL_JOB, createUserDto)
  }
}
