import { User, History } from '../models';

export default async function initializeAllTables() {
  await User.sync({ force: true });
  await History.sync({ force: true });
}
