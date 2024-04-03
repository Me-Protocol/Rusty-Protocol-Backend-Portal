import { BaseEntity } from "@src/common/entities/base.entity";
import {Entity, Column} from "typeorm";

@Entity("auditTrail")
export class AuditTrail extends BaseEntity{

  @Column()
  userId: string;

  @Column()
  auditType: string;

  @Column()
  description: string;

  @Column()
  reportableId: string;

} 
