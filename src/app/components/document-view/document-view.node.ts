import { ApplicationNode } from '@universal-robots/contribution-api';

export interface DocumentViewNode extends ApplicationNode {
  type: string;
  version: string;
}
