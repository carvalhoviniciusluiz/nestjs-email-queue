
import { MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { SENDMAIL_JOB, SENDMAIL_QUEUE } from 'src/constants';
import { CreateUserDto } from 'src/users/dto/create-user.dto';


@Processor(SENDMAIL_QUEUE)
export class SendMailConsumer {
  constructor(private readonly mailerService: MailerService) {}

  @Process(SENDMAIL_JOB)
  async sendMailJob(job: Job<CreateUserDto>) {
    const { data } = job
    await this.mailerService.sendMail({
      to: data.email,
      from: 'Team Test <team.test@test.com>',
      subject: 'Wellcome',
      text: `Hi ${data.name} your registration was successful.`
    })
  }
}
