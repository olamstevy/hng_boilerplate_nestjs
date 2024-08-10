import { BadRequestException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Faq } from './entities/faq.entity';
import { CreateFaqDto } from './dto/create-faq.dto';
import { IFaq } from './faq.interface';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { CustomHttpException } from '../../helpers/custom-http-filter';

@Injectable()
export class FaqService {
  constructor(
    @InjectRepository(Faq)
    private faqRepository: Repository<IFaq>
  ) {}

  async create(createFaqDto: CreateFaqDto): Promise<IFaq> {
    const faq = this.faqRepository.create(createFaqDto);
    return this.faqRepository.save(faq);
  }

  async findAllFaq() {
    try {
      const faqs = await this.faqRepository.find();
      return {
        message: 'Faq fetched successfully',
        status_code: 200,
        data: faqs,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        return {
          message: 'Invalid request',
          status_code: 400,
        };
      } else if (error instanceof InternalServerErrorException) {
        throw error;
      }
    }
  }

  async updateFaq(id: string, updateFaqDto: UpdateFaqDto) {
    const faq = await this.faqRepository.findOne({ where: { id } });
    if (!faq) {
      throw new CustomHttpException('Question could not be found', HttpStatus.NOT_FOUND);
    }

    Object.assign(faq, updateFaqDto);
    const updatedFaq = await this.faqRepository.save(faq);
    const payload = {
      id: updatedFaq.id,
      question: updatedFaq.question,
      answer: updatedFaq.answer,
      category: updatedFaq.category,
      created_at: updatedFaq.created_at,
      updated_at: updatedFaq.updated_at,
    };
    return { status_code: 200, message: 'FAQ updated successfully', data: payload };
  }

  async removeFaq(id: string) {}
}
