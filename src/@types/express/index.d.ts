import { Session } from "../../models/interfaces";

declare global {
  namespace Express {
    interface Request {
      session: Session;
    }
  }
}
