import { Session } from "../../models";

declare global {
  namespace Express {
    interface Request {
      session: Session;
    }
  }
}
