import { Injectable } from '@nestjs/common';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { History } from 'src/schemas/History.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Types } from 'mongoose';
@Injectable()
export class HistoryService {

  constructor(@InjectModel(History.name) private historyModel: Model<History>) {}

  private readonly histories = [
    {
      id: 1,
      event_image: "https://s3-ap-southeast-1.amazonaws.com/tm-img-poster-event/da6a1c12016011ef911101117567899b.jpg?opt=mild&resize=w200,h290",
      event_name: "Event Name 5",
      event_location: "Event Location 5",
      event_date: new Date(),
      event_time: new Date(),
      payment_status: true,
      user_id: "user_id_5",
      section: "E",
      row: "5",
      seat: "E5",
      price: 500,
    },
    {
      id: 2,
      event_image: "https://s3-ap-southeast-1.amazonaws.com/tm-img-poster-event/e79153f0f5de11ee911101117567899b.jpg?opt=mild&resize=w200,h290",
      event_name: "IKONYX CONCERT",
      event_location: "SEOUL @KOREA",
      event_date: new Date(),
      event_time: new Date(),
      payment_status: false,
      user_id: "user_id_4",
      section: "D",
      row: "4",
      seat: "D4",
      price: 400,
    },
    {
      id: 3,
      event_image: "https://s3-ap-southeast-1.amazonaws.com/tm-img-poster-event/2c83f492077811ef911101117567899b.png?opt=mild&resize=w200,h290",
      event_name: "Ultra Beach Bali 2024",
      event_location: "Bali @Indonesia",
      event_date: new Date(),
      event_time: new Date(),
      payment_status: true,
      user_id: "user_id_3",
      section: "C",
      row: "3",
      seat: "C3",
      price: 300,
    },
    {
      id: 4,
      event_image: "https://s3-ap-southeast-1.amazonaws.com/tm-img-poster-event/e9a990108da811ee911101117567899b.png?opt=mild&resize=w200,h290",
      event_name: "Space K@Next Tech",
      event_location: "Siam Paragon @Thailand",
      event_date: new Date(),
      event_time: new Date(),
      payment_status: false,
      user_id: "user_id_2",
      section: "B",
      row: "2",
      seat: "B2",
      price: 200,
    },
    
  ];
  async create(createHistoryDto: CreateHistoryDto) {
    return 'This action adds a new history';
  }

  async findAll() {
    // return this.historyModel.find().exec();
    return this.histories;
  }

  findOne(id: number) {
    return `This action returns a #${id} history`;
  }

  update(id: number, updateHistoryDto: UpdateHistoryDto) {
    return `This action updates a #${id} history`;
  }

  remove(id: number) {
    return `This action removes a #${id} history`;
  }
}
