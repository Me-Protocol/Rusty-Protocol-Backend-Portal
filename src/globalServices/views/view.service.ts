import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { View } from './entities/view.entity';

@Injectable()
export class ViewsService {
  constructor(
    @InjectRepository(View)
    private readonly viewsRepository: Repository<View>,
  ) {}

  async createView(offerId: string, sessionId: string, userId?: string) {
    const view = new View();
    view.offerId = offerId;
    view.sessionId = sessionId;
    view.userId = userId;
    return await this.viewsRepository.save(view);
  }

  // get sessions recently viewed
  async getSessionViews(sessionId: string) {
    // get views and populate offer
    const views = await this.viewsRepository.findAndCount({
      relations: [
        'offer',
        'offer.brand',
        'offer.product',
        'offer.product.category',
        'offer.reward',
      ],
      order: {
        createdAt: 'DESC',
      },
      take: 10,
      where: {
        sessionId: sessionId,
      },
    });

    //   filter repeated offers
    const filteredViews = views[0].filter(
      (view, index, self) =>
        index ===
        self.findIndex(
          (t) =>
            t.offer.id === view.offer.id &&
            t.offer.name === view.offer.name &&
            t.offer.offerCode === view.offer.offerCode,
        ),
    );

    return filteredViews;
  }

  // get user recently viewed
  async getUserView(user_id: string) {
    // get views and populate offer
    const views = await this.viewsRepository.findAndCount({
      relations: [
        'offer',
        'offer.brand',
        'offer.product',
        'offer.product.category',
        'offer.reward',
      ],
      order: {
        createdAt: 'DESC',
      },
      take: 10,
      where: {
        userId: user_id,
      },
    });

    //   filter repeated offers
    const filteredViews = views[0].filter(
      (view, index, self) =>
        index ===
        self.findIndex(
          (t) =>
            t.offer.id === view.offer.id &&
            t.offer.name === view.offer.name &&
            t.offer.offerCode === view.offer.offerCode,
        ),
    );

    return filteredViews;

    // return views;
  }

  // get recently viewed by any user
  async getViews() {
    // get views and populate offer
    const views = await this.viewsRepository.findAndCount({
      relations: [
        'offer',
        'offer.brand',
        'offer.product',
        'offer.product.category',
        'offer.reward',
      ],
      order: {
        createdAt: 'DESC',
      },
      take: 10,
    });

    //   filter repeated offers
    const filteredViews = views[0].filter(
      (view, index, self) =>
        index ===
        self.findIndex(
          (t) =>
            t.offer.id === view.offer.id &&
            t.offer.name === view.offer.name &&
            t.offer.offerCode === view.offer.offerCode,
        ),
    );

    return filteredViews;
  }

  // check if offer has been viewed
  async checkIfOfferHasBeenViewed(
    offer_id: string,
    session_id: string,
    user_id?: string,
  ) {
    return await this.viewsRepository.findOne({
      where: {
        offerId: offer_id,
        sessionId: session_id,
        userId: user_id,
      },
    });
  }
}
