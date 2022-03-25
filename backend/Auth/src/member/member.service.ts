import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from './entity/member.entity';
import * as bcrypt from 'bcrypt';
import { Cache } from 'cache-manager';
import { Fond } from './entity/fond.entity';
import { MemberLikeRamen } from './entity/memberLikeRamen.entity';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    @InjectRepository(Fond)
    private readonly fondRepository: Repository<Fond>,
    @InjectRepository(MemberLikeRamen)
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async findAll(): Promise<Member[]> {
    return await this.memberRepository.find();
  }

  async findOne(id: number): Promise<Member> {
    const member = await this.memberRepository.findOne({ member_id: id });
    if (member) {
      return member;
    }

    throw new NotFoundException('User with this id does not exist');
  }

  async findByEmail(email: string): Promise<Member> {
    return await this.memberRepository.findOne({ email });
  }

  async remove(id: string): Promise<void> {
    await this.memberRepository.delete(id);
  }

  async createNewMember(member: Member) {
    const createdMember = this.memberRepository.create(member);
    const savedMember = await this.memberRepository.save(createdMember);
    return savedMember;
  }

  async createNewFond(fond: Fond) {
    const createdfond = this.fondRepository.create(fond);
    const savedFond = await this.fondRepository.save(createdfond);
    return savedFond;
  }

  async createNewMemberLikeRamen(memberLikeRamen: MemberLikeRamen) {
    const createdMemberLikeRamen =
      this.memberRepository.create(memberLikeRamen);
    const savedMemberLikeRamen = await this.memberRepository.save(
      createdMemberLikeRamen,
    );
    return savedMemberLikeRamen;
  }

  async setCurrentRefreshToken(refreshToken: string, id: number) {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    console.log(this.cacheManager.store);
    await this.cacheManager.set(String(id), currentHashedRefreshToken);
  }

  async getMemberIfRefreshTokenMatches(refreshToken: string, id: number) {
    const currentHashedRefreshToken = (await this.cacheManager.get(
      String(id),
    )) as string;
    console.log(currentHashedRefreshToken);
    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      currentHashedRefreshToken,
    );

    if (isRefreshTokenMatching) {
      const member = await this.memberRepository.findOne({
        where: { member_id: id },
      });

      return member;
    }
  }

  async removeRefreshToken(id: number) {
    await this.cacheManager.del(String(id));
  }
}