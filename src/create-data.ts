import * as namor from 'namor';
import * as _ from 'lodash';
import { TableDataType } from './entities';
import { EStatus } from './entities';

const newPerson = () => {
  const statusChance = Math.random();
  return {
    firstName: namor.generate({ words: 1, numbers: 0, saltLength: 0 }),
    lastName: namor.generate({ words: 1, numbers: 0, saltLength: 0 }),
    age: Math.floor(Math.random() * 30),
    visits: Math.floor(Math.random() * 100),
    progress: Math.floor(Math.random() * 100),
    status:
      statusChance > 0.66
        ? EStatus.RELATIONSHIP
        : statusChance > 0.33
          ? EStatus.COMPLICATED
          : EStatus.SINGLE,
    tags: _.range(_.random(10)).map(() =>
      namor.generate({ words: 1, numbers: 0, saltLength: 0 }),
    ),
  };
};

export function createData(length: number): TableDataType {
  return _.range(length).map(() => newPerson());
}
